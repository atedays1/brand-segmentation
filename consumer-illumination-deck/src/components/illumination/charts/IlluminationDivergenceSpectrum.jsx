import { IlluminationChartCard } from './IlluminationChartCard'

export function IlluminationDivergenceSpectrum() {
  return (
    <IlluminationChartCard title="Nuance on a shared platform" subtitle="Same category engagement, different lead benefit emphasis">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2">
            <span className="text-emerald-400">Primary · discipline & control</span>
            <span className="text-amber-400">Secondary · stress & bandwidth</span>
          </div>
          <div className="relative h-2 rounded-full bg-gradient-to-r from-emerald-500/60 via-indigo-500/40 to-amber-500/60">
            <div className="absolute left-[18%] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" title="Wellness Architects" />
            <div className="absolute right-[18%] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 border-2 border-slate-900" title="Overwhelmed Experimenters" />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
            <span>WA · primary</span>
            <span className="text-indigo-400/70">shared engagement</span>
            <span>OE · secondary</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2">
            <span className="text-emerald-300">Lead: "I am better"</span>
            <span className="text-amber-300">Lead: "I feel better"</span>
          </div>
          <div className="relative h-2 rounded-full bg-gradient-to-r from-emerald-600/50 via-indigo-500/30 to-amber-600/50" />
          <p className="text-[10px] text-slate-500 mt-2 text-center">
            Emotional nuance sits on top of the same FN category and purchase logic
          </p>
        </div>
      </div>
    </IlluminationChartCard>
  )
}
