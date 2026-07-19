// =============================================================================
// OCS OORJA — Homepage content (SINGLE SOURCE for the home page sections)
// =============================================================================
// Non-developers: edit the homepage's section headings and card content HERE.
// Changing a value updates that section on the home page — you do NOT need to
// touch any React component or layout.
//
//   • icon  — a lucide-react icon NAME (a string). The UI layer maps the name to
//             a real icon component, so this file stays plain, editable data.
//             Browse names at https://lucide.dev/icons.
//   • image — a path under public/ (e.g. "/images/home/manufacturing-testing.webp").
//             Replace the file at that path to change the picture — no code edit.
//   • This file has no imports on purpose, so it stays easy and safe to edit.
//
// Product-specific copy lives in src/data/products/. Shared brand wording (hero,
// footer, global CTAs) lives in src/data/brand.ts. Industries live in
// src/data/industries.ts. Blog articles live in src/data/blog.ts.
// =============================================================================

// --- Section headings (eyebrow / title / subtitle per homepage section) -------
export const HOME_SECTIONS = {
  why: {
    eyebrow: "Why OCS OORJA",
    title: "Engineering-grade power, built in India",
    subtitle:
      "We are an integrated energy infrastructure company — manufacturing clean-energy systems in Lucknow to deliver proven reliability, real engineering support, and transparent pricing.",
  },
  industries: {
    eyebrow: "Industries We Serve",
    title: "Power solutions for every application",
    subtitle:
      "From homes and solar farms to telecom towers and EV networks, our systems are deployed across India's most demanding environments.",
  },
  featured: {
    eyebrow: "Featured Products",
    title: "Proven systems, ready to deploy",
    subtitle:
      "A selection from our catalogue of hybrid solar inverters, LiFePO₄ storage and EV charging — engineered for Indian conditions.",
    ctaLabel: "Explore Complete Catalogue",
  },
  manufacturing: {
    eyebrow: "Manufacturing Excellence",
    title: "Engineered, built and tested under one roof",
    subtitle:
      "From engineering and in-house manufacturing to rigorous testing, quality inspection and dispatch — every OCS OORJA system is verified before it leaves Lucknow.",
  },
  certifications: {
    eyebrow: "Certifications & Standards",
    title: "Quality you can verify",
    subtitle:
      "Our products and processes are built to recognised safety and quality standards.",
  },
  testimonials: {
    eyebrow: "Customer Success",
    title: "Trusted by teams across India",
    subtitle:
      "From e-mobility fleets to solar EPCs and OEM partners — here's what our customers say about working with OCS OORJA.",
  },
  insights: {
    eyebrow: "Latest Insights",
    title: "Guides from our engineers",
    subtitle:
      "Practical, no-hype resources on solar, lithium storage and EV charging for Indian conditions.",
  },
} as const;

// --- "Why OCS OORJA" — six trust / capability cards --------------------------
export type HomeFeature = { icon: string; title: string; description: string };

export const WHY_OCS_OORJA: HomeFeature[] = [
  {
    icon: "Layers",
    title: "Integrated Energy Infrastructure",
    description:
      "End-to-end energy solutions — from generation and storage to EV charging — engineered and delivered under one roof.",
  },
  {
    icon: "Factory",
    title: "Indian Manufacturing",
    description:
      "Designed and built in our own Lucknow facility for real Indian grid, voltage and heat conditions.",
  },
  {
    icon: "Cpu",
    title: "Advanced BMS",
    description:
      "Grade-A LiFePO₄ cells with an intelligent battery management system and thermal protection for long, safe service life.",
  },
  {
    icon: "Headphones",
    title: "Engineering Support",
    description:
      "In-house engineers help with sizing, product selection, installation and after-sales support.",
  },
  {
    icon: "Settings2",
    title: "Custom Solutions",
    description:
      "OEM and custom battery packs and power systems built to your voltage, capacity and form-factor needs.",
  },
  {
    icon: "Truck",
    title: "Pan-India Delivery",
    description:
      "Reliable dispatch and logistics to sites across India, backed by clear documentation and support.",
  },
];

