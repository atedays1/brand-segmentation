/**
 * Brand Development Costs (Sheet1) — extracted from Brand Development Costs spreadsheet.
 * Ranges as stated in source; some cells were blank in PDF.
 */

export const BRAND_DEV_SUMMARY = {
  /** Top-line summary row (PDF left Estimated Initial / right Estimated Monthly Carry) */
  brandName: { oneTime: { min: 40000, max: 40000 } },
  visualVerbalIdentity: { oneTime: { min: 120000, max: 150000 } },
  launchBurst: { oneTime: { min: 22000, max: 50000 } },
  contentProductionEngine: { monthly: { min: 13500, max: 30000 } },
  contentTestReleaseEngine: { monthly: { min: 3000, max: 6500 } },
  influencerAffiliateSetup: { oneTime: { min: 3000, max: 3000 } },
  seoAuthority: {
    oneTime: { min: 3000, max: 7000 },
    monthly: { min: 3000, max: 7500 },
  },
  legalComplianceMarketingReview: { oneTime: { min: 7000, max: 20000 } },
}

/** Medical board — from PDF */
export const BRAND_MEDICAL_BOARD = {
  essentialFractional: { monthly: { min: 3000, max: 5000 }, note: 'Chief Medical Officer, fractional' },
  fullBoardAnnual: { annual: { min: 50000, max: 150000 }, note: '3–5 members (PhD, RD, MD)' },
  perMemberTiers: {
    midTier: { retainer: [5000, 15000], meeting: [1500, 2500], equity: '0.1%–0.25%', hourly: [250, 500] },
    kol: { retainer: [25000, 60000], meeting: [3500, 7500], equity: '0.5%–1.0%+', hourly: [750, 1500] },
  },
}

export const BRAND_SETUP_ADMIN = {
  legalCompliance: { oneTime: { min: 5000, max: 15000 }, note: 'Advisory vs medical advice contracts, D&O riders' },
  recruitment: { oneTime: { min: 10000, max: 30000 }, note: 'Headhunter ~20–30% first-year comp' },
  scientificReviewAudits: { oneTime: null, note: 'TBD — formula audits, lab, third-party data' },
}

/** Launch burst detail */
export const BRAND_LAUNCH_BURST_LINES = [
  { label: 'Hero brand shoot', min: 15000, max: 35000 },
  { label: 'E-commerce product photography', min: 2000, max: 5000 },
  { label: 'Foundational ad set', min: 5000, max: 10000 },
]

/** Content production engine (monthly) */
export const BRAND_CONTENT_PRODUCTION = [
  { label: 'UGC sourcing', min: 3000, max: 7000 },
  { label: 'Performance ad creative (remix/hooks)', min: 5000, max: 12000 },
  { label: 'Email/SMS content', min: 2500, max: 5000 },
  { label: 'Social content management', min: 3000, max: 6000 },
]

/** Content test & release (monthly) */
export const BRAND_CONTENT_TEST = [
  { label: 'Creative testing budget', min: 2500, max: 5000 },
  { label: 'Platform fees (Motion, Triple Whale, etc.)', min: 500, max: 1500 },
]

/** Digital infrastructure & retention (monthly) */
export const BRAND_DIGITAL_INFRA = [
  { label: 'E-commerce platform (Shopify Plus)', min: 2300, max: 5000, note: 'Base + essential app ecosystem' },
  { label: 'Retention (Klaviyo)', min: 500, max: 2500 },
  { label: 'Attribution (Triple Whale / Northbeam)', min: 300, max: 1500 },
  { label: 'Customer service (Gorgias)', min: 300, max: 750 },
]

/** Influencer & affiliate (monthly) */
export const BRAND_INFLUENCER_MONTHLY = [
  { label: 'Seeding & management (Gatsby, SARAL)', min: 200, max: 1000 },
  { label: 'Affiliate platform (Impact, Refersion)', min: 500, max: 2000 },
  { label: 'Product sampling', min: null, max: null, note: 'COGS — 100–300 units/mo' },
]

/** SEO & authority */
export const BRAND_SEO_AUTHORITY = {
  technicalOneTime: { min: 3000, max: 7000 },
  geoMonthly: { min: 3000, max: 7500 },
  reviewApps: { label: 'Okendo / Loox', min: 300, max: 600 },
}

/** Legal marketing review detail */
export const BRAND_LEGAL_MARKETING = [
  { label: 'Claims substantiation review', oneTime: { min: 5000, max: 15000 } },
  { label: 'Trademarking', oneTime: { min: 2000, max: 5000 } },
]
