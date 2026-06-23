import { vennRegions } from '../../../data/illuminationChartData'
import { IlluminationChartCard } from './IlluminationChartCard'

const LEFT_CX = 205
const RIGHT_CX = 315
const CY = 148
const R = 118

function RegionList({ items, className }) {
  return (
    <ul className={`space-y-0.5 text-[10px] leading-snug ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-1">
          <span className="opacity-60">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function SegmentLabel({ x, line1, line2, fill }) {
  return (
    <text x={x} y={24} textAnchor="middle" fill={fill} fontSize="11" fontWeight="700">
      <tspan x={x} dy="0">
        {line1}
      </tspan>
      <tspan x={x} dy="13">
        {line2}
      </tspan>
    </text>
  )
}

export function IlluminationOverlapVenn() {
  const { overlap, wellnessArchitects, overwhelmedExperimenters } = vennRegions
  const sharedCx = (LEFT_CX + RIGHT_CX) / 2

  return (
    <IlluminationChartCard
      title="Shared platform at the center"
      subtitle="One brand foundation for both segments; primary and secondary targets differ in lead benefit emphasis"
    >
      <div className="relative w-full max-w-2xl mx-auto" style={{ minHeight: 300 }}>
        <svg viewBox="0 0 520 300" className="w-full h-auto" aria-label="Venn diagram of segment overlap">
          <defs>
            <clipPath id="venn-left-lobe">
              <circle cx={LEFT_CX} cy={CY} r={R} />
            </clipPath>
          </defs>

          <circle cx={LEFT_CX} cy={CY} r={R} fill="rgba(16,185,129,0.14)" stroke="rgba(16,185,129,0.5)" strokeWidth="2" />
          <circle cx={RIGHT_CX} cy={CY} r={R} fill="rgba(245,158,11,0.14)" stroke="rgba(245,158,11,0.5)" strokeWidth="2" />

          <circle
            cx={RIGHT_CX}
            cy={CY}
            r={R}
            fill="rgba(99,102,241,0.32)"
            stroke="rgba(129,140,248,0.55)"
            strokeWidth="1.5"
            clipPath="url(#venn-left-lobe)"
          />

          <SegmentLabel x={LEFT_CX - 52} line1="Wellness" line2="Architects" fill="#6ee7b7" />
          <SegmentLabel x={RIGHT_CX + 52} line1="Overwhelmed" line2="Experimenters" fill="#fcd34d" />
          <text x={sharedCx} y={CY + 4} textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="700">
            SHARED
          </text>
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          <div className="order-2 md:order-1 rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-2.5">
            <p className="text-[10px] font-bold uppercase text-emerald-400/90 mb-0.5">Primary lead · WA</p>
            <p className="text-[9px] text-slate-500 mb-1.5">Performance & system nuance</p>
            <RegionList items={wellnessArchitects} className="text-emerald-100/80" />
          </div>
          <div className="order-1 md:order-2 rounded-lg border border-indigo-400/40 bg-indigo-500/15 p-2.5 ring-1 ring-indigo-400/20">
            <p className="text-[10px] font-bold uppercase text-indigo-200/95 mb-0.5">
              Shared platform
            </p>
            <p className="text-[9px] text-indigo-300/60 mb-1.5">{overlap.length} traits · both segments</p>
            <RegionList items={overlap} className="text-indigo-100/90" />
          </div>
          <div className="order-3 md:order-3 rounded-lg border border-amber-500/25 bg-amber-500/5 p-2.5">
            <p className="text-[10px] font-bold uppercase text-amber-400/90 mb-0.5">Secondary lead · OE</p>
            <p className="text-[9px] text-slate-500 mb-1.5">Ease & ritual nuance</p>
            <RegionList items={overwhelmedExperimenters} className="text-amber-100/80" />
          </div>
        </div>
      </div>
    </IlluminationChartCard>
  )
}
