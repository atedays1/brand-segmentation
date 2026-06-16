#!/usr/bin/env node
/**
 * Clears all Figma export files: data/figma-data.json, public/figma-data.json,
 * and all PNGs in public/extracted-images/
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const paths = [
  path.join(root, 'data', 'figma-data.json'),
  path.join(root, 'public', 'figma-data.json'),
]

const imagesDir = path.join(root, 'public', 'extracted-images')

for (const p of paths) {
  if (fs.existsSync(p)) {
    fs.unlinkSync(p)
    console.log('Removed:', path.relative(root, p))
  }
}

if (fs.existsSync(imagesDir)) {
  const files = fs.readdirSync(imagesDir)
  for (const f of files) {
    const full = path.join(imagesDir, f)
    if (fs.statSync(full).isFile()) {
      fs.unlinkSync(full)
      console.log('Removed:', path.relative(root, full))
    }
  }
}

console.log('Figma exports cleared. Run the plugin again to re-export.')
