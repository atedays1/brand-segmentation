/**
 * Chart data for Consumer Illumination deck — sourced from SBK report (May 2026).
 */

export const fnSegmentDonut = [
  { name: 'Goal-Oriented Planners', value: 21, target: false },
  { name: 'Keep it Simple', value: 20, target: false },
  { name: 'Social Signalers', value: 19, target: false },
  { name: 'Autopilots', value: 16, target: false },
  { name: 'Wellness Architects', value: 13, target: true },
  { name: 'Overwhelmed Experimenters', value: 11, target: true },
]

export const spendByCategory = [
  { category: 'Supplements', wa: 81.6, oe: 57.2 },
  { category: 'Functional foods', wa: 103.8, oe: 81.7 },
  { category: 'Functional beverages', wa: 73.9, oe: 65.8 },
]

/** Heat: high=3, medium=2, low=1 */
export function heatToScore(heat) {
  if (heat === 'high') return 3
  if (heat === 'medium') return 2
  return 1
}

export const jtbdHeatChart = [
  { job: 'Overall health', wa: 3, oe: 3 },
  { job: 'Nutritional gaps', wa: 3, oe: 3 },
  { job: 'Performance', wa: 3, oe: 2 },
  { job: 'Look & feel better', wa: 2, oe: 3 },
  { job: 'Health condition', wa: 2, oe: 2 },
  { job: 'Sleep support', wa: 3, oe: 3 },
  { job: 'Stress / anxiety', wa: 2, oe: 3 },
]

export const vennRegions = {
  overlap: [
    'High FN engagement',
    'Experiment & evaluate',
    'Sleep as foundation',
    'Clean · felt impact · science',
    'Research → risk management',
  ],
  wellnessArchitects: [
    'Identity-driven optimization',
    'Designed system · discipline',
    'Fewer barriers',
    '“I am better”',
    'Performance & stack tuning',
  ],
  overwhelmedExperimenters: [
    'Bandwidth constraint',
    'Routine gaps & outages',
    'Stress & overwhelm',
    '“I feel better”',
    'Ritual & treat-like formats',
  ],
}

export const tierPyramid = [
  {
    tier: 'Tier 3 · Performance systems',
    audience: 'Wellness Architects',
    detail: 'Advanced, stackable modules — morning energy, recovery, performance',
    width: '55%',
    accent: 'emerald',
  },
  {
    tier: 'Tier 2 · Bridge',
    audience: 'Both segments',
    detail: 'Modular products that scale into routines',
    width: '72%',
    accent: 'sky',
  },
  {
    tier: 'Tier 1 · Daily essentials',
    audience: 'Overwhelmed Experimenters',
    detail: 'Simple, low-risk daily staples',
    width: '100%',
    accent: 'amber',
  },
]
