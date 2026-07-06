// =============================================================================
// OCS OORJA — Industries We Serve (SINGLE SOURCE for the homepage industries)
// =============================================================================
// Non-developers: add, remove or edit an industry by editing THIS list only.
// Each entry renders one card in the "Industries We Serve" homepage section.
//
//   • image — a path under public/ (e.g. "/images/home/industries-telecom.jpg").
//             Replace the file at that path to change the photo — no code edit.
//   • href  — where the card's link goes. Defaults to the products catalogue.
// =============================================================================

export type Industry = {
  id: string;
  name: string;
  description: string;
  image: string; // photo shown on the card (path under public/)
  href: string; // destination for the card's call-to-action
};

export const industries: Industry[] = [
  {
    id: "residential",
    name: "Residential Solar & Backup",
    description:
      "Hybrid inverters and LiFePO₄ storage for reliable day-and-night power backup in homes and apartments.",
    image: "/images/home/industries-residential.jpg",
    href: "/products",
  },
  {
    id: "commercial",
    name: "Commercial Buildings",
    description:
      "Scalable storage and power systems that cut diesel dependence and keep offices, hotels and shops running through outages.",
    image: "/images/home/industries-commercial.jpg",
    href: "/products",
  },
  {
    id: "industrial",
    name: "Industrial Plants",
    description:
      "Robust energy storage and power electronics for factories, warehouses and process plants with demanding duty cycles.",
    image: "/images/home/industries-industrial.jpg",
    href: "/products",
  },
  {
    id: "telecom",
    name: "Telecom & Critical Backup",
    description:
      "Wide-temperature LiFePO₄ backup for telecom towers and mission-critical sites that cannot afford downtime.",
    image: "/images/home/industries-telecom.jpg",
    href: "/products",
  },
  {
    id: "ev-infrastructure",
    name: "EV Charging Infrastructure",
    description:
      "AC and DC fast chargers for homes, workplaces, fleets and public charging points across India.",
    image: "/images/home/industries-ev.jpg",
    href: "/products",
  },
  {
    id: "agriculture",
    name: "Agriculture & Rural",
    description:
      "Solar-powered energy for irrigation, cold storage and rural sites where dependable off-grid power matters most.",
    image: "/images/home/industries-agriculture.jpg",
    href: "/products",
  },
];
