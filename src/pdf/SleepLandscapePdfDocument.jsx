import React from 'react'
import { Document, Page, View, Text } from '@react-pdf/renderer'
import { sleepLandscapeSlides } from '../data/sleepLandscapeSlides'
import { sleepPdfStyles, SLIDE_WIDTH, SLIDE_HEIGHT, TABLE_COL_WIDTHS } from './sleepLandscapePdfStyles'

function chunkRows(rows, first, rest) {
  if (!rows?.length) return []
  const out = [rows.slice(0, first)]
  let i = first
  while (i < rows.length) {
    out.push(rows.slice(i, i + rest))
    i += rest
  }
  return out
}

function PageFooter({ n, total, extra = '' }) {
  return (
    <Text style={sleepPdfStyles.footer}>
      {n} / {total}
      {extra}
    </Text>
  )
}

function SlideHeader({ slide, continued }) {
  const th = slide.titleHighlight
  return (
    <View>
      <View style={sleepPdfStyles.headerRule} />
      {slide.title ? (
        <Text style={sleepPdfStyles.title}>
          {th ? (
            <>
              {slide.title.split(th)[0]}
              <Text style={sleepPdfStyles.titleAccent}>{th}</Text>
              {slide.title.split(th)[1]}
            </>
          ) : (
            slide.title
          )}
        </Text>
      ) : null}
      {slide.subtitle && !continued ? <Text style={sleepPdfStyles.subtitle}>{slide.subtitle}</Text> : null}
      {continued ? <Text style={sleepPdfStyles.continued}>Continued</Text> : null}
    </View>
  )
}

function CoverBody({ slide }) {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={[sleepPdfStyles.body, { fontSize: 10, color: '#e2e8f0', marginBottom: 12 }]}>
        Internal deck · Sleep Supplement Landscape Analysis (2021–2026)
      </Text>
      {slide.chapters?.map((ch) => (
        <View
          key={ch.label}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderColor: 'rgba(129,140,248,0.25)',
            backgroundColor: 'rgba(99,102,241,0.08)',
            borderRadius: 6,
            padding: 8,
            marginBottom: 6,
          }}
        >
          <Text style={{ fontSize: 9, color: '#e2e8f0' }}>{ch.label}</Text>
          <Text style={{ fontSize: 7, color: '#a5b4fc', fontFamily: 'Helvetica-Bold' }}>
            Slide {ch.slide ?? ch.slides}
          </Text>
        </View>
      ))}
    </View>
  )
}

function SummaryBody({ summary }) {
  return (
    <View>
      <View style={sleepPdfStyles.callout}>
        <Text style={[sleepPdfStyles.body, { fontSize: 9, color: '#f8fafc' }]}>{summary.headline}</Text>
      </View>
      <View style={[sleepPdfStyles.row, { marginTop: 8, marginBottom: 8 }]}>
        <View style={[sleepPdfStyles.card, { borderColor: 'rgba(251,113,133,0.3)' }]}>
          <Text style={[sleepPdfStyles.h3, { color: '#fda4af' }]}>Was</Text>
          <Text style={sleepPdfStyles.body}>{summary.shift.from}</Text>
        </View>
        <View style={[sleepPdfStyles.card, { borderColor: 'rgba(52,211,153,0.3)', marginLeft: 8 }]}>
          <Text style={[sleepPdfStyles.h3, { color: '#6ee7b7' }]}>Now</Text>
          <Text style={sleepPdfStyles.body}>{summary.shift.to}</Text>
        </View>
      </View>
      <Text style={sleepPdfStyles.h3}>Anchor ingredients</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
        {summary.anchorIngredients.map((ing) => (
          <Text key={ing} style={sleepPdfStyles.chip}>
            {ing}
          </Text>
        ))}
      </View>
      {summary.takeaways.map((t) => (
        <Text key={t} style={sleepPdfStyles.body}>
          • {t}
        </Text>
      ))}
    </View>
  )
}

