import { motion } from 'framer-motion'
import { ScrollSection } from '../ScrollSection'
import { ChartChannels } from '../charts/ChartChannels'
import { omniChannel } from '../../data/omniChannel'
import { narrative } from '../../data/narrative'

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function OmniChannelSection() {
  const story = narrative?.omniChannel
  const headline = story?.headline || omniChannel.title
  const soWhat = story?.soWhat || omniChannel.subtitle

  return (
    <ScrollSection id="omni-channel" className="bg-slate-100 border-t border-slate-200">
      <motion.span
        variants={item}
        className="text-sm font-medium text-slate-500 uppercase tracking-wider"
      >
        Channel strategy
      </motion.span>
      <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-2">
        {headline}
      </motion.h2>
      <motion.p variants={item} className="text-slate-600 mb-8">
        {soWhat}
      </motion.p>
      <motion.div variants={item} className="grid md:grid-cols-2 gap-6 mb-6">
        {omniChannel.channels.map((ch, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
          >
            <p className="text-4xl font-bold text-emerald-600">{ch.pct}%</p>
            <p className="font-semibold text-slate-800 mt-1">{ch.name}</p>
            <p className="text-sm text-slate-500 mt-1">{ch.examples}</p>
          </div>
        ))}
      </motion.div>
      <ChartChannels />
      <motion.p variants={item} className="text-slate-600 text-sm mt-6">
        {omniChannel.note}
      </motion.p>
    </ScrollSection>
  )
}
