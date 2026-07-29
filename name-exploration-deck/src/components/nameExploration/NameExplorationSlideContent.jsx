import { Sparkles, Star } from 'lucide-react'

const STATUS = {
  available: {
    chip: 'bg-teal-100 text-teal-800 border-teal-300/80',
    card: 'border-teal-200/80 bg-teal-50/70',
    label: 'Available',
  },
  maybe: {
    chip: 'bg-amber-100 text-amber-900 border-amber-300/80',
    card: 'border-amber-200/90 bg-amber-50/80',
    label: 'Maybe',
  },
  out: {
    chip: 'bg-rose-100 text-rose-800 border-rose-200/80',
    card: 'border-rose-200/80 bg-rose-50/70',
    label: 'Not advancing',
  },
  cautionary: {
    chip: 'bg-slate-200 text-slate-700 border-slate-300/80',
    card: 'border-slate-300 bg-slate-50',
    label: 'Cautionary',
  },
}

function Stars({ value, max = 5 }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < full || (i === full && half)
        return (
          <Star
            key={i}
            size={12}
            strokeWidth={1.5}
            className={filled ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}
          />
        )
      })}
    </span>
  )
}

function BulletList({ items }) {
  if (!items?.length) return null
  return (
    <ul className="mt-3 space-y-2 max-w-4xl">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-slate-600 leading-snug">
          <Sparkles size={14} className="text-teal-600 flex-shrink-0 mt-0.5" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function NameCover({ slide }) {
  return (
    <div className="mt-4 space-y-4 max-w-3xl">
      {slide.lead && (
        <p className="text-base md:text-lg text-slate-700 leading-relaxed font-medium">{slide.lead}</p>
      )}
      <BulletList items={slide.bullets} />
    </div>
  )
}

function MustsLayout({ slide }) {
  return (
    <div className="mt-2 space-y-3 max-w-6xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {slide.musts?.map((m, i) => (
          <div
            key={m.title}
            className={`rounded-xl border bg-white/80 p-3.5 shadow-sm ${
              m.label === 'Bonus' ? 'border-amber-300/90' : 'border-teal-200/80'
            }`}
          >
            <p
              className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                m.label === 'Bonus' ? 'text-amber-700' : 'text-teal-700'
              }`}
            >
              {m.label || `Must ${i + 1}`}
            </p>
            <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">{m.title}</h3>
            {m.detail && <p className="text-xs text-slate-600 leading-snug">{m.detail}</p>}
            {m.points?.length > 0 && (
              <ul className="mt-2 space-y-1.5">
                {m.points.map((p) => (
                  <li key={p} className="text-xs text-slate-600 leading-snug flex gap-1.5">
                    <span className="text-teal-600 shrink-0">·</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            )}
            {m.sections?.length > 0 && (
              <div className="mt-2 space-y-2.5">
                {m.sections.map((s) => (
                  <div key={s.detail}>
                    <p className="text-xs text-slate-600 leading-snug">{s.detail}</p>
                    {s.example && (
                      <p className="text-[11px] text-slate-500 leading-snug mt-0.5 pl-2 border-l-2 border-amber-200">
                        {s.example}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {slide.brandabilityQuestions?.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white/70 p-3.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Brandability checks</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {slide.brandabilityQuestions.map((q) => (
              <li key={q} className="text-xs text-slate-600 flex gap-2">
                <span className="text-teal-600">·</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function CheckpointsLayout({ slide }) {
  return (
    <div className="mt-2 space-y-3 max-w-6xl">
      {slide.lead && (
        <p className="text-sm md:text-base text-slate-800 font-medium italic leading-relaxed border-l-2 border-teal-500 pl-3 max-w-4xl">
          {slide.lead}
        </p>
      )}
      {slide.bullets?.length > 0 && (
        <ul className="space-y-1.5 max-w-4xl">
          {slide.bullets.map((item) => (
            <li key={item} className="flex gap-2 text-xs text-slate-600 leading-snug">
              <Sparkles size={12} className="text-teal-600 flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {slide.checkpoints?.map((c) => (
          <div key={c.title} className="rounded-xl border border-slate-200 bg-white/85 p-4 shadow-sm flex flex-col">
            <h3 className="text-sm font-bold text-teal-800 mb-1">{c.title}</h3>
            <p className="text-xs text-slate-600 leading-snug mb-3">{c.detail}</p>
            <ul className="space-y-1.5 mt-auto">
              {c.questions?.map((q) => (
                <li key={q} className="text-[11px] text-slate-500 pl-2 border-l-2 border-teal-200 leading-snug">
                  {q}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

function PillarsLayout({ slide }) {
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white/90 shadow-sm">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="px-3 py-2.5 font-bold text-slate-500 uppercase tracking-wider w-[22%]">Pillar</th>
              <th className="px-3 py-2.5 font-bold text-slate-500 uppercase tracking-wider">Focus question</th>
              <th className="px-3 py-2.5 font-bold text-slate-500 uppercase tracking-wider w-[28%]">Goal</th>
            </tr>
          </thead>
          <tbody>
            {slide.pillars?.map((p) => (
              <tr key={p.pillar} className="border-b border-slate-100 last:border-0">
                <td className="px-3 py-2.5 font-semibold text-teal-800 align-top">{p.pillar}</td>
                <td className="px-3 py-2.5 text-slate-700 align-top">{p.question}</td>
                <td className="px-3 py-2.5 text-slate-500 align-top">{p.goal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {slide.examples?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {slide.examples.map((ex) => (
            <div
              key={ex.name}
              className={`rounded-lg border px-3 py-2.5 ${
                ex.tone === 'strong'
                  ? 'border-teal-200 bg-teal-50/80'
                  : 'border-rose-200 bg-rose-50/70'
              }`}
            >
              <p className="text-xs font-bold text-slate-900">{ex.name}</p>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{ex.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function LegendLayout({ slide }) {
  return (
    <div className="mt-3 space-y-4 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {slide.legend?.map((item) => {
          const s = STATUS[item.status] || STATUS.available
          return (
            <div key={item.status} className={`rounded-xl border p-4 ${s.card}`}>
              <span className={`inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${s.chip}`}>
                {item.label}
              </span>
              <p className="text-xs text-slate-600 mt-2 leading-snug">{item.detail}</p>
            </div>
          )
        })}
      </div>
      {slide.lead && <p className="text-sm md:text-base text-slate-800 font-medium leading-relaxed">{slide.lead}</p>}
      <BulletList items={slide.bullets} />
    </div>
  )
}

function NameGridLayout({ slide }) {
  const status = slide.statusFilter || 'available'
  const style = STATUS[status] || STATUS.available
  return (
    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-w-6xl">
      {slide.names?.map((n) => (
        <div key={n.name} className={`rounded-xl border p-3.5 ${style.card}`}>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">{n.name}</h3>
            <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border flex-shrink-0 ${style.chip}`}>
              {style.label}
            </span>
          </div>
          {n.note && <p className="text-[11px] text-slate-600 leading-snug">{n.note}</p>}
        </div>
      ))}
    </div>
  )
}

