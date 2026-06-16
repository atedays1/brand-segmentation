import { IlluminationChartCard } from './IlluminationChartCard'

export function IlluminationDivergenceSpectrum() {
  return (
    <IlluminationChartCard title="Emotional journey spectrum">
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2">
            <span className="text-emerald-400">Discipline · control</span>
            <span className="text-amber-400">Stress · overwhelm</span>
          </div>
          <div className="relative h-2 rounded-full bg-gradient-to-r from-emerald-500/60 via-indigo-500/40 to-amber-500/60">
            <div className="absolute left-[18%] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-900" title="Wellness Architects" />
            <div className="absolute right-[18%] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-400 border-2 border-slate-900" title="Overwhelmed Experimenters" />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
            <span>WA</span>
            <span>OE</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider mb-2">
            <span className="text-emerald-300">“I am better”</span>
            <span className="text-amber-300">“I feel better”</span>
          </div>
          <div className="relative h-2 rounded-full bg-gradient-to-r from-emerald-600/50 via-slate-600/50 to-amber-600/50" />
          <p className="text-[10px] text-slate-500 mt-2 text-center">
            Same category engagement — different emotional payoff
          </p>
        </div>
      </div>
    </IlluminationChartCard>
  )
}
