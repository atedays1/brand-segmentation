# Board Deck — Standalone presentation

A standalone, full-screen slide deck (13 slides) with left/right arrow navigation and keyboard support. No edit controls, library, or main site navigation.

## Run locally

```bash
cd board-deck
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:5173).

## Build for production

```bash
npm run build
```

Output is in `dist/`. Deploy that folder to any static host (Vercel, Netlify, GitHub Pages, S3 + CloudFront, etc.).

## Deploy on Vercel

**Option 1: Vercel Dashboard (recommended)**

1. Go to [vercel.com](https://vercel.com) and import your Git repository.
2. In **Configure Project**, set **Root Directory** to `board-deck` (click Edit, enter `board-deck`, save).
3. Leave **Build Command** as `npm run build` and **Output Directory** as `dist` (Vercel will use `vercel.json` in that root).
4. Deploy. Your deck will get its own URL (e.g. `board-deck-xxx.vercel.app`).

**Option 2: Vercel CLI from inside board-deck**

```bash
cd board-deck
npx vercel
```

Follow the prompts (log in if needed, link or create a project). Subsequent deploys: `npx vercel --prod`.

## Deploy on other hosts

- **Netlify:** Set root to `board-deck`, build command `npm run build`, publish directory `dist`.
- **GitHub Pages:** Build, then push the contents of `dist` to a `gh-pages` branch or use a GitHub Action to build and deploy.

## Persona images (slides 11 & 12)

If slides 11 and 12 show broken images, add these files under `public/images/personas/`:

- `wellness-optimizers.png`
- `practical-minimalists.png`

You can copy them from the parent project’s `public/images/personas/` if you have them there.

## Controls

- **← / →** arrow keys: previous / next slide
- **Prev / Next** buttons at the bottom of the screen
