import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const INJECTED_STORAGE_KEY = 'slide-deck-injected-by-route'
const LEGACY_STORAGE_KEY = 'slide-deck-state'
const EDIT_MODE_STORAGE_KEY = 'slide-deck-edit-mode'
const PAGE_OVERRIDES_STORAGE_KEY = 'slide-deck-page-overrides'

/** @typedef {{ id: string; type: string; name: string; text?: string; html?: string; imagePath?: string; frameName?: string; slideId?: string; left?: number; top?: number; width?: number; height?: number; naturalWidth?: number; naturalHeight?: number; fontColor?: string; fontSize?: string; highlightColor?: string }} GalleryItem */
/** @typedef {{ left?: number; top?: number; width?: number; height?: number; zIndex?: number; fontColor?: string; fontSize?: string; highlightColor?: string; contentHtml?: string }} PageElementOverride */

const MAX_UNDO = 50

function snapshot(injected, overrides) {
  try {
    return {
      injected: JSON.parse(JSON.stringify(injected || {})),
      overrides: JSON.parse(JSON.stringify(overrides || {})),
    }
  } catch (_) {
    return { injected: {}, overrides: {} }
  }
}

function loadInjectedFromStorage() {
  try {
    const raw = localStorage.getItem(INJECTED_STORAGE_KEY)
    if (!raw) return {}
    const data = JSON.parse(raw)
    return data && typeof data === 'object' ? data : {}
  } catch {
    return {}
  }
}

function migrateLegacyStorage() {
  try {
    const raw = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (!raw) return {}
    const data = JSON.parse(raw)
    const items = Array.isArray(data?.slideItems) ? data.slideItems : []
    if (items.length === 0) return {}
    return { '/gallery': items }
  } catch {
    return {}
  }
}

function loadEditMode() {
  try {
    const v = localStorage.getItem(EDIT_MODE_STORAGE_KEY)
    return v === 'true'
  } catch {
    return false
  }
}

function loadPageOverrides() {
  try {
    const raw = localStorage.getItem(PAGE_OVERRIDES_STORAGE_KEY)
    if (!raw) return {}
    const data = JSON.parse(raw)
    if (!data || typeof data !== 'object') return {}
    // Sanitize: clear contentHtml that would cause blank (empty or too short)
    const out = {}
    for (const [route, elements] of Object.entries(data)) {
      if (!elements || typeof elements !== 'object') continue
      out[route] = {}
      for (const [id, overrides] of Object.entries(elements)) {
        const o = { ...overrides }
        const ch = o.contentHtml
        if (ch == null || (typeof ch === 'string' && ch.trim().length <= 10)) {
          delete o.contentHtml
        }
        out[route][id] = o
      }
    }
    return out
  } catch {
    return {}
  }
}

const SidebarLibraryContext = createContext(null)

export function useSidebarLibrary() {
  const ctx = useContext(SidebarLibraryContext)
  return ctx
}

