import { motion } from 'framer-motion'
import { ScrollSection } from '../ScrollSection'
import { ask } from '../../data/ask'
import { narrative } from '../../data/narrative'

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function AskSection() {
  const story = narrative?.ask
  const headline = story?.headline || ask.title
  const closingLine = story?.closingLine || ask.main
  const followUpLead = story?.followUpLead

  return (
    <ScrollSection id="ask" className="bg-emerald-900 text-white">
      <motion.span
        variants={item}
        className="text-sm font-medium text-emerald-300 uppercase tracking-wider"
      >
        Next step
      </motion.span>
      <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mt-2 mb-6">
        {headline}
      </motion.h2>
      <motion.p variants={item} className="text-xl md:text-2xl text-emerald-100 font-medium mb-4">
        {closingLine}
      </motion.p>
      {followUpLead && (
        <motion.p variants={item} className="text-emerald-200/90 mb-4">
          {followUpLead}
        </motion.p>
      )}
      <ul className="space-y-2">
        {ask.followUp.map((bullet, i) => (
          <motion.li key={i} variants={item} className="flex gap-2 text-emerald-200">
            <span className="text-emerald-400 mt-1">•</span>
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>
    </ScrollSection>
  )
}
