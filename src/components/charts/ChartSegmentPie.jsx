import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { segmentPieData } from '../../data/chartData'

const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }
const COLORS = ['#059669', '#0d9488', '#0f766e', '#14b8a6', '#2dd4bf', '#5eead4']

export function ChartSegmentPie() {
  return (
    <motion.div variants={item} className="w-full max-w-md mx-auto mt-8 p-4 rounded-xl bg-white/10">
      <p className="text-sm font-medium text-slate-400 mb-2">Segment distribution</p>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <Pie
            data={segmentPieData}
            cx="40%"
            cy="50%"
            innerRadius={56}
            outerRadius={88}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
          >
            {segmentPieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => [`${v}%`, 'Share']} contentStyle={{ backgroundColor: 'rgba(15,23,42,0.95)', border: 'none', borderRadius: 8 }} />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ paddingLeft: 12 }}
            formatter={(value, entry) => (
              <span className="text-slate-200 text-sm">
                {value} ({entry.payload.value}%)
              </span>
            )}
            iconType="square"
            iconSize={10}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
