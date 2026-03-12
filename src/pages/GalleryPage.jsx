import { useState, useEffect, useRef, useCallback } from 'react'

/** @typedef {{ id: string; type: string; name: string; text?: string; imagePath?: string; visible?: boolean; frameName?: string; slideId?: string }} GalleryItem */

export function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState(/** @type {GalleryItem[]} */ ([]))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(/** @type {string | null} */ (null))
  const [slideItems, setSlideItems] = useState(/** @type {GalleryItem[]} */ ([]))

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetch('/extracted/data.json')
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('data.json not found. Run the Figma extractor (npm run figma-extract) and ensure public/extracted/ contains data.json.')
        }
        const text = await res.text()
        const trimmed = text.trim()
        if (!trimmed.startsWith('[') && !trimmed.startsWith('{')) {
          throw new Error('data.json not found or invalid (server returned a non-JSON page). Run the Figma extractor and ensure public/extracted/data.json exists.')
        }
        return JSON.parse(text)
      })
      .then((data) => {
        if (cancelled) return
        const list = Array.isArray(data) ? data : []
        setGalleryItems(list.filter((item) => item.visible !== false))
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load gallery data')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const addToSlide = useCallback((item) => {
    const copy = {
      ...item,
      slideId: `${item.id}-${Date.now()}`,
    }
    setSlideItems((prev) => [...prev, copy])
  }, [])

  const removeFromSlide = useCallback((slideId) => {
    setSlideItems((prev) => prev.filter((i) => i.slideId !== slideId))
  }, [])

  const updateSlideItemText = useCallback((slideId, text) => {
    setSlideItems((prev) =>
      prev.map((i) => (i.slideId === slideId ? { ...i, text } : i))
    )
  }, [])

  const displayItems = galleryItems

  return (
    <div className="pt-14 min-h-screen flex font-sans bg-slate-950 text-slate-200">
      {/* Left: scrollable gallery */}
      <aside className="w-full lg:w-80 lg:min-w-[320px] border-r border-slate-700/50 flex flex-col bg-slate-900/50">
        <div className="p-4 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-white">Gallery</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Click an item to add it to the slide.
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {loading && (
            <p className="text-slate-400 text-sm p-4">Loading…</p>
          )}
          {error && (
            <p className="text-amber-400 text-sm p-4">
              {error}. Run the Figma extractor to generate data.json.
            </p>
          )}
          {!loading && !error && displayItems.length === 0 && (
            <p className="text-slate-400 text-sm p-4">No items. Run the Figma extractor.</p>
          )}
          {!loading && displayItems.length > 0 && (
            <ul className="space-y-1">
              {displayItems.map((item, index) => (
                <GalleryListItem key={`${item.id}-${index}`} item={item} onAdd={() => addToSlide(item)} />
              ))}
            </ul>
          )}
        </div>
      </aside>

      {/* Right: slide canvas */}
      <main className="flex-1 min-w-0 flex flex-col items-center justify-start p-6 lg:p-8 overflow-auto">
        <div className="w-full max-w-3xl">
          <h2 className="text-sm font-medium text-slate-400 mb-4">Slide</h2>
          <div className="min-h-[420px] rounded-xl bg-slate-800/80 border border-slate-700/50 p-6 shadow-xl">
            {slideItems.length === 0 && (
              <p className="text-slate-500 text-sm">Click items in the gallery to add them here.</p>
            )}
            <div className="space-y-4">
              {slideItems.map((item) => (
                <SlideItem
                  key={item.slideId}
                  item={item}
                  onRemove={() => removeFromSlide(item.slideId)}
                  onTextChange={(text) => updateSlideItemText(item.slideId, text)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function GalleryListItem({ item, onAdd }) {
  const hasImage = item.imagePath != null
  const hasText = item.text != null && String(item.text).trim() !== ''
  const label = item.name || item.type || item.id

  return (
    <li>
      <button
        type="button"
        onClick={onAdd}
        className="w-full text-left rounded-lg p-2 hover:bg-slate-700/60 focus:bg-slate-700/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-colors"
      >
        <div className="flex gap-2 items-start">
          {hasImage && (
            <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-slate-800">
              <img
                src={item.imagePath}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <span className="text-sm font-medium text-slate-200 block truncate">{label}</span>
            {item.frameName && (
              <span className="text-xs text-slate-500 block">{item.frameName}</span>
            )}
            {hasText && !hasImage && (
              <span className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                {String(item.text).slice(0, 80)}
                {String(item.text).length > 80 ? '…' : ''}
              </span>
            )}
          </div>
        </div>
      </button>
    </li>
  )
}

function SlideItem({ item, onRemove, onTextChange }) {
  const textRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const hasImage = item.imagePath != null
  const hasText = item.text != null || true // allow empty text block to type into

  // Sync initial text into contentEditable (ref runs after mount)
  useEffect(() => {
    const el = textRef.current
    if (!el) return
    const value = item.text ?? ''
    if (el.textContent !== value) {
      el.textContent = value
    }
  }, [item.slideId]) // only set on mount / when slide instance changes, not on every item.text change from parent

  const handleBlur = useCallback(() => {
    const el = textRef.current
    if (el) onTextChange(el.textContent ?? '')
  }, [onTextChange])

  return (
    <div className="group relative rounded-lg border border-slate-600/50 bg-slate-800/40 p-3">
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 text-xs px-2 py-1 rounded transition-opacity"
        aria-label="Remove from slide"
      >
        Remove
      </button>
      {hasImage && (
        <div className="mb-2">
          <img
            src={item.imagePath}
            alt={item.name || ''}
            className="max-w-full h-auto max-h-64 object-contain rounded"
          />
        </div>
      )}
      {hasText && (
        <div
          ref={textRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur}
          className="min-h-[1.5em] text-slate-200 outline-none focus:ring-1 focus:ring-emerald-500/50 rounded px-1 -mx-1"
        />
      )}
      {!hasImage && !item.text && (
        <span className="text-slate-500 text-sm">Click to edit</span>
      )}
    </div>
  )
}
