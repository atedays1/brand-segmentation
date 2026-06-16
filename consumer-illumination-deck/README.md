# Consumer Illumination — Standalone founder deck

Full-screen 12-slide deck only. No site navigation, no other decks.

## Run locally

```bash
cd consumer-illumination-deck
npm install
npm run dev
```

## Deploy on Vercel (dedicated URL)

**Important:** This must be a **separate Vercel project** with **Root Directory** set to `consumer-illumination-deck`. If Root Directory is blank (repo root), you will deploy the entire main app with all decks.

1. [vercel.com/new](https://vercel.com/new) → import `atedays1/brand-segmentation`
2. **Root Directory** → Edit → enter `consumer-illumination-deck` → Continue
3. Build: `npm run build` · Output: `dist`
4. Deploy

**Fix an existing project:** Settings → General → Root Directory → `consumer-illumination-deck` → Redeploy.

## Sync from main app

Deck source lives in both `src/` (main app route `/consumer-illumination`) and this folder. After editing slides or charts in the main app, copy updates:

```bash
npm run sync-from-main
```
