---
name: OCS OORJA stock photo sourcing pitfalls
description: What to check before using imageSearch results as real-world case-study/installation photography.
---

`imageSearch` results for "how-to" / "guide" style queries frequently return YouTube-thumbnail-style
images with large baked-in marketing text (e.g. "STEP-BY-STEP GUIDE", "BUSINESS & COST IN INDIA") or
images carrying a visible competitor/third-party brand (Tata Power, SunMobility, etc.) baked into the
scene. These are unusable for professional case-study/product photography even though they match the
search query semantically.

**Why:** these slipped into the site's project case-study images once and had to be re-sourced after
the pages had already been built and typechecked — the failure is visual, not something typecheck or
a11y checks catch.

**How to apply:** before writing a downloaded `imageSearch` result into `public/images/...`, open the
actual image (not just the title) and check for (1) overlaid text of any kind, (2) visible third-party
logos/brand names, (3) obvious AI-generated/stock-staged artifacts. Dreamstime/Getty "thumb"-tier preview
URLs (`thumbs.dreamstime.com/b/...`, `media.gettyimages.com/id/.../photo/...`) are generally clean
(no diagonal watermark) at the sizes returned and are an acceptable source for representative,
non-hero-critical case-study imagery on this project.
