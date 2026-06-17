import { tierPyramid } from '../../../data/illuminationChartData'
import { IlluminationChartCard } from './IlluminationChartCard'

const ACCENT = {
  emerald: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300',
  sky: 'border-sky-500/40 bg-sky-500/15 text-sky-300',
  amber: 'border-amber-500/40 bg-amber-500/15 text-amber-300',
}

export function IlluminationTierPyramid() {
  return (
    <IlluminationChartCard title="Tiered product architecture" subtitle="SBK strategic implications , one platform, scaled depth">
      <div className="flex flex-col items-center gap-2 py-2 max-w-lg mx-auto">
        {tierPyramid.map((t) => {
          const style = ACCENT[t.accent] || ACCENT.sky
          return (
            <div
              key={t.tier}
              className={`rounded-lg border px-4 py-3 text-center ${style}`}
              style={{ width: t.width }}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-90">{t.tier}</p>
              <p className="text-xs font-semibold text-white mt-0.5">{t.audience}</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-snug">{t.detail}</p>
            </div>
          )
        })}
      </div>
    </IlluminationChartCard>
  )
}
