import { useCallback, useRef } from 'react'

const FONT_SIZES = ['12', '14', '16', '18', '20', '24', '28', '32', '40', '48']
const COLOR_PRESETS = [
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#0f172a' },
  { name: 'Slate', value: '#94a3b8' },
  { name: 'Emerald', value: '#34d399' },
  { name: 'Amber', value: '#fbbf24' },
]

function parseSize(fontSize) {
  if (!fontSize || typeof fontSize !== 'string') return ''
  const num = fontSize.replace(/px|rem|em/g, '').trim()
  return FONT_SIZES.includes(num) ? num : num || ''
}

/**
 * Toolbar for font size, color, and highlight. Supports block-level styles and optional selection formatting.
 */
export function TextStyleToolbar({
  fontColor,
  fontSize,
  highlightColor,
  onChange,
  onPointerDown,
  /** When set, show "Apply to selection" buttons for inline formatting (contentEditable) */
  editableRef = null,
}) {
  const colorInputRef = useRef(/** @type {HTMLInputElement | null} */ (null))
  const highlightInputRef = useRef(/** @type {HTMLInputElement | null} */ (null))

  const normalizedSizeValue = parseSize(fontSize)
  const sizeSelectValue = normalizedSizeValue || ''

  // Define selection helpers first so handlers can reference them (hook order matters)
  const hasSelectionInEditable = useCallback(() => {
    const sel = document.getSelection()
    if (!sel || sel.rangeCount === 0 || !editableRef?.current) return false
    const node = sel.anchorNode
    if (!node || !editableRef.current.contains(node)) return false
    const range = sel.getRangeAt(0)
    return !range.collapsed
  }, [editableRef])

  const applyToSelection = useCallback(
    (color, isBackground) => {
      const sel = document.getSelection()
      if (!sel || sel.rangeCount === 0 || !editableRef?.current) return
      const node = sel.anchorNode
      if (!node || !editableRef.current.contains(node)) return
      const range = sel.getRangeAt(0)
      if (range.collapsed) return
      document.execCommand(isBackground ? 'backColor' : 'foreColor', false, color)
    },
    [editableRef]
  )

  const applyFontSizeToSelection = useCallback(
    (sizePx) => {
      const sel = document.getSelection()
      if (!sel || sel.rangeCount === 0 || !editableRef?.current) return
      const node = sel.anchorNode
      if (!node || !editableRef.current.contains(node)) return
      const range = sel.getRangeAt(0)
      if (range.collapsed) return
      try {
        const span = document.createElement('span')
        span.style.fontSize = sizePx
        range.surroundContents(span)
      } catch (_) {
        try {
          const frag = range.extractContents()
          const span = document.createElement('span')
          span.style.fontSize = sizePx
          span.appendChild(frag)
          range.insertNode(span)
        } catch (_) {}
      }
    },
    [editableRef]
  )

  const handleSizeChange = useCallback(
    (e) => {
      e.stopPropagation()
      const v = (e.target.value || '').trim()
      const sizePx = v ? `${v}px` : undefined
      if (editableRef?.current && hasSelectionInEditable()) {
        if (sizePx) applyFontSizeToSelection(sizePx)
        return
      }
      onChange({ fontSize: sizePx })
    },
    [onChange, editableRef, hasSelectionInEditable, applyFontSizeToSelection]
  )
  const handleColorChange = useCallback(
    (e) => {
      e.stopPropagation()
      const color = e.target.value || undefined
      if (editableRef?.current && hasSelectionInEditable()) {
        if (color) applyToSelection(color, false)
        return
      }
      onChange({ fontColor: color })
    },
    [onChange, editableRef, hasSelectionInEditable, applyToSelection]
  )
  const handleHighlightChange = useCallback(
    (e) => {
      e.stopPropagation()
      const color = e.target.value || undefined
      if (editableRef?.current && hasSelectionInEditable()) {
        if (color) applyToSelection(color, true)
        return
      }
      onChange({ highlightColor: color })
    },
    [onChange, editableRef, hasSelectionInEditable, applyToSelection]
  )

  // When editing selection, prevent toolbar from taking focus on mousedown so selection is preserved when clicking Color/Highlight/Size
  const handleToolbarMouseDown = useCallback(
    (e) => {
      e.stopPropagation()
      if (editableRef?.current) e.preventDefault()
    },
    [editableRef]
  )

  return (
    <div
      className="flex flex-wrap items-center gap-2 px-2 py-1.5 rounded-lg bg-slate-800/95 border border-slate-600/50 shadow-lg text-xs"
      onPointerDown={handleToolbarMouseDown}
      onMouseDown={handleToolbarMouseDown}
      role="toolbar"
      aria-label="Text style"
    >
      {/* Size: dropdown + custom input */}
      <label className="flex items-center gap-1.5 text-slate-300" onClick={(e) => e.stopPropagation()}>
        <span className="whitespace-nowrap">Size</span>
        <select
          value={sizeSelectValue}
          onChange={handleSizeChange}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          className="bg-slate-700 border border-slate-600 rounded px-1.5 py-0.5 text-slate-200 min-w-[4rem] cursor-pointer"
          title="Font size"
        >
          <option value="">Default</option>
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}px
            </option>
          ))}
          {normalizedSizeValue && !FONT_SIZES.includes(normalizedSizeValue) && (
            <option value={normalizedSizeValue}>{normalizedSizeValue}px</option>
          )}
        </select>
        <input
          type="number"
          min={8}
          max={120}
          placeholder="Custom"
          onBlur={(e) => {
            const v = e.target.value.trim()
            if (v) handleSizeChange({ target: { value: v } })
          }}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          className="w-14 bg-slate-700 border border-slate-600 rounded px-1 py-0.5 text-slate-200 placeholder-slate-500"
          title="Type custom size then blur"
        />
      </label>
      <span className="text-slate-600">|</span>

      {/* Color: wheel (any color) + presets */}
      <label className="flex items-center gap-1.5 text-slate-300">
        <span className="whitespace-nowrap">Color</span>
        <input
          ref={colorInputRef}
          type="color"
          value={fontColor || '#e2e8f0'}
          onChange={handleColorChange}
          onClick={(e) => e.stopPropagation()}
          className="w-8 h-6 rounded cursor-pointer border border-slate-600 bg-slate-700 flex-shrink-0"
          title="Pick any color"
        />
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); colorInputRef.current?.click(); }}
          className="text-slate-400 hover:text-white whitespace-nowrap"
          title="Open color picker"
        >
          Any color
        </button>
      </label>
      <div className="flex items-center gap-0.5">
        {COLOR_PRESETS.map(({ name, value }) => (
          <button
            key={value}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              if (editableRef?.current && hasSelectionInEditable()) {
                applyToSelection(value, false)
              } else {
                onChange({ fontColor: value })
              }
            }}
            className="w-4 h-4 rounded border border-slate-600 hover:ring-1 ring-white/50 flex-shrink-0"
            style={{ backgroundColor: value }}
            title={name}
            aria-label={name}
          />
        ))}
      </div>
      <span className="text-slate-600">|</span>

      {/* Highlight (block-level background) */}
      <label className="flex items-center gap-1.5 text-slate-300">
        <span className="whitespace-nowrap">Highlight</span>
        <input
          ref={highlightInputRef}
          type="color"
          value={highlightColor || '#fef08a'}
          onChange={handleHighlightChange}
          onClick={(e) => e.stopPropagation()}
          className="w-8 h-6 rounded cursor-pointer border border-slate-600 bg-slate-700 flex-shrink-0"
          title="Highlight color"
        />
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); highlightInputRef.current?.click(); }}
          className="text-slate-400 hover:text-white whitespace-nowrap"
          title="Pick highlight color"
        >
          Any
        </button>
      </label>

      {/* Apply to selection: select text first, then click (only when editableRef is provided) */}
      {editableRef && (
        <>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500 font-medium">Selection (select text first):</span>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); applyToSelection(fontColor || '#e2e8f0', false); }}
            className="px-1.5 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
            title="Apply text color to selection"
          >
            Color
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); applyToSelection(highlightColor || '#fef08a', true); }}
            className="px-1.5 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
            title="Highlight selection"
          >
            Highlight
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); applyFontSizeToSelection((fontSize || '16px')); }}
            className="px-1.5 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
            title="Apply font size to selection"
          >
            Size
          </button>
        </>
      )}
    </div>
  )
}
