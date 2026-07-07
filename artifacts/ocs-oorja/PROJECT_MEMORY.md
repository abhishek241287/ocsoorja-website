# OCS OORJA — Project Memory

> The "why" behind the codebase: decisions already made, problems already
> solved, and mistakes already paid for. **Read this before proposing changes**
> — several things that look like accidents or easy optimizations are
> deliberate, and several past bugs are invisible in the current code.

---

## 1. The founding principle

**The site must be maintainable by a non-developer.** The owner updates
products, images, copy and documents themselves. Every architectural choice
below serves that: single data sources (`src/data/*`), fixed-name asset
folders (`public/`), and the four-question review test (see
`PROJECT_HANDOVER.md` §6). Any change that forces the owner to edit a React
component for a routine content update is a regression, no matter how elegant.

A second standing directive: **the foundation (design system + product data
model) is complete.** Work is customer-facing only — UX/UI polish, content,
SEO, lead generation. No new architectural layers, internal frameworks, or
backend integrations unless explicitly requested.

---

## 2. Why the hero is built this way

- **It's a 3-video crossfade slideshow, on purpose.** `Hero.tsx` cycles three background clips (`public/videos/hero-background-1/2/3`, each `.webm`+`.mp4`) with a ~1.5s crossfade. At one point it was "optimized" to a static image; the owner explicitly asked for the animation back and considers the moving hero the intended look. **Do not staticize it again** without explicit approval. If asked to make it lighter, re-encode the clips (clip 2 is the heavy one), don't remove the motion.
- **Bandwidth strategy:** only slide 1 uses `preload="auto"`; slides 2–3 use `metadata`. `hero-background.webp` doubles as poster/static fallback — a single file; there is deliberately no `srcset` on the site.
- **The ecosystem card (right side) is deliberately decoupled from the product catalog.** Tiles reference fixed-name images in `public/images/home/` directly, NOT product records. Earlier they resolved images via `productSlug` from the catalog; the owner wanted every homepage picture swappable from ONE folder without touching product data, so the coupling was removed. Updating a catalog photo intentionally does NOT change the hero tile. Don't "fix" this by re-linking.
- **Screenshot artifact, not a bug:** the hero card fades in (`fade-in-up`), so early screenshots catch it mid-fade and it looks translucent. The card is opaque white; it settles within ~1s. Don't "fix" transparency you see in a screenshot.

---

## 3. Why the image folders are split the way they are

- **`images/home/` = homepage-only pictures, fixed filenames.** Replace a same-named file → picture swaps, zero code. This folder exists so the owner has ONE place for every homepage visual.
- **`images/products/` = shared product photography.** Featured products on the homepage and the catalog both read from here, because those images ARE shared across pages. Same for `images/articles/` (homepage Latest Articles + blog).
- **The rule that decides placement:** unique-to-homepage → `home/`; shared with any other page → the shared folder. That's why FeaturedProducts/LatestArticles legitimately reach outside `home/`.

---

## 4. Product photography decisions (hard-won)

- **Originals as uploaded, never recompressed.** The owner rejected optimized WebP product photos as "blurry" and mandated using uploaded PNG/JPG at native resolution. Quality beats file size for product imagery. **Scenes/decorative images may still be WebP** (visually lossless, q≥80).
- **`object-contain` on white, never `object-cover`.** Product photos are tall portrait renders (~922×1152) or landscape studio shots on white. `object-cover` in a small tile crops them to unrecognizable fragments — this was perceived and reported as "blurry tiny icons" even though the sources are high-res. Every product tile/thumbnail uses a white well + contain.
- **One exception:** the hero "Solar Generation" tile is a square (1:1, 491×491) `hero-solar.png` — an uploaded scene the owner wants kept as PNG, square-cropped, with `fit: "cover"`. The tile container is `aspect-square`, so this file must stay 1:1.

---

## 5. Why everything is data-driven

Because the owner edits content, not code (§1). Concretely:

- Products: one record in one family file updates card, detail page, search, sitemap, structured data, hero-featured sections — everywhere.
- Copy: `brand.ts` holds positioning/headlines/CTA labels so wording changes are one edit, and the file has zero runtime imports so it stays safely editable.
- Icons are **name strings** in data (never React components) to keep data files plain. The cost of that trade is a known trap — see §7.

**Incident that proves the rule (testimonials):** an old marquee version of
`Testimonials.tsx` hardcoded ~6 fabricated reviews in JSX on top of the 3 real
data entries. The rebuild to a clean grid dropped the fakes, and the visible
count "fell" to 3 — that was correct behavior. If someone says "reviews are
missing," the ONLY fix is adding real entries to `src/data/testimonials.ts`.
Never pad with invented customers.

---

## 6. Decisions in the design system

