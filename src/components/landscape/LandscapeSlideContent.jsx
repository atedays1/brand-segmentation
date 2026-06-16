import {
  Sparkles,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Minimize2,
  Leaf,
  Brain,
} from 'lucide-react'

const ACCENT = {
  rose: { border: 'border-rose-500/35', bg: 'bg-rose-500/10', text: 'text-rose-300', bar: 'bg-rose-400/70' },
  amber: { border: 'border-amber-500/35', bg: 'bg-amber-500/10', text: 'text-amber-300', bar: 'bg-amber-400/70' },
  emerald: { border: 'border-emerald-500/35', bg: 'bg-emerald-500/10', text: 'text-emerald-300', bar: 'bg-emerald-400/70' },
  sky: { border: 'border-sky-500/35', bg: 'bg-sky-500/10', text: 'text-sky-300', bar: 'bg-sky-400/70' },
  violet: { border: 'border-violet-500/35', bg: 'bg-violet-500/10', text: 'text-violet-300', bar: 'bg-violet-400/70' },
}

export function LandscapeCover({ chapters }) {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
      {chapters?.map((ch) => (
        <div
          key={ch.label}
          className="rounded-xl border border-indigo-500/25 bg-indigo-500/5 px-4 py-3 flex items-center justify-between gap-3"
        >
          <span className="text-sm font-medium text-slate-200">{ch.label}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300/90 flex-shrink-0">
            Slide {ch.slide ?? ch.slides}
          </span>
        </div>
      ))}
    </div>
  )
}

