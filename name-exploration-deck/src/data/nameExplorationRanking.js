/**
 * Brand and SEO viability scores from Name Exploration PDF (AI research).
 * Stars are out of 5; overallDiscoverability is out of 10.
 */
export const nameExplorationRanking = [
  { name: 'NUDO', googleSeo: 5, aiDistinctiveness: 5, brandability: 5, overall: 9.8 },
  { name: 'OS-46', googleSeo: 5, aiDistinctiveness: 5, brandability: 4, overall: 9.7 },
  { name: 'SUMMS', googleSeo: 4, aiDistinctiveness: 5, brandability: 5, overall: 9.6 },
  { name: 'Atoma', googleSeo: 4, aiDistinctiveness: 4, brandability: 5, overall: 9.4 },
  { name: 'Gradient', googleSeo: 3, aiDistinctiveness: 4, brandability: 5, overall: 9.2 },
  { name: 'Cued', googleSeo: 4, aiDistinctiveness: 4, brandability: 4, overall: 9.2 },
  { name: 'Aimpoint', googleSeo: 3.5, aiDistinctiveness: 4, brandability: 4.5, overall: 9.1 },
  { name: 'Maven Labs', googleSeo: 3.5, aiDistinctiveness: 3.5, brandability: 5, overall: 8.9 },
  { name: 'Maven', googleSeo: 3, aiDistinctiveness: 3.5, brandability: 5, overall: 8.8 },
  { name: 'Kickstand', googleSeo: 4, aiDistinctiveness: 4, brandability: 4, overall: 8.8 },
  { name: 'Tether', googleSeo: 3, aiDistinctiveness: 4, brandability: 5, overall: 8.7 },
  { name: 'Kara', googleSeo: 2, aiDistinctiveness: 3, brandability: 4, overall: 8.7 },
  { name: 'Northbound', googleSeo: 3, aiDistinctiveness: 3.5, brandability: 5, overall: 8.6 },
  { name: 'Capybara Labs', googleSeo: 3.5, aiDistinctiveness: 3.5, brandability: 4, overall: 8.5 },
  { name: 'Nexus', googleSeo: 3, aiDistinctiveness: 3.5, brandability: 5, overall: 8.2 },
  { name: 'SULA / SULA Labs', googleSeo: 3.5, aiDistinctiveness: 3.5, brandability: 4, overall: 8.0 },
  { name: 'Influx', googleSeo: 3, aiDistinctiveness: 3.5, brandability: 5, overall: 8.0 },
  { name: 'kHZ / kHZ Labs', googleSeo: 2, aiDistinctiveness: 3, brandability: 5, overall: 7.6 },
  { name: 'kHZ', googleSeo: 2, aiDistinctiveness: 3, brandability: 5, overall: 7.5 },
  { name: 'Operating System', googleSeo: 2, aiDistinctiveness: 2.5, brandability: 5, overall: 7.4 },
  { name: 'Gopher', googleSeo: 2, aiDistinctiveness: 2.5, brandability: 3, overall: 7.2 },
]

const img = (file) => `name-exploration/${file}`

/**
 * Green + yellow + cautionary name slides (alphabetical), with mockup image paths.
 * status: available (green) | maybe (yellow) | cautionary (not advancing, still shown)
 */
