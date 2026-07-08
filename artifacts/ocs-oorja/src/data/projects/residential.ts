import type { ProjectCaseStudy } from "./types";

export const residential: ProjectCaseStudy[] = [
  {
    id: "lucknow-residential-hybrid-solar-6kw",
    slug: "lucknow-residential-hybrid-solar-6kw",
    title: "Lucknow Home Hybrid Solar & Battery Backup",
    subtitle: "A 6kW hybrid solar system with LiFePO₄ battery backup for a 3BHK home",
    segment: "Residential",
    status: "completed",

    location: { city: "Lucknow", state: "Uttar Pradesh", countryCode: "IN" },
    completedDate: "2026-02-20",
    publishDate: "2026-07-08",
    updatedAt: "2026-07-08",

    clientName: "Confidential",
    clientType: "Homeowner",

    systemSize: { solarKw: 6, batteryKwh: 7.68, inverterKw: 6 },
    technologies: ["Hybrid Inverter", "LiFePO4", "MPPT", "Solar", "Smart Monitoring"],
    productsUsed: ["solar-hybrid-inverter-48v-6kw", "24v-100ah-home-power-storage"],

    challenge:
      "The homeowner faced frequent evening grid outages of 2-4 hours and a rising monthly electricity bill for a 3BHK home with two ACs, a refrigerator, and standard household load. A previous lead-acid inverter setup could not reliably run the AC during outages and needed battery replacement every 18-24 months.",
    solution:
      "OCS OORJA engineers sized a 6kW hybrid solar inverter paired with three 24V 100Ah LiFePO₄ battery packs (7.68kWh usable) mounted on the rooftop and a dedicated battery rack in the utility room. The hybrid inverter's MPPT charge controller draws from the rooftop array during the day, tops up the battery bank, and switches loads to battery automatically within milliseconds during a grid outage — keeping the AC and refrigerator running uninterrupted.",
    results:
      "The system has run through the 2026 summer without a single unplanned load interruption, cut the household's grid electricity bill by roughly 55-60% in sunny months, and gives the home 6-7 hours of backup for essential loads during an outage.",

    heroImage: {
      src: "/images/projects/residential/lucknow-residential-hero.jpg",
      alt: "Installer carrying a solar panel onto a residential rooftop",
      width: 1200,
      height: 1600,
    },
    galleryImages: [
      {
        src: "/images/projects/residential/lucknow-residential-rooftop.png",
        alt: "Rooftop solar panels installed above a residential home",
        width: 1024,
        height: 576,
      },
    ],

    roi: {
      estimatedMonthlySavings: 3200,
      annualSavings: 38400,
      estimatedPaybackYears: 5.2,
      backupDurationHours: 7,
      co2ReductionKgPerYear: 1800,
      energyGeneratedKwhPerYear: 6800,
    },
    timeline: [
      { label: "Site Survey", date: "2026-01-10", description: "Roof assessment, shading study, and load audit." },
      { label: "Engineering & Approvals", date: "2026-01-20", description: "System design finalized and net-metering paperwork filed." },
      { label: "Installation", date: "2026-02-12", description: "Rooftop array, inverter, and battery bank installed." },
      { label: "Commissioning", date: "2026-02-20", description: "System tested, monitoring app configured, and handed over." },
    ],

    relatedProductIds: ["solar-hybrid-inverter-48v-6kw", "24v-100ah-home-power-storage"],
    relatedArticleIds: [
      "hybrid-solar-inverter-guide",
      "how-much-can-a-home-solar-battery-system-save-on-electricity-bills",
    ],

    seo: {
      metaTitle: "Lucknow Home Hybrid Solar & Battery Backup Case Study | OCS OORJA",
      metaDescription:
        "How a 6kW hybrid solar inverter and LiFePO₄ battery bank cut a Lucknow home's electricity bill and delivered 7 hours of backup power.",
    },
    schemaType: "Project",
  },
];
