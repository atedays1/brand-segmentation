import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { marketRealitySlides } from '../../data/marketRealitySlides'

const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export function Slide4NewOption() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, once: true })
  const prefersReducedMotion = useReducedMotion()
  const s4 = marketRealitySlides.slide4

  return (
    <div
      ref={ref}
      className="min-h-screen w-full flex flex-col justify-center px-6 py-20 md:px-12 md:py-24 bg-slate-900 text-white"
    >
      <motion.div
        className="max-w-4xl mx-auto w-full"
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={prefersReducedMotion || isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-6">
          {s4.title}
        </motion.h2>
        <motion.p variants={item} className="text-lg text-slate-300 mb-10 leading-relaxed">
          {s4.intro}
        </motion.p>
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            variants={item}
            className="bg-white/10 rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-lg font-semibold text-emerald-300 mb-3">{s4.gruns.label}</h3>
            <p className="text-slate-200 leading-relaxed">{s4.gruns.body}</p>
          </motion.div>
          <motion.div
            variants={item}
            className="bg-white/10 rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-lg font-semibold text-emerald-300 mb-3">{s4.thorne.label}</h3>
            <p className="text-slate-200 leading-relaxed">{s4.thorne.body}</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
