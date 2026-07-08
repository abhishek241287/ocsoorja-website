// Projects & Case Studies data model (single source of truth for the whole
// feature). Mirrors the pattern used by src/data/products/: one flat list of
// records assembled from per-segment files, plus shared metadata/types here.

// The five market segments. These ids MUST match the folder names under
// public/images/projects/ (segments with zero seed projects have no folder
// yet — create one only when a real project is added).
export type IndustrySegment =
  | "Residential"
  | "Commercial"
  | "Industrial"
  | "Agriculture"
  | "EV";

// Lifecycle status of the physical installation (drives the listing filter
// and the status badge — never a "coming soon" placeholder, this describes a
// real project's real stage).
export type ProjectStatus = "completed" | "commissioning" | "in-progress" | "upcoming";

// Technology tags shown as chips on the card/detail page.
export type ProjectTechnology =
  | "Hybrid Inverter"
  | "LiFePO4"
  | "BESS"
  | "BMS"
  | "MPPT"
  | "Solar"
  | "EV Charger"
  | "Smart Monitoring"
  | "Grid-Tied"
  | "Off-Grid";

// Installed system sizing. Use 0 (not undefined) when a dimension genuinely
// does not apply to the project (e.g. a grid-powered EV charging hub with no
// on-site solar) — that is real data, not a placeholder.
export type ProjectSystemSize = {
  solarKw: number;
  batteryKwh: number;
  inverterKw: number;
};

// A single ROI / impact metric set. Entirely optional on a project — only
// include figures that were actually modeled/measured for that installation.
export type ROIData = {
  estimatedMonthlySavings?: number; // INR
  annualSavings?: number; // INR
  estimatedPaybackYears?: number;
  backupDurationHours?: number;
  co2ReductionKgPerYear?: number;
  energyGeneratedKwhPerYear?: number;
};

// A single milestone in the project timeline.
export type ProjectTimelineEntry = {
  label: string; // e.g. "Site Survey", "Installation", "Commissioning"
  date: string; // ISO date (YYYY-MM-DD)
  description?: string;
};

// A before/after image pair with captions. Only ever add a real photographed
// pair — never a stand-in image with an invented caption.
export type BeforeAfterImage = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  caption?: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

// A real, attributable customer quote. The site's permanent rule: testimonials
// must come from a real customer — never invent one to fill this field.
export type ProjectTestimonial = {
  quote: string;
  author: string;
  role?: string; // e.g. "Homeowner", "Facility Manager"
};

export type ProjectSeo = { metaTitle?: string; metaDescription?: string };

export type ProjectCaseStudy = {
  // --- Identity ---
  id: string;
  slug: string; // stable — used in the URL /projects/<slug>; never rename
  title: string;
  subtitle: string;
  segment: IndustrySegment;
  status: ProjectStatus;

  // --- Location & dates ---
  location: { city: string; state: string; countryCode: string };
  completedDate?: string; // ISO date; omit for in-progress/upcoming projects
  publishDate: string; // ISO date — when the case study went live
  updatedAt: string; // ISO date — used for sitemap lastmod

  // --- Client (never invent identifying details beyond what was agreed) ---
  clientName: string; // "Confidential" is a valid, honest value
  clientType: string; // e.g. "Homeowner", "Small Business", "Enterprise"

  // --- System ---
  systemSize: ProjectSystemSize;
  technologies: ProjectTechnology[];
  productsUsed: string[]; // Product slugs from src/data/products

  // --- Narrative (Challenge → Solution → Results) ---
  challenge: string;
  solution: string;
  results: string;

  // --- Media ---
  heroImage: ProjectImage;
  galleryImages?: ProjectImage[];
  beforeAfter?: BeforeAfterImage[];

  // --- Optional impact & proof ---
  roi?: ROIData;
  timeline?: ProjectTimelineEntry[];
  testimonial?: ProjectTestimonial;
  brochureUrl?: string; // real, existing PDF only — never a dead link

  // --- Cross-links (bidirectional discovery) ---
  relatedProductIds?: string[];
  relatedArticleIds?: string[]; // slugs from content/blog/
  relatedProjectIds?: string[];

  // --- SEO ---
  seo?: ProjectSeo;
  schemaType: "Project" | "CaseStudy"; // Schema.org type to emit for this page
};

// Metadata describing an industry segment (labels, icon, ordering) — mirrors
// src/data/products/families.ts. All five segments are always listed even if
// a segment currently has zero seed projects, so the filter UI is stable.
export type SegmentMeta = {
  id: IndustrySegment;
  label: string;
  shortLabel: string;
  description: string;
  icon: string; // lucide icon name; resolved to a component in the UI layer
  order: number;
};
