import { jtbdHeatChart } from '../../../data/illuminationChartData'
import { IlluminationChartCard } from './IlluminationChartCard'

const HEAT = {
  3: { label: 'High', short: 'H', dots: 3 },
  2: { label: 'Med', short: 'M', dots: 2 },
  1: { label: 'Low', short: 'L', dots: 1 },
}

function HeatCell({ level, segment }) {
  const heat = HEAT[level] || HEAT[2]
  const isWA = segment === 'wa'
  const base =
    level === 3
      ? isWA
        ? 'bg-emerald-500/35 border-emerald-400/50'
        : 'bg-amber-500/35 border-amber-400/50'
      : level === 2
        ? isWA
          ? 'bg-emerald-500/15 border-emerald-500/30'
          : 'bg-amber-500/15 border-amber-500/30'
        : 'bg-slate-800/60 border-slate-600/40'
  const dotColor = isWA ? 'bg-emerald-400' : 'bg-amber-400'
  const textColor =
    level === 3
      ? isWA
        ? 'text-emerald-200'
        : 'text-amber-200'
      : level === 2
        ? 'text-slate-300'
        : 'text-slate-500'

  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 rounded-lg border px-2 py-2 min-h-[52px] ${base}`}
      title={`${isWA ? 'Wellness Architects' : 'Overwhelmed Experimenters'}: ${heat.label}`}
    >
      <div className="flex gap-1" aria-hidden>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i <= heat.dots ? dotColor : 'bg-slate-600/50'
            }`}
          />
        ))}
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-wide ${textColor}`}>
        {heat.label}
      </span>
    </div>
  )
}

export function IlluminationJtbdHeatChart() {
  return (
    <IlluminationChartCard
      title="Jobs to be done — segment heat"
      subtitle="Filled dots = priority intensity · scan columns to compare segments"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse">
          <thead>
            <tr>
              <th className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 pb-2 pr-3 w-[38%]">
                Job
              </th>
              <th className="text-center text-[10px] font-bold uppercase tracking-wider text-emerald-400/90 pb-2 px-1 w-[31%]">
                WA
              </th>
              <th className="text-center text-[10px] font-bold uppercase tracking-wider text-amber-400/90 pb-2 px-1 w-[31%]">
                OE
              </th>
            </tr>
          </thead>
          <tbody>
            {jtbdHeatChart.map((row) => (
              <tr key={row.job}>
                <td className="text-xs text-slate-300 font-medium py-1.5 pr-3 align-middle leading-snug">
                  {row.job}
                </td>
                <td className="py-1.5 px-1 align-middle">
                  <HeatCell level={row.wa} segment="wa" />
                </td>
                <td className="py-1.5 px-1 align-middle">
                  <HeatCell level={row.oe} segment="oe" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span className="flex gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </span>
          High
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span className="flex gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600/50" />
          </span>
          Med
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-500">
          <span className="flex gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600/50" />
          </span>
          Low
        </div>
      </div>
    </IlluminationChartCard>
  )
}
