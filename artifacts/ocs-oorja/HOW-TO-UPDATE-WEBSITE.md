# OCS OORJA Website Update Guide

This is everything you need to keep the website up to date. **You never touch the
design or the code.** All content is controlled from two kinds of places:

- **Text** (names, descriptions, specs, warranty) lives in the product data files:
  `src/data/products/<family>.ts`
- **Photos and PDFs** live in folders under `public/`

> **The `<family>` folders / files are:**
> `hybrid-solar-inverters`, `inbuilt-lithium-inverters`, `lifepo4-batteries`,
> `ac-ev-chargers`, `dc-fast-chargers`, `e-rickshaw-chargers`, `bess`

After any change, **save the file** — the website updates automatically, and one
edit updates every place that value appears.

---

## 1. Update a Product Photo

1. Open `public/images/products/<family>/` and copy your new photo into the
   correct family folder.
   - Name it lowercase with hyphens: `<family>-<model>-<view>.webp`
     (example: `lifepo4-batteries/lifepo4-batteries-12v8-100ah-front.webp`)
   - `.webp` is best; `.jpg`/`.png` are fine too. Keep the longest edge ~1600px.
2. Open `src/data/products/<family>.ts` and find the product.
3. Change **only** the `image` field to point at your new photo, e.g.
   `"image": "/images/products/lifepo4-batteries/lifepo4-batteries-12v8-100ah-front.webp"`
4. Save.

---

## 2. Update Product Description

1. Open `src/data/products/<family>.ts` and find the product.
2. Change **only**:
   - `summary` — the short one-line description (shown on cards and under the title)
   - `details` — the longer paragraph (shown in the **Overview** section)
3. Save.

---

## 3. Update Product Specifications

1. Open `src/data/products/<family>.ts` and find the product.
2. Edit the `specs` list. Each row is a `key` (label) and a `value`, e.g.

   ```ts
   "specs": [
     { "key": "Power Options", "value": "7–22kW" },
     { "key": "Connectivity", "value": "Smart/OCPP options" }
   ]
   ```

3. Save.

---

## 4. Update Warranty

1. Open `src/data/products/<family>.ts` and find the product.
2. Change **only** the `warranty` field.

   Example:

   ```ts
   "warranty": "60 Months"
   ```

3. Save.

---

## 5. Add a Brochure

1. Copy the PDF into `public/downloads/brochures/`.
   - Name it: `<family-or-topic>-brochure.pdf`
     (example: `lifepo4-batteries-brochure.pdf`)
2. Open `src/data/products/<family>.ts` and find the product.
3. Set `downloads.brochure`, e.g.

   ```ts
   "downloads": {
     "brochure": "/downloads/brochures/lifepo4-batteries-brochure.pdf"
   }
   ```

4. Save.

---

## 6. Add a Datasheet

1. Copy the PDF into `public/downloads/datasheets/`.
   - Name it: `<family>-<model>-datasheet.pdf`
     (example: `ac-ev-chargers-7kw-wallbox-datasheet.pdf`)
2. Open `src/data/products/<family>.ts` and find the product.
3. Set `downloads.datasheet`, e.g.

   ```ts
   "downloads": {
     "datasheet": "/downloads/datasheets/ac-ev-chargers-7kw-wallbox-datasheet.pdf"
   }
   ```

4. Save.

---

## 7. Add a New Product

1. Open the correct family file: `src/data/products/<family>.ts`.
2. Duplicate an existing product entry (copy the whole `{ ... }` block).
3. Change:
   - `id` — a unique id (e.g. `p-<something>`)
   - `name` — the product name
   - `slug` — a new, unique web address (lowercase, hyphens)
   - `image` — the photo path
   - `summary` and `details` — the description
   - `specs` — the specifications
   - `warranty` — the warranty
   - `tags` — the little labels shown on the product
4. Save.

---

## Three Golden Rules

1. **Never rename an existing `slug`.** It is the product's web address
   (`/products/<slug>`) — renaming it breaks links and search results. Only set a
   slug once, when you first create the product.
2. **Never overwrite a photo or PDF** with a different file. Add a new version
   instead (e.g. a new `-front.webp` view, or `…-datasheet-v2.pdf`).
3. **Save = live.** One edit propagates everywhere that value appears on the site.
   No code or layout changes are ever needed for these updates.
