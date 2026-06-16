/**
 * Agency partner brief — scannable structure for at-a-glance agency review.
 */

export const agencyNeedsSlides = [
  {
    id: 'cover',
    title: 'What we need from partners',
    headerIcon: 'Target',
    subtitle: 'Four capability areas · assess fit in 60 seconds per slide',
    layout: 'agencyCover',
    capabilities: [
      {
        id: 'performance',
        title: 'Performance',
        tagline: 'Paid media · trust at launch, efficiency at scale',
        icon: 'TrendingUp',
        accent: 'sky',
      },
      {
        id: 'retention',
        title: 'Retention',
        tagline: 'Email & SMS · habit, LTV, subscription',
        icon: 'Mail',
        accent: 'violet',
      },
      {
        id: 'creative',
        title: 'Creative',
        tagline: 'UGC & DR video · compliant, high velocity',
        icon: 'Clapperboard',
        accent: 'fuchsia',
      },
      {
        id: 'shopify',
        title: 'Shopify / Web',
        tagline: 'Store build · marketing autonomy, AI-ready',
        icon: 'Store',
        accent: 'emerald',
      },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    titleHighlight: 'Performance',
    headerIcon: 'TrendingUp',
    subtitle: 'Google · Meta · TikTok · YouTube',
    layout: 'agencyNeed',
    agencyNeed: {
      elevator:
        'A paid media partner that treats creative as a media variable and wins on trust first, efficiency second.',
      phases: [
        { label: 'Launch', detail: 'Boutique partner — messaging that passes the new-customer trust test' },
        { label: 'Scale', detail: '$20k+/mo — fight ad fatigue & CAC with tech + testing velocity' },
      ],
      tools: ['Meta', 'TikTok', 'YouTube', 'Google', 'Comparison LPs', 'Listicles'],
      goal: ['Profitable acquisition under FDA/FTC constraints', 'High creative testing velocity (AG1/IM8 bar)'],
      focus: ['New-customer ROAS & MER', 'Channel mix + landing pages matched to traffic'],
      mustHave: [
        'Creative ↔ media feedback loop',
        'Scientific authority & comparison creative',
        'Efficiency vs. impact discipline',
      ],
      deliverableSteps: [
        {
          label: 'Blueprint',
          summary: 'Strategy before spend',
          points: ['Media plan & KPI targets (CAC, ROAS, MER)', 'Budget split + capital-efficiency framework'],
        },
        {
          label: 'Activate',
          summary: 'Launch the engine',
          points: ['Creator performance briefs', 'Compliant copy + weekly test calendar'],
        },
        {
          label: 'Optimize',
          summary: 'Daily execution',
          points: ['Bid/budget shifts', 'Placement hygiene + LP recommendations'],
        },
        {
          label: 'Report',
          summary: 'Weekly intelligence',
          points: ['MER dashboard', 'Creative learnings + cohort quality by channel'],
        },
      ],
      kpiChips: ['CAC', 'ROAS', 'MER', 'Hook rate', 'CPA', 'Creative hit rate'],
      ateDaysOwns: ['MER & CAC targets', 'Creative strategy approval', 'Final video edits'],
    },
  },
  {
    id: 'retention',
    title: 'Retention',
    titleHighlight: 'Retention',
    headerIcon: 'Mail',
    subtitle: 'Klaviyo · Attentive · SMS',
    layout: 'agencyNeed',
    agencyNeed: {
      elevator: 'Turn first purchase into a 6+ month subscription habit — profit lives past month one.',
      phases: [
        { label: 'Onboard', detail: '30-day educational drips — reduce early churn' },
        { label: 'Scale', detail: '50k+ list — cohorts, prediction, VIP programs' },
      ],
      tools: ['Klaviyo', 'Attentive', 'Flows', 'Campaigns', 'Retention quizzes'],
      goal: ['Minimize churn', 'Maximize LTV & subscription conversion', 'Community / feedback loop'],
      focus: ['Replenishment timing', 'Active + passive churn', 'Save ≥15% of cancel attempts'],
      mustHave: ['Behavioral triggers', 'Habit-forming education', 'VIP velvet-rope programs'],
      deliverableSteps: [
        {
          label: 'Blueprint',
          summary: 'Flows & deliverability',
          points: ['Welcome, cart, post-purchase, win-back maps', 'DKIM/SPF + segment architecture'],
        },
        {
          label: 'Activate',
          summary: 'Calendar & copy',
          points: ['30-day send plan', 'Science + lifestyle voice'],
        },
        {
          label: 'Optimize',
          summary: 'Logic & hygiene',
          points: ['Flow tweaks + save offers (delay/swap)', 'List scrubbing'],
        },
        {
          label: 'Report',
          summary: 'LTV intelligence',
          points: ['Cohort LTV', 'Product affinity for 2nd purchase'],
        },
      ],
      kpiChips: ['LTV', 'RPR', 'Open rate', 'Sub conversion', 'Churn save %'],
      ateDaysOwns: ['Surprise & delight', 'Inventory sync', 'Brand voice', 'Offer approval'],
    },
  },
  {
    id: 'creative',
    title: 'Creative',
    titleHighlight: 'Creative',
    headerIcon: 'Clapperboard',
    subtitle: 'UGC · DR video · Static · Compliance',
    layout: 'agencyNeed',
    agencyNeed: {
      elevator: 'High-volume, compliant creative that stops the scroll and feeds the media buy.',
      phases: [
        { label: 'Test', detail: '10–15 hooks/angles before heavy production' },
        { label: 'Scale', detail: 'Engine velocity to beat creative fatigue' },
      ],
      tools: ['UGC', 'DR editing', '3D / explainers', 'Comparison statics', 'Meta · TikTok · YouTube'],
      goal: ['Scroll-stopping volume', 'Native feel + DR precision', 'Remixable authority library'],
      focus: ['3-second hooks', 'Compliant superiority claims', 'Concepts per week, not just edits'],
      mustHave: ['Closed loop with performance data', 'Kitchen-table + lab aesthetics', 'Science vs. flavor testing'],
      deliverableSteps: [
        {
          label: 'Strategy',
          summary: 'Angles & scripts',
          points: ['Big 5 angles + personas', '3+ hooks per script'],
        },
        {
          label: 'Produce',
          summary: 'Volume & logistics',
          points: ['10–20 creators/mo', '5–10 primaries + 20+ iterations/mo'],
        },
        {
          label: 'Remix',
          summary: 'Winners & formats',
          points: ['Platform-native cuts', 'Thumbnail / frame tests'],
        },
        {
          label: 'Report',
          summary: 'What worked',
          points: ['Hook-rate audit', 'Creator scorecard + comment insights'],
        },
      ],
      kpiChips: ['Thumb-stop', '3s hook', 'Creative CAC', 'AOV by angle', 'Hit rate'],
      ateDaysOwns: ['Product samples', 'Legal sign-off', 'Brand asset library'],
    },
  },
  {
    id: 'shopify',
    title: 'Shopify / web dev',
    titleHighlight: 'Shopify',
    headerIcon: 'Store',
    subtitle: 'Shopify Plus · AI-ready · Marketing autonomy',
    layout: 'agencyNeed',
    agencyNeed: {
      elevator: 'A best-in-class store marketing can change without a dev ticket every time.',
      phases: [
        { label: 'Build', detail: 'Plus setup, modular theme, subscription + integrations' },
        { label: 'Run', detail: 'Speed, security, AI insights, <24h marketing changes' },
      ],
      tools: ['Shopify Plus', 'Skio', 'Sidekick / AI apps', 'NetSuite / 3PL', 'Figma system'],
      goal: ['Enterprise-grade UX', 'Marketing-owned layout changes', 'Agent-ready product data'],
      focus: ['Shopify 2.0 sections', 'Core Web Vitals', 'CVR vs. AG1 / IM8 / Thorne'],
      mustHave: [
        'Marketing control panel (meta-objects, rapid LPs)',
        'Agentic search & discovery',
        'Subscription + ERP sync experience',
      ],
      deliverableSteps: [
        {
          label: 'Build',
          summary: 'Foundation',
          points: ['Plus + checkout extensibility', 'Modular Liquid / JSON theme'],
        },
        {
          label: 'Enable',
          summary: 'Marketing autonomy',
          points: ['Section library for LPs', 'AI roadmap (search, analytics)'],
        },
        {
          label: 'Maintain',
          summary: 'Always-on',
          points: ['Security + speed audits', 'Figma expansion kit'],
        },
        {
          label: 'Measure',
          summary: 'Performance',
          points: ['CVR & vitals tracking', 'Subscription opt-in rate'],
        },
      ],
      kpiChips: ['CVR', 'LCP / CLS', 'Sub opt-in %', 'Time-to-live change'],
      ateDaysOwns: ['Architecture sign-off', 'Merchandising', 'Data for AI agents', 'MER + uptime'],
    },
  },
]
