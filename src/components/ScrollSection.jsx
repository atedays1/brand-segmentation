import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export function ScrollSection({
  id,
  className = '',
  children,
  as: Component = 'section',
  staggerChildren = true,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, once: true })
  const prefersReducedMotion = useReducedMotion()

  return (
    <Component
      id={id}
      ref={ref}
      className={`min-h-screen w-full flex flex-col justify-center px-6 py-16 md:px-12 md:py-24 ${className}`}
    >
      <motion.div
        className="max-w-4xl mx-auto w-full"
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={prefersReducedMotion || isInView ? 'visible' : 'hidden'}
        variants={staggerChildren ? { visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } } } : {}}
      >
        {children}
      </motion.div>
    </Component>
  )
}

export function AnimatedBlock({ children, variants = defaultVariants, className = '' }) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
