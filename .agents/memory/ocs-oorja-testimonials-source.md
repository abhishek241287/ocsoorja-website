---
name: OCS OORJA testimonials source of truth
description: Why the homepage shows only 3 testimonials and where they come from — for "missing reviews" complaints.
---

# Testimonials: single source, no fabricated fillers

The homepage "Customer Success" section renders **every** entry in
`src/data/testimonials.ts` via `src/components/sections/Testimonials.tsx` — a
static responsive grid (1 col mobile / 2 tablet / 3 desktop), no slice, carousel,
limit, or clamp. If the data has N real entries, N cards show.

**Why "reviews are missing" reports happen:** an earlier version of
`Testimonials.tsx` was an infinite-scroll framer-motion marquee that **hardcoded
~6 fabricated sample reviews in JSX** (e.g. "Ananya Gupta", "Rahul Mehta") and
appended them to the 3 real data entries, so it appeared to show ~9 looping
reviews. The grid rebuild correctly dropped the fake ones (they violated the
single-data-source principle). So the visible count legitimately fell to the real
3. A dead marquee component (`src/components/ui/testimonials-columns-1.tsx`) was
also removed as it was imported nowhere.

**How to apply:** if a user says testimonials are missing, do NOT re-add
fabricated reviews to the component. The fix is always to add real entries to
`src/data/testimonials.ts` (one object each) — that is the only source of truth.
