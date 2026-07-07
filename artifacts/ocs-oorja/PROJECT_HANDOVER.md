# OCS OORJA — Project Handover

> **Audience:** a senior frontend designer/engineer (human or AI tool) taking over UI/UX work on this project.
> **Read together with:** `DESIGN_SYSTEM.md` (visual tokens, component styles) and `PROJECT_MEMORY.md` (why decisions were made, solved problems, mistakes to avoid).
> This document explains architecture, philosophy and conventions — not line-by-line code.

---

## 1. Project Overview

**What OCS OORJA is.** An Indian clean-energy and EV-infrastructure manufacturer based in Lucknow, Uttar Pradesh. It designs and manufactures, factory-direct:

- Hybrid solar inverters
- Inverters with in-built lithium batteries
- LiFePO₄ battery packs (home, solar, telecom, e-rickshaw)
- Battery Energy Storage Systems (BESS)
- AC EV chargers, DC fast chargers, and e-rickshaw chargers

**Website purpose.** A premium industrial marketing + product-catalog site:
product discovery (searchable/filterable catalog), product detail pages with
specifications and downloadable brochures/datasheets, a blog for organic
search, and a contact/quote flow for lead generation.

**Target audience.** Primarily B2B — distributors, dealers, solar/EV
installers, fleet and charge-point operators, telecom/industrial buyers — plus
homeowners buying inverters and storage. Indian market; "engineered in Lucknow
for Indian conditions" is a core message.

**Business goals.**
1. Convey engineering trust (deep-green industrial brand, real specs, certifications).
2. Make every product easy to find and evaluate.
3. Convert visits into quote requests (contact form, per-product CTAs).
4. Rank organically (SEO meta, JSON-LD, sitemap, blog).

**Canonical domain:** `https://www.ocsoorja.com` (single source: `src/data/site.ts`).

---

## 2. Technology Stack

| Layer | Choice | Notes |
|---|---|---|
| UI framework | React 19 + TypeScript | Function components + hooks only |
| Build | Vite | `vite.config.ts` also auto-generates `public/sitemap.xml` |
| Styling | **Tailwind CSS v4** | CSS-first config — there is **no `tailwind.config.js`**; all tokens live in `src/index.css` (`@theme inline` + `:root`/`.dark` CSS variables) |
| Routing | **wouter** | NOT react-router. `<Route>`/`<Link>`/`useLocation` from `wouter` |
| Dark mode | `next-themes` | class strategy (`.dark` on `<html>`), light + dark are both first-class |
| Primitives | Radix UI | accordion, dialog, tooltip, toast, etc. |
| Variants | `class-variance-authority` (CVA) + `cn()` helper (`clsx` + `tailwind-merge`) | see `src/components/ui/Button.tsx` for the canonical pattern |
| Icons | `lucide-react` | icon names are stored as **strings** in data files, resolved to components in the UI layer |
| Animation | CSS keyframes (primary) + `framer-motion` (available, used sparingly) | `tw-animate-css` is loaded |
| Forms | `react-hook-form` + `zod` | contact form |
| Misc | `embla-carousel-react`, `sonner` (toasts), `recharts`, `date-fns` | available, use only when justified |

**Monorepo context.** The site is one package (`@workspace/ocs-oorja`) inside a
pnpm workspace at `artifacts/ocs-oorja/`. Useful commands:

```bash
pnpm --filter @workspace/ocs-oorja run typecheck   # type-check the site
pnpm --filter @workspace/ocs-oorja run dev         # dev server (in Replit this runs via a workflow)
pnpm --filter @workspace/ocs-oorja run build       # production build
```

**Data-driven architecture** is the defining constraint — see §6.

---

## 3. Folder Structure

