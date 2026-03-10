#!/usr/bin/env node
/**
 * Document analysis pipeline: extract text from docs in docs/ (or DOCS_PATH),
 * send to Gemini or Claude, get structured JSON for segments, personas, marketplace, etc.
 * Output: src/data/analysis-output.json
 *
 * Requires: GEMINI_API_KEY or ANTHROPIC_API_KEY in .env
 * Run: npm run analyze-docs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { extractXlsxText } from './extract-xlsx.mjs'
import { extractPptxText } from './extract-pptx.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

async function loadEnv() {
  try {
    const dotenv = await import('dotenv')
    dotenv.config({ path: path.join(projectRoot, '.env') })
  } catch (_) {}
}

function getDocsPath() {
  return process.env.DOCS_PATH
    ? path.resolve(projectRoot, process.env.DOCS_PATH)
    : path.join(projectRoot, 'docs')
}

function listDocFiles(docsDir) {
  if (!fs.existsSync(docsDir)) {
    console.warn(`Docs directory not found: ${docsDir}. Create it and add PDF/PPTX/XLSX files.`)
    return []
  }
  return fs.readdirSync(docsDir).filter((f) => {
    const ext = path.extname(f).toLowerCase()
    return ['.pdf', '.pptx', '.xlsx'].includes(ext)
  })
}

function isAteDaysFile(name) {
  return /ate\s*days/i.test(name)
}

async function extractAllText(docsDir, fileNames) {
  const byCategory = { ateDays: [], other: [] }
  for (const name of fileNames) {
    const fullPath = path.join(docsDir, name)
    const ext = path.extname(name).toLowerCase()
    try {
      if (ext === '.xlsx') {
        const text = extractXlsxText(fullPath)
        if (isAteDaysFile(name)) byCategory.ateDays.push({ name, text, type: 'xlsx' })
        else byCategory.other.push({ name, text, type: 'xlsx' })
      } else if (ext === '.pptx') {
        const text = await extractPptxText(fullPath)
        if (isAteDaysFile(name)) byCategory.ateDays.push({ name, text, type: 'pptx' })
        else byCategory.other.push({ name, text, type: 'pptx' })
      }
      // PDF: we'll send as base64 to Gemini later, skip text extraction
    } catch (e) {
      console.warn(`Skipping ${name}:`, e.message)
    }
  }
  return byCategory
}

function readPdfAsBase64(docsDir, fileName) {
  const fullPath = path.join(docsDir, fileName)
  const buf = fs.readFileSync(fullPath)
  return buf.toString('base64')
}

async function getGeminiClient() {
  const { GoogleGenAI } = await import('@google/genai')
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY not set in .env')
  return new GoogleGenAI({ apiKey })
}

async function geminiRequestWithRetry(ai, parts, maxRetries = 3) {
  let lastErr
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts }],
      })
      const raw = res?.text ?? res?.candidates?.[0]?.content?.parts?.[0]?.text
      if (!raw) throw new Error('No text in Gemini response')
      let jsonStr = raw.trim()
      const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
      if (jsonMatch) jsonStr = jsonMatch[0]
      return JSON.parse(jsonStr)
    } catch (err) {
      lastErr = err
      const is429 = err?.status === 429 || err?.message?.includes('RESOURCE_EXHAUSTED')
      if (is429 && attempt < maxRetries) {
        const delay = 25 * attempt
        console.warn(`Rate limited. Retrying in ${delay}s (attempt ${attempt}/${maxRetries})...`)
        await new Promise((r) => setTimeout(r, delay * 1000))
      } else {
        throw err
      }
    }
  }
  throw lastErr
}

/** Phase 1: Ate Days only (smaller payload, better for free tier). */
async function callGeminiAteDaysOnly(ateDaysContent) {
  const ai = await getGeminiClient()
  const text =
    '--- Ate Days documents ---\n' +
    ateDaysContent.map((f) => `\n[${f.name}]\n${f.text}`).join('\n')
  const prompt = `You are analyzing the "Ate Days" Consumer Segmentation Report (PowerPoint/Excel). Extract and output a single JSON object with these exact keys (use the documents; if something is missing, use a short placeholder):
- segments: array of { id (kebab-case), name, share (e.g. "13%"), narrative (1-2 sentences), bullets (array of strings) } for all 6 segments.
- personas: array of { segmentId, name, age, role, household, detail } one per segment.
- productStrategy: { title, subtitle, bundles: [{ name, description }], stat: { value, label }, ltvBullets: string[] }.
- marketplace: { title, subtitle, crashing: { headline, body }, touchpoints: { headline, ruleOf8, nuance } }.
- omniChannel: { title, subtitle, channels: [{ name, pct, examples }], note }.
- nbjStats: [] 
- suggestedCharts: optional { segmentPie: [{ name, value }], topGoals: [{ goal, pct }], channels: [{ name, pct }] }.

Output ONLY valid JSON, no markdown code fence.`
  return geminiRequestWithRetry(ai, [{ text: prompt + '\n\n' + text }])
}

