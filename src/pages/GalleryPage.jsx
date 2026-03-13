import { useSidebarLibrary } from '../context/SidebarLibraryContext'

export function GalleryPage() {
  const { clearInjectedForRoute, sidebarOpen } = useSidebarLibrary()

  const handleClearSlide = () => {
    if (window.confirm('Clear all items from the slide and reset saved state?')) {
      clearInjectedForRoute('/gallery')
    }
  }

  return (
    <div className="pt-14 min-h-screen flex font-sans bg-slate-950 text-slate-200">
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <div className="flex-shrink-0 px-4 py-2 border-b border-slate-700/50 flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-400">
            Slide — use the library button (top-left) to add elements. Drag to move, resize images from corner.
          </h2>
          <button
            type="button"
            onClick={handleClearSlide}
            className="text-xs font-medium text-slate-400 hover:text-red-400"
          >
            Clear slide
          </button>
        </div>
        <div className="flex-1 relative overflow-hidden bg-slate-900/30">
          {!sidebarOpen && (
            <p className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm pointer-events-none">
              Click the menu icon (top-left) to open the library, then drag or click items to add them here.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
