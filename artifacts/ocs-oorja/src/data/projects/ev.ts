import type { ProjectCaseStudy } from "./types";

export const ev: ProjectCaseStudy[] = [
  {
    id: "lucknow-erickshaw-charging-hub",
    slug: "lucknow-erickshaw-charging-hub",
    title: "E-Rickshaw Fleet Charging Hub, Lucknow",
    subtitle: "A multi-bay smart charging station for a 40-vehicle e-rickshaw fleet",
    segment: "EV",
    status: "commissioning",

    location: { city: "Lucknow", state: "Uttar Pradesh", countryCode: "IN" },
    publishDate: "2026-07-08",
    updatedAt: "2026-07-08",

    clientName: "Confidential",
    clientType: "Small Business",

    systemSize: { solarKw: 0, batteryKwh: 0, inverterKw: 0 },
    technologies: ["EV Charger", "BMS", "Smart Monitoring"],
    productsUsed: ["ocs-oorja-51v-25a-smart-charger", "e-rickshaw-51v2-100ah"],

    challenge:
      "A fleet operator running 40 e-rickshaws needed a central charging hub that could safely charge multiple LiFePO₄ traction packs overnight without long queues in the morning, while protecting the packs from overcharging.",
    solution:
      "OCS OORJA fitted the hub with bays of 51V 25A smart chargers alongside 51.2V 100Ah e-rickshaw battery packs, each managed by an onboard BMS with automatic CC/CV charge cut-off. Bays are laid out so drivers can rotate vehicles through overnight charging with minimal wait time.",
    results:
      "The hub is in final commissioning with a phased rollout across the fleet; early bays in service are charging packs safely overnight with no reported overcharge or thermal events.",

    heroImage: {
      src: "/images/projects/ev/lucknow-erickshaw-hero.jpg",
      alt: "Fleet of e-rickshaws lined up at a charging hub",
      width: 612,
      height: 459,
    },
    galleryImages: [
      {
        src: "/images/projects/ev/lucknow-erickshaw-bay.jpg",
        alt: "E-rickshaw back in daily service after overnight charging",
        width: 612,
        height: 459,
      },
    ],

    timeline: [
      { label: "Site Survey", date: "2026-05-05", description: "Fleet load audit and charging bay layout planning." },
      { label: "Installation", date: "2026-06-01", description: "Charger banks and battery racks installed across bays." },
      { label: "Commissioning (in progress)", date: "2026-07-01", description: "Phased bay-by-bay testing and driver handover." },
    ],

    relatedProductIds: ["ocs-oorja-51v-25a-smart-charger", "e-rickshaw-51v2-100ah"],
    relatedArticleIds: ["delhi-ev-policy-2026", "ac-vs-dc-ev-charging"],

    seo: {
      metaTitle: "E-Rickshaw Fleet Charging Hub Case Study, Lucknow | OCS OORJA",
      metaDescription:
        "How OCS OORJA smart chargers and LiFePO₄ packs power a 40-vehicle e-rickshaw fleet charging hub in Lucknow.",
    },
    schemaType: "CaseStudy",
  },
];
