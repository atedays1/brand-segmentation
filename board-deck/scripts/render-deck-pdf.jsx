import React from 'react'
import path from 'path'
import { fileURLToPath } from 'url'
import { renderToFile } from '@react-pdf/renderer'
import { DeckPdfDocument } from '../src/pdf/DeckPdfDocument.jsx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, '..', 'dist', 'ate-days-board-deck.pdf')

await renderToFile(<DeckPdfDocument />, outPath)
console.log('Wrote', outPath)
