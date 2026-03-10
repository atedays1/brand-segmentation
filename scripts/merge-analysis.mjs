#!/usr/bin/env node
/**
 * Read src/data/analysis-output.json and merge into existing src/data/*.js modules.
 * Run after npm run analyze-docs to refresh the site with analyzed content.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const dataDir = path.join(projectRoot, 'src', 'data')
const outputPath = path.join(dataDir, 'analysis-output.json')

if (!fs.existsSync(outputPath)) {
  console.warn('No analysis-output.json found. Run npm run analyze-docs first.')
  process.exit(0)
}

const analysis = JSON.parse(fs.readFileSync(outputPath, 'utf8'))

function writeJsModule(filePath, exportName, value) {
  const str = typeof value === 'string' ? value : JSON.stringify(value, null, 2)
  const content = `/** Generated from analysis-output.json - do not edit by hand if re-running merge-analysis */\nexport const ${exportName} = ${str}\n`
  fs.writeFileSync(filePath, content, 'utf8')
  console.log('Wrote', path.relative(projectRoot, filePath))
}

if (analysis.segments?.length) {
  writeJsModule(path.join(dataDir, 'segments.js'), 'segments', analysis.segments)
}
if (analysis.personas?.length) {
  writeJsModule(path.join(dataDir, 'personas.js'), 'personas', analysis.personas)
}
if (analysis.productStrategy) {
  writeJsModule(path.join(dataDir, 'productStrategy.js'), 'productStrategy', analysis.productStrategy)
}
if (analysis.marketplace) {
  const marketplacePath = path.join(dataDir, 'marketplace.js')
  let content = `/** Generated from analysis-output.json */\nexport const marketplace = ${JSON.stringify(analysis.marketplace, null, 2)}\n`
  if (analysis.marketplaceCitations?.length) {
    content += `\nexport const marketplaceCitations = ${JSON.stringify(analysis.marketplaceCitations, null, 2)}\n`
  }
  fs.writeFileSync(marketplacePath, content, 'utf8')
  console.log('Wrote src/data/marketplace.js')
}
if (analysis.omniChannel) {
  writeJsModule(path.join(dataDir, 'omniChannel.js'), 'omniChannel', analysis.omniChannel)
}

console.log('Merge complete.')
