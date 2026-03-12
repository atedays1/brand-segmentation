/**
 * Board Deck: 13 slides — simple, compelling copy for arrow-key presentation.
 */

export const boardDeckSlides = [
  {
    id: 1,
    title: 'Objective',
    headerIcon: 'Target',
    subtitle: 'Elevate understanding of market, consumer, where to play and how to win.',
  },
  {
    id: 2,
    title: 'Format',
    headerIcon: 'Layout',
    subtitle: 'Examining the cultural elevation of health & wellness via use & interest.',
  },
  {
    id: 3,
    title: 'Health & Wellness is a $69B market',
    highlight: '+5.2% growth in 2024',
    highlightIcon: 'BarChart3',
    subtitle: 'A large, growing category with clear opportunity.',
  },
  {
    id: 4,
    title: 'General Health is the largest segment',
    titleHighlight: 'General Health',
    headerIcon: 'Layers',
    subtitle: 'Consumers use supplements across these categories, by market share:',
    bullets: [
      { text: 'Fitness and Energy', icon: 'Zap' },
      { text: 'Healthy Aging', icon: 'Sparkles' },
      { text: 'Menopause', icon: 'Scale' },
      { text: 'Gut Health', icon: 'ShieldPlus' },
      { text: 'Healthy Sleep — important & growing; ripe for innovation beyond magnesium', bold: true, icon: 'MoonStar' },
      { text: 'Brain Health — shift to cognitive performance; brain–gut connection', bold: true, icon: 'BrainCircuit' },
      { text: 'Weight Management', icon: 'Dumbbell' },
      { text: 'Mood & Mental Health — anxiety, younger consumers; magnesium, ashwagandha, herbals', bold: true, icon: 'Frown' },
      { text: 'Sexual Health', icon: 'Infinity' },
    ],
  },
  {
    id: 5,
    title: "The 'jobs' consumers want supplements to perform",
    headerIcon: 'ListChecks',
    bullets: [
      'Fill perceived nutritional gaps (Gruns)',
      { text: 'Support overall health and wellness', bold: true },
      { text: 'Enhance physical or mental performance', bold: true },
      'Address a specific condition (Biologica)',
      'Look and feel better',
    ],
  },
  {
    id: 6,
    title: 'Sub-categories and emerging focus',
    headerIcon: 'Layers',
    bullets: [
      'Symptom management: menopause, GLP-1 side effects…',
      { text: '"In the moment" targeted wellness: energy, focus, sleep', bold: true },
    ],
    subtitle: 'A growing younger consumer base is driving focus on mood/mental health, energy, and sleep.',
  },
  {
    id: 7,
    title: 'Awareness & discovery',
    headerIcon: 'Search',
    quote: 'When I want to perform at my best, I need solutions that help me maximize my effectiveness so I can achieve my goals.',
    bullets: [
      'Boost energy and stamina',
      'Support performance & recovery',
      'Elevate focus',
    ],
  },
  {
    id: 8,
    title: 'Consumer expectations',
    headerIcon: 'ShieldCheck',
    quote: 'I look for:',
    bullets: [
      'Fast-acting · tangible results · proven options',
      'Clean products · quality ingredients · transparency',
      'Science-backed claims · third-party certifications · clear impact',
    ],
    subtitle: 'Growing these trust anchors propels breakout and condenses the customer journey.',
  },
  {
    id: 9,
    title: 'Segmentation & personas',
    headerIcon: 'Users',
    bullets: [
      { text: 'Goal-oriented and outcome-based — immediate results for the near term', bold: true },
      'Routine-driven and prevention-focused — peace of mind for the long term',
      { text: 'Curious but cautious — research-heavy; quick to stop if no results', bold: true },
      'Simplicity-focused — easy solutions but overwhelmed by options',
      'Peer-influenced and trend-driven — community and social equity',
    ],
  },
  {
    id: 10,
    title: 'Here are our people',
    headerIcon: 'PersonStanding',
  },
  {
    id: 11,
    title: '',
    personas: [
      {
        image: '/images/personas/wellness-optimizers.png',
        headline: 'Goal-oriented and outcome-based — immediate results for the near term',
        name: 'Dr. Maria Santos, 34',
        role: 'Pediatrician & Wellness Advocate',
        segment: '13% of the market',
        mindset: 'Scientific rigor and personal passion; health tech, biomarkers, high-quality supplements.',
        approach: 'Health and wellness are "essential"; disciplined routine, shares journey, evaluates options.',
        barrier: 'Demands personalized solutions, ingredient sourcing, transparency; skeptical of opaque "expert" claims. Highest spend: $81.60/month.',
        winning: 'Premium, open formulas (e.g. NMN, Ashwagandha) and third-party testing meet her standards. Focus (Mind + Body) delivers science-backed cognitive clarity.',
      },
    ],
  },
  {
    id: 12,
    title: '',
    personas: [
      {
        image: '/images/personas/practical-minimalists.png',
        headline: 'Curious but cautious — research-heavy; quick to stop if no results',
        name: 'Mike Rodriguez, 38',
        role: 'Construction Manager',
        segment: '20% of the market',
        mindset: 'Keeps wellness simple and practical; basic multivitamins, straightforward solutions.',
        approach: '"Everything in moderation" — wants health to be easy, immediate needs over long-term goals.',
        barrier: 'Hard to stay motivated; many barriers to routine; lack of trust in experts.',
        winning: 'Waterless powder solves "pill fatigue" and fits a busy life. Sleep packet: fast-acting, no prep. Instant oral absorption delivers the rapid impact he demands.',
      },
    ],
  },
  {
    id: 13,
    title: "What's next?",
    headerIcon: 'Goal',
  },
]
