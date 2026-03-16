import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import { boardDeckSlides } from '../data/boardDeckSlides'

function getReportMaxStep(slide) {
  if (!slide || slide.layout !== 'report' || !slide.sections) return 0
  let chartCount = 0
  if (slide.marketShareChart && slide.marketShareChartByChannel) chartCount = 1
  else {
    if (slide.marketShareChart) chartCount += 1
    if (slide.marketShareChartByChannel) chartCount += 1
  }
  if (slide.deliveryFormatChart) chartCount += 1
  if (slide.pillFatigueCard) chartCount += 1
  const sectionSteps = slide.sections.reduce((acc, s) => acc + 1 + (s.lines?.length ?? 0), 0)
  const totalItems = 1 + chartCount + sectionSteps
  return Math.max(0, totalItems - 1)
}

const BoardDeckContext = createContext(null)

export function useBoardDeck() {
  return useContext(BoardDeckContext)
}

export function BoardDeckProvider({ children }) {
  const visibleSlides = useMemo(() => boardDeckSlides.filter((s) => !s.hidden), [])
  const TOTAL_SLIDES = visibleSlides.length
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [reportStep, setReportStep] = useState(0)
  const currentSlide = visibleSlides[currentSlideIndex]

  const isOnReportSlide = currentSlide?.layout === 'report'
  const reportMaxStep = useMemo(() => getReportMaxStep(currentSlide), [currentSlide])

  useEffect(() => {
    if (currentSlideIndex >= TOTAL_SLIDES && TOTAL_SLIDES > 0) {
      setCurrentSlideIndex(TOTAL_SLIDES - 1)
    }
  }, [currentSlideIndex, TOTAL_SLIDES])

  useEffect(() => {
    if (!isOnReportSlide) setReportStep(0)
  }, [isOnReportSlide])

  const goNext = useCallback(() => {
    if (isOnReportSlide && reportStep < reportMaxStep) {
      setReportStep((s) => s + 1)
    } else {
      setCurrentSlideIndex((i) => Math.min(TOTAL_SLIDES - 1, i + 1))
      setReportStep(0)
    }
  }, [isOnReportSlide, reportStep, reportMaxStep])

  const goPrev = useCallback(() => {
    if (isOnReportSlide && reportStep > 0) {
      setReportStep((s) => s - 1)
    } else {
      setCurrentSlideIndex((i) => Math.max(0, i - 1))
    }
  }, [isOnReportSlide, reportStep])

  /** Slide-only navigation (used by on-page arrows): always move to next/prev entire slide. */
  const goNextSlide = useCallback(() => {
    setCurrentSlideIndex((i) => Math.min(TOTAL_SLIDES - 1, i + 1))
    setReportStep(0)
  }, [])
  const goPrevSlide = useCallback(() => {
    setCurrentSlideIndex((i) => Math.max(0, i - 1))
  }, [])

  /** Jump directly to slide by index (0-based). Resets report step. */
  const goToSlide = useCallback((index) => {
    const i = Math.max(0, Math.min(TOTAL_SLIDES - 1, index))
    setCurrentSlideIndex(i)
    setReportStep(0)
  }, [TOTAL_SLIDES])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (isOnReportSlide && reportStep < reportMaxStep) {
          setReportStep((s) => s + 1)
        } else {
          setCurrentSlideIndex((i) => Math.min(TOTAL_SLIDES - 1, i + 1))
          setReportStep(0)
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (isOnReportSlide && reportStep > 0) {
          setReportStep((s) => s - 1)
        } else {
          setCurrentSlideIndex((i) => Math.max(0, i - 1))
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [isOnReportSlide, reportStep, reportMaxStep])

  const value = {
    currentSlideIndex,
    visibleSlides,
    totalSlides: TOTAL_SLIDES,
    reportStep: isOnReportSlide ? reportStep : 0,
    goNext,
    goPrev,
    goNextSlide,
    goPrevSlide,
    goToSlide,
    canGoNext: currentSlideIndex < TOTAL_SLIDES - 1 || (isOnReportSlide && reportStep < reportMaxStep),
    canGoPrev: currentSlideIndex > 0 || (isOnReportSlide && reportStep > 0),
    canGoNextSlide: currentSlideIndex < TOTAL_SLIDES - 1,
    canGoPrevSlide: currentSlideIndex > 0,
  }

  return (
    <BoardDeckContext.Provider value={value}>
      {children}
    </BoardDeckContext.Provider>
  )
}
