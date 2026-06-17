import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  Users,
  Sparkles,
  GitCompare,
  Brain,
  Zap,
  Heart,
  Radar,
  Layers,
  MessageSquare,
  CheckSquare,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  FileDown,
  StickyNote,
} from 'lucide-react'
import { consumerIlluminationSlides } from '../data/consumerIlluminationSlides'
import { BackgroundDecor } from '../components/BackgroundDecor'
import { IlluminationSlideBody } from '../components/illumination/IlluminationSlideContent'
import { ConsumerIlluminationReport } from '../components/illumination/ConsumerIlluminationReport'
import { exportReportToPdf } from '../utils/exportReportToPdf'

const ACCENT = '#10b981'
const SWIPE_THRESHOLD_PX = 50

const HEADER_ICONS = {
  Target,
  Users,
  Sparkles,
  GitCompare,
  Brain,
  Zap,
  Heart,
  Radar,
  Layers,
  MessageSquare,
  CheckSquare,
  TrendingUp,
}

export function ConsumerIlluminationDeckPage() {
  const slides = consumerIlluminationSlides
  const totalSlides = slides.length
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [jumpOpen, setJumpOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [pdfExporting, setPdfExporting] = useState(false)
  const jumpRef = useRef(null)
  const touchStartRef = useRef(null)
  const reportSectionRefs = useRef([])
  const slide = slides[currentSlideIndex]

  useEffect(() => {
    if (!jumpOpen) return
    const close = (e) => {
      if (jumpRef.current && !jumpRef.current.contains(e.target)) setJumpOpen(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [jumpOpen])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'n' || e.key === 'N') {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
        e.preventDefault()
        setNotesOpen((o) => !o)
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCurrentSlideIndex((i) => Math.min(totalSlides - 1, i + 1))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrentSlideIndex((i) => Math.max(0, i - 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [totalSlides])

  const goPrevSlide = () => setCurrentSlideIndex((i) => Math.max(0, i - 1))
  const goNextSlide = () => setCurrentSlideIndex((i) => Math.min(totalSlides - 1, i + 1))
  const goToSlide = (index) => setCurrentSlideIndex(Math.max(0, Math.min(totalSlides - 1, index)))

  const exportPdf = async () => {
    setPdfExporting(true)
    try {
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      await exportReportToPdf({
        elements: reportSectionRefs.current,
        filename: 'consumer-illumination-founder-summary.pdf',
      })
    } catch (err) {
      console.error('PDF export failed', err)
    } finally {
      setPdfExporting(false)
    }
  }

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const handleTouchEnd = (e) => {
    if (!touchStartRef.current || e.changedTouches.length !== 1) return
    const { x: startX, y: startY } = touchStartRef.current
    const deltaX = e.changedTouches[0].clientX - startX
    const deltaY = e.changedTouches[0].clientY - startY
    touchStartRef.current = null
    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) <= Math.abs(deltaY)) return
    if (deltaX < 0) goNextSlide()
    else goPrevSlide()
  }

  if (!slide) return null

  const isCover = slide.layout === 'illuminationCover'

  return (
    <div className="fixed inset-0 pt-10 sm:pt-14 pb-20 flex flex-col bg-slate-950 overflow-hidden">
      <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-20 pointer-events-none" aria-hidden>
        <img src={`${import.meta.env.BASE_URL}ate-days-logo.jpg`} alt="Ate Days" className="h-24 sm:h-28 w-auto object-contain opacity-95" />
      </div>
      <BackgroundDecor />

      <div
        className="relative flex-1 flex flex-col w-full px-6 md:px-12 lg:px-16 min-h-0 justify-start items-center pt-4 sm:pt-8 md:pt-10 overflow-y-auto"
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
            className={`outline-none w-full text-left flex-1 flex flex-col min-h-0 ${
              isCover ? 'max-w-4xl justify-center' : 'max-w-6xl justify-start'
            }`}
          >
            {(slide.title || slide.headerIcon) && (
              <motion.h1
                className={`font-bold text-white tracking-tight flex items-center gap-3 ${
                  isCover ? 'text-3xl md:text-4xl lg:text-5xl mb-3' : 'text-2xl md:text-3xl mb-1'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {slide.headerIcon && HEADER_ICONS[slide.headerIcon] && (() => {
                  const Icon = HEADER_ICONS[slide.headerIcon]
                  return (
                    <span className="flex-shrink-0">
                      <Icon size={36} strokeWidth={1.5} style={{ color: ACCENT }} className="md:w-10 md:h-10 w-9 h-9" />
                    </span>
                  )
                })()}
                {slide.title ? (
                  slide.titleHighlight ? (
                    <>
                      {slide.title.split(slide.titleHighlight)[0]}
                      <span style={{ color: ACCENT }}>{slide.titleHighlight}</span>
                      {slide.title.split(slide.titleHighlight)[1]}
                    </>
                  ) : (
                    slide.title
                  )
                ) : null}
              </motion.h1>
            )}
            {slide.subtitle && (
              <p
                className={`text-slate-400 leading-relaxed ${
                  isCover ? 'text-base md:text-lg mb-4 max-w-3xl' : 'text-sm md:text-base mb-2 max-w-3xl'
                }`}
              >
                {slide.subtitle}
              </p>
            )}
            <IlluminationSlideBody slide={slide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {notesOpen && slide.speakerNotes && (
        <div
          className="absolute top-14 sm:top-16 left-4 right-4 md:left-auto md:right-6 md:w-[min(420px,40vw)] z-30 rounded-xl border border-emerald-500/30 bg-slate-900/95 backdrop-blur-xl shadow-2xl p-4 max-h-[50vh] overflow-y-auto"
          role="region"
          aria-label="Speaker notes"
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 flex items-center gap-1.5">
              <StickyNote size={14} />
              Speaker notes · slide {currentSlideIndex + 1}
            </p>
            <button
              type="button"
              onClick={() => setNotesOpen(false)}
              className="text-xs text-slate-500 hover:text-white"
            >
              Close
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{slide.speakerNotes}</p>
        </div>
      )}

      <div
        aria-hidden
        className="fixed pointer-events-none"
        style={{ left: -20000, top: 0 }}
      >
        <ConsumerIlluminationReport sectionRefs={reportSectionRefs} />
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <button
          type="button"
          onClick={goPrevSlide}
          disabled={currentSlideIndex === 0}
          className="pointer-events-auto p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/90 disabled:opacity-30 text-white border border-slate-600/50"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={goNextSlide}
          disabled={currentSlideIndex >= totalSlides - 1}
          className="pointer-events-auto p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/90 disabled:opacity-30 text-white border border-slate-600/50"
          aria-label="Next slide"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 flex-wrap justify-center" ref={jumpRef}>
          <span className="text-slate-500 text-xs">
            {currentSlideIndex + 1} / {totalSlides} · ← → · N notes
          </span>
          <button
            type="button"
            onClick={() => setNotesOpen((o) => !o)}
            className="text-xs text-emerald-400 hover:text-emerald-300 underline rounded px-1"
          >
            {notesOpen ? 'Hide notes' : 'Notes'}
          </button>
          <button
            type="button"
            onClick={() => setJumpOpen((o) => !o)}
            className="text-xs text-emerald-400 hover:text-emerald-300 underline rounded px-1"
            aria-expanded={jumpOpen}
          >
            Jump
          </button>
          <button
            type="button"
            onClick={exportPdf}
            disabled={pdfExporting}
            className="text-xs text-emerald-400 hover:text-emerald-300 underline rounded px-1 inline-flex items-center gap-1 disabled:opacity-50"
            aria-busy={pdfExporting}
          >
            <FileDown size={12} strokeWidth={2} aria-hidden />
            {pdfExporting ? 'Building PDF…' : 'Export team PDF'}
          </button>
          {jumpOpen && (
            <ul className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-80 max-h-[min(70vh,320px)] overflow-y-auto rounded-lg border border-slate-600/60 bg-slate-800/95 backdrop-blur-xl shadow-xl py-1 z-50 list-none">
              {slides.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      goToSlide(i)
                      setJumpOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm truncate block ${
                      currentSlideIndex === i
                        ? 'bg-emerald-500/20 text-emerald-300 font-medium'
                        : 'text-slate-300 hover:bg-slate-700/80 hover:text-white'
                    }`}
                  >
                    Slide {i + 1} · {s.title}
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
