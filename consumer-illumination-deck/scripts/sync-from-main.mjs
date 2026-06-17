import { cpSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const main = join(root, '..', 'src')
const dest = join(root, 'src')

const copies = [
  ['pages/ConsumerIlluminationDeckPage.jsx', 'pages/ConsumerIlluminationDeckPage.jsx'],
  ['components/BackgroundDecor.jsx', 'components/BackgroundDecor.jsx'],
  ['components/illumination', 'components/illumination'],
  ['data/consumerIlluminationSlides.js', 'data/consumerIlluminationSlides.js'],
  ['data/illuminationChartData.js', 'data/illuminationChartData.js'],
]

for (const [from, to] of copies) {
  const target = join(dest, to)
  mkdirSync(dirname(target), { recursive: true })
  cpSync(join(main, from), target, { recursive: true })
  console.log(`synced ${from}`)
}

const publicRoot = join(root, '..', 'public')
const publicDest = join(root, 'public')
mkdirSync(publicDest, { recursive: true })
cpSync(join(publicRoot, 'ate-days-logo.jpg'), join(publicDest, 'ate-days-logo.jpg'))
console.log('synced public/ate-days-logo.jpg')

console.log('Done. exportReportToPdf.js is local to this package — update manually if needed.')
