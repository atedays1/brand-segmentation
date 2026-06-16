import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import { spendByCategory } from '../../../data/illuminationChartData'
import { IlluminationChartCard } from './IlluminationChartCard'

const WA_COLOR = '#10b981'
const OE_COLOR = '#f59e0b'

export function IlluminationSpendBars() {
  return (
    <IlluminationChartCard title="Avg monthly spend by category" subtitle="Wellness Architects vs Overwhelmed Experimenters ($)">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={spendByCategory} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#94a3b8' }} />
          <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(v) => `$${v}`} />
          <Tooltip
            formatter={(v) => [`$${v}`, '']}
            contentStyle={{
              backgroundColor: 'rgba(15,23,42,0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 11 }}
            formatter={(value) => (
              <span className="text-slate-300">{value === 'wa' ? 'Wellness Architects' : 'Overwhelmed Experimenters'}</span>
            )}
          />
          <Bar dataKey="wa" name="wa" fill={WA_COLOR} radius={[4, 4, 0, 0]} />
          <Bar dataKey="oe" name="oe" fill={OE_COLOR} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </IlluminationChartCard>
  )
}
