import fs from 'fs'
import path from 'path'
import XLSX from 'xlsx'

/**
 * Extract text from an XLSX file: sheet names and first few rows of each sheet as CSV-like text.
 */
export function extractXlsxText(filePath) {
  const buf = fs.readFileSync(filePath)
  const workbook = XLSX.read(buf, { type: 'buffer' })
  const lines = [`File: ${path.basename(filePath)}`, '']
  workbook.SheetNames.slice(0, 20).forEach((name) => {
    const sheet = workbook.Sheets[name]
    const csv = XLSX.utils.sheet_to_csv(sheet, { FS: '\t', blankrows: false })
    const preview = csv.split('\n').slice(0, 80).join('\n')
    lines.push(`Sheet: ${name}`)
    lines.push(preview)
    lines.push('')
  })
  return lines.join('\n')
}
