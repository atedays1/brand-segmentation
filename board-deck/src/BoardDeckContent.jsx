import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Target,
  Compass,
  BarChart3,
  BriefcaseBusiness,
  Zap,
  Sparkles,
  Scale,
  ShieldPlus,
  MoonStar,
  BrainCircuit,
  Dumbbell,
  Frown,
  Infinity,
  Users,
  PersonStanding,
  Goal,
  FileQuestion,
  XOctagon,
  Layout,
  ListChecks,
  Layers,
  Search,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react'
import { useBoardDeck } from './context/BoardDeckContext'
import { boardDeckSlides } from './data/boardDeckSlides'
import { BackgroundDecor } from './components/BackgroundDecor'

const EMERALD_ACCENT = '#10b981'

const HEADER_ICONS = {
  Target,
  Compass,
  Users,
  PersonStanding,
  Goal,
  Layout,
  ListChecks,
  Layers,
  Search,
  ShieldCheck,
  HelpCircle,
}

const HIGHLIGHT_ICONS = {
  BarChart3,
  BriefcaseBusiness,
}

const BULLET_ICONS = {
  Zap,
  Sparkles,
  Scale,
  ShieldPlus,
  MoonStar,
  BrainCircuit,
  Dumbbell,
  Frown,
  Infinity,
}

const EMPTY_SLIDE_ICONS = {
  FileQuestion,
  XOctagon,
}

export function BoardDeckContent() {
  const { currentSlideIndex, goNext, goPrev, canGoNext, canGoPrev, totalSlides } = useBoardDeck()
  const slide = boardDeckSlides[currentSlideIndex]
  const parallaxRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!slide) return null

  return (
    <div className="fixed inset-0 pt-6 pb-20 flex flex-col bg-slate-950 overflow-hidden">
      <BackgroundDecor />

      <motion.div
        ref={parallaxRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={false}
        animate={{
          x: currentSlideIndex * 12,
          opacity: 0.25 + (currentSlideIndex % 3) * 0.03,
        }}
        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
      >
        <div
          className="absolute -top-1/2 -right-1/4 w-[80vw] h-[80vw] rounded-full bg-slate-600/10 blur-3xl"
          aria-hidden
        />
      </motion.div>

      <div className="relative flex-1 flex flex-col justify-center items-center w-full px-6 md:px-12 lg:px-16 backdrop-blur-3xl min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="outline-none max-w-5xl w-full text-left"
          >
            {(slide.title || slide.headerIcon) ? (
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 flex items-center gap-3"
                initial={{ opacity: 0, x: -28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {slide.headerIcon && HEADER_ICONS[slide.headerIcon] && (() => {
                  const IconComponent = HEADER_ICONS[slide.headerIcon]
                  const iconProps = { size: 36, strokeWidth: 1.5, style: { color: EMERALD_ACCENT }, className: 'flex-shrink-0 md:w-10 md:h-10 w-9 h-9' }
                  return (slide.headerIcon === 'Target' || slide.headerIcon === 'Compass') ? (
                    <motion.span
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      className="flex-shrink-0"
                    >
                      <IconComponent {...iconProps} />
                    </motion.span>
                  ) : (
                    <span className="flex-shrink-0">
                      <IconComponent {...iconProps} />
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
            ) : null}
            {slide.highlight && (
              <motion.p
                className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2"
                animate={slide.id === 3 ? { scale: [1, 1.02, 1] } : undefined}
                transition={slide.id === 3 ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : undefined}
              >
                {slide.highlightIcon && HIGHLIGHT_ICONS[slide.highlightIcon] && (() => {
                  const IconComponent = HIGHLIGHT_ICONS[slide.highlightIcon]
                  return <IconComponent size={28} strokeWidth={2} style={{ color: EMERALD_ACCENT }} className="flex-shrink-0" />
                })()}
                <span style={{ color: EMERALD_ACCENT }}>{slide.highlight}</span>
              </motion.p>
            )}
            {slide.subtitle && (
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-6 leading-relaxed">
                {slide.subtitle}
              </p>
            )}
            {slide.quote && (
              <blockquote className="text-lg md:text-xl text-slate-300 italic border-l-4 border-emerald-500/60 pl-6 my-6 max-w-3xl">
                {slide.quote}
              </blockquote>
            )}
            {slide.bullets && slide.bullets.length > 0 && (
              <ul className="space-y-2 md:space-y-3 mt-4">
                {slide.bullets.map((item, i) => {
                  const text = typeof item === 'string' ? item : item.text
                  const bold = typeof item === 'object' && item?.bold
                  const iconName = typeof item === 'object' && item?.icon
                  const IconComponent = iconName ? BULLET_ICONS[iconName] : null
                  return (
                    <motion.li
                      key={i}
                      className="flex gap-3 text-slate-300 text-base md:text-lg"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <span className="flex-shrink-0 flex items-center justify-center w-7">
                        {IconComponent ? (
                          <IconComponent size={22} strokeWidth={1.75} style={{ color: EMERALD_ACCENT }} />
                        ) : (
                          <span style={{ color: EMERALD_ACCENT }}>●</span>
                        )}
                      </span>
                      <span className={bold ? 'font-bold text-white' : ''}>{text}</span>
                    </motion.li>
                  )
                })}
              </ul>
            )}
            {slide.personas && slide.personas.length > 0 && (
              <div className={`grid gap-8 mt-8 ${slide.personas.length === 1 ? 'max-w-2xl mx-auto' : 'md:grid-cols-2'}`}>
                {slide.personas.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="rounded-xl bg-slate-800/60 border border-slate-700/50 overflow-hidden"
                  >
                    {p.image && (
                      <div className="w-full aspect-[4/3] bg-slate-700/50 overflow-hidden">
                        <img
                          src={p.image}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-lg md:text-xl font-bold text-white leading-snug">{p.headline}</h3>
                      <p className="text-emerald-400 text-sm font-medium mt-2">{p.name}</p>
                      <p className="text-slate-400 text-sm mt-0.5">{p.role}</p>
                      <p className="text-slate-500 text-xs mt-1">{p.segment}</p>
                      <p className="text-slate-300 text-sm mt-3"><strong className="text-slate-200">Mindset:</strong> {p.mindset}</p>
                      <p className="text-slate-300 text-sm mt-2"><strong className="text-slate-200">Approach:</strong> {p.approach}</p>
                      <p className="text-slate-300 text-sm mt-2"><strong className="text-slate-200">Barrier:</strong> {p.barrier}</p>
                      <p className="text-emerald-400 text-sm mt-3 font-medium">Winning: {p.winning}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            {slide.emptySlideIcon && EMPTY_SLIDE_ICONS[slide.emptySlideIcon] && (() => {
              const IconComponent = EMPTY_SLIDE_ICONS[slide.emptySlideIcon]
              return (
                <div className="flex justify-center items-center py-16 my-8" aria-hidden>
                  <IconComponent size={140} strokeWidth={1.25} className="text-slate-500/50" />
                </div>
              )
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex items-center justify-between px-6 py-4 border-t border-slate-800/80 bg-slate-900/50">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:pointer-events-none text-white text-sm font-medium transition-colors"
          aria-label="Previous slide"
        >
          <span aria-hidden>←</span> Prev
        </button>
        <span className="text-slate-400 text-sm font-medium">
          {currentSlideIndex + 1} / {totalSlides}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:pointer-events-none text-white text-sm font-medium transition-colors"
          aria-label="Next slide"
        >
          Next <span aria-hidden>→</span>
        </button>
      </div>
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-slate-500 text-xs">
        Use ← → arrow keys to advance
      </p>
    </div>
  )
}