```
artifacts/ocs-oorja/
├── index.html                  # SEO meta, Open Graph/Twitter tags, Google Fonts (Inter), favicon
├── vite.config.ts              # build config; imports product data to generate sitemap.xml
├── public/
│   ├── images/
│   │   ├── home/               # homepage-ONLY images, FIXED filenames (hero-*, manufacturing-*, industries-*) + README.md
│   │   ├── products/           # product photography + README.md; NOTE: most current images are legacy loose files in this folder's ROOT — family subfolders are the convention for NEW files
│   │   └── articles/           # blog/article thumbnails (shared by homepage + blog pages)
│   ├── downloads/
│   │   ├── brochures/          # marketing PDFs (family/topic level)
│   │   └── datasheets/         # technical PDFs (one per model)
│   ├── videos/                 # hero background clips: hero-background-1/2/3 (.webm + .mp4)
│   ├── robots.txt
│   └── sitemap.xml             # AUTO-GENERATED on every dev/build run — never hand-edit
├── src/
│   ├── App.tsx                 # wouter routes (see §8)
│   ├── index.css               # ★ ALL design tokens — the single source of visual truth
│   ├── components/
│   │   ├── layout/             # Header, Footer, Layout, Container
│   │   ├── sections/           # page sections (Hero, WhyOcsOorja, Industries, …)
│   │   ├── products/           # ProductSearch (search + filter logic)
│   │   ├── blog/               # ArticleCard
│   │   ├── contact/            # ContactForm
│   │   ├── theme/              # ThemeProvider, ThemeToggle
│   │   └── ui/                 # primitives: Button, Card, Table, Input, Textarea, ProductCard, SectionHeading, …
│   ├── data/                   # ★ ALL editable content (see §6)
│   │   ├── products/           # the product catalog (PIM) — one file per family
│   │   ├── home.ts             # homepage section content
│   │   ├── brand.ts            # shared copy: BRAND, CTAS, HEADLINES, CONTACT (+ writing guides)
│   │   ├── navigation.ts       # header/footer navigation
│   │   ├── industries.ts       # industries cards
│   │   ├── blog.ts             # blog articles
│   │   ├── testimonials.ts     # customer testimonials (real entries only)
│   │   ├── faqs.ts             # FAQ entries
│   │   ├── certifications.ts   # certification logos/claims
│   │   └── site.ts             # site-wide config: canonical URL, GA4 id, Search Console verification
│   ├── pages/                  # home, products, product-detail, blog, blog-detail, about, contact, design-system, not-found
│   └── lib/                    # cn() utility, SEO/JSON-LD helpers
├── PROJECT_HANDOVER.md         # this file
├── DESIGN_SYSTEM.md            # visual system reference
└── PROJECT_MEMORY.md           # decision history, traps, mistakes to avoid
```

---

## 4. Design Philosophy

**Premium industrial clean-energy brand.** The site should feel like a serious
engineering manufacturer, not a startup landing page.

- **Deep green** (`brand-green-700`) = engineering trust; it is the primary brand color.
- **Energy yellow / orange** = accents only — badges, highlights, the `energy` button variant. Never body text, never large fills.
- **Minimal and modern:** generous whitespace, clear typographic hierarchy, restrained ornamentation.
- **Soft, small shadows** (see `DESIGN_SYSTEM.md`) — elevation is subtle.
- **Rounded corners:** 8px base radius; buttons are full pills.
- **Smooth, quiet animations:** short fades/translates (0.2–0.5s). Motion supports content, never performs.
- **Both themes matter:** every design must hold up in light AND dark mode at WCAG AA contrast.

**Explicitly banned** (permanent user directive): glassmorphism, neon colors,
heavy gradients, AI-style glows, oversized drop shadows, cartoon/emoji-style icons.

---

## 5. Image System

Four asset roots, each with a distinct role:

| Folder | Contents | Replacement workflow |
|---|---|---|
| `public/images/home/` | Every image unique to the homepage (hero background/poster, ecosystem tiles, manufacturing steps, industries cards). **Fixed filenames.** | Replace a file with the SAME name → picture swaps, zero code. See its `README.md` for the file→section map. |
| `public/images/products/` | Product photography. Convention for NEW files: one subfolder per family, named `<family>-<model>-<view>.<ext>`. **Caveat:** most existing images are legacy loose files in the folder ROOT (e.g. `/images/products/lithium-12v8-100ah-new.jpeg`) — do not expect the subfolders to be populated. | The `image:` path in the product's data record is the source of truth — whatever it points at is what renders. Same-name replace = zero code; new file = update the record's `image:` path. |
| `public/images/articles/` | Blog/article thumbnails (referenced from `src/data/blog.ts`; shared by homepage Latest Articles + blog pages). | Same-name replace, or update the article's data record. |
| `public/downloads/` | `brochures/` + `datasheets/` PDFs. | Drop the PDF in, point the product's `downloads:` field at it. PDFs only; version instead of overwriting (`…-v2.pdf`). |

