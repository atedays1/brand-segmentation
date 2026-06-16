import {
  WEBSITE_BUDGET_CAPEX,
  WEBSITE_BUDGET_OPEX,
  WEBSITE_BUDGET_VARIABLE,
  WEBSITE_BUDGET_TOTALS,
  sumMid,
  formatMoneyRange,
} from '../data/websiteBudgetData'

const BAR_COLORS = [
  '#38bdf8',
  '#10b981',
  '#f59e0b',
  '#f97316',
  '#a855f7',
  '#ec4899',
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
            className="h-full min-w-0 transition-[flex-grow] duration-300"
            style={{
              width: `${pct}%`,
              backgroundColor: colorList[i % colorList.length],
            }}
            title={`${row.label}: ${formatMoneyRange(row.min, row.max)}`}
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
              <span className="text-emerald-400/95 tabular-nums font-medium">
                {formatMoneyRange(row.min, row.max)}
              </span>
            </div>
            <p className="text-slate-500 leading-snug mt-0.5">{row.detail}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function BudgetOnePage() {
  const t = WEBSITE_BUDGET_TOTALS
  return (
    <div className="mt-4 space-y-6 md:space-y-8 max-w-4xl w-full pb-4">
      {/* Hero strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/5 px-5 py-4 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">One-time build</p>
          <p className="text-3xl md:text-4xl font-bold text-white tabular-nums tracking-tight">
            {formatMoneyRange(t.capex.min, t.capex.max)}
          </p>
          <p className="text-xs text-slate-500 mt-2">Estimated range — not a fixed quote.</p>
        </div>
        <div className="rounded-xl border border-sky-500/35 bg-sky-500/5 px-5 py-4 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Recurring (monthly)</p>
          <p className="text-3xl md:text-4xl font-bold text-white tabular-nums tracking-tight">
            {formatMoneyRange(t.opexMonthly.min, t.opexMonthly.max)}
            <span className="text-lg md:text-xl font-semibold text-slate-400"> / mo</span>
          </p>
          <p className="text-sm text-slate-400 mt-2 tabular-nums">
            ~{formatMoneyRange(t.opexAnnual.min, t.opexAnnual.max)} / year
            <span className="text-slate-500 font-normal"> (monthly × 12)</span>
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Segment widths in the bars below use the midpoint of each estimated range for illustration of share only.
      </p>

      {/* Swimlanes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <section className="rounded-xl border border-white/10 bg-slate-800/35 p-4 md:p-5 backdrop-blur-xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Lane A — One-time (build)</h2>
          <p className="text-xs text-slate-500 mb-3">CAPEX composition</p>
          <StackedBar rows={WEBSITE_BUDGET_CAPEX} colorList={BAR_COLORS} />
          <Legend rows={WEBSITE_BUDGET_CAPEX} colorList={BAR_COLORS} />
          <p className="mt-4 pt-3 border-t border-white/10 text-sm font-semibold text-emerald-400">
            Total CAPEX: {formatMoneyRange(t.capex.min, t.capex.max, false)}
          </p>
        </section>

        <section className="rounded-xl border border-white/10 bg-slate-800/35 p-4 md:p-5 backdrop-blur-xl">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Lane B — Fixed monthly (operations)</h2>
          <p className="text-xs text-slate-500 mb-3">OPEX composition (excludes ad spend and payroll)</p>
          <StackedBar rows={WEBSITE_BUDGET_OPEX} colorList={BAR_COLORS} />
          <Legend rows={WEBSITE_BUDGET_OPEX} colorList={BAR_COLORS} />
          <p className="mt-4 pt-3 border-t border-white/10 text-sm font-semibold text-sky-400">
            Total OPEX: {formatMoneyRange(t.opexMonthly.min, t.opexMonthly.max, false)} / month
          </p>
        </section>
      </div>

      {/* Variable */}
      <section className="rounded-xl border border-amber-500/40 bg-amber-500/[0.06] p-4 md:p-5 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-200/90">Variable — scales with sales</span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            % / txn
          </span>
        </div>
        <p className="text-xs text-amber-100/80 mb-4">
          These are not part of the monthly OPEX total above. They fluctuate with volume and payment mix.
        </p>
        <ul className="space-y-3">
          {WEBSITE_BUDGET_VARIABLE.map((v) => (
            <li key={v.label} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 border-b border-amber-500/15 pb-3 last:border-0 last:pb-0">
              <div className="min-w-0">
                <span className="font-semibold text-white">{v.label}</span>
                <p className="text-slate-400 text-sm mt-0.5">{v.detail}</p>
              </div>
              <span className="text-amber-200/95 font-medium tabular-nums text-sm sm:text-right flex-shrink-0">{v.fee}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Footnotes */}
      <footer className="text-xs text-slate-500 space-y-1.5 border-t border-white/10 pt-4">
        <p>Monthly OPEX excludes advertising spend and payroll (as in source budget).</p>
        <p>Ranges are estimates; phasing of cash outflows by month is not shown on this one-pager.</p>
      </footer>
    </div>
  )
}
