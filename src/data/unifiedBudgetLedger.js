/**
 * Single ledger: major lines from both sheets, deduped where the overlap is the same vendor.
 * overlap: true → see budgetOverlapAnalysis.js for narrative.
 */

export const UNIFIED_LEDGER_ONE_TIME = [
  { label: 'Strategy & UX (wireframe, audit, journey mapping)', min: 12000, max: 20000, source: 'website' },
  { label: 'Development (custom theme / headless build)', min: 40000, max: 80000, source: 'website' },
  { label: 'Creative / launch visuals (website CAPEX scope)', min: 15000, max: 30000, source: 'website', overlap: true },
  { label: 'Integrations (ERP, 3PL)', min: 10000, max: 35000, source: 'website' },
  { label: 'Legal / compliance (FDA/FTC — website CAPEX)', min: 10000, max: 15000, source: 'website', overlap: true },
  { label: 'Data & SEO foundation (builds, architecture)', min: 5000, max: 10000, source: 'website', overlap: true },
  { label: 'Brand naming (clearance, registered)', min: 40000, max: 40000, source: 'brand' },
  { label: 'Visual & verbal identity', min: 120000, max: 150000, source: 'brand' },
  { label: 'Launch burst (hero shoot, product photos, foundational ads)', min: 22000, max: 50000, source: 'brand', overlap: true },
  { label: 'Influencer & affiliate infrastructure (setup)', min: 3000, max: 3000, source: 'brand' },
  { label: 'Technical SEO audit & site speed', min: 3000, max: 7000, source: 'brand', overlap: true },
  { label: 'Legal (advisory contracts, D&O — brand setup)', min: 5000, max: 15000, source: 'brand', overlap: true },
  { label: 'Board recruitment (headhunter / finder fees)', min: 10000, max: 30000, source: 'brand' },
  { label: 'Claims substantiation (brand kit & packaging copy)', min: 5000, max: 15000, source: 'brand', overlap: true },
  { label: 'Trademarking (name & logo, classes)', min: 2000, max: 5000, source: 'brand' },
  { label: 'Marketing legal review (summary bucket)', min: 7000, max: 20000, source: 'brand', overlap: true },
  { label: 'Scientific review audits (formula, lab, third-party data)', min: null, max: null, source: 'brand', note: 'TBD' },
]

export const UNIFIED_LEDGER_MONTHLY = [
  { label: 'Shopify Plus (+ core app context per sheet)', min: 2300, max: 5000, source: 'both', overlap: true },
  { label: 'App stack beyond core platform (subs, reviews, rewards)', min: 1500, max: 4000, source: 'website' },
  { label: 'Klaviyo / email-SMS tooling', min: 500, max: 2500, source: 'both', overlap: true },
  { label: 'Managed retention (email/SMS programs — website)', min: 2000, max: 5000, source: 'website' },
  { label: 'Tech maintenance retainer (bugs, perf, minor UX)', min: 3000, max: 7000, source: 'website' },
  { label: 'Surveys & A/B / analytics stack (e.g. Peel, Triple Whale)', min: 800, max: 2500, source: 'website', overlap: true },
  { label: 'Attribution (Triple Whale / Northbeam)', min: 300, max: 1500, source: 'brand', overlap: true },
  { label: 'Customer service (Gorgias)', min: 300, max: 750, source: 'brand' },
  { label: 'Review apps (Okendo / Loox)', min: 300, max: 600, source: 'brand', overlap: true },
  { label: 'GEO / content & authority (ongoing)', min: 3000, max: 7500, source: 'brand', overlap: true },
  { label: 'Content production engine (UGC, ad creative, social, email design)', min: 13500, max: 30000, source: 'brand' },
  { label: 'Content test & release (sandbox tests, creative analytics tools)', min: 3000, max: 6500, source: 'brand' },
  { label: 'Influencer seeding & management tools', min: 200, max: 1000, source: 'brand' },
  { label: 'Affiliate platform fees', min: 500, max: 2000, source: 'brand' },
  { label: 'Medical board — fractional CMO', min: 3000, max: 5000, source: 'brand' },
]

export const UNIFIED_LEDGER_ANNUAL = [
  { label: 'Medical board — full board (3–5 members)', min: 50000, max: 150000, source: 'brand' },
]

export const UNIFIED_VARIABLE = [
  { label: 'Payment processing (~2.15% + $0.30/txn)', source: 'website' },
  { label: 'Shopify variable platform fee (above GMV threshold)', source: 'website' },
  { label: 'BNPL (4–6% per transaction)', source: 'website' },
  { label: 'Product sampling for influencers', source: 'brand', note: 'Often netted with COGS' },
]