const nameCandidatesUnsorted = [
  {
    name: 'Aimpoint',
    status: 'available',
    note: 'Precision / focus metaphor',
    images: [img('aimpoint.png')],
    meaning: [
      'English compound: aim + point, a precision targeting idea',
      'Mockup leans tactical: crosshair mark, matte black, “precision focus”',
      'Says: hit the benefit cleanly, not browse a vague wellness aisle',
    ],
  },
  {
    name: 'Atoma',
    status: 'available',
    note: 'Science-adjacent · quiet premium feel',
    images: [img('atoma.jpeg')],
    meaning: [
      'From Greek átomos / Latin atomus: “uncut,” indivisible particle',
      'Packaging is quiet science: circle mark, SLEEP lead, marble stillness',
      'Implies essential units of wellness, small, complete, elemental',
    ],
  },
  {
    name: 'Capybara Labs',
    status: 'maybe',
    note: 'Current active Class 005 for “Capybara Coffee”',
    images: [img('capybara-labs.png')],
    meaning: [
      'From Guaraní/Tupi roots for the calm “grass-eater” rodent',
      'Mock shows four need-state boxes like a gentle, social herd of routines',
      'Personality: grounded, unflappable wellness rather than high-strung hype',
      'Caution: similar to Gopher, the rodent association is a big hurdle.',
    ],
  },
  {
    name: 'Cued',
    status: 'available',
    note: 'Triggers, biological signals, intentional state shifts',
    images: [img('cued.png')],
    meaning: [
      'English cue: a signal that prompts the next action',
      'Split black/white pack + “Prompted. Signaled. Ready.” literalizes the cue',
      'Brand as the trigger that starts focus, energy, or calm on demand',
      'Caution: potential for misspellings. E.g., queued, cute…',
    ],
  },
  {
    name: 'Gopher',
    status: 'cautionary',
    note: 'Memorable but misaligned · weak category/science cues · SEO headwinds · inflated CAC',
    images: [img('gopher-analysis-visual.png')],
    meaning: [
      'Rodent digger, or slang “go-fer” (errand-runner), not a health cue',
      'Mock tries premium green/gold, but the word still reads novelty/pest',
      'Why it fails pillars: memorable for the wrong category associations',
    ],
  },
  {
    name: 'Gradient',
    status: 'maybe',
    note: 'Current active Class 005 for “Smart Gradient” · strong brand story fit',
    images: [img('gradient-1.png')],
    meaning: [
      'English: a smooth slope or gradual change between states',
      'Packaging uses literal color gradients and Focus → Energy → Calm bands',
      'Story: shift states through the day without spikes or crashes',
    ],
  },
  {
    name: 'Influx',
    status: 'maybe',
    note: 'Current active Class 005 for “Influx Inspire”',
    images: [img('influx.png')],
    meaning: [
      'Latin influxus: a flowing in (in + fluere, to flow)',
      'Diagonal flow lines on cream/navy packs suggest intake and motion',
      'Benefit read: nutrients or clarity flowing into the system',
    ],
  },
  {
    name: 'KARA',
    status: 'maybe',
    note: 'Current active class for “KARAMD”',
    images: [img('kara.png')],
    meaning: [
      'Short coined mark; also echoes Italian cara (“dear”) as a given name',
      'Four colored SKUs (Sleep, Energy, Calm, Focus) make “KARA” a family stamp',
      'Soft, personal sound with a modular product line underneath',
    ],
  },
  {
    name: 'kHZ Labs',
    status: 'available',
    note: 'Frequency / signal metaphor · inventable mark',
    images: [img('khz.png')],
    meaning: [
      'kHz = kilohertz: cycles per second, a unit of frequency',
      'Black cube + wave graphic = signal / oscillation, not herb-shop cues',
      'Positions the brand as tuning the body’s “frequency” for clarity',
    ],
  },
  {
    name: 'Kickstand',
    status: 'available',
    note: 'Support / balance metaphor · clear spelling',
    images: [img('kickstand.png')],
    meaning: [
      'The prop that holds a bike upright when you stop',
      'Pack copy Speed / Support / Sustain mirrors stand-up-and-go utility',
      'Promise: something that keeps you balanced in motion and at rest',
    ],
  },
  {
    name: 'Maven Labs',
    status: 'available',
    note: 'Expertise cue · Labs suffix for science credibility',
    images: [img('maven-labs.png')],
    meaning: [
      'Yiddish meyvn (from Hebrew): expert, connoisseur, trusted knower',
      '“Labs” + navy/peach system packaging = informed, not trendy',
      'Fits Wellness Architects who want a smart insider brand',
    ],
  },
  {
    name: 'Nexus',
    status: 'available',
    note: 'Connection / hub language · premium system cue',
    images: [img('nexus.png')],
    meaning: [
      'Latin nexus: a binding, link, or connected group',
      'Tagline “Remove the excess. Keep the connection.” restates the Latin root',
      'Black/neon system look = hub that links Focus, Energy, Calm',
    ],
  },
  {
    name: 'Northbound',
    status: 'available',
    note: 'Direction / progress story',
    images: [img('northbound.jpeg')],
    meaning: [
      'English: traveling toward the north; upward / onward direction',
      'Compass-needle mark + “HEAD NORTH” on white packs',
      'Aspiration: progress, orientation, moving toward a better state',
    ],
  },
  {
    name: 'NUDO',
    status: 'available',
    note: 'Clear Class 005 path · top AI discoverability score',
    images: [img('nudo.png'), img('nudo-2.png')],
    meaning: [
      'Latin nūdō: to bare, uncover, lay open; Spanish nudo also = knot',
      'Minimal silver stick + amber jar = stripped-back, nothing extra',
      'Brand read: reveal the essential formula; tie the daily ritual tight',
      'Leaving only what matters…',
    ],
  },
  {
    name: 'Operating System',
    status: 'available',
    note: 'Literal OS metaphor · weaker SEO ownership',
    images: [img('operating-system.png')],
    meaning: [
      'Computing term: the layer that runs everything else',
      'Beige clinical pack + “Waterless Daily Clarity” = human OS metaphor',
      'Implies foundational daily software for body and mind',
    ],
  },
  {
    name: 'OS-46',
    status: 'available',
    note: 'Operating-system metaphor · human chromosomes nod',
    images: [img('os46-1.png'), img('os46-2.png')],
    meaning: [
      'OS = operating system; 46 = human chromosome count',
      '“Optimize your operating system. Elevate your hardware.” on pack',
      'Tech-biology bridge: performance stack for the human machine',
    ],
  },
  {
    name: 'SULA Labs',
    status: 'available',
    note: 'Short, logo-flexible · Labs variant option',
    images: [img('sula.jpeg')],
    meaning: [
      'From Old Norse súla (gannet); genus name for ocean-going seabirds',
      'Forest-green + gold “single essential” pack feels coastal-premium',
      'Short, logo-ready mark with a natural, elevated association',
    ],
  },
  {
    name: 'SUMMS',
    status: 'available',
    note: 'Compact coined form · strong distinctiveness',
    images: [img('summs.png')],
    meaning: [
      'Coined from sum: the total after you add what matters',
      'Pack line “SUMMS is what’s left / the sum of less” is the etymology',
      'Visual: white minus-noise layout, powder as the concentrated remainder',
    ],
  },
  {
    name: 'Tether',
    status: 'available',
    note: 'Connection / grounding · packaging-friendly',
    images: [img('tether-1.png'), img('tether-2.jpeg')],
    meaning: [
      'English: a rope that ties and grounds without strangling',
      'Wavy connected line + “Stay connected” on cream packs',
      'Emotional promise: anchored to self, science, and daily ritual',
    ],
  },
]

