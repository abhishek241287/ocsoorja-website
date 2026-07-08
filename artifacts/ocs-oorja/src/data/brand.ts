// =============================================================================
// OCS OORJA — Brand Communication (SINGLE SOURCE OF TRUTH FOR SITE COPY)
// =============================================================================
// Non-developers: edit the site's shared wording HERE. Changing a value in this
// file updates it everywhere that value appears (header, hero, footer, CTAs,
// SEO, etc.) — you do NOT need to touch React components or page layouts.
//
// Rules that keep the site trustworthy:
//   • Never claim more than the real product specs / warranty support.
//   • "up to a 5-year warranty" refers to the LiFePO₄ batteries (60 months).
//     Do not generalize 5 years to the whole catalog — chargers/inverters vary.
//   • Keep terminology to what we actually sell: hybrid solar inverters,
//     LiFePO₄ batteries & energy storage (BESS), and EV charging.
//
// This file contains plain data only (no imports), so it stays easy to edit.
// =============================================================================

// Shape of a call-to-action button/link. Kept local (no imports) so this file
// stays dependency-free; it is structurally compatible with the product `cta`.
type Cta = { label: string; href: string };

// --- Company positioning (one canonical statement, reused site-wide) ---------
// `positioningLead` is the bold headline sentence; `positioningBody` continues
// it; `positioning` is the two joined for places that show the full paragraph.
const POSITIONING_LEAD =
  "OCS OORJA is a trusted Indian manufacturer of hybrid solar inverters, LiFePO₄ batteries, and EV charging solutions, based in Lucknow (Uttar Pradesh).";
const POSITIONING_BODY =
  "We design and supply dependable, factory-direct power systems for solar energy storage, e-mobility, telecom, and industrial applications across India.";

export const BRAND = {
  name: "OCS OORJA",

  // Company positioning — edit these to change the "who we are" statement
  // shown on the About page, in the footer, and in search-engine data.
  positioningLead: POSITIONING_LEAD,
  positioningBody: POSITIONING_BODY,
  positioning: `${POSITIONING_LEAD} ${POSITIONING_BODY}`,

  // One-line promise summarizing what customers get.
  promise:
    "Reliable, factory-direct power systems engineered in Lucknow — built for Indian conditions, priced for scale, and backed by up to a 5-year warranty on our LiFePO₄ batteries.",

  // Writing guidance (voice & tone) — a reference for anyone editing copy.
  tone: [
    "Confident and factual — no hype or superlatives beyond what the specs support.",
    "Engineering-led: emphasize reliability, safety, and real-world duty cycles.",
    "Concrete over vague: cite only real specs, warranty terms, and certifications.",
    "Customer-outcome framing: describe what the product lets the customer do.",
  ],

  // Approved terminology — use these exact terms for consistency across the site.
  terminology: {
    brand: "OCS OORJA",
    inverters: "hybrid solar inverters",
    batteries: "LiFePO₄ batteries",
    storage: "energy storage (BESS)",
    evCharging: "EV charging",
    pricing: "factory-direct",
    region: "Lucknow (U.P.)",
  },
} as const;

// --- Call-to-action library (canonical button wording, reused everywhere) -----
// Change a label here and it updates in the header, hero, CTA banner, product
// pages, etc. Keeping one entry per action guarantees consistent wording.
export const CTAS = {
  requestQuote: { label: "Request a Quote", href: "/contact" } as Cta,
  exploreProducts: { label: "Explore Products", href: "/products" } as Cta,
  contactUs: { label: "Contact Us", href: "/contact" } as Cta,
  viewAllArticles: { label: "View all articles", href: "/blog" } as Cta,
  freeConsultation: { label: "Get a Free Consultation", href: "/contact" } as Cta,
};

// --- Company contact details (SINGLE SOURCE for the customer-facing email) -----
// Change the email HERE and it updates everywhere it appears — header, footer,
// contact page, chat widget, and the SEO / JSON-LD Organization schema. You do
// NOT need to edit any component. `emailHref` is the ready-made mailto: link.
export const CONTACT = {
  email: "customercare@ocsoorja.com",
  emailHref: "mailto:customercare@ocsoorja.com",
  phoneDisplay: "7521803995",
  phoneHref: "tel:+917521803995",
  whatsapp: "917521803995", // WhatsApp format (country code, no + or spaces)
} as const;

// --- Company identity, address & hours (SINGLE SOURCE for Google/SEO data) ----
// This block feeds the structured data (JSON-LD) that Google reads: your
// business address, map coordinates, opening hours, and social profiles.
// Edit values HERE and every schema on the site updates automatically.
export const COMPANY = {
  legalName: "OCS OORJA Green Pvt. Ltd.",
  address: {
    street: "Commercial Unit No. 304, 3rd Floor, Royal Plaza",
    locality: "Block 3, IT Park 2, Sushant Golf City",
    city: "Lucknow",
    state: "Uttar Pradesh",
    postalCode: "226030",
    countryCode: "IN", // ISO code used by search engines
    countryName: "India",
  },
  // Coordinates of the office (used for the map pin in Google results).
  geo: { latitude: "26.796090", longitude: "81.003596" },
  // Opening hours in 24h format. Days not listed (Sunday) count as closed.
  openingHours: {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "18:00",
  },
  // Public social profiles. Only list profiles that really exist — wrong
  // links here hurt SEO. Add or remove lines freely.
  social: [
    "https://www.instagram.com/ocs_oorja",
    "https://www.youtube.com/@ocs_oorja",
    "https://www.linkedin.com/company/ocs-oorja",
    "https://www.facebook.com/ocsoorja",
  ],
  // Departments reachable at the phone/email above (shown to Google).
  contactTypes: ["Sales", "Customer Support", "Technical Support", "Dealer Support"],
} as const;