- **Two brand-green roles.** `bg-primary` (fills, white text passes AA) vs `text-primary-strong` (brand text/icons/links, brightened in dark mode). A single token mathematically cannot serve both. Using `text-primary` for text regresses dark-mode contrast on eyebrows, pills, links and the `link` button variant — this was a real regression class, hence the split.
- **Dual token declaration.** In Tailwind v4 CSS-first mode, a color utility exists only if the color has BOTH a raw HSL var in `:root`/`.dark` AND an `@theme inline` mapping. Missing one produces **no error and no utility** — a silent debugging trap.
- **No dynamic class construction.** `bg-${color}` compiles to nothing (JIT sees only literal strings). The `/design-system` page relies on literal classes.
- **Deliberately banned aesthetics:** glassmorphism, neon, heavy gradients, AI-style glows, oversized shadows, cartoon icons. The brand is a serious industrial manufacturer.
- **Interim legacy colors are known:** ChatWidget, TiltedCard, StarBorder, InfiniteMovingCards and parts of CTA still carry old emerald/cyan styling, queued for migration during page redesigns ("Phase D"). Not a bug; migrate them to tokens when redesigning those surfaces.

---

## 7. Solved problems & how (don't re-solve them differently)

- **Back/Forward scroll restoration (wouter has none).** Solution in `ScrollRestoration.tsx`: `history.scrollRestoration = "manual"`, a stable key per history entry stored in `history.state` (merged, never overwritten), continuous `scrollY` recording, restore in `useLayoutEffect`. A naive "popstate flag" approach is RACY with wouter's `useSyncExternalStore` and silently restores to 0 — don't rewrite it that way. There's also a restore-time clamp guard: on Back, the products grid isn't at full height yet, so the restore re-applies over a few frames until the page is tall enough.
- **`mailto:`/`tel:` links must be plain `<a>`.** wouter's `<Link>` intercepts the click and `pushState`s a bogus entry — the mail client/dialer never opens, silently. The contact page regressed this way once. Contact email single source: `CONTACT` in `brand.ts` (with ready-made `emailHref`).
- **Icon-name indirection is a silent trap.** Each section has its own `iconByName` map with a fallback. Changing an icon name in a data file without updating the consumer's map renders the fallback icon — TypeScript passes, nothing errors. This bit a homepage redesign (three "Why OCS OORJA" cards all silently showed the shield fallback). Verify icons visually.
- **Adding a NEW product family touches four places in lockstep:** the `ProductFamily` union (`types.ts`), a `FAMILIES` entry (`families.ts`), the new `<family>.ts` file, and the spread in `index.ts`. Miss one and it silently won't appear (or won't typecheck).
- **Placeholder honesty:** unreleased products use `status: "placeholder"` + `awaiting: [...]`; UI (badges, hero filtering) keys off that — not off file extensions or image-path heuristics.
- **SEO wiring:** canonical origin comes from `SITE.url` in `site.ts` — never re-hardcode it (accepted exceptions: `index.html`, `robots.txt`, which can't import TS). GA4 and Search Console verification activate by pasting values into `site.ts`; **empty string = OFF** by design.

---

## 8. Environment gotchas (will bite you during dev)

- **Vite dev serves missing `public/` files as HTTP 200** (SPA fallback returns `index.html`). To verify an asset exists, check the `Content-Type` header (`image/webp` vs `text/html`) or the filesystem — never the status code.
- **Editing any product data file restarts the dev server** (not HMR) and regenerates `public/sitemap.xml`, because `vite.config.ts` imports the catalog to build the sitemap. The sitemap's `lastmod` churns to today's date on every run — expected, not a bug.
- **Verify with the package typecheck** (`pnpm --filter @workspace/ocs-oorja run typecheck`), not editor state; and test in BOTH themes before calling visual work done.

---

## 9. Mistakes future developers must avoid

1. Renaming a product `slug` (breaks URLs, SEO, shared links).
2. Replacing the video hero with a static image "for performance."
3. Re-coupling hero ecosystem tiles to the product catalog.
4. Recompressing/resizing product photography, or using `object-cover` on it.
5. Hardcoding content in JSX, or duplicating a fact that already has a single source.
6. Using `text-primary` for text, or adding a color token in only one of its two required places.
7. Constructing Tailwind class names dynamically.
8. Using wouter `<Link>` for `mailto:`/`tel:`/external URLs.
9. Changing an icon name in data without updating the consumer's icon map.
10. Adding fabricated testimonials or placeholder "sample" content presented as real.
11. Hand-editing `sitemap.xml`, or re-hardcoding the canonical domain.
12. Adding glassmorphism/neon/gradients/glow aesthetics.
13. Trusting a 200 status for asset existence in Vite dev.
14. Shipping a change that fails the four-question non-developer test.