function TimelineBody({ timeline, doseVisual }) {
  const trackW = 420
  return (
    <View>
      <View style={sleepPdfStyles.row}>
        {timeline.map((phase, i) => (
          <View
            key={phase.years}
            style={[
              sleepPdfStyles.card,
              { marginLeft: i > 0 ? 6 : 0, borderColor: 'rgba(129,140,248,0.25)' },
            ]}
          >
            <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#a5b4fc', marginBottom: 2 }}>
              {phase.years}
            </Text>
            <Text style={sleepPdfStyles.cardTitle}>{phase.title}</Text>
            <Text style={sleepPdfStyles.body}>Melatonin: {phase.melatonin}</Text>
            <Text style={sleepPdfStyles.body}>Focus: {phase.focus}</Text>
            <Text style={sleepPdfStyles.body}>{phase.formats}</Text>
          </View>
        ))}
      </View>
      {doseVisual && (
        <View style={[sleepPdfStyles.card, { marginTop: 8 }]}>
          <Text style={sleepPdfStyles.h3}>Melatonin dose band shift</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
            <Text style={{ fontSize: 7, color: '#64748b' }}>{doseVisual.legacy.label}</Text>
            <Text style={{ fontSize: 7, color: '#fda4af' }}>{doseVisual.legacy.mg}</Text>
          </View>
          <View style={[sleepPdfStyles.barTrack, { width: trackW }]}>
            <View style={[sleepPdfStyles.barFillRose, { width: trackW }]} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
            <Text style={{ fontSize: 7, color: '#64748b' }}>{doseVisual.modern.label}</Text>
            <Text style={{ fontSize: 7, color: '#6ee7b7' }}>{doseVisual.modern.mg}</Text>
          </View>
          <View style={[sleepPdfStyles.barTrack, { width: trackW }]}>
            <View
              style={[sleepPdfStyles.barFillEmerald, { width: (trackW * doseVisual.modern.widthPct) / 100 }]}
            />
          </View>
        </View>
      )}
    </View>
  )
}

