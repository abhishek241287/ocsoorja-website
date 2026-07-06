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
//   • This file has no imports on purpose, so it stays easy and safe to edit.
//
// Product-specific copy lives in src/data/products/. Shared brand wording (hero,
// footer, global CTAs) lives in src/data/brand.ts. Industries live in
// src/data/industries.ts. Insights live in src/data/insights.ts.
// =============================================================================

// --- Section headings (eyebrow / title / subtitle per homepage section) -------
export const HOME_SECTIONS = {
  why: {
    eyebrow: "Why OCS OORJA",
    title: "Engineering-grade power, built in India",
    subtitle:
      "We manufacture clean-energy systems in Lucknow and sell them factory-direct — so you get proven reliability, real support and honest pricing.",
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
    title: "Made in our own facility, tested end to end",
    subtitle:
      "Every OCS OORJA system is built and quality-checked in-house in Lucknow — from cell selection to final dispatch.",
  },
  certifications: {
    eyebrow: "Certifications & Standards",
    title: "Quality you can verify",
    subtitle:
      "Our products and processes are built to recognised safety and quality standards.",
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
    icon: "Factory",
    title: "Factory-Direct Manufacturing",
    description:
      "Built in our own Lucknow facility and sold factory-direct — engineering-grade quality without distributor markups.",
  },
  {
    icon: "ShieldCheck",
    title: "Engineered for Indian Conditions",
    description:
      "Designed and tested for real Indian grid, voltage and temperature realities — from high-heat summers to unstable supply.",
  },
  {
    icon: "BatteryCharging",
    title: "Safe LiFePO₄ Technology",
    description:
      "Grade-A LiFePO₄ cells with robust BMS and thermal protection for long, safe and dependable service life.",
  },
  {
    icon: "BadgeCheck",
    title: "Certified Quality",
    description:
      "Products built to recognised safety and quality standards — UN 38.3, IEC 62133 and ISO-certified systems.",
  },
  {
    icon: "Headphones",
    title: "Responsive Technical Support",
    description:
      "In-house engineers for sizing, product selection, installation and after-sales support across India.",
  },
  {
    icon: "Settings2",
    title: "OEM & Custom Solutions",
    description:
      "Custom battery packs and power systems engineered to your voltage, capacity and form-factor requirements.",
  },
];

// --- "Manufacturing Excellence" — five process steps -------------------------
export type ManufacturingStep = { icon: string; title: string; body: string };

export const MANUFACTURING_STEPS: ManufacturingStep[] = [
  {
    icon: "Factory",
    title: "In-House Assembly",
    body: "Inverters and power systems are assembled and burned-in at our Lucknow facility under strict process control.",
  },
  {
    icon: "BatteryCharging",
    title: "LiFePO₄ Battery Pack Production",
    body: "Grade-A prismatic cells are matched, welded and paired with an intelligent BMS into rugged, long-cycle-life packs.",
  },
  {
    icon: "ClipboardCheck",
    title: "Testing & Quality Control",
    body: "Every unit passes electrical, thermal and safety testing before dispatch — no shortcuts on reliability.",
  },
  {
    icon: "Ruler",
    title: "Engineering & Sizing Support",
    body: "Our engineers help size systems and integrate them into solar, telecom, e-mobility and industrial applications.",
  },
  {
    icon: "Wrench",
    title: "OEM & Custom Manufacturing",
    body: "Scalable capacity for OEM partners who need custom voltage, capacity and form-factor power solutions.",
  },
];

// --- "Featured Products" — six curated catalogue slugs ------------------------
// Order matters: this is the exact order shown on the homepage. Each value is a
// product `slug` from src/data/products/. To feature a different product, swap
// the slug — no code changes needed.
export const FEATURED_PRODUCT_SLUGS: string[] = [
  "mppt-solar-inverter-12v-1600w", // Hybrid inverter
  "solar-hybrid-inverter-48v-6kw", // Hybrid inverter
  "lithium-inverter-ocs-li-1000", // Inbuilt lithium inverter
  "12v-100ah-home-power-storage", // LiFePO₄ battery
  "ev-charger-ac", // AC EV charger
  "ev-charger-dc-fast", // DC fast charger
];

// --- Hero "energy ecosystem" visual ------------------------------------------
// The hero's right-hand visual: an at-a-glance map of the complete OCS OORJA
// energy ecosystem (generate → convert → store → charge). Edit the nodes here;
// icons are lucide NAME strings resolved in the UI layer.
export type EcosystemNode = { icon: string; label: string; note: string };

export const HERO_ECOSYSTEM = {
  eyebrow: "Integrated System",
  title: "One energy ecosystem, engineered end-to-end",
  nodes: [
    {
      icon: "SunMedium",
      label: "Solar Generation",
      note: "Capture clean solar power with high-efficiency MPPT.",
    },
    {
      icon: "Cpu",
      label: "Hybrid Inverters",
      note: "Convert and manage power intelligently, 24/7.",
    },
    {
      icon: "BatteryCharging",
      label: "LiFePO₄ Storage",
      note: "Store safely with long, dependable cycle life.",
    },
    {
      icon: "PlugZap",
      label: "EV Charging",
      note: "Power mobility with AC and DC fast charging.",
    },
  ] as EcosystemNode[],
  badge: "Designed & built in-house · Lucknow, India",
} as const;

// --- Final call-to-action banner ---------------------------------------------
export const HOME_FINAL_CTA = {
  eyebrow: "Get Started",
  title: "Ready to Power Your Next Project?",
  body: "Talk to our engineers for sizing, product selection and factory-direct pricing — or send us your requirements for a custom quote.",
} as const;
