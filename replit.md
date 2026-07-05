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
- **Product data (single source):** `artifacts/ocs-oorja/src/data/products.ts` (owned by the PIM work — Task #3)
- **Product media & downloads:** `artifacts/ocs-oorja/public/images/products/<family>/` and `public/downloads/{brochures,datasheets}/` — see the `README.md` in those folders for the naming convention
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

- **OCS OORJA Project Principle (permanent):** the site must be maintainable by a non-developer. Every routine update — replacing product images, adding brochures/datasheets, updating specs, adding new products — must be doable from a **single data source** (`src/data/products.ts` + the `public/` media folders), **without editing multiple files or React components**. This does not mean avoiding code; the architecture should make common updates easy.
- **Non-developer review test** — before shipping any change, it must pass all four:
  1. Can a non-developer make the routine version of this change by editing ONE data source (not touching components/layout)?
  2. Is content separated from presentation (data in `src/data/*` & assets in `public/`, not hardcoded in JSX)?
  3. Does adding a new product / brochure / spec / image require ZERO code or layout changes?
  4. Is there a single source of truth, so one edit propagates everywhere that value appears?
- **Visual direction:** premium industrial clean-energy brand — deep green + energy yellow/orange accents; none of glassmorphism, neon, heavy gradients, AI-style glows, oversized shadows, or cartoon icons.

## Gotchas

- **Editing brand colors:** change the raw HSL var in `:root`/`.dark` in `src/index.css`. If you add a NEW color you must also add its `@theme inline --color-*` mapping, or the utility will not exist.
- Use `text-primary-strong` (not `text-primary`) for brand-colored **text/icons/links** so dark mode stays AA-compliant; use `bg-primary` for fills.
- **Interim state:** decorative/section components (Hero, CTA, ChatWidget, testimonials, TiltedCard, and a few page icons) still use legacy emerald/cyan — this is intentional and gets migrated during the Phase D page redesigns. Not a bug.
- `/design-system` is intentionally absent from `navigation.ts` (internal reference only).
- Verify via workflows or `pnpm --filter @workspace/ocs-oorja run typecheck`, not root `pnpm dev`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
