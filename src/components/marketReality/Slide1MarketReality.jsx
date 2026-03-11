import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { marketRealitySlides } from '../../data/marketRealitySlides'
import { marketRealityImages } from '../../data/marketRealityImages'

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function Slide1MarketReality() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, once: true })
  const prefersReducedMotion = useReducedMotion()
  const s1 = marketRealitySlides.slide1
  const heroSrc = marketRealityImages?.slide1?.hero

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
            className="absolute inset-0 w-full h-full object-cover opacity-40"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-slate-900/70" aria-hidden />
        </>
      )}
      <motion.div
        className="max-w-3xl mx-auto w-full relative z-10"
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={prefersReducedMotion || isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.h1
          variants={item}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
        >
          {s1.title}
        </motion.h1>
        <motion.p variants={item} className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
          {s1.story}
        </motion.p>
        <motion.div variants={item} className="mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-3">
            {s1.friction.label}
          </h2>
          <ul className="space-y-2 text-slate-300">
            {s1.friction.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={item}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-3">
            {s1.solution.label}
          </h2>
          <p className="text-lg text-slate-200 leading-relaxed">{s1.solution.body}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
