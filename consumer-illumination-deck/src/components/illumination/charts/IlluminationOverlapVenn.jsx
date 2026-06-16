import { vennRegions } from '../../../data/illuminationChartData'
import { IlluminationChartCard } from './IlluminationChartCard'

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

  return (
    <IlluminationChartCard title="Shared ground vs segment fork" subtitle="Overlap justifies one platform; lobes justify forked messaging">
      <div className="relative w-full max-w-2xl mx-auto" style={{ minHeight: 280 }}>
        <svg viewBox="0 0 520 280" className="w-full h-auto" aria-label="Venn diagram of segment overlap">
          <circle cx="175" cy="140" r="115" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.45)" strokeWidth="2" />
          <circle cx="345" cy="140" r="115" fill="rgba(245,158,11,0.12)" stroke="rgba(245,158,11,0.45)" strokeWidth="2" />
          <circle cx="260" cy="140" r="55" fill="rgba(99,102,241,0.2)" stroke="rgba(129,140,248,0.5)" strokeWidth="1.5" />
          <text x="175" y="28" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="700">
            Wellness Architects
          </text>
          <text x="345" y="28" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="700">
            Overwhelmed Experimenters
          </text>
          <text x="260" y="138" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="700">
            SHARED
          </text>
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-2.5">
            <p className="text-[10px] font-bold uppercase text-emerald-400/90 mb-1.5">WA only</p>
            <RegionList items={wellnessArchitects} className="text-emerald-100/80" />
          </div>
          <div className="rounded-lg border border-indigo-500/25 bg-indigo-500/10 p-2.5">
            <p className="text-[10px] font-bold uppercase text-indigo-300/90 mb-1.5">Overlap</p>
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
