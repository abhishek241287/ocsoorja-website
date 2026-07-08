// =============================================================================
// OCS OORJA — About page content (SINGLE SOURCE for the /about page)
// =============================================================================
// Non-developers: edit the About page's story, vision, mission, values,
// capabilities, "why choose us" and engineering-excellence copy HERE. Changing
// a value updates the About page — you do NOT need to touch any React
// component or layout.
//
//   • icon — a lucide-react icon NAME (a string). The UI layer (the matching
//            component under src/components/about/) maps the name to a real
//            icon component. Browse names at https://lucide.dev/icons.
//   • Content here must stay factual — no invented history, dates, or claims
//     beyond what OCS OORJA's real products and processes support.
//
// Shared brand wording (hero headline/subtitle, motto, meta tags) lives in
// src/data/brand.ts (HEADLINES.about, BRAND.motto). Industries content is
// shared with the homepage and lives in src/data/industries.ts.
// =============================================================================

// --- Our Story ----------------------------------------------------------------
export const OUR_STORY = {
  eyebrow: "Our Story",
  title: "Why We Exist",
  paragraphs: [
    "India's energy landscape is changing. Solar adoption is accelerating. Electric vehicles are entering the market. Businesses need reliable backup. Homes want independence from grid outages and rising electricity costs.",
    "Yet the gap between energy generation and intelligent storage remains wide. Many systems are designed for stable Western grids, not for Indian conditions — voltage fluctuations, extreme temperatures, dust, monsoon humidity, and long power cuts.",
    "OCS OORJA exists to bridge that gap. We engineer clean-energy systems that work reliably in Indian conditions. We design for the voltage swings, the heat, the dust, and the monsoons. We manufacture locally because we believe India's energy future depends on Indian engineering and production.",
    "Every product we build is tested for the conditions it will actually face — not ideal laboratory conditions, but real rooftops, real factories, real homes across India.",
  ],
} as const;

// --- Vision ---------------------------------------------------------------
export const VISION = {
  eyebrow: "Our Vision",
  title: "Our Vision",
  statement:
    "To become India's most trusted clean-energy technology company — engineering reliable, intelligent power systems that advance energy independence, sustainability, and long-term value for every customer we serve.",
  pillars: [
    "Innovation",
    "Reliability",
    "Sustainability",
    "Smart Energy",
    "Indian Manufacturing",
    "Long-term Leadership",
  ],
} as const;

// --- Mission — five engineering pillars ---------------------------------------
export type AboutCard = { icon: string; title: string; description: string };

export const MISSION = {
  eyebrow: "Our Mission",
  title: "Our Mission",
  pillars: [
    {
      icon: "Zap",
      title: "Engineer Reliable Energy Solutions",
      description:
        "Design power systems that perform consistently in India's climate, voltage conditions, and grid environment.",
    },
    {
      icon: "Microscope",
      title: "Drive Continuous Innovation",
      description:
        "Advance battery chemistry, power electronics, and intelligent monitoring to meet evolving energy needs.",
    },
    {
      icon: "Flag",
      title: "Strengthen India's Energy Future",
      description:
        "Manufacture locally, reduce import dependency, and strengthen India's renewable energy ecosystem.",
    },
    {
      icon: "Handshake",
      title: "Deliver Exceptional Customer Value",
      description:
        "Provide honest guidance, clear specifications, and responsive support from inquiry through long-term operation.",
    },
    {
      icon: "Leaf",
      title: "Build a Cleaner Future",
      description:
        "Enable measurable reductions in carbon emissions through efficient energy storage and EV charging technology.",
    },
  ] as AboutCard[],
} as const;

// --- Core Values — six principle cards -----------------------------------------
export const CORE_VALUES = {
  eyebrow: "Core Values",
  title: "What We Stand For",
  items: [
    {
      icon: "Shield",
      title: "Safety First",
      description:
        "Every design decision prioritizes the safety of users, installers, and maintenance personnel.",
    },
    {
      icon: "CheckCircle",
      title: "Quality Without Compromise",
      description:
        "We validate components, processes, and finished products against rigorous standards.",
    },
    {
      icon: "Lightbulb",
      title: "Innovation",
      description:
        "We solve practical problems — from voltage fluctuations to monsoon humidity — through engineering ingenuity.",
    },
    {
      icon: "Heart",
      title: "Customer Commitment",
      description:
        "We measure success by system performance and customer satisfaction, not by sales volume alone.",
    },
    {
      icon: "Scale",
      title: "Integrity",
      description:
        "Transparent specifications, honest pricing, and clear communication in every interaction.",
    },
    {
      icon: "Globe",
      title: "Sustainability",
      description:
        "Long-lasting products that reduce waste, lower emissions, and support circular energy systems.",
    },
  ] as AboutCard[],
} as const;

