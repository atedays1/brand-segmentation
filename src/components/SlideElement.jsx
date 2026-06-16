import { useState, useEffect, useRef, useCallback } from 'react'
import { TextStyleToolbar } from './TextStyleToolbar'

const DRAG_THRESHOLD = 5

export function SlideElement({ item, onRemove, onUpdate, editMode = false, onOrder }) {
  const textRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const dragStateRef = useRef({ phase: 'idle', startX: 0, startY: 0, startLeft: 0, startTop: 0 })
  const resizeStartRef = useRef({ x: 0, y: 0, w: 0, h: 0 })
  const canDrag = editMode

  const left = item.left ?? 0
  const top = item.top ?? 0
  const width = item.width ?? 200
  const height = item.height ?? 150
  const hasImage = item.imagePath != null
  const hasText = item.text != null || item.type === 'TEXT'

  useEffect(() => {
    const el = textRef.current
    if (!el || !hasText) return
    if (item.html != null && item.html !== '') {
      if (el.innerHTML !== item.html) el.innerHTML = item.html
    } else {
      const v = item.text ?? ''
      if (el.textContent !== v) el.textContent = v
    }
  }, [item.slideId, item.html, item.text, hasText])

  const handleTextBlur = useCallback(() => {
    const el = textRef.current
    if (!el) return
    const html = el.innerHTML
    const hasFormatting = /<[^>]+>/.test(html)
    onUpdate(hasFormatting ? { text: el.textContent ?? '', html } : { text: el.textContent ?? '', html: undefined })
  }, [onUpdate])

  const handleMouseDown = useCallback(
    (e) => {
      if (!canDrag) return
      if (e.target.closest('[data-resize-handle]') || e.target.closest('[data-order-btn]')) return
      e.preventDefault()
      const isOnText = hasText && (e.target === textRef.current || textRef.current?.contains(e.target))
      dragStateRef.current = {
        phase: isOnText ? 'pending' : 'dragging',
        startX: e.clientX,
        startY: e.clientY,
        startLeft: left,
        startTop: top,
      }
      if (!isOnText) setIsDragging(true)
    },
    [left, top, hasText, canDrag]
  )

  useEffect(() => {
    const state = dragStateRef.current
    if (state.phase === 'idle') return
    const onMove = (e) => {
      const s = dragStateRef.current
      if (s.phase === 'pending') {
        const dx = e.clientX - s.startX
        const dy = e.clientY - s.startY
        if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
          dragStateRef.current = { ...s, phase: 'dragging', startX: e.clientX, startY: e.clientY }
          setIsDragging(true)
        }
        return
      }
      if (s.phase === 'dragging') {
        onUpdate({
          left: s.startLeft + (e.clientX - s.startX),
          top: s.startTop + (e.clientY - s.startY),
        })
      }
    }
    const onUp = () => {
      if (dragStateRef.current.phase === 'pending') textRef.current?.focus()
      if (dragStateRef.current.phase === 'dragging') setIsDragging(false)
      dragStateRef.current = { phase: 'idle', startX: 0, startY: 0, startLeft: 0, startTop: 0 }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [isDragging, onUpdate])

  const handleResizeDown = useCallback(
    (e) => {
      e.stopPropagation()
      setIsResizing(true)
      resizeStartRef.current = { x: e.clientX, y: e.clientY, w: width, h: height }
    },
    [width, height]
  )

  useEffect(() => {
    if (!isResizing) return
    const onMove = (e) => {
      const { x, y, w, h } = resizeStartRef.current
      const dx = e.clientX - x
      const dy = e.clientY - y
      let newW = Math.max(60, w + dx)
      let newH = Math.max(40, h + dy)
      if (item.naturalWidth != null && item.naturalHeight != null) {
        newW = Math.min(newW, item.naturalWidth)
        newH = Math.min(newH, item.naturalHeight)
      }
      onUpdate({ width: newW, height: newH })
    }
    const onUp = () => setIsResizing(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [isResizing, onUpdate, item.naturalWidth, item.naturalHeight])

  const style = {
    left: `${left}px`,
    top: `${top}px`,
    width: hasImage ? `${width}px` : undefined,
    height: hasImage ? `${height}px` : undefined,
  }

  return (
    <div
      className={`absolute outline-none select-none pointer-events-auto ${editMode ? 'ring-1 ring-transparent hover:ring-slate-500/50 rounded' : ''}`}
      style={{
        ...style,
        cursor: canDrag ? (isDragging ? 'grabbing' : 'grab') : 'default',
      }}
      onMouseDown={handleMouseDown}
    >
      {editMode && onOrder && (
        <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-center gap-0.5 z-10">
          <button
            type="button"
            data-order-btn
            onClick={(e) => { e.stopPropagation(); onOrder('back'); }}
            className="w-6 h-5 flex items-center justify-center bg-slate-700/90 hover:bg-slate-600 text-white text-xs rounded-l"
            title="Send to back"
            aria-label="Send to back"
          >
            ◀
          </button>
          <button
            type="button"
            data-order-btn
            onClick={(e) => { e.stopPropagation(); onOrder('backward'); }}
            className="w-6 h-5 flex items-center justify-center bg-slate-700/90 hover:bg-slate-600 text-white text-xs"
            title="Send backward"
            aria-label="Send backward"
          >
            ‹
          </button>
          <button
            type="button"
            data-order-btn
            onClick={(e) => { e.stopPropagation(); onOrder('forward'); }}
            className="w-6 h-5 flex items-center justify-center bg-slate-700/90 hover:bg-slate-600 text-white text-xs"
            title="Bring forward"
            aria-label="Bring forward"
          >
            ›
          </button>
          <button
            type="button"
            data-order-btn
            onClick={(e) => { e.stopPropagation(); onOrder('front'); }}
            className="w-6 h-5 flex items-center justify-center bg-slate-700/90 hover:bg-slate-600 text-white text-xs rounded-r"
            title="Bring to front"
            aria-label="Bring to front"
          >
            ▶
          </button>
        </div>
      )}
      {hasImage && (
        <div className="relative w-full h-full group">
          <img
            src={item.imagePath}
            alt={item.name || ''}
            className="w-full h-full object-contain pointer-events-none"
            draggable={false}
            style={{ pointerEvents: isDragging ? 'none' : undefined }}
            onLoad={(e) => {
              const img = e.currentTarget
              if (item.naturalWidth == null && img.naturalWidth) {
                onUpdate({ naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight })
              }
            }}
          />
          {editMode && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onRemove(); }}
                className="absolute top-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 bg-slate-800/90 hover:bg-red-600/90 text-white text-xs rounded-bl transition-opacity"
                aria-label="Remove"
              >
                ×
              </button>
              <div
                data-resize-handle
                onMouseDown={handleResizeDown}
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 group-hover:opacity-100 border-t-2 border-l-2 border-slate-400 rounded-tl"
              />
            </>
          )}
        </div>
      )}
      {hasText && (
        <>
          {editMode && (
            <div className="absolute -top-8 left-0 z-20" onPointerDown={(e) => e.stopPropagation()}>
              <TextStyleToolbar
                fontColor={item.fontColor}
                fontSize={item.fontSize}
                highlightColor={item.highlightColor}
                onChange={(updates) => onUpdate(updates)}
                onPointerDown={(e) => e.stopPropagation()}
                editableRef={textRef}
              />
            </div>
          )}
          <div
            ref={textRef}
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={handleTextBlur}
            onMouseDown={(e) => e.stopPropagation()}
            className={`min-w-[120px] min-h-[1.5em] px-1 py-0.5 outline-none rounded ${editMode ? 'focus:ring-1 focus:ring-emerald-500/50' : ''}`}
            style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              ...(item.fontColor && { color: item.fontColor }),
              ...(item.fontSize && { fontSize: item.fontSize }),
              ...(item.highlightColor && { backgroundColor: item.highlightColor }),
            }}
          />
        </>
      )}
      {hasText && !hasImage && editMode && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-1 -right-1 w-5 h-5 opacity-0 hover:opacity-100 bg-slate-700 hover:bg-red-600/90 text-white text-xs rounded-full"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </div>
  )
}
