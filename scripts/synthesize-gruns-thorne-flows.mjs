#!/usr/bin/env node
/**
 * Send Gruns-Thorne flow images to Claude; get structured flow summary and copy for the deck.
 * Output: src/data/grunsThorneFlows.json
 *
 * Requires: ANTHROPIC_API_KEY in .env
 * Run: npm run synthesize-gruns-thorne-flows
 * (Run npm run extract-pdf-flows first to generate the flow images.)
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const flowsDir = path.join(projectRoot, 'public', 'images', 'marketReality', 'flows')

async function loadEnv() {
  try {
    const dotenv = await import('dotenv')
    dotenv.config({ path: path.join(projectRoot, '.env') })
  } catch (_) {}
}

function imagePathToBase64(filePath) {
  const buf = fs.readFileSync(filePath)
  return buf.toString('base64')
}

const PROMPT = `You are a senior designer and market researcher. You are looking at consumer flow diagrams from a PDF for two supplement brands: Grüns and Thorne.

Describe each flow clearly and produce short, punchy copy we can use on a scrollytelling slide titled "A New Option (Taking the Lead)". Our deck already says:
- Grüns: "Format Disruption" — changing physical delivery format (fun, daily habit) wins the market; we'll pattern UGC and distribution on the novel, easy, fast-acting experience.
- Thorne: "Clinical Authority" — gold standard for clinical trust and clean ingredients; we'll adopt scientific rigor, open formulas, to capture Wellness Optimizers.

Output a single JSON object with this exact structure (no markdown fence, no extra text):

{
  "gruns": {
    "flowSummary": "2-3 sentences describing the Grüns consumer flow from the diagram.",
    "steps": ["step 1 label", "step 2 label", "..."],
    "headline": "One short headline for the Grüns flow (e.g. for above the flow image).",
    "caption": "One sentence caption for the flow image."
  },
  "thorne": {
    "flowSummary": "2-3 sentences describing the Thorne consumer flow from the diagram.",
    "steps": ["step 1 label", "step 2 label", "..."],
    "headline": "One short headline for the Thorne flow.",
    "caption": "One sentence caption for the flow image."
  },
  "mergeNotes": "1-2 sentences on how these flows connect to our existing 'Format Disruption' and 'Clinical Authority' narrative (optional)."
}

If there are three images, assume: image 1 = Grüns, image 2 = Thorne, image 3 = optional extra (e.g. comparison or summary); you can fold image 3 into mergeNotes or one of the flows. Output only the JSON object.`

async function main() {
  await loadEnv()
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not set in .env')
    process.exit(1)
  }

  const grunsPath = path.join(flowsDir, 'gruns-flow.png')
  const thornePath = path.join(flowsDir, 'thorne-flow.png')
  if (!fs.existsSync(grunsPath) || !fs.existsSync(thornePath)) {
    console.error('Flow images not found. Run: npm run extract-pdf-flows')
    process.exit(1)
  }

  const content = [
    { type: 'text', text: PROMPT },
    {
      type: 'image',
      source: {
        type: 'base64',
        media_type: 'image/png',
        data: imagePathToBase64(grunsPath),
      },
    },
    {
      type: 'image',
      source: {
        type: 'base64',
        media_type: 'image/png',
        data: imagePathToBase64(thornePath),
      },
    },
  ]

  const page3Path = path.join(flowsDir, 'page-3.png')
  if (fs.existsSync(page3Path)) {
    content.push({
      type: 'text',
      text: 'Third image (below) may be a comparison or summary page; use it to enrich your flow descriptions or mergeNotes if relevant.',
    })
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: 'image/png',
        data: imagePathToBase64(page3Path),
      },
    })
  }

  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const client = new Anthropic({ apiKey })
  console.log('Calling Claude with flow images...')
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{ role: 'user', content }],
  })
  const text = msg.content.find((c) => c.type === 'text')?.text
  if (!text) throw new Error('No text in Claude response')
  let jsonStr = text.trim()
  const match = jsonStr.match(/\{[\s\S]*\}/)
  if (match) jsonStr = match[0]
  const data = JSON.parse(jsonStr)

  const outPath = path.join(projectRoot, 'src', 'data', 'grunsThorneFlows.json')
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8')
  console.log('Wrote', outPath)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
