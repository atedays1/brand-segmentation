#!/usr/bin/env node
/**
 * Extract each page of Gruns-Thorne.pdf as PNG into public/images/marketReality/flows/.
 * Page 1 → gruns-flow.png, Page 2 → thorne-flow.png (if 2 pages); else page-1.png, page-2.png, ...
 *
 * Requires: pdf-to-img (npm install)
 * Run: npm run extract-pdf-flows
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { pdf } from 'pdf-to-img'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const pdfPath = path.join(projectRoot, 'Gruns-Thorne.pdf')
const outDir = path.join(projectRoot, 'public', 'images', 'marketReality', 'flows')

const FLOW_NAMES = ['gruns-flow', 'thorne-flow'] // page 1 = Grüns, page 2 = Thorne

async function main() {
  if (!fs.existsSync(pdfPath)) {
    console.error('Gruns-Thorne.pdf not found at project root.')
    process.exit(1)
  }
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
  }

  const document = await pdf(pdfPath, { scale: 1 })
  let pageNum = 1
  for await (const image of document) {
    const baseName = pageNum <= FLOW_NAMES.length ? FLOW_NAMES[pageNum - 1] : `page-${pageNum}`
    const outPath = path.join(outDir, `${baseName}.png`)
    fs.writeFileSync(outPath, image)
    console.log(`Wrote ${outPath}`)
    pageNum++
  }
  console.log(`Done. Extracted ${pageNum - 1} page(s).`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
