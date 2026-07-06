# Homepage images — `public/images/home/`

Every picture that is **unique to the homepage** lives in this one folder.

**To change any homepage picture:** upload a new image here with the **exact same
file name** (keep the name AND the extension identical) and it appears
automatically — no code changes needed. For best results use the same
shape/orientation as the file you replace.

> **File formats:** most photographic/scene images are **`.webp`** (much smaller =
> faster page loads, with no visible quality loss). The `hero-solar.png` tile and
> the three hero *product* tiles are kept in their uploaded format
> (`.png` / `.jpg`) on purpose (uploaded photos are used as-is, never recompressed).
> The `hero-solar.png` tile must stay a **square 1:1** image (e.g. 512×512 or
> 1024×1024) so it fills the square ecosystem tile without distortion. When you replace a `.webp` file, save the new one as
> `.webp` too — any tool like [Squoosh](https://squoosh.app), Photoshop, or a
> free online converter can export WebP. Replace `.jpg` files with `.jpg`.

## Which file controls which picture

### Hero section
| File | Where it shows |
|---|---|
| `hero-background.webp` | The large photo behind the homepage headline |
| `hero-solar.png` | "Solar Generation" tile in the hero ecosystem card (square 1:1 image) |
| `hero-hybrid-inverter.jpg` | "Hybrid Inverter" tile (product render — kept as JPG) |
| `hero-lifepo4-battery.jpg` | "LiFePO₄ Battery Storage" tile (product render — kept as JPG) |
| `hero-ev-charger.jpg` | "EV Charging" tile (product render — kept as JPG) |

> `hero-background-768.webp` is a smaller phone-sized copy of the hero background,
> served automatically to small screens. If you swap `hero-background.webp`,
> regenerate this smaller copy too (or ask), otherwise phones keep the old photo.

### Manufacturing Excellence section (the 5-step timeline)
| File | Step |
|---|---|
| `manufacturing-engineering.webp` | 1 · Engineering |
| `manufacturing-assembly.webp` | 2 · Manufacturing |
| `manufacturing-testing.webp` | 3 · Testing |
| `manufacturing-quality.webp` | 4 · Quality Inspection |
| `manufacturing-dispatch.webp` | 5 · Delivery |

### Industries We Serve section (the 6 cards)
| File | Card |
|---|---|
| `industries-residential.webp` | Residential Solar & Backup |
| `industries-commercial.webp` | Commercial Buildings |
| `industries-industrial.webp` | Industrial Plants |
| `industries-telecom.webp` | Telecom & Critical Backup |
| `industries-ev.webp` | EV Charging Infrastructure |
| `industries-agriculture.webp` | Agriculture & Rural |

## Two kinds of images are intentionally NOT here
- **Product photos** (the Featured Products cards) live in `public/images/products/`
  because the *same* photo is also shown on that product's own page. Change it once
  there and it updates both places.
- **Blog / insight thumbnails** (the Latest Insights cards) live in
  `public/images/articles/` for the same reason (shared with the blog). These are
  also `.webp`.

## Requested names not created yet (no matching section on the site)
No file was added for these because there is currently no section or source image
for them — an unused file here would do nothing:
- `manufacturing-packaging.webp` — the timeline has 5 steps, not 6
- `industries-logistics.webp` — there are 6 industry cards, no "logistics" card
- `team.webp`
- `sustainability.webp`

If you want any of these, add the matching section first (or ask) and then drop
the image here.

## Good to know
- Keep the same file name (and extension) when replacing, or the path in the code
  must be updated.
- The hero tiles use their own copies in this folder, **independent of the product
  catalogue** — so updating a product's catalogue photo will not change the hero
  tile, and vice versa. This is intentional so the homepage hero is fully
  controllable from this one folder.