**Hero background videos:** `public/videos/hero-background-1/2/3` as `.webm` +
`.mp4` pairs. To swap a clip, replace the same-named pair.

**Image quality rules (permanent user directives):**
- Product photography (renders on white) is used **as uploaded** — PNG/JPG at native resolution, never recompressed or resized to WebP.
- Product photos are portrait/landscape renders on white → tiles/thumbnails MUST use `object-fit: contain` on a white background. **Never `object-cover`** (it crops them into unrecognizable fragments).
- Scene/decorative images (hero background, manufacturing/industries cards, article thumbnails) MAY be optimized to WebP (visually lossless, quality ≥ 80).

---

## 6. Data Architecture

**The core principle (permanent):** the site must be maintainable by a
**non-developer**. Every routine update — replacing images, adding
brochures/datasheets, updating specs, adding products, editing copy — must be
doable from a **single data source without touching components or layout**.

**Content lives in `src/data/*`, never hardcoded in JSX.** Current single sources:

| Content | Single source |
|---|---|
| Products (specs, FAQs, downloads, SEO, CTAs) | `src/data/products/<family>.ts` (flat `Product[]` per family; `types.ts` = the model; `families.ts` = family metadata; `index.ts` = barrel that concatenates) |
| Homepage sections | `src/data/home.ts` |
| Shared copy (positioning, headlines, CTA labels, contact info) | `src/data/brand.ts` |
| Navigation | `src/data/navigation.ts` |
| Industries | `src/data/industries.ts` |
| Blog articles | `src/data/blog.ts` |
| Testimonials | `src/data/testimonials.ts` — **real entries only, never fabricate** |
| FAQs | `src/data/faqs.ts` |
| Certifications | `src/data/certifications.ts` |
| Site config (canonical URL, GA4, verification) | `src/data/site.ts` — empty string = feature off |

Anything you add — testimonials, gallery, case studies, dealer network — **must
follow the same pattern**: a typed data file consumed by presentational components.

**The non-developer review test.** Before shipping any change it must pass all four:
1. Can a non-developer make the routine version of this change by editing ONE data source?
2. Is content separated from presentation (data in `src/data/*`, assets in `public/`)?
3. Does adding a new product/brochure/spec/image require ZERO code or layout changes?
4. Is there a single source of truth, so one edit propagates everywhere?

**Product model (Family → Series → Model).** Each record: identity (`id`,
`slug`, `family`, `series`), media (`image`, `images[]`), content (`summary`,
`warranty`, `tags`, `specs[]`, `features[]`, `applications[]`), conversion
(`downloads`, `cta`, `seo`), extras (`faqs`, `certifications`,
`relatedSlugs`), meta (`dateAdded`, `status`, `awaiting[]`). Placeholder
products use `status: "placeholder"` + `awaiting: [...]` to drive "coming
soon" UI honestly.

---

## 7. Performance Rules

- **LCP:** the homepage LCP element is the hero. Slide 1 of the video hero uses `preload="auto"` + a WebP poster (`hero-background.webp`); slides 2–3 use `preload="metadata"`. Keep it this way.
- **Responsive images:** there is deliberately **no `srcset` anywhere** — each image is a single file. Per-image width variants would break the "replace one same-named file" non-developer workflow for marginal gains. The hero uses one WebP poster (`hero-background.webp`).
- **WebP:** scenes/decorative only. Never product photography (see §5).
- **Lazy loading:** below-the-fold images use `loading="lazy"`; keep hero/above-fold images eager.
- **SEO:** per-page `<Seo>` component (title, description, canonical, OG); JSON-LD via `src/lib/seo.ts` (Organization, LocalBusiness, product schemas); `sitemap.xml` auto-generated from the catalog at build; `robots.txt` in `public/`.
- **Animations** must be transform/opacity-based (GPU-friendly); no layout-thrashing scroll listeners.

---

## 8. Existing Components

**Routes** (`src/App.tsx`, wouter):

```
/                    home
/about               about
/contact             contact + quote form
/products            catalog (search + family filters, deep-linkable ?family=<id>)
/products/:slug      product detail
/blog                article list
/blog/:slug          article detail
/design-system       living visual reference (intentionally NOT in navigation)
*                    not-found
```

**Homepage composition** (`src/pages/home.tsx`): `Hero` (with the ecosystem
card) → `WhyOcsOorja` → `Industries` → `ManufacturingExcellence` →
`CertificationsStrip` → `Testimonials` → `FeaturedProducts` →
`LatestArticles` → `FinalCta`.

