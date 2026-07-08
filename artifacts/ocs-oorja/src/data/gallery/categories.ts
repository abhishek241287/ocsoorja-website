import type { GalleryCategoryMeta } from "./types";

// All gallery categories in site display order. The filter bar only shows
// the ones with at least one photo (see getAvailableCategories in index.ts) —
// this list stays stable so new categories slot in without touching the UI.
export const CATEGORIES: GalleryCategoryMeta[] = [
  { id: "residential", label: "Residential", order: 1 },
  { id: "commercial", label: "Commercial", order: 2 },
  { id: "industrial", label: "Industrial", order: 3 },
  { id: "solar", label: "Solar", order: 4 },
  { id: "battery", label: "Battery", order: 5 },
  { id: "ev", label: "EV", order: 6 },
  { id: "hybrid-inverter", label: "Hybrid Inverter", order: 7 },
  { id: "lifepo4", label: "LiFePO4", order: 8 },
];
