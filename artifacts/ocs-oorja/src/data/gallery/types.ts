// Installation Gallery data model (single source of truth for the whole
// feature). Mirrors the pattern used by src/data/products/ and
// src/data/projects/: one flat list of photo records assembled from
// per-category files, plus shared metadata/types here.
//
// Scope note: this implements the customer-facing gallery landing page +
// lightbox from the UI/UX spec. The spec's "Gallery Manager" admin upload
// tool, image-processing pipeline, and REST API are explicitly out of scope
// per the project's permanent scope directive (no new backend/architectural
// layers) — photos are added the same way products/projects are, by editing
// a data file and dropping the image into public/.

// The categories with real photography. Only add a new id here once a real
// photo exists for it — never a placeholder category with zero photos.
export type GalleryCategory = "residential" | "commercial" | "industrial" | "agriculture" | "ev";

export type GalleryPhoto = {
  // --- Identity ---
  id: string;
  slug: string; // stable — used in the URL /gallery/photo/<slug>; never rename

  // --- Image ---
  src: string; // real photo path under public/images/projects/<category>/ or public/images/gallery/
  width: number;
  height: number;
  alt: string; // descriptive alt text, always required

  // --- Metadata ---
  category: GalleryCategory;
  location: { city: string; state: string };
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
