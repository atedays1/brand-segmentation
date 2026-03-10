import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { channelBarData } from '../../data/chartData'

const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }

export function ChartChannels() {
  return (
    <motion.div variants={item} className="w-full max-w-lg mx-auto mt-6">
      <p className="text-sm font-medium text-slate-500 mb-2">Top purchase outlets (% selecting in top 3)</p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={channelBarData} layout="vertical" margin={{ left: 8, right: 24 }}>
          <XAxis type="number" domain={[0, 70]} tickFormatter={(v) => `${v}%`} />
          <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => [`${v}%`, 'Top 3']} />
          <Bar dataKey="pct" fill="#059669" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
