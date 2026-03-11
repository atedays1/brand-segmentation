import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { marketRealitySlides } from '../../data/marketRealitySlides'
import { marketRealityImages } from '../../data/marketRealityImages'
import { personaImages } from '../../data/personaImages'
import { useMarketReality } from '../../context/MarketRealityContext'
import { RevealBlock } from './RevealBlock'

const fallbackItem = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
const cardVariants = { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0 } }
const cardVariantsRight = { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } }

function PersonaCard({ persona, imageSrc, variants, delay = 0 }) {
  return (
    <motion.div
      variants={variants}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-xl"
    >
      <div className="p-6 md:p-8">
        {imageSrc && (
          <div className="mb-6 -mx-6 -mt-6 md:-mx-8 md:-mt-8">
            <img
              src={imageSrc}
              alt={`${persona.name}, ${persona.role}`}
              className="w-full h-48 md:h-56 object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
        )}
        {!imageSrc && (
          <div className="w-full h-32 bg-slate-100 rounded-lg mb-6 flex items-center justify-center text-slate-400 text-sm">
            Photo placeholder
          </div>
        )}
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">
          {persona.segment} ({persona.segmentPctLabel})
        </p>
        <h3 className="text-xl font-bold text-slate-900">
          {persona.name}, {persona.age} — {persona.role}
        </h3>
        <p className="text-slate-500 text-sm mt-1">{persona.household}</p>
        <div className="mt-6 space-y-4 text-slate-700 text-sm leading-relaxed">
          <div>
            <p className="font-semibold text-slate-800 mb-1">Mindset</p>
            <p>{persona.mindset}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-1">The Approach</p>
            <p>{persona.approach}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-1">The Barrier</p>
            <p>{persona.barrier}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-1">
              Winning the {persona.segment.replace('The ', '')} ({persona.name})
            </p>
            <p>{persona.winning}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Slide2OurPeople() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.15, once: true })
  const prefersReducedMotion = useReducedMotion()
  const ctx = useMarketReality()
  const s2 = marketRealitySlides.slide2
  const heroSrc = marketRealityImages?.slide2?.hero

  const isActive = ctx?.currentSlide === 1
  const visibleUpToStep = isActive ? ctx.revealStep : 3
  const useReveal = isActive && ctx != null

  return (
    <div
      ref={ref}
      className="min-h-screen w-full flex flex-col justify-center px-6 py-20 md:px-12 md:py-24 bg-slate-100 relative overflow-hidden"
    >
      {heroSrc && (
        <>
          <img
            src={heroSrc}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-slate-100/80" aria-hidden />
        </>
      )}
      <div className="max-w-6xl mx-auto w-full relative z-10">
        {useReveal ? (
          <>
            <RevealBlock stepIndex={0} visibleUpToStep={visibleUpToStep}>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{s2.title}</h2>
            </RevealBlock>
            <RevealBlock stepIndex={1} visibleUpToStep={visibleUpToStep}>
              <p className="text-lg text-slate-600 mb-10 max-w-2xl">{s2.intro}</p>
            </RevealBlock>
            <RevealBlock stepIndex={2} visibleUpToStep={visibleUpToStep}>
              <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                >
                  <PersonaCard
                    persona={s2.mike}
                    imageSrc={personaImages['practical-minimalists']}
                    variants={cardVariants}
                    delay={0}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.1 }}
                >
                  <PersonaCard
                    persona={s2.maria}
                    imageSrc={personaImages['wellness-optimizers']}
                    variants={cardVariantsRight}
                    delay={0}
                  />
                </motion.div>
              </div>
            </RevealBlock>
          </>
        ) : (
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate={prefersReducedMotion || isInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.h2 variants={fallbackItem} className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              {s2.title}
            </motion.h2>
            <motion.p variants={fallbackItem} className="text-lg text-slate-600 mb-10 max-w-2xl">
              {s2.intro}
            </motion.p>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
              <PersonaCard
                persona={s2.mike}
                imageSrc={personaImages['practical-minimalists']}
                variants={cardVariants}
                delay={0.1}
              />
              <PersonaCard
                persona={s2.maria}
                imageSrc={personaImages['wellness-optimizers']}
                variants={cardVariantsRight}
                delay={0.2}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
