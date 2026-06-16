import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  TrendingUp,
  Mail,
  Clapperboard,
  Store,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { agencyNeedsSlides } from '../data/agencyNeedsSlides'
import { BackgroundDecor } from '../components/BackgroundDecor'
import { AgencyNeedSlideBody } from '../components/AgencyNeedSlideBody'
import { AgencyBriefCover } from '../components/AgencyBriefCover'

const EMERALD_ACCENT = '#10b981'
const SWIPE_THRESHOLD_PX = 50

const HEADER_ICONS = {
  Target,
  TrendingUp,
  Mail,
  Clapperboard,
  Store,
}

export function AgencyNeedsDeckPage() {
  const slides = agencyNeedsSlides
  const totalSlides = slides.length
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [jumpOpen, setJumpOpen] = useState(false)
  const jumpRef = useRef(null)
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

  useEffect(() => {
    const handleKeyDown = (e) => {
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

  const isContent = slide.layout === 'agencyNeed'
  const isCover = slide.layout === 'agencyCover'

  return (
    <div className="fixed inset-0 pt-10 sm:pt-14 pb-20 flex flex-col bg-slate-950 overflow-hidden">
      <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-20 pointer-events-none" aria-hidden>
        <img
          src="/ate-days-logo.jpg"
          alt="Ate Days"
          className="h-24 sm:h-28 w-auto object-contain opacity-95"
        />
      </div>
      <BackgroundDecor />

      <div
        className="relative flex-1 flex flex-col w-full px-6 md:px-12 lg:px-16 min-h-0 justify-start items-center pt-4 sm:pt-8 md:pt-12 overflow-y-auto"
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
              isContent ? 'max-w-6xl justify-start' : isCover ? 'max-w-4xl justify-center' : 'max-w-5xl justify-center'
            }`}
          >
            {(slide.title || slide.headerIcon) && (
              <motion.h1
                className={`font-bold text-white tracking-tight flex items-center gap-3 ${
                  isContent
                    ? 'text-2xl md:text-3xl mb-1'
                    : 'text-3xl md:text-4xl lg:text-5xl mb-3'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                {slide.headerIcon && HEADER_ICONS[slide.headerIcon] && (() => {
                  const Icon = HEADER_ICONS[slide.headerIcon]
                  return (
                    <span className="flex-shrink-0">
                      <Icon size={36} strokeWidth={1.5} style={{ color: EMERALD_ACCENT }} className="md:w-10 md:h-10 w-9 h-9" />
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
            )}
            {slide.subtitle && (
              <p
                className={`text-slate-400 leading-relaxed ${
                  isContent ? 'text-sm md:text-base mb-2 max-w-2xl' : 'text-base md:text-lg mb-4 max-w-3xl'
                }`}
              >
                {slide.subtitle}
              </p>
            )}
            {slide.layout === 'agencyCover' && slide.capabilities?.length > 0 && (
              <AgencyBriefCover capabilities={slide.capabilities} />
            )}
            {slide.layout === 'agencyNeed' && slide.agencyNeed && (
              <AgencyNeedSlideBody agencyNeed={slide.agencyNeed} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <button
          type="button"
          onClick={goPrevSlide}
          disabled={currentSlideIndex === 0}
          className="pointer-events-auto p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/90 disabled:opacity-30 disabled:pointer-events-none text-white border border-slate-600/50"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={goNextSlide}
          disabled={currentSlideIndex >= totalSlides - 1}
          className="pointer-events-auto p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/90 disabled:opacity-30 disabled:pointer-events-none text-white border border-slate-600/50"
          aria-label="Next slide"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2" ref={jumpRef}>
          <span className="text-slate-500 text-xs">
            {currentSlideIndex + 1} / {totalSlides} · ← → or swipe
          </span>
          <button
            type="button"
            onClick={() => setJumpOpen((o) => !o)}
            className="text-xs text-emerald-400 hover:text-emerald-300 underline rounded px-1"
            aria-expanded={jumpOpen}
          >
            Jump to slide
          </button>
          {jumpOpen && (
            <ul
              role="listbox"
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-64 max-h-[min(70vh,320px)] overflow-y-auto rounded-lg border border-slate-600/60 bg-slate-800/95 backdrop-blur-xl shadow-xl py-1 z-50 list-none"
            >
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