// Ready-made one-line address for display anywhere on the site.
export const COMPANY_ADDRESS_LINE = `${COMPANY.address.street}, ${COMPANY.address.locality}, ${COMPANY.address.city}, ${COMPANY.address.state} ${COMPANY.address.postalCode}, ${COMPANY.address.countryName}`;

// --- Standard headlines & subheads (per page / section) -----------------------
// Edit the customer-facing headlines and supporting lines for each area here.
export const HEADLINES = {
  home: {
    eyebrow: "Trusted Indian Manufacturer · Lucknow, U.P.",
    // Two lines of the hero title; the second line is visually highlighted.
    title: ["Hybrid Solar Inverters,", "LiFePO₄ Batteries & EV Charging"],
    subhead:
      "Reliable, factory-direct power systems engineered in Lucknow — built for Indian conditions, priced for scale, and backed by up to a 5-year warranty.",
    highlights:
      "Up to 5-Year Warranty · Factory-Direct Pricing · Pan-India Delivery",
  },
  products: {
    // Home-page products section
    eyebrow: "Products",
    gridTitle: "Engineered power systems, ready to deploy",
    gridSubtitle:
      "Hybrid solar inverters, LiFePO₄ storage and EV charging — standard models for quick deployment and a strong base for customization.",
    // Products listing page
    pageEyebrow: "Product Catalogue",
    pageTitle: "Products",
    pageSubtitle:
      "Hybrid solar inverters, LiFePO₄ batteries and BESS, and EV charging — standard, factory-direct models ready to deploy.",
    // Search-engine copy for the catalogue page
    metaTitle: "Products — Hybrid Solar Inverters, LiFePO₄ Batteries & EV Chargers",
    metaDescription:
      "Browse OCS OORJA's catalogue of hybrid solar inverters, LiFePO₄ batteries and BESS, and AC/DC EV chargers — factory-direct power systems engineered in Lucknow for Indian conditions.",
  },
  projects: {
    // Projects listing page (/projects)
    pageEyebrow: "Projects & Case Studies",
    pageTitle: "Real Installations, Real Results",
    pageSubtitle:
      "Residential, commercial, and EV charging installations delivered by OCS OORJA — real systems, real system sizing, and real results.",
    // Search-engine copy for the projects listing page
    metaTitle: "Projects & Case Studies — Solar, Battery & EV Installations | OCS OORJA",
    metaDescription:
      "Browse real OCS OORJA installations — hybrid solar, LiFePO₄ battery storage and EV charging projects across residential, commercial and EV segments in India.",
  },
  gallery: {
    // Installation Gallery landing page (/gallery)
    pageTitle: "Installation Gallery",
    pageSubtitle:
      "Explore real OCS OORJA installations across homes, commercial buildings, industries, EV charging stations and energy storage systems throughout India.",
    // Search-engine copy for the gallery page
    metaTitle: "Installation Gallery — Real Solar, Battery & EV Projects | OCS OORJA",
    metaDescription:
      "Browse real photos of OCS OORJA hybrid solar, LiFePO₄ battery and EV charging installations across residential, commercial and EV projects in India.",
  },
  blog: {
    // Blog listing page (/blog)
    pageEyebrow: "Insights & Guides",
    pageTitle: "The OCS OORJA Blog",
    pageSubtitle:
      "Practical, no-hype guides on solar, lithium storage and EV charging — written by the engineers who build our systems.",
    // Search-engine copy for the blog listing page
    metaTitle:
      "Blog — Solar, LiFePO₄ Storage & EV Charging Guides | OCS OORJA",
    metaDescription:
      "Engineer-written guides on hybrid solar inverters, LiFePO₄ batteries and EV charging for Indian conditions, from OCS OORJA in Lucknow.",
  },
  about: {
    title: "About OCS OORJA",
    subtitle:
      "We build safe, reliable clean-energy systems so our customers can innovate with confidence.",
  },
  contact: {
    title: "Contact Us",
    subtitle: "Request a quote or talk to our engineers.",
  },
  cta: {
    title: "Ready to power your application?",
    body: "Talk to our engineers for sizing, product selection and integration support.",
  },
} as const;

// --- Content-writing guidance (for editors, not rendered directly) ------------
// A reusable template for writing a product's short description/summary.
export const PRODUCT_DESCRIPTION_TEMPLATE =
  "[Product name] is a [category] for [primary use]. It delivers [1–2 key specs or benefits], with [safety / warranty / certification note]. Ideal for [target applications].";

// The house style for writing FAQ answers.
export const FAQ_STANDARD =
  "Answer in 1–3 plain sentences. Lead with the direct answer, then the supporting detail. Only state specs, warranty, or certifications that appear in the product data, and prefer customer-outcome language over jargon.";
