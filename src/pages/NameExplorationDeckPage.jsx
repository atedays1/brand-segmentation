import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  Sparkles,
  GitCompare,
  Zap,
  Radar,
  Layers,
  MessageSquare,
  CheckSquare,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  StickyNote,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { nameExplorationSlides } from '../data/nameExplorationSlides'
import { NameExplorationBackground } from '../components/nameExploration/NameExplorationBackground'
import { NameExplorationSlideBody } from '../components/nameExploration/NameExplorationSlideContent'

const ACCENT = '#0f766e'
const SWIPE_THRESHOLD_PX = 50

const HEADER_ICONS = {
  Target,
  Sparkles,
  GitCompare,
  Zap,
  Radar,
  Layers,
  MessageSquare,
  CheckSquare,
  TrendingUp,
}

export function NameExplorationDeckPage() {
  const slides = nameExplorationSlides
  const totalSlides = slides.length
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [jumpOpen, setJumpOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const jumpRef = useRef(null)
  const fullscreenRef = useRef(null)
  const touchStartRef = useRef(null)
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

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await fullscreenRef.current?.requestFullscreen?.()
      } else {
        await document.exitFullscreen?.()
      }
    } catch {
      // Browser may block fullscreen outside a user gesture.
    }
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      const fsElement = document.fullscreenElement
      setIsFullscreen(Boolean(fsElement && fullscreenRef.current && fullscreenRef.current.contains(fsElement)))
      if (!fsElement) setJumpOpen(false)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'f' || e.key === 'F') {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
        e.preventDefault()
        toggleFullscreen()
        return
      }
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

  const isCover = slide.layout === 'nameCover'
  const isNameDetail = slide.layout === 'nameDetail'

  return (
    <div
      ref={fullscreenRef}
      className={`fixed inset-0 ${isFullscreen ? 'pt-0 pb-16' : 'pt-10 sm:pt-14 pb-20'} flex flex-col bg-[#FAFAF8] overflow-hidden`}
      style={{ fontFamily: "'Outfit', system-ui, sans-serif" }}
    >
      <button
        type="button"
        onClick={toggleFullscreen}
        className="fixed top-4 left-4 sm:top-5 sm:left-6 z-30 pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 transition-colors border border-slate-200 shadow-sm"
        aria-label={isFullscreen ? 'Exit fullscreen presentation' : 'Enter fullscreen presentation'}
        title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Enter fullscreen (F)'}
      >
        {isFullscreen ? <Minimize2 size={18} strokeWidth={2} /> : <Maximize2 size={18} strokeWidth={2} />}
      </button>
      {!isFullscreen && (
        <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-20 pointer-events-none" aria-hidden>
          <img
            src={`${import.meta.env.BASE_URL}ate-days-logo.jpg`}
            alt="Ate Days"
            className="h-20 sm:h-24 w-auto object-contain opacity-90"
          />
        </div>
      )}
      <NameExplorationBackground />

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
              isCover ? 'max-w-4xl justify-center' : isNameDetail ? 'max-w-7xl justify-start' : 'max-w-6xl justify-start'
            }`}
          >
            {(slide.title || slide.headerIcon) && (
              <motion.h1
                className={`font-bold text-slate-900 tracking-tight flex items-center gap-3 ${
                  isCover
                    ? 'text-3xl md:text-4xl lg:text-5xl mb-3'
                    : isNameDetail
                      ? 'text-xl md:text-2xl mb-0.5'
                      : 'text-2xl md:text-3xl mb-1'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                {slide.headerIcon && HEADER_ICONS[slide.headerIcon] && (() => {
                  const Icon = HEADER_ICONS[slide.headerIcon]
                  return (
                    <span className="flex-shrink-0">
                      <Icon
                        size={isNameDetail ? 28 : 36}
                        strokeWidth={1.5}
                        style={{ color: ACCENT }}
                        className={isNameDetail ? 'w-7 h-7' : 'md:w-10 md:h-10 w-9 h-9'}
                      />
                    </span>
                  )
                })()}
                {slide.title ? (
                  slide.titleHighlight ? (
                    <span>
                      {slide.title.split(slide.titleHighlight)[0]}
                      <span style={{ color: ACCENT }}>{slide.titleHighlight}</span>
                      {slide.title.split(slide.titleHighlight)[1]}
                    </span>
                  ) : (
                    slide.title
                  )
                ) : null}
              </motion.h1>
            )}
            {slide.subtitle && (
              <p
                className={`text-slate-500 leading-relaxed ${
                  isCover
                    ? 'text-base md:text-lg mb-4 max-w-3xl'
                    : isNameDetail
                      ? 'text-xs md:text-sm mb-1 max-w-3xl'
                      : 'text-sm md:text-base mb-2 max-w-3xl'
                }`}
              >
                {slide.subtitle}
              </p>
            )}
            <NameExplorationSlideBody slide={slide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {notesOpen && slide.speakerNotes && (
        <div
          className="absolute top-14 sm:top-16 left-4 right-4 md:left-auto md:right-6 md:w-[min(420px,40vw)] z-30 rounded-xl border border-teal-200 bg-white/95 backdrop-blur-xl shadow-xl p-4 max-h-[50vh] overflow-y-auto"
          role="region"
          aria-label="Speaker notes"
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5">
              <StickyNote size={14} />
              Speaker notes · slide {currentSlideIndex + 1}
            </p>
            <button type="button" onClick={() => setNotesOpen(false)} className="text-xs text-slate-400 hover:text-slate-800">
              Close
            </button>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{slide.speakerNotes}</p>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <button
          type="button"
          onClick={goPrevSlide}
          disabled={currentSlideIndex === 0}
          className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white disabled:opacity-30 text-slate-700 border border-slate-200 shadow-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={goNextSlide}
          disabled={currentSlideIndex >= totalSlides - 1}
          className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white disabled:opacity-30 text-slate-700 border border-slate-200 shadow-sm"
          aria-label="Next slide"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 flex-wrap justify-center" ref={jumpRef}>
          <span className="text-slate-400 text-xs">
            {currentSlideIndex + 1} / {totalSlides} · ← → · N notes · F fullscreen
          </span>
          <button
            type="button"
            onClick={() => setNotesOpen((o) => !o)}
            className="text-xs text-teal-700 hover:text-teal-900 underline rounded px-1"
          >
            {notesOpen ? 'Hide notes' : 'Notes'}
          </button>
          <button
            type="button"
            onClick={() => setJumpOpen((o) => !o)}
            className="text-xs text-teal-700 hover:text-teal-900 underline rounded px-1"
            aria-expanded={jumpOpen}
          >
            Jump
          </button>
          {jumpOpen && (
            <ul className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-80 max-h-[min(70vh,320px)] overflow-y-auto rounded-lg border border-slate-200 bg-white/95 backdrop-blur-xl shadow-xl py-1 z-50 list-none">
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
                        ? 'bg-teal-50 text-teal-800 font-medium'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
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
