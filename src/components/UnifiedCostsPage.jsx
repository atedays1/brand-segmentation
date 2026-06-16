import { formatMoneyRange, WEBSITE_BUDGET_TOTALS } from '../data/websiteBudgetData'
import { BUDGET_OVERLAP_GROUPS, WEBSITE_ONLY_HIGHLIGHTS, BRAND_ONLY_HIGHLIGHTS } from '../data/budgetOverlapAnalysis'
import {
  UNIFIED_LEDGER_ONE_TIME,
  UNIFIED_LEDGER_MONTHLY,
  UNIFIED_LEDGER_ANNUAL,
  UNIFIED_VARIABLE,
} from '../data/unifiedBudgetLedger'

const SOURCE_STYLES = {
  website: 'bg-sky-500/15 text-sky-300 border-sky-500/35',
  brand: 'bg-violet-500/15 text-violet-300 border-violet-500/35',
  both: 'bg-amber-500/15 text-amber-200 border-amber-500/40',
}

function SourceTag({ source }) {
  const label = source === 'website' ? 'Web' : source === 'brand' ? 'Brand' : 'Both'
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded border ${SOURCE_STYLES[source]}`}>
      {label}
    </span>
  )
}

function LedgerTable({ title, rows, periodLabel }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/40 overflow-hidden">
      <div className="px-4 py-2 border-b border-white/10 bg-slate-800/50">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">{title}</h3>
        {periodLabel && <p className="text-[10px] text-slate-500 mt-0.5">{periodLabel}</p>}
      </div>
      <div className="divide-y divide-white/5 max-h-[min(52vh,420px)] overflow-y-auto">
        {rows.map((row, i) => (
          <div key={i} className="px-4 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <SourceTag source={row.source} />
              {row.overlap && (
                <span className="text-[10px] text-amber-400/90 border border-amber-500/30 rounded px-1.5 py-0">Overlap</span>
              )}
              <span className="text-slate-200">{row.label}</span>
              {row.note && <span className="text-slate-500 text-xs">({row.note})</span>}
            </div>
            <span className="text-emerald-400/95 font-medium tabular-nums text-right flex-shrink-0">
              {row.min != null && row.max != null ? formatMoneyRange(row.min, row.max, false) : row.note || '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function UnifiedCostsPage() {
  const w = WEBSITE_BUDGET_TOTALS

  return (
    <div className="mt-2 space-y-6 md:space-y-7 max-w-4xl w-full pb-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-sky-500/25 bg-sky-500/5 px-4 py-3">
          <p className="text-[10px] font-bold uppercase text-sky-400/90 mb-1">Source A</p>
          <p className="text-white font-semibold">Website build & maintenance</p>
          <p className="text-slate-400 text-xs mt-1 tabular-nums">
            CAPEX {formatMoneyRange(w.capex.min, w.capex.max)} · OPEX {formatMoneyRange(w.opexMonthly.min, w.opexMonthly.max)}/mo
          </p>
        </div>
        <div className="rounded-lg border border-violet-500/25 bg-violet-500/5 px-4 py-3">
          <p className="text-[10px] font-bold uppercase text-violet-400/90 mb-1">Source B</p>
          <p className="text-white font-semibold">Brand development costs (Sheet1)</p>
          <p className="text-slate-400 text-xs mt-1">Naming, identity, content engines, med board, infra detail.</p>
        </div>
      </div>

      <section>
        <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Overlap between sheets</h2>
        <p className="text-xs text-slate-500 mb-3">
          These buckets appear in both models — budget once per vendor/program, not twice.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BUDGET_OVERLAP_GROUPS.map((g) => (
            <div
              key={g.id}
              className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-4 text-xs leading-relaxed"
            >
              <p className="font-semibold text-amber-100/95 mb-2">{g.label}</p>
              <p className="text-slate-400 mb-1">
                <span className="text-sky-400/90 font-medium">Web</span> {g.websiteItems}
              </p>
              <p className="text-slate-400 mb-2">
                <span className="text-violet-400/90 font-medium">Brand</span> {g.brandItems}
              </p>
              <p className="text-slate-500 border-t border-amber-500/15 pt-2">{g.guidance}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-sky-500/20 bg-slate-900/30 p-4">
          <h3 className="text-xs font-bold uppercase text-sky-400 mb-2">Mostly website sheet</h3>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            {WEBSITE_ONLY_HIGHLIGHTS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-violet-500/20 bg-slate-900/30 p-4">
          <h3 className="text-xs font-bold uppercase text-violet-400 mb-2">Mostly brand sheet</h3>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            {BRAND_ONLY_HIGHLIGHTS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Combined ledger</h2>
        <p className="text-xs text-slate-500">
          All major lines from both spreadsheets in one place. <span className="text-amber-400/90">Overlap</span> marks
          rows called out above. Do not sum both sheets’ totals without removing duplicates.
        </p>
        <LedgerTable title="One-time / setup" rows={UNIFIED_LEDGER_ONE_TIME} />
        <LedgerTable title="Monthly recurring" rows={UNIFIED_LEDGER_MONTHLY} periodLabel="Per month unless noted" />
        <LedgerTable title="Annual" rows={UNIFIED_LEDGER_ANNUAL} periodLabel="Per year" />
        <div className="rounded-xl border border-white/10 bg-slate-900/40 overflow-hidden">
          <div className="px-4 py-2 border-b border-white/10 bg-slate-800/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Variable / not fixed monthly</h3>
          </div>
          <div className="divide-y divide-white/5">
            {UNIFIED_VARIABLE.map((row, i) => (
              <div key={i} className="px-4 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <SourceTag source={row.source} />
                  <span className="text-slate-200">{row.label}</span>
                  {row.note && <span className="text-slate-500 text-xs">({row.note})</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="text-xs text-slate-500 border-t border-white/10 pt-4 space-y-1">
        <p>
          Brand Development Costs PDF did not print grand totals in all cells; ranges are estimates. Medical board
          optional tiers (mid vs KOL) are detail in source — not rolled into ledger midpoints.
        </p>
      </footer>
    </div>
  )
}
