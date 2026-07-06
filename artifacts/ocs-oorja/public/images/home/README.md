# Homepage images — `public/images/home/`

Every picture that is **unique to the homepage** lives in this one folder.

**To change any homepage picture:** upload a new image here with the **exact same
file name** (keep the name identical) and it appears automatically — no code
changes needed. For best results use the same shape/orientation as the file you
replace.

## Which file controls which picture

### Hero section
| File | Where it shows |
|---|---|
| `hero-background.jpg` | The large photo behind the homepage headline |
| `hero-solar.jpg` | "Solar Generation" tile in the hero ecosystem card |
| `hero-hybrid-inverter.jpg` | "Hybrid Inverter" tile |
| `hero-lifepo4-battery.jpg` | "LiFePO₄ Battery Storage" tile |
| `hero-ev-charger.jpg` | "EV Charging" tile |

### Manufacturing Excellence section (the 5-step timeline)
| File | Step |
|---|---|
| `manufacturing-engineering.jpg` | 1 · Engineering |
| `manufacturing-assembly.jpg` | 2 · Manufacturing |
| `manufacturing-testing.jpg` | 3 · Testing |
| `manufacturing-quality.jpg` | 4 · Quality Inspection |
| `manufacturing-dispatch.jpg` | 5 · Delivery |

### Industries We Serve section (the 6 cards)
| File | Card |
|---|---|
| `industries-residential.jpg` | Residential Solar & Backup |
| `industries-commercial.jpg` | Commercial Buildings |
| `industries-industrial.jpg` | Industrial Plants |
| `industries-telecom.jpg` | Telecom & Critical Backup |
| `industries-ev.jpg` | EV Charging Infrastructure |
| `industries-agriculture.jpg` | Agriculture & Rural |

## Two kinds of images are intentionally NOT here
- **Product photos** (the Featured Products cards) live in `public/images/products/`
  because the *same* photo is also shown on that product's own page. Change it once
  there and it updates both places.
- **Blog / insight thumbnails** (the Latest Insights cards) live in
  `public/images/articles/` for the same reason (shared with the blog).

## Requested names not created yet (no matching section on the site)
No file was added for these because there is currently no section or source image
for them — an unused file here would do nothing:
- `manufacturing-packaging.jpg` — the timeline has 5 steps, not 6
- `industries-logistics.jpg` — there are 6 industry cards, no "logistics" card
- `team.jpg`
- `sustainability.jpg`

If you want any of these, add the matching section first (or ask) and then drop
the image here.

## Good to know
- Keep the same file name when replacing, or the path in the code must be updated.
- The hero tiles use their own copies in this folder, **independent of the product
  catalogue** — so updating a product's catalogue photo will not change the hero
  tile, and vice versa. This is intentional so the homepage hero is fully
  controllable from this one folder.
