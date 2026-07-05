# Product images

Every product image lives in a folder named after its **product family**. Never
rename these folders, and never mix families. This keeps routine image updates
simple: find the family folder, drop the image in with the right name, done.

## Families (folders)

- `hybrid-solar-inverters/`
- `inbuilt-lithium-inverters/`
- `lifepo4-batteries/`
- `ac-ev-chargers/`
- `dc-fast-chargers/`
- `e-rickshaw-chargers/`
- `bess/`

## File naming

Use lowercase, hyphen-separated names in this exact pattern:

```
<family>-<model>-<view>.<ext>
```

- `<family>` — the product family (same as the folder), e.g. `lifepo4-batteries`
- `<model>` — the model identifier, lowercase, e.g. `12v8-100ah`
- `<view>` — the shot: `front`, `back`, `side`, `angle`, `installed`, `detail`, or `thumb`
- `<ext>` — `webp` preferred; use `jpg`/`png` only when necessary

### Examples

```
lifepo4-batteries/lifepo4-batteries-12v8-100ah-front.webp
lifepo4-batteries/lifepo4-batteries-12v8-100ah-angle.webp
ac-ev-chargers/ac-ev-chargers-7kw-wallbox-front.webp
```

## Rules

- A product can have several views — keep the `<model>` identical across all of them.
- **Never overwrite** an existing file with a different image. Add a new `<view>` instead.
- Keep the longest edge around 1600px and compress before uploading.

> The product catalog references these paths from a single data source, so a
> correctly named file shows up on the site automatically — no code changes needed.
