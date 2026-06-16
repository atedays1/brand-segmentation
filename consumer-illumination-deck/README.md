# Consumer Illumination — Standalone founder deck

Full-screen 12-slide deck from the SBK Consumer Illumination report. No edit controls, library, or main site navigation.

## Run locally

```bash
cd consumer-illumination-deck
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy on Vercel

**Dashboard (recommended for a dedicated production URL)**

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project** → import `atedays1/brand-segmentation`.
2. Set **Root Directory** to `consumer-illumination-deck`.
3. Deploy. You get a standalone URL (e.g. `consumer-illumination-deck.vercel.app`).
4. Optional: add a custom domain in **Project Settings → Domains**.

**CLI**

```bash
cd consumer-illumination-deck
npx vercel --prod
```

Create a **new** Vercel project when prompted (separate from the main site or board-deck).

## Controls

- **← / →** — previous / next slide
- **N** — toggle speaker notes
- **Export team PDF** — flowing report PDF (3× capture)
