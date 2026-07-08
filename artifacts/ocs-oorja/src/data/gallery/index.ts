// Public entry point for the Installation Gallery.
//
// Consumers import from "@/data/gallery" and get: the full `photos` list,
// `CATEGORIES` metadata, the `GalleryPhoto`/`GalleryCategory` types, and
// helper queries. The catalog is assembled by concatenating one file per
// category, so the only place you edit to add/change a photo is that
// category's file (mirrors src/data/projects/index.ts).

import type { GalleryPhoto, GalleryCategory, GalleryCategoryMeta, GallerySortOrder } from "./types";
import { CATEGORIES } from "./categories";
import { residential } from "./residential";
import { commercial } from "./commercial";
import { ev } from "./ev";
import { getProductBySlug } from "../products";

export * from "./types";
export * from "./categories";

// The complete photo catalog. Categories with no seed photos yet (Industrial,
// Agriculture) simply contribute nothing — no placeholder files.
export const photos: GalleryPhoto[] = [...residential, ...commercial, ...ev];

// Look up a single photo by its stable slug.
export function getPhotoBySlug(
  slug: string,
  list: GalleryPhoto[] = photos,
): GalleryPhoto | undefined {
  return list.find((p) => p.slug === slug);
}

// All photos within a category.
export function getPhotosByCategory(
  category: GalleryCategory,
  list: GalleryPhoto[] = photos,
): GalleryPhoto[] {
  return list.filter((p) => p.category === category);
}

// Category metadata by id.
export function getCategoryInfo(category: GalleryCategory): GalleryCategoryMeta | undefined {
  return CATEGORIES.find((c) => c.id === category);
}

// Only the categories that currently have at least one photo, in display
// order — mirrors the "availableSegments" pattern used by ProjectFilters.
export function getAvailableCategories(list: GalleryPhoto[] = photos): GalleryCategoryMeta[] {
  const present = new Set(list.map((p) => p.category));
  return CATEGORIES.filter((c) => present.has(c.id));
}

// Sort a photo list by the given order. "featured" puts featured photos
// first, then falls back to newest-first within each group.
export function sortPhotos(
  list: GalleryPhoto[],
  order: GallerySortOrder,
): GalleryPhoto[] {
  const byDateDesc = (a: GalleryPhoto, b: GalleryPhoto) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  if (order === "oldest") return [...list].sort((a, b) => -byDateDesc(a, b));
  if (order === "featured") {
    return [...list].sort((a, b) => {
      if (!!a.featured === !!b.featured) return byDateDesc(a, b);
      return a.featured ? -1 : 1;
    });
  }
  return [...list].sort(byDateDesc);
}

// Photos that reference a given product slug (used for a "Gallery" section
// on product detail pages — bidirectional discovery).
export function getPhotosUsingProduct(
  productSlug: string,
  list: GalleryPhoto[] = photos,
): GalleryPhoto[] {
  return list.filter((p) => p.productsUsed?.includes(productSlug));
}

// Photos linked to a given project case study slug.
export function getPhotosForProject(
  projectSlug: string,
  list: GalleryPhoto[] = photos,
): GalleryPhoto[] {
  return list.filter((p) => p.relatedProjectSlug === projectSlug);
}

// Resolve product slugs to their display names for the lightbox info panel,
// falling back to the raw slug if a product was ever removed from the catalog.
export function getProductsUsedLabels(productSlugs: string[]): string {
  return productSlugs.map((slug) => getProductBySlug(slug)?.name ?? slug).join(" | ");
}
