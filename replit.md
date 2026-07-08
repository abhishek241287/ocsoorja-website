# OCS OORJA

Marketing + product website for **OCS OORJA**, an integrated clean-energy & EV-infrastructure manufacturer (hybrid solar inverters, LiFePO₄ batteries / BESS, and EV charging). Built so a non-developer can keep it up to date.

## Run & Operate

- Web app runs via its Replit workflow (`artifacts/ocs-oorja: web`) — do not run root `pnpm dev`.
- `pnpm --filter @workspace/ocs-oorja run typecheck` — typecheck the website
- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Web: React + Vite + Tailwind CSS v4 (HSL CSS-variable design tokens), `next-themes` for light/dark
- UI: Radix primitives + `class-variance-authority` (+ `clsx`/`tailwind-merge` via the `cn` helper)
- API: Express 5 · DB: PostgreSQL + Drizzle ORM · Validation: Zod (`zod/v4`)
- API codegen: Orval (from OpenAPI spec) · Build: esbuild / Vite

## Where things live

- **Design tokens (single source of truth for color, type, spacing, radius, shadow, motion):** `artifacts/ocs-oorja/src/index.css`
- **Core UI primitives:** `artifacts/ocs-oorja/src/components/ui/` (Button, Card, Table, Input, Textarea, ProductCard, SectionHeading)
- **Living design-system reference:** `artifacts/ocs-oorja/src/pages/design-system.tsx` (unlinked route `/design-system`)
- **Product data (single source):** `artifacts/ocs-oorja/src/data/products/` — one file per family (`<family>.ts`) holding that family's records, plus `types.ts` (the `Product` model), `families.ts` (`FAMILIES` metadata + `DEFAULT_CTA`), and `index.ts` (public entry point that concatenates families into `products` and exposes helpers). Add/edit a product by editing ONLY its family file; consumers import from `@/data/products`.
- **Product media & downloads:** `artifacts/ocs-oorja/public/images/products/<family>/` and `public/downloads/{brochures,datasheets}/` — see the `README.md` in those folders for the naming convention
- **Project case study data (single source):** `artifacts/ocs-oorja/src/data/projects/` — one file per market segment holding that segment's real, delivered case studies (currently `residential.ts`, `commercial.ts`, `ev.ts`; add `industrial.ts`/`agriculture.ts` only once a real project exists for that segment), plus `types.ts` (the `ProjectCaseStudy` model), `segments.ts` (`SEGMENTS` metadata), and `index.ts` (public entry point that concatenates segments into `projects` and exposes helpers: `getProjectBySlug`, `getProjectsBySegment`, `getProjectsUsingProduct`, `getProjectsUsingArticle`, `getProjectsGroupedBySegment`). Add/edit a case study by editing ONLY its segment file. Only segments with a real, delivered project have a file — an empty segment simply contributes nothing (no placeholder file). Every field the data model supports (ROI, timeline, before/after, testimonial, brochure) is optional and rendered on `/projects/:slug` ONLY when present — never a "coming soon" placeholder. Testimonials must be a REAL, attributable customer quote (`ProjectTestimonial`) — never invent one to fill the field. Project photos live in `public/images/projects/<segment>/`.
- **Homepage-only media (single folder):** `artifacts/ocs-oorja/public/images/home/` holds every image unique to the home page (hero background + ecosystem tiles, manufacturing steps, industries cards) with fixed filenames — replace a file with the SAME name to swap a picture, zero code. See its `README.md` for the file→section map. Featured-product photos stay in `products/` and article thumbnails in `articles/` because they are shared with other pages.
- **Homepage content (single source for home page sections):** `artifacts/ocs-oorja/src/data/home.ts` (section headings + "Why OCS OORJA" cards, manufacturing steps, featured product slugs, final CTA), `src/data/industries.ts` (industries cards), `src/data/insights.ts` (insights). Icons are stored as lucide NAME strings and resolved to components in each section's UI layer.
- **Shared site copy (single source for messaging & CTA wording):** `artifacts/ocs-oorja/src/data/brand.ts` — edit shared headlines, positioning statement, and button labels HERE; components import `BRAND`, `CTAS`, `HEADLINES` (plus `PRODUCT_DESCRIPTION_TEMPLATE`/`FAQ_STANDARD` writing guides). Zero runtime imports so it stays non-developer-editable. Product-specific copy still lives in `src/data/products/`. `CONTACT` in the same file holds email + phone + WhatsApp number.
- **Company SEO data (single source for address, geo, hours, socials):** `COMPANY` in `artifacts/ocs-oorja/src/data/brand.ts` — legal name, postal address (226030), map coordinates, opening hours, social profile URLs, contact departments. All JSON-LD generators in `src/lib/seo.ts` pull from `COMPANY`/`CONTACT`/`BRAND`/`SITE`; zero company facts are hardcoded in `lib/seo.ts`. `COMPANY_ADDRESS_LINE` is the ready-made one-line address. Per-page head tags (title/description/canonical/robots/og:*) are managed by `src/components/Seo.tsx`, which resets ALL managed tags on every navigation (defaults captured from `index.html` at startup) and removes the canonical link on `noindex` pages (404 / not-found states).
- **WhatsApp floating widget:** `artifacts/ocs-oorja/src/components/global/WhatsAppWidget.tsx` (rendered globally in `App.tsx`; 4s entrance delay, hides while footer visible, phone comes from `CONTACT.whatsapp` in `brand.ts`; pulse keyframes `.wa-pulse` at the end of `index.css`). The legacy unused `components/ui/ChatWidget.tsx` is NOT rendered — deletion candidate.
- **Blog content (single source):** `artifacts/ocs-oorja/content/blog/*.md` — one Markdown file per article, filename = slug, with a flat YAML-like frontmatter block (title/category/image/author/publishDate/seoTitle/seoDescription/excerpt + optional `summary`/`relatedProducts`/`relatedArticles`/`ctaTopic`) followed by a `##`-sectioned Markdown body. Images live in `public/images/articles/`. `src/data/blog.ts` loads every file via `import.meta.glob("/content/blog/*.md", { eager: true, query: "?raw" })`, parses frontmatter (`src/lib/frontmatter.ts`) and body (`src/lib/markdown.ts` — derives sections, `keyTakeaways`, `faqs`, `toc`, `readingTime`, `searchText`), and derives `getRelatedPosts` (same category +2, shared tag +1). Non-developers publish via the **Blog Publisher** at unlinked route `/blog-publisher` (dev workspace only): form → POST `/api/blog/publish` (route `artifacts/api-server/src/routes/blog-publish.ts`) → writes a new `content/blog/<slug>.md` + saves the cover image; the route does NOT duplicate parsing logic, it only writes frontmatter + the pasted body text. See `public/images/articles/README.md` for the owner-facing guide. `src/components/blog/ArticleBody.tsx` renders the parsed sections (inline `**bold**`/`*italic*`/`` `code` ``/`[link]` via `src/lib/markdown-inline.tsx`); `TableOfContents.tsx` renders only when the article has ≥3 headings. Optional extras (`summary`, `keyTakeaways`, `faqs`, `relatedProducts`, `relatedArticles`) render via `src/components/blog/ArticleExtras.tsx` only when present; `faqs` also emits FAQPage JSON-LD. `relatedGalleryProjects` is reserved for a future Gallery and renders nothing.
- **Article footer CTA (every article, non-salesy):** `HelpCTA` in `src/components/blog/ArticleExtras.tsx`, rendered unconditionally at the end of every article in `blog-detail.tsx`. Heading is "Need help choosing {ctaTopic}?" — `ctaTopic` is an OPTIONAL per-article frontmatter string (falls back to a generic phrase); body copy and the three links (Free Consultation, WhatsApp, Request a Quote) come from `CTAS`/`CONTACT` in `brand.ts`, so wording/numbers update everywhere with one edit.
- **Blog build-time automation:** `vite.config.ts` reads `content/blog/*.md` from disk (via `fs`, since `import.meta.glob` only works in app code) to (1) `validateBlogContent()` — throws on missing required frontmatter fields, warns on missing images/overlong SEO fields/invalid dates, runs on every dev-server start and build; (2) `generateRss()` — writes `public/rss.xml`; (3) feed the existing sitemap/llms.txt generators. Keep frontmatter `seoTitle` ≤60 chars and `seoDescription` ≤160 chars to avoid validation warnings.
- **AI discoverability:** `public/llms.txt` is AUTO-GENERATED by `generateLlmsTxt()` in `vite.config.ts` (same pattern as the sitemap) from `brand.ts` + `FAMILIES` + content dates — never edit the file by hand. `robots.txt` explicitly allows AI crawlers (GPTBot, PerplexityBot, ClaudeBot…). `Seo.tsx` emits optional Dublin Core tags (`contentType`/`lastModified`/`author` props → DC.type/DC.modified/DC.creator) on article + product pages and removes them elsewhere; static `DC.publisher` + `rel="help"` llms.txt link live in `index.html`. `lib/seo.ts` also exports `generateHowToSchema`/`generateSpeakableSchema` — deliberately unused until a real use case.
- **Installation Gallery (single source):** `artifacts/ocs-oorja/src/data/gallery/` — one file per category holding that category's photos (currently `residential.ts`, `commercial.ts`, `ev.ts`; add `industrial.ts`/`agriculture.ts` only once a real photo exists for that category), plus `types.ts` (the `GalleryPhoto` model), `categories.ts` (`CATEGORIES` metadata), and `index.ts` (public entry point that concatenates categories into `photos` and exposes helpers: `getPhotoBySlug`, `getPhotosByCategory`, `getAvailableCategories`, `sortPhotos`, `getPhotosUsingProduct`, `getPhotosForProject`, `getProductsUsedLabels`). Add/edit a photo by editing ONLY its category file; reuses existing project photos under `public/images/projects/<segment>/` — no separate gallery media folder yet. `/gallery` is the landing page (hero, sticky filter bar with category pills/search/sort, responsive grid, empty states, footer CTA) and `/gallery/photo/:slug` opens the same page with a fullscreen lightbox overlay (keyboard nav, focus trap, scroll lock) — both routes render `src/pages/gallery.tsx`. Per the permanent scope directive, the spec's Gallery Manager admin UI, auto-processing/CDN pipeline, and REST API are explicitly OUT of scope; photos are added the same data-file-editing way as products/projects.
- **Navigation:** `artifacts/ocs-oorja/src/data/navigation.ts` · **Routes:** `artifacts/ocs-oorja/src/App.tsx`

