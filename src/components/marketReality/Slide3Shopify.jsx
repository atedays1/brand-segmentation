import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { marketRealitySlides } from '../../data/marketRealitySlides'
import { marketRealityImages } from '../../data/marketRealityImages'

const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export function Slide3Shopify() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, once: true })
  const prefersReducedMotion = useReducedMotion()
  const s3 = marketRealitySlides.slide3
  const heroSrc = marketRealityImages?.slide3?.hero
  const stats = s3.stats || []

  return (
    <div
      ref={ref}
      className="min-h-screen w-full flex flex-col justify-center px-6 py-20 md:px-12 md:py-24 bg-white relative overflow-hidden"
    >
      {heroSrc && (
        <>
          <img
            src={heroSrc}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
          <div className="absolute inset-0 bg-white/85" aria-hidden />
        </>
      )}
      <motion.div
        className="max-w-4xl mx-auto w-full relative z-10"
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={prefersReducedMotion || isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          {s3.title}
        </motion.h2>
        {s3.note && (
          <motion.p variants={item} className="text-sm text-slate-500 italic mb-8">
            {s3.note}
          </motion.p>
        )}

        {stats.length > 0 && (
          <motion.div
            variants={item}
            className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-10"
            aria-label="Key statistics"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-slate-900 text-white rounded-xl p-4 md:p-5 text-center border border-slate-700/50 shadow-lg"
              >
                <p className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="text-xs md:text-sm text-slate-300 mt-1 leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        <div className="space-y-8">
          {s3.blocks.map((block, i) => (
            <motion.div key={i} variants={item}>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{block.label}</h3>
              <ul className="space-y-2 text-slate-600">
                {block.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
