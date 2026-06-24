/**
 * Consumer Illumination founder deck, 15 slides (~2–3 min each).
 * Source: SBK Functional Nutrition Consumer Illumination (May 2026).
 */

export const consumerIlluminationSlides = [
  {
    id: 'why-now',
    layout: 'illuminationCover',
    title: 'Consumer Illumination',
    titleHighlight: 'Illumination',
    headerIcon: 'Target',
    subtitle: 'Wellness Architects & Overwhelmed Experimenters · SBK final report · May 2026',
    chapters: [
      { label: 'Two targets, one market' },
      { label: 'Shared platform & lead benefits' },
      { label: 'Segment deep dives' },
      { label: 'Mid-deck segment refresh' },
      { label: 'Consumer voice & themes' },
      { label: 'Platform + segment strategy' },
      { label: 'Insight → activation' },
      { label: 'Founder decisions' },
    ],
    bullets: [
      'Phase 3 closes the consumer loop before launch, ethnography + IDIs bring quant segments to life',
      'Informs positioning, messaging, product tiers, and credibility model',
      '14 forum participants + 7 one-hour interviews over 3 days',
    ],
    speakerNotes:
      'This is the third leg of the brand-building research program, after market exploratory and quant segmentation. The team already knows the six segments; this study illuminates the two we\'re targeting. The methodology is lean but deep: digital ethnography plus IDIs. The output isn\'t more data for its own sake, it\'s the consumer language we need to finalize positioning and launch messaging. Walk founders through what decisions this unlocks: where to play, how to fork the message, and what proof points each segment needs.',
  },
  {
    id: 'two-targets',
    layout: 'statsBullets',
    visuals: ['segmentDonut', 'spendBars'],
    title: 'Two targets, one market',
    titleHighlight: 'one market',
    headerIcon: 'Users',
    subtitle: 'Primary + secondary targets share 24% of functional nutrition users, already core category believers',
    stats: [
      { label: 'Wellness Architects', value: '13%', note: 'Primary · highest spend · thought leaders' },
      { label: 'Overwhelmed Experimenters', value: '11%', note: 'Secondary · shared traits · extends reach' },
      { label: 'Combined FN market', value: '24%', note: 'Low behavior-change barrier' },
      { label: 'WA supplement spend', value: '$81.6/mo', note: 'vs $57.2 OE' },
    ],
    bullets: [
      'Both highly engaged in FN, multi-category, daily+ usage, see products as core to routines',
      'Both seek benefits beyond general health: sleep, focus, energy, performance, look/feel better',
      'WA: biggest volume opportunity on spend; influences others\' purchase behavior',
      'OE: science-backed claims + certifications help overcome trust hurdles',
    ],
    speakerNotes:
      'Slide 2 is the strategic frame: we\'re not debating whether to target these segments, quant already chose them. The illumination adds texture. Wellness Architects are 13% but punch above weight on spend and influence. Overwhelmed Experimenters are 11% with lower monthly spend but nearly identical category engagement. Together that\'s nearly a quarter of functional nutrition users. Critically, neither segment requires us to convince them supplements matter, they\'re already in. Our job is to win on format, proof, and positioning.',
  },
  {
    id: 'what-unites',
    layout: 'bullets',
    visuals: ['threePillars'],
    title: 'What unites them',
    titleHighlight: 'unites',
    headerIcon: 'Sparkles',
    subtitle: 'Holistic health, sleep as foundation, FN as scaffolding, same ideals, same purchase logic',
    bullets: [
      'Health spans physical, mental/emotional, spiritual, and purpose, both balance multiple dimensions',
      'Sleep is foundational: nutrition, movement, and sleep are the three pillars both name first',
      'FN provides scaffolding, feel better today, confidence for long-term, bridge ideals vs real life',
      'Shared product ideals: clean/natural, tangible attributable impact, science-backed, easy to incorporate',
      'Purchase path: research & reviews → filter red flags → risk management → format accelerates decision',
    ],
    quotes: [
      {
        text: 'If I get 5 or 6 hours of sleep… I just don\'t have as much energy or I can\'t perform as well during my exercise sessions as I do when I have 8 hours of sleep.',
        attribution: 'Eric, Wellness Architect',
      },
      {
        text: 'For me it starts with sleep. If I don\'t get the sleep I need it affects a lot of different areas of my life so I try to get 8 hours in each night.',
        attribution: 'Michael J, Overwhelmed Experimenter',
      },
    ],
    speakerNotes:
      'Before we fork the segments, anchor on what\'s shared, this is the platform story. Both segments define wellness holistically, not just physical. Sleep came through with conviction in ethnography for both groups, this directly validates Ate Days\' need-state focus. Functional nutrition isn\'t vanity for either group; it\'s infrastructure. They share four product ideals that map cleanly to our bundle: clean formulations, felt impact, credible science, and low friction. On purchase, both are skeptical readers, not impulse buyers, they research, eliminate fast on red flags, and treat shopping as regret avoidance. Format and ease are accelerators, not the primary filter.',
  },
  {
    id: 'where-diverge',
    layout: 'compare',
    visuals: ['venn', 'spectrum'],
    title: 'One platform, shared ground',
    titleHighlight: 'shared ground',
    headerIcon: 'GitCompare',
    subtitle: 'Both segments share the same FN category and purchase logic, WA leads on performance and proof, OE on ease and felt impact',
    bullets: [
      'Unified brand platform: clean science, felt impact, sleep, and multi-benefit efficiency speak to both',
      'Primary target (WA): lead with performance system, attribution, and stack consolidation',
      'Secondary target (OE): lead with daily support, ritual-friendly formats, and manageable routines',
    ],
    compare: {
      left: {
        label: 'Wellness Architects',
        role: 'Primary target',
        tagline: 'Lead benefit: performance & system fit',
        items: [
          'Emphasize optimization, attribution, and stack efficiency',
          'Proof model: science-first, ingredient transparency',
          'Formats that integrate into a designed daily system',
          'Emotional lead: "I am better"',
        ],
        accent: 'emerald',
      },
      right: {
        label: 'Overwhelmed Experimenters',
        role: 'Secondary target',
        tagline: 'Lead benefit: ease & felt impact',
        items: [
          'Emphasize manageability, low friction, and routine fit',
          'Proof model: fast felt impact, simple credible claims',
          'Treat-like, premade, and gummy-friendly formats',
          'Emotional lead: "I feel better"',
        ],
        accent: 'amber',
      },
    },
    speakerNotes:
      'Reframe this slide around overlap first, not fork. Quant and ethnography both show substantial shared ground: high FN engagement, sleep as foundation, skeptical shopping, clean science, multi-benefit desire. That is the platform story and it is large. WA and OE are not two brands, they are primary and secondary targets on one brand with different lead benefits. Wellness Architects are primary: lead with performance system language, attribution, consolidation. Overwhelmed Experimenters are secondary: lead with daily support, ritual, felt impact. The spectrum below shows where nuance appears on top of shared engagement, not a split market. Same products can serve both if lead messaging and proof emphasis flex by segment.',
  },
  {
    id: 'wa-mindset',
    layout: 'segmentProfile',
    title: 'Wellness Architects',
    titleHighlight: 'Architects',
    headerIcon: 'Brain',
    subtitle: 'Identity-driven optimization · self-built system · intentionality on their terms',
    profile: {
      mantra: 'I want to become better… on my terms',
      pillars: [
        { title: 'Self-built system', detail: 'Design, align with values, repeat, refine as science evolves' },
        { title: 'Structured & disciplined', detail: 'Goals, tracking, accountability, proactive control' },
        { title: 'Clean & natural', detail: 'Transparency, intentional formulation, penalize artificial' },
        { title: 'High standards', detail: 'Research-first, scrutinize ingredients, high opt-in bar' },
      ],
      values: ['Persistence', 'Goal achievement', 'Optimism', 'Travel & exploration', 'Stability'],
    },
    quotes: [
      {
        text: 'What\'s easy about my routine is that I\'m consistent… it\'s consistent and clean and moral and of high ethical standards.',
        attribution: 'Eric, Wellness Architect',
      },
    ],
    speakerNotes:
      'Wellness Architects are the performance segment. Health is holistic, mind, body, spirit, with extra emphasis on physical fitness. They don\'t wing it: ambitious goals, explicit plans, discipline. They experiment, but experimentation serves optimization, not novelty for its own sake. Values include persistence, optimism, living in the present, and stability milestones. Few significant H&W challenges, when life interrupts, they adjust and move on. For founders: this segment will do the homework. They\'ll read ingredient panels. They\'ll pay for quality. They expect to feel in control.',
  },
  {
    id: 'wa-wins-loses',
    layout: 'winsLoses',
    title: 'WA: what wins & what breaks',
    headerIcon: 'Zap',
    subtitle: 'FN as tools to engineer systems, proven efficacy, transparency, system fit',
    wins: [
      'Proven science & clinically backed claims (Nutrafol, Spiz endurance nutrition)',
      'Attributable impact on sleep, digestion, energy, mental clarity',
      'Seamless system integration (Fairlife protein in coffee, ritual kombucha)',
      'Ingredient quality, transparency, values alignment',
    ],
    loses: [
      'No felt results → research alternatives (magnesium for sleep)',
      'GI side effects or system misfit (Go Far breakup)',
      'Over-tracking / unsustainable tools (MyFitnessPal)',
      'Stack complexity & analysis paralysis',
    ],
    tensions: [
      { title: 'Optimization vs complexity', context: 'Don\'t want 10 products for one outcome', opportunity: 'Multi-benefit, stack-consolidating formats' },
      { title: 'Effort vs attribution', context: 'Hard to isolate what\'s working in multi-input systems', opportunity: 'Fast-acting, attributable feedback loops' },
      { title: 'Benefits vs experience', context: 'Will choke down bad taste, but consistency suffers', opportunity: 'High-performance + enjoyable format' },
    ],
    speakerNotes:
      'Slide 6 is the product brief for Wellness Architects. They hire functional nutrition as precision tools, supplements tune the body, foods prevent compromise, beverages anchor rituals. Love stories center on clinical proof, performance support, and frictionless integration. Breakups are rational: no attributable benefit, side effects, or tools that create unsustainable obsession. Three tensions map directly to Ate Days: they want fewer products doing more, clear cause-and-effect, and taste that doesn\'t break adherence. Ideal future products from respondents converge on customizable all-in-one stacks and better energy, efficiency is the unmet need.',
  },
  {
    id: 'oe-mindset',
    layout: 'segmentProfile',
    title: 'Overwhelmed Experimenters',
    titleHighlight: 'Experimenters',
    headerIcon: 'Heart',
    subtitle: 'Hopeful self-improvement · routine under stress · bandwidth is the bottleneck',
    profile: {
      mantra: 'I want to feel (and age) better… so I try to do better',
      pillars: [
        { title: 'Routine grounded in needs', detail: 'Longevity, diagnoses, gaps, energy moments, replacing bad habits' },
        { title: 'Balance physical + emotional', detail: 'Nutrition, movement, sleep + mental wellbeing & social' },
        { title: 'Clean & natural', detail: 'Whole foods, better-for-you swaps (soda → Poppi)' },
        { title: 'Core + exploration', detail: 'Staples stick; experiments drop if no felt impact or too complex' },
      ],
      values: ['Community & relationships', 'Self-improvement', 'Creativity', 'Security', 'Helping others'],
    },
    quotes: [
      {
        text: 'How does my routine fit into my daily life? It honestly doesn\'t fit… which is why I gotta squeeze it in and remember to take all this stuff.',
        attribution: 'Max, Overwhelmed Experimenter',
      },
    ],
    speakerNotes:
      'Overwhelmed Experimenters are engaged but stretched. Health matters, they try many things, but life competes for bandwidth. Their mantra is improvement under constraint, not optimization for its own sake. Values skew toward community, creativity, security, and helping others. Routine exists but doesn\'t always fit daily life, Max\'s quote is the segment in one sentence. They want balance and consistency in simple, sustainable ways. Unlike Architects, tensions hit harder: frustration, mental fatigue, skepticism, abandonment of solutions. Product opportunity: reduce cognitive load and make progress feel manageable.',
  },
  {
    id: 'oe-wins-loses',
    layout: 'winsLoses',
    title: 'OE: what wins & what breaks',
    headerIcon: 'Zap',
    subtitle: 'FN as gap supports, easy ritual, taste, felt impact, permission to feel "good enough"',
    wins: [
      'Easy morning ritual (AG1, "starting the day off right")',
      'Treat-like swaps with health story (Poppi replacing Diet Coke)',
      'Gentle rituals with sensory payoff (green tea calm, gummy vitamins)',
      'Clean labels, targeted benefits (skin, gut, immunity)',
    ],
    loses: [
      'No visible results over time (collagen powder)',
      'Multi-step prep feels like hassle (Emergen-C vs vitamin C pill)',
      'Complexity and remembering too many products',
      'Poor taste or inconvenient formats',
    ],
    tensions: [
      { title: 'Investment vs impact', context: 'Keep trying; often unsure if products work', opportunity: 'Felt impact first, same-day sensory proof' },
      { title: 'Stickiness', context: 'Inconsistent schedules, low tolerance for multi-step', opportunity: 'Done-for-you simplicity, no timing/stacking' },
      { title: 'Enjoyment', context: 'Bad taste = easy to cut; good taste = core ritual', opportunity: 'Treat-like formats, premade RTD, gummies/chews' },
    ],
    speakerNotes:
      'Overwhelmed Experimenters hire FN to bridge intention and reality, daily staple or band-aid in a rush. Love stories are emotional: easy, guilt-reducing, ritualistic. Poppi and AG1 are exemplars, replacement behavior and morning anchor. Breakups are about hassle, sugar guilt, no results, and complexity. Taste and format aren\'t nice-to-haves; they\'re adoption drivers. Gummies win despite efficacy skepticism because they\'re easy and palatable. Ideal futures: more in one product, enjoyment, and measurable proof (smart bed integration, check-up tie-ins). This segment buys permission, products that feel "good enough" without demanding perfection.',
  },
  {
    id: 'segment-refresh',
    layout: 'segmentRefresh',
    title: 'Segment refresh',
    titleHighlight: 'refresh',
    headerIcon: 'RefreshCw',
    subtitle: 'A quick reset on our two targets before we shift from profiles to consumer voice and launch strategy',
    segments: {
      left: {
        label: 'Wellness Architects',
        role: 'Primary target',
        stat: '13% · ~$82/mo supplements',
        mantra: '"I want to become better… on my terms"',
        accent: 'emerald',
        differentiators: [
          'Identity-driven optimization, wellness is central to who they are',
          'Self-built, research-driven system with high ingredient standards',
          'Highest spend and influence, others seek their advice on FN',
        ],
        looksFor: [
          'Proven efficacy and clinically credible claims',
          'Ingredient transparency and clean, values-aligned formulations',
          'Stack consolidation, fewer products with clear attribution',
        ],
      },
      right: {
        label: 'Overwhelmed Experimenters',
        role: 'Secondary target',
        stat: '11% · ~$57/mo supplements',
        mantra: '"I want to feel better… so I try to do better"',
        accent: 'amber',
        differentiators: [
          'Deeply motivated but bandwidth-constrained, wellness adds load',
          'Routine grounded in gaps and outages, not full system design',
          'Hopeful experimentation, drops what feels complex or ineffective',
        ],
        looksFor: [
          'Easy integration into existing habits, minimal steps to remember',
          'Fast, felt impact they can sense, not just read on a label',
          'Treat-like formats, good taste, and ritual-friendly experiences',
        ],
      },
    },
    transition:
      'We\'ve gone deep on each segment. From here, we shift from profiles to proof: first, how consumers actually talk about these needs in their own words, then jobs-to-be-done heat, platform implications, and the decisions that turn insight into launch.',
    nextSteps: ['Consumer voice', 'Jobs to be done', 'Platform', 'Decisions'],
    speakerNotes:
      'This is the halfway grounding slide for founders who haven\'t looked at segmentation in months. Don\'t re-teach everything from slides 5-8, just land the essentials: WA is primary, identity-driven, system-building, science-first; OE is secondary, bandwidth-limited, ritual-seeking, felt-impact-first. Both are already category believers. The transition sets up the second half: consumer voice (word cloud), JTBD, platform, messaging fork, activation, decisions. Pause here and ask if anything feels off before moving on.',
  },
  {
    id: 'voice-of-consumer',
    layout: 'quoteThemes',
    visuals: ['quoteWordCloud'],
    title: 'Voice of the consumer',
    titleHighlight: 'consumer',
    headerIcon: 'Mic',
    subtitle: '18 quotes from IDIs & ethnography, distilled into recurring language and six strategic themes',
    bullets: [
      'Sleep, nutrition, and routine friction surface in nearly every interview, regardless of segment',
      'WA language skews toward systems, efficacy, and transparency; OE toward ease, ritual, and felt impact',
      'Ideal products converge on consolidation: more benefit, fewer steps, clearer proof it\'s working',
    ],
    speakerNotes:
      'This slide gives founders the emotional texture behind the segmentation. The word cloud is built from all consumer quotes in the study, including the five featured on earlier slides plus 13 additional IDI excerpts from the SBK report. Six themes organize what consumers said unprompted: sleep as foundation, nutrition as whole-body maintenance, routine fit, proof and transparency, ease and taste, and the system-vs-gap-support fork. Use this to ground agency conversations: these are the words real people use, not marketing abstractions. The cloud should reinforce that both segments share sleep and nutrition language, but WA over-indexes on performance and proof while OE over-indexes on friction and ritual.',
  },
  {
    id: 'jtbd-heat',
    layout: 'jtbdHeat',
    visuals: ['jtbdChart'],
    title: 'Jobs to be done',
    titleHighlight: 'done',
    headerIcon: 'Radar',
    subtitle: 'Both segments hire FN for all jobs, heat concentrates on performance, sleep, gaps, and look/feel',
    jtbd: [
      { job: 'Support overall health & wellness', heatWA: 'high', heatOE: 'high' },
      { job: 'Fill perceived nutritional gaps', heatWA: 'high', heatOE: 'high' },
      { job: 'Enhance physical or mental performance', heatWA: 'high', heatOE: 'medium' },
      { job: 'Look and feel better', heatWA: 'medium', heatOE: 'high' },
      { job: 'Address a health condition', heatWA: 'medium', heatOE: 'medium' },
      { job: 'Sleep support', heatWA: 'high', heatOE: 'high' },
      { job: 'Stress / anxiety management', heatWA: 'medium', heatOE: 'high' },
    ],
    bullets: [
      'Sleep, energy, focus, and stress align with Ate Days need-state exploration',
      'OE over-indexes on look/feel better and stress; WA on performance and system tuning',
    ],
    speakerNotes:
      'JTBD framing keeps us honest about breadth vs focus. Ethnography confirms both segments use functional nutrition across the full job map, general health, gaps, conditions, performance, appearance. The heat map shows where to lead launch messaging: sleep and overall wellness are universal; performance skews WA; look/feel and stress skew OE. This doesn\'t mean we need separate products per job, multi-benefit formulations are explicitly recommended in strategic implications, but it tells us which lead benefit to put on the front of the box for each sub-line.',
  },
  {
    id: 'platform-implications',
    layout: 'implications',
    title: 'Brand positioning implications',
    titleHighlight: 'Brand positioning',
    headerIcon: 'Layers',
    subtitle: 'What both segments need from Ate Days, the bridge positioning',
    pillars: [
      { title: 'Impact obvious', detail: 'Fast-acting, noticeable, attributable, not buried in a 10-product stack' },
      { title: 'Credible & clean', detail: 'Science-backed claims, intentional formulations, transparent ingredients' },
      { title: 'Easy integration', detail: 'Fits imperfect lives, reduces friction, not adds steps' },
      { title: 'Multi-benefit efficiency', detail: 'One product replacing several, physical + mental/emotional' },
      { title: 'Taste–function solved', detail: 'Benefits without sacrificing consumption experience' },
    ],
    positioningSpaces: [
      'Impact-obvious wellness that works in real life',
      'Wellness that works your way',
      'Effortless, impactful wellness',
      'Frictionless wellness',
    ],
    speakerNotes:
      'Slide 10 is the unified brand platform, what we can say to both segments without splitting the company. SBK\'s strategic implications section names four positioning territories; "impact obvious wellness that works in real life" is the anchor. Product principles: benefit-led not ingredient-led, clean formulations, credible science, formats that solve the taste-function tradeoff both segments describe differently. Multi-benefit is a core differentiator, Architects want stack simplification; Experimenters want more in one with less to remember. Need states for launch: physical energy, performance, mental energy/focus, stress, sleep, all validated.',
  },
  {
    id: 'segment-nuance',
    layout: 'compare',
    visuals: ['tierPyramid'],
    title: 'One brand, tailored messaging',
    titleHighlight: 'One brand',
    headerIcon: 'MessageSquare',
    subtitle: 'Same platform and master brand; campaigns, creative, ads, and landing pages adapt by segment through the funnel',
    bullets: [
      'Not two brands, one Ate Days with segment-aware expressions where relevance matters',
      'Shared brand in broad-reach channels; WA- and OE-led copy and LP variants deeper in the funnel',
    ],
    compare: {
      left: {
        label: 'Wellness Architects',
        role: 'Primary target',
        tagline: 'Your daily performance system',
        items: [
          'Make wellness feel: more controllable',
          'Eliminates: inefficiency, complexity',
          'Product focus: modules & systems (morning energy, recovery)',
          'Tonality: powerful and purposeful',
          'Experience role: makes the system more enjoyable',
        ],
        accent: 'emerald',
      },
      right: {
        label: 'Overwhelmed Experimenters',
        role: 'Secondary target',
        tagline: 'Your daily support system',
        items: [
          'Make wellness feel: more manageable',
          'Eliminates: frustration, doubt, bad taste',
          'Product focus: essentials (daily nutrition, wind-down, stress)',
          'Tonality: impactful and supportive',
          'Experience role: ritualizes the routine',
        ],
        accent: 'amber',
      },
    },
    speakerNotes:
      'This slide operationalizes segment tailoring, not a brand split. One Ate Days platform; campaigns can reach both segments while creative, ads, and landing pages flex by audience through the funnel. Architects get "performance system" language, controllable, modular, expandable stacks. Experimenters get "support system", manageable, essential, ritual-friendly. SBK tiered architecture (essentials, bridge, performance systems) scales product depth without dividing the master brand. Founders should align on where shared brand voice stays constant vs where segment-led expressions take over in channel and creative.',
  },
  {
    id: 'insight-to-activation',
    layout: 'forwardSummary',
    visuals: ['dataToAction'],
    title: 'From insight to activation',
    titleHighlight: 'activation',
    headerIcon: 'TrendingUp',
    subtitle: 'Persona understanding distills into channel, cadence, and message, where agency partners dial in each segment\'s sweet spot',
    lead: 'Our understanding of personas enables us to engage with each segment on the channels they prefer, at a cadence they prefer, with messaging most relevant and personal to them.',
    bullets: [
      'Consumer Illumination + quant segmentation give agencies a shared playbook, WA vs OE specificity, not generic wellness',
      'Same platform brand; forked channel strategy, touchpoint cadence, and creative tonality per segment',
      'Forward work with agency partners: test and refine sweet spots before launch across paid, owned, and earned',
    ],
    speakerNotes:
      'This is the forward-looking bridge slide, what we do with the research now. The insight isn\'t academic: it becomes activation inputs. Data from ethnography, IDIs, and quant distills into persona understanding, mindset, JTBD heat, tonality fork. That understanding maps to three execution levers agencies will own: which channels each segment lives in, how often and when we show up, and what message lands as personal and relevant. Wellness Architects need expert, system-building touchpoints; Overwhelmed Experimenters need ritual-friendly, low-friction discovery. We\'re aligning with agencies now to find the sweet spot for each segment, this slide is the brief for that work.',
  },
  {
    id: 'founder-decisions',
    layout: 'decisions',
    title: 'Branding Strategy Drivers for Ate Days',
    titleHighlight: 'Branding Strategy Drivers',
    headerIcon: 'CheckSquare',
    subtitle: 'Four drivers shaping positioning and launch bundle',
    decisions: [
      {
        question: 'Unified brand with sub-lines',
        options: ['Unified brand with sub-lines', 'Distinct sub-lines to cater to each segments'],
        recommendation: 'Single platform; fork messaging and SKU architecture, not master brand',
      },
      {
        question: 'Launch need state',
        options: ['Sleep (universal pillar, high heat both segments)', 'Energy/focus (WA-leaning, differentiation)', 'Stress/wind-down (OE ritual opportunity)'],
        recommendation: 'Sleep or energy/focus, both segments over-index; sleep has strongest shared ethnography',
      },
      {
        question: 'Credentialing/validation',
        options: ['WA: clinical evidence + ingredient transparency', 'OE: felt impact + simplified science + certifications', 'Both: same core claims, different emphasis in creative'],
        recommendation: 'Same product proof; WA leads with science, OE leads with felt impact and ease',
      },
      {
        question: 'Brand and GTM strategy',
        options: ['System integration (stacks, precise dosing), WA', 'Treat-like RTD / gummies / premade, OE', 'One hero format optimized for both'],
        recommendation: 'Hero format that is fast-acting + ritual-friendly; avoid powder-only or pill-only',
      },
    ],
    speakerNotes:
      'Close with decisions, not summary. Founders know the research, they need alignment on what to do Monday. Four decisions: brand architecture (unified platform, forked execution), lead need state (sleep has strongest shared signal), credibility model (same science, different emphasis), and format (integration vs ritual, our fast-acting format should serve both if consumption experience is designed intentionally). Consumer insight statements from the report: WA, "Health is who I am; reducing complexity would be a plus." OE, "I\'m always doing something for my health, but figuring out what works feels overwhelming." That\'s the company in two sentences.',
  },
]
