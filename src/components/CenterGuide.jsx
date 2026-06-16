import { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useSidebarLibrary } from '../context/SidebarLibraryContext'

const CENTER_THRESHOLD_PX = 12
const SIDEBAR_WIDTH_PX = 288 // 18rem

function getPageCenterX(sidebarOpen) {
  const w = window.innerWidth
  if (sidebarOpen) return SIDEBAR_WIDTH_PX + (w - SIDEBAR_WIDTH_PX) / 2
  return w / 2
}

/**
 * When in edit mode, shows a vertical center guide line (PowerPoint-style) when any
 * positioned module (EditableElement or injected item) is horizontally centered on the page.
 */
export function CenterGuide({ containerRef }) {
  const { pathname } = useLocation()
  const { editMode, sidebarOpen, pageElementOverrides, injectedByRoute } = useSidebarLibrary()
  const [showLine, setShowLine] = useState(false)
  const rafRef = useRef(0)

  const checkCentered = useCallback(() => {
    if (!editMode || !containerRef?.current) {
      setShowLine(false)
      return
    }
    const rect = containerRef.current.getBoundingClientRect()
    const viewportCenter = getPageCenterX(sidebarOpen)
    const viewportTop = 0
    const viewportBottom = window.innerHeight

    // Element must be horizontally centered AND visible in the viewport (so we don't show the line for centered elements on other slides)
    const isElementCenteredAndVisible = (left, top, width, height) => {
      if (left == null || width == null || width <= 0) return false
      const elementCenterX = rect.left + left + width / 2
      if (Math.abs(elementCenterX - viewportCenter) > CENTER_THRESHOLD_PX) return false
      const elementTop = rect.top + (top ?? 0)
      const elementBottom = elementTop + (height ?? 100)
      return elementBottom > viewportTop && elementTop < viewportBottom
    }

    const overrides = pageElementOverrides[pathname]
    if (overrides && typeof overrides === 'object') {
      for (const o of Object.values(overrides)) {
        if (o && (o.left != null || o.top != null)) {
          const left = o.left ?? 0
          const top = o.top ?? 0
          const width = o.width ?? 200
          const height = o.height ?? 100
          if (isElementCenteredAndVisible(left, top, width, height)) {
            setShowLine(true)
            return
          }
        }
      }
    }

    const injected = injectedByRoute[pathname]
    if (Array.isArray(injected)) {
      for (const item of injected) {
        const left = item.left ?? 0
        const top = item.top ?? 0
        const width = item.width ?? 200
        const height = item.height ?? 150
        if (isElementCenteredAndVisible(left, top, width, height)) {
          setShowLine(true)
          return
        }
      }
    }

    setShowLine(false)
  }, [editMode, pathname, sidebarOpen, pageElementOverrides, injectedByRoute, containerRef])

  useEffect(() => {
    if (!editMode) {
      setShowLine(false)
      return
    }
    const container = containerRef?.current
    if (!container) return

    const scheduleCheck = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(checkCentered)
    }

    scheduleCheck()
    window.addEventListener('scroll', scheduleCheck, { passive: true })
    window.addEventListener('resize', scheduleCheck)
    const observer = new ResizeObserver(scheduleCheck)
    observer.observe(container)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', scheduleCheck)
      window.removeEventListener('resize', scheduleCheck)
      observer.disconnect()
    }
  }, [editMode, checkCentered, containerRef])

  if (!editMode || !showLine) return null

  const centerX = getPageCenterX(sidebarOpen)
  return (
    <div
      className="pointer-events-none fixed inset-y-0 z-[44]"
      style={{ left: centerX, width: 0 }}
      aria-hidden
    >
      <div
        className="h-full w-0 border-l-2 border-dashed border-emerald-400/90"
        style={{ boxShadow: '0 0 8px rgba(52, 211, 153, 0.4)', animation: 'centerGuideFlash 0.25s ease-out' }}
      />
    </div>
  )
}