## Architecture decisions

- **Tailwind v4 token model:** each brand color is declared twice — a raw bare-HSL triple in `:root`/`.dark` AND an `hsl(var(--…))` mapping under `@theme inline`. Both are required for the utility to exist. The `--brand-green-50..900` scale is theme-agnostic (defined once in `:root`); semantic roles (primary, accent, ring, chart, sidebar…) are remapped per theme.
- **Two brand-green roles:** `bg-primary` for fills (white text passes AA) vs `text-primary-strong` for brand-colored text/icons/links (brightens in dark mode to stay AA). One token cannot serve both roles.
- **No dynamic class construction for themeable colors** — Tailwind v4 JIT only detects literal class strings.
- **Code-first but data-driven:** routine content lives in `src/data/*` and `public/`, never hardcoded in components.
- Deliberately no glassmorphism, neon, heavy gradients, AI-style glows, oversized shadows, or cartoon icons.

## Product

A premium industrial site presenting OCS OORJA's product families (inverters, LiFePO₄ storage / BESS, AC & DC EV chargers, e-rickshaw chargers) with searchable/filterable product listings, product detail pages with specs and downloadable brochures/datasheets, and a contact/quote flow. Deep green conveys engineering trust; yellow/orange are energy accents.

## User preferences

- **OCS OORJA Project Principle (permanent):** the site must be maintainable by a non-developer. Every routine update — replacing product images, adding brochures/datasheets, updating specs, adding new products — must be doable from a **single data source** (`src/data/products/` + the `public/` media folders), **without editing multiple files or React components**. This does not mean avoiding code; the architecture should make common updates easy.
- **Non-developer review test** — before shipping any change, it must pass all four:
  1. Can a non-developer make the routine version of this change by editing ONE data source (not touching components/layout)?
  2. Is content separated from presentation (data in `src/data/*` & assets in `public/`, not hardcoded in JSX)?
  3. Does adding a new product / brochure / spec / image require ZERO code or layout changes?
  4. Is there a single source of truth, so one edit propagates everywhere that value appears?
