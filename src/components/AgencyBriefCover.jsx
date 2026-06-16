import { TrendingUp, Mail, Clapperboard, Store } from 'lucide-react'

const ICONS = { TrendingUp, Mail, Clapperboard, Store }

const ACCENT = {
  sky: {
    border: 'border-sky-500/35',
    bg: 'bg-sky-500/10',
    text: 'text-sky-300',
    dot: 'bg-sky-400',
  },
  violet: {
    border: 'border-violet-500/35',
    bg: 'bg-violet-500/10',
    text: 'text-violet-300',
    dot: 'bg-violet-400',
  },
  fuchsia: {
    border: 'border-fuchsia-500/35',
    bg: 'bg-fuchsia-500/10',
    text: 'text-fuchsia-300',
    dot: 'bg-fuchsia-400',
  },
  emerald: {
    border: 'border-emerald-500/35',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-300',
    dot: 'bg-emerald-400',
  },
}

export function AgencyBriefCover({ capabilities }) {
  if (!capabilities?.length) return null
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
      {capabilities.map((cap, i) => {
        const Icon = ICONS[cap.icon] || TrendingUp
        const a = ACCENT[cap.accent] || ACCENT.emerald
        return (
          <div
            key={cap.id}
            className={`rounded-xl border ${a.border} ${a.bg} p-5 backdrop-blur-xl flex gap-4 items-start`}
          >
            <div className={`flex-shrink-0 w-11 h-11 rounded-lg ${a.bg} border ${a.border} flex items-center justify-center`}>
              <Icon size={22} strokeWidth={1.75} className={a.text} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} aria-hidden />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Slide {i + 2}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{cap.title}</h3>
              <p className="text-sm text-slate-400 mt-1 leading-snug">{cap.tagline}</p>
            </div>
          </div>
        )
      })}
      <p className="sm:col-span-2 text-xs text-slate-500 text-center pt-2">
        Use arrow keys or swipe · Not in this brief: PR, Social, Influencer (TBD in source doc)
      </p>
    </div>
  )
}
