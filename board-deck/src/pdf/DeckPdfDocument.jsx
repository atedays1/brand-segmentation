import { Document, Page, View, Text, Svg, Path } from '@react-pdf/renderer'
import { boardDeckSlides } from '../data/boardDeckSlides'
import {
  WEBSITE_BUDGET_CAPEX,
  WEBSITE_BUDGET_OPEX,
  WEBSITE_BUDGET_VARIABLE,
  WEBSITE_BUDGET_TOTALS,
  sumMid,
  formatMoneyRange,
} from '../data/websiteBudgetData'
import { pdfStyles, CHART_COLORS } from './deckPdfStyles'

function chunkSections(sections, size) {
  if (!sections?.length) return []
  const out = []
  for (let i = 0; i < sections.length; i += size) {
    out.push(sections.slice(i, i + size))
  }
  return out
}

function chunkRows(rows, firstCount, restCount) {
  if (!rows?.length) return []
  const chunks = []
  let i = 0
  chunks.push(rows.slice(i, i + firstCount))
  i += firstCount
  while (i < rows.length) {
    chunks.push(rows.slice(i, i + restCount))
    i += restCount
  }
  return chunks
}

function polar(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcSlicePath(cx, cy, r, startPct, endPct) {
  const startAngle = (startPct / 100) * 360 - 90
  const endAngle = (endPct / 100) * 360 - 90
  const p1 = polar(cx, cy, r, startAngle)
  const p2 = polar(cx, cy, r, endAngle)
  const large = endAngle - startAngle > 180 ? 1 : 0
  return `M ${cx} ${cy} L ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} Z`
}

function PieAndLegend({ chart, size = 112, colors = CHART_COLORS }) {
  const cx = size / 2
  const cy = size / 2
  const rad = size / 2 - 2
  let cum = 0
  return (
    <View style={[pdfStyles.row, { alignItems: 'center' }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {chart.segments.map((seg, i) => {
          const start = cum
          cum += seg.pct
          const d = arcSlicePath(cx, cy, rad, start, cum)
          return <Path key={seg.label} d={d} fill={colors[i % colors.length]} />
        })}
      </Svg>
      <View style={{ marginLeft: 10, flex: 1 }}>
        {chart.segments.map((seg, i) => (
          <Text key={seg.label} style={pdfStyles.legendItem}>
            {seg.label} — {seg.pct}%
          </Text>
        ))}
        <Text style={pdfStyles.cardSource}>Source: {chart.source}</Text>
      </View>
    </View>
  )
}

function PieCard({ chart, headline }) {
  return (
    <View style={[pdfStyles.card, { flex: 1 }]}>
      <Text style={pdfStyles.cardTitle}>{headline}</Text>
      <PieAndLegend chart={chart} />
    </View>
  )
}

function SlideHeader({ slide, showContinued }) {
  const th = slide.titleHighlight
  return (
    <View style={{ marginBottom: 8 }}>
      <View style={pdfStyles.headerRule} />
      {slide.title ? (
        <Text style={pdfStyles.title}>
          {th ? (
            <>
              {slide.title.split(th)[0]}
              <Text style={pdfStyles.titleAccent}>{th}</Text>
              {slide.title.split(th)[1]}
            </>
          ) : (
            slide.title
          )}
        </Text>
      ) : null}
      {slide.highlight ? (
        <Text style={pdfStyles.highlight}>{slide.highlight}</Text>
      ) : null}
      {slide.subtitle ? <Text style={pdfStyles.subtitle}>{slide.subtitle}</Text> : null}
      {showContinued ? <Text style={pdfStyles.continued}>Continued</Text> : null}
      {slide.quote ? (
        <Text style={pdfStyles.quote}>{slide.quote}</Text>
      ) : null}
    </View>
  )
}

function IntroBlock({ slide }) {
  if (slide.introParts?.length) {
    return (
      <Text style={pdfStyles.intro}>
        {slide.introParts.map((p, i) => (
          <Text key={i} style={p.bold ? pdfStyles.bold : {}}>
            {p.text}
          </Text>
        ))}
      </Text>
    )
  }
  if (slide.intro) {
    return <Text style={pdfStyles.intro}>{slide.intro}</Text>
  }
  return null
}

function ReportCharts({ slide }) {
  const nodes = []
  if (slide.marketShareChart && slide.marketShareChartByChannel) {
    nodes.push(
      <View key="pair" style={[pdfStyles.row, { marginBottom: 10 }]}>
        <PieCard
          chart={slide.marketShareChart}
          headline="$69.28B supplement industry market share by product category, 2024"
        />
        <View style={{ width: 10 }} />
        <PieCard
          chart={slide.marketShareChartByChannel}
          headline="$69.28B supplement market share by channel, 2024"
        />
      </View>,
    )
  } else {
    if (slide.marketShareChart) {
      nodes.push(
        <View key="cat" style={{ marginBottom: 8 }}>
          <PieCard
            chart={slide.marketShareChart}
            headline="$69.28B supplement industry market share by product category, 2024"
          />
        </View>,
      )
    }
    if (slide.marketShareChartByChannel) {
      nodes.push(
        <View key="ch" style={{ marginBottom: 8 }}>
          <PieCard
            chart={slide.marketShareChartByChannel}
            headline="$69.28B supplement market share by channel, 2024"
          />
        </View>,
      )
    }
  }
  if (slide.deliveryFormatChart) {
    const c = slide.deliveryFormatChart
    nodes.push(
      <View key="delivery" style={{ marginBottom: 8 }}>
        <View style={pdfStyles.card}>
          <Text style={pdfStyles.cardTitle}>{c.cardTitle}</Text>
          <PieAndLegend chart={c} />
        </View>
      </View>,
    )
  }
  if (slide.pillFatigueCard) {
    const card = slide.pillFatigueCard
    nodes.push(
      <View key="pill" style={{ marginBottom: 8 }}>
        <View style={pdfStyles.card}>
          <Text style={pdfStyles.cardTitle}>{card.title}</Text>
          {card.points.map((pt, i) => (
            <Text key={i} style={{ fontSize: 9, color: '#cbd5e1', marginBottom: 4 }}>
              <Text style={pdfStyles.bold}>{pt.label}</Text> {pt.stat} — {pt.detail}
            </Text>
          ))}
          <Text style={{ fontSize: 10, color: '#e2e8f0', marginTop: 6, fontFamily: 'Helvetica-Bold' }}>
            {card.takeaway}
          </Text>
          <Text style={pdfStyles.cardSource}>Source: {card.source}</Text>
        </View>
      </View>,
    )
  }
  return <View>{nodes}</View>
}

function SectionBlock({ section, isRec }) {
  const inner = (
    <>
      <Text style={pdfStyles.sectionHeading}>{section.heading}</Text>
      {(section.lines || []).map((line, li) => {
        const parts = line.parts || (typeof line === 'string' ? [{ text: line }] : [])
        if (!line.parts && typeof line === 'string') {
          return (
            <Text key={li} style={pdfStyles.bulletLine}>
              <Text style={pdfStyles.bulletMarker}>● </Text>
              {line}
            </Text>
          )
        }
        return (
          <Text key={li} style={pdfStyles.bulletLine}>
            <Text style={pdfStyles.bulletMarker}>● </Text>
            {parts.map((p, pi) => (
              <Text key={pi} style={p.bold ? pdfStyles.bold : {}}>
                {p.text}
              </Text>
            ))}
          </Text>
        )
      })}
    </>
  )

  if (isRec) {
    return <View style={pdfStyles.recommendationsBox}>{inner}</View>
  }
  return <View style={{ marginBottom: 6 }}>{inner}</View>
}

function MarkdownLine({ str, style }) {
  if (typeof str !== 'string') return null
  const parts = str.split(/(\*\*.*?\*\*)/g)
  return (
    <Text style={style}>
      {parts.map((s, i) => {
        const m = s.match(/^\*\*(.*?)\*\*$/)
        if (m) {
          return (
            <Text key={i} style={pdfStyles.bold}>
              {m[1]}
            </Text>
          )
        }
        return <Text key={i}>{s}</Text>
      })}
    </Text>
  )
}

function DefaultSlideBody({ slide }) {
  return (
    <>
      <IntroBlock slide={slide} />
      {slide.bullets?.length ? (
        <View style={{ marginTop: 4 }}>
          {slide.bullets.map((b, i) => {
            if (typeof b === 'string') {
              return (
                <Text key={i} style={pdfStyles.bulletLine}>
                  <Text style={pdfStyles.bulletMarker}>● </Text>
                  {b}
                </Text>
              )
            }
            const t = b.text ?? String(b)
            return (
              <Text key={i} style={pdfStyles.bulletLine}>
                <Text style={pdfStyles.bulletMarker}>● </Text>
                {b.bold ? <Text style={pdfStyles.bold}>{t}</Text> : t}
              </Text>
            )
          })}
        </View>
      ) : null}
    </>
  )
}

function TakeawaysBody({ slide }) {
  return (
    <>
      <View style={pdfStyles.row}>
        {slide.pillars?.map((pillar, i) => (
          <View key={pillar.header} style={[pdfStyles.card, { flex: 1, marginLeft: i > 0 ? 8 : 0 }]}>
            <Text style={pdfStyles.cardTitle}>{pillar.header}</Text>
            <Text style={pdfStyles.pillarStat}>
              {pillar.stat}
              {pillar.statLabel ? (
                <Text style={{ fontSize: 8, color: '#94a3b8', fontFamily: 'Helvetica' }}>
                  {' '}
                  {pillar.statLabel}
                </Text>
              ) : null}
            </Text>
            <MarkdownLine str={pillar.content} style={{ fontSize: 9, color: '#cbd5e1', lineHeight: 1.4, marginTop: 6 }} />
          </View>
        ))}
      </View>
      {slide.verdict ? (
        <View style={pdfStyles.verdictBox}>
          <Text style={pdfStyles.verdictLabel}>The Strategic Verdict</Text>
          <Text style={pdfStyles.verdictText}>{slide.verdict}</Text>
        </View>
      ) : null}
      {slide.thesis ? <MarkdownLine str={slide.thesis} style={pdfStyles.thesis} /> : null}
    </>
  )
}

function StrategyBody({ slide }) {
  return (
    <>
      {slide.strategyPillarsTitle ? (
        <Text style={pdfStyles.h2small}>{slide.strategyPillarsTitle}</Text>
      ) : null}
      <View style={pdfStyles.row}>
        {slide.strategyPillars?.map((pillar, idx) => (
          <View key={pillar.title} style={[pdfStyles.card, { flex: 1, marginLeft: idx > 0 ? 6 : 0 }]}>
            <Text style={pdfStyles.cardTitle}>{pillar.title}</Text>
            <MarkdownLine str={pillar.content} style={{ fontSize: 9, color: '#cbd5e1', lineHeight: 1.4 }} />
          </View>
        ))}
      </View>
      {slide.strategyD2c ? (
        <View style={[pdfStyles.card, { marginTop: 10 }]}>
          <Text style={pdfStyles.cardTitle}>{slide.strategyD2c.title}</Text>
          {slide.strategyD2c.points.map((pt, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <MarkdownLine str={pt.content} style={{ fontSize: 9, color: '#cbd5e1', lineHeight: 1.4 }} />
              {pt.investorInsight ? (
                <Text style={{ fontSize: 8, color: '#10b981', marginTop: 2, fontStyle: 'italic' }}>
                  {pt.investorInsight}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}
      {slide.verdict ? (
        <View style={pdfStyles.verdictBox}>
          <Text style={pdfStyles.verdictLabel}>{slide.strategyVerdictLabel || 'Verdict'}</Text>
          <Text style={pdfStyles.verdictText}>{slide.verdict}</Text>
        </View>
      ) : null}
    </>
  )
}

function BudgetStackedBar({ rows, colors }) {
  const total = sumMid(rows)
  return (
    <View style={{ flexDirection: 'row', height: 11, borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
      {rows.map((row, i) => (
        <View
          key={row.label}
          style={{
            flex: total > 0 ? row.mid : 0,
            backgroundColor: colors[i % colors.length],
            height: '100%',
          }}
        />
      ))}
    </View>
  )
}

function BudgetLegendPdf({ rows, colors, fontSize = 6.5 }) {
  return (
    <View>
      {rows.map((row, i) => (
        <View key={row.label} style={{ flexDirection: 'row', marginBottom: 3 }} wrap={false}>
          <View style={{ width: 5, height: 5, backgroundColor: colors[i % colors.length], marginRight: 4, marginTop: 1 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize, color: '#e2e8f0', lineHeight: 1.35 }}>
              <Text style={pdfStyles.bold}>{row.label}</Text>
              {'  '}
              <Text style={{ color: '#34d399' }}>{formatMoneyRange(row.min, row.max)}</Text>
            </Text>
            <Text style={{ fontSize: fontSize - 0.5, color: '#64748b', marginTop: 0.5 }}>{row.detail}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

function BudgetBody() {
  const t = WEBSITE_BUDGET_TOTALS
  const colors = CHART_COLORS
  return (
    <>
      <View style={[pdfStyles.row, { marginBottom: 6 }]}>
        <View style={[pdfStyles.card, { flex: 1, marginRight: 6, borderColor: 'rgba(16,185,129,0.35)' }]}>
          <Text style={{ fontSize: 7, color: '#94a3b8', marginBottom: 2, fontFamily: 'Helvetica-Bold' }}>ONE-TIME BUILD</Text>
          <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#f8fafc' }}>
            {formatMoneyRange(t.capex.min, t.capex.max)}
          </Text>
          <Text style={{ fontSize: 6.5, color: '#64748b', marginTop: 4 }}>Estimated range — not a fixed quote.</Text>
        </View>
        <View style={[pdfStyles.card, { flex: 1, borderColor: 'rgba(56,189,248,0.35)' }]}>
          <Text style={{ fontSize: 7, color: '#94a3b8', marginBottom: 2, fontFamily: 'Helvetica-Bold' }}>RECURRING (MONTHLY)</Text>
          <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#f8fafc' }}>
            {formatMoneyRange(t.opexMonthly.min, t.opexMonthly.max)} / mo
          </Text>
          <Text style={{ fontSize: 8, color: '#94a3b8', marginTop: 4 }}>
            ~{formatMoneyRange(t.opexAnnual.min, t.opexAnnual.max)} / year (monthly × 12)
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 6.5, color: '#64748b', marginBottom: 6, lineHeight: 1.35 }}>
        Segment widths in the bars below use the midpoint of each estimated range for illustration of share only.
      </Text>
      <View style={[pdfStyles.row, { alignItems: 'flex-start' }]}>
        <View style={[pdfStyles.card, { flex: 1, marginRight: 5 }]}>
          <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#f8fafc', marginBottom: 2 }}>Lane A — One-time (build)</Text>
          <Text style={{ fontSize: 6.5, color: '#64748b', marginBottom: 4 }}>CAPEX composition</Text>
          <BudgetStackedBar rows={WEBSITE_BUDGET_CAPEX} colors={colors} />
          <BudgetLegendPdf rows={WEBSITE_BUDGET_CAPEX} colors={colors} />
          <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#34d399', marginTop: 5, paddingTop: 4, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' }}>
            Total CAPEX: {formatMoneyRange(t.capex.min, t.capex.max, false)}
          </Text>
        </View>
        <View style={[pdfStyles.card, { flex: 1 }]}>
          <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#f8fafc', marginBottom: 2 }}>Lane B — Fixed monthly (operations)</Text>
          <Text style={{ fontSize: 6.5, color: '#64748b', marginBottom: 4 }}>OPEX (excludes ad spend and payroll)</Text>
          <BudgetStackedBar rows={WEBSITE_BUDGET_OPEX} colors={colors} />
          <BudgetLegendPdf rows={WEBSITE_BUDGET_OPEX} colors={colors} />
          <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#38bdf8', marginTop: 5, paddingTop: 4, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' }}>
            Total OPEX: {formatMoneyRange(t.opexMonthly.min, t.opexMonthly.max, false)} / month
          </Text>
        </View>
      </View>
      <View style={[pdfStyles.card, { marginTop: 6, borderColor: 'rgba(245,158,11,0.4)', backgroundColor: 'rgba(245,158,11,0.06)' }]}>
        <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#fcd34d', marginBottom: 3 }}>Variable — scales with sales</Text>
        <Text style={{ fontSize: 6.5, color: '#cbd5e1', marginBottom: 5, lineHeight: 1.35 }}>
          These are not part of the monthly OPEX total above. They fluctuate with volume and payment mix.
        </Text>
        {WEBSITE_BUDGET_VARIABLE.map((v, vi) => (
          <View
            key={v.label}
            style={{
              marginBottom: vi < WEBSITE_BUDGET_VARIABLE.length - 1 ? 4 : 0,
              paddingBottom: vi < WEBSITE_BUDGET_VARIABLE.length - 1 ? 3 : 0,
              borderBottomWidth: vi < WEBSITE_BUDGET_VARIABLE.length - 1 ? 1 : 0,
              borderBottomColor: 'rgba(245,158,11,0.12)',
            }}
          >
            <Text style={{ fontSize: 7, color: '#f8fafc' }}>
              <Text style={pdfStyles.bold}>{v.label}</Text>
              {' — '}
              <Text style={{ color: '#94a3b8' }}>{v.detail}</Text>
            </Text>
            <Text style={{ fontSize: 7, color: '#fde68a', marginTop: 1 }}>{v.fee}</Text>
          </View>
        ))}
      </View>
      <Text style={{ fontSize: 6, color: '#64748b', marginTop: 6, lineHeight: 1.4 }}>
        Monthly OPEX excludes advertising spend and payroll. Ranges are estimates; phasing of cash outflows by month is not shown on this one-pager.
      </Text>
    </>
  )
}

function EcommerceBody({ slide }) {
  const ecoColors = ['#38bdf8', '#10b981', '#f59e0b', '#f97316', '#a855f7', '#ec4899']
  return (
    <View style={pdfStyles.row}>
      {slide.ecommerceGrowth ? (
        <View style={[pdfStyles.card, { flex: 1, marginRight: 6 }]}>
          <Text style={pdfStyles.cardTitle}>{slide.ecommerceGrowth.title}</Text>
          <Text style={{ fontSize: 9, color: '#cbd5e1', marginBottom: 6 }}>
            {slide.ecommerceGrowth.totalGrowth2020} (2020) → {slide.ecommerceGrowth.totalGrowth2028e} (2028e)
          </Text>
          <Text style={{ fontSize: 8, color: '#94a3b8', marginBottom: 6 }}>{slide.ecommerceGrowth.highlight}</Text>
          {slide.ecommerceGrowth.categories.map((cat, i) => (
            <Text key={i} style={{ fontSize: 8, color: '#cbd5e1', marginBottom: 3 }}>
              <Text style={pdfStyles.bold}>{cat.name}</Text> {cat.growth} — {cat.note}
            </Text>
          ))}
          <Text style={pdfStyles.cardSource}>Source: {slide.ecommerceGrowth.source}</Text>
        </View>
      ) : null}
      {slide.ecommerceShare ? (
        <View style={[pdfStyles.card, { flex: 1, marginRight: 6 }]}>
          <Text style={pdfStyles.cardTitle}>{slide.ecommerceShare.title}</Text>
          <View style={{ alignItems: 'center', marginVertical: 6 }}>
            <Svg width={100} height={100} viewBox="0 0 200 200">
              {(() => {
                let cum = 0
                return slide.ecommerceShare.segments.map((seg, i) => {
                  const start = cum
                  cum += seg.pct
                  const d = arcSlicePath(100, 100, 88, start, cum)
                  return <Path key={seg.label} d={d} fill={ecoColors[i % ecoColors.length]} />
                })
              })()}
            </Svg>
          </View>
          {slide.ecommerceShare.segments.map((seg, i) => (
            <Text key={seg.label} style={{ fontSize: 7, color: '#cbd5e1' }}>
              {seg.label} — {seg.pct}%
            </Text>
          ))}
          <Text style={pdfStyles.cardSource}>Source: {slide.ecommerceShare.source}</Text>
        </View>
      ) : null}
      {slide.ecommerceSales ? (
        <View style={[pdfStyles.card, { flex: 1 }]}>
          <Text style={pdfStyles.cardTitle}>{slide.ecommerceSales.title}</Text>
          <Text style={{ fontSize: 9, color: '#cbd5e1', marginBottom: 4 }}>
            2020: {slide.ecommerceSales.total2020}
          </Text>
          <Text style={{ fontSize: 10, color: '#cbd5e1', marginBottom: 4 }}>
            2024: {slide.ecommerceSales.total2024}
          </Text>
          <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#10b981', marginBottom: 6 }}>
            2028e: {slide.ecommerceSales.total2028e}
          </Text>
          <Text style={{ fontSize: 9, color: '#cbd5e1', lineHeight: 1.4 }}>{slide.ecommerceSales.takeaway}</Text>
          <Text style={pdfStyles.cardSource}>Source: {slide.ecommerceSales.source}</Text>
        </View>
      ) : null}
    </View>
  )
}

function formatSales(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}B`
  return String(n)
}

function TopBrandsTagCards({ slide }) {
  return (
    <View style={[pdfStyles.row, { marginBottom: 10 }]}>
      {slide.topBrandsEstablished ? (
        <View style={[pdfStyles.card, { flex: 1, marginRight: 8 }]}>
          <Text style={pdfStyles.cardTitle}>{slide.topBrandsEstablished.label}</Text>
          <Text style={{ fontSize: 8, color: '#94a3b8', marginBottom: 6 }}>
            {slide.topBrandsEstablished.description}
          </Text>
          <View style={[pdfStyles.row, { flexWrap: 'wrap' }]}>
            {slide.topBrandsEstablished.companies.map((name) => (
              <Text key={name} style={pdfStyles.tagPill}>
                {name}
              </Text>
            ))}
          </View>
        </View>
      ) : null}
      {slide.topBrandsEmerging ? (
        <View style={[pdfStyles.card, { flex: 1, borderColor: 'rgba(16,185,129,0.35)' }]}>
          <Text style={pdfStyles.cardTitle}>↑ {slide.topBrandsEmerging.label}</Text>
          <Text style={{ fontSize: 8, color: '#94a3b8', marginBottom: 6 }}>
            {slide.topBrandsEmerging.description}
          </Text>
          <View style={[pdfStyles.row, { flexWrap: 'wrap' }]}>
            {slide.topBrandsEmerging.companies.map((name) => (
              <Text
                key={name}
                style={[pdfStyles.tagPill, { color: '#a7f3d0', backgroundColor: 'rgba(16,185,129,0.12)' }]}
              >
                {name}
              </Text>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  )
}

const COL_W = { rank: '7%', co: '34%', y22: '11%', y23: '11%', y24: '11%', gr: '14%' }

function Top50Table({ rows }) {
  return (
    <View>
      <View style={pdfStyles.tableHeader}>
        <Text style={[pdfStyles.tableHeaderCell, { width: COL_W.rank }]}>Rank</Text>
        <Text style={[pdfStyles.tableHeaderCell, { width: COL_W.co }]}>Company</Text>
        <Text style={[pdfStyles.tableHeaderCell, { width: COL_W.y22, textAlign: 'right' }]}>2022</Text>
        <Text style={[pdfStyles.tableHeaderCell, { width: COL_W.y23, textAlign: 'right' }]}>2023</Text>
        <Text style={[pdfStyles.tableHeaderCell, { width: COL_W.y24, textAlign: 'right' }]}>2024</Text>
        <Text style={[pdfStyles.tableHeaderCell, { width: COL_W.gr, textAlign: 'right', color: '#10b981' }]}>
          Gr%
        </Text>
      </View>
      {rows.map((row, i) => (
        <View
          key={row.rank}
          wrap={false}
          style={[
            pdfStyles.tableRow,
            { backgroundColor: i % 2 === 0 ? 'rgba(15,23,42,0.5)' : 'transparent' },
          ]}
        >
          <Text style={[pdfStyles.tableCell, { width: COL_W.rank }]}>{row.rank}</Text>
          <Text
            style={[
              pdfStyles.tableCell,
              { width: COL_W.co, fontFamily: 'Helvetica-Bold', color: row.emerging ? '#6ee7b7' : '#f8fafc' },
            ]}
          >
            {row.company}
          </Text>
          <Text style={[pdfStyles.tableCell, { width: COL_W.y22, textAlign: 'right' }]}>{formatSales(row.s2022)}</Text>
          <Text style={[pdfStyles.tableCell, { width: COL_W.y23, textAlign: 'right' }]}>{formatSales(row.s2023)}</Text>
          <Text style={[pdfStyles.tableCell, { width: COL_W.y24, textAlign: 'right', fontFamily: 'Helvetica-Bold' }]}>
            {formatSales(row.s2024)}
          </Text>
          <Text
            style={[
              pdfStyles.tableCell,
              {
                width: COL_W.gr,
                textAlign: 'right',
                fontFamily: 'Helvetica-Bold',
                color: row.growth >= 0 ? '#10b981' : '#f87171',
              },
            ]}
          >
            {row.growth >= 0 ? '+' : ''}
            {row.growth}%
          </Text>
        </View>
      ))}
    </View>
  )
}

function PageFooter({ label }) {
  return <Text style={pdfStyles.footer}>{label}</Text>
}

function oneDeckPage(slide, slideIndex, deckTotal, key, body, footerExtra = '') {
  const label = `${slideIndex + 1} / ${deckTotal}${footerExtra}`
  return (
    <Page key={key} size="LETTER" orientation="landscape" style={pdfStyles.page}>
      <PageFooter label={label} />
      <SlideHeader slide={slide} />
      {body}
    </Page>
  )
}

function buildReportPages(slide, slideIndex, deckTotal) {
  const sectionGroups = chunkSections(slide.sections, 2)
  const pages = []
  pages.push(
    <Page key={`${slide.id}-p0`} size="LETTER" orientation="landscape" style={pdfStyles.page}>
      <PageFooter label={`${slideIndex + 1} / ${deckTotal}`} />
      <SlideHeader slide={slide} />
      <IntroBlock slide={slide} />
      <ReportCharts slide={slide} />
    </Page>,
  )
  sectionGroups.forEach((group, gi) => {
    pages.push(
      <Page key={`${slide.id}-sec-${gi}`} size="LETTER" orientation="landscape" style={pdfStyles.page}>
        <PageFooter label={`${slideIndex + 1} / ${deckTotal} · cont.`} />
        <SlideHeader slide={slide} showContinued />
        {group.map((sec) => (
          <SectionBlock
            key={sec.heading}
            section={sec}
            isRec={sec.heading.includes('Key Recommendations')}
          />
        ))}
      </Page>,
    )
  })
  return pages
}

function buildTopBrandsPages(slide, slideIndex, deckTotal) {
  const list = slide.top50List || []
  const chunks = chunkRows(list, 14, 26)
  if (chunks.length === 0) {
    return [
      oneDeckPage(
        slide,
        slideIndex,
        deckTotal,
        `${slide.id}-tb0`,
        <>
          <TopBrandsTagCards slide={slide} />
          {slide.topBrandsSource ? (
            <Text style={pdfStyles.cardSource}>{slide.topBrandsSource}</Text>
          ) : null}
        </>,
      ),
    ]
  }
  return chunks.map((chunk, ci) => (
    <Page key={`${slide.id}-tb-${ci}`} size="LETTER" orientation="landscape" style={pdfStyles.page}>
      <PageFooter label={`${slideIndex + 1} / ${deckTotal}${ci > 0 ? ' · cont.' : ''}`} />
      {ci === 0 ? <SlideHeader slide={slide} /> : <SlideHeader slide={slide} showContinued />}
      {ci === 0 ? <TopBrandsTagCards slide={slide} /> : null}
      <Top50Table rows={chunk} />
      {ci === chunks.length - 1 && slide.topBrandsSource ? (
        <Text style={[pdfStyles.cardSource, { marginTop: 8 }]}>{slide.topBrandsSource}</Text>
      ) : null}
    </Page>
  ))
}

function slideToPages(slide, slideIndex, deckTotal) {
  const keyBase = String(slide.id)
  if (slide.layout === 'report') {
    return buildReportPages(slide, slideIndex, deckTotal)
  }
  if (slide.layout === 'takeaways') {
    return [oneDeckPage(slide, slideIndex, deckTotal, keyBase, <TakeawaysBody slide={slide} />)]
  }
  if (slide.layout === 'strategy') {
    return [oneDeckPage(slide, slideIndex, deckTotal, keyBase, <StrategyBody slide={slide} />)]
  }
  if (slide.layout === 'ecommerce') {
    return [oneDeckPage(slide, slideIndex, deckTotal, keyBase, <EcommerceBody slide={slide} />)]
  }
  if (slide.layout === 'budget') {
    return [oneDeckPage(slide, slideIndex, deckTotal, keyBase, <BudgetBody />)]
  }
  if (slide.layout === 'topBrands') {
    return buildTopBrandsPages(slide, slideIndex, deckTotal)
  }
  return [oneDeckPage(slide, slideIndex, deckTotal, keyBase, <DefaultSlideBody slide={slide} />)]
}

export function DeckPdfDocument({ slides: slidesProp }) {
  const slides = slidesProp ?? boardDeckSlides.filter((s) => !s.hidden)
  const deckTotal = slides.length
  const pages = slides.flatMap((slide, i) => slideToPages(slide, i, deckTotal))
  return (
    <Document title="Ate Days — Board Deck" author="Ate Days" subject="Strategy deck">
      {pages}
    </Document>
  )
}
