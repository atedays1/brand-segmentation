import { useEffect, useMemo, useState } from 'react'
import cloud from 'd3-cloud'
import { quoteWordCloud } from '../../../data/consumerQuotesData'
import { IlluminationChartCard } from './IlluminationChartCard'

const CLOUD_WIDTH = 560
const CLOUD_HEIGHT = 220
const MIN_SIZE = 13
const MAX_SIZE = 44

const FILL_COLORS = [
  '#34d399',
  '#10b981',
  '#6ee7b7',
  '#2dd4bf',
  '#38bdf8',
  '#a7f3d0',
  '#5eead4',
  '#4ade80',
  '#fbbf24',
  '#fcd34d',
  '#67e8f9',
  '#86efac',
]

function fontSize(weight, minW, maxW) {
  if (maxW === minW) return (MIN_SIZE + MAX_SIZE) / 2
  const t = (weight - minW) / (maxW - minW)
  return Math.round(MIN_SIZE + t * (MAX_SIZE - MIN_SIZE))
}

function rotateFor(text) {
  let n = 0
  for (let i = 0; i < text.length; i++) n += text.charCodeAt(i)
  return n % 3 === 0 ? 90 : 0
}

function layoutCloud(words, width, height) {
  const weights = words.map((w) => w.weight)
  const minW = Math.min(...weights)
  const maxW = Math.max(...weights)

  const cloudWords = words.map((w, i) => ({
    text: w.text,
    weight: w.weight,
    size: fontSize(w.weight, minW, maxW),
    color: FILL_COLORS[i % FILL_COLORS.length],
    rotate: rotateFor(w.text),
  }))

  return new Promise((resolve) => {
    cloud()
      .size([width, height])
      .words(cloudWords)
      .padding(3)
      .rotate((d) => d.rotate)
      .font('Inter, system-ui, sans-serif')
      .fontSize((d) => d.size)
      .spiral('archimedean')
      .on('end', (placed) => resolve(placed))
      .start()
  })
}

export function IlluminationQuoteWordCloud() {
  const [placed, setPlaced] = useState([])
  const wordsKey = useMemo(() => quoteWordCloud.map((w) => `${w.text}:${w.weight}`).join('|'), [])

  useEffect(() => {
    let cancelled = false
    layoutCloud(quoteWordCloud, CLOUD_WIDTH, CLOUD_HEIGHT).then((result) => {
      if (!cancelled) setPlaced(result)
    })
    return () => {
      cancelled = true
    }
  }, [wordsKey])

  const cx = CLOUD_WIDTH / 2
  const cy = CLOUD_HEIGHT / 2

  return (
    <IlluminationChartCard
      title="Quote word cloud"
      subtitle="18 IDI & ethnography excerpts, sized by thematic weight across WA and OE"
    >
      <div className="flex justify-center overflow-hidden">
        <svg
          viewBox={`0 0 ${CLOUD_WIDTH} ${CLOUD_HEIGHT}`}
          className="w-full max-w-[560px] h-[220px]"
          role="img"
          aria-label="Word cloud of consumer interview themes"
        >
          <g transform={`translate(${cx},${cy})`}>
            {placed.map((word) => (
              <text
                key={word.text}
                textAnchor="middle"
                transform={`translate(${word.x},${word.y}) rotate(${word.rotate})`}
                fill={word.color}
                fontSize={word.size}
                fontFamily="Inter, system-ui, sans-serif"
                fontWeight={word.size >= 28 ? 700 : word.size >= 20 ? 600 : 500}
                className="select-none"
              >
                {word.text}
              </text>
            ))}
          </g>
        </svg>
      </div>
      <p className="text-[10px] text-slate-500 text-center mt-1 border-t border-white/10 pt-2">
        Larger words appear more often in consumer language from the report
      </p>
    </IlluminationChartCard>
  )
}
