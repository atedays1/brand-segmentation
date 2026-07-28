/**
 * Name Exploration founder deck (~11 slides).
 * Source: Name exploration PDF — framework, Class 005 shortlist, AI ranking.
 */
import { nameCandidates, nameCandidatesForSlides, nameExplorationRanking, scoreForName } from './nameExplorationRanking.js'

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const nameDetailSlides = nameCandidatesForSlides.map((candidate) => {
  const scores = scoreForName(candidate.name)
  const statusLabel =
    candidate.status === 'available'
      ? 'Available · Class 005 clearer path'
      : candidate.status === 'maybe'
        ? 'Maybe · trademark competition'
        : 'Cautionary'
  const headerIcon =
    candidate.status === 'available' ? 'CheckSquare' : candidate.status === 'maybe' ? 'Zap' : 'GitCompare'
  return {
    id: `name-${slugify(candidate.name)}`,
    layout: 'nameDetail',
    title: candidate.name,
    titleHighlight: candidate.name.includes(' ') ? candidate.name.split(' ')[0] : candidate.name,
    headerIcon,
    subtitle: statusLabel,
    candidate,
    scores,
    speakerNotes: `${candidate.name}: ${candidate.note}. Ask whether this feels on-brand for both WA and OE, then park as yes / maybe / no for the shortlist.`,
  }
})

