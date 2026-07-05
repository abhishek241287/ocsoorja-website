---
name: OCS OORJA product catalog model
description: How the ocs-oorja product data package is structured and the cross-file invariants for extending it.
---

The catalog lives in `artifacts/ocs-oorja/src/data/products/` as a flat list of
`Product` records, one file per family, concatenated in `index.ts` into `products`.
Taxonomy is **Family → Series → Model**: every record has a `family`
(`ProductFamily` union) and a required `series` string. Consumers import from
`@/data/products` (barrel = `index.ts`).

**Adding a NEW family requires editing FOUR places in lockstep** (this is the
footgun — miss one and it silently won't appear or won't typecheck):
1. add the id to the `ProductFamily` union in `types.ts`
2. add a `FAMILIES` entry in `families.ts` (label, shortLabel, description, icon, order)
3. create `src/data/products/<family>.ts` exporting `export const <camel>: Product[]`
4. import that const and spread it into `products` in `index.ts`

**Why:** the union drives type-safety, `FAMILIES` drives all family-aware UI
(tabs, grids, grouping), and `index.ts` is the only place the arrays are joined.

**Icons are stored as STRINGS** (lucide icon name) in `families.ts`, never as
React components — the UI layer (e.g. `ProductsGrid`) maps name→component with a
fallback. Keeps data files plain and non-developer-editable.

**Warranty** is a required top-level field (promoted out of the specs list); the
detail page renders it as the first "Key specifications" row. **Placeholders** set `status: "placeholder"` + `awaiting: [...]`, which drives
"Coming soon" badges and the "no real image yet" logic (e.g. Hero filters on
`!p.awaiting?.includes("images")`, not on file extension).

Slugs are the stable URL key — never rename an existing slug.
