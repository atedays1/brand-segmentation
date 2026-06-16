import { StyleSheet } from '@react-pdf/renderer'

/** PowerPoint widescreen 16:9 — 13.333" × 7.5" at 72 pt/in */
export const SLIDE_WIDTH = 960
export const SLIDE_HEIGHT = 540

export const sleepPdfStyles = StyleSheet.create({
  page: {
    backgroundColor: '#020617',
    color: '#e2e8f0',
    fontFamily: 'Helvetica',
    paddingTop: 28,
    paddingBottom: 32,
    paddingHorizontal: 40,
    width: SLIDE_WIDTH,
    height: SLIDE_HEIGHT,
  },
  headerRule: {
    height: 3,
    width: 48,
    backgroundColor: '#818cf8',
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 14,
    right: 40,
    fontSize: 7,
    color: '#64748b',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: '#f8fafc',
    marginBottom: 4,
    lineHeight: 1.15,
  },
  titleAccent: {
    color: '#818cf8',
    fontFamily: 'Helvetica-Bold',
  },
  subtitle: {
    fontSize: 9,
    color: '#94a3b8',
    marginBottom: 10,
    lineHeight: 1.35,
  },
  continued: {
    fontSize: 8,
    color: '#64748b',
    marginBottom: 6,
  },
  h3: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#a5b4fc',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  body: {
    fontSize: 8,
    color: '#cbd5e1',
    lineHeight: 1.4,
    marginBottom: 6,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
    color: '#f1f5f9',
  },
  chip: {
    fontSize: 7,
    color: '#c7d2fe',
    backgroundColor: 'rgba(99,102,241,0.15)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(30,41,59,0.5)',
    borderRadius: 6,
    padding: 8,
    flex: 1,
  },
  cardTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#f8fafc',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(51,65,85,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 3,
    paddingHorizontal: 4,
  },
  tableCell: {
    fontSize: 6.5,
    color: '#94a3b8',
    lineHeight: 1.3,
  },
  tableCellBold: {
    fontSize: 6.5,
    fontFamily: 'Helvetica-Bold',
    color: '#f8fafc',
    lineHeight: 1.3,
  },
  callout: {
    borderWidth: 1,
    borderColor: 'rgba(129,140,248,0.35)',
    backgroundColor: 'rgba(99,102,241,0.1)',
    borderRadius: 6,
    padding: 8,
    marginTop: 6,
  },
  barTrack: {
    height: 6,
    backgroundColor: 'rgba(30,41,59,0.8)',
    borderRadius: 3,
    marginTop: 2,
    marginBottom: 6,
  },
  barFillRose: {
    height: 6,
    backgroundColor: 'rgba(251,113,133,0.75)',
    borderRadius: 3,
  },
  barFillEmerald: {
    height: 6,
    backgroundColor: 'rgba(52,211,153,0.75)',
    borderRadius: 3,
  },
})

export const TABLE_COL_WIDTHS = {
  fourCol: ['28%', '22%', '18%', '32%'],
}
