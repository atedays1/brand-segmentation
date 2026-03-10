import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { topGoalsData } from '../../data/chartData'

const item = { hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }

export function ChartGoalsBar() {
  return (
    <motion.div variants={item} className="w-full mt-6">
      <p className="text-sm font-medium text-slate-500 mb-2">Top health & wellness goals (% of respondents)</p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={topGoalsData}
          layout="vertical"
          margin={{ left: 8, right: 24, top: 8, bottom: 8 }}
        >
          <XAxis type="number" domain={[0, 80]} tickFormatter={(v) => `${v}%`} />
          <YAxis type="category" dataKey="goal" width={140} tick={{ fontSize: 11 }} />
          <Tooltip formatter={(v) => [`${v}%`, 'Pursuing']} />
          <Bar dataKey="pct" fill="#059669" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