function NotAdvancingLayout({ slide }) {
  return (
    <div className="mt-3 space-y-4 max-w-5xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {slide.names?.map((n) => (
          <div key={n.name} className={`rounded-xl border p-3 ${STATUS.out.card}`}>
            <h3 className="text-sm font-bold text-slate-800">{n.name}</h3>
            {n.note && <p className="text-[11px] text-slate-600 mt-1 leading-snug">{n.note}</p>}
          </div>
        ))}
      </div>
      {slide.cautionary?.map((n) => (
        <div key={n.name} className={`rounded-xl border p-4 ${STATUS.cautionary.card}`}>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-slate-900">{n.name}</h3>
            <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border ${STATUS.cautionary.chip}`}>
              Cautionary reject
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{n.note}</p>
        </div>
      ))}
    </div>
  )
}

function RankingTableLayout({ slide }) {
  return (
    <div className="mt-2 max-w-6xl overflow-auto rounded-xl border border-slate-200 bg-white/90 shadow-sm max-h-[min(58vh,520px)]">
      <table className="w-full text-left text-xs min-w-[640px]">
        <thead className="sticky top-0 bg-slate-50/95 backdrop-blur border-b border-slate-200 z-10">
          <tr>
            <th className="px-3 py-2.5 font-bold text-slate-500 uppercase tracking-wider w-8">#</th>
            <th className="px-3 py-2.5 font-bold text-slate-500 uppercase tracking-wider">Name</th>
            <th className="px-3 py-2.5 font-bold text-slate-500 uppercase tracking-wider">Google SEO</th>
            <th className="px-3 py-2.5 font-bold text-slate-500 uppercase tracking-wider">AI distinctiveness</th>
            <th className="px-3 py-2.5 font-bold text-slate-500 uppercase tracking-wider">Brandability</th>
            <th className="px-3 py-2.5 font-bold text-slate-500 uppercase tracking-wider text-right">Overall /10</th>
          </tr>
        </thead>
        <tbody>
          {slide.ranking?.map((row, i) => (
            <tr key={row.name} className="border-b border-slate-100 last:border-0 hover:bg-teal-50/40">
              <td className="px-3 py-2 text-slate-400 tabular-nums">{i + 1}</td>
              <td className="px-3 py-2 font-semibold text-slate-900">{row.name}</td>
              <td className="px-3 py-2">
                <Stars value={row.googleSeo} />
              </td>
              <td className="px-3 py-2">
                <Stars value={row.aiDistinctiveness} />
              </td>
              <td className="px-3 py-2">
                <Stars value={row.brandability} />
              </td>
              <td className="px-3 py-2 text-right font-bold text-teal-800 tabular-nums">{row.overall.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function NextStepLayout({ slide }) {
  return (
    <div className="mt-3 space-y-4 max-w-4xl">
      {slide.lead && <p className="text-base text-slate-800 font-medium leading-relaxed">{slide.lead}</p>}
      <ol className="space-y-2">
        {slide.steps?.map((step, i) => (
          <li key={step} className="flex gap-3 items-start rounded-lg border border-slate-200 bg-white/80 px-3 py-2.5">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-sm text-slate-700 leading-snug pt-0.5">{step}</span>
          </li>
        ))}
      </ol>
      {slide.prompt && (
        <p className="text-sm text-teal-900 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 leading-relaxed font-medium">
          {slide.prompt}
        </p>
      )}
    </div>
  )
}

function BulletsLayout({ slide }) {
  return (
    <div className="mt-3 max-w-4xl">
      {slide.lead && (
        <p className="text-base md:text-lg text-slate-800 font-medium italic leading-relaxed mb-3 border-l-2 border-teal-500 pl-3">
          {slide.lead}
        </p>
      )}
      <BulletList items={slide.bullets} />
    </div>
  )
}

function NameDetailLayout({ slide }) {
  const c = slide.candidate
  if (!c) return null
  const style = STATUS[c.status] || STATUS.available
  const scores = slide.scores
  const images = c.images || []
  const base = import.meta.env.BASE_URL || '/'
  const imageCount = images.length

  return (
    <div className="mt-1.5 flex-1 flex flex-col min-h-0 max-w-6xl w-full gap-3 overflow-hidden">
      {/* Meta + scores — flat text, no white panels */}
      <div className="flex-shrink-0 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-x-6 gap-y-2 items-start">
        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                c.status === 'available'
                  ? 'text-teal-700'
                  : c.status === 'maybe'
                    ? 'text-amber-800'
                    : 'text-slate-600'
              }`}
            >
              {style.label}
            </span>
            <span className="text-slate-300">·</span>
            {c.note && <p className="text-[11px] text-slate-500 leading-snug">{c.note}</p>}
          </div>
          {c.meaning?.length > 0 && (
            <ul className="space-y-0.5">
              {c.meaning.map((line) => (
                <li key={line} className="text-[11px] text-slate-700 leading-snug flex gap-1.5">
                  <span className="text-teal-600 flex-shrink-0">·</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-wrap items-end gap-x-4 gap-y-1 lg:justify-end">
          {scores ? (
            [
              { label: 'SEO', value: scores.googleSeo, stars: true },
              { label: 'AI', value: scores.aiDistinctiveness, stars: true },
              { label: 'Brand', value: scores.brandability, stars: true },
              { label: 'Overall', value: scores.overall, stars: false },
            ].map((m) => (
              <div key={m.label} className="min-w-[3.25rem]">
                <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{m.label}</p>
                {m.stars ? (
                  <Stars value={m.value} />
                ) : (
                  <p className="text-base font-bold text-teal-800 tabular-nums leading-none">
                    {Number(m.value).toFixed(1)}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-[10px] text-slate-500 italic">No AI ranking in source table</p>
          )}
        </div>
      </div>

      {/* Image area — remaining height only */}
      <div
        className={`flex-1 min-h-0 overflow-hidden flex gap-3 items-center justify-center ${
          imageCount >= 2 ? 'flex-col md:flex-row' : 'flex-col'
        }`}
      >
        {images.map((src) => (
          <div key={src} className="flex-1 min-w-0 min-h-0 h-full flex items-center justify-center overflow-hidden">
            <img
              src={`${base}${src}`}
              alt={`${c.name} packaging exploration`}
              className="block max-h-full max-w-full w-auto h-auto object-contain object-center rounded-xl"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function NameExplorationSlideBody({ slide }) {
  if (!slide) return null
  switch (slide.layout) {
    case 'nameCover':
      return <NameCover slide={slide} />
    case 'musts':
      return <MustsLayout slide={slide} />
    case 'checkpoints':
      return <CheckpointsLayout slide={slide} />
    case 'pillars':
      return <PillarsLayout slide={slide} />
    case 'legend':
      return <LegendLayout slide={slide} />
    case 'nameGrid':
      return <NameGridLayout slide={slide} />
    case 'nameDetail':
      return <NameDetailLayout slide={slide} />
    case 'notAdvancing':
      return <NotAdvancingLayout slide={slide} />
    case 'rankingTable':
      return <RankingTableLayout slide={slide} />
    case 'nextStep':
      return <NextStepLayout slide={slide} />
    case 'bullets':
    default:
      return <BulletsLayout slide={slide} />
  }
}
