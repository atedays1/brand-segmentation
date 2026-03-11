import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { marketRealitySlides } from '../../data/marketRealitySlides'
import { marketRealityImages } from '../../data/marketRealityImages'
import { useMarketReality } from '../../context/MarketRealityContext'
import { RevealBlock } from './RevealBlock'

const fallbackItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export function Slide4NewOption() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, once: true })
  const prefersReducedMotion = useReducedMotion()
  const ctx = useMarketReality()
  const s4 = marketRealitySlides.slide4
  const heroSrc = marketRealityImages?.slide4?.hero

  const isActive = ctx?.currentSlide === 3
  const visibleUpToStep = (ctx != null) ? (isActive ? ctx.revealStep : 0) : 3
  const useReveal = ctx != null

  return (
    <div
      ref={ref}
      className="min-h-screen w-full flex flex-col justify-center px-6 py-20 md:px-12 md:py-24 bg-slate-900 text-white relative overflow-hidden"
    >
      {heroSrc && (
        <>
          <img
            src={heroSrc}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 scale-75"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-slate-900/75" aria-hidden />
        </>
      )}
      <div className="max-w-4xl mx-auto w-full relative z-10">
        {useReveal ? (
          <>
            <RevealBlock stepIndex={0} visibleUpToStep={visibleUpToStep}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">{s4.title}</h2>
            </RevealBlock>
            <RevealBlock stepIndex={1} visibleUpToStep={visibleUpToStep}>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed">{s4.intro}</p>
            </RevealBlock>
            <RevealBlock stepIndex={2} visibleUpToStep={visibleUpToStep}>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className="bg-white/10 rounded-xl p-6 border border-white/20"
                >
                  <h3 className="text-lg font-semibold text-emerald-300 mb-3">{s4.gruns.label}</h3>
                  <p className="text-slate-200 leading-relaxed">{s4.gruns.body}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.08 }}
                  className="bg-white/10 rounded-xl p-6 border border-white/20"
                >
                  <h3 className="text-lg font-semibold text-emerald-300 mb-3">{s4.thorne.label}</h3>
                  <p className="text-slate-200 leading-relaxed">{s4.thorne.body}</p>
                </motion.div>
              </div>
            </RevealBlock>
          </>
        ) : (
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate={prefersReducedMotion || isInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.h2 variants={fallbackItem} className="text-3xl md:text-4xl font-bold mb-6">
              {s4.title}
            </motion.h2>
            <motion.p variants={fallbackItem} className="text-lg text-slate-300 mb-10 leading-relaxed">
              {s4.intro}
            </motion.p>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div variants={fallbackItem} className="bg-white/10 rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-emerald-300 mb-3">{s4.gruns.label}</h3>
                <p className="text-slate-200 leading-relaxed">{s4.gruns.body}</p>
              </motion.div>
              <motion.div variants={fallbackItem} className="bg-white/10 rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-semibold text-emerald-300 mb-3">{s4.thorne.label}</h3>
                <p className="text-slate-200 leading-relaxed">{s4.thorne.body}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
