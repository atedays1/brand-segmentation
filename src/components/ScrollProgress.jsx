import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const SECTION_IDS = [
  'intro',
  'transition-ourPeople',
  'goal-oriented-planners',
  'practical-minimalists',
  'impact-seekers',
  'set-it-and-forget-it',
  'wellness-optimizers',
  'conflicted-experimenters',
  'transition-theOpportunity',
  'product-strategy',
  'marketplace',
  'transition-howWeWin',
  'competitive',
  'omni-channel',
  'ask',
]

export function ScrollProgress() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0)

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i])
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          setActiveIndex(i)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-12 left-0 right-0 z-40 h-1 bg-slate-200/80">
      <motion.div
        className="h-full bg-emerald-600"
        style={{ width: `${progress}%` }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />
      <nav
        className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-2"
        aria-label="Section progress"
      >
        {SECTION_IDS.map((id, i) => (
          <a
            key={id}
            href={`#${id}`}
            className={`w-2 h-2 rounded-full transition-all ${
              i === activeIndex
                ? 'bg-emerald-600 scale-125'
                : 'bg-slate-400 hover:bg-slate-500'
            }`}
            title={`Section ${i + 1}`}
            aria-current={i === activeIndex ? 'true' : undefined}
          />
        ))}
      </nav>
    </div>
  )
}
