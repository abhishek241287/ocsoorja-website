// Product Information Model (single source of truth for the whole site).
//
// The catalog is a FLAT list of Product records. Each record declares which
// `family` and `series` it belongs to — that is the Family → Series → Model
// taxonomy. To add a product you only ever add ONE object to the matching
// `src/data/products/<family>.ts` file; nothing else needs to change.

// The seven product families. These ids MUST match the folder names under
// public/images/products/ and are the canonical portfolio taxonomy.
export type ProductFamily =
  | "hybrid-solar-inverters"
  | "inbuilt-lithium-inverters"
  | "lifepo4-batteries"
  | "ac-ev-chargers"
  | "dc-fast-chargers"
  | "e-rickshaw-chargers"
  | "bess";

// A single specification row shown on cards and detail pages.
export type ProductSpec = { key: string; value: string };

// A single FAQ entry (optional, per product).
export type ProductFaq = { question: string; answer: string };

// Downloadable documents. Files live in public/downloads/{brochures,datasheets}/.
export type ProductDownloads = {
  datasheet?: string;
  brochure?: string;
};

// Primary call-to-action for a product. Falls back to DEFAULT_CTA.
export type ProductCta = { label: string; href: string };

// Per-product SEO overrides. Falls back to the product name / summary.
export type ProductSeo = { metaTitle?: string; metaDescription?: string };

// Lifecycle status. "placeholder" records are visibly marked as coming soon.
export type ProductStatus = "published" | "placeholder";

// Which pieces of real data a record is still waiting for.
export type ProductAsset = "images" | "specs" | "datasheet" | "brochure";

export type Product = {
  // --- Identity ---
  id: string;
  name: string;
  slug: string; // stable — used in the URL /products/<slug>; never rename
  family: ProductFamily;
  series: string;

  // --- Media ---
  image: string; // hero/thumbnail; use /images/placeholder.svg when awaiting a photo
  images?: string[]; // optional gallery (first item usually equals `image`)

  // --- Content ---
  summary: string;
  warranty: string;
  tags: string[];
  specs: ProductSpec[];
  features?: string[];
  applications?: string[];
  details?: string;

  // --- Conversion / documents ---
  downloads?: ProductDownloads;
  cta?: ProductCta;
  seo?: ProductSeo;

  // --- Optional extended content ---
  faqs?: ProductFaq[];
  accessories?: string[];
  certifications?: string[];
  relatedSlugs?: string[];

  // --- Meta ---
  dateAdded: string; // ISO date (YYYY-MM-DD), used for sorting
  status?: ProductStatus; // defaults to "published"
  awaiting?: ProductAsset[]; // real data still pending (drives placeholder UI)
  needsReview?: boolean; // taxonomy/data flagged for a human to confirm
};

// Metadata describing a product family (labels, icon, ordering).
export type ProductFamilyMeta = {
  id: ProductFamily;
  label: string; // full display name
  shortLabel: string; // compact label for tabs / chips
  description: string;
  icon: string; // lucide icon name; the component is resolved in the UI layer
  order: number; // display order across the site
};