export function SidebarLibraryProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [frames, setFrames] = useState(/** @type {Record<string, GalleryItem[]>} */ ({}))
  const [framesLoading, setFramesLoading] = useState(false)
  const [framesError, setFramesError] = useState(/** @type {string | null} */ (null))
  const [injectedByRoute, setInjectedByRoute] = useState(/** @type {Record<string, GalleryItem[]>} */ (() => {
    const stored = loadInjectedFromStorage()
    if (Object.keys(stored).length > 0) return stored
    return migrateLegacyStorage()
  }))
  const [editMode, setEditMode] = useState(loadEditMode)
  const [draggingFromLibrary, setDraggingFromLibrary] = useState(false)
  const [pageElementOverrides, setPageElementOverrides] = useState(/** @type {Record<string, Record<string, PageElementOverride>>} */ (loadPageOverrides))
  const [undoStack, setUndoStack] = useState(/** @type {Array<{ injected: Record<string, GalleryItem[]>; overrides: Record<string, Record<string, PageElementOverride>> }>} */ ([]))
  const [redoStack, setRedoStack] = useState(/** @type {Array<{ injected: Record<string, GalleryItem[]>; overrides: Record<string, Record<string, PageElementOverride>> }>} */ ([]))

  useEffect(() => {
    const data = JSON.stringify(injectedByRoute)
    try {
      localStorage.setItem(INJECTED_STORAGE_KEY, data)
    } catch (_) {}
  }, [injectedByRoute])

  useEffect(() => {
    const clearDragging = () => setDraggingFromLibrary(false)
    window.addEventListener('dragend', clearDragging)
    window.addEventListener('drop', clearDragging)
    return () => {
      window.removeEventListener('dragend', clearDragging)
      window.removeEventListener('drop', clearDragging)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(EDIT_MODE_STORAGE_KEY, String(editMode))
    } catch (_) {}
  }, [editMode])

  useEffect(() => {
    try {
      localStorage.setItem(PAGE_OVERRIDES_STORAGE_KEY, JSON.stringify(pageElementOverrides))
    } catch (_) {}
  }, [pageElementOverrides])

  const pushUndo = useCallback(() => {
    setUndoStack((prev) => [...prev.slice(-(MAX_UNDO - 1)), snapshot(injectedByRoute, pageElementOverrides)])
    setRedoStack([])
  }, [injectedByRoute, pageElementOverrides])

  const undo = useCallback(() => {
    if (undoStack.length === 0) return
    const last = undoStack[undoStack.length - 1]
    setRedoStack((r) => [...r, snapshot(injectedByRoute, pageElementOverrides)])
    setInjectedByRoute(last.injected)
    setPageElementOverrides(last.overrides)
    setUndoStack((prev) => prev.slice(0, -1))
  }, [injectedByRoute, pageElementOverrides, undoStack])

  const redo = useCallback(() => {
    if (redoStack.length === 0) return
    const last = redoStack[redoStack.length - 1]
    setUndoStack((u) => [...u, snapshot(injectedByRoute, pageElementOverrides)])
    setInjectedByRoute(last.injected)
    setPageElementOverrides(last.overrides)
    setRedoStack((prev) => prev.slice(0, -1))
  }, [injectedByRoute, pageElementOverrides, redoStack])

  const loadFrames = useCallback(() => {
    setFramesLoading(true)
    setFramesError(null)
    const url = `/figma-data.json?t=${Date.now()}`
    fetch(url, { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) throw new Error('figma-data.json not found. Export from Figma plugin first.')
        const data = JSON.parse(await res.text() || '{}')
        if (!data || typeof data !== 'object' || Array.isArray(data)) return {}
        const out = {}
        for (const [frameName, items] of Object.entries(data)) {
          if (Array.isArray(items)) out[frameName] = items.map((i) => ({ ...i, frameName }))
        }
        return out
      })
      .then(setFrames)
      .catch((e) => setFramesError(e.message))
      .finally(() => setFramesLoading(false))
  }, [])

  const addInjectedItem = useCallback((route, item, position) => {
    pushUndo()
    const slideId = `${item.id}-${Date.now()}`
    const hasImage = item.imagePath != null
    setInjectedByRoute((prev) => {
      const list = prev[route] ?? []
      const defaultLeft = position?.left ?? 80
      const defaultTop = position?.top ?? 80 + list.length * 36
      const newItem = {
        ...item,
        slideId,
        left: defaultLeft,
        top: defaultTop,
        width: hasImage ? 280 : undefined,
        height: hasImage ? 180 : undefined,
      }
      return { ...prev, [route]: [...list, newItem] }
    })
  }, [pushUndo])

  const removeInjectedItem = useCallback((route, slideId) => {
    pushUndo()
    setInjectedByRoute((prev) => {
      const list = (prev[route] ?? []).filter((i) => i.slideId !== slideId)
      return { ...prev, [route]: list }
    })
  }, [])

  const updateInjectedItem = useCallback((route, slideId, updates) => {
    const isStyleOrContent = ['text', 'html', 'fontColor', 'fontSize', 'highlightColor'].some((k) => updates[k] !== undefined)
    if (isStyleOrContent) pushUndo()
    setInjectedByRoute((prev) => {
      const list = (prev[route] ?? []).map((i) =>
        i.slideId === slideId ? { ...i, ...updates } : i
      )
      return { ...prev, [route]: list }
    })
  }, [pushUndo])

  const clearInjectedForRoute = useCallback((route) => {
    pushUndo()
    setInjectedByRoute((prev) => ({ ...prev, [route]: [] }))
  }, [pushUndo])

  const reorderInjected = useCallback((route, slideId, direction) => {
    pushUndo()
    setInjectedByRoute((prev) => {
      const list = [...(prev[route] ?? [])]
      const i = list.findIndex((it) => it.slideId === slideId)
      if (i === -1) return prev
      if (direction === 'front' && i < list.length - 1) {
        const [item] = list.splice(i, 1)
        list.push(item)
      } else if (direction === 'back' && i > 0) {
        const [item] = list.splice(i, 1)
        list.unshift(item)
      } else if (direction === 'forward' && i < list.length - 1) {
        ;[list[i], list[i + 1]] = [list[i + 1], list[i]]
      } else if (direction === 'backward' && i > 0) {
        ;[list[i - 1], list[i]] = [list[i], list[i - 1]]
      }
      return { ...prev, [route]: list }
    })
  }, [pushUndo])

  const updatePageElementOverride = useCallback((route, elementId, override) => {
    const isStyleOrContent = ['fontColor', 'fontSize', 'highlightColor', 'contentHtml'].some((k) => override[k] !== undefined)
    if (isStyleOrContent) pushUndo()
    setPageElementOverrides((prev) => {
      const routeOverrides = { ...(prev[route] ?? {}) }
      const current = routeOverrides[elementId] ?? {}
      routeOverrides[elementId] = { ...current, ...override }
      return { ...prev, [route]: routeOverrides }
    })
  }, [pushUndo])

  const value = {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar: useCallback(() => setSidebarOpen((o) => !o), []),
    editMode,
    setEditMode,
    toggleEditMode: useCallback(() => setEditMode((e) => !e), []),
    frames,
    framesLoading,
    framesError,
    loadFrames,
    injectedByRoute,
    addInjectedItem,
    removeInjectedItem,
    updateInjectedItem,
    clearInjectedForRoute,
    reorderInjected,
    pageElementOverrides,
    updatePageElementOverride,
    draggingFromLibrary,
    setDraggingFromLibrary,
    undo,
    redo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
  }

  return (
    <SidebarLibraryContext.Provider value={value}>
      {children}
    </SidebarLibraryContext.Provider>
  )
}
