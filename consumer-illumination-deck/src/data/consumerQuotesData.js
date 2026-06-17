/**
 * Consumer quotes from SBK Consumer Illumination (May 2026).
 * Deck slide quotes + IDI/ethnography excerpts from the final report.
 */

export const illuminationQuotes = [
  {
    text: 'If I get 5 or 6 hours of sleep… I just don\'t have as much energy or I can\'t perform as well during my exercise sessions as I do when I have 8 hours of sleep.',
    attribution: 'Eric, Wellness Architect',
    segment: 'wa',
  },
  {
    text: 'For me it starts with sleep. If I don\'t get the sleep I need it affects a lot of different areas of my life so I try to get 8 hours in each night.',
    attribution: 'Michael J, Overwhelmed Experimenter',
    segment: 'oe',
  },
  {
    text: 'What\'s easy about my routine is that I\'m consistent… it\'s consistent and clean and moral and of high ethical standards.',
    attribution: 'Eric, Wellness Architect',
    segment: 'wa',
  },
  {
    text: 'How does my routine fit into my daily life? It honestly doesn\'t fit… which is why I gotta squeeze it in and remember to take all this stuff.',
    attribution: 'Max, Overwhelmed Experimenter',
    segment: 'oe',
  },
  {
    text: 'The role that it plays is that I feel better all around. I sleep better, I digest better, I have energy, I have mental clarity. I feel all these things are maintained by nutrition.',
    attribution: 'Eric, Wellness Architect',
    segment: 'wa',
  },
  {
    text: 'When selecting functional nutrition products, the most important factors center around proven efficacy, ingredient transparency, and how well the product fits into a daily, personalized routine.',
    attribution: 'Eliza, Wellness Architect',
    segment: 'wa',
  },
  {
    text: 'I use AI to skim through the information out there. Then I cross check it with Google and ask questions of the few groups that I\'m in on Facebook.',
    attribution: 'Joe, Wellness Architect',
    segment: 'wa',
  },
  {
    text: 'I incorporate supplements into my daily regimen in order to make sure I\'m taking advantage of every opportunity to stay as healthy as possible.',
    attribution: 'Michael F, Wellness Architect',
    segment: 'wa',
  },
  {
    text: 'I believe that sleep is very important… if I get 5 or 6 hours of sleep I just don\'t have as much energy or I can\'t perform as well during my exercise sessions.',
    attribution: 'Eric, Wellness Architect',
    segment: 'wa',
  },
  {
    text: 'Getting sleep is so important in health and wellness. Sleep is when our bodies rejuvenate and recharge.',
    attribution: 'LaKetha, Wellness Architect',
    segment: 'wa',
  },
  {
    text: 'Overall, I try to be well rounded when it comes to my health. If you put in the effort in a lot of different areas, it makes up for the things that life throws at you.',
    attribution: 'Michael J, Overwhelmed Experimenter',
    segment: 'oe',
  },
  {
    text: 'It honestly doesn\'t fit into my daily life, which is why I gotta squeeze it in and remember to take all this stuff. I don\'t think anything\'s easy about the routine because you gotta remember so much.',
    attribution: 'Max, Overwhelmed Experimenter',
    segment: 'oe',
  },
  {
    text: 'The ease of consumption matters a lot. If it integrates seamlessly into my existing habits, I barely have to think about it and that\'s ideal.',
    attribution: 'Kelly, Overwhelmed Experimenter',
    segment: 'oe',
  },
  {
    text: 'Functional nutrition products fit into my overall health and wellness either as a daily staple or as a band aid/in a rush product.',
    attribution: 'Laura, Overwhelmed Experimenter',
    segment: 'oe',
  },
  {
    text: 'Even in college, I would refuse to pull all-nighters. I think that prioritizing sleep is something that most people my age don\'t do.',
    attribution: 'Laura, Overwhelmed Experimenter',
    segment: 'oe',
  },
  {
    text: 'Okay for the ritual things like the beverages, I like them to be canned/premade… for vitamins I really prefer a gummy or a chewable pill. I hate swallowing pills. I will pay more to not have to do that.',
    attribution: 'Laura, Overwhelmed Experimenter',
    segment: 'oe',
  },
  {
    text: 'I do better with things that I do actually enjoy at the same time as getting the benefits, so it\'s good for me to find things that balance out the taste and texture as well as the benefit.',
    attribution: 'Rachael, Wellness Architect',
    segment: 'wa',
  },
  {
    text: 'The consumption experience is not as important as the actual nutritional value… I\'d rather sacrifice some of the consumption experience in order to get the best ingredients.',
    attribution: 'Kim, Wellness Architect',
    segment: 'wa',
  },
]

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'that', 'with', 'this', 'have', 'from', 'they', 'what', 'when',
  'your', 'about', 'into', 'just', 'more', 'much', 'very', 'also', 'than', 'then',
  'them', 'their', 'there', 'been', 'being', 'were', 'was', 'are', 'but', 'not',
  'all', 'can', 'will', 'how', 'does', 'don', 'its', 'our', 'out', 'who', 'get',
  'she', 'him', 'her', 'his', 'you', 'any', 'are', 'had', 'has', 'did', 'would',
  'could', 'should', 'because', 'which', 'other', 'some', 'such', 'only', 'own',
  'same', 'so', 'if', 'or', 'as', 'at', 'by', 'an', 'be', 'to', 'of', 'in', 'on',
  'it', 'is', 'am', 'my', 'me', 'i', 'a', 'do', 'up', 'try', 'like', 'think',
  'feel', 'things', 'thing', 'really', 'lot', 'way', 'make', 'take', 'get', 'use',
])

