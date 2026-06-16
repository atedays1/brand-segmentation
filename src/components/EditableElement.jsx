import { useState, useRef, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSidebarLibrary } from '../context/SidebarLibraryContext'
import { TextStyleToolbar } from './TextStyleToolbar'

const DRAG_THRESHOLD = 5

/**
 * Wraps built-in page content (headlines, blocks) so they can be moved, resized, and reordered
 * when Edit mode is on. Block-level font color, size, and highlight only (no inline/selection formatting).
 */
export function EditableElement({ id, children, className = '' }) {
  const { pathname } = useLocation()
  const { editMode, pageElementOverrides, updatePageElementOverride } = useSidebarLibrary()
  const overrides = pageElementOverrides[pathname]?.[id] ?? null
  const wrapperRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const dragStateRef = useRef({ phase: 'idle', startX: 0, startY: 0, startLeft: 0, startTop: 0, initialSet: false })
  const resizeStartRef = useRef({ x: 0, y: 0, w: 0, h: 0 })

  const left = overrides?.left ?? 0
  const top = overrides?.top ?? 0
  const width = overrides?.width
  const height = overrides?.height
  const zIndex = overrides?.zIndex ?? 0
  const fontColor = overrides?.fontColor
  const fontSize = overrides?.fontSize
  const highlightColor = overrides?.highlightColor
  const contentHtml = overrides?.contentHtml
  const hasOverrides = overrides != null
  const hasPositionOverrides = overrides && (overrides.left != null || overrides.top != null || overrides.width != null || overrides.height != null)
  // Only treat as "has content" if we have substantial HTML (avoid blank when old/bad data or empty capture)
  const hasContentHtml = contentHtml != null && typeof contentHtml === 'string' && contentHtml.trim().length > 10
  const showContentEditable = editMode && hasContentHtml
  const contentRef = useRef(/** @type {HTMLDivElement | null} */ (null))
  const editableContentRef = useRef(/** @type {HTMLDivElement | null} */ (null))

  const captureInitialRect = useCallback(() => {
    const el = wrapperRef.current
    const parent = el?.offsetParent
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (!parent) {
      updatePageElementOverride(pathname, id, {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        zIndex: 0,
      })
      return
    }
    const parentRect = parent.getBoundingClientRect()
    updatePageElementOverride(pathname, id, {
      left: rect.left - parentRect.left,
      top: rect.top - parentRect.top,
      width: rect.width,
      height: rect.height,
      zIndex: 0,
    })
  }, [pathname, id, updatePageElementOverride])

  const handleMouseDown = useCallback(
    (e) => {
      if (!editMode) return
      if (e.target.closest('[data-resize-handle]') || e.target.closest('[data-order-btn]')) return
      e.preventDefault()
      if (!hasOverrides) {
        captureInitialRect()
        dragStateRef.current = { phase: 'pending', startX: e.clientX, startY: e.clientY, startLeft: 0, startTop: 0, initialSet: true }
      } else {
        dragStateRef.current = {
          phase: 'dragging',
          startX: e.clientX,
          startY: e.clientY,
          startLeft: left,
          startTop: top,
          initialSet: false,
        }
        setIsDragging(true)
      }
    },
    [editMode, hasOverrides, left, top, captureInitialRect]
  )

  useEffect(() => {
    if (!editMode) return
    const onMove = (e) => {
      const s = dragStateRef.current
      if (s.phase === 'pending') {
        const dx = e.clientX - s.startX
        const dy = e.clientY - s.startY
        if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
          const el = wrapperRef.current
          const parent = el?.offsetParent
          if (el && parent) {
            const rect = el.getBoundingClientRect()
            const parentRect = parent.getBoundingClientRect()
            dragStateRef.current = {
              phase: 'dragging',
              startX: e.clientX,
              startY: e.clientY,
              startLeft: rect.left - parentRect.left,
              startTop: rect.top - parentRect.top,
              initialSet: false,
            }
          }
          setIsDragging(true)
        }
        return
      }
      if (s.phase === 'dragging') {
        const el = wrapperRef.current
        const parent = el?.offsetParent
        if (!parent) return
        const newLeft = s.startLeft + (e.clientX - s.startX)
        const newTop = s.startTop + (e.clientY - s.startY)
        updatePageElementOverride(pathname, id, { left: newLeft, top: newTop })
      }
    }
    const onUp = () => {
      if (dragStateRef.current.phase === 'dragging') setIsDragging(false)
      dragStateRef.current = { phase: 'idle', startX: 0, startY: 0, startLeft: 0, startTop: 0, initialSet: false }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [editMode, pathname, id, updatePageElementOverride])

  const handleResizeDown = useCallback(
    (e) => {
      e.stopPropagation()
      setIsResizing(true)
      resizeStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        w: width ?? wrapperRef.current?.getBoundingClientRect().width ?? 200,
        h: height ?? wrapperRef.current?.getBoundingClientRect().height ?? 100,
      }
    },
    [width, height]
  )

  useEffect(() => {
    if (!isResizing || !hasOverrides) return
    const onMove = (e) => {
      const { x, y, w, h } = resizeStartRef.current
      const newW = Math.max(60, w + (e.clientX - x))
      const newH = Math.max(40, h + (e.clientY - y))
      updatePageElementOverride(pathname, id, { width: newW, height: newH })
    }
    const onUp = () => setIsResizing(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [isResizing, hasOverrides, pathname, id, updatePageElementOverride])

  const adjustZ = useCallback(
    (delta) => {
      const next = (zIndex ?? 0) + delta
      updatePageElementOverride(pathname, id, { zIndex: Math.max(0, next) })
    },
    [pathname, id, zIndex, updatePageElementOverride]
  )

  const makeTextSelectable = useCallback(() => {
    const el = contentRef.current
    if (!el) return
    const html = (el.innerHTML || '').trim()
    // Only switch to contentEditable if we captured meaningful content (avoids blank screen)
    if (html.length < 10) return
    updatePageElementOverride(pathname, id, { contentHtml: el.innerHTML })
  }, [pathname, id, updatePageElementOverride])

  const revertToOriginal = useCallback(() => {
    updatePageElementOverride(pathname, id, { contentHtml: null })
  }, [pathname, id, updatePageElementOverride])

  const handleContentBlur = useCallback(() => {
    const el = editableContentRef.current
    if (el) updatePageElementOverride(pathname, id, { contentHtml: el.innerHTML })
  }, [pathname, id, updatePageElementOverride])

  const lastContentHtmlRef = useRef(/** @type {string | undefined} */ (undefined))
  useEffect(() => {
    if (!showContentEditable) return
    const el = editableContentRef.current
    if (!el) return
    const next = contentHtml ?? ''
    if (lastContentHtmlRef.current !== next) {
      el.innerHTML = next
      lastContentHtmlRef.current = next
    }
  }, [showContentEditable, contentHtml])

  if (!editMode && !hasOverrides) {
    return <div ref={wrapperRef} className={className}>{children}</div>
  }

  const style = {
    ...(hasPositionOverrides && {
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      ...(width != null && { width: `${width}px` }),
      ...(height != null && { height: `${height}px` }),
      zIndex: zIndex ?? 0,
    }),
    ...(fontColor && { color: fontColor }),
    ...(fontSize && { fontSize }),
    ...(highlightColor && { backgroundColor: highlightColor }),
    cursor: editMode ? (isDragging ? 'grabbing' : 'grab') : 'default',
  }

  return (
    <div
      ref={wrapperRef}
      className={`editable-element ${className} ${editMode ? 'ring-1 ring-transparent hover:ring-slate-500/50 rounded' : ''}`}
      style={style}
      onMouseDown={handleMouseDown}
    >
      {editMode && (
        <div className="absolute -top-10 left-0 z-20 pointer-events-auto flex flex-col gap-1" onPointerDown={(e) => e.stopPropagation()}>
          {!showContentEditable ? (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); makeTextSelectable(); }}
              className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs whitespace-nowrap"
              title="Make this block’s text selectable so you can change color/size/highlight of specific words or lines"
            >
              Make text selectable
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); revertToOriginal(); }}
              className="px-2 py-1 rounded bg-slate-600 hover:bg-slate-500 text-slate-200 text-xs whitespace-nowrap"
              title="Revert to original block (stops per-word editing)"
            >
              Revert to original
            </button>
          )}
          <TextStyleToolbar
            fontColor={fontColor}
            fontSize={fontSize}
            highlightColor={highlightColor}
            onChange={(updates) => updatePageElementOverride(pathname, id, updates)}
            onPointerDown={(e) => e.stopPropagation()}
            editableRef={showContentEditable ? editableContentRef : null}
          />
        </div>
      )}
      {editMode && (
        <div className="absolute -left-8 top-0 bottom-0 flex flex-col justify-center gap-0.5 z-10 pointer-events-auto">
          <button
            type="button"
            data-order-btn
            onClick={(e) => { e.stopPropagation(); adjustZ(-100); }}
            className="w-6 h-5 flex items-center justify-center bg-slate-700/90 hover:bg-slate-600 text-white text-xs rounded-l"
            title="Send backward"
          >
            ◀
          </button>
          <button
            type="button"
            data-order-btn
            onClick={(e) => { e.stopPropagation(); adjustZ(100); }}
            className="w-6 h-5 flex items-center justify-center bg-slate-700/90 hover:bg-slate-600 text-white text-xs rounded-r"
            title="Bring forward"
          >
            ▶
          </button>
        </div>
      )}
      <div className="h-full overflow-hidden" style={{ minWidth: 0 }}>
        {showContentEditable ? (
          <div
            ref={editableContentRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleContentBlur}
            onMouseDown={(e) => e.stopPropagation()}
            className="outline-none min-h-[1em]"
          />
        ) : (
          <div ref={contentRef}>
            {children}
          </div>
        )}
      </div>
      {editMode && hasPositionOverrides && (
        <div
          data-resize-handle
          onMouseDown={handleResizeDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-0 hover:opacity-100 border-t-2 border-l-2 border-slate-400 rounded-tl bg-slate-800/50"
        />
      )}
    </div>
  )
}
