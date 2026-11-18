import { useEffect } from 'react'
import modelHtml from '../assets/summs-dtc-model.html?raw'

/**
 * Full-viewport interactive DTC model.
 * Served via React route because Vercel SPA rewrites swallow standalone .html files.
 */
export function SummsDtcModelPage() {
  useEffect(() => {
    const prev = document.title
    document.title = 'SUMMS DTC Interactive Model'
    return () => {
      document.title = prev
    }
  }, [])

  return (
    <iframe
      title="SUMMS DTC Interactive Model"
      srcDoc={modelHtml}
      className="fixed inset-0 z-[100] h-screen w-screen border-0 bg-[#f4f7f5]"
    />
  )
}