- **Visual direction:** premium industrial clean-energy brand — deep green + energy yellow/orange accents; none of glassmorphism, neon, heavy gradients, AI-style glows, oversized shadows, or cartoon icons.
- **Scope directive (permanent, set 2026-07-05):** The foundation (design system + PIM) is complete and sufficient. From now on, work ONLY on visible, customer-facing improvements — UX/UI polish, content, SEO, and lead generation. Do NOT introduce new architectural layers, internal frameworks, or backend integrations unless the user explicitly requests them. Keep implementations simple, maintainable, and within scope.
- **Uploaded product photos (set 2026-07-06):** use the original uploaded image files as-is at native resolution (PNG/WebP exactly as uploaded) — do NOT recompress or resize product photography; the user prioritizes image quality over file size for product imagery. Product photos are portrait/landscape renders on white, so any tile/thumbnail must use `object-fit: contain` on a white background (never `object-cover`, which crops them). Full-bleed scene/background images may still be optimized.

## Gotchas

- **Editing brand colors:** change the raw HSL var in `:root`/`.dark` in `src/index.css`. If you add a NEW color you must also add its `@theme inline --color-*` mapping, or the utility will not exist.
- **Animations have the same trap:** `--animate-fade-in-up` is declared in `:root`, NOT `@theme`, so the bare `animate-fade-in-up` class does NOT exist. Use the Hero/Testimonials idiom instead: `animate-[fade-in-up_0.5s_ease-out_both]` + `motion-reduce:animate-none` (inline `animationDelay` style for stagger).
- Use `text-primary-strong` (not `text-primary`) for brand-colored **text/icons/links** so dark mode stays AA-compliant; use `bg-primary` for fills.
- **Interim state:** decorative/section components (Hero, CTA, ChatWidget, TiltedCard, and a few page icons) still use legacy emerald/cyan — this is intentional and gets migrated during the Phase D page redesigns. Not a bug. (Testimonials was migrated to tokens in the 2026-07-07 redesign.)
- `/design-system` and `/blog-publisher` are intentionally absent from `navigation.ts` (internal tools). The Blog Publisher fails closed outside the dev workspace: the API route 404s unless `NODE_ENV === "development"` && no `REPLIT_DEPLOYMENT`, and the page is only bundled when `import.meta.env.DEV` (lazy import, tree-shaken from prod builds).
- Publishing an article writes a new `content/blog/<slug>.md` file, which restarts the Vite dev server (content is read at server start, plus the sitemap plugin) — the Publisher persists its success panel in sessionStorage across the reload. This restart is expected, not a bug.
- **robots.txt named groups do NOT inherit from `*` (RFC 9309):** each named User-agent group must repeat the three Disallow lines (`/api/`, `/design-system`, `/blog-publisher`) or those bots would be allowed into internal tools. Keep this when editing.
- `public/llms.txt` is generated on every Vite start/build — hand edits will be overwritten; change `generateLlmsTxt()` in `vite.config.ts` or the data files it reads instead. Its "Last updated" is the newest product/article date (deliberate — avoids daily git churn).
- Verify via workflows or `pnpm --filter @workspace/ocs-oorja run typecheck`, not root `pnpm dev`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
