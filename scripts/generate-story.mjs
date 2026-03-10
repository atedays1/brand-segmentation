#!/usr/bin/env node
/**
 * Generate the narrative layer (story headlines, transitions, so-what lines) from
 * existing segment/product/marketplace data using Claude. Output: src/data/narrative.js
 *
 * Requires: ANTHROPIC_API_KEY in .env
 * Run: npm run generate-story
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

async function loadEnv() {
  try {
    const dotenv = await import('dotenv')
    dotenv.config({ path: path.join(projectRoot, '.env') })
  } catch (_) {}
}

async function importDataFile(name) {
  const fp = path.join(projectRoot, 'src', 'data', name + '.js')
  const url = pathToFileURL(fp).href
  return import(url)
}

async function loadData() {
  const [seg, pers, prod, mkt, comp, omni, askMod] = await Promise.all([
    importDataFile('segments'),
    importDataFile('personas'),
    importDataFile('productStrategy'),
    importDataFile('marketplace'),
    importDataFile('competitive'),
    importDataFile('omniChannel'),
    importDataFile('ask'),
  ])
  return {
    segments: seg.segments,
    personas: pers.personas,
    productStrategy: prod.productStrategy,
    marketplace: mkt.marketplace,
    competitive: comp.competitive,
    omniChannel: omni.omniChannel,
    ask: askMod.ask,
  }
}

function buildPrompt(data) {
  const { segments, personas, productStrategy, marketplace, competitive, omniChannel, ask } = data
  return `You are a senior brand manager / creative director. Your job is to write the narrative layer for a scrollytelling deck that will be presented to three engaged, wealthy, integrated founders. The goal is to align them on: (1) target segments/audiences, (2) products and SKUs those audiences would enjoy, and (3) what it takes to win in the space.

Below is the existing data (segments, personas, product strategy, marketplace, competitive, omni-channel, ask). Use it as evidence. Write ONLY the story wrapper: headlines, transitions, and "so what" lines that make the deck feel like a compelling story, not an info dump.

Tone: Confident, concise, "we" and "our"; evidence-based but with a clear POV; no jargon. Every line should earn its place.

Output a single JSON object with exactly this structure (all string values; no markdown code fence):
{
  "intro": {
    "hook": "One opening line that sets the stakes (e.g. We're not just launching a supplement—we're personalizing functional nutrition for people who are already looking for it.)",
    "stakes": "One line on what we're asking today (align on who we serve, what we offer, how we win).",
    "throughLine": "One line that states the three-part arc: our people, our products, how we win."
  },
  "chapterLabels": {
    "ourPeople": "Our people.",
    "theOpportunity": "The opportunity.",
    "howWeWin": "How we win."
  },
  "segments": [
    { "headline": "Story headline for segment 1 (e.g. The Planner: She doesn't guess—she plans.)", "transition": "One line that links to the next (e.g. 21% of our base. Here's how we serve her.)" },
    ... one object per segment (6 total), in the same order as the segments data below.
  ],
  "productStrategy": {
    "headline": "Headline that frames the product section (e.g. So what do we offer them?)",
    "soWhat": "One line that ties bundles to segments and winning."
  },
  "marketplace": {
    "headline": "Headline (e.g. The category is shifting.)",
    "soWhat": "One line on why now / why this way."
  },
  "competitive": {
    "headline": "Headline (e.g. Others are already winning. We're patterning after the best.)",
    "soWhat": "One sentence that makes Thorne vs Grüns a strategic choice."
  },
  "omniChannel": {
    "headline": "Headline (e.g. Where we show up and how we win.)",
    "soWhat": "One line that leads into the ask."
  },
  "ask": {
    "headline": "Headline for the close (e.g. Lock these segments.)",
    "closingLine": "One compelling sentence that states the decision and what it unlocks (brand brief, naming, positioning).",
    "followUpLead": "Optional one line that introduces the follow-up bullets."
  }
}

DATA:

Segments (name, share, narrative, bullets):
${JSON.stringify(segments.map((s) => ({ name: s.name, share: s.share, narrative: s.narrative, bullets: s.bullets })), null, 2)}

Personas (segmentId, name, age, role, household, detail):
${JSON.stringify(personas, null, 2)}

Product strategy: ${JSON.stringify(productStrategy, null, 2)}

Marketplace: ${JSON.stringify(marketplace, null, 2)}

Competitive (brands): ${JSON.stringify(competitive.brands.map((b) => ({ name: b.name, tagline: b.tagline })), null, 2)}

Omni-channel: ${JSON.stringify(omniChannel, null, 2)}

Ask: ${JSON.stringify(ask, null, 2)}

Output ONLY the JSON object, no markdown.`
}

async function callClaude(prompt) {
  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set in .env')
  const client = new Anthropic({ apiKey })
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  })
  const text = msg.content.find((c) => c.type === 'text')?.text
  if (!text) throw new Error('No text in Claude response')
  let jsonStr = text.trim()
  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
  if (jsonMatch) jsonStr = jsonMatch[0]
  return JSON.parse(jsonStr)
}

function narrativeToJs(narrative) {
  return `/**
 * Story layer for the deck: headlines, transitions, so-what lines.
 * Generated by npm run generate-story. Edit by hand to refine voice.
 */
export const narrative = ${JSON.stringify(narrative, null, 2)}
`
}

async function main() {
  await loadEnv()
  console.log('Loading data...')
  const data = await loadData()
  console.log('Calling Claude to generate narrative...')
  const prompt = buildPrompt(data)
  const narrative = await callClaude(prompt)
  const outPath = path.join(projectRoot, 'src', 'data', 'narrative.js')
  fs.writeFileSync(outPath, narrativeToJs(narrative), 'utf8')
  console.log('Wrote', outPath)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