function tokenizeQuotes(quotes) {
  const freq = new Map()
  for (const q of quotes) {
    const words = q.text
      .toLowerCase()
      .replace(/['']/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    for (const w of words) {
      freq.set(w, (freq.get(w) || 0) + 1)
    }
  }
  return freq
}

const rawFreq = tokenizeQuotes(illuminationQuotes)

/** Curated presentation weights: blend frequency with thematic importance. */
const THEME_BOOST = {
  sleep: 12,
  energy: 10,
  routine: 10,
  nutrition: 9,
  health: 9,
  wellness: 8,
  supplements: 8,
  efficacy: 8,
  transparency: 7,
  ingredients: 7,
  habits: 7,
  perform: 7,
  performance: 7,
  consistent: 7,
  clean: 6,
  gummy: 6,
  taste: 6,
  research: 6,
  system: 6,
  simple: 6,
  remember: 6,
  impact: 6,
  clarity: 5,
  moral: 5,
  ethical: 5,
  seamless: 5,
  staple: 5,
  overwhelm: 5,
  balance: 5,
  natural: 5,
  proven: 5,
}

export const quoteWordCloud = Object.entries(THEME_BOOST)
  .map(([text, boost]) => ({
    text,
    weight: boost + (rawFreq.get(text) || 0),
  }))
  .sort((a, b) => b.weight - a.weight)
  .slice(0, 28)

export const quoteThemes = [
  {
    title: 'Sleep is foundational',
    learning: 'Both segments treat sleep as active strategy, not an afterthought. Poor sleep directly erodes energy, mood, and performance.',
    keywords: ['sleep', 'energy', 'perform', 'rejuvenate'],
    segments: 'Both',
  },
  {
    title: 'Nutrition maintains the whole system',
    learning: 'FN is infrastructure for sleep, digestion, energy, and mental clarity, not a single-benefit add-on.',
    keywords: ['nutrition', 'energy', 'clarity', 'digest'],
    segments: 'Both',
  },
  {
    title: 'Routines must fit real life',
    learning: 'OE especially struggles when wellness demands memory, prep, and bandwidth. Friction kills adherence.',
    keywords: ['routine', 'remember', 'squeeze', 'habits'],
    segments: 'OE-led',
  },
  {
    title: 'Proof and transparency earn trust',
    learning: 'WA cross-checks claims with AI, Google, and trusted communities. Efficacy and ingredient transparency are table stakes.',
    keywords: ['proven', 'efficacy', 'transparency', 'research'],
    segments: 'WA-led',
  },
  {
    title: 'Ease and taste drive consistency',
    learning: 'Gummies, premade RTDs, and enjoyable formats win when they integrate into existing rituals without extra steps.',
    keywords: ['gummy', 'taste', 'seamless', 'enjoy'],
    segments: 'OE-led',
  },
  {
    title: 'Systems vs. gap supports',
    learning: 'WA builds optimized stacks; OE uses FN as daily staples or band-aids when life gets hectic.',
    keywords: ['system', 'staple', 'stack', 'consistent'],
    segments: 'Fork',
  },
]
