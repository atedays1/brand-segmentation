import React from 'react'
import path from 'path'
import { fileURLToPath } from 'url'
import { renderToFile } from '@react-pdf/renderer'
import { SleepLandscapePdfDocument } from '../src/pdf/SleepLandscapePdfDocument.jsx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outPath = path.join(__dirname, '..', 'public', 'sleep-supplement-landscape-2021-2026.pdf')

await renderToFile(<SleepLandscapePdfDocument />, outPath)
console.log('Wrote', outPath)