export const nameExplorationSlides = [
  {
    id: 'cover',
    layout: 'nameCover',
    title: 'Name exploration',
    titleHighlight: 'Name',
    headerIcon: 'Sparkles',
    subtitle: 'Framework, Class 005 shortlist, and AI discoverability rankings',
    lead: 'Goal for this session: align on criteria, review available vs. contested names, and leave with one to a few candidates for deeper trademark search.',
    bullets: [
      'Green = clearer Class 005 path · Yellow = possible trademark competition · Rose = not advancing',
      'AI rankings cover Google SEO, AI/search distinctiveness, brandability, and overall discoverability',
    ],
    speakerNotes:
      'Open by framing the decision: we are not renaming for fun, we are picking a mark that works with Meta Andromeda, SEO, AI search, and premium wellness positioning. End of meeting = shortlist for counsel, not final brand lock.',
  },
  {
    id: 'why-naming',
    layout: 'bullets',
    title: 'Why naming matters now',
    titleHighlight: 'naming',
    headerIcon: 'Radar',
    subtitle: 'Meta Andromeda changes how ads are indexed, interpreted, and served',
    lead: 'Our name tells the algorithm what we do. Our creative tells the audience why they need it.',
    bullets: [
      'Andromeda uses NLP, computer vision, and audio transcription to decode creative and route it to the right buyers',
      'Brand naming must adapt to an algorithm-first environment, not just human shelf intuition',
      'Clear category, benefit, or sensory cues in the name lower acquisition friction',
    ],
    speakerNotes:
      'Bridge from consumer illumination: we know who we are talking to. The name has to help the algorithm and the shopper in three seconds.',
  },
  {
    id: 'name-musts',
    layout: 'musts',
    title: 'Name musts',
    titleHighlight: 'musts',
    headerIcon: 'CheckSquare',
    subtitle: 'Non-negotiables before we fall in love with a word',
    musts: [
      {
        title: 'Category or benefit clarity',
        detail: 'Clear category descriptors, benefit anchors, or sensory words (e.g. ClearSkin, Oatly)',
      },
      {
        title: 'Simple spelling',
        detail: 'No complex or confusing spelling that kills search, voice, or paid social',
      },
      {
        title: 'Room to grow',
        detail: 'Allows category expansion beyond a single SKU into an ecosystem',
      },
    ],
    brandabilityQuestions: [
      'Does it feel premium?',
      'Is it easy to pronounce and remember?',
      'Does it tell a compelling story?',
      'Does it look great in a logo and on packaging?',
      'Can it expand into a full product ecosystem?',
    ],
    speakerNotes:
      'Use this as a filter before aesthetic preference. If a name fails #1 or #2, it inflates CAC no matter how pretty the mockup.',
  },
  {
    id: 'checkpoints',
    layout: 'checkpoints',
    title: 'Evaluation checkpoints',
    titleHighlight: 'checkpoints',
    headerIcon: 'Target',
    subtitle: 'Three lenses we will score against in the ranking table',
    checkpoints: [
      {
        title: 'Google SEO',
        detail: 'How hard it is to own search results given competition, common meanings, and intent',
        questions: [
          'Already dominated by another company or product?',
          'Common word or phrase?',
          'Would someone searching the name likely find you?',
          'Time and money to rank?',
        ],
      },
      {
        title: 'AI / Search distinctiveness',
        detail: 'How easily AI models and modern search associate the name with one brand over time',
        questions: [
          'Unique enough to build its own identity?',
          'One clear commercial meaning?',
          'Clear to ChatGPT, Gemini, Perplexity, Google AI, and voice?',
          'One obvious interpretation when said aloud?',
        ],
      },
      {
        title: 'Brandability',
        detail: 'Memorable, emotionally compelling, and visually flexible as a premium consumer brand',
        questions: [
          'Premium feel?',
          'Pronounceable and sticky?',
          'Story and packaging fit?',
        ],
      },
    ],
    speakerNotes:
      'AI/search distinctiveness is rising in importance because entity recognition is replacing pure keyword matching.',
  },
  {
    id: 'pillars',
    layout: 'pillars',
    title: 'Brand naming pillars',
    titleHighlight: 'pillars',
    headerIcon: 'Layers',
    subtitle: 'Four focus questions for stick-pack wellness positioning',
    pillars: [
      {
        pillar: '1. Clean sourcing',
        question: 'Does it hint at natural origin without sounding cheap?',
        goal: 'Establishes immediate trust',
      },
      {
        pillar: '2. Subtle function',
        question: 'Does it accommodate Energy, Focus, Calm, and Sleep?',
        goal: 'Allows future product extension',
      },
      {
        pillar: '3. Ad clarity',
        question: 'Easily spellable, pronounceable, and clear with a descriptor?',
        goal: 'Keeps Meta / Search acquisition costs low',
      },
      {
        pillar: '4. Aesthetics',
        question: 'Quiet, refined, and minimalist on a stick pack?',
        goal: 'Premium positioning on desks and counters',
      },
    ],
    examples: [
      { name: 'Journal', tone: 'strong', detail: 'Intentionality, daily reflection, quiet routines' },
      { name: 'Gradient', tone: 'strong', detail: 'Smooth state shifts without spikes or crashes' },
      { name: 'Cued', tone: 'strong', detail: 'Triggers, biological signals, intentional shifts' },
      { name: 'Gopher', tone: 'weak', detail: 'Clear/memorable, but friction on sourcing, function, aesthetics' },
      { name: 'Pronto Plus', tone: 'weak', detail: 'Energetic but opposes quiet, elevated, subtle positioning' },
    ],
    speakerNotes:
      'Pillars are the product-brand filter. SEO/AI checkpoints are the discovery filter. Both have to pass.',
  },
  {
    id: 'legend',
    layout: 'legend',
    title: 'How to read the color coding',
    titleHighlight: 'color coding',
    headerIcon: 'MessageSquare',
    subtitle: 'Class 005 read from the exploration PDF · not final legal clearance · one slide per name next',
    legend: [
      {
        status: 'available',
        label: 'Available',
        detail: `${nameCandidates.available.length} names · clearer Class 005 path · worth deeper diligence, not “cleared”`,
      },
      {
        status: 'maybe',
        label: 'Maybe',
        detail: `${nameCandidates.maybe.length} names · adjacent live marks · still discuss if the story is strong`,
      },
      {
        status: 'out',
        label: 'Not advancing',
        detail: 'Failed Class 005 search · summarized after the walkthrough (Gopher shown as cautionary)',
      },
    ],
    lead: 'Next: every green and yellow name with packaging mockups. Star what feels worth trademark spend.',
    bullets: [
      'Images are exploratory packaging directions, not final brand systems',
      'Use AI ranking after gut reaction, not instead of it',
      'Goal: leave with one to three names for deeper trademark search',
    ],
    speakerNotes:
      'One beat for color coding, then into the walkthrough. Pace ~20–30 seconds per name unless founders dig in. Capture reactions on a whiteboard.',
  },
  ...nameDetailSlides,
  {
    id: 'not-advancing',
    layout: 'notAdvancing',
    title: 'Not advancing',
    titleHighlight: 'Not',
    headerIcon: 'GitCompare',
    subtitle: 'Failed Class 005 screen · Gopher covered earlier as a cautionary case',
    names: nameCandidates.out,
    cautionary: nameCandidates.cautionary,
    speakerNotes:
      'Briefly: Gopher is memorable for the wrong reasons. Use it only to show how a catchy name can still fail the pillars and CAC test.',
  },
  {
    id: 'ai-ranking',
    layout: 'rankingTable',
    title: 'Brand and SEO viability',
    titleHighlight: 'viability',
    headerIcon: 'TrendingUp',
    subtitle: 'AI research ranking · Google SEO · AI/search distinctiveness · brandability · overall /10',
    ranking: nameExplorationRanking,
    speakerNotes:
      'NUDO, OS-46, SUMMS, Atoma lead overall. Cross-check against green/yellow status and founder gut. High brandability with weak SEO still means paid education.',
  },
  {
    id: 'next-step',
    layout: 'nextStep',
    title: 'Discussion and next step',
    titleHighlight: 'next step',
    headerIcon: 'CheckSquare',
    subtitle: 'Leave with a shortlist for deeper trademark search',
    lead: 'Pick one to three names to pursue with counsel. Ideal outcome: converge on one primary and one backup.',
    steps: [
      'Confirm shared criteria (musts + pillars + checkpoints)',
      'Star favorites from Available and Maybe',
      'Cross-check AI ranking and conflict notes',
      'Send shortlist for deeper Class 005 / full trademark search',
      'Settle on one name for brand system and launch',
    ],
    prompt: 'Which names feel most “us” for Wellness Architects and Overwhelmed Experimenters without splitting the brand?',
    speakerNotes:
      'Close the room with named owners and a date for trademark feedback. Do not leave with ten maybes.',
  },
]
