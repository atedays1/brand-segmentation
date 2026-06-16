#!/usr/bin/env node
/**
 * Deep analysis of SBK Consumer Illumination report → founder deck JSON.
 * Requires: ANTHROPIC_API_KEY in .env
 * Run: npm run analyze-illumination
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

const DEFAULT_PDF =
  '/Users/cmorell/Downloads/Ate Days Wellness Consumer Illumination Final Report_5_26_26_Shared.pdf'

async function loadEnv() {
  try {
    const dotenv = await import('dotenv')
    dotenv.config({ path: path.join(projectRoot, '.env') })
  } catch (_) {}
}

async function extractPdfText(pdfPath) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
  const data = new Uint8Array(fs.readFileSync(pdfPath))
  const doc = await pdfjs.getDocument({ data }).promise
  const pages = []
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p)
    const content = await page.getTextContent()
    const text = content.items.map((i) => i.str).join(' ')
    pages.push({ page: p, text })
  }
  return pages
}

async function callClaude(client, prompt, maxTokens = 8192) {
  const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6'
  const msg = await client.messages.create({
    model,
    max_tokens: maxTokens,
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
  const pdfPath = process.env.ILLUMINATION_PDF_PATH || DEFAULT_PDF
  if (!fs.existsSync(pdfPath)) {
    console.error('PDF not found:', pdfPath)
    process.exit(1)
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not set in .env')
    process.exit(1)
  }

  console.log('Extracting text from', pdfPath)
  const pages = await extractPdfText(pdfPath)
  const fullText = pages.map((p) => `\n--- PAGE ${p.page} ---\n${p.text}`).join('\n')
  console.log(`Extracted ${pages.length} pages (${fullText.length} chars)`)

  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const client = new Anthropic({ apiKey })

  console.log('Pass A: segment deep analysis...')
  const passA = await callClaude(
    client,
    `You are analyzing the SBK "Consumer Illumination: Wellness Architects and Overwhelmed Experimenters" report for Ate Days founders.

REPORT TEXT:
${fullText}

Extract a JSON object with these keys:
- reportMeta: { title, date, methodology: { ethnography, idis } }
- targetSegments: { wellnessArchitects: { share, spend, role, narrative, values[], approach, fnRole, keyNeeds[], keyTensions[], purchaseBehavior, idealProducts[], quotes[] }, overwhelmedExperimenters: { same structure } }
- sharedGround: { themes[], sleepInsight, fnJobs[], fnIdeals[], purchasePath[] }
- divergences: { dimensions: [{ label, wellnessArchitects, overwhelmedExperimenters }] }
- jobsToBeDone: { jobs: [{ name, functional[], emotional[], outcomes, heatWA, heatOE }] }
- strategicImplications: { platform: { positioningSpaces[], brandPromise[], product[] }, segmentNuance: { wellnessArchitects, overwhelmedExperimenters }, tieredProducts[] }
- keyStats: [{ label, value, segment? }]

Use verbatim consumer quotes where possible. Output ONLY valid JSON.`,
    12000,
  )

  console.log('Pass B: synthesize 12 founder slides...')
  const passB = await callClaude(
    client,
    `You are creating a 12-slide founder deck summary from this analysis of the SBK Consumer Illumination report.

ANALYSIS:
${JSON.stringify(passA, null, 2)}

Create exactly 12 slides for founders who already know the research program. Each slide needs 2-3 minutes of spoken content.

Output JSON:
{
  "slides": [
    {
      "id": "kebab-case",
      "slideNumber": 1,
      "title": "...",
      "titleHighlight": "optional word to accent",
      "subtitle": "one line",
      "layout": "cover|bullets|compare|tensions|segmentProfile|jtbdHeat|implications|decisions",
      "headerIcon": "Target|Users|Sparkles|GitCompare|Brain|Zap|Moon|Heart|Radar|CheckSquare",
      "bullets": ["..."],
      "compare": { "left": { "label", "items[]" }, "right": { "label", "items[]" } },
      "stats": [{ "label", "value", "note?" }],
      "quotes": [{ "text", "attribution" }],
      "tensions": [{ "title", "context", "opportunity?" }],
      "jtbd": [{ "job", "heatWA": "high|medium|low", "heatOE": "high|medium|low" }],
      "decisions": [{ "question", "options[]", "recommendation?" }],
      "speakerNotes": "300-450 words for presenting",
      "implications": ["so-what bullet"]
    }
  ]
}

Slide arc:
1 Why this report now
2 Two targets one market
3 What unites them
4 Where they diverge
5 WA mindset
6 WA wins/loses
7 OE mindset
8 OE wins/loses
9 JTBD heat map
10 Platform implications both
11 Segment nuance fork
12 Decisions for Ate Days

Output ONLY valid JSON.`,
    16000,
  )

  const output = {
    generatedAt: new Date().toISOString(),
    sourcePdf: pdfPath,
    analysis: passA,
    deck: passB,
  }

  const outPath = path.join(projectRoot, 'src', 'data', 'consumerIlluminationAnalysis.json')
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2))
  console.log('Wrote', outPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
