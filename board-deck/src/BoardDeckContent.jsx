import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  Compass,
  BarChart3,
  BriefcaseBusiness,
  Zap,
  Sparkles,
  Scale,
  ShieldPlus,
  MoonStar,
  BrainCircuit,
  Dumbbell,
  Frown,
  Infinity,
  Users,
  PersonStanding,
  Goal,
  FileQuestion,
  XOctagon,
  Layout,
  ListChecks,
  Layers,
  Search,
  ShieldCheck,
  HelpCircle,
  FileText,
  TrendingUp,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Gauge,
  Store,
} from 'lucide-react'
import { useBoardDeck } from './context/BoardDeckContext'
import { BackgroundDecor } from './components/BackgroundDecor'

const EMERALD_ACCENT = '#10b981'

const HEADER_ICONS = {
  Target,
  Compass,
  Users,
  PersonStanding,
  Goal,
  Layout,
  ListChecks,
  Layers,
  Search,
  ShieldCheck,
  HelpCircle,
  FileText,
}

const PILLAR_ICONS = {
  TrendingUp,
  Users,
  ShieldCheck,
  Lightbulb,
}

const SECTION_ICONS = {
  TrendingUp,
  Users,
  ShieldCheck,
  Lightbulb,
}

const TAKEAWAY_ICONS = {
  TrendingUp,
  Gauge,
  Users,
}

function parseBold(str) {
  if (typeof str !== 'string') return str
  const parts = str.split(/(\*\*.*?\*\*)/g)
  return parts.map((s, i) => {
    const match = s.match(/\*\*(.*?)\*\*/)
    return match ? <strong key={i} className="font-semibold text-white">{match[1]}</strong> : s
  })
}

const HIGHLIGHT_ICONS = {
  BarChart3,
  BriefcaseBusiness,
}

const BULLET_ICONS = {
  Zap,
  Sparkles,
  Scale,
  ShieldPlus,
  MoonStar,
  BrainCircuit,
  Dumbbell,
  Frown,
  Infinity,
}

const EMPTY_SLIDE_ICONS = {
  FileQuestion,
  XOctagon,
}

const SWIPE_THRESHOLD_PX = 50

