#!/usr/bin/env node
/**
 * Generate image prompts and stock search terms for Market Reality slides using Claude.
 * Output: src/data/marketRealityImagePrompts.json and public/images/marketReality/README.md
 *
 * Requires: ANTHROPIC_API_KEY in .env
 * Run: npm run generate-market-reality-images
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

async function loadSlideData() {
  const fp = path.join(projectRoot, 'src', 'data', 'marketRealitySlides.js')
  const url = pathToFileURL(fp).href
  const mod = await import(url)
  return mod.marketRealitySlides
}

const VISUAL_INTENT = `
Slide 1 (Market Reality): Crisis of trust, pill fatigue, friction, disruption, waterless powder solution.
Visual: Dark, high-impact; abstract "trust broken" or "friction", or clean "disruption" (modern powder/sachet). No literal pill bottles; mood (tension/clarity) or product-style hero.

Slide 2 (Our People): Two personas—Mike (Practical Minimalist), Maria (Wellness Optimizer); launch audience.
Visual: Optional subtle hero/background—e.g. "two people, wellness, diverse"—to reinforce "our people". Cards are focus.

Slide 3 (DTC & Shopify): Digital-first, 51%/18% stats, Shopify/Skio/ReConvert, competitive moat.
Visual: Data-driven, clean; e-commerce (cart, device, dashboard), growth charts, or abstract digital/tech stack. Professional startup/SaaS aesthetic.

Slide 4 (A New Option): Thorne vs Grüns; format disruption + clinical authority; Ate Days as new option.
Visual: Two brand-style visuals (premium supplement/gummy vs clinical bottle) or one hero suggesting "two paths, one new option." Premium, trustworthy.
`

function buildPrompt(slides) {
  return `You are a senior designer. Your job is to output image prompts and stock-photo search terms for a 4-slide "Market Reality" scrollytelling webpage. Each slide has a hero image slot. Use the slide content and visual intent below.

VISUAL INTENT (content-driven):
${VISUAL_INTENT}

SLIDE COPY (exact text from the deck):
${JSON.stringify(slides, null, 2)}

Output a single JSON object with this structure (no markdown fence):
{
  "slide1": {
    "prompt": "One detailed image prompt for an AI image generator (e.g. Imagen/Nano Banana): descriptive, visual, no brand names; style: professional, modern, startup deck. 1-2 sentences.",
    "searchTerms": ["term1", "term2", "term3"]
  },
  "slide2": { "prompt": "...", "searchTerms": ["..."] },
  "slide3": { "prompt": "...", "searchTerms": ["..."] },
  "slide4": { "prompt": "...", "searchTerms": ["..."] }
}

Rules:
- prompt: Suitable for AI image generation (English, no logos/brand names). Evoke the slide mood and content.
- searchTerms: 2-4 short phrases for Pexels/Unsplash search (e.g. "supplement powder sachet", "ecommerce dashboard startup").
Output ONLY the JSON object.`
}

async function callClaude(prompt) {
  const Anthropic = (await import('@anthropic-ai/sdk')).default
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set in .env')
  const client = new Anthropic({ apiKey })
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  })
  const text = msg.content.find((c) => c.type === 'text')?.text
  if (!text) throw new Error('No text in Claude response')
  let jsonStr = text.trim()
  const match = jsonStr.match(/\{[\s\S]*\}/)
  if (match) jsonStr = match[0]
  return JSON.parse(jsonStr)
}

function pexelsUrl(term) {
  return `https://www.pexels.com/search/${encodeURIComponent(term)}/`
}
function unsplashUrl(term) {
  return `https://unsplash.com/s/photos/${encodeURIComponent(term.replace(/\s+/g, '-'))}`
}

function buildReadme(prompts) {
  const lines = [
    '# Market Reality slide images',
    '',
    'Add one hero image per slide. Filenames: `slide1-hero.png`, `slide2-hero.png`, `slide3-hero.png`, `slide4-hero.png`.',
    '',
    '## AI image prompts (from Claude)',
    '',
  ]
  for (const [key, obj] of Object.entries(prompts)) {
    const label = { slide1: 'Slide 1: Market Reality', slide2: 'Slide 2: Our People', slide3: 'Slide 3: DTC & Shopify', slide4: 'Slide 4: A New Option' }[key] || key
    lines.push(`### ${label}`)
    lines.push('')
    lines.push('**Prompt:** ' + (obj.prompt || ''))
    lines.push('')
    if (obj.searchTerms && obj.searchTerms.length) {
      lines.push('**Stock search terms:**')
      lines.push('')
      lines.push('| Search query | Pexels | Unsplash |')
      lines.push('|--------------|--------|----------|')
      for (const term of obj.searchTerms) {
        lines.push(`| ${term} | [Search](${pexelsUrl(term)}) | [Search](${unsplashUrl(term)}) |`)
      }
      lines.push('')
    }
  }
  lines.push('---')
  lines.push('')
  lines.push('Pexels and Unsplash allow free commercial use. Download an image and save as the filename above.')
  return lines.join('\n')
}

async function main() {
  await loadEnv()
  console.log('Loading slide data...')
  const slides = await loadSlideData()
  console.log('Calling Claude for image prompts and search terms...')
  const prompt = buildPrompt(slides)
  const prompts = await callClaude(prompt)

  const promptsPath = path.join(projectRoot, 'src', 'data', 'marketRealityImagePrompts.json')
  fs.writeFileSync(promptsPath, JSON.stringify(prompts, null, 2), 'utf8')
  console.log('Wrote', promptsPath)

  const readmePath = path.join(projectRoot, 'public', 'images', 'marketReality', 'README.md')
  fs.writeFileSync(readmePath, buildReadme(prompts), 'utf8')
  console.log('Wrote', readmePath)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
