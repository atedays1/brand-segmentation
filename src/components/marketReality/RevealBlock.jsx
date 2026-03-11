import { motion, useReducedMotion } from 'framer-motion'

/** Keynote-style block that pops in line-by-line when step >= stepIndex. */
const popIn = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 22,
      mass: 0.8,
    },
  },
}

export function RevealBlock({ stepIndex, visibleUpToStep, children, className = '' }) {
  const prefersReducedMotion = useReducedMotion()
  const show = visibleUpToStep >= stepIndex

  if (prefersReducedMotion) {
    return show ? <div className={className}>{children}</div> : null
  }

  if (!show) return null

  return (
    <motion.div
      key={stepIndex}
      initial="hidden"
      animate="visible"
      variants={popIn}
      transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