export const nameCandidatesForSlides = [...nameCandidatesUnsorted].sort((a, b) =>
  a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
)

/** Legacy grouped lists for out / cautionary slides */
export const nameCandidates = {
  available: nameCandidatesForSlides.filter((n) => n.status === 'available'),
  maybe: nameCandidatesForSlides.filter((n) => n.status === 'maybe'),
  out: [
    { name: 'Peregrine', note: 'Did not pass Class 005 search' },
    { name: 'Platypus', note: 'Did not pass Class 005 search' },
    { name: 'Pulsa', note: 'Did not pass Class 005 search' },
    { name: 'SOLEN', note: 'Live but pending Class 005 for “SOLÉN” · treated as out' },
    { name: 'Lumina', note: 'Did not pass Class 005 search' },
    { name: 'Zera Pure', note: 'Did not pass Class 005 search' },
  ],
  cautionary: [],
}

export function scoreForName(name) {
  const aliases = {
    'SULA Labs': 'SULA / SULA Labs',
    'kHZ Labs': 'kHZ / kHZ Labs',
    SUMMS: 'SUMMS',
    'SUMM / SUMMS': 'SUMMS',
    KARA: 'Kara',
  }
  const lookup = aliases[name] || name
  const exact = nameExplorationRanking.find(
    (r) => r.name === lookup || r.name === name || r.name.toLowerCase() === name.toLowerCase(),
  )
  if (exact) return exact
  const base = name.split(/[ /]/)[0].trim()
  return (
    nameExplorationRanking.find((r) => r.name === base) ||
    nameExplorationRanking.find((r) => r.name.includes(base) || name.includes(r.name)) ||
    null
  )
}
