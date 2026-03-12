import { Routes, Route } from 'react-router-dom'
import { AppNav } from './components/AppNav'
import { SegmentationDeck } from './pages/SegmentationDeck'
import { MarketRealityPage } from './pages/MarketRealityPage'
import { MarketExplorationPage } from './pages/MarketExplorationPage'
import { GalleryPage } from './pages/GalleryPage'

function App() {
  return (
    <>
      <AppNav />
      <Routes>
        <Route path="/" element={<MarketRealityPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/segmentation" element={<SegmentationDeck />} />
        <Route path="/market-reality" element={<MarketRealityPage />} />
        <Route path="/market-exploration" element={<MarketExplorationPage />} />
      </Routes>
    </>
  )
}

export default App
