# OCS OORJA — Design System

> **Single source of truth:** every token below lives in `src/index.css`
> (Tailwind CSS v4, CSS-first — there is no `tailwind.config.js`).
> **Living reference:** run the site and open `/design-system` to see all of
> this rendered (that route is intentionally absent from the navigation).
>
> Token model: each color exists as a **raw bare-HSL triple** in `:root` (and
> `.dark` when it differs) **plus** an `hsl(var(--…))` mapping under
> `@theme inline`. BOTH are required or the utility class silently does not
> exist. Colors are written as `H S% L%` triples below.

---

## 1. Colors

### Brand palette (theme-agnostic)

| Token | HSL | Role |
|---|---|---|
| `brand-green-50` | `150 44% 96%` | faint green wash |
| `brand-green-100` | `150 40% 90%` | tinted surfaces |
| `brand-green-200` | `151 38% 80%` | borders on green surfaces |
| `brand-green-300` | `153 38% 64%` | decorative |
| `brand-green-400` | `156 44% 46%` | decorative |
| `brand-green-500` | `158 54% 37%` | mid green (charts) |
| `brand-green-600` | `160 58% 29%` | focus ring green |
| `brand-green-700` | `161 62% 23%` | **THE brand green** — primary fills |
| `brand-green-800` | `162 64% 17%` | deep surfaces |
| `brand-green-900` | `163 66% 12%` | darkest green (text on yellow) |
| `brand-yellow` → `accent-energy` | `45 96% 52%` | energy accent; foreground on it = green-900 |
| `brand-orange` → `accent-warm` | `26 90% 48%` | warm accent; white foreground, large text/UI only |

Usage: utilities like `bg-brand-green-100`, `text-brand-green-700`,
`bg-accent-energy`, `text-accent-energy-foreground`.
**Accents are for emphasis only — never body text, never large area fills.**

### Semantic roles (light / dark)

| Token | Light | Dark | Used for |
|---|---|---|---|
| `background` | `0 0% 100%` | `0 0% 4%` | page background |
| `foreground` | `0 0% 9%` | `0 0% 93%` | body text |
| `card` / `card-foreground` | white / near-black | `0 0% 4%` / `0 0% 93%` | cards |
| `border`, `card-border` | `0 0% 90%` | `0 0% 15%` | hairline borders |
| `primary` | `161 62% 23%` | `158 52% 34%` | **fills** (buttons, badges); white foreground |
| `primary-strong` | `161 62% 23%` | `156 52% 52%` | **brand-colored TEXT/icons/links** |
| `secondary` | `150 30% 95%` | `0 0% 15%` | quiet surfaces |
| `muted` / `muted-foreground` | `0 0% 96%` / `0 0% 40%` | `0 0% 15%` / `0 0% 65%` | subdued surfaces/text |
| `accent` / `accent-foreground` | `150 33% 93%` / `161 55% 18%` | `0 0% 15%` / `0 0% 93%` | hover/selected tint |
| `destructive` | `0 84% 60%` | `0 62% 30%` | errors; white foreground |
| `input` | `0 0% 88%` | `0 0% 22%` | input borders |
| `ring` | `160 58% 29%` | `158 52% 45%` | focus rings |
| `chart-1..5` | greens + yellow + orange | brightened equivalents | data viz |

### The two-green rule (accessibility-critical)

- `bg-primary` — green **fills**; tuned so white text passes AA on the fill.
- `text-primary-strong` — green **text/icons/links** on the page background; brightened in dark mode to stay ~AA.
- **Never `text-primary` for text.** One token cannot serve both roles: a fill light enough for white text is too dim as text on a dark background.

### Rules

1. New colors must be added in BOTH places in `index.css` (raw var + `@theme inline` mapping), with light and dark values.
2. No raw hex/HSL in components — tokens only.
3. No dynamic class construction (`bg-${x}`): Tailwind v4 JIT only detects literal class strings.

---

## 2. Typography

- **Family:** `Inter` (Google Fonts, weights 400/500/600/700), fallback `system-ui, sans-serif`. Serif (Georgia) and mono (Menlo) exist as tokens but are essentially unused.
- **Scale:** Tailwind defaults, declared explicitly as tokens (`text-xs` 12px … `text-9xl` 128px).

Conventions:

| Use | Pattern |
|---|---|
| Page/section titles | `text-3xl`–`text-5xl`, weight 600–700, `foreground` |
| Section pattern | `SectionHeading` component: small uppercase **eyebrow** (often `text-primary-strong`), bold title, `muted-foreground` description |
| Body | `text-base`/`text-sm`, `foreground` or `muted-foreground` |
| Spec tables / meta | `text-sm`, keys in `muted-foreground` |
| Long-form (blog) | `@tailwindcss/typography` `prose` classes |

---

## 3. Spacing scale

Tailwind's default 4px grid (`--spacing: 0.25rem`); no custom scale.
Rhythm conventions: generous section padding (`py-16`–`py-24`), consistent
horizontal gutters via the `Container` layout component, card padding
typically `p-4`–`p-6`, grid gaps `gap-4`–`gap-8`. Whitespace is a brand
feature — when in doubt, add more.

---

## 4. Border radius

Base token `--radius: 0.5rem` (8px):

