// Public entry point for the product catalog.
//
// Consumers import from "@/data/products" and get: the full `products` list, the
// `FAMILIES` metadata, the `Product`/`ProductFamily` types, and helper queries.
// The catalog itself is assembled by concatenating one file per family, so the
// only place you edit to add/change a product is that family's file.

import type { Product, ProductFamily, ProductFamilyMeta } from "./types";
import { FAMILIES } from "./families";
import { hybridSolarInverters } from "./hybrid-solar-inverters";
import { inbuiltLithiumInverters } from "./inbuilt-lithium-inverters";
import { lifepo4Batteries } from "./lifepo4-batteries";
import { acEvChargers } from "./ac-ev-chargers";
import { dcFastChargers } from "./dc-fast-chargers";
import { eRickshawChargers } from "./e-rickshaw-chargers";
import { bess } from "./bess";

export * from "./types";
export * from "./families";

// The complete catalog, ordered by family (see FAMILIES for display order).
export const products: Product[] = [
  ...hybridSolarInverters,
  ...inbuiltLithiumInverters,
  ...lifepo4Batteries,
  ...acEvChargers,
  ...dcFastChargers,
  ...eRickshawChargers,
  ...bess,
];

// Sort a list of products by date added, newest first (non-mutating).
export function productsSortedByDateDesc(list: Product[] = products): Product[] {
  return [...list].sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
  );
}

// Look up a single product by its stable slug.
export function getProductBySlug(
  slug: string,
  list: Product[] = products,
): Product | undefined {
  return list.find((p) => p.slug === slug);
}

// All products belonging to a family.
export function getProductsByFamily(
  family: ProductFamily,
  list: Product[] = products,
): Product[] {
  return list.filter((p) => p.family === family);
}

// Family metadata by id.
export function getFamilyInfo(
  family: ProductFamily,
): ProductFamilyMeta | undefined {
  return FAMILIES.find((f) => f.id === family);
}

// Distinct series names present within a family (in first-seen order).
export function getSeriesInFamily(
  family: ProductFamily,
  list: Product[] = products,
): string[] {
  const seen: string[] = [];
  for (const p of list) {
    if (p.family === family && !seen.includes(p.series)) seen.push(p.series);
  }
  return seen;
}

// Products grouped by family, following the FAMILIES display order. Families
// with no products are omitted.
export function getProductsGroupedByFamily(
  list: Product[] = products,
): { family: ProductFamilyMeta; products: Product[] }[] {
  return FAMILIES.map((family) => ({
    family,
    products: list.filter((p) => p.family === family.id),
  })).filter((group) => group.products.length > 0);
}
