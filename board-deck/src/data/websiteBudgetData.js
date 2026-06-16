/**
 * Website build & maintenance budget — shared by deck slide and PDF export.
 * Stacked-bar widths use midpoint of each range for composition only.
 */

const withMid = (rows) =>
  rows.map((r) => ({
    ...r,
    mid: (r.min + r.max) / 2,
  }))

export const WEBSITE_BUDGET_CAPEX = withMid([
  {
    label: 'Strategy & UX',
    detail:
      'High-conversion wireframing, competitive audit, design and user journey mapping. Includes designer.',
    min: 12000,
    max: 20000,
  },
  {
    label: 'Development',
    detail: 'Fully custom Shopify Plus theme or high-end headless/Hydrogen build. Includes dev resource.',
    min: 40000,
    max: 80000,
  },
  {
    label: 'Creative Assets',
    detail: 'Professional hero photography, 3D product renders, design assets and UGC video starter pack.',
    min: 15000,
    max: 30000,
  },
  {
    label: 'Integrations',
    detail: 'Complex ERP (e.g., NetSuite) and 3PL/logistics synchronization.',
    min: 10000,
    max: 35000,
  },
  {
    label: 'Legal/Compliance',
    detail: 'FDA/FTC label review and marketing claims substantiation audit.',
    min: 10000,
    max: 15000,
  },
  {
    label: 'Data & SEO',
    detail: 'Custom data builds, functionality and SEO architecture.',
    min: 5000,
    max: 10000,
  },
])

export const WEBSITE_BUDGET_OPEX = withMid([
  {
    label: 'Platform Fee',
    detail: 'Shopify Plus (base fee on 1-year term or 0.35% of GMV).',
    min: 2300,
    max: 2500,
  },
  {
    label: 'App Stack',
    detail: 'Subscriptions (Skio), Reviews (Okendo), Rewards, and SMS (Klaviyo).',
    min: 1500,
    max: 4000,
  },
  {
    label: 'Retention/Lifecycle',
    detail: 'Managed Email/SMS marketing services and loyalty program maintenance.',
    min: 2000,
    max: 5000,
  },
  {
    label: 'Tech Maintenance',
    detail: 'Monthly developer retainer for bug fixes, speed optimization, and minor UX tweaks.',
    min: 3000,
    max: 7000,
  },
  {
    label: 'Analytics/CRO',
    detail: 'Post-purchase surveys and A/B testing software (e.g., Peel, Triple Whale).',
    min: 800,
    max: 2500,
  },
])

export const WEBSITE_BUDGET_VARIABLE = [
  {
    label: 'Payment Processing',
    detail: 'Shopify Payment Processing',
    fee: '~2.15% + $0.30 per transaction.',
  },
  {
    label: 'Platform Variable',
    detail: 'Applies only after exceeding ~$800k in monthly sales.',
    fee: '0.35% of revenue',
  },
  {
    label: 'BNPL Fees',
    detail: 'Affirm/Klarna (common in wellness).',
    fee: '4% – 6% per transaction',
  },
]

export const WEBSITE_BUDGET_TOTALS = {
  capex: { min: 92000, max: 192000 },
  opexMonthly: { min: 9600, max: 21000 },
  /** Derived from monthly OPEX range × 12 — for comparison to one-time CAPEX only. */
  opexAnnual: { min: 115200, max: 252000 },
}

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
