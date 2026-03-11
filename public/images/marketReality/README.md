# Market Reality slide images

Add one hero image per slide. Save files in this folder with these names:

| Slide | Filename |
|-------|----------|
| Slide 1 – Market Reality | `slide1-hero.png` |
| Slide 2 – Our People | `slide2-hero.png` |
| Slide 3 – DTC & Shopify | `slide3-hero.png` |
| Slide 4 – A New Option | `slide4-hero.png` |

**Generate prompts and stock search links:** Run from project root:

```bash
npm run generate-market-reality-images
```

That script uses Claude to create AI image prompts and Pexels/Unsplash search terms from the slide content, writes `src/data/marketRealityImagePrompts.json`, and overwrites this README with detailed search links per slide.

Use Pexels or Unsplash (free for commercial use) to find images, or use the prompts with an image-generation API (e.g. Gemini/Imagen).
