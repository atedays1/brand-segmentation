import { REPORT_CAPTURE_WIDTH } from '../components/landscape/SleepLandscapeReport.jsx'

/** Landscape letter width in PDF points (11 in @ 72 pt). */
const PDF_WIDTH_PT = 792

/** 3× capture (~288 DPI on an 11″ page) for crisp text and UI in print/PDF viewers. */
const CAPTURE_PIXEL_RATIO = 3

/**
 * Capture logical report sections and assemble a PDF with variable-height pages.
 */
export async function exportReportToPdf({ elements, filename }) {
  const { jsPDF } = await import('jspdf')
  const { toPng } = await import('html-to-image')

  const pdf = new jsPDF({
    unit: 'pt',
    compress: true,
  })

  let isFirst = true

  for (const el of elements) {
    if (!el) continue

    const heightPx = el.scrollHeight
    const heightPt = (heightPx / REPORT_CAPTURE_WIDTH) * PDF_WIDTH_PT

    const dataUrl = await toPng(el, {
      width: REPORT_CAPTURE_WIDTH,
      height: heightPx,
      pixelRatio: CAPTURE_PIXEL_RATIO,
      backgroundColor: '#020617',
      cacheBust: true,
    })

    const orientation = PDF_WIDTH_PT >= heightPt ? 'landscape' : 'portrait'
    if (isFirst) {
      pdf.deletePage(1)
      pdf.addPage([PDF_WIDTH_PT, heightPt], orientation)
      isFirst = false
    } else {
      pdf.addPage([PDF_WIDTH_PT, heightPt], orientation)
    }

    pdf.addImage(dataUrl, 'PNG', 0, 0, PDF_WIDTH_PT, heightPt, undefined, 'SLOW')
  }

  pdf.save(filename)
}
