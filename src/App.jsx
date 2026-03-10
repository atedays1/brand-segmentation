import { IntroSection } from './components/sections/IntroSection'
import { TransitionSlide } from './components/TransitionSlide'
import { SegmentSection } from './components/sections/SegmentSection'
import { ProductStrategySection } from './components/sections/ProductStrategySection'
import { MarketplaceSection } from './components/sections/MarketplaceSection'
import { CompetitiveSection } from './components/sections/CompetitiveSection'
import { OmniChannelSection } from './components/sections/OmniChannelSection'
import { AskSection } from './components/sections/AskSection'
import { ScrollProgress } from './components/ScrollProgress'

function App() {
  return (
    <>
      <ScrollProgress />
      <main>
        <IntroSection />
        <TransitionSlide kind="ourPeople" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SegmentSection key={i} segmentIndex={i} />
        ))}
        <TransitionSlide kind="theOpportunity" />
        <ProductStrategySection />
        <MarketplaceSection />
        <TransitionSlide kind="howWeWin" />
        <CompetitiveSection />
        <OmniChannelSection />
        <AskSection />
      </main>
    </>
  )
}

export default App
