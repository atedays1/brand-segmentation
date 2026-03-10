import { motion } from 'framer-motion'
import { ScrollSection } from '../ScrollSection'
import { ChartGoalsBar } from '../charts/ChartGoalsBar'
import { ResearchCitation } from '../ResearchCitation'
import { marketplace, marketplaceCitations } from '../../data/marketplace'
import { narrative } from '../../data/narrative'

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function MarketplaceSection() {
  const story = narrative?.marketplace
  const headline = story?.headline || marketplace.title
  const soWhat = story?.soWhat || marketplace.subtitle

  return (
    <ScrollSection id="marketplace" className="bg-white border-t border-slate-200">
      <motion.span
        variants={item}
        className="text-sm font-medium text-slate-500 uppercase tracking-wider"
      >
        Context
      </motion.span>
      <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-2">
        {headline}
      </motion.h2>
      <motion.p variants={item} className="text-slate-600 mb-4">
        {soWhat}
      </motion.p>
      <motion.div variants={item} className="mb-6">
        <ResearchCitation compact className="text-slate-500" />
      </motion.div>
      <motion.div variants={item} className="mb-8">
        <h3 className="font-semibold text-slate-800 text-lg mb-2">
          {marketplace.crashing.headline}
        </h3>
        <p className="text-slate-600">{marketplace.crashing.body}</p>
      </motion.div>
      <motion.div variants={item} className="mb-8">
        <h3 className="font-semibold text-slate-800 text-lg mb-2">
          {marketplace.touchpoints.headline}
        </h3>
        <p className="text-slate-600 mb-2">{marketplace.touchpoints.ruleOf8}</p>
        <p className="text-slate-500 text-sm">{marketplace.touchpoints.nuance}</p>
      </motion.div>
      <ChartGoalsBar />
      <motion.div variants={item} className="pt-4 border-t border-slate-200 mt-8">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
          Sources
        </p>
        <ul className="space-y-1 text-sm text-slate-600">
          {(marketplaceCitations || []).map((c, i) => (
            <li key={i}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                {c.title}
              </a>
              {c.source && ` — ${c.source}`}
              {c.date && ` (${c.date})`}
            </li>
          ))}
        </ul>
      </motion.div>
    </ScrollSection>
  )
}