function BrandTable({ tableTitle, columns, rows, colWidths }) {
  const widths = colWidths || TABLE_COL_WIDTHS.fourCol
  return (
    <View>
      {tableTitle ? <Text style={[sleepPdfStyles.h3, { marginTop: 4 }]}>{tableTitle}</Text> : null}
      <View style={{ marginTop: 4 }}>
        <View style={sleepPdfStyles.tableHeader}>
          {columns.map((col, i) => (
            <Text
              key={col}
              style={[
                { width: widths[i], fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#a5b4fc' },
              ]}
            >
              {col}
            </Text>
          ))}
        </View>
        {rows.map((row, ri) => (
          <View
            key={ri}
            style={[
              sleepPdfStyles.tableRow,
              { backgroundColor: ri % 2 === 0 ? 'rgba(15,23,42,0.4)' : 'transparent' },
            ]}
            wrap={false}
          >
            {row.map((cell, ci) => (
              <Text
                key={ci}
                style={[
                  ci === 0 ? sleepPdfStyles.tableCellBold : sleepPdfStyles.tableCell,
                  { width: widths[ci] },
                ]}
              >
                {cell}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  )
}

function PillarsBody({ intro, pillars }) {
  return (
    <View>
      <Text style={sleepPdfStyles.body}>{intro}</Text>
      <View style={[sleepPdfStyles.row, { flexWrap: 'wrap', marginTop: 6 }]}>
        {pillars.map((p, i) => (
          <View
            key={p.title}
            style={[
              sleepPdfStyles.card,
              { width: '48%', marginBottom: 8, marginLeft: i % 2 === 1 ? 8 : 0 },
            ]}
          >
            <Text style={[sleepPdfStyles.cardTitle, { color: '#a5b4fc' }]}>{p.title}</Text>
            <Text style={sleepPdfStyles.body}>{p.items.join(' · ')}</Text>
            <Text style={{ fontSize: 7, color: '#64748b', marginTop: 2 }}>{p.detail}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

function TrendsBody({ trends, implication }) {
  return (
    <View>
      <View style={sleepPdfStyles.row}>
        {trends.map((t, i) => (
          <View key={t.title} style={[sleepPdfStyles.card, { marginLeft: i > 0 ? 6 : 0 }]}>
            <Text style={sleepPdfStyles.cardTitle}>{t.title}</Text>
            <Text style={sleepPdfStyles.body}>{t.body}</Text>
          </View>
        ))}
      </View>
      {implication && (
        <View style={[sleepPdfStyles.callout, { marginTop: 10 }]}>
          <Text style={sleepPdfStyles.h3}>Implication for Ate Days</Text>
          <Text style={sleepPdfStyles.body}>{implication}</Text>
        </View>
      )}
    </View>
  )
}

function SlidePage({ slide, pageNum, deckTotal, continued, children, footerExtra = '' }) {
  return (
    <Page size={[SLIDE_WIDTH, SLIDE_HEIGHT]} style={sleepPdfStyles.page}>
      <PageFooter n={pageNum} total={deckTotal} extra={footerExtra} />
      <SlideHeader slide={slide} continued={continued} />
      {children}
    </Page>
  )
}

function slideToPages(slide, slideIndex, deckTotal, pageNumStart) {
  const pages = []
  let pageNum = pageNumStart

  if (slide.layout === 'landscapeCover') {
    pages.push(
      <SlidePage key={slide.id} slide={slide} pageNum={pageNum} deckTotal={deckTotal}>
        <CoverBody slide={slide} />
      </SlidePage>,
    )
    return { pages, nextPage: pageNum + 1 }
  }

  if (slide.layout === 'landscapeSummary') {
    pages.push(
      <SlidePage key={slide.id} slide={slide} pageNum={pageNum} deckTotal={deckTotal}>
        <SummaryBody summary={slide.summary} />
      </SlidePage>,
    )
    return { pages, nextPage: pageNum + 1 }
  }

  if (slide.layout === 'landscapeTimeline') {
    pages.push(
      <SlidePage key={slide.id} slide={slide} pageNum={pageNum} deckTotal={deckTotal}>
        <TimelineBody timeline={slide.timeline} doseVisual={slide.doseVisual} />
      </SlidePage>,
    )
    return { pages, nextPage: pageNum + 1 }
  }

  if (slide.layout === 'landscapeBrandTable') {
    const chunks =
      slide.rows.length > 7 ? chunkRows(slide.rows, 7, 8) : [slide.rows]
    chunks.forEach((chunk, ci) => {
      pages.push(
        <SlidePage
          key={`${slide.id}-${ci}`}
          slide={slide}
          pageNum={pageNum}
          deckTotal={deckTotal}
          continued={ci > 0}
          footerExtra={ci > 0 ? ' · cont.' : ''}
        >
          <BrandTable
            tableTitle={ci === 0 ? slide.tableTitle : undefined}
            columns={slide.columns}
            rows={chunk}
          />
        </SlidePage>,
      )
      pageNum += 1
    })
    return { pages, nextPage: pageNum }
  }

  if (slide.layout === 'landscapeIngredientPillars') {
    pages.push(
      <SlidePage key={slide.id} slide={slide} pageNum={pageNum} deckTotal={deckTotal}>
        <PillarsBody intro={slide.intro} pillars={slide.pillars} />
      </SlidePage>,
    )
    return { pages, nextPage: pageNum + 1 }
  }

  if (slide.layout === 'landscapeTrends') {
    pages.push(
      <SlidePage key={slide.id} slide={slide} pageNum={pageNum} deckTotal={deckTotal}>
        <TrendsBody trends={slide.trends} implication={slide.implication} />
      </SlidePage>,
    )
    return { pages, nextPage: pageNum + 1 }
  }

  return { pages, nextPage: pageNum }
}

function countDeckPages(slides) {
  let n = 0
  slides.forEach((slide) => {
    if (slide.layout === 'landscapeBrandTable' && slide.rows.length > 7) {
      const chunks = chunkRows(slide.rows, 7, 8)
      n += chunks.length
    } else {
      n += 1
    }
  })
  return n
}

export function SleepLandscapePdfDocument() {
  const slides = sleepLandscapeSlides
  const deckTotal = countDeckPages(slides)
  const allPages = []
  let pageNum = 1
  slides.forEach((slide) => {
    const { pages, nextPage } = slideToPages(slide, 0, deckTotal, pageNum)
    allPages.push(...pages)
    pageNum = nextPage
  })

  return (
    <Document
      title="Sleep Supplement Landscape (2021–2026)"
      author="Ate Days"
      subject="Internal market analysis"
    >
      {allPages}
    </Document>
  )
}
