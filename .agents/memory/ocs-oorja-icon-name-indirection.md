---
name: OCS OORJA icon-name indirection fails silently
description: In ocs-oorja, data files store lucide icon NAME strings and each UI component maps them to components with a fallback — a missing map entry is a silent, type-safe bug.
---

# Icon-name indirection is a silent trap

Across ocs-oorja, content data (`src/data/home.ts`, `families.ts`, etc.) stores
icons as **lucide icon NAME strings**, and the consuming component holds its own
`iconByName: Record<string, LucideIcon>` map plus a fallback, e.g.
`const Icon = iconByName[feature.icon] ?? ShieldCheck;`.

**The trap:** each section component has its OWN map (WhyOcsOorja, HeroEcosystem,
ManufacturingExcellence historically, ProductsGrid, families UI…). Adding or
renaming an icon NAME in a data file does NOT update the component map. The map is
typed `Record<string, LucideIcon>`, so an unknown key is valid TypeScript and
`tsc --noEmit` passes — the card just silently renders the fallback icon instead.

**Why:** this is the one place the "edit data only, zero code" principle leaks —
picking a new icon name in data requires a matching import + map entry in the
component. It bit a homepage redesign: three "Why OCS OORJA" cards all rendered a
shield fallback after the data icon names changed.

**How to apply:** when you change an icon NAME in any `src/data/*` file, grep for
the consuming component's `iconByName` map and add the import + entry there too.
Verify icons visually (screenshot / Playwright) — typecheck cannot catch a missing
map entry.
