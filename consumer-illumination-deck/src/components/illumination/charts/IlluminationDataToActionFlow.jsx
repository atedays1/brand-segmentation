import { ArrowDown, ArrowRight } from 'lucide-react'
import { dataToActionFlow } from '../../../data/illuminationChartData'
import { IlluminationChartCard } from './IlluminationChartCard'

function FlowStage({ stage, isLast }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-4 py-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/90 mb-2">
          {stage.label}
        </p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {stage.items.map((item) => (
            <span
              key={item}
              className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-slate-900/50 text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      {!isLast && <ArrowDown size={18} className="text-emerald-500/50 my-1.5 flex-shrink-0" aria-hidden />}
    </div>
  )
}

function SegmentOutcome({ segment, accent, data }) {
  const styles =
    accent === 'emerald'
      ? 'border-emerald-500/35 bg-emerald-500/10'
      : 'border-amber-500/35 bg-amber-500/10'
  const labelColor = accent === 'emerald' ? 'text-emerald-300' : 'text-amber-300'

  return (
    <div className={`rounded-xl border ${styles} p-3 flex-1 min-w-0`}>
      <p className={`text-[10px] font-bold uppercase tracking-wider ${labelColor} mb-2`}>
        {segment}
      </p>
      <div className="space-y-1.5 text-[10px] text-slate-300 leading-snug">
        <p>
          <span className="text-slate-500">Channel · </span>
          {data.channel}
        </p>
        <p>
          <span className="text-slate-500">Cadence · </span>
          {data.cadence}
        </p>
        <p>
          <span className="text-slate-500">Message · </span>
          {data.message}
        </p>
      </div>
    </div>
  )
}

export function IlluminationDataToActionFlow() {
  const { stages, outcomes } = dataToActionFlow

  return (
    <IlluminationChartCard
      title="Data distills into action"
      subtitle="Persona insight → tailored channel, cadence & messaging → segment engagement"
    >
      <div className="space-y-1">
        {stages.map((stage, i) => (
          <FlowStage key={stage.id} stage={stage} isLast={i === stages.length - 1} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 my-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
          Agency sweet spot
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 items-stretch">
        <SegmentOutcome segment="Wellness Architects" accent="emerald" data={outcomes.wa} />
        <ArrowRight size={16} className="hidden sm:block text-slate-600 self-center flex-shrink-0" aria-hidden />
        <SegmentOutcome segment="Overwhelmed Experimenters" accent="amber" data={outcomes.oe} />
      </div>
    </IlluminationChartCard>
  )
}
