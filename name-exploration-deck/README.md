# Name Exploration — Standalone founder deck

Full-screen light-themed name exploration deck only. No site navigation, no other decks.

## Run locally

```bash
cd name-exploration-deck
npm install
npm run dev
```

## Deploy on Vercel (dedicated URL)

**Important:** This must be a **separate Vercel project** with **Root Directory** set to `name-exploration-deck`. If Root Directory is blank (repo root), you will deploy the entire main app with all decks.

1. [vercel.com/new](https://vercel.com/new) → import `atedays1/brand-segmentation`
2. **Root Directory** → Edit → enter `name-exploration-deck` → Continue
3. Build: `npm run build` · Output: `dist` · Framework: Vite
4. Deploy

**Fix an existing project:** Settings → General → Root Directory → `name-exploration-deck` → Redeploy.

## Sync from main app

Deck source lives in both `src/` (main app route `/name-exploration`) and this folder. After editing slides in the main app, copy updates:

```bash
npm run sync-from-main
```

Keyboard: ← → slides · N notes · F fullscreen