/** Phase 2: Other reports only – supplemental stats to merge in. */
async function callGeminiOtherOnly(otherContent, pdfFiles, docsDir) {
  const ai = await getGeminiClient()
  const parts = []
  for (const name of pdfFiles) {
    try {
      const b64 = readPdfAsBase64(docsDir, name)
      parts.push({ inlineData: { mimeType: 'application/pdf', data: b64 } })
      parts.push({ text: `[PDF: ${name}]\n` })
    } catch (e) {
      console.warn(`Could not read PDF ${name}:`, e.message)
    }
  }
  const otherText =
    '--- Other reports ---\n' +
    otherContent.map((f) => `\n[${f.name}]\n${f.text}`).join('\n')
  const prompt = `From these market/NBJ reports, output a JSON object with only these keys (use the documents; if missing, use [] or a short placeholder):
- nbjStats: array of { label, value, source } (key stats from the reports).
- suggestedCharts: optional { segmentPie: [{ name, value }], topGoals: [{ goal, pct }], channels: [{ name, pct }] }.
You may also add "marketplaceAdditions": { crashing: { headline, body }, touchpoints: { ... } } if the docs add to that.
Output ONLY valid JSON, no markdown code fence.`
  parts.push({ text: prompt + '\n\n' + otherText })
  return geminiRequestWithRetry(ai, parts)
}

async function callGemini(ateDaysContent, otherContent, pdfFiles, docsDir) {
  const hasAteDays = ateDaysContent.length > 0 && ateDaysContent.some((f) => isAteDaysFile(f.name))
  const useSplit =
    process.env.ANALYZE_SPLIT !== 'false' &&
    hasAteDays &&
    (otherContent.length > 0 || pdfFiles.length > 0)

  if (useSplit) {
    console.log('Using Gemini (split mode: Ate Days first, then other docs after a short wait)...')
    const result = await callGeminiAteDaysOnly(ateDaysContent)
    if (otherContent.length > 0 || pdfFiles.length > 0) {
      console.log('Waiting 90s before second request (free-tier friendly)...')
      await new Promise((r) => setTimeout(r, 90 * 1000))
      try {
        const supplemental = await callGeminiOtherOnly(otherContent, pdfFiles, docsDir)
        if (supplemental.nbjStats?.length) result.nbjStats = supplemental.nbjStats
        if (supplemental.suggestedCharts) result.suggestedCharts = supplemental.suggestedCharts
        if (supplemental.marketplaceAdditions) {
          if (supplemental.marketplaceAdditions.crashing) result.marketplace.crashing = { ...result.marketplace?.crashing, ...supplemental.marketplaceAdditions.crashing }
          if (supplemental.marketplaceAdditions.touchpoints) result.marketplace.touchpoints = { ...result.marketplace?.touchpoints, ...supplemental.marketplaceAdditions.touchpoints }
        }
      } catch (e) {
        console.warn('Second request failed (you still have Ate Days analysis):', e.message)
      }
    }
    return result
  }

  const ai = await getGeminiClient()
  const parts = []
  for (const name of pdfFiles) {
    try {
      const b64 = readPdfAsBase64(docsDir, name)
      parts.push({ inlineData: { mimeType: 'application/pdf', data: b64 } })
      parts.push({ text: `[PDF: ${name}]\n` })
    } catch (e) {
      console.warn(`Could not read PDF ${name}:`, e.message)
    }
  }
  const prompt = `You are analyzing source documents for "Ate Days" consumer segmentation and market context.

Below you have:
1) Extracted text from Ate Days Consumer Segmentation Report (PowerPoint/Excel) and related Ate Days files.
2) Extracted text from other reports (NBJ, Market and Consumer Exploratory, etc.).
3) Any PDFs attached above.

TASK 1 (primary): From the Ate Days materials, extract and output a single JSON object with these exact keys (use the content from the documents; if something is missing, leave a short placeholder):
- segments: array of { id (kebab-case), name, share (e.g. "13%"), narrative (1-2 sentences), bullets (array of strings) } for all 6 segments.
- personas: array of { segmentId, name, age, role, household, detail } one per segment.
- productStrategy: { title, subtitle, bundles: [{ name, description }], stat: { value, label }, ltvBullets: string[] }.
- marketplace: { title, subtitle, crashing: { headline, body }, touchpoints: { headline, ruleOf8, nuance } }.
- omniChannel: { title, subtitle, channels: [{ name, pct, examples }], note }.
- nbjStats: optional array of { label, value, source } from NBJ/other reports.
- suggestedCharts: optional { segmentPie: [{ name, value }], topGoals: [{ goal, pct }], channels: [{ name, pct }] }.

TASK 2: From the other reports and PDFs, add any additional marketplace stats, channel data, or "crashing categories" insights into the same JSON (merge into marketplace, nbjStats, suggestedCharts).

Output ONLY valid JSON, no markdown code fence.`
  const allText =
    '--- Ate Days documents ---\n' +
    ateDaysContent.map((f) => `\n[${f.name}]\n${f.text}`).join('\n') +
    '\n\n--- Other documents ---\n' +
    otherContent.map((f) => `\n[${f.name}]\n${f.text}`).join('\n')
  parts.push({ text: prompt + '\n\n' + allText })
  return geminiRequestWithRetry(ai, parts)
}

