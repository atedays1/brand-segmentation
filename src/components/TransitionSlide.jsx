import { motion } from 'framer-motion'
import { ScrollSection } from './ScrollSection'
import { narrative } from '../data/narrative'

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const transitionCopy = {
  ourPeople: {
    title: 'Our personas',
    subtitle: 'Six faces of our future customer—who they are and how we serve them.',
    className: 'bg-slate-800 text-white',
  },
  theOpportunity: {
    title: 'The opportunity',
    subtitle: 'What we offer them and why the category is moving our way.',
    className: 'bg-emerald-950 text-white',
  },
  howWeWin: {
    title: 'How we win',
    subtitle: 'Where we show up, who we learn from, and how we take share.',
    className: 'bg-slate-900 text-white',
  },
}

const labelKey = { ourPeople: 'ourPeople', theOpportunity: 'theOpportunity', howWeWin: 'howWeWin' }

export function TransitionSlide({ kind }) {
  const copy = transitionCopy[kind]
  const narrativeLabel = narrative?.chapterLabels?.[labelKey[kind]]
  const title = narrativeLabel || copy?.title || kind
  const subtitle = copy?.subtitle
  const className = copy?.className ?? 'bg-slate-800 text-white'

  return (
    <ScrollSection
      id={`transition-${kind}`}
      className={className}
      staggerChildren={false}
    >
      <motion.h2
        variants={item}
        className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={item} className="text-xl md:text-2xl text-white/80 max-w-2xl">
          {subtitle}
        </motion.p>
      )}
    </ScrollSection>
  )
}
