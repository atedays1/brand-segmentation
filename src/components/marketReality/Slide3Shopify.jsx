import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { marketRealitySlides } from '../../data/marketRealitySlides'

const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }

export function Slide3Shopify() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, once: true })
  const prefersReducedMotion = useReducedMotion()
  const s3 = marketRealitySlides.slide3

  return (
    <div
      ref={ref}
      className="min-h-screen w-full flex flex-col justify-center px-6 py-20 md:px-12 md:py-24 bg-white"
    >
      <motion.div
        className="max-w-3xl mx-auto w-full"
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={prefersReducedMotion || isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          {s3.title}
        </motion.h2>
        {s3.note && (
          <motion.p variants={item} className="text-sm text-slate-500 italic mb-8">
            {s3.note}
          </motion.p>
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
