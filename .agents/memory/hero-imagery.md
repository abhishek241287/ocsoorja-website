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