async function callClaude(ateDaysContent, otherContent) {
  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set in .env')
  const client = new Anthropic({ apiKey })

  const allText =
    '--- Ate Days documents ---\n' +
    ateDaysContent.map((f) => `\n[${f.name}]\n${f.text}`).join('\n') +
    '\n\n--- Other documents ---\n' +
    otherContent.map((f) => `\n[${f.name}]\n${f.text}`).join('\n')

  const prompt = `You are analyzing source documents for "Ate Days" consumer segmentation and market context.

Extracted text from PowerPoint and Excel files:

${allText}

From the Ate Days materials and any other reports above, extract and output a single JSON object with these exact keys (use the content from the documents; if something is missing, use a short placeholder):
- segments: array of { id (kebab-case), name, share (e.g. "13%"), narrative (1-2 sentences), bullets (array of strings) } for all 6 segments.
- personas: array of { segmentId, name, age, role, household, detail } one per segment.
- productStrategy: { title, subtitle, bundles: [{ name, description }], stat: { value, label }, ltvBullets: string[] }.
- marketplace: { title, subtitle, crashing: { headline, body }, touchpoints: { headline, ruleOf8, nuance } }.
- omniChannel: { title, subtitle, channels: [{ name, pct, examples }], note }.
- nbjStats: optional array of { label, value, source } from NBJ/other reports.
- suggestedCharts: optional { segmentPie: [{ name, value }], topGoals: [{ goal, pct }], channels: [{ name, pct }] }.

Output ONLY valid JSON, no markdown code fence.`

  const msg = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    messages: [{ role: 'user', content: prompt }],
  })
  const text = msg.content.find((c) => c.type === 'text')?.text
  if (!text) throw new Error('No text in Claude response')
  let jsonStr = text.trim()
  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
  if (jsonMatch) jsonStr = jsonMatch[0]
  return JSON.parse(jsonStr)
}

async function main() {
  await loadEnv()
  const docsDir = getDocsPath()
  const fileNames = listDocFiles(docsDir)
  if (fileNames.length === 0) {
    console.log('No PDF/PPTX/XLSX files found. Add documents to', docsDir)
    process.exit(0)
    return
  }
  console.log('Found files:', fileNames.join(', '))

  const { ateDays, other } = await extractAllText(docsDir, fileNames)
  const pdfFiles = fileNames.filter((f) => path.extname(f).toLowerCase() === '.pdf')

  const ateDaysContent = ateDays.length ? ateDays : other
  const otherContent = other.length ? other : []
  if (ateDaysContent.length === 0 && pdfFiles.length === 0) {
    console.log('No extractable content (only PDFs without Gemini). Add PPTX or XLSX to', docsDir)
    process.exit(0)
    return
  }

  let result
  if (process.env.ANTHROPIC_API_KEY) {
    console.log('Using Claude...')
    result = await callClaude(ateDaysContent, otherContent)
  } else if (process.env.GEMINI_API_KEY) {
    console.log('Using Gemini...')
    result = await callGemini(ateDaysContent, otherContent, pdfFiles, docsDir)
  } else {
    console.error('Set ANTHROPIC_API_KEY (easiest) or GEMINI_API_KEY in .env')
    process.exit(1)
  }

  const sources = [
    ...fileNames.map((f) => ({ file: f, description: isAteDaysFile(f) ? 'Ate Days segmentation' : 'Market/context' })),
  ]
  const output = {
    ...result,
    sources,
    generatedAt: new Date().toISOString(),
  }

  const outPath = path.join(projectRoot, 'src', 'data', 'analysis-output.json')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8')
  console.log('Wrote', outPath)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
