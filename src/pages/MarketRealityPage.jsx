import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MarketRealityProvider, useMarketReality, MAX_STEPS_PER_SLIDE } from '../context/MarketRealityContext'
import { Slide1MarketReality } from '../components/marketReality/Slide1MarketReality'
import { Slide2OurPeople } from '../components/marketReality/Slide2OurPeople'
import { Slide3Shopify } from '../components/marketReality/Slide3Shopify'
import { Slide4NewOption } from '../components/marketReality/Slide4NewOption'

function MarketRealityContent() {
  const containerRef = useRef(null)
  const ctx = useMarketReality()
  const sectionRefs = ctx?.sectionRefs || []

  // When user scrolls with wheel/touch, mark so we show full content on that slide
  useEffect(() => {
    const markManual = () => {
      if (ctx?.lastScrollWasKeyboard) ctx.lastScrollWasKeyboard.current = false
    }
    window.addEventListener('wheel', markManual, { passive: true })
    window.addEventListener('touchmove', markManual, { passive: true })
    return () => {
      window.removeEventListener('wheel', markManual)
      window.removeEventListener('touchmove', markManual)
    }
  }, [ctx?.lastScrollWasKeyboard])

  // Keep a ref to context setters so the observer doesn't need to depend on ctx
  // (depending on ctx re-created the observer every keystroke and reset revealStep)
  const ctxRef = useRef(ctx)
  ctxRef.current = ctx

  // Sync currentSlide + revealStep when user scrolls manually (so all content shows)
  useEffect(() => {
    if (!sectionRefs?.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const refs = ctxRef.current?.sectionRefs || sectionRefs
          const index = refs.findIndex((r) => r?.current === entry.target)
          if (index !== -1) {
            const c = ctxRef.current
            if (c?.setCurrentSlide) c.setCurrentSlide(index)
            if (!c?.lastScrollWasKeyboard?.current && c?.setRevealStep) {
              c.setRevealStep(0)
            }
          }
        })
      },
      { threshold: 0.5, rootMargin: '-10% 0px -10% 0px' }
    )
    sectionRefs.forEach((r) => r?.current && observer.observe(r.current))
    return () => observer.disconnect()
  }, [sectionRefs])

  return (
    <div ref={containerRef} className="pt-14 font-sans">
      <motion.section
        ref={sectionRefs[0]}
        className="min-h-screen w-full flex flex-col justify-center"
        id="market-reality-slide-1"
      >
        <Slide1MarketReality />
      </motion.section>
      <motion.section
        ref={sectionRefs[1]}
        className="min-h-screen w-full flex flex-col justify-center"
        id="market-reality-slide-2"
      >
        <Slide2OurPeople />
      </motion.section>
      <motion.section
        ref={sectionRefs[2]}
        className="min-h-screen w-full flex flex-col justify-center"
        id="market-reality-slide-3"
      >
        <Slide3Shopify />
      </motion.section>
      <motion.section
        ref={sectionRefs[3]}
        className="min-h-screen w-full flex flex-col justify-center"
        id="market-reality-slide-4"
      >
        <Slide4NewOption />
      </motion.section>
    </div>
  )
}

function DeckProgressBar() {
  const ctx = useMarketReality()
  if (!ctx) return null
  const { currentSlide, revealStep, maxStepsPerSlide } = ctx
  const maxStep = Math.max(1, maxStepsPerSlide[currentSlide] ?? 1)
  const stepProgress = (revealStep + 1) / maxStep
  const slideProgress = (currentSlide + stepProgress) / 4

  return (
    <div
      className="fixed top-14 left-0 right-0 z-40 h-1 bg-slate-800/80"
      aria-hidden
      role="presentation"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
        initial={{ width: 0 }}
        animate={{ width: `${slideProgress * 100}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </div>
  )
}

function KeyboardHint() {
  const ctx = useMarketReality()
  if (!ctx) return null
  const { currentSlide, revealStep, maxStepsPerSlide, resetReveal, presentMode, togglePresentMode } = ctx
  const maxStep = maxStepsPerSlide[currentSlide] ?? 0

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 px-4 py-2.5 rounded-full bg-slate-900/90 backdrop-blur text-slate-300 text-sm border border-slate-700/50 shadow-xl"
      aria-hidden
    >
      <button
        type="button"
        onClick={togglePresentMode}
        className={`px-3 py-1.5 rounded-lg font-medium text-xs uppercase tracking-wide transition-colors ${
          presentMode ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'
        }`}
      >
        {presentMode ? 'Exit present' : 'Present mode'}
      </button>
      {presentMode && (
        <>
          <button
            type="button"
            onClick={resetReveal}
            className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs uppercase tracking-wide transition-colors"
          >
            Reset
          </button>
          <span className="text-slate-600">|</span>
        </>
      )}
      <span className="hidden sm:inline">Space</span>
      <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-slate-700 text-slate-200 font-mono text-xs">
        space
      </kbd>
      <span className="text-slate-500">·</span>
      <span className="hidden sm:inline">Next</span>
      <kbd className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-200 font-mono text-xs">→</kbd>
      <span className="text-slate-500">·</span>
      <span className="hidden sm:inline">Prev</span>
      <kbd className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-200 font-mono text-xs">←</kbd>
      <span className="text-slate-500 ml-1">Slide {currentSlide + 1}/4</span>
      {presentMode && maxStep > 0 && (
        <span className="text-slate-500">
          · Step {revealStep + 1}/{maxStep}
        </span>
      )}
    </div>
  )
}

function SlideDots() {
  const ctx = useMarketReality()
  if (!ctx) return null
  const { currentSlide, goToSlide } = ctx

  return (
    <div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-2"
      aria-label="Slide navigation"
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.button
          key={i}
          type="button"
          onClick={() => goToSlide(i)}
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
            i === currentSlide ? 'bg-emerald-500 ring-2 ring-emerald-400/50' : 'bg-slate-500 hover:bg-slate-400'
          }`}
          animate={{ scale: i === currentSlide ? 1.35 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  )
}

export function MarketRealityPage() {
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  return (
    <MarketRealityProvider sectionRefs={sectionRefs}>
      <MarketRealityContent />
      <DeckProgressBar />
      <KeyboardHint />
      <SlideDots />
    </MarketRealityProvider>
  )
}
