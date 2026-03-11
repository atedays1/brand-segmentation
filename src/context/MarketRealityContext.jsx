import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'

export const MAX_STEPS_PER_SLIDE = [9, 3, 6, 3] // S1: title, story×2, friction label, 4 bullets, solution; S2–4 unchanged

const MarketRealityContext = createContext(null)

export function useMarketReality() {
  const ctx = useContext(MarketRealityContext)
  return ctx
}

export function MarketRealityProvider({ children, sectionRefs }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [revealStep, setRevealStep] = useState(0)
  const [contentUnlocked, setContentUnlocked] = useState(false)
  const lastScrollWasKeyboard = useRef(true) // true on load so we don't override to "show all" before first interaction

  const maxStep = MAX_STEPS_PER_SLIDE[currentSlide] ?? 0

  const goToSlide = useCallback(
    (index) => {
      const i = Math.max(0, Math.min(3, index))
      lastScrollWasKeyboard.current = true
      setContentUnlocked(true)
      setCurrentSlide(i)
      setRevealStep(0)
      const el = sectionRefs[i]?.current
      if (el) {
        const navOffset = 56
        const top = el.getBoundingClientRect().top + window.scrollY - navOffset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    },
    [sectionRefs]
  )

  const nextStep = useCallback(() => {
    setContentUnlocked(true)
    setRevealStep((s) => Math.min(maxStep, s + 1))
  }, [maxStep])

  const prevStep = useCallback(() => {
    setRevealStep((s) => Math.max(0, s - 1))
  }, [])

  const resetReveal = useCallback(() => {
    setContentUnlocked(false)
    setRevealStep(0)
  }, [])

  const nextSlide = useCallback(() => {
    if (currentSlide < 3) goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  // Keyboard: Space = next slide, Right = next step, Left = prev step
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.defaultPrevented) return
      if (e.key === ' ') {
        e.preventDefault()
        nextSlide()
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (revealStep < maxStep) nextStep()
        else if (currentSlide < 3) goToSlide(currentSlide + 1)
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (revealStep > 0) prevStep()
        else if (currentSlide > 0) goToSlide(currentSlide - 1)
        return
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [revealStep, maxStep, currentSlide, nextSlide, nextStep, prevStep, goToSlide])

  const value = {
    currentSlide,
    setCurrentSlide,
    revealStep,
    setRevealStep,
    contentUnlocked,
    goToSlide,
    nextStep,
    prevStep,
    nextSlide,
    resetReveal,
    sectionRefs: sectionRefs || [],
    maxStepsPerSlide: MAX_STEPS_PER_SLIDE,
    lastScrollWasKeyboard,
  }

  return (
    <MarketRealityContext.Provider value={value}>
      {children}
    </MarketRealityContext.Provider>
  )
}
