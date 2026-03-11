import { Routes, Route } from 'react-router-dom'
import { AppNav } from './components/AppNav'
import { SegmentationDeck } from './pages/SegmentationDeck'
import { MarketRealityPage } from './pages/MarketRealityPage'

function App() {
  return (
    <>
      <AppNav />
      <Routes>
        <Route path="/" element={<SegmentationDeck />} />
        <Route path="/market-reality" element={<MarketRealityPage />} />
      </Routes>
    </>
  )
}

export default App
