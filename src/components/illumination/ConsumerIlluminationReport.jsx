import { forwardRef } from 'react'
import { Target, Users, Sparkles, GitCompare, CheckSquare, TrendingUp, Mic } from 'lucide-react'
import { consumerIlluminationSlides } from '../../data/consumerIlluminationSlides'
import { IlluminationSlideBody } from './IlluminationSlideContent'

export const ILLUMINATION_REPORT_WIDTH = 1056

const ACCENT = '#10b981'

function slideById(id) {
  return consumerIlluminationSlides.find((s) => s.id === id)
}

function ReportHeader({ icon: Icon, title, titleHighlight, subtitle }) {
  return (
    <header className="mb-5">
      <div className="flex items-start gap-3">
        {Icon && (
          <Icon size={28} strokeWidth={1.5} style={{ color: ACCENT }} className="flex-shrink-0 mt-0.5" />
        )}
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
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
          {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>
      </div>
    </header>
  )
}

const ReportPage = forwardRef(function ReportPage({ children }, ref) {
  return (
    <section
      ref={ref}
      className="relative bg-slate-950 px-10 py-9 border-b border-white/5"
      style={{ width: ILLUMINATION_REPORT_WIDTH }}
    >
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />
      <div className="relative">{children}</div>
    </section>
  )
})

/** Flowing team PDF, logical pages from 14-slide deck content. */
export function ConsumerIlluminationReport({ sectionRefs }) {
  const cover = slideById('why-now')
  const targets = slideById('two-targets')
  const unites = slideById('what-unites')
  const diverge = slideById('where-diverge')
  const waMind = slideById('wa-mindset')
  const waWins = slideById('wa-wins-loses')
  const oeMind = slideById('oe-mindset')
  const oeWins = slideById('oe-wins-loses')
  const voice = slideById('voice-of-consumer')
  const jtbd = slideById('jtbd-heat')
  const platform = slideById('platform-implications')
  const nuance = slideById('segment-nuance')
  const activation = slideById('insight-to-activation')
  const decisions = slideById('founder-decisions')

  const setRef = (index) => (el) => {
    if (sectionRefs) sectionRefs.current[index] = el
  }

  return (
    <div className="bg-slate-950">
      <ReportPage ref={setRef(0)}>
        <div className="flex justify-between items-start gap-6 mb-6 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target size={32} style={{ color: ACCENT }} />
              <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400/80">
                Founder summary
              </p>
            </div>
            <h1 className="text-3xl font-bold text-white">
              Consumer <span style={{ color: ACCENT }}>Illumination</span>
            </h1>
            <p className="text-slate-400 mt-1">{cover?.subtitle}</p>
          </div>
          <img src={`${import.meta.env.BASE_URL}ate-days-logo.jpg`} alt="" className="h-16 w-auto opacity-95" />
        </div>
        <IlluminationSlideBody slide={cover} />
        <div className="mt-6 pt-4 border-t border-white/10">
          <ReportHeader
            title={targets.title}
            titleHighlight={targets.titleHighlight}
            subtitle={targets.subtitle}
            icon={Users}
          />
          <IlluminationSlideBody slide={targets} />
        </div>
      </ReportPage>

      <ReportPage ref={setRef(1)}>
        <ReportHeader
          title={unites.title}
          titleHighlight={unites.titleHighlight}
          subtitle={unites.subtitle}
          icon={Sparkles}
        />
        <IlluminationSlideBody slide={unites} />
        <div className="mt-6">
          <ReportHeader
            title={diverge.title}
            titleHighlight={diverge.titleHighlight}
            subtitle={diverge.subtitle}
            icon={GitCompare}
          />
          <IlluminationSlideBody slide={diverge} />
        </div>
      </ReportPage>

      <ReportPage ref={setRef(2)}>
        <ReportHeader
          title={waMind.title}
          titleHighlight={waMind.titleHighlight}
          subtitle={waMind.subtitle}
          icon={Target}
        />
        <IlluminationSlideBody slide={waMind} />
        <div className="mt-5">
          <ReportHeader title={waWins.title} subtitle={waWins.subtitle} icon={Target} />
          <IlluminationSlideBody slide={waWins} />
        </div>
        <div className="mt-6 pt-4 border-t border-white/10">
          <ReportHeader
            title={oeMind.title}
            titleHighlight={oeMind.titleHighlight}
            subtitle={oeMind.subtitle}
            icon={Users}
          />
          <IlluminationSlideBody slide={oeMind} />
        </div>
        <div className="mt-5">
          <ReportHeader title={oeWins.title} subtitle={oeWins.subtitle} icon={Users} />
          <IlluminationSlideBody slide={oeWins} />
        </div>
        <div className="mt-6 pt-4 border-t border-white/10">
          <ReportHeader
            title={voice.title}
            titleHighlight={voice.titleHighlight}
            subtitle={voice.subtitle}
            icon={Mic}
          />
          <IlluminationSlideBody slide={voice} />
        </div>
      </ReportPage>

      <ReportPage ref={setRef(3)}>
        <ReportHeader
          title={jtbd.title}
          titleHighlight={jtbd.titleHighlight}
          subtitle={jtbd.subtitle}
          icon={Target}
        />
        <IlluminationSlideBody slide={jtbd} />
        <div className="mt-5">
          <ReportHeader
            title={platform.title}
            titleHighlight={platform.titleHighlight}
            subtitle={platform.subtitle}
            icon={Sparkles}
          />
          <IlluminationSlideBody slide={platform} />
        </div>
        <div className="mt-5">
          <ReportHeader
            title={nuance.title}
            titleHighlight={nuance.titleHighlight}
            subtitle={nuance.subtitle}
            icon={GitCompare}
          />
          <IlluminationSlideBody slide={nuance} />
        </div>
        <div className="mt-5">
          <ReportHeader
            title={activation.title}
            titleHighlight={activation.titleHighlight}
            subtitle={activation.subtitle}
            icon={TrendingUp}
          />
          <IlluminationSlideBody slide={activation} />
        </div>
        <div className="mt-5">
          <ReportHeader
            title={decisions.title}
            titleHighlight={decisions.titleHighlight}
            subtitle={decisions.subtitle}
            icon={CheckSquare}
          />
          <IlluminationSlideBody slide={decisions} />
        </div>
        <p className="mt-6 text-[11px] text-slate-600 border-t border-white/10 pt-3">
          Ate Days · SBK Consumer Illumination · May 2026 · Confidential internal
        </p>
      </ReportPage>
    </div>
  )
}
