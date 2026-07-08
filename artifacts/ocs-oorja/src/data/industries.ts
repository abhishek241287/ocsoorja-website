// =============================================================================
// OCS OORJA — Industries We Serve (SINGLE SOURCE for the homepage industries)
// =============================================================================
// Non-developers: add, remove or edit an industry by editing THIS list only.
// Each entry renders one card in the "Industries We Serve" homepage section.
//
//   • image — a path under public/ (e.g. "/images/home/industries-telecom.webp").
//             Replace the file at that path to change the photo — no code edit.
//   • href  — where the card's link goes. Defaults to the products catalogue.
//   • icon  — a lucide-react icon NAME (a string), used by the icon-card layout
//             on the About page's "Industries We Serve" section. The UI layer
//             maps the name to a real icon component. Browse names at
//             https://lucide.dev/icons.
// =============================================================================

export type Industry = {
  id: string;
  name: string;
  description: string;
  image: string; // photo shown on the card (path under public/)
  href: string; // destination for the card's call-to-action
  icon: string; // lucide icon name, used by icon-card layouts (e.g. About page)
};

export const industries: Industry[] = [
  {
    id: "residential",
    name: "Residential Solar & Backup",
    description:
      "Hybrid inverters and LiFePO₄ storage for reliable day-and-night power backup in homes and apartments.",
    image: "/images/home/industries-residential.webp",
    href: "/products",
    icon: "Home",
  },
  {
    id: "commercial",
    name: "Commercial Buildings",
    description:
      "Scalable storage and power systems that cut diesel dependence and keep offices, hotels and shops running through outages.",
    image: "/images/home/industries-commercial.webp",
    href: "/products",
    icon: "Building",
  },
  {
    id: "industrial",
    name: "Industrial Plants",
    description:
      "Robust energy storage and power electronics for factories, warehouses and process plants with demanding duty cycles.",
    image: "/images/home/industries-industrial.webp",
    href: "/products",
    icon: "Factory",
  },
  {
    id: "telecom",
    name: "Telecom & Critical Backup",
    description:
      "Wide-temperature LiFePO₄ backup for telecom towers and mission-critical sites that cannot afford downtime.",
    image: "/images/home/industries-telecom.webp",
    href: "/products",
    icon: "Signal",
  },
  {
    id: "ev-infrastructure",
    name: "EV Charging Infrastructure",
    description:
      "AC and DC fast chargers for homes, workplaces, fleets and public charging points across India.",
    image: "/images/home/industries-ev.webp",
    href: "/products",
    icon: "Car",
  },
  {
    id: "agriculture",
    name: "Agriculture & Rural",
    description:
      "Solar-powered energy for irrigation, cold storage and rural sites where dependable off-grid power matters most.",
    image: "/images/home/industries-agriculture.webp",
    href: "/products",
    icon: "Tractor",
  },
];
