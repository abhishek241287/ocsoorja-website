---
name: Hero ecosystem & product imagery
description: How OCS OORJA product photos render in the hero ecosystem card and the uploaded-image quality expectation.
---

## Product photos are portrait renders on white — use object-contain
The real OCS OORJA product photos are tall/portrait renders (≈922×1152) or landscape studio shots, each on a clean white background. In any small tile they MUST use `object-contain` (with a white tile bg), never `object-cover`.
**Why:** `object-cover` in a small square tile crops a tall render down to an unrecognizable center fragment — this is what the user perceived and reported as "blurry/tiny icons," even though the source images are high-res.
**How to apply:** In the hero ecosystem card (`HeroEcosystem.tsx`), each node carries a `fit` field: default `object-contain` on `bg-white` for product renders; the solar scene sets `fit: "cover"`. (Nodes no longer use `productSlug` — see the decoupling note below.)

## Hero card looks translucent in screenshots — it's the entrance animation
The hero right column uses a `fade-in-up` keyframe (`opacity: 0 → 1`) with a delay + `both` fill. App-preview screenshots taken at page load catch it mid-fade, so the opaque white ecosystem card looks semi-transparent and the hero background bleeds through.
**Why:** `--card` is opaque white (`0 0% 100%`); there is no real transparency/opacity on the card or the images. It settles fully opaque within ~1s.
**How to apply:** Don't "fix" a translucent-looking hero card from a screenshot — it's a timing artifact. Verify the token, not the frame.

## Uploaded product photos: use originals, don't recompress
For user-uploaded product photography, the user wants the original files used as-is (PNG exactly as uploaded), no recompression or resizing — they prioritize image quality over file size for product imagery.
**Why:** The user explicitly rejected the optimized WebP versions as "blurry" and asked for the originals. This overrides the general LCP/optimization instinct for these specific product images.
**How to apply:** When placing uploaded product photos, copy the original into `public/images/products/<family>/` and point the product `image` at it. Only optimize if the user asks. (Full-bleed scene/background images are a separate case and can still be optimized.)

## Homepage images live in one folder — hero tiles are decoupled from the catalogue
All homepage-only decorative images live in `public/images/home/` with fixed filenames (`hero-*`, `manufacturing-*`, `industries-*`); replacing a same-named file swaps the picture with zero code. The hero ecosystem tiles were deliberately switched from `productSlug` (catalogue-resolved) to direct `image` paths in `home/`.
**Why:** the user wanted every homepage picture replaceable from a single folder without touching product data. The tradeoff is intentional: updating a product's catalogue photo will NOT change the hero tile, and vice versa.
**How to apply:** Don't "fix" this by re-linking hero tiles to product slugs — it is intended. Featured-product photos stay in `products/` and article thumbnails in `articles/` because those ARE shared with other pages, so the homepage's FeaturedProducts/LatestArticles legitimately reference those folders (not `home/`).

## Homepage scene images may be WebP; product renders never
The homepage photographic/SCENE images (hero background, the manufacturing/industries cards, and the shared `articles/*` thumbnails) may be optimized to WebP — visually lossless at quality ≥ 80. The hero PRODUCT-render tiles and all `products/*` photos are deliberately kept as JPG and never recompressed. Exception: the ecosystem "Solar Generation" tile is `hero-solar.png` — a square 1:1 solar image the user uploaded and wants kept as an uploaded PNG (square-cropped, NOT converted to WebP or reused from the hero background). The tile container is `aspect-square` + `object-cover`, so this file must stay 1:1.
**Why:** the user wants WebP "where it reduces size without visible quality loss" but has a permanent rule never to recompress PRODUCT photography (they once rejected WebP product photos as blurry). Scenes are safe to optimize; product renders are not.
**How to apply:** Optimize scenes to WebP, never the product renders. WebP still satisfies the "replace one same-named file" non-dev rule (just `.webp`). Multi-width `srcset` belongs ONLY on the full-bleed hero background, not the card grids — per-image variants would break the single-file non-dev workflow for marginal desktop-only gains.

## Verifying deleted/added public/ assets in Vite dev — check Content-Type, not status
In Vite dev, requesting a NON-existent path under `public/` returns HTTP **200** with the SPA `index.html` (`Content-Type: text/html`), NOT a 404. So `curl -o /dev/null -w %{http_code}` reads 200 for a file you just deleted.
**Why:** Vite's dev server falls back to `index.html` for unmatched routes (SPA history fallback).
**How to apply:** To confirm a public asset truly serves, check the `Content-Type` header (`image/webp` vs `text/html`) or the filesystem — never trust the status code alone.
