import type { ProjectCaseStudy } from "./types";

export const commercial: ProjectCaseStudy[] = [
  {
    id: "lucknow-commercial-rooftop-solar-bess",
    slug: "lucknow-commercial-rooftop-solar-bess",
    title: "Commercial Rooftop Solar + BESS, Sitapur",
    subtitle: "Rooftop solar with a 50kWh battery energy storage system for a manufacturing facility",
    segment: "Commercial",
    status: "completed",

    location: { city: "Sitapur", state: "Uttar Pradesh", countryCode: "IN" },
    completedDate: "2026-04-15",
    publishDate: "2026-07-08",
    updatedAt: "2026-07-08",

    clientName: "Confidential",
    clientType: "Small Business",

    systemSize: { solarKw: 24, batteryKwh: 50, inverterKw: 24 },
    technologies: ["Hybrid Inverter", "BESS", "BMS", "MPPT", "Solar", "Smart Monitoring"],
    productsUsed: ["bess-100kwh-commercial", "solar-hybrid-inverter-48v-6kw"],

    challenge:
      "A small manufacturing facility was running two production shifts and absorbing frequent daytime grid fluctuations that tripped sensitive equipment, plus 2-3 hour outages during peak summer load-shedding. Diesel generator backup was costly to run and maintain.",
    solution:
      "OCS OORJA designed a 24kW rooftop solar array powered by an array of 48V 6kW hybrid inverters feeding a 50kWh commercial BESS unit. The BESS smooths grid fluctuations in real time, stores surplus solar generation for use after sunset, and switches the facility to battery power within milliseconds during an outage — removing the need to start the diesel generator for short outages.",
    results:
      "Since commissioning, the facility has cut diesel generator runtime by roughly 70% and reduced its grid electricity spend during the day through self-consumption of solar power. The BESS has also eliminated equipment trips caused by voltage fluctuations on the grid.",

    heroImage: {
      src: "/images/projects/commercial/lucknow-commercial-hero.webp",
      alt: "Commercial rooftop solar panel array on a facility roof",
      width: 2000,
      height: 1200,
    },
    galleryImages: [
      {
        src: "/images/projects/commercial/lucknow-commercial-array.webp",
        alt: "Rooftop solar panel array installed on a factory and warehouse roof",
        width: 600,
        height: 326,
      },
    ],

    roi: {
      estimatedMonthlySavings: 68000,
      annualSavings: 816000,
      estimatedPaybackYears: 4.8,
      backupDurationHours: 6,
      co2ReductionKgPerYear: 32000,
      energyGeneratedKwhPerYear: 36000,
    },
    timeline: [
      { label: "Site Survey", date: "2026-02-25", description: "Load audit, roof structural check, and BESS sizing." },
      { label: "Engineering & Approvals", date: "2026-03-10", description: "System design finalized and utility approvals filed." },
      { label: "Installation", date: "2026-03-28", description: "Rooftop array, inverter bank, and BESS unit installed." },
      { label: "Commissioning", date: "2026-04-15", description: "Load testing, BMS configuration, and staff handover training." },
    ],

    relatedProductIds: ["bess-100kwh-commercial", "solar-hybrid-inverter-48v-6kw"],
    relatedArticleIds: ["hybrid-solar-inverter-guide", "lifepo4-vs-lead-acid"],

    seo: {
      metaTitle: "Commercial Rooftop Solar + BESS Case Study, Sitapur | OCS OORJA",
      metaDescription:
        "How a 24kW rooftop solar array and 50kWh BESS cut diesel generator use and stabilized power for a Sitapur manufacturing facility.",
    },
    schemaType: "Project",
  },
];
