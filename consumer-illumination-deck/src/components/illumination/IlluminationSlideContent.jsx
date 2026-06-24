import {
  Sparkles,
  Quote,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Brain,
  Heart,
  ScanSearch,
  Fingerprint,
} from 'lucide-react'
import { IlluminationVisuals } from './charts/IlluminationVisuals'
import { quoteThemes } from '../../data/consumerQuotesData'

const ACCENT = '#10b981'

const COMPARE_ACCENT = {
  emerald: {
    border: 'border-emerald-500/35',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-300',
    iconBg: 'bg-emerald-500/20',
    icon: Brain,
    glow: 'from-emerald-500/25 via-emerald-500/5',
    ring: 'ring-emerald-500/20',
  },
  amber: {
    border: 'border-amber-500/35',
    bg: 'bg-amber-500/10',
    text: 'text-amber-300',
    iconBg: 'bg-amber-500/20',
    icon: Heart,
    glow: 'from-amber-500/25 via-amber-500/5',
    ring: 'ring-amber-500/20',
  },
}

function SegmentRefreshCard({ segment }) {
  const a = COMPARE_ACCENT[segment.accent] || COMPARE_ACCENT.emerald
  const Icon = a.icon
  return (
    <div className={`relative overflow-hidden rounded-xl border ${a.border} ${a.bg} p-4 flex flex-col ring-1 ${a.ring}`}>
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b ${a.glow} to-transparent`} aria-hidden />
      <div className="relative flex items-start gap-3 mb-3">
        <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${a.iconBg} border ${a.border} flex items-center justify-center`}>
          <Icon size={20} className={a.text} strokeWidth={1.75} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className={`text-[10px] font-bold uppercase tracking-wider ${a.text}`}>{segment.label}</p>
            {segment.role && (
              <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border border-white/10 bg-slate-900/50 text-slate-400">
                {segment.role}
              </span>
            )}
          </div>
          {segment.stat && (
            <p className="text-[10px] font-semibold text-slate-400 mt-1">{segment.stat}</p>
          )}
        </div>
      </div>
      {segment.mantra && (
        <div className="relative flex gap-2 mb-3 rounded-lg border border-white/10 bg-slate-900/40 px-3 py-2.5">
          <Quote size={14} className={`${a.text} flex-shrink-0 mt-0.5 opacity-80`} aria-hidden />
          <p className="text-xs text-slate-300 italic leading-snug">{segment.mantra}</p>
        </div>
      )}
      <div className="relative space-y-3 flex-1">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
            <Fingerprint size={12} className={a.text} aria-hidden />
            Top differentiators
          </p>
          <ul className="space-y-1.5">
            {segment.differentiators?.map((item) => (
              <li key={item} className="text-xs text-slate-300 leading-snug flex gap-2">
                <span className={`${a.text} flex-shrink-0 mt-0.5`}>▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-2 border-t border-white/10">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
            <ScanSearch size={12} className={a.text} aria-hidden />
            What they look for
          </p>
          <ul className="space-y-1.5">
            {segment.looksFor?.map((item) => (
              <li key={item} className="text-xs text-slate-300 leading-snug flex gap-2">
                <span className={`${a.text} flex-shrink-0 mt-0.5`}>▸</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function IlluminationSegmentRefresh({ segments, transition, nextSteps }) {
  if (!segments) return null
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-stretch">
        <SegmentRefreshCard segment={segments.left} />
        <div className="hidden md:flex flex-col items-center justify-center px-1 py-4">
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-indigo-400/40 to-transparent min-h-[24px]" />
          <div className="my-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1.5 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-indigo-300/90">One brand</p>
            <p className="text-[8px] text-slate-500 mt-0.5">two lead benefits</p>
          </div>
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-indigo-400/40 to-transparent min-h-[24px]" />
        </div>
        <SegmentRefreshCard segment={segments.right} />
      </div>
      {transition && (
        <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-slate-900/80 to-slate-900/80 px-4 py-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRight size={14} className="text-emerald-400 flex-shrink-0" aria-hidden />
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/90">
              What's next
            </p>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">{transition}</p>
          {nextSteps?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
              {nextSteps.map((step, i) => (
                <span key={step} className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                  <span className="px-2 py-0.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 text-emerald-200/90 font-medium">
                    {step}
                  </span>
                  {i < nextSteps.length - 1 && (
                    <ArrowRight size={10} className="text-slate-600 hidden sm:inline" aria-hidden />
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function BulletList({ items }) {
  if (!items?.length) return null
  return (
    <ul className="mt-3 space-y-2 max-w-5xl">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-slate-300 leading-snug">
          <Sparkles size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function QuoteBlock({ quotes }) {
  if (!quotes?.length) return null
  return (
    <div className="mt-4 space-y-3 max-w-4xl">
      {quotes.map((q) => (
        <blockquote
          key={q.attribution}
          className="rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3"
        >
          <Quote size={14} className="text-emerald-500/70 mb-2" aria-hidden />
          <p className="text-sm text-slate-300 italic leading-relaxed">&ldquo;{q.text}&rdquo;</p>
          <footer className="text-[11px] text-slate-500 mt-2">, {q.attribution}</footer>
        </blockquote>
      ))}
    </div>
  )
}

export function IlluminationCover({ chapters, bullets }) {
  return (
    <div className="mt-4 space-y-6">
      {chapters?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl">
          {chapters.map((ch) => (
            <div
              key={ch.label}
              className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-4 py-3 text-sm font-medium text-slate-200"
            >
              {ch.label}
            </div>
          ))}
        </div>
      )}
      <BulletList items={bullets} />
    </div>
  )
}

export function IlluminationStatsBullets({ stats, bullets, visuals }) {
  return (
    <div className="mt-3 space-y-4">
      <IlluminationVisuals visuals={visuals} />
      {stats?.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 max-w-5xl">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/10 bg-slate-900/40 px-3 py-3"
            >
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-[11px] font-semibold text-emerald-300/90 mt-0.5">{s.label}</p>
              {s.note && <p className="text-[10px] text-slate-500 mt-1 leading-snug">{s.note}</p>}
            </div>
          ))}
        </div>
      )}
      <BulletList items={bullets} />
    </div>
  )
}

export function IlluminationCompare({ compare, tiers, visuals, bullets }) {
  if (!compare) return null
  const { left, right } = compare
  const leftA = COMPARE_ACCENT[left.accent] || COMPARE_ACCENT.emerald
  const rightA = COMPARE_ACCENT[right.accent] || COMPARE_ACCENT.amber
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <IlluminationVisuals visuals={visuals} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[left, right].map((side, i) => {
          const a = i === 0 ? leftA : rightA
          return (
            <div key={side.label} className={`rounded-xl border ${a.border} ${a.bg} p-4`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className={`text-[10px] font-bold uppercase tracking-wider ${a.text}`}>
                  {side.label}
                </p>
                {side.role && (
                  <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border border-white/10 bg-slate-900/40 text-slate-400 whitespace-nowrap">
                    {side.role}
                  </span>
                )}
              </div>
              {side.tagline && (
                <p className="text-base font-bold text-white mb-3 leading-snug">{side.tagline}</p>
              )}
              <ul className="space-y-2">
                {side.items?.map((item) => (
                  <li key={item} className="text-xs text-slate-300 leading-snug flex gap-2">
                    <span className="text-emerald-500/80 flex-shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
      <BulletList items={bullets} />
      {tiers?.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-2 items-stretch">
          {tiers.map((t, i) => (
            <div key={t.tier} className="flex-1 flex items-center gap-2 min-w-0">
              <div className="flex-1 rounded-lg border border-white/10 bg-slate-800/50 px-3 py-2.5">
                <p className="text-[10px] font-bold uppercase text-emerald-400/80">{t.tier}</p>
                <p className="text-xs text-slate-300 mt-0.5">{t.detail}</p>
              </div>
              {i < tiers.length - 1 && (
                <ArrowRight size={16} className="hidden sm:block text-slate-600 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function IlluminationSegmentProfile({ profile, quotes }) {
  if (!profile) return null
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-slate-900/80 px-4 py-4">
        <p className="text-sm md:text-base text-white font-medium italic leading-relaxed">
          {profile.mantra}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {profile.pillars?.map((p) => (
          <div key={p.title} className="rounded-xl border border-white/10 bg-slate-900/40 p-3">
            <h3 className="text-xs font-bold text-emerald-300 mb-1">{p.title}</h3>
            <p className="text-[11px] text-slate-400 leading-snug">{p.detail}</p>
          </div>
        ))}
      </div>
      {profile.values?.length > 0 && (
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Core values</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.values.map((v) => (
              <span
                key={v}
                className="inline-flex items-center whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      )}
      <QuoteBlock quotes={quotes} />
    </div>
  )
}

export function IlluminationWinsLoses({ wins, loses, tensions }) {
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <h3 className="text-[11px] font-bold uppercase text-emerald-400/90">What wins</h3>
          </div>
          <ul className="space-y-1.5">
            {wins?.map((w) => (
              <li key={w} className="text-xs text-slate-300 leading-snug">
                {w}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-rose-500/25 bg-rose-500/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle size={16} className="text-rose-400" />
            <h3 className="text-[11px] font-bold uppercase text-rose-400/90">What breaks</h3>
          </div>
          <ul className="space-y-1.5">
            {loses?.map((l) => (
              <li key={l} className="text-xs text-slate-300 leading-snug">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {tensions?.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Key tensions → opportunity</p>
          {tensions.map((t) => (
            <div key={t.title} className="rounded-lg border border-white/10 bg-slate-900/40 px-3 py-2.5">
              <p className="text-xs font-semibold text-white">{t.title}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{t.context}</p>
              {t.opportunity && (
                <p className="text-[11px] text-emerald-300/90 mt-1">→ {t.opportunity}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function IlluminationJtbdHeat({ jtbd, bullets, visuals }) {
  if (!visuals?.length && !jtbd?.length) return null
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <IlluminationVisuals visuals={visuals} />
      <BulletList items={bullets} />
    </div>
  )
}

export function IlluminationImplications({ pillars, positioningSpaces }) {
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      {positioningSpaces?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {positioningSpaces.map((p) => (
            <span
              key={p}
              className="inline-flex items-center whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-200"
            >
              {p}
            </span>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {pillars?.map((p) => (
          <div key={p.title} className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
            <h3 className="text-xs font-bold text-emerald-300 mb-1">{p.title}</h3>
            <p className="text-[11px] text-slate-400 leading-snug">{p.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function IlluminationQuoteThemes({ bullets, visuals }) {
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <IlluminationVisuals visuals={visuals} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {quoteThemes.map((theme) => (
          <div
            key={theme.title}
            className="rounded-xl border border-white/10 bg-slate-900/40 p-3 flex flex-col"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="text-xs font-bold text-emerald-300 leading-snug">{theme.title}</h3>
              <span className="text-[9px] font-bold uppercase tracking-wide text-slate-500 whitespace-nowrap">
                {theme.segments}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug flex-1">{theme.learning}</p>
            <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-white/5">
              {theme.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-500"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <BulletList items={bullets} />
    </div>
  )
}

export function IlluminationForwardSummary({ lead, bullets, visuals }) {
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <IlluminationVisuals visuals={visuals} />
      {lead && (
        <blockquote className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-4 py-4">
          <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium">{lead}</p>
        </blockquote>
      )}
      <BulletList items={bullets} />
    </div>
  )
}

export function IlluminationDecisions({ decisions }) {
  if (!decisions?.length) return null
  return (
    <div className="mt-3 space-y-3 max-w-5xl">
      {decisions.map((d, i) => (
        <div key={d.question} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
          <p className="text-[10px] font-bold uppercase text-emerald-400/80 mb-1">Driver {i + 1}</p>
          <h3 className="text-sm font-bold text-white mb-2">{d.question}</h3>
          <ul className="space-y-1 mb-2">
            {d.options?.map((opt) => (
              <li key={opt} className="text-xs text-slate-400 pl-3 border-l-2 border-slate-700">
                {opt}
              </li>
            ))}
          </ul>
          {d.recommendation && (
            <p className="text-xs text-emerald-300/90 bg-emerald-500/10 rounded-lg px-3 py-2 border border-emerald-500/20">
              <span className="font-semibold">Recommendation: </span>
              {d.recommendation}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

function BulletsWithVisuals({ bullets, quotes, visuals }) {
  return (
    <>
      <IlluminationVisuals visuals={visuals} />
      <BulletList items={bullets} />
      <QuoteBlock quotes={quotes} />
    </>
  )
}

export function IlluminationSlideBody({ slide }) {
  switch (slide.layout) {
    case 'illuminationCover':
      return <IlluminationCover chapters={slide.chapters} bullets={slide.bullets} />
    case 'statsBullets':
      return (
        <IlluminationStatsBullets stats={slide.stats} bullets={slide.bullets} visuals={slide.visuals} />
      )
    case 'bullets':
      return (
        <BulletsWithVisuals bullets={slide.bullets} quotes={slide.quotes} visuals={slide.visuals} />
      )
    case 'segmentRefresh':
      return (
        <IlluminationSegmentRefresh
          segments={slide.segments}
          transition={slide.transition}
          nextSteps={slide.nextSteps}
        />
      )
    case 'compare':
      return (
        <IlluminationCompare
          compare={slide.compare}
          tiers={slide.tiers}
          visuals={slide.visuals}
          bullets={slide.bullets}
        />
      )
    case 'segmentProfile':
      return <IlluminationSegmentProfile profile={slide.profile} quotes={slide.quotes} />
    case 'winsLoses':
      return (
        <IlluminationWinsLoses wins={slide.wins} loses={slide.loses} tensions={slide.tensions} />
      )
    case 'jtbdHeat':
      return <IlluminationJtbdHeat jtbd={slide.jtbd} bullets={slide.bullets} visuals={slide.visuals} />
    case 'quoteThemes':
      return <IlluminationQuoteThemes bullets={slide.bullets} visuals={slide.visuals} />
    case 'implications':
      return (
        <IlluminationImplications pillars={slide.pillars} positioningSpaces={slide.positioningSpaces} />
      )
    case 'forwardSummary':
      return (
        <IlluminationForwardSummary lead={slide.lead} bullets={slide.bullets} visuals={slide.visuals} />
      )
    case 'decisions':
      return <IlluminationDecisions decisions={slide.decisions} />
    default:
      return <BulletList items={slide.bullets} />
  }
}
