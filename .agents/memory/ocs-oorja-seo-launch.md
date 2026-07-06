---
name: OCS OORJA SEO & launch config
description: Where site-wide SEO/analytics config lives, how the sitemap is generated, and the non-obvious dev-server side effect of wiring product data into vite.config.
---

# OCS OORJA SEO & launch config

## Single source: `src/data/site.ts`
`SITE` holds the site-wide, non-content config: `url` (canonical origin), `ga4MeasurementId`, `googleSiteVerification`.

**Rule:** an **empty string means the feature is OFF**. GA4 gtag is only injected when `ga4MeasurementId` is set; the Search Console `<meta google-site-verification>` is only injected when `googleSiteVerification` is set (both handled by `src/components/Analytics.tsx`, mounted in `App.tsx` inside the wouter Router).

**Why:** lets a non-developer flip analytics/verification on by pasting one value, with no code branch to touch.

## `SITE.url` is the single source for the canonical origin — keep it that way
Canonical origin must be read from `SITE.url`, NOT re-hardcoded. Consumers: per-page `<Seo canonical={`${SITE.url}/…`}>`, `lib/seo.ts` JSON-LD (`url`/`logo`), and `products.tsx`/`product-detail.tsx` (they alias `import { SITE as siteConfig }` then `const SITE = siteConfig.url` because a local `SITE` string name is already in use).

**Accepted exception:** `index.html` and `public/robots.txt` keep the URL as a literal (static files, can't import TS). A domain change touches `site.ts` + those two static files only.

## Sitemap is generated at vite config load — with a DX side effect
`vite.config.ts` imports `SITE` + the product catalog and writes `public/sitemap.xml` (static routes + every product detail URL) on every vite dev/build run, so the sitemap auto-syncs with the catalog.

**Non-obvious consequence:** because product data files are now imported by `vite.config.ts`, editing any product family file is a **config change → full dev-server restart (not HMR)**, and it regenerates `public/sitemap.xml`. The committed sitemap's `lastmod` is today's date on every run, so it churns in git daily. This is expected, not a bug.

**How to apply:** don't be surprised by a dev-server restart after a product edit; if someone reports "the sitemap keeps changing in git diffs," that's the daily `lastmod`.