| Component | What it is |
|---|---|
| `layout/Header.tsx` | Sticky navbar; nav from `navigation.ts`; theme toggle |
| `layout/Footer.tsx` | Nav, contact info (plain `<a>` for mailto/tel — required), legal |
| `sections/Hero.tsx` | 3-video auto-cycling crossfade background (~1.5s fade), poster fallback, headline + CTAs from `brand.ts`/`home.ts` |
| `sections/HeroEcosystem.tsx` | The 2×2 "ecosystem" card inside the hero: Solar → Inverter → Battery → EV tiles, images from `images/home/`, per-tile `fit` field (`cover` for scenes, contain-on-white for product renders) |
| `sections/WhyOcsOorja.tsx` | Value-prop cards from `home.ts` (icons = lucide name strings) |
| `sections/Industries.tsx` / `IndustriesGrid.tsx` | Industries served, from `industries.ts` |
| `sections/ManufacturingExcellence.tsx` | Manufacturing story steps, from `home.ts`, photos from `images/home/` |
| `sections/CertificationsStrip.tsx` | Certification logos from `certifications.ts` |
| `sections/Testimonials.tsx` | Static responsive grid rendering ALL entries of `testimonials.ts` |
| `sections/FeaturedProducts.tsx` | Featured slugs listed in `home.ts`, records resolved from the catalog |
| `sections/LatestArticles.tsx` | Recent posts from `blog.ts` |
| `sections/FinalCta.tsx` | Closing CTA banner from `home.ts` |
| `sections/FAQ.tsx`, `Stats.tsx`, `USPs.tsx`, `CTA.tsx`, `ProductsGrid.tsx` | Used on inner pages (products, about, contact) |
| `products/ProductSearch.tsx` | Search + family filtering on `/products` |
| `ui/ProductCard.tsx` | Catalog card — white image well, `object-contain`, spec teaser |
| `ui/ProductImageGallery.tsx` | Detail-page gallery |
| `ui/SectionHeading.tsx` | Eyebrow + title + description pattern used by every section |
| `ui/Button.tsx` | CVA variants: `primary`, `secondary`, `outline`, `ghost`, `energy`, `link` (see DESIGN_SYSTEM.md) |
| `ui/Card.tsx`, `Table.tsx`, `Input.tsx`, `Textarea.tsx`, `Label.tsx` | Core primitives |
| `Seo.tsx`, `Analytics.tsx`, `ScrollRestoration.tsx` | Head/meta management, conditional GA4 + verification injection, Back/Forward scroll restoration |
| `pages/design-system.tsx` | The living design reference — visit `/design-system` in a browser |

**Interim state (intentional):** a few decorative components (`ChatWidget`,
`TiltedCard`, `StarBorder`, `InfiniteMovingCards`, parts of `CTA`) still use
legacy emerald/cyan colors from an earlier design pass. They are queued for
migration to brand tokens during page redesigns ("Phase D"). Not a bug — but
any redesign touching them should move them onto the token system.

---

## 9. Future Roadmap

Planned, in no committed order. Every item must follow §6 (data-driven) and §4 (visual direction):

1. **Testimonials** — grow `testimonials.ts` with real customers (photos optional). Never fabricate.
2. **Gallery** — factory/installation photos; new `src/data/gallery.ts` + `public/images/gallery/`.
3. **Blog growth** — more articles in `blog.ts`; thumbnails in `images/articles/`.
4. **Dealer network** — dealer/distributor listing (likely `src/data/dealers.ts`), possibly with enquiry CTA.
5. **Case studies** — installation stories with specs and outcomes; own data file, own route.
6. **WhatsApp button** — floating contact affordance (number belongs in `brand.ts` `CONTACT`).
7. **SEO activation** — paste GA4 id + Search Console token into `site.ts` when ready (already wired, empty = off).
8. **Downloads** — real brochure/datasheet PDFs into `public/downloads/` and linked from product records (folders exist, PDFs pending).

---

## 10. Coding Rules

