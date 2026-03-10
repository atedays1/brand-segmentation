# Ate Days: Personalizing Functional Nutrition

A single-page React scrollytelling presentation that summarizes the Ate Days consumer segmentation, product strategy, marketplace context, and competitive patterning—leading to locking segments for the Brand Brief and Naming exploration.

## Tech stack

- **React 18** + **Vite**
- **Tailwind CSS**
- **Framer Motion** (scroll-triggered animations, optional parallax)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. **Push the project to GitHub** (if you haven’t already).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import your repo.
3. Vercel will detect Vite; leave **Build Command** as `npm run build` and **Output Directory** as `dist`.
4. Click **Deploy**. Your scrollytelling deck will be live at `https://your-project.vercel.app`.

Or use the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm i -g vercel
vercel
```

Follow the prompts (link to existing project or create one). No environment variables are required for the deployed site; analysis and story-generation scripts are run locally.

## Structure

- **12 sections:** Intro → 6 segment slides (with personas) → Product Strategy → Marketplace (with citations) → Patterning Success (Thorne vs Grüns) → Omni-Channel → The Ask
- **Data:** `src/data/` holds all copy and citations (segments, personas, product strategy, marketplace, competitive, omni-channel, ask).
- **Components:** `ScrollSection` wraps each block and triggers Framer Motion when in view; section components live in `src/components/sections/`.
- **Accessibility:** Semantic sections, `prefers-reduced-motion` respected, scroll progress bar and dot nav for orientation.

## Document analysis pipeline

The app can be driven by AI-analyzed source documents (Ate Days Consumer Segmentation Report, NBJ reports, etc.):

**Easiest way (no Google Cloud, no rate limits):**

1. **Get a Claude API key:** Go to [console.anthropic.com](https://console.anthropic.com) → sign in → **API keys** → Create key. (Free tier available.)
2. **Add to `.env`:** `ANTHROPIC_API_KEY=your_key_here`
3. **Run:** `npm run analyze-docs` then `npm run merge-analysis`

Your docs go in `docs/` (PDF, PPTX, XLSX). The script extracts text, sends it to Claude, and writes `src/data/analysis-output.json`. Optional: run `merge-analysis` to update the site’s data files from that output.

Alternatively you can use `GEMINI_API_KEY` (Google AI Studio), but the free tier often rate-limits; Claude is simpler.

Scripts live in `scripts/`: `analyze-docs.mjs`, `extract-xlsx.mjs`, `extract-pptx.mjs`, `merge-analysis.mjs`.

## Companion visuals

- **Charts (Recharts):** Segment pie (intro), top goals bar (Marketplace), purchase channels bar (Omni-Channel). Data from `src/data/chartData.js`.
- **Images:** Add report-derived or thematic images in `public/images/`. The first segment section can show `public/images/segment-overview.png` if present (e.g. export a key slide from the segmentation report).
