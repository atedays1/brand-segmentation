/**
 * Cross-sheet overlap analysis: Website Build & Maintenance vs Brand Development Costs.
 * Use for planning — not double-count when building a single consolidated budget.
 */

export const BUDGET_OVERLAP_GROUPS = [
  {
    id: 'shopify',
    label: 'Shopify Plus & ecommerce stack',
    websiteItems: 'Platform fee ($2.3k–2.5k/mo); theme/dev and integrations on website sheet.',
    brandItems: 'Shopify Plus $2.3k–5k/mo including subs, upsells, loyalty apps.',
    guidance: 'Treat as one platform + apps decision; brand sheet uses a wider monthly band.',
  },
  {
    id: 'creative-photo',
    label: 'Creative, photography & launch assets',
    websiteItems: 'Creative Assets CAPEX ($15k–$30k): hero photography, 3D, UGC starter.',
    brandItems: 'Launch Burst ($22k–$50k): hero shoot, product photos, foundational ad set; ongoing content retainers.',
    guidance: 'Same “go-to-market creative” family — align scopes so launch burst and web creative are not both fully budgeted for identical deliverables.',
  },
  {
    id: 'legal',
    label: 'Legal, compliance & claims',
    websiteItems: 'Legal/Compliance CAPEX ($10k–$15k): FDA/FTC, claims substantiation audit.',
    brandItems: 'Setup legal $5k–$15k; claims review $5k–$15k; trademarks $2k–$5k; marketing legal row $7k–$20k.',
    guidance: 'Multiple legal lines across sheets — consolidate into one compliance roadmap.',
  },
  {
    id: 'seo-data',
    label: 'SEO, GEO & site authority',
    websiteItems: 'Data & SEO CAPEX ($5k–$10k): data builds, SEO architecture.',
    brandItems: 'Technical SEO one-time $3k–$7k; GEO/content $3k–$7.5k/mo.',
    guidance: 'Technical SEO and ongoing GEO overlap the website SEO scope; merge into one SEO program.',
  },
  {
    id: 'klaviyo-retention',
    label: 'Klaviyo / email-SMS / retention',
    websiteItems: 'App stack + Retention/Lifecycle (Klaviyo, managed email/SMS).',
    brandItems: 'Klaviyo $500–$2.5k/mo listed under digital infrastructure.',
    guidance: 'Same tooling; website sheet also bundles agency/retainer-style services.',
  },
  {
    id: 'reviews-analytics',
    label: 'Reviews, attribution & analytics',
    websiteItems: 'Okendo in app stack; Triple Whale / Peel in Analytics/CRO.',
    brandItems: 'Okendo/Loox $300–$600; Triple Whale or Northbeam $300–$1.5k.',
    guidance: 'Duplicate line items across sheets — pick one budget owner.',
  },
]

/** Items that appear only on one sheet (high level) */
export const WEBSITE_ONLY_HIGHLIGHTS = [
  'Custom development (Shopify Plus / headless, $40k–$80k CAPEX)',
  'Complex ERP & 3PL integrations ($10k–$35k)',
  'Ongoing tech maintenance retainer ($3k–$7k/mo)',
  'Strategy & UX wireframing / journey ($12k–$20k)',
  'Variable: payment processing, BNPL, GMV-based platform fees',
]

export const BRAND_ONLY_HIGHLIGHTS = [
  'Medical board (fractional CMO $3k–$5k/mo; full board $50k–$150k/yr)',
  'Brand naming ($40k) and visual/verbal identity ($120k–$150k)',
  'Granular content engines: production ($13.5k–$30k/mo) + test/release ($3k–$6.5k/mo)',
  'Influencer/affiliate infrastructure (setup + monthly tools)',
  'Recruitment & med-board setup ($10k–$30k)',
]