// --- Engineering Capabilities — eight technical domains -----------------------
export const ENGINEERING_CAPABILITIES = {
  eyebrow: "Engineering Capabilities",
  title: "What We Engineer",
  items: [
    {
      icon: "Battery",
      title: "Battery Engineering",
      description:
        "Design and assembly of lithium battery packs for residential, commercial, and industrial energy storage.",
    },
    {
      icon: "Cpu",
      title: "Battery Management Systems (BMS)",
      description:
        "Intelligent cell monitoring, balancing, and protection systems that extend battery life and ensure safety.",
    },
    {
      icon: "Sun",
      title: "Hybrid Solar Inverters",
      description:
        "Power conversion systems that integrate solar generation, battery storage, and grid connectivity.",
    },
    {
      icon: "Database",
      title: "Energy Storage Systems",
      description:
        "Scalable battery solutions for homes, businesses, and utility-scale applications.",
    },
    {
      icon: "Plug",
      title: "EV Charging Solutions",
      description:
        "AC and DC charging infrastructure for homes, commercial spaces, and fleet operations.",
    },
    {
      icon: "Grid3x3",
      title: "Solar Integration",
      description:
        "System design and component matching for optimal solar energy harvest and utilization.",
    },
    {
      icon: "Factory",
      title: "Custom Manufacturing",
      description:
        "Custom engineering and production services for partners and enterprise clients with specific requirements.",
    },
    {
      icon: "Smartphone",
      title: "Smart Energy Management",
      description:
        "Remote monitoring, diagnostics, and performance optimization through connected platforms.",
    },
  ] as AboutCard[],
} as const;

// --- Industries We Serve (section heading only — card data is shared with the
// homepage and lives in src/data/industries.ts, the single source of truth) ---
export const ABOUT_INDUSTRIES_SECTION = {
  eyebrow: "Industries We Serve",
  title: "Industries We Serve",
  subtitle:
    "OCS OORJA systems are deployed across India's most demanding environments — from homes to critical off-grid infrastructure.",
} as const;

// --- Why Choose OCS OORJA — six genuine differentiators ------------------------
export const WHY_CHOOSE = {
  eyebrow: "Why OCS OORJA",
  title: "Why OCS OORJA",
  items: [
    {
      icon: "MapPin",
      title: "Indian Engineering",
      description:
        "Designed and manufactured for Indian conditions — voltage fluctuations, heat, dust, and monsoon humidity.",
    },
    {
      icon: "Layers",
      title: "Integrated Energy Solutions",
      description:
        "Complete systems from solar generation to battery storage, inverter technology, and intelligent monitoring.",
    },
    {
      icon: "Award",
      title: "Reliable Products",
      description:
        "Rigorous testing and validation ensure consistent performance in real-world conditions.",
    },
    {
      icon: "Wrench",
      title: "Application Expertise",
      description:
        "Deep understanding of residential, commercial, industrial, agricultural, and EV charging applications.",
    },
    {
      icon: "Headphones",
      title: "Technical Support",
      description:
        "Direct access to engineering expertise for system design, troubleshooting, and optimization.",
    },
    {
      icon: "Rocket",
      title: "Future-Ready Technology",
      description:
        "Modular designs that support expansion, upgrades, and integration with emerging energy technologies.",
    },
  ] as AboutCard[],
} as const;

// --- Engineering Excellence — philosophy, validation, quality ------------------
export type ExcellenceTopic = { title: string; body: string };

export const ENGINEERING_EXCELLENCE = {
  eyebrow: "Engineering Excellence",
  title: "How We Engineer",
  topics: [
    {
      title: "Philosophy",
      body: "We believe that energy systems should be judged by how they perform after years of operation, not by specifications on paper. Our engineering process prioritizes reliability, safety, and long-term value over short-term metrics.",
    },
    {
      title: "Product Validation",
      body: "Every product design undergoes extensive validation before production. We test for thermal performance, electrical safety, electromagnetic compatibility, and mechanical durability. We simulate years of operation through accelerated stress testing.",
    },
    {
      title: "Quality Assurance",
      body: "Our quality system covers incoming materials, in-process manufacturing, and final product verification. We trace every component back to its source. We record test data for every unit that leaves our facility.",
    },
    {
      title: "Safety",
      body: "Safety is not a feature — it is the foundation. Our designs incorporate multiple layers of protection: electrical isolation, thermal management, fault detection, and fail-safe operation. We design for the worst-case scenario so our customers never have to experience it.",
    },
    {
      title: "Testing",
      body: "We test beyond standard requirements. Our products undergo temperature cycling, humidity exposure, vibration testing, and electrical stress testing. We validate performance at the edges of specified operating ranges, not just at nominal conditions.",
    },
    {
      title: "Reliability",
      body: "Reliability is the result of good design, quality components, and controlled manufacturing. We select components rated for extended temperature ranges. We design circuits with appropriate safety margins. We monitor field performance and feed lessons back into design improvements.",
    },
    {
      title: "Continuous Improvement",
      body: "Engineering is never finished. We collect performance data from installed systems. We analyze failure modes. We update designs based on field experience. Every product generation is better than the last.",
    },
  ] as ExcellenceTopic[],
} as const;

// --- CTA -------------------------------------------------------------------
export const ABOUT_CTA = {
  title: "Let's Power India's Sustainable Future Together",
  body: "Whether you are powering a home, a business, or an entire community — we are ready to engineer the right solution.",
} as const;
