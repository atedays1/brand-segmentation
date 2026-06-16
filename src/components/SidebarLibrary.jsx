import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSidebarLibrary } from '../context/SidebarLibraryContext'

function SidebarItem({ item, onAdd, isText, onDragStartLibrary, onDragEndLibrary }) {
  const label = item.name || item.type || item.id
  const handleDragStart = (e) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item))
    e.dataTransfer.effectAllowed = 'copy'
    onDragStartLibrary?.()
  }
  return (
    <li>
      <div
        role="button"
        tabIndex={0}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={() => onDragEndLibrary?.()}
        onClick={() => onAdd()}
        className="flex gap-2 items-center rounded-lg p-2 hover:bg-slate-700/60 cursor-grab active:cursor-grabbing border border-transparent hover:border-slate-600/50"
      >
        {!isText && item.imagePath && (
          <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-slate-800">
            <img src={item.imagePath} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <span className="text-sm text-slate-200 truncate flex-1">{label}</span>
      </div>
    </li>
  )
}

export function SidebarLibrary() {
  const { pathname } = useLocation()
  const {
    setSidebarOpen,
    setDraggingFromLibrary,
    frames,
    framesLoading,
    framesError,
    loadFrames,
    addInjectedItem,
  } = useSidebarLibrary()

  useEffect(() => {
    if (Object.keys(frames).length === 0 && !framesLoading && !framesError) {
      loadFrames()
    }
  }, [frames, framesLoading, framesError, loadFrames])

  const handleAdd = (item, position) => {
    addInjectedItem(pathname, item, position)
  }

  const frameEntries = Object.entries(frames)

  return (
    <aside className="w-72 flex-shrink-0 h-full border-r border-slate-700/50 flex flex-col bg-slate-900/95 backdrop-blur shadow-xl">
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-white">Library</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={loadFrames}
            disabled={framesLoading}
            className="text-xs font-medium text-slate-400 hover:text-white disabled:opacity-50 p-1.5 rounded"
            title="Refresh from figma-data.json"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-slate-700/60"
            title="Close library"
            aria-label="Close library"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-xs text-slate-400 px-4 pb-2">
        Drag or click to add to this page.
      </p>
      <div className="flex-1 overflow-y-auto p-2">
        {framesLoading && <p className="text-slate-400 text-sm p-2">Loading…</p>}
        {framesError && <p className="text-amber-400 text-sm p-2">{framesError}</p>}
        {!framesLoading && !framesError && frameEntries.length === 0 && (
          <p className="text-slate-500 text-sm p-2">No frames. Export from Figma plugin first.</p>
        )}
        {!framesLoading && !framesError && frameEntries.length > 0 && (
          <div className="space-y-4">
            {frameEntries.map(([frameName, items]) => {
              const textItems = items.filter((i) => i.type === 'TEXT' || (i.text != null && !i.imagePath))
              const imageItems = items.filter((i) => i.imagePath != null)
              const hasAny = textItems.length > 0 || imageItems.length > 0
              if (!hasAny) return null
              return (
                <section key={frameName} className="space-y-1">
                  <h3 className="text-xs font-semibold text-emerald-400/90 uppercase tracking-wider px-2 py-1 rounded bg-slate-800/60">
                    {frameName}
                  </h3>
                  <ul className="space-y-0.5">
                    {textItems.map((item, index) => (
                      <SidebarItem
                        key={`text-${item.id}-${index}`}
                        item={item}
                        onAdd={() => handleAdd(item)}
                        isText
                        onDragStartLibrary={() => setDraggingFromLibrary(true)}
                        onDragEndLibrary={() => setDraggingFromLibrary(false)}
                      />
                    ))}
                    {imageItems.map((item, index) => (
                      <SidebarItem
                        key={`img-${item.id}-${index}`}
                        item={item}
                        onAdd={() => handleAdd(item)}
                        isText={false}
                        onDragStartLibrary={() => setDraggingFromLibrary(true)}
                        onDragEndLibrary={() => setDraggingFromLibrary(false)}
                      />
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}