export function BoardDeckContent() {
  const { currentSlideIndex, reportStep, visibleSlides, goNextSlide, goPrevSlide, goNext, goPrev, canGoNextSlide, canGoPrevSlide, totalSlides, goToSlide } = useBoardDeck()
  const [jumpOpen, setJumpOpen] = useState(false)
  const jumpRef = useRef(null)
  useEffect(() => {
    if (!jumpOpen) return
    const close = (e) => {
      if (jumpRef.current && !jumpRef.current.contains(e.target)) setJumpOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [jumpOpen])
  const slide = visibleSlides[currentSlideIndex]
  const parallaxRef = useRef(null)
  const reportSectionRef = useRef(null)
  const touchStartRef = useRef(null)
  const [top50Expanded, setTop50Expanded] = useState(false)

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const handleTouchEnd = (e) => {
    if (!touchStartRef.current || e.changedTouches.length !== 1) return
    const { x: startX, y: startY } = touchStartRef.current
    const endX = e.changedTouches[0].clientX
    const endY = e.changedTouches[0].clientY
    const deltaX = endX - startX
    const deltaY = endY - startY
    touchStartRef.current = null
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return
    if (Math.abs(deltaX) <= Math.abs(deltaY)) return
    if (deltaX < 0) goNext()
    else goPrev()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    if (slide?.layout === 'report' && reportSectionRef.current) {
      const t = setTimeout(() => {
        reportSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
      return () => clearTimeout(t)
    }
  }, [currentSlideIndex, reportStep, slide?.layout])

  if (!slide) return null

  return (
    <div className="fixed inset-0 pt-2 sm:pt-6 pb-20 flex flex-col bg-slate-950 overflow-hidden">
      <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-20 pointer-events-none" aria-hidden>
        <img
          src="./ate-days-logo-transparent.png"
          alt="Ate Days"
          className="h-24 sm:h-28 md:h-30 w-auto object-contain opacity-95"
        />
      </div>
      <BackgroundDecor />

      <motion.div
        ref={parallaxRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={false}
        animate={{
          x: currentSlideIndex * 12,
          opacity: 0.25 + (currentSlideIndex % 3) * 0.03,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      >
        <div
          className="absolute -top-1/2 -right-1/4 w-[80vw] h-[80vw] rounded-full bg-slate-600/10 blur-3xl"
          aria-hidden
        />
      </motion.div>

      <div
        className="relative flex-1 flex flex-col w-full px-6 md:px-12 lg:px-16 backdrop-blur-3xl min-h-0 justify-start items-center pt-0 sm:pt-6 md:pt-12 lg:pt-16 overflow-y-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`outline-none max-w-5xl w-full text-left flex-1 flex flex-col min-h-0 ${slide.layout === 'report' ? 'pt-0' : slide.layout === 'topBrands' ? 'justify-start pt-6 md:pt-10' : ['takeaways', 'strategy', 'ecommerce'].includes(slide.layout) ? 'justify-start pt-12 sm:pt-16 md:pt-20 lg:pt-24' : 'justify-center'}`}
          >
            {(slide.title || slide.headerIcon) ? (
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 flex items-center gap-3"
                initial={{ opacity: 0, x: -28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {slide.headerIcon && HEADER_ICONS[slide.headerIcon] && (() => {
                  const IconComponent = HEADER_ICONS[slide.headerIcon]
                  const iconProps = { size: 36, strokeWidth: 1.5, style: { color: EMERALD_ACCENT }, className: 'flex-shrink-0 md:w-10 md:h-10 w-9 h-9' }
                  return (slide.headerIcon === 'Target' || slide.headerIcon === 'Compass') ? (
                    <motion.span
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      className="flex-shrink-0"
                    >
                      <IconComponent {...iconProps} />
                    </motion.span>
                  ) : (
                    <span className="flex-shrink-0">
                      <IconComponent {...iconProps} />
                    </span>
                  )
                })()}
                {slide.title ? (
                  slide.titleHighlight ? (
                    <>
                      {slide.title.split(slide.titleHighlight)[0]}
                      <span style={{ color: EMERALD_ACCENT }}>{slide.titleHighlight}</span>
                      {slide.title.split(slide.titleHighlight)[1]}
                    </>
                  ) : (
                    slide.title
                  )
                ) : null}
              </motion.h1>
            ) : null}
            {slide.highlight && (
              <motion.p
                className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2"
                animate={slide.id === 3 ? { scale: [1, 1.02, 1] } : undefined}
                transition={slide.id === 3 ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
              >
                {slide.highlightIcon && HIGHLIGHT_ICONS[slide.highlightIcon] && (() => {
                  const IconComponent = HIGHLIGHT_ICONS[slide.highlightIcon]
                  return <IconComponent size={28} strokeWidth={2} style={{ color: EMERALD_ACCENT }} className="flex-shrink-0" />
                })()}
                <span style={{ color: EMERALD_ACCENT }}>{slide.highlight}</span>
              </motion.p>
            )}
            {slide.subtitle && (
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-6 leading-relaxed">
                {slide.subtitle}
              </p>
            )}
            {slide.quote && (
              <blockquote className="text-lg md:text-xl text-slate-300 italic border-l-4 border-emerald-500/60 pl-6 my-6 max-w-3xl">
                {slide.quote}
              </blockquote>
            )}
            {slide.layout === 'report' && (slide.intro || slide.introParts) && slide.sections && slide.sections.length > 0 && (() => {
              const chartItems = []
              if (slide.marketShareChart && slide.marketShareChartByChannel) {
                chartItems.push({ type: 'marketChartsPair' })
              } else {
                if (slide.marketShareChart) chartItems.push({ type: 'marketChart', chart: slide.marketShareChart })
                if (slide.marketShareChartByChannel) chartItems.push({ type: 'marketChart', chart: slide.marketShareChartByChannel })
              }
              if (slide.deliveryFormatChart) chartItems.push({ type: 'marketChart', chart: slide.deliveryFormatChart })
              if (slide.pillFatigueCard) chartItems.push({ type: 'pillFatigue', card: slide.pillFatigueCard })
              const items = [
                { type: 'intro' },
                ...chartItems,
                ...slide.sections.flatMap((section, sectionIdx) => [
                  { type: 'heading', sectionIdx, section },
                  ...(section.lines || []).map((line, lineIdx) => ({ type: 'line', sectionIdx, lineIdx, line })),
                ]),
              ]
              const visibleItems = items.slice(0, reportStep + 1)
              const CHART_COLORS = ['#38bdf8', '#10b981', '#f59e0b', '#f97316', '#a855f7', '#ec4899', '#06b6d4', '#84cc16', '#eab308', '#6366f1']
              const getArcPath = (startPct, endPct, cx, cy, r) => {
                const startAngle = (startPct / 100) * 360 - 90
                const endAngle = (endPct / 100) * 360 - 90
                const startRad = (startAngle * Math.PI) / 180
                const endRad = (endAngle * Math.PI) / 180
                const x1 = cx + r * Math.cos(startRad)
                const y1 = cy + r * Math.sin(startRad)
                const x2 = cx + r * Math.cos(endRad)
                const y2 = cy + r * Math.sin(endRad)
                const sweep = 1
                const large = endAngle - startAngle > 180 ? 1 : 0
                return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${x2.toFixed(2)} ${y2.toFixed(2)} Z`
              }
              return (
                <div className="mt-4 flex-1 min-h-0 flex flex-col">
                  <div className="overflow-y-auto pr-2 -mr-2 space-y-4 pb-4 max-h-[55vh] md:max-h-[60vh] scroll-smooth">
                    {(() => {
                      const reportNodes = []
                      for (let itemIdx = 0; itemIdx < visibleItems.length; itemIdx++) {
                        const item = visibleItems[itemIdx]
                        const isNew = itemIdx === reportStep
                        const isLastItem = itemIdx === visibleItems.length - 1
                        const itemRef = isLastItem ? reportSectionRef : undefined

                        if (item.type === 'heading' && item.section.heading.includes('Key Recommendations')) {
                          const sectionIdx = item.sectionIdx
                          const lineItems = []
                          let j = itemIdx + 1
                          while (j < visibleItems.length && visibleItems[j].type === 'line' && visibleItems[j].sectionIdx === sectionIdx) {
                            lineItems.push(visibleItems[j])
                            j++
                          }
                          const blockLastIdx = j - 1
                          const blockIsLastVisible = blockLastIdx === visibleItems.length - 1
                          const SectionIcon = item.section.icon ? SECTION_ICONS[item.section.icon] : null
                          reportNodes.push(
                            <motion.div
                              key={`key-rec-${sectionIdx}`}
                              ref={blockIsLastVisible ? reportSectionRef : undefined}
                              initial={isNew ? { opacity: 0, x: -16 } : false}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                              className="rounded-xl border-2 border-emerald-500/60 bg-emerald-500/10 p-4 space-y-2"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                {SectionIcon && (
                                  <span style={{ color: EMERALD_ACCENT }}>
                                    <SectionIcon size={22} strokeWidth={2} className="flex-shrink-0" />
                                  </span>
                                )}
                                <h3 className="text-base md:text-lg font-bold text-white">{item.section.heading}</h3>
                              </div>
                              {lineItems.map((lineItem) => {
                                const content = lineItem.line.parts
                                  ? lineItem.line.parts.map((p, i) => (p.bold ? <span key={i} className="font-semibold text-white">{p.text}</span> : <span key={i}>{p.text}</span>))
                                  : typeof lineItem.line === 'string' ? lineItem.line : null
                                return (
                                  <p
                                    key={`${lineItem.sectionIdx}-${lineItem.lineIdx}`}
                                    className="text-slate-300 text-base md:text-lg leading-relaxed pl-8 flex gap-2"
                                  >
                                    <span style={{ color: EMERALD_ACCENT }} className="flex-shrink-0">●</span>
                                    <span className="inline">{content}</span>
                                  </p>
                                )
                              })}
                            </motion.div>
                          )
                          itemIdx = j - 1
                          continue
                        }

                        if (item.type === 'intro') {
                          reportNodes.push(
                            <motion.p
                              key="intro"
                              ref={itemRef}
                              className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed"
                              initial={isNew ? { opacity: 0, x: -16 } : false}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                              {slide.introParts
                                ? slide.introParts.map((p, i) => (p.bold ? <span key={i} className="font-semibold text-white">{p.text}</span> : <span key={i}>{p.text}</span>))
                                : slide.intro}
                            </motion.p>
                          )
                          continue
                        }
                        if (item.type === 'marketChartsPair') {
                        const renderPieCard = (chart, isCat) => {
                          let cum = 0
                          const sub = isCat ? 'supplement industry market share by product category' : 'supplement market share by channel'
                          return (
                            <div className="rounded-xl border border-white/10 bg-slate-800/40 p-5 backdrop-blur-xl flex-1 min-w-0 flex flex-col h-full" style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.06)' }}>
                              <h3 className="text-sm font-bold text-white mb-4 leading-snug">
                                <span className="font-semibold text-emerald-400">$69.28 billion</span> {sub}, 2024
                              </h3>
                              <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 min-h-0">
                                <div className="flex-shrink-0 w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
                                  <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible" aria-hidden>
                                    {chart.segments.map((seg, i) => {
                                      const startPct = cum
                                      cum += seg.pct
                                      const path = getArcPath(startPct, cum, 100, 100, 90)
                                      const fill = CHART_COLORS[i % CHART_COLORS.length]
                                      return <path key={seg.label} d={path} fill={fill} stroke="rgba(15,23,42,0.5)" strokeWidth={1} />
                                    })}
                                  </svg>
                                </div>
                                <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-300">
                                  {chart.segments.map((seg, i) => (
                                    <li key={seg.label} className="flex items-center gap-2">
                                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} aria-hidden />
                                      <span>{seg.label}</span>
                                      <span className="font-semibold text-white">{seg.pct}%</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <p className="text-xs text-slate-500 mt-4">Source: {chart.source}</p>
                            </div>
                          )
                        }
                        const showSecondChart = reportStep >= 2
                        reportNodes.push(
                          <div
                            key="marketChartsRow"
                            ref={itemRef}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl items-stretch"
                          >
                            <div key="marketChartCategorySlot" className="min-h-0 flex">
                              {renderPieCard(slide.marketShareChart, true)}
                            </div>
                            <div key="marketChartChannelSlot" className="min-h-0 flex">
                              {showSecondChart ? (
                                <motion.div
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                  className="w-full h-full flex"
                                >
                                  {renderPieCard(slide.marketShareChartByChannel, false)}
                                </motion.div>
                              ) : null}
                            </div>
                          </div>
                        ); continue }
                        if (item.type === 'marketChart') {
                        const c = item.chart
                        const isCategory = c === slide.marketShareChart
                        const renderPieCard = (chart, isCat) => {
                          let cum = 0
                          const sub = isCat ? 'supplement industry market share by product category' : 'supplement market share by channel'
                          return (
                            <div key={sub} className="rounded-xl border border-white/10 bg-slate-800/40 p-5 backdrop-blur-xl flex-1 min-w-0 flex flex-col" style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.06)' }}>
                              <h3 className="text-sm font-bold text-white mb-4 leading-snug">
                                <span className="font-semibold text-emerald-400">$69.28 billion</span> {sub}, 2024
                              </h3>
                              <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex-shrink-0 w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
                                  <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible" aria-hidden>
                                    {chart.segments.map((seg, i) => {
                                      const startPct = cum
                                      cum += seg.pct
                                      const path = getArcPath(startPct, cum, 100, 100, 90)
                                      const fill = CHART_COLORS[i % CHART_COLORS.length]
                                      return <path key={seg.label} d={path} fill={fill} stroke="rgba(15,23,42,0.5)" strokeWidth={1} />
                                    })}
                                  </svg>
                                </div>
                                <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-300">
                                  {chart.segments.map((seg, i) => (
                                    <li key={seg.label} className="flex items-center gap-2">
                                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} aria-hidden />
                                      <span>{seg.label}</span>
                                      <span className="font-semibold text-white">{seg.pct}%</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <p className="text-xs text-slate-500 mt-4">Source: {chart.source}</p>
                            </div>
                          )
                        }
                        const subtitle = isCategory ? 'supplement industry market share by product category' : 'supplement market share by channel'
                        const chartKey = c.cardTitle ? 'deliveryFormat' : (isCategory ? 'marketChartCategory' : 'marketChartChannel')
                        reportNodes.push(
                          <motion.div
                            key={chartKey}
                            ref={itemRef}
                            initial={isNew ? { opacity: 0, y: 12 } : false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="rounded-xl border border-white/10 bg-slate-800/40 p-5 backdrop-blur-xl max-w-md"
                            style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.06)' }}
                          >
                            <h3 className="text-sm font-bold text-white mb-4 leading-snug">
                              {c.cardTitle ? c.cardTitle : (<><span className="font-semibold text-emerald-400">$69.28 billion</span> {subtitle}, 2024</>)}
                            </h3>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                              <div className="flex-shrink-0 w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
                                <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible" aria-hidden>
                                  {(() => { let cum = 0; return c.segments.map((seg, i) => {
                                    const startPct = cum
                                    cum += seg.pct
                                    const path = getArcPath(startPct, cum, 100, 100, 90)
                                    const fill = CHART_COLORS[i % CHART_COLORS.length]
                                    return <path key={seg.label} d={path} fill={fill} stroke="rgba(15,23,42,0.5)" strokeWidth={1} />
                                  }); })()}
                                </svg>
                              </div>
                              <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-300">
                                {c.segments.map((seg, i) => (
                                  <li key={seg.label} className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} aria-hidden />
                                    <span>{seg.label}</span>
                                    <span className="font-semibold text-white">{seg.pct}%</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <p className="text-xs text-slate-500 mt-4">Source: {c.source}</p>
                          </motion.div>
                        ); continue }
                        if (item.type === 'pillFatigue') {
                        const { card } = item
                        reportNodes.push(
                          <motion.div
                            key="pillFatigue"
                            ref={itemRef}
                            initial={isNew ? { opacity: 0, y: 12 } : false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="rounded-xl border border-white/10 bg-slate-800/40 p-5 backdrop-blur-xl max-w-2xl"
                            style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.06)' }}
                          >
                            <h3 className="text-sm font-bold text-white mb-4 leading-snug">{card.title}</h3>
                            <ul className="space-y-3 mb-4">
                              {card.points.map((p, i) => (
                                <li key={i} className="flex flex-col gap-0.5">
                                  <span className="flex items-center gap-2 text-slate-200">
                                    <span className="font-semibold text-white">{p.label}:</span>
                                    <span className="font-bold text-emerald-400">{p.stat}</span>
                                  </span>
                                  <span className="text-slate-400 text-sm">{p.detail}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="text-sm text-slate-300 border-t border-white/10 pt-4 font-medium">{card.takeaway}</p>
                            <p className="text-xs text-slate-500 mt-3">Source: {card.source}</p>
                          </motion.div>
                        ); continue }
                        if (item.type === 'heading') {
                        const SectionIcon = item.section.icon ? SECTION_ICONS[item.section.icon] : null
                        reportNodes.push(
                          <motion.div
                            key={`h-${item.sectionIdx}`}
                            ref={itemRef}
                            className="flex items-center gap-2 mb-2"
                            initial={isNew ? { opacity: 0, x: -16 } : false}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                          >
                            {SectionIcon && (
                              <span style={{ color: EMERALD_ACCENT }}>
                                <SectionIcon size={22} strokeWidth={2} className="flex-shrink-0" />
                              </span>
                            )}
                            <h3 className="text-base md:text-lg font-bold text-white">{item.section.heading}</h3>
                          </motion.div>
                        ); continue }
                          const content = item.line.parts
                          ? item.line.parts.map((p, i) => (p.bold ? <span key={i} className="font-semibold text-white">{p.text}</span> : <span key={i}>{p.text}</span>))
                          : typeof item.line === 'string' ? item.line : null
                        reportNodes.push(
                          <motion.p
                            key={`${item.sectionIdx}-${item.lineIdx}`}
                            ref={itemRef}
                            className="text-slate-300 text-base md:text-lg leading-relaxed pl-8 flex gap-2"
                            initial={isNew ? { opacity: 0, x: -16 } : false}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                          >
                            <span style={{ color: EMERALD_ACCENT }} className="flex-shrink-0">●</span>
                            <span className="inline">{content}</span>
                          </motion.p>
                        )
                      }
                      return reportNodes
                    })()}
                  </div>
                </div>
              )
            })()}
            {slide.layout === 'takeaways' && slide.pillars && slide.pillars.length > 0 && (
              <div className="mt-6 space-y-6">
                <div className={`grid grid-cols-1 gap-4 ${slide.pillars.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                  {slide.pillars.map((pillar, idx) => {
                    const IconComponent = pillar.icon ? TAKEAWAY_ICONS[pillar.icon] : null
                    const isGauge = pillar.icon === 'Gauge'
                    return (
                      <motion.div
                        key={pillar.header}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="rounded-xl border border-white/10 bg-slate-800/40 p-5 flex flex-col backdrop-blur-xl"
                        style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.06)' }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          {IconComponent && (
                            <span style={{ color: EMERALD_ACCENT }}>
                              <IconComponent size={22} strokeWidth={2} className="flex-shrink-0" />
                            </span>
                          )}
                          <h3 className="text-base font-bold text-white">{pillar.header}</h3>
                        </div>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-2xl font-bold" style={{ color: EMERALD_ACCENT }}>{pillar.stat}</span>
                          {pillar.statLabel && <span className="text-sm text-slate-400">{pillar.statLabel}</span>}
                        </div>
                        {isGauge && (
                          <div className="mb-3 flex items-center justify-center" aria-hidden>
                            <div className="relative w-16 h-16">
                              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                                <path className="text-slate-700" stroke="currentColor" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path style={{ stroke: EMERALD_ACCENT }} strokeWidth="3" strokeDasharray="70, 100" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              </svg>
                            </div>
                          </div>
                        )}
                        <p className="text-slate-300 text-sm leading-relaxed mt-1 flex-1">
                          {parseBold(pillar.content)}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
                {slide.verdict && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.35 }}
                    className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl px-5 py-4"
                    style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.15)' }}
                  >
                    <p className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-1">The Strategic Verdict</p>
                    <p className="text-lg font-bold leading-snug" style={{ color: EMERALD_ACCENT }}>{slide.verdict}</p>
                  </motion.div>
                )}
                {slide.thesis && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="text-slate-400 text-sm leading-relaxed max-w-4xl"
                  >
                    {parseBold(slide.thesis)}
                  </motion.p>
                )}
              </div>
            )}
            {slide.layout === 'ecommerce' && (slide.ecommerceGrowth || slide.ecommerceShare || slide.ecommerceSales) && (() => {
              const ECO_CHART_COLORS = ['#38bdf8', '#10b981', '#f59e0b', '#f97316', '#a855f7', '#ec4899']
              const getArcPath = (startPct, endPct, cx, cy, r) => {
                const startAngle = (startPct / 100) * 360 - 90
                const endAngle = (endPct / 100) * 360 - 90
                const startRad = (startAngle * Math.PI) / 180
                const endRad = (endAngle * Math.PI) / 180
                const x1 = cx + r * Math.cos(startRad)
                const y1 = cy + r * Math.sin(startRad)
                const x2 = cx + r * Math.cos(endRad)
                const y2 = cy + r * Math.sin(endRad)
                const large = endAngle - startAngle > 180 ? 1 : 0
                return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`
              }
              return (
                <div className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {slide.ecommerceGrowth && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, duration: 0.35 }}
                        className="rounded-xl border border-white/10 bg-slate-800/40 p-5 backdrop-blur-xl flex flex-col"
                        style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.06)' }}
                      >
                        <h3 className="text-sm font-bold text-white mb-3">{slide.ecommerceGrowth.title}</h3>
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-2xl font-bold text-emerald-400">{slide.ecommerceGrowth.totalGrowth2020}</span>
                          <span className="text-slate-400 text-sm">2020</span>
                          <span className="text-slate-500">→</span>
                          <span className="text-xl font-bold text-emerald-400">{slide.ecommerceGrowth.totalGrowth2028e}</span>
                          <span className="text-slate-400 text-sm">2028e</span>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">{slide.ecommerceGrowth.highlight}</p>
                        <ul className="space-y-1.5 text-sm text-slate-300 flex-1">
                          {slide.ecommerceGrowth.categories.map((cat, i) => (
                            <li key={i}>
                              <span className="font-semibold text-white">{cat.name}</span>
                              <span className="text-emerald-400 ml-1">{cat.growth}</span>
                              <span className="text-slate-500 block text-xs">{cat.note}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-slate-500 mt-3">Source: {slide.ecommerceGrowth.source}</p>
                      </motion.div>
                    )}
                    {slide.ecommerceShare && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.35 }}
                        className="rounded-xl border border-white/10 bg-slate-800/40 p-5 backdrop-blur-xl flex flex-col"
                        style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.06)' }}
                      >
                        <h3 className="text-sm font-bold text-white mb-3">{slide.ecommerceShare.title}</h3>
                        <div className="flex justify-center my-2">
                          <div className="w-[140px] h-[140px] flex-shrink-0">
                            <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                              {(() => {
                                let cum = 0
                                return slide.ecommerceShare.segments.map((seg, i) => {
                                  const startPct = cum
                                  cum += seg.pct
                                  const path = getArcPath(startPct, cum, 100, 100, 90)
                                  const fill = ECO_CHART_COLORS[i % ECO_CHART_COLORS.length]
                                  return <path key={seg.label} d={path} fill={fill} stroke="rgba(15,23,42,0.5)" strokeWidth={1} />
                                })
                              })()}
                            </svg>
                          </div>
                        </div>
                        <ul className="space-y-1 text-xs text-slate-300 flex-wrap">
                          {slide.ecommerceShare.segments.map((seg, i) => (
                            <li key={seg.label} className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: ECO_CHART_COLORS[i % ECO_CHART_COLORS.length] }} />
                              <span>{seg.label}</span>
                              <span className="font-semibold text-white">{seg.pct}%</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-slate-500 mt-3">Source: {slide.ecommerceShare.source}</p>
                      </motion.div>
                    )}
                    {slide.ecommerceSales && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.35 }}
                        className="rounded-xl border border-white/10 bg-slate-800/40 p-5 backdrop-blur-xl flex flex-col"
                        style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.06)' }}
                      >
                        <h3 className="text-sm font-bold text-white mb-3">{slide.ecommerceSales.title}</h3>
                        <div className="space-y-3 my-2">
                          <div className="flex justify-between items-baseline">
                            <span className="text-slate-400 text-sm">2020</span>
                            <span className="text-lg font-bold text-emerald-400">{slide.ecommerceSales.total2020}</span>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <span className="text-slate-400 text-sm">2024</span>
                            <span className="text-xl font-bold text-emerald-400">{slide.ecommerceSales.total2024}</span>
                          </div>
                          <div className="flex justify-between items-baseline border-t border-white/10 pt-2">
                            <span className="text-slate-400 text-sm">2028e</span>
                            <span className="text-2xl font-bold text-emerald-400">{slide.ecommerceSales.total2028e}</span>
                          </div>
                        </div>
                        <p className="text-slate-300 text-sm mt-2 flex-1">{slide.ecommerceSales.takeaway}</p>
                        <p className="text-xs text-slate-500 mt-3">Source: {slide.ecommerceSales.source}</p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )
            })()}
            {slide.layout === 'topBrands' && (slide.topBrandsEstablished || slide.topBrandsEmerging || (slide.top50List && slide.top50List.length > 0)) && (
              <div className="mt-6 flex flex-col min-h-0 flex-1">
                <div className="overflow-y-auto overflow-x-hidden pr-2 scroll-smooth flex-1 min-h-0" style={{ maxHeight: 'calc(100vh - 14rem)' }}>
                  <div className="space-y-6 pb-4">
                    {/* Two summary cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                      {slide.topBrandsEstablished && (
                        <motion.div
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35 }}
                          className="rounded-xl border border-white/10 bg-slate-800/40 p-5 backdrop-blur-xl"
                          style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.06)' }}
                        >
                          <h3 className="text-sm font-bold text-white mb-1">{slide.topBrandsEstablished.label}</h3>
                          <p className="text-slate-400 text-sm mb-4">{slide.topBrandsEstablished.description}</p>
                          <ul className="flex flex-wrap gap-2">
                            {slide.topBrandsEstablished.companies.map((name, i) => (
                              <li key={i} className="px-3 py-1.5 rounded-lg bg-slate-700/50 text-slate-200 text-sm font-medium">
                                {name}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                      {slide.topBrandsEmerging && (
                        <motion.div
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: 0.1 }}
                          className="rounded-xl border border-emerald-500/20 bg-slate-800/40 p-5 backdrop-blur-xl"
                          style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.12)' }}
                        >
                          <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                            <span className="text-emerald-400">↑</span> {slide.topBrandsEmerging.label}
                          </h3>
                          <p className="text-slate-400 text-sm mb-4">{slide.topBrandsEmerging.description}</p>
                          <ul className="flex flex-wrap gap-2">
                            {slide.topBrandsEmerging.companies.map((name, i) => (
                              <li key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 text-sm font-medium border border-emerald-500/20">
                                {name}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                    {/* Truncated full top 50 table below */}
                    {slide.top50List && slide.top50List.length > 0 && (() => {
                      const INITIAL_ROWS = 15
                      const visible = top50Expanded ? slide.top50List : slide.top50List.slice(0, INITIAL_ROWS)
                      const hasMore = slide.top50List.length > INITIAL_ROWS
                      const formatSales = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}B` : String(n)
                      return (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-white/10 bg-slate-800/40 overflow-hidden backdrop-blur-xl" style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.06)' }}>
                            <div className="overflow-x-auto">
                              <table className="w-full min-w-[520px] text-sm">
                                <thead>
                                  <tr className="border-b border-white/10">
                                    <th className="text-left py-3 px-4 font-bold text-white bg-slate-700/50">Rank</th>
                                    <th className="text-left py-3 px-4 font-bold text-white bg-slate-700/50">Company</th>
                                    <th className="text-right py-3 px-4 font-bold text-white bg-slate-700/50">2022</th>
                                    <th className="text-right py-3 px-4 font-bold text-white bg-slate-700/50">2023</th>
                                    <th className="text-right py-3 px-4 font-bold text-white bg-slate-700/50">2024</th>
                                    <th className="text-right py-3 px-4 font-bold text-emerald-400 bg-slate-700/50">2024 Growth</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {visible.map((row, i) => (
                                    <tr
                                      key={row.rank}
                                      className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-slate-800/30' : 'bg-slate-800/10'} ${row.emerging ? 'bg-emerald-500/5' : ''}`}
                                    >
                                      <td className="py-2.5 px-4 text-slate-400 font-medium">{row.rank}</td>
                                      <td className={`py-2.5 px-4 font-medium ${row.emerging ? 'text-emerald-300' : 'text-white'}`}>{row.company}</td>
                                      <td className="py-2.5 px-4 text-right text-slate-300 tabular-nums">{formatSales(row.s2022)}</td>
                                      <td className="py-2.5 px-4 text-right text-slate-300 tabular-nums">{formatSales(row.s2023)}</td>
                                      <td className="py-2.5 px-4 text-right text-white font-medium tabular-nums">{formatSales(row.s2024)}</td>
                                      <td className={`py-2.5 px-4 text-right font-semibold tabular-nums ${row.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {row.growth >= 0 ? '+' : ''}{row.growth}%
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {hasMore && (
                              <button
                                type="button"
                                onClick={() => setTop50Expanded((e) => !e)}
                                className="w-full py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium text-emerald-400 hover:bg-white/5 border-t border-white/10 transition-colors"
                              >
                                {top50Expanded ? (
                                  <>
                                    <ChevronUp size={18} strokeWidth={2} />
                                    Show less
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown size={18} strokeWidth={2} />
                                    Show full list ({slide.top50List.length} companies)
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                          {slide.topBrandsSource && (
                            <p className="text-xs text-slate-500">{slide.topBrandsSource}</p>
                          )}
                        </div>
                      )
                    })()}
                  </div>
                </div>
              </div>
            )}
            {slide.layout === 'strategy' && (slide.strategyPillars || slide.strategyD2c) && (
              <div className="mt-6 space-y-6">
                {slide.strategyPillarsTitle && slide.strategyPillars && slide.strategyPillars.length > 0 && (
                  <>
                    <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{slide.strategyPillarsTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {slide.strategyPillars.map((pillar, idx) => (
                        <motion.div
                          key={pillar.title}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="rounded-xl border border-white/10 bg-slate-800/40 p-4 flex flex-col backdrop-blur-xl"
                          style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.06)' }}
                        >
                          <h3 className="text-sm font-bold text-white mb-2">{pillar.title}</h3>
                          <p className="text-slate-300 text-sm leading-relaxed">{parseBold(pillar.content)}</p>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
                {slide.strategyD2c && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.35 }}
                    className="rounded-xl border border-white/10 bg-slate-800/40 p-5 backdrop-blur-xl"
                    style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.06)' }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span style={{ color: EMERALD_ACCENT }}>
                        <Store size={22} strokeWidth={2} className="flex-shrink-0" />
                      </span>
                      <h2 className="text-base font-bold text-white">{slide.strategyD2c.title}</h2>
                    </div>
                    <ul className="space-y-3">
                      {slide.strategyD2c.points.map((point, i) => (
                        <li key={i} className="flex flex-col gap-1">
                          <p className="text-slate-300 text-sm leading-relaxed">{parseBold(point.content)}</p>
                          {point.investorInsight && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-700/50 rounded-md px-2.5 py-1 w-fit">
                              <span style={{ color: EMERALD_ACCENT }}>Investor Insight</span>
                              <span className="text-slate-500">·</span>
                              <span className="italic">&quot;{point.investorInsight}&quot;</span>
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                {(slide.strategyVerdictLabel || slide.verdict) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.35 }}
                    className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl px-5 py-4"
                    style={{ boxShadow: '0 0 0 1px rgba(16, 185, 129, 0.15)' }}
                  >
                    {slide.strategyVerdictLabel && (
                      <p className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-1">{slide.strategyVerdictLabel}</p>
                    )}
                    <p className="text-lg font-bold leading-snug" style={{ color: EMERALD_ACCENT }}>
                      Verdict: {typeof slide.verdict === 'string' ? parseBold(slide.verdict) : slide.verdict}
                    </p>
                  </motion.div>
                )}
              </div>
            )}
            {slide.bullets && slide.bullets.length > 0 && (
              <ul className="space-y-2 md:space-y-3 mt-4">
                {slide.bullets.map((item, i) => {
                  const text = typeof item === 'string' ? item : item.text
                  const bold = typeof item === 'object' && item?.bold
                  const iconName = typeof item === 'object' && item?.icon
                  const IconComponent = iconName ? BULLET_ICONS[iconName] : null
                  return (
                    <motion.li
                      key={i}
                      className="flex gap-3 text-slate-300 text-base md:text-lg"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <span className="flex-shrink-0 flex items-center justify-center w-7">
                        {IconComponent ? (
                          <IconComponent size={22} strokeWidth={1.75} style={{ color: EMERALD_ACCENT }} />
                        ) : (
                          <span style={{ color: EMERALD_ACCENT }}>●</span>
                        )}
                      </span>
                      <span className={bold ? 'font-bold text-white' : ''}>{text}</span>
                    </motion.li>
                  )
                })}
              </ul>
            )}
            {slide.personas && slide.personas.length > 0 && (
              <div className={`grid gap-8 mt-8 ${slide.personas.length === 1 ? 'max-w-2xl mx-auto' : 'md:grid-cols-2'}`}>
                {slide.personas.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="rounded-xl bg-slate-800/60 border border-slate-700/50 overflow-hidden"
                  >
                    {p.image && (
                      <div className="w-full aspect-[4/3] bg-slate-700/50 overflow-hidden">
                        <img
                          src={p.image}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg md:text-xl font-bold text-white leading-snug">{p.headline}</h3>
                      <p className="text-emerald-400 text-sm font-medium mt-2">{p.name}</p>
                      <p className="text-slate-400 text-sm mt-0.5">{p.role}</p>
                      <p className="text-slate-500 text-xs mt-1">{p.segment}</p>
                      <p className="text-slate-300 text-sm mt-3"><strong className="text-slate-200">Mindset:</strong> {p.mindset}</p>
                      <p className="text-slate-300 text-sm mt-2"><strong className="text-slate-200">Approach:</strong> {p.approach}</p>
                      <p className="text-slate-300 text-sm mt-2"><strong className="text-slate-200">Barrier:</strong> {p.barrier}</p>
                      <p className="text-emerald-400 text-sm mt-3 font-medium">Winning: {p.winning}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            {slide.emptySlideIcon && EMPTY_SLIDE_ICONS[slide.emptySlideIcon] && (() => {
              const IconComponent = EMPTY_SLIDE_ICONS[slide.emptySlideIcon]
              return (
                <div className="flex justify-center items-center py-16 my-8" aria-hidden>
                  <IconComponent size={140} strokeWidth={1.25} className="text-slate-500/50" />
                </div>
              )
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <button
          type="button"
          onClick={goPrevSlide}
          disabled={!canGoPrevSlide}
          className="pointer-events-auto p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/90 disabled:opacity-30 disabled:pointer-events-none text-white transition-colors border border-slate-600/50"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={goNextSlide}
          disabled={!canGoNextSlide}
          className="pointer-events-auto p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/90 disabled:opacity-30 disabled:pointer-events-none text-white transition-colors border border-slate-600/50"
          aria-label="Next slide"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2" ref={jumpRef}>
          <span className="text-slate-500 text-xs">
            {currentSlideIndex + 1} / {totalSlides}
            {slide?.layout === 'report' ? ' · ← → or swipe advances line by line' : ' · ← → or swipe'}
          </span>
          <button
            type="button"
            onClick={() => setJumpOpen((o) => !o)}
            className="text-xs text-emerald-400 hover:text-emerald-300 underline focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded px-1"
            aria-expanded={jumpOpen}
            aria-haspopup="listbox"
            aria-label="Jump to slide"
          >
            Jump to slide
          </button>
          {jumpOpen && (
            <ul
              role="listbox"
              aria-label="Select slide"
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-56 max-h-[min(70vh,320px)] overflow-y-auto rounded-lg border border-slate-600/60 bg-slate-800/95 backdrop-blur-xl shadow-xl py-1 z-50 list-none"
            >
              {visibleSlides.map((s, i) => (
                <li key={s.id || i} role="option" aria-selected={currentSlideIndex === i}>
                  <button
                    type="button"
                    onClick={() => { goToSlide(i); setJumpOpen(false) }}
                    className={`w-full text-left px-3 py-2 text-sm truncate block ${currentSlideIndex === i ? 'bg-emerald-500/20 text-emerald-300 font-medium' : 'text-slate-300 hover:bg-slate-700/80 hover:text-white'}`}
                  >
                    Slide {i + 1}{s.title ? ` · ${s.title}` : ''}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