// --- "Manufacturing Excellence" — five-stage process timeline ----------------
// Each stage renders one step of the homepage manufacturing timeline. Replace
// the image file at `image` to change the picture — no code changes needed.
export type ManufacturingStep = { title: string; body: string; image: string };

export const MANUFACTURING_STEPS: ManufacturingStep[] = [
  {
    title: "Engineering",
    body: "Our engineers design power electronics and battery systems tuned to Indian grid, voltage and temperature conditions.",
    image: "/images/home/manufacturing-engineering.webp",
  },
  {
    title: "Manufacturing",
    body: "Inverters and LiFePO₄ packs are assembled on controlled production lines at our Lucknow facility.",
    image: "/images/home/manufacturing-assembly.png",
  },
  {
    title: "Testing",
    body: "Every unit undergoes electrical, thermal and safety testing to validate real-world performance.",
    image: "/images/home/manufacturing-testing.webp",
  },
  {
    title: "Quality Inspection",
    body: "Multi-point inspection checks welds, BMS behaviour and finish before a unit is cleared for dispatch.",
    image: "/images/home/manufacturing-quality.webp",
  },
  {
    title: "Delivery",
    body: "Cleared units are packed and dispatched pan-India with full documentation and after-sales support.",
    image: "/images/home/manufacturing-dispatch.webp",
  },
];

// --- "Featured Products" — six curated catalogue slugs ------------------------
// Order matters: this is the exact order shown on the homepage. Each value is a
// product `slug` from src/data/products/. To feature a different product, swap
// the slug — no code changes needed.
export const FEATURED_PRODUCT_SLUGS: string[] = [
  "solar-hybrid-inverter-48v-6kw", // Hybrid solar inverter
  "lithium-inverter-ocs-li-1000", // Inbuilt lithium inverter
  "12v-100ah-home-power-storage", // LiFePO₄ battery (12V)
  "24v-100ah-home-power-storage", // LiFePO₄ battery (24V)
  "ev-charger-ac", // AC EV charger
  "ev-charger-dc-fast", // DC fast charger
];

// --- Hero "energy ecosystem" visual ------------------------------------------
// The hero's right-hand visual: a premium, at-a-glance map of the complete
// OCS OORJA energy ecosystem (generate → convert → store → charge). Each stage
// shows a real image loaded directly from public/images/home/. To change a tile,
// replace the file at that path (keep the same name) — no code changes needed.
export type EcosystemNode = {
  label: string;
  note: string;
  image: string; // direct path under public/images/home/
  fit?: "contain" | "cover"; // "cover" = full-bleed scene photo; default is "contain" (product render)
};

export const HERO_ECOSYSTEM = {
  eyebrow: "Integrated System",
  title: "One energy ecosystem, engineered end-to-end",
  nodes: [
    {
      label: "Solar Generation",
      note: "High-efficiency solar energy",
      image: "/images/home/hero-solar.png",
      fit: "cover",
    },
    {
      label: "Hybrid Inverter",
      note: "Smart energy conversion",
      image: "/images/home/hero-hybrid-inverter.jpg",
    },
    {
      label: "LiFePO₄ Battery Storage",
      note: "Reliable long-life backup",
      image: "/images/home/hero-lifepo4-battery.jpg",
    },
    {
      label: "EV Charging",
      note: "Fast AC & DC charging",
      image: "/images/home/hero-ev-charger.jpg",
    },
  ] as EcosystemNode[],
  badge: "Designed & Manufactured in Lucknow, India",
} as const;

// --- Final call-to-action banner ---------------------------------------------
export const HOME_FINAL_CTA = {
  eyebrow: "Get Started",
  title: "Ready to Power Your Next Project?",
  body: "Talk to our engineers for sizing, product selection and integrated energy infrastructure solutions — or send us your requirements for a custom quote.",
} as const;
