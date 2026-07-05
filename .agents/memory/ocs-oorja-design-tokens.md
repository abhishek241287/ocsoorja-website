---
name: OCS OORJA design tokens
description: Non-obvious rules for the Tailwind v4 HSL-variable token system in artifacts/ocs-oorja (src/index.css).
---

# OCS OORJA design tokens (Tailwind v4)

## Dual declaration is mandatory
A color utility only exists if the color is declared in **two** places in `src/index.css`:
1. a raw bare-HSL triple var in `:root` (and `.dark` if it differs), e.g. `--brand-green-500: 158 54% 37%;`
2. an `hsl(var(--…))` mapping under `@theme inline`, e.g. `--color-brand-green-500: hsl(var(--brand-green-500));`

Adding only the `:root` var (or only the `@theme` mapping) silently produces no utility. The `--brand-green-50..900` scale is theme-agnostic (defined once in `:root`); semantic roles are remapped in both `:root` and `.dark`.

**Why:** a debugging trap — the class compiles to nothing with no error.
**How to apply:** whenever adding/renaming a brand color, edit both spots.

## bg-primary (fills) vs text-primary-strong (text) — the AA split
`--primary` is tuned so **white text on the fill** passes WCAG AA. That same green used as **small text on the near-black dark background is NOT AA** (~4:1). A single token cannot satisfy both, because a fill light enough to fail-safe for text would break white-on-fill.

Solution in place: a dedicated `--primary-strong` token — same deep green in light mode, but **brighter** in dark mode (`156 52% 52%`) so brand-colored text/icons/links stay AA.

**Rule:** use `bg-primary` for fills; use `text-primary-strong` (never `text-primary`) for brand-colored text, icons, and links.
**Why:** the first token remap regressed dark-mode contrast on eyebrows, filter pills, "clear" links, form success text, and the Button `link` variant; architect flagged it.

## JIT only sees literal class strings
Tailwind v4 does not detect dynamically constructed color class names. Keep full class strings literal (the `/design-system` reference page relies on this).
