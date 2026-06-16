import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { fnSegmentDonut } from '../../../data/illuminationChartData'
import { IlluminationChartCard } from './IlluminationChartCard'

const TARGET_COLOR = '#10b981'
const OTHER_COLOR = '#334155'
const TARGET_STROKE = '#6ee7b7'

export function IlluminationSegmentDonut() {
  const targetTotal = fnSegmentDonut.filter((s) => s.target).reduce((sum, s) => sum + s.value, 0)

  return (
    <IlluminationChartCard
      title="FN user segments"
      subtitle={`Targets = ${targetTotal}% of functional nutrition users`}
    >
      <ResponsiveContainer width="100%" height={240}>
        <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <Pie
            data={fnSegmentDonut}
            cx="42%"
            cy="50%"
            innerRadius={48}
            outerRadius={78}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            strokeWidth={2}
          >
            {fnSegmentDonut.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.target ? TARGET_COLOR : OTHER_COLOR}
                stroke={entry.target ? TARGET_STROKE : '#475569'}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(v, name) => [`${v}%`, name]}
            contentStyle={{
              backgroundColor: 'rgba(15,23,42,0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ fontSize: 11, paddingLeft: 8 }}
            formatter={(value, entry) => (
              <span className={entry.payload.target ? 'text-emerald-300' : 'text-slate-400'}>
                {value} ({entry.payload.value}%)
              </span>
            )}
            iconType="square"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </IlluminationChartCard>
  )
}
