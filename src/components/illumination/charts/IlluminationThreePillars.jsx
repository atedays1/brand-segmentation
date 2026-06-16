import { Apple, Footprints, Moon } from 'lucide-react'
import { IlluminationChartCard } from './IlluminationChartCard'

const PILLARS = [
  {
    icon: Apple,
    label: 'Nutrition',
    detail: 'Whole foods, gaps, clean inputs',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Footprints,
    label: 'Movement',
    detail: 'Exercise & daily activity',
    color: 'text-sky-400',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/10',
  },
  {
    icon: Moon,
    label: 'Sleep',
    detail: 'Foundational to all other health',
    color: 'text-indigo-400',
    border: 'border-indigo-500/30',
    bg: 'bg-indigo-500/10',
  },
]

export function IlluminationThreePillars() {
  return (
    <IlluminationChartCard
      title="Universal pillars"
      subtitle="Named unprompted by both segments in ethnography"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
        {PILLARS.map((p, i) => {
          const Icon = p.icon
          return (
            <div key={p.label} className="flex items-center gap-3">
              <div
                className={`flex flex-col items-center text-center rounded-xl border ${p.border} ${p.bg} px-5 py-4 min-w-[120px]`}
              >
                <Icon size={28} className={`${p.color} mb-2`} strokeWidth={1.5} />
                <p className="text-sm font-bold text-white">{p.label}</p>
                <p className="text-[10px] text-slate-400 mt-1 leading-snug">{p.detail}</p>
              </div>
              {i < PILLARS.length - 1 && (
                <span className="hidden sm:block text-slate-600 text-lg font-light">+</span>
              )}
            </div>
          )
        })}
      </div>
    </IlluminationChartCard>
  )
}
