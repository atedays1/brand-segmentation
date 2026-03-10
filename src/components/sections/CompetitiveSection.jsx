import { motion } from 'framer-motion'
import { ScrollSection } from '../ScrollSection'
import { competitive, competitiveCitations } from '../../data/competitive'
import { narrative } from '../../data/narrative'

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function CompetitiveSection() {
  const story = narrative?.competitive
  const headline = story?.headline || competitive.title
  const soWhat = story?.soWhat || competitive.subtitle

  return (
    <ScrollSection id="competitive" className="bg-slate-900 text-white">
      <motion.span
        variants={item}
        className="text-sm font-medium text-slate-400 uppercase tracking-wider"
      >
        How others win
      </motion.span>
      <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mt-2 mb-4">
        {headline}
      </motion.h2>
      <motion.p variants={item} className="text-slate-300 mb-8 max-w-2xl">
        {soWhat}
      </motion.p>
      <motion.div variants={item} className="grid md:grid-cols-2 gap-6 mb-8">
        {competitive.brands.map((brand, i) => (
          <div
            key={i}
            className="bg-white/10 rounded-xl p-6 border border-white/20"
          >
            <h3 className="text-xl font-bold text-white">{brand.name}</h3>
            <p className="text-emerald-300 text-sm font-medium mt-1">
              {brand.tagline}
            </p>
            <ul className="mt-4 space-y-2 text-slate-300 text-sm">
              {brand.points.map((point, j) => (
                <li key={j} className="flex gap-2">
                  <span className="text-emerald-400">•</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
      <motion.div variants={item} className="pt-4 border-t border-slate-700">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
          Sources
        </p>
        <ul className="space-y-1 text-sm text-slate-400">
          {competitiveCitations.map((c, i) => (
            <li key={i}>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
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
