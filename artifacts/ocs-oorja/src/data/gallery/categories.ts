import type { GalleryCategoryMeta } from "./types";

// All gallery categories in site display order. The filter bar only shows
// the ones with at least one photo (see getAvailableCategories in index.ts) —
// this list stays stable so new categories slot in without touching the UI.
export const CATEGORIES: GalleryCategoryMeta[] = [
  { id: "residential", label: "Residential", order: 1 },
  { id: "commercial", label: "Commercial", order: 2 },
  { id: "industrial", label: "Industrial", order: 3 },
  { id: "agriculture", label: "Agriculture", order: 4 },
  { id: "ev", label: "EV Infrastructure", order: 5 },
];
