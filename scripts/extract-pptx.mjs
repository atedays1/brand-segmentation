import fs from 'fs'
import path from 'path'
import JSZip from 'jszip'

/**
 * Extract text from PPTX by reading slide XML and pulling <a:t> text nodes.
 */
export async function extractPptxText(filePath) {
  const buf = fs.readFileSync(filePath)
  const zip = await JSZip.loadAsync(buf)
  const lines = [`File: ${path.basename(filePath)}`, '']
  const slideFiles = Object.keys(zip.files).filter((n) => n.match(/^ppt\/slides\/slide\d+\.xml$/))
  slideFiles.sort((a, b) => {
    const na = parseInt(a.replace(/\D/g, ''), 10)
    const nb = parseInt(b.replace(/\D/g, ''), 10)
    return na - nb
  })
  for (const name of slideFiles) {
    const xml = await zip.files[name].async('string')
    const textNodes = xml.match(/<a:t>([^<]*)<\/a:t>/g)
    if (textNodes) {
      const text = textNodes.map((n) => n.replace(/<\/?a:t>/g, '').trim()).filter(Boolean)
      if (text.length) {
        lines.push(`--- Slide ${slideFiles.indexOf(name) + 1} ---`)
        lines.push(text.join(' '))
        lines.push('')
      }
    }
  }
  return lines.join('\n')
}
