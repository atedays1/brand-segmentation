import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Slide1MarketReality } from '../components/marketReality/Slide1MarketReality'
import { Slide2OurPeople } from '../components/marketReality/Slide2OurPeople'
import { Slide3Shopify } from '../components/marketReality/Slide3Shopify'
import { Slide4NewOption } from '../components/marketReality/Slide4NewOption'

export function MarketRealityPage() {
  const containerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const slide1Opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35],
    [1, 1, prefersReducedMotion ? 1 : 0.3]
  )
  const slide2Opacity = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.5, 0.65],
    [prefersReducedMotion ? 1 : 0.3, 1, 1, prefersReducedMotion ? 1 : 0.3]
  )
  const slide3Opacity = useTransform(
    scrollYProgress,
    [0.5, 0.65, 0.75, 0.85],
    [prefersReducedMotion ? 1 : 0.3, 1, 1, prefersReducedMotion ? 1 : 0.3]
  )
  const slide4Opacity = useTransform(
    scrollYProgress,
    [0.75, 0.9, 1],
    [prefersReducedMotion ? 1 : 0.3, 1, 1]
  )

  return (
    <div ref={containerRef} className="pt-14 font-sans">
      <motion.section
        style={prefersReducedMotion ? undefined : { opacity: slide1Opacity }}
        className="min-h-screen w-full flex flex-col justify-center"
        id="market-reality-slide-1"
      >
        <Slide1MarketReality />
      </motion.section>
      <motion.section
        style={prefersReducedMotion ? undefined : { opacity: slide2Opacity }}
        className="min-h-screen w-full flex flex-col justify-center"
        id="market-reality-slide-2"
      >
        <Slide2OurPeople />
      </motion.section>
      <motion.section
        style={prefersReducedMotion ? undefined : { opacity: slide3Opacity }}
        className="min-h-screen w-full flex flex-col justify-center"
        id="market-reality-slide-3"
      >
        <Slide3Shopify />
      </motion.section>
      <motion.section
        style={prefersReducedMotion ? undefined : { opacity: slide4Opacity }}
        className="min-h-screen w-full flex flex-col justify-center"
        id="market-reality-slide-4"
      >
        <Slide4NewOption />
      </motion.section>
    </div>
  )
}
