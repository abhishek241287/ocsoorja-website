// Installation Gallery data model (single source of truth for the whole
// feature). Mirrors the pattern used by src/data/products/ and
// src/data/projects/: one flat list of photo records assembled from
// per-category files, plus shared metadata/types here.
//
// Photos land in these SAME files two ways — never a second storage system:
// (1) hand-authored entries with rich optional metadata (location, caption,
// related project/products), or (2) the Gallery Publisher tool
// (/gallery-publisher, dev workspace only), which uploads photos and appends
// a minimal entry (category + auto id/slug/publishDate only) straight into
// the matching category file below. That's why every field except id/slug/
// src/alt/category/publishDate is optional.

// Fixed category set shown in the Gallery Publisher dropdown and the filter
// bar. Every category has its own file (even if currently empty) so the
// publisher only ever appends to an existing file, never creates a new one.
export type GalleryCategory =
  | "residential"
  | "commercial"
  | "industrial"
  | "solar"
  | "battery"
  | "ev"
  | "hybrid-inverter"
  | "lifepo4";

export type GalleryPhoto = {
  // --- Identity ---
  id: string;
  slug: string; // stable — used as the lightbox key; never rename

  // --- Image ---
  src: string; // real photo path under public/images/projects/<category>/ or public/images/gallery/<category>/
  width?: number;
  height?: number;
  alt: string; // descriptive alt text, always required

  // --- Metadata (optional — bulk-uploaded photos only carry category) ---
  category: GalleryCategory;
  location?: { city: string; state: string };
  caption?: string;

  // --- Optional cross-links & context ---
  productsUsed?: string[]; // Product slugs from src/data/products
  installationDate?: string; // ISO date (YYYY-MM-DD)
  photographer?: string;
  relatedProjectSlug?: string; // slug from src/data/projects

  // --- Display ---
  featured?: boolean; // shown first when sorting "Featured First"
  publishDate: string; // ISO date — drives "Newest"/"Oldest" sort
};

export type GalleryCategoryMeta = {
  id: GalleryCategory;
  label: string;
  order: number;
};

export type GallerySortOrder = "newest" | "oldest" | "featured";
