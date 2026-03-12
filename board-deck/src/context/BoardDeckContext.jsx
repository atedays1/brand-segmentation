import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const TOTAL_SLIDES = 13

const BoardDeckContext = createContext(null)

export function useBoardDeck() {
  return useContext(BoardDeckContext)
}

export function BoardDeckProvider({ children }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const goNext = useCallback(() => {
    setCurrentSlideIndex((i) => Math.min(TOTAL_SLIDES - 1, i + 1))
  }, [])

  const goPrev = useCallback(() => {
    setCurrentSlideIndex((i) => Math.max(0, i - 1))
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCurrentSlideIndex((i) => Math.min(TOTAL_SLIDES - 1, i + 1))
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrentSlideIndex((i) => Math.max(0, i - 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [])

  const value = {
    currentSlideIndex,
    totalSlides: TOTAL_SLIDES,
    goNext,
    goPrev,
    canGoNext: currentSlideIndex < TOTAL_SLIDES - 1,
    canGoPrev: currentSlideIndex > 0,
  }

  return (
    <BoardDeckContext.Provider value={value}>
      {children}
    </BoardDeckContext.Provider>
  )
}