1. **Never hardcode content in JSX.** All copy, links, specs, image paths → `src/data/*`.
2. **Never duplicate data.** One source of truth per fact; import it wherever needed.
3. **Keep components reusable and presentational.** Sections take their content from data files; primitives (`ui/`) stay generic.
4. **TypeScript everywhere.** Type every data file (see `products/types.ts` as the exemplar). `pnpm --filter @workspace/ocs-oorja run typecheck` must pass. (The shared tsconfig enables most strictness flags individually — not the blanket `"strict": true`.)
5. **Use the token system.** No raw hex/HSL in components; only Tailwind utilities backed by `index.css` tokens.
6. **No dynamic Tailwind class construction** for themeable colors (`bg-${color}-500` will silently not compile — Tailwind v4 JIT only sees literal strings).
7. **`text-primary-strong` for brand-colored text/icons/links; `bg-primary` for fills.** Never `text-primary` for text (fails AA in dark mode).
8. **wouter conventions:** `<Link>` only for in-app routes; plain `<a>` for `mailto:`, `tel:`, and external URLs (wouter `<Link>` silently breaks them).
9. **Icons as name strings in data**, mapped to components in the consuming UI with a fallback. When changing an icon name in data, update the component's `iconByName` map too (typecheck cannot catch this).
10. **Performance:** transform/opacity animations only; lazy-load below the fold; respect the image rules in §5/§7.

---

## 11. Things NOT to Change

**These are load-bearing. Breaking them breaks the product, SEO, or the owner's workflow.**

1. **Product URLs / slugs.** `slug` is the stable URL key (`/products/<slug>`). Never rename an existing slug.
2. **The data-driven architecture** (§6) and the non-developer review test. Do not move content into components.
3. **Folder conventions** — `images/home/` fixed filenames, `images/products/<family>/`, `downloads/{brochures,datasheets}/`, and their README naming rules.
4. **The image replacement workflow** — "replace one same-named file, zero code" must keep working for every routine image.
5. **Routing library and route paths.** wouter stays; existing paths stay (SEO + shared links).
6. **SEO structure** — canonical from `SITE.url` (never re-hardcode), per-page `<Seo>`, JSON-LD helpers, auto-generated sitemap.
7. **The Tailwind v4 token model** — tokens in `index.css` with dual declaration (raw HSL var + `@theme inline` mapping). No `tailwind.config.js`, no parallel color systems.
8. **The two brand-green roles** (`bg-primary` fills vs `text-primary-strong` text) — an accessibility decision, not a stylistic one.
9. **The video hero.** The 3-clip crossfade background is the owner's intended look. Do not replace with a static image "for performance" without explicit approval.
10. **Hero ecosystem tiles stay decoupled from the catalog** (direct `images/home/` paths, not product lookups) — deliberate, so homepage images are swappable from one folder.
11. **Product photo treatment** — originals as uploaded, `object-contain` on white. Never recompress, never `object-cover`.
12. **Testimonials honesty** — only real entries from `testimonials.ts`; never pad with fabricated reviews.
13. **`/design-system` stays out of the navigation** (internal reference).
14. **`public/sitemap.xml` is generated** — never hand-edit.

---

## 12. Design Language

Full reference with exact values: **`DESIGN_SYSTEM.md`**. In one paragraph:

Inter, at Tailwind's default type scale, on white (light) or near-black
`#0a0a0a` (dark). Deep green `hsl(161 62% 23%)` for primary fills and a
brighter green for brand text in dark mode; yellow `hsl(45 96% 52%)` and
orange `hsl(26 90% 48%)` strictly as energy accents. Base radius 8px, pill
buttons, hairline borders, small soft shadows. Spacing on Tailwind's 4px
grid with generous section padding. Motion: 0.2–0.5s ease-out fades and
8px rises; a slow marquee and a ~1.5s hero crossfade are the only long
animations. Icons: lucide, stroke style, consistently sized.

---

## Appendix — Bringing code back into Replit

When design work done elsewhere (e.g. in Kimi) returns to this repo:

1. Keep the package structure (`artifacts/ocs-oorja/`, package name `@workspace/ocs-oorja`). Merge changes into existing files rather than replacing the tree.
2. Do not introduce new frameworks/routers/styling systems; the stack in §2 is fixed.
3. New content sections must arrive as **data file + presentational component** pairs (§6).
4. Any new color/token must be added to `src/index.css` in BOTH places (raw var + `@theme inline` mapping) with light and dark values.
5. Run `pnpm --filter @workspace/ocs-oorja run typecheck` before considering the merge done, and verify both themes visually.
6. Re-read §11 (“Things NOT to Change”) before merging — it is the contract.
