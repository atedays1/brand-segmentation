import { useRef } from 'react'
import { motion } from 'framer-motion'
import { marketRealitySlides } from '../../data/marketRealitySlides'
import { marketRealityImages } from '../../data/marketRealityImages'
import grunsThorneFlows from '../../data/grunsThorneFlows.json'
import { useMarketReality } from '../../context/MarketRealityContext'
import { RevealBlock } from './RevealBlock'

export function Slide4NewOption({ positionIndex = 3 }) {
  const ref = useRef(null)
  const ctx = useMarketReality()
  const s4 = marketRealitySlides.slide4
  const heroSrc = marketRealityImages?.slide4?.hero
  const grunsFlowSrc = marketRealityImages?.slide4?.grunsFlow
  const thorneFlowSrc = marketRealityImages?.slide4?.thorneFlow
  const flows = grunsThorneFlows || {}

  const unlocked = ctx && ctx.contentUnlocked
  const isActive = ctx?.currentSlide === positionIndex
  const visibleUpToStep = unlocked ? (isActive ? ctx.revealStep : 0) : 0

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
      {!unlocked ? null : (
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <RevealBlock stepIndex={0} visibleUpToStep={visibleUpToStep}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{s4.title}</h2>
          </RevealBlock>
          <RevealBlock stepIndex={1} visibleUpToStep={visibleUpToStep}>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">{s4.intro}</p>
          </RevealBlock>
          <RevealBlock stepIndex={2} visibleUpToStep={visibleUpToStep}>
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                className="flex flex-col"
              >
                {flows.gruns?.headline && (
                  <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                    {flows.gruns.headline}
                  </h3>
                )}
                {grunsFlowSrc && (
                  <div className="rounded-xl overflow-hidden border border-white/20 bg-white/5">
                    <img
                      src={grunsFlowSrc}
                      alt={flows.gruns?.caption || 'Grüns consumer flow'}
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
                {flows.gruns?.caption && (
                  <p className="text-sm text-slate-400 mt-2">{flows.gruns.caption}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24, delay: 0.08 }}
                className="flex flex-col"
              >
                {flows.thorne?.headline && (
                  <h3 className="text-lg font-semibold text-emerald-300 mb-2">
                    {flows.thorne.headline}
                  </h3>
                )}
                {thorneFlowSrc && (
                  <div className="rounded-xl overflow-hidden border border-white/20 bg-white/5">
                    <img
                      src={thorneFlowSrc}
                      alt={flows.thorne?.caption || 'Thorne consumer flow'}
                      className="w-full h-auto object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}
                {flows.thorne?.caption && (
                  <p className="text-sm text-slate-400 mt-2">{flows.thorne.caption}</p>
                )}
              </motion.div>
            </div>
          </RevealBlock>
          <RevealBlock stepIndex={3} visibleUpToStep={visibleUpToStep}>
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
        </div>
      )}
    </div>
  )
}
