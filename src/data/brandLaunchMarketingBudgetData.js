/**
 * Brand Pre and Post Launch Budget ESTIMATE — marketing-facing CapEx & OpEx sheets.
 * Stacked bars use midpoint of each range for share only (see footnotes on overlap).
 */

const withMid = (rows) =>
  rows
    .filter((r) => r.min != null && r.max != null)
    .map((r) => ({
      ...r,
      mid: (r.min + r.max) / 2,
    }))

/** Total CapEx from PDF */
export const BRAND_LAUNCH_CAPEX_TOTAL = { min: 462500, max: 625000 }

/** Total OpEx from PDF (excl. ad spend & payroll) */
export const BRAND_LAUNCH_OPEX_TOTAL = { min: 45365, max: 77665 }

/**
 * CapEx — major PDF rows with $. Launch burst shown as roll-up; hero/lifestyle/etc. in detail text only to avoid double-count in bar.
 */
export const BRAND_LAUNCH_CAPEX_ROWS = withMid([
  {
    label: 'Med board setup & admin',
    detail: 'Vetted, media-trained advisory.',
    min: 10500,
    max: 45000,
  },
  {
    label: 'Legal & compliance (setup)',
    detail: 'Contracts, compliance foundation.',
    min: 5000,
    max: 15000,
  },
  {
    label: 'Recruitment',
    detail: 'Specialized search / finder fees.',
    min: 10000,
    max: 30000,
  },
  {
    label: 'Toolkit — brand visuals & language',
    detail: 'Brand system visuals & language.',
    min: 270000,
    max: 320000,
  },
  {
    label: 'Brand name',
    detail: 'Naming, clearance, registration.',
    min: 40000,
    max: 40000,
  },
  {
    label: 'Brand book',
    detail: 'Guidelines & verbal/visual system.',
    min: 150000,
    max: 200000,
  },
  {
    label: 'Packaging (10–12 SKUs)',
    detail: 'Primary packaging scope.',
    min: 80000,
    max: 120000,
  },
  {
    label: 'Creative launch burst (roll-up)',
    detail:
      'High-volume launch creative. PDF roll-up; sub-lines include hero shoot $65–75k, e‑com photography $10–20k, foundational ads $10–20k, lifestyle $50–65k, event/pop-up $20–30k, print $20–30k.',
    min: 175000,
    max: 240000,
  },
  {
    label: 'Legal & compliance — marketing review',
    detail: 'Brand vetting.',
    min: 7000,
    max: 20000,
  },
  {
    label: 'Claims substantiation review',
    detail: 'Marketing & packaging claims.',
    min: 5000,
    max: 15000,
  },
  {
    label: 'Trademarking',
    detail: 'Name & logo filings.',
    min: 2000,
    max: 5000,
  },
  {
    label: 'Label compliance review',
    detail: 'Shown as $600–$1,000/SKU × ~10 SKUs for estimate band.',
    min: 6000,
    max: 12000,
  },
  {
    label: 'Product certifications (year one)',
    detail: 'Non-GMO / Organic / Vegan trust badges.',
    min: 15000,
    max: 25000,
  },
])

/** OpEx — use category roll-ups where PDF gives a parent total to avoid double-counting with children. */
export const BRAND_LAUNCH_OPEX_ROWS = withMid([
  {
    label: 'Medical board',
    detail: 'Value-based on credentials, media savvy, time (roll-up vs. role lines).',
    min: 5000,
    max: 12500,
  },
  {
    label: 'Content production engine',
    detail: 'UGC, email/SMS creative, performance ads, social, web/LP/PDP, AI aug., OOH, agency support (sheet roll-up).',
    min: 38500,
    max: 62000,
  },
  {
    label: 'Influencer & affiliate infrastructure',
    detail: 'Seeding tools, affiliate platform, asset management.',
    min: 700,
    max: 3000,
  },
  {
    label: 'Third-party testing (TIC)',
    detail: 'Per batch — shown as monthly estimate band from sheet.',
    min: 2000,
    max: 5000,
  },
  {
    label: 'Product certifications (ongoing)',
    detail: 'Trust badges — monthly band from sheet.',
    min: 1000,
    max: 2000,
  },
  {
    label: 'App stack (creative ops)',
    detail: 'Asana, Adobe, Figma, Canva, Foreplay, etc. (~$165/mo combined).',
    min: 165,
    max: 165,
  },
])

export const BRAND_LAUNCH_CAPEX_TBD = [
  'Scientific review audits — TBD',
  'Product compliance & regulatory (3-SKU custom formulations) — TBD',
  'Seeding at scale (pre-launch) — unit plan (1,000–1,900+ units across micro-influencers, ambassadors, VIPs, F&F), not a $ line in sheet',
]

export const BRAND_LAUNCH_OPEX_TBD = [
  'Product compliance & regulatory — TBD',
  'Packaging & unboxing experience (primary pack, label design/print, shipper boxes) — TBD',
  'Seeding at scale (post-launch) — unit plan (800–1,500 units), not a $ line in sheet',
]

export function sumMid(rows) {
  return rows.reduce((acc, r) => acc + r.mid, 0)
}

export function formatMoneyRange(min, max, compact = true) {
  if (compact && min >= 1000 && max >= 1000) {
    return `$${Math.round(min / 1000)}k – $${Math.round(max / 1000)}k`
  }
  const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(n)
  return `${fmt(min)} – ${fmt(max)}`
}
