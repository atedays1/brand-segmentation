import { motion } from 'framer-motion'
import { ScrollSection } from '../ScrollSection'
import { ChartSegmentPie } from '../charts/ChartSegmentPie'
import { ResearchCitation } from '../ResearchCitation'
import { intro } from '../../data/intro'
import { narrative } from '../../data/narrative'

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function IntroSection() {
  const hook = narrative?.intro?.hook || intro.title
  const throughLine = narrative?.intro?.throughLine || intro.subtitle
  const stakes = narrative?.intro?.stakes || intro.objective
  const theme = intro.theme

  return (
    <ScrollSection id="intro" className="bg-slate-900 text-white">
      <motion.h1
        variants={item}
        className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
      >
        {hook}
      </motion.h1>
      <motion.p variants={item} className="text-2xl md:text-3xl text-slate-300 mb-8">
        {throughLine}
      </motion.p>
      <motion.p variants={item} className="text-lg text-slate-400 max-w-2xl mb-6">
        {stakes}
      </motion.p>
      {theme && (
        <motion.p variants={item} className="text-slate-500 italic mb-6">
          {theme}
        </motion.p>
      )}
      <motion.div variants={item} className="mb-8">
        <ResearchCitation compact className="text-slate-500" />
      </motion.div>
      <ChartSegmentPie />
    </ScrollSection>
  )
}
