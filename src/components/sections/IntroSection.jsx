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

  return (
    <ScrollSection id="intro" className="bg-slate-900 text-white pt-24 md:pt-32">
      <motion.h1
        variants={item}
        className="text-4xl md:text-6xl font-bold tracking-tight mb-3"
      >
        {hook}
      </motion.h1>
      <motion.p variants={item} className="text-2xl md:text-3xl text-slate-300 mb-3">
        {throughLine}
      </motion.p>
      <motion.p variants={item} className="text-lg text-slate-400 max-w-2xl mb-5">
        {stakes}
      </motion.p>
      <motion.div variants={item} className="mb-6">
        <ResearchCitation compact className="text-slate-500" />
      </motion.div>
      <ChartSegmentPie />
    </ScrollSection>
  )
}
