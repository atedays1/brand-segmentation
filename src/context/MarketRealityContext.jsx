import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'
import { useSidebarLibrary } from './SidebarLibraryContext'

export const MAX_STEPS_PER_SLIDE = [9, 12, 6, 4] // S1: 9; S2: 12; S3: 6; S4: 4 (title, intro, flow images, cards)

// Exploration order (marketplace → segments → behavior → personas): slide 1, 3, 4, 2
export const MAX_STEPS_EXPLORATION = [9, 6, 4, 12]

const MarketRealityContext = createContext(null)

export function useMarketReality() {
  const ctx = useContext(MarketRealityContext)
  return ctx
}

export function MarketRealityProvider({ children, sectionRefs, maxStepsPerSlideOverride }) {
  const { editMode } = useSidebarLibrary() || {}
  const steps = maxStepsPerSlideOverride ?? MAX_STEPS_PER_SLIDE
  const [currentSlide, setCurrentSlide] = useState(0)
  const [revealStep, setRevealStep] = useState(0)
  const [contentUnlocked, setContentUnlocked] = useState(false)
  const [presentMode, setPresentMode] = useState(false) // false = all slides fully populated; true = blank, right arrow reveals
  const lastScrollWasKeyboard = useRef(true)
  const stateRef = useRef({ currentSlide: 0, revealStep: 0, maxStep: steps[0] })
  stateRef.current = { currentSlide, revealStep, maxStep: steps[currentSlide] ?? 0 }

  const maxStep = steps[currentSlide] ?? 0

  const goToSlide = useCallback(
    (index) => {
      const i = Math.max(0, Math.min(3, index))
      lastScrollWasKeyboard.current = true
      setCurrentSlide(i)
      if (presentMode) {
        setContentUnlocked(true)
        setRevealStep(0)
      } else {
        setContentUnlocked(true)
        setRevealStep(steps[i] ?? 0)
      }
      const el = sectionRefs[i]?.current
      if (el) {
        const navOffset = 56
        const top = el.getBoundingClientRect().top + window.scrollY - navOffset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    },
    [sectionRefs, presentMode, steps]
  )

  const togglePresentMode = useCallback(() => {
    setPresentMode((on) => {
      if (!on) {
        setContentUnlocked(false)
        setRevealStep(0)
        return true
      }
      setContentUnlocked(true)
      setRevealStep(steps[currentSlide] ?? 0)
      return false
    })
  }, [currentSlide, steps])

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

  // Keyboard: Space = next slide, Right = next step, Left = prev step (disabled in edit mode so spacebar can be used for typing)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.defaultPrevented) return
      if (editMode) return // let spacebar and arrows pass through for typing/navigation in fields
      const { currentSlide: cur, revealStep: step, maxStep: max } = stateRef.current
      if (e.key === ' ') {
        e.preventDefault()
        nextSlide()
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (step < max) nextStep()
        else if (cur < 3) goToSlide(cur + 1)
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (step > 0) prevStep()
        else if (cur > 0) goToSlide(cur - 1)
        return
      }
    }
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [editMode, nextSlide, nextStep, prevStep, goToSlide])

  const value = {
    currentSlide,
    setCurrentSlide,
    revealStep,
    setRevealStep,
    contentUnlocked,
    presentMode,
    togglePresentMode,
    goToSlide,
    nextStep,
    prevStep,
    nextSlide,
    resetReveal,
    sectionRefs: sectionRefs || [],
    maxStepsPerSlide: steps,
    lastScrollWasKeyboard,
  }

  return (
    <MarketRealityContext.Provider value={value}>
      {children}
    </MarketRealityContext.Provider>
  )
}
