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

export function IlluminationOverlapVenn() {
  const { overlap, wellnessArchitects, overwhelmedExperimenters } = vennRegions
  const sharedCx = (LEFT_CX + RIGHT_CX) / 2

  return (
    <IlluminationChartCard title="Shared ground vs segment fork" subtitle="Overlap justifies one platform; lobes justify forked messaging">
      <div className="relative w-full max-w-2xl mx-auto" style={{ minHeight: 300 }}>
        <svg viewBox="0 0 520 300" className="w-full h-auto" aria-label="Venn diagram of segment overlap">
          <defs>
            <clipPath id="venn-left-lobe">
              <circle cx={LEFT_CX} cy={CY} r={R} />
            </clipPath>
          </defs>

          <circle cx={LEFT_CX} cy={CY} r={R} fill="rgba(16,185,129,0.14)" stroke="rgba(16,185,129,0.5)" strokeWidth="2" />
          <circle cx={RIGHT_CX} cy={CY} r={R} fill="rgba(245,158,11,0.14)" stroke="rgba(245,158,11,0.5)" strokeWidth="2" />

          {/* Intersection: clip right circle to left circle for a true overlap lens */}
          <circle
            cx={RIGHT_CX}
            cy={CY}
            r={R}
            fill="rgba(99,102,241,0.32)"
            stroke="rgba(129,140,248,0.55)"
            strokeWidth="1.5"
            clipPath="url(#venn-left-lobe)"
          />

          <text x={LEFT_CX} y={32} textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="700">
            Wellness Architects
          </text>
          <text x={RIGHT_CX} y={32} textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="700">
            Overwhelmed Experimenters
          </text>
          <text x={sharedCx} y={CY + 4} textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="700">
            SHARED
          </text>
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-2.5">
            <p className="text-[10px] font-bold uppercase text-emerald-400/90 mb-1.5">WA only</p>
            <RegionList items={wellnessArchitects} className="text-emerald-100/80" />
          </div>
          <div className="rounded-lg border border-indigo-500/25 bg-indigo-500/10 p-2.5 md:col-span-1">
            <p className="text-[10px] font-bold uppercase text-indigo-300/90 mb-1.5">
              Overlap <span className="font-normal normal-case text-indigo-400/70">({overlap.length} shared traits)</span>
            </p>
            <RegionList items={overlap} className="text-indigo-100/80" />
          </div>
          <div className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-2.5">
            <p className="text-[10px] font-bold uppercase text-amber-400/90 mb-1.5">OE only</p>
            <RegionList items={overwhelmedExperimenters} className="text-amber-100/80" />
          </div>
        </div>
      </div>
    </IlluminationChartCard>
  )
}
