import { motion } from 'framer-motion'
import { ScrollSection } from '../ScrollSection'
import { ResearchCitation } from '../ResearchCitation'
import { productStrategy } from '../../data/productStrategy'
import { narrative } from '../../data/narrative'

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function ProductStrategySection() {
  const story = narrative?.productStrategy
  const headline = story?.headline || productStrategy.title
  const soWhat = story?.soWhat || productStrategy.subtitle

  return (
    <ScrollSection id="product-strategy" className="bg-emerald-950 text-white">
      <motion.span
        variants={item}
        className="text-sm font-medium text-emerald-300 uppercase tracking-wider"
      >
        Recommendation
      </motion.span>
      <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mt-2 mb-2">
        {headline}
      </motion.h2>
      <motion.p variants={item} className="text-emerald-200/90 mb-4">
        {soWhat}
      </motion.p>
      <motion.div variants={item} className="mb-8">
        <ResearchCitation compact className="text-emerald-300/80" />
      </motion.div>
      <motion.div variants={item} className="grid md:grid-cols-2 gap-4 mb-8">
        {productStrategy.bundles.map((b, i) => (
          <div
            key={i}
            className="bg-white/10 rounded-lg p-4 border border-white/20"
          >
            <p className="font-semibold text-lg">{b.name}</p>
            <p className="text-sm text-emerald-200/80 mt-1">{b.description}</p>
          </div>
        ))}
      </motion.div>
      <motion.div variants={item} className="bg-white/10 rounded-lg p-6 mb-6 border border-white/20">
        <p className="text-4xl font-bold text-emerald-200">{productStrategy.stat.value}</p>
        <p className="text-emerald-200/90 mt-1">{productStrategy.stat.label}</p>
      </motion.div>
      <ul className="space-y-2">
        {productStrategy.ltvBullets.map((bullet, i) => (
          <motion.li key={i} variants={item} className="flex gap-2 text-emerald-100">
            <span className="text-emerald-400 mt-1">•</span>
            <span>{bullet}</span>
          </motion.li>
        ))}
      </ul>
    </ScrollSection>
  )
}
