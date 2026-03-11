import { motion, useReducedMotion } from 'framer-motion'

/** Keynote-style block that pops in when step >= stepIndex. Use inside step-driven slides. */
const popIn = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 24 },
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
    <motion.div initial="hidden" animate="visible" variants={popIn} className={className}>
      {children}
    </motion.div>
  )
}
