/**
 * Data for Recharts: segment distribution, top goals, purchase channels.
 * Can be augmented by analysis-output.json via scripts/merge-analysis.mjs.
 */
import { segments } from './segments.js'
import { omniChannel } from './omniChannel.js'

function parseShare(s) {
  if (typeof s === 'number') return s
  const m = String(s).match(/(\d+)/)
  return m ? parseInt(m[1], 10) : 0
}

export const segmentPieData = segments.map((s) => ({
  name: s.name,
  value: parseShare(s.share),
}))

export const channelBarData = [
  { name: 'Mass merchandisers', pct: 59, fill: '#059669' },
  { name: 'Online retailers', pct: 51, fill: '#0d9488' },
  { name: 'Drug store', pct: 43, fill: '#0f766e' },
  { name: 'Traditional grocery', pct: 32, fill: '#115e59' },
  { name: 'Club store', pct: 31, fill: '#134e4a' },
]

export const topGoalsData = [
  { goal: 'Improving overall/general health', pct: 69 },
  { goal: 'Healthy aging/longevity', pct: 60 },
  { goal: 'Improving overall fitness', pct: 58 },
  { goal: 'Reducing stress/anxiety', pct: 56 },
  { goal: 'Managing weight', pct: 54 },
  { goal: 'Improving physical energy', pct: 54 },
  { goal: 'Improving sleep', pct: 52 },
  { goal: 'Improving mental health', pct: 48 },
  { goal: 'Building muscle/strength', pct: 47 },
  { goal: 'Improving mood/emotional well-being', pct: 43 },
]
