import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import { boardDeckSlides } from '../data/boardDeckSlides'

const TOTAL_SLIDES = boardDeckSlides.length

function getReportMaxStep(slideIndex) {
  const slide = boardDeckSlides[slideIndex]
  if (slide?.layout !== 'report' || !slide.sections) return 0
  return slide.sections.reduce((acc, s) => acc + 1 + (s.lines?.length ?? 0), 1) - 1
}

const BoardDeckContext = createContext(null)

export function useBoardDeck() {
  return useContext(BoardDeckContext)
}

export function BoardDeckProvider({ children }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [reportStep, setReportStep] = useState(0)

  const isOnReportSlide = boardDeckSlides[currentSlideIndex]?.layout === 'report'
  const reportMaxStep = useMemo(() => getReportMaxStep(currentSlideIndex), [currentSlideIndex])

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
    totalSlides: TOTAL_SLIDES,
    reportStep: isOnReportSlide ? reportStep : 0,
    goNext,
    goPrev,
    goNextSlide,
    goPrevSlide,
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
