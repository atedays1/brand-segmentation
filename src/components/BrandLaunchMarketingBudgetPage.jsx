import {
  BRAND_LAUNCH_CAPEX_ROWS,
  BRAND_LAUNCH_OPEX_ROWS,
  BRAND_LAUNCH_CAPEX_TOTAL,
  BRAND_LAUNCH_OPEX_TOTAL,
  BRAND_LAUNCH_CAPEX_TBD,
  BRAND_LAUNCH_OPEX_TBD,
  sumMid,
  formatMoneyRange,
} from '../data/brandLaunchMarketingBudgetData'

const BAR_COLORS = [
  '#f472b6',
  '#a78bfa',
  '#38bdf8',
  '#34d399',
  '#fbbf24',
  '#fb923c',
  '#f87171',
  '#2dd4bf',
  '#818cf8',
  '#c084fc',
  '#4ade80',
  '#fcd34d',
  '#94a3b8',
]

function StackedBar({ rows, colorList }) {
  const total = sumMid(rows)
  return (
    <div className="w-full rounded-lg overflow-hidden flex h-8 md:h-9 border border-white/10 shadow-inner bg-slate-900/50">
      {rows.map((row, i) => {
        const pct = total > 0 ? (row.mid / total) * 100 : 0
        return (
          <div
            key={row.label}
            className="h-full min-w-0 transition-[width] duration-300"
            style={{
              width: `${pct}%`,
              backgroundColor: colorList[i % colorList.length],
            }}
            title={`${row.label}: ${formatMoneyRange(row.min, row.max, false)}`}
          />
        )
      })}
    </div>
  )
}

function Legend({ rows, colorList }) {
  return (
    <ul className="mt-3 space-y-2 text-xs md:text-sm">
      {rows.map((row, i) => (
        <li key={row.label} className="flex gap-2 items-start">
          <span
            className="mt-1.5 h-2 w-2 rounded-sm flex-shrink-0"
            style={{ backgroundColor: colorList[i % colorList.length] }}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
              <span className="font-semibold text-white">{row.label}</span>
              <span className="text-fuchsia-300/95 tabular-nums font-medium">
                {formatMoneyRange(row.min, row.max, false)}
              </span>
            </div>
            <p className="text-slate-500 leading-snug mt-0.5">{row.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function BrandLaunchMarketingBudgetPage() {
  const capexT = BRAND_LAUNCH_CAPEX_TOTAL
  const opexT = BRAND_LAUNCH_OPEX_TOTAL
  const opexAnnual = { min: Math.round(opexT.min * 12), max: Math.round(opexT.max * 12) }

  return (
    <div className="mt-4 space-y-6 md:space-y-8 max-w-4xl w-full pb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-fuchsia-500/35 bg-fuchsia-500/5 px-5 py-4 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Pre & post launch — total CapEx</p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tabular-nums tracking-tight">
            {formatMoneyRange(capexT.min, capexT.max, false)}
          </p>
          <p className="text-xs text-slate-500 mt-2">From Brand Pre and Post Launch Budget ESTIMATE — Total CapEx.</p>
        </div>
        <div className="rounded-xl border border-violet-500/35 bg-violet-500/5 px-5 py-4 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Ongoing — monthly OpEx</p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tabular-nums tracking-tight">
            {formatMoneyRange(opexT.min, opexT.max, false)}
            <span className="text-lg md:text-xl font-semibold text-slate-400"> / mo</span>
          </p>
          <p className="text-sm text-slate-400 mt-2 tabular-nums">
            ~{formatMoneyRange(opexAnnual.min, opexAnnual.max, false)} / year
            <span className="text-slate-500 font-normal"> (monthly × 12)</span>
          </p>
          <p className="text-xs text-slate-500 mt-2">Excludes ad spend and payroll (per sheet).</p>
        </div>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Bars use midpoint of each line for relative share only. CapEx lines on the sheet are not all additive to the
        printed total (overlapping scopes — e.g. launch burst roll-up vs. sub-lines); the hero CapEx total is the sheet
        figure.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <section className="rounded-xl border border-white/10 bg-slate-800/35 p-4 md:p-5 backdrop-blur-xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Lane A — Brand marketing CapEx</h2>
          <p className="text-xs text-slate-500 mb-3">Pre/post launch one-time investment mix</p>
          <StackedBar rows={BRAND_LAUNCH_CAPEX_ROWS} colorList={BAR_COLORS} />
          <Legend rows={BRAND_LAUNCH_CAPEX_ROWS} colorList={BAR_COLORS} />
          <p className="mt-4 pt-3 border-t border-white/10 text-sm font-semibold text-fuchsia-300">
            Sheet total CapEx: {formatMoneyRange(capexT.min, capexT.max, false)}
          </p>
        </section>

        <section className="rounded-xl border border-white/10 bg-slate-800/35 p-4 md:p-5 backdrop-blur-xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Lane B — Brand marketing OpEx</h2>
          <p className="text-xs text-slate-500 mb-3">Monthly carry (roll-ups where sheet has parent totals)</p>
          <StackedBar rows={BRAND_LAUNCH_OPEX_ROWS} colorList={BAR_COLORS} />
          <Legend rows={BRAND_LAUNCH_OPEX_ROWS} colorList={BAR_COLORS} />
          <p className="mt-4 pt-3 border-t border-white/10 text-sm font-semibold text-violet-300">
            Sheet total OpEx: {formatMoneyRange(opexT.min, opexT.max, false)} / month
          </p>
        </section>
      </div>

      <section className="rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4 md:p-5 backdrop-blur-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-200/90 mb-2">TBD & unit-based (from sheets)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
          <div>
            <p className="text-slate-500 font-semibold mb-1.5">CapEx notes</p>
            <ul className="space-y-1 list-disc list-inside">
              {BRAND_LAUNCH_CAPEX_TBD.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-slate-500 font-semibold mb-1.5">OpEx notes</p>
            <ul className="space-y-1 list-disc list-inside">
              {BRAND_LAUNCH_OPEX_TBD.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="text-xs text-slate-500 space-y-1.5 border-t border-white/10 pt-4">
        <p>Source: Brand Pre and Post Launch Budget ESTIMATE — Total CapEx & Monthly OpEx PDFs.</p>
        <p>OpEx content engine shown as sheet roll-up ($38.5k–$62k); role-level med board lines roll into medical board total.</p>
      </footer>
    </div>
  )
}
