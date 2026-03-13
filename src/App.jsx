import { useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AppNav } from './components/AppNav'
import { SidebarLibrary } from './components/SidebarLibrary'
import { InjectedOverlay } from './components/InjectedOverlay'
import { CenterGuide } from './components/CenterGuide'
import { EditBar } from './components/EditBar'
import { useSidebarLibrary } from './context/SidebarLibraryContext'
import { SegmentationDeck } from './pages/SegmentationDeck'
import { MarketRealityPage } from './pages/MarketRealityPage'
import { MarketExplorationPage } from './pages/MarketExplorationPage'
import { GalleryPage } from './pages/GalleryPage'
import { BoardDeckPage } from './pages/BoardDeckPage'

function SidebarToggle() {
  const { sidebarOpen, toggleSidebar } = useSidebarLibrary()
  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className="fixed top-14 left-3 z-[52] flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-600/50 text-slate-300 hover:text-white shadow-lg transition-colors"
      title={sidebarOpen ? 'Hide library' : 'Show library'}
      aria-label={sidebarOpen ? 'Hide library' : 'Show library'}
    >
      {sidebarOpen ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )}
    </button>
  )
}

function App() {
  const containerRef = useRef(null)
  const { pathname } = useLocation()
  const { sidebarOpen } = useSidebarLibrary()
  const showStandaloneEditBar = pathname === '/gallery' || pathname === '/segmentation'
  return (
    <>
      <AppNav />
      <SidebarToggle />
      {sidebarOpen && (
        <div className="fixed top-14 left-0 bottom-0 z-[48] pt-2 pb-2 flex">
          <SidebarLibrary />
        </div>
      )}
      <div ref={containerRef} className="pb-24 relative">
        <Routes>
          <Route path="/" element={<MarketRealityPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/segmentation" element={<SegmentationDeck />} />
          <Route path="/market-reality" element={<MarketRealityPage />} />
          <Route path="/market-exploration" element={<MarketExplorationPage />} />
          <Route path="/board-deck" element={<BoardDeckPage />} />
        </Routes>
        <InjectedOverlay />
        <CenterGuide containerRef={containerRef} />
      </div>
      {showStandaloneEditBar && <EditBar />}
    </>
  )
}

export default App
