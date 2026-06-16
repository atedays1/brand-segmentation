import {
  Target,
  Crosshair,
  Sparkles,
  ChevronRight,
  Building2,
  Handshake,
} from 'lucide-react'

const EMERALD = '#10b981'

function ChipRow({ items, variant = 'default' }) {
  if (!items?.length) return null
  const styles =
    variant === 'kpi'
      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
      : 'border-slate-600/50 bg-slate-800/60 text-slate-300'
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${styles}`}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

function PillarCard({ icon: Icon, title, items }) {
  const list = Array.isArray(items) ? items : [items]
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/40 p-3 md:p-4 h-full">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} strokeWidth={2} style={{ color: EMERALD }} className="flex-shrink-0" />
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/90">{title}</h3>
      </div>
      <ul className="space-y-1.5">
        {list.map((item, i) => (
          <li key={i} className="text-xs text-slate-300 leading-snug pl-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function PhaseStrip({ phases }) {
  if (!phases?.length) return null
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      {phases.map((phase, i) => (
        <div key={phase.label} className="flex-1 flex items-stretch gap-2 min-w-0">
          <div className="flex-1 rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 mb-0.5">
              {phase.label}
            </p>
            <p className="text-xs text-slate-300 leading-snug">{phase.detail}</p>
          </div>
          {i < phases.length - 1 && (
            <ChevronRight
              size={18}
              className="hidden sm:block text-slate-600 flex-shrink-0 self-center"
              aria-hidden
            />
          )}
        </div>
      ))}
    </div>
  )
}

function DeliverablePipeline({ steps }) {
  if (!steps?.length) return null
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/50 p-3 md:p-4">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
        What we expect over time
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
        {steps.map((step, i) => (
          <div key={step.label} className="relative flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-emerald-950 bg-emerald-400 flex-shrink-0"
                aria-hidden
              >
                {i + 1}
              </span>
              <span className="text-xs font-bold text-white">{step.label}</span>
            </div>
            <p className="text-[10px] text-slate-500 mb-1.5 leading-tight">{step.summary}</p>
            <ul className="space-y-1 flex-1">
              {step.points.map((p) => (
                <li key={p} className="text-[11px] text-slate-400 leading-snug flex gap-1">
                  <span className="text-slate-600 flex-shrink-0">–</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {i < steps.length - 1 && (
              <ChevronRight
                size={14}
                className="absolute -right-1 top-3 text-slate-600 hidden lg:block translate-x-1/2"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SplitFooter({ kpiChips, ateDaysOwns }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3 md:p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 mb-2 flex items-center gap-1.5">
          <Target size={14} strokeWidth={2} />
          Success metrics
        </p>
        <ChipRow items={kpiChips} variant="kpi" />
      </div>
      <div className="rounded-xl border border-slate-600/40 bg-slate-800/30 p-3 md:p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <Building2 size={14} strokeWidth={2} />
          Ate Days keeps in-house
        </p>
        <ul className="space-y-1">
          {ateDaysOwns.map((item) => (
            <li key={item} className="text-xs text-slate-400 flex gap-2">
              <span className="text-slate-600">·</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function AgencyNeedSlideBody({ agencyNeed }) {
  if (!agencyNeed) return null
  const goalItems = agencyNeed.goal
  const focusItems = agencyNeed.focus

  return (
    <div className="mt-3 space-y-3 md:space-y-4 max-w-5xl w-full pb-2">
      <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-slate-900/80 px-4 py-3 md:px-5 md:py-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 mb-1 flex items-center gap-1.5">
          <Handshake size={12} strokeWidth={2} />
          At a glance
        </p>
        <p className="text-sm md:text-base text-white font-medium leading-snug">{agencyNeed.elevator}</p>
        {agencyNeed.tools?.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <ChipRow items={agencyNeed.tools} />
          </div>
        )}
      </div>

      {agencyNeed.phases?.length > 0 && <PhaseStrip phases={agencyNeed.phases} />}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
        <PillarCard icon={Target} title="Goal" items={goalItems} />
        <PillarCard icon={Crosshair} title="Focus" items={focusItems} />
        <PillarCard icon={Sparkles} title="Ideal partner" items={agencyNeed.mustHave} />
      </div>

      <DeliverablePipeline steps={agencyNeed.deliverableSteps} />

      <SplitFooter kpiChips={agencyNeed.kpiChips} ateDaysOwns={agencyNeed.ateDaysOwns} />
    </div>
  )
}