| Class | Value |
|---|---|
| `rounded-sm` | 4px |
| `rounded-md` | 6px |
| `rounded-lg` | 8px — default for cards, inputs, tiles |
| `rounded-xl` | 12px — large feature cards |
| `rounded-full` | pills — ALL buttons, badges, filter chips |

---

## 5. Shadows

Subtle, Tailwind-standard curves — never heavier than `shadow-lg` in practice:

- Light mode: black at 5–10% alpha (`--shadow-sm` `0 1px 2px rgba(0,0,0,.05)` up to `--shadow-2xl`).
- Dark mode: same geometry at 50% alpha.
- Buttons use `shadow-sm`; cards use border + `shadow-sm`/`shadow-md`; hover may step up one level.
- **Banned:** oversized/colored glow shadows.

---

## 6. Buttons (`src/components/ui/Button.tsx`, CVA)

Base: `inline-flex items-center justify-center rounded-full font-medium
transition-colors` + visible focus ring (`focus-visible:ring-2 ring-ring`) +
`disabled:opacity-50`.

| Variant | Recipe | Use |
|---|---|---|
| `primary` (default) | `bg-primary text-primary-foreground shadow-sm hover:bg-primary/90` | main CTA |
| `secondary` | `bg-foreground text-background hover:opacity-90` | high-contrast alternative |
| `outline` | `border border-border bg-transparent hover:bg-accent` | secondary actions |
| `ghost` | transparent, `hover:bg-accent` | toolbar/nav actions |
| `energy` | `bg-accent-energy text-accent-energy-foreground` (dark green on yellow) | rare high-emphasis CTA |
| `link` | `text-primary-strong hover:underline` | inline link-style action |

Sizes: `sm` h-36px px-16 text-sm · `md` (default) h-44px px-24 text-sm · `lg` h-48px px-32 text-base.
Supports `asChild` (Radix Slot) to render as `<a>`/wouter `Link`.

---

## 7. Cards

- Base `Card` primitive: `bg-card` + `border border-card-border` + `rounded-lg` + small shadow. Flat surfaces — no gradients or glass.
- **ProductCard:** white image well with `object-contain` (NEVER `object-cover` — product photos are portrait renders on white), name, series/tags, spec teaser, CTA. Fixed-ratio image well keeps grid heights deterministic.
- Interactive cards use the elevate hover system (§10) and/or a one-step shadow raise; optional 1–2px translate. No 3D tilt on product/catalog surfaces (a legacy `TiltedCard` exists and is being phased out).

---

## 8. Animations

| Token/keyframe | Timing | Use |
|---|---|---|
| `fade-in-up` | 0.5s ease-out, 8px rise, `both` fill; staggered delays on hero children | section/hero entrances |
| `accordion-down/up` | 0.2s ease-out | Radix accordion (FAQ) |
| `scroll` (marquee) | 40s linear infinite | infinite moving cards strip |
| `star-movement-top/bottom` | linear infinite alternate | legacy `StarBorder` decorative (phasing out) |
| Hero video crossfade | ~1.5s opacity, per-clip auto-advance | 3-clip background slideshow |

Principles: transform/opacity only; 0.2–0.5s for UI, slow loops only for
ambient decoration; no scroll-jacking, no parallax, no bounce. `transition-colors`
on interactive elements.

---

## 9. Icons

- **Library:** `lucide-react` exclusively — consistent stroke style. No emoji, no cartoon icon sets, no mixed libraries (`react-icons` is installed but reserved for brand logos if ever needed).
- **Data indirection:** data files store icon **names as strings** (e.g. `"ShieldCheck"`); each consuming component keeps an `iconByName: Record<string, LucideIcon>` map with a fallback. When adding an icon name in data, add the import + map entry in the consumer — typecheck will NOT catch a miss; the fallback renders silently.
- Sizing: 16–20px inline, 20–24px in cards, up to 32px in feature tiles; brand-colored icons use `text-primary-strong`.

---

## 10. Hover & interaction effects

- **Elevate system** (in `index.css`): `hover-elevate` / `hover-elevate-2` overlay a translucent layer (`--elevate-1` = 3% black / 4% white; `--elevate-2` = 8% / 9%) on top of ANY background via a pseudo-element — consistent hover feedback on both themes without per-color hover classes. `toggle-elevate` marks persistent selected states.
- Buttons: `/90` opacity shift + `transition-colors`.
- Cards: shadow raise one step and/or elevate overlay.
- Links: `text-primary-strong`, underline on hover (`underline-offset-4`).
- Focus: ALWAYS visible — `focus-visible:ring-2 ring-ring ring-offset-2`.

---

## 11. Responsive breakpoints

Tailwind v4 defaults (no customization):

| Prefix | Min-width |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

Patterns: mobile-first; grids collapse 3→2→1 (e.g. testimonials
1/2/3 cols at base/`md`/`lg`); hero is two-column at `lg+`, stacked below;
sticky header with a mobile menu.

---

## 12. Dark mode

- `next-themes` with class strategy: `.dark` on `<html>`; both themes are first-class and every change must be checked in both.
- Only semantic tokens flip; the `brand-green-*` scale is theme-agnostic.
- Key remaps to remember: `primary` brightens (`158 52% 34%`), `primary-strong` brightens further (`156 52% 52%`), borders lighten to 15%, shadows deepen to 50% alpha.
- Target WCAG AA contrast in both themes; the `/design-system` page is the fastest visual audit.
