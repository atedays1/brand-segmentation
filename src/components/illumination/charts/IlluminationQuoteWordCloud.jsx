import { quoteWordCloud } from '../../../data/consumerQuotesData'
import { IlluminationChartCard } from './IlluminationChartCard'

const MIN_SIZE = 11
const MAX_SIZE = 28

function wordSize(weight, minW, maxW) {
  if (maxW === minW) return (MIN_SIZE + MAX_SIZE) / 2
  const t = (weight - minW) / (maxW - minW)
  return MIN_SIZE + t * (MAX_SIZE - MIN_SIZE)
}

const COLORS = [
  'text-emerald-300',
  'text-emerald-400/90',
  'text-sky-300',
  'text-indigo-300',
  'text-amber-300',
  'text-teal-300',
  'text-emerald-200',
]

export function IlluminationQuoteWordCloud() {
  const weights = quoteWordCloud.map((w) => w.weight)
  const minW = Math.min(...weights)
  const maxW = Math.max(...weights)

  return (
    <IlluminationChartCard
      title="Quote word cloud"
      subtitle="18 IDI & ethnography excerpts · sized by thematic weight across WA and OE"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-3 px-1 min-h-[140px]">
        {quoteWordCloud.map((item, i) => (
          <span
            key={item.text}
            className={`font-semibold leading-tight ${COLORS[i % COLORS.length]} hover:text-white transition-colors`}
            style={{ fontSize: `${wordSize(item.weight, minW, maxW)}px` }}
            title={`weight: ${item.weight}`}
          >
            {item.text}
          </span>
        ))}
      </div>
      <p className="text-[10px] text-slate-500 text-center mt-2 border-t border-white/10 pt-2">
        Larger words = more repeated across consumer language in the report
      </p>
    </IlluminationChartCard>
  )
}
