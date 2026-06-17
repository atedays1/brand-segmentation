import { IlluminationSegmentDonut } from './IlluminationSegmentDonut'
import { IlluminationSpendBars } from './IlluminationSpendBars'
import { IlluminationOverlapVenn } from './IlluminationOverlapVenn'
import { IlluminationDivergenceSpectrum } from './IlluminationDivergenceSpectrum'
import { IlluminationThreePillars } from './IlluminationThreePillars'
import { IlluminationJtbdHeatChart } from './IlluminationJtbdHeatChart'
import { IlluminationTierPyramid } from './IlluminationTierPyramid'
import { IlluminationDataToActionFlow } from './IlluminationDataToActionFlow'
import { IlluminationQuoteWordCloud } from './IlluminationQuoteWordCloud'

const VISUAL_MAP = {
  segmentDonut: IlluminationSegmentDonut,
  spendBars: IlluminationSpendBars,
  venn: IlluminationOverlapVenn,
  spectrum: IlluminationDivergenceSpectrum,
  threePillars: IlluminationThreePillars,
  jtbdChart: IlluminationJtbdHeatChart,
  tierPyramid: IlluminationTierPyramid,
  dataToAction: IlluminationDataToActionFlow,
  quoteWordCloud: IlluminationQuoteWordCloud,
}

export function IlluminationVisuals({ visuals }) {
  if (!visuals?.length) return null

  const isDonutSpendGrid =
    visuals.length === 2 &&
    visuals.includes('segmentDonut') &&
    visuals.includes('spendBars')

  return (
    <div
      className={`mt-3 mb-4 max-w-5xl ${
        isDonutSpendGrid ? 'grid grid-cols-1 lg:grid-cols-2 gap-3' : 'space-y-3'
      }`}
    >
      {visuals.map((key) => {
        const Component = VISUAL_MAP[key]
        if (!Component) return null
        return <Component key={key} />
      })}
    </div>
  )
}
