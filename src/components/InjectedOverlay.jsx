import { useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useSidebarLibrary } from '../context/SidebarLibraryContext'
import { SlideElement } from './SlideElement'

export function InjectedOverlay() {
  const { pathname } = useLocation()
  const overlayRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const {
    sidebarOpen,
    editMode,
    draggingFromLibrary,
    injectedByRoute,
    addInjectedItem,
    removeInjectedItem,
    updateInjectedItem,
    reorderInjected,
  } = useSidebarLibrary()

  const items = injectedByRoute[pathname] ?? []

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      const raw = e.dataTransfer.getData('application/json')
      if (!raw) return
      try {
        const item = JSON.parse(raw)
        const rect = overlayRef.current?.getBoundingClientRect()
        if (!rect) return
        const left = e.clientX - rect.left
        const top = e.clientY - rect.top
        addInjectedItem(pathname, item, { left, top })
      } catch (_) {}
    },
    [pathname, addInjectedItem]
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }, [])

  if (items.length === 0 && !sidebarOpen && !draggingFromLibrary) return null

  // When sidebar is open, don't cover it — overlay starts to the right (w-72 = 18rem)
  // so sidebar items stay clickable and draggable
  const overlayLeft = sidebarOpen ? '18rem' : 0

  return (
    <div
      ref={overlayRef}
      className="absolute top-14 left-0 right-0 bottom-0 z-[45] pointer-events-none"
      style={{ left: overlayLeft }}
    >
      {/* Drop zone: only capture pointer events during drag from library so drops work; when active, raise z-index so it receives drop over items */}
      <div
        className="absolute inset-0"
        style={{
          pointerEvents: draggingFromLibrary ? 'auto' : 'none',
          zIndex: draggingFromLibrary ? 10 : 0,
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        aria-hidden
      />
      {/* Injected items: direct children so they sit on top; pointer-events-auto on each so they stay clickable */}
      {items.map((item) => (
        <SlideElement
          key={item.slideId}
          item={item}
          onRemove={() => removeInjectedItem(pathname, item.slideId)}
          onUpdate={(updates) => updateInjectedItem(pathname, item.slideId, updates)}
          editMode={editMode}
          onOrder={(dir) => reorderInjected(pathname, item.slideId, dir)}
        />
      ))}
    </div>
  )
}