export function LandscapeSummary({ summary }) {
  if (!summary) return null
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 to-slate-900/80 px-4 py-4">
        <p className="text-sm md:text-base text-white font-medium leading-relaxed">{summary.headline}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch gap-3">
        <div className="flex-1 rounded-xl border border-rose-500/25 bg-rose-500/5 p-4">
          <p className="text-[10px] font-bold uppercase text-rose-400/90 mb-1">Was</p>
          <p className="text-sm text-slate-300">{summary.shift.from}</p>
        </div>
        <ArrowRight className="hidden sm:block text-slate-600 self-center flex-shrink-0" size={22} />
        <div className="flex-1 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
          <p className="text-[10px] font-bold uppercase text-emerald-400/90 mb-1">Now</p>
          <p className="text-sm text-slate-300">{summary.shift.to}</p>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Anchor ingredients</p>
        <div className="flex flex-wrap gap-1.5">
          {summary.anchorIngredients.map((ing) => (
            <span
              key={ing}
              className="inline-flex items-center whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-200"
            >
              {ing}
            </span>
          ))}
        </div>
      </div>
      <ul className="space-y-2">
        {summary.takeaways.map((t) => (
          <li key={t} className="flex gap-2 text-sm text-slate-400 leading-snug">
            <Sparkles size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function LandscapeTimeline({ timeline, doseVisual }) {
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {timeline?.map((phase, i) => {
          const a = ACCENT[phase.accent] || ACCENT.emerald
          return (
            <div key={phase.years} className="relative">
              <div className={`rounded-xl border ${a.border} ${a.bg} p-4 h-full`}>
                <p className={`text-[10px] font-bold uppercase tracking-wider ${a.text} mb-1`}>{phase.years}</p>
                <h3 className="text-base font-bold text-white mb-2">{phase.title}</h3>
                <dl className="space-y-1.5 text-xs">
                  <div>
                    <dt className="text-slate-500">Melatonin</dt>
                    <dd className="text-slate-300">{phase.melatonin}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Focus</dt>
                    <dd className="text-slate-300">{phase.focus}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Formats / stack</dt>
                    <dd className="text-slate-300">{phase.formats}</dd>
                  </div>
                </dl>
              </div>
              {i < timeline.length - 1 && (
                <ArrowRight
                  className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-slate-600 z-10"
                  size={16}
                />
              )}
            </div>
          )
        })}
      </div>
      {doseVisual && (
        <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <TrendingDown size={14} className="text-rose-400" />
            Melatonin dose band shift
            <TrendingUp size={14} className="text-emerald-400" />
          </p>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>{doseVisual.legacy.label}</span>
                <span className="text-rose-300 font-medium">{doseVisual.legacy.mg}</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-rose-500/70" style={{ width: `${doseVisual.legacy.widthPct}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>{doseVisual.modern.label}</span>
                <span className="text-emerald-300 font-medium">{doseVisual.modern.mg}</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500/70"
                  style={{ width: `${doseVisual.modern.widthPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function LandscapeBrandTable({ tableTitle, columns, rows, captureMode = false }) {
  if (!rows?.length) return null
  return (
    <div className={`${captureMode ? 'mt-2' : 'mt-3'} max-w-5xl`}>
      {tableTitle && (
        <p
          className={`font-bold uppercase tracking-wider text-slate-500 mb-2 ${
            captureMode ? 'text-[10px]' : 'text-[11px]'
          }`}
        >
          {tableTitle}
        </p>
      )}
      <div
        className={`rounded-xl border border-white/10 overflow-hidden bg-slate-900/40 ${
          captureMode ? 'max-h-none overflow-visible' : 'max-h-[min(52vh,480px)] overflow-y-auto'
        }`}
      >
        <table className={`w-full text-left ${captureMode ? 'text-[11px]' : 'text-xs'}`}>
          <thead className="sticky top-0 bg-slate-800/95 backdrop-blur-sm z-10">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-3 py-2.5 font-bold text-indigo-300/90 border-b border-white/10">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-slate-800/20' : 'bg-transparent'}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-3 py-2 border-b border-white/5 align-top ${
                      j === 0 ? 'font-semibold text-white' : 'text-slate-400'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function LandscapeIngredientPillars({ intro, pillars }) {
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <p className="text-sm text-slate-400 leading-relaxed">{intro}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pillars?.map((p) => {
          const a = ACCENT[p.accent] || ACCENT.emerald
          return (
            <div key={p.title} className={`rounded-xl border ${a.border} ${a.bg} p-4`}>
              <h3 className={`text-sm font-bold ${a.text} mb-2`}>{p.title}</h3>
              <div className="flex flex-wrap gap-1 mb-2">
                {p.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center whitespace-nowrap text-[10px] px-2 py-0.5 rounded bg-slate-900/50 border border-white/10 text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-500">{p.detail}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const TREND_ICONS = { Minimize2, Leaf, Brain }

export function LandscapeTrends({ trends, implication }) {
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {trends?.map((t) => {
          const Icon = TREND_ICONS[t.icon] || Sparkles
          const a = ACCENT[t.accent] || ACCENT.sky
          return (
            <div key={t.title} className={`rounded-xl border ${a.border} ${a.bg} p-4 flex flex-col`}>
              <Icon size={20} className={`${a.text} mb-2`} strokeWidth={1.75} />
              <h3 className="text-sm font-bold text-white mb-2 leading-snug">{t.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed flex-1">{t.body}</p>
            </div>
          )
        })}
      </div>
      {implication && (
        <div className="rounded-xl border border-indigo-500/35 bg-indigo-500/10 px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-300/90 mb-1">Implication for Ate Days</p>
          <p className="text-sm text-slate-200 leading-relaxed">{implication}</p>
        </div>
      )}
    </div>
  )
}

export function LandscapeSlideBody({ slide, captureMode = false }) {
  switch (slide.layout) {
    case 'landscapeCover':
      return <LandscapeCover chapters={slide.chapters} />
    case 'landscapeSummary':
      return <LandscapeSummary summary={slide.summary} />
    case 'landscapeTimeline':
      return <LandscapeTimeline timeline={slide.timeline} doseVisual={slide.doseVisual} />
    case 'landscapeBrandTable':
      return (
        <LandscapeBrandTable
          tableTitle={slide.tableTitle}
          columns={slide.columns}
          rows={slide.rows}
          captureMode={captureMode}
        />
      )
    case 'landscapeIngredientPillars':
      return <LandscapeIngredientPillars intro={slide.intro} pillars={slide.pillars} />
    case 'landscapeTrends':
      return <LandscapeTrends trends={slide.trends} implication={slide.implication} />
    default:
      return null
  }
}
