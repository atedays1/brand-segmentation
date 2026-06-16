import { forwardRef } from 'react'
import { Moon, Sparkles, TrendingUp, Pill, Leaf, CupSoda, Radar } from 'lucide-react'
import { sleepLandscapeSlides } from '../../data/sleepLandscapeSlides'
import {
  LandscapeSummary,
  LandscapeTimeline,
  LandscapeBrandTable,
  LandscapeIngredientPillars,
  LandscapeTrends,
} from './LandscapeSlideContent'

export const REPORT_CAPTURE_WIDTH = 1056

const ACCENT = '#818cf8'

function slideById(id) {
  return sleepLandscapeSlides.find((s) => s.id === id)
}

function ReportHeader({ icon: Icon, title, titleHighlight, subtitle }) {
  return (
    <header className="mb-6">
      <div className="flex items-start gap-3 mb-2">
        {Icon && (
          <span className="flex-shrink-0 mt-0.5">
            <Icon size={32} strokeWidth={1.5} style={{ color: ACCENT }} />
          </span>
        )}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight leading-tight">
            {titleHighlight ? (
              <>
                {title.split(titleHighlight)[0]}
                <span style={{ color: ACCENT }}>{titleHighlight}</span>
                {title.split(titleHighlight)[1]}
              </>
            ) : (
              title
            )}
          </h2>
          {subtitle && <p className="text-sm text-slate-400 mt-1 leading-relaxed">{subtitle}</p>}
        </div>
      </div>
    </header>
  )
}

const ReportPage = forwardRef(function ReportPage({ children, className = '' }, ref) {
  return (
    <section
      ref={ref}
      className={`relative bg-slate-950 px-10 py-9 border-b border-white/5 ${className}`}
      style={{ width: REPORT_CAPTURE_WIDTH }}
    >
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 w-[420px] h-[420px] rounded-full bg-emerald-500/5 blur-3xl"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </section>
  )
})

/**
 * Flowing team report — sections paginate naturally at logical breaks (not deck slides).
 */
export function SleepLandscapeReport({ sectionRefs }) {
  const cover = slideById('cover')
  const summary = slideById('summary')
  const evolution = slideById('evolution')
  const melatoninMass = slideById('melatonin-mass')
  const melatoninModern = slideById('melatonin-modern')
  const melatoninFree = slideById('melatonin-free-ingredients')
  const drinks = slideById('non-melatonin-drinks')
  const caps = slideById('non-melatonin-caps')
  const trends = slideById('trends-2026')

  const setRef = (index) => (el) => {
    if (sectionRefs) sectionRefs.current[index] = el
  }

  return (
    <div className="bg-slate-950">
      {/* Page 1 — title + executive summary */}
      <ReportPage ref={setRef(0)}>
        <div className="flex items-start justify-between gap-8 mb-8 pb-6 border-b border-white/10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <Moon size={36} strokeWidth={1.5} style={{ color: ACCENT }} />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-300/80">
                Internal market analysis
              </p>
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight leading-tight mb-2">
              <span style={{ color: ACCENT }}>Sleep</span> supplement landscape
            </h1>
            <p className="text-lg text-slate-400">{cover?.subtitle?.replace(/^2021–2026 · /, '') || '2021–2026'}</p>
          </div>
          <img src="/ate-days-logo.jpg" alt="Ate Days" className="h-20 w-auto object-contain opacity-95 flex-shrink-0" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {cover?.chapters?.map((ch) => (
            <div
              key={ch.label}
              className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-3 py-2.5 text-sm font-medium text-slate-200"
            >
              {ch.label}
            </div>
          ))}
        </div>

        <ReportHeader
          icon={Sparkles}
          title={summary.title}
          subtitle={summary.subtitle}
        />
        <LandscapeSummary summary={summary.summary} />
      </ReportPage>

      {/* Page 2 — melatonin evolution */}
      <ReportPage ref={setRef(1)}>
        <ReportHeader
          icon={TrendingUp}
          title={evolution.title}
          subtitle={evolution.subtitle}
        />
        <LandscapeTimeline timeline={evolution.timeline} doseVisual={evolution.doseVisual} />
      </ReportPage>

      {/* Page 3 — melatonin brands (both tables) */}
      <ReportPage ref={setRef(2)}>
        <ReportHeader
          icon={Pill}
          title={melatoninMass.title}
          titleHighlight={melatoninMass.titleHighlight}
          subtitle="Representative brands across legacy high-dose and modern multi-pathway stacks"
        />
        <div className="space-y-6">
          <LandscapeBrandTable
            tableTitle={melatoninMass.tableTitle}
            columns={melatoninMass.columns}
            rows={melatoninMass.rows}
            captureMode
          />
          <LandscapeBrandTable
            tableTitle={melatoninModern.tableTitle}
            columns={melatoninModern.columns}
            rows={melatoninModern.rows}
            captureMode
          />
        </div>
      </ReportPage>

      {/* Page 4 — melatonin-free pathways */}
      <ReportPage ref={setRef(3)}>
        <ReportHeader
          icon={Leaf}
          title={melatoninFree.title}
          titleHighlight={melatoninFree.titleHighlight}
          subtitle={melatoninFree.subtitle}
        />
        <LandscapeIngredientPillars intro={melatoninFree.intro} pillars={melatoninFree.pillars} />
      </ReportPage>

      {/* Page 5 — melatonin-free brands (both tables) */}
      <ReportPage ref={setRef(4)}>
        <ReportHeader
          icon={CupSoda}
          title={caps.title}
          titleHighlight={caps.titleHighlight}
          subtitle="Powders, drinks, gummies, softgels & capsules"
        />
        <div className="space-y-6">
          <LandscapeBrandTable
            tableTitle={drinks.tableTitle}
            columns={drinks.columns}
            rows={drinks.rows}
            captureMode
          />
          <LandscapeBrandTable
            tableTitle={caps.tableTitle}
            columns={caps.columns}
            rows={caps.rows}
            captureMode
          />
        </div>
      </ReportPage>

      {/* Page 6 — 2026 trends & implication */}
      <ReportPage ref={setRef(5)}>
        <ReportHeader icon={Radar} title={trends.title} subtitle={trends.subtitle} />
        <LandscapeTrends trends={trends.trends} implication={trends.implication} />
        <p className="mt-8 pt-4 border-t border-white/10 text-[11px] text-slate-600">
          Ate Days · Sleep Supplement Landscape · 2021–2026 · Confidential internal
        </p>
      </ReportPage>
    </div>
  )
}
