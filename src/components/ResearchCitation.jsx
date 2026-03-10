import { motion } from 'framer-motion'
import { researchSources, primaryResearchLabel, primarySource } from '../data/researchRefs'

const item = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

/**
 * Compact citation to show the deck is grounded in paid research.
 * @param {Object} props
 * @param {boolean} [props.compact] - If true, show one line (e.g. "From our research: Ate Days Consumer Segmentation Report, March 2026")
 * @param {string} [props.sourceId] - Use specific source from researchSources; default is primary (first)
 * @param {string} [props.className] - Wrapper class (e.g. for light/dark sections)
 */
export function ResearchCitation({ compact = true, sourceId, className = '' }) {
  const source = sourceId
    ? researchSources.find((s) => s.id === sourceId) || primarySource
    : primarySource
  const label = primaryResearchLabel
  const line = `${source.name}${source.detail ? ` (${source.detail})` : ''}, ${source.date}`

  if (compact) {
    return (
      <motion.p
        variants={item}
        className={`text-xs font-medium uppercase tracking-wider opacity-90 ${className}`}
      >
        <span className="font-semibold">{label}:</span>{' '}
        <span>{line}</span>
      </motion.p>
    )
  }

  return (
    <motion.div variants={item} className={`space-y-1 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-90">
        {label}
      </p>
      <p className="text-sm opacity-90">
        {source.name}
        {source.detail && ` — ${source.detail}`} ({source.date})
      </p>
      {source.description && (
        <p className="text-xs opacity-75">{source.description}</p>
      )}
    </motion.div>
  )
}
