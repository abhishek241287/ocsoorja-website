// =============================================================================
// OCS OORJA — Industries We Serve (SINGLE SOURCE for the homepage industries)
// =============================================================================
// Non-developers: add, remove or edit an industry by editing THIS list only.
// Each entry renders one card in the "Industries We Serve" homepage section.
//
//   • icon  — a lucide-react icon NAME (a string). The UI layer maps this name
//             to a real icon component, so this file stays plain data. Browse
//             names at https://lucide.dev/icons. If you pick a name the site
//             doesn't know yet, a developer adds it to the section's icon map.
//   • href  — where the card's link goes. Defaults to the products catalogue.
// =============================================================================

export type Industry = {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name; resolved to a component in the UI layer
  href: string; // destination for the card's call-to-action
};

export const industries: Industry[] = [
  {
    id: "residential",
    name: "Residential & Home Backup",
    description:
      "Hybrid inverters and LiFePO₄ storage for reliable day-and-night power backup in homes and apartments.",
    icon: "Home",
    href: "/products",
  },
  {
    id: "commercial-industrial",
    name: "Commercial & Industrial",
    description:
      "Scalable energy storage and power systems that cut diesel dependence and keep operations running through outages.",
    icon: "Building2",
    href: "/products",
  },
  {
    id: "solar-epc",
    name: "Solar EPC & Developers",
    description:
      "MPPT hybrid inverters and battery banks that EPC partners can specify, size and deploy with confidence.",
    icon: "SunMedium",
    href: "/products",
  },
  {
    id: "ev-infrastructure",
    name: "EV Charging Infrastructure",
    description:
      "AC and DC fast chargers for homes, workplaces, fleets and public charging points across India.",
    icon: "Zap",
    href: "/products",
  },
  {
    id: "telecom",
    name: "Telecom & Critical Backup",
    description:
      "Wide-temperature LiFePO₄ backup for telecom towers and mission-critical sites that cannot afford downtime.",
    icon: "RadioTower",
    href: "/products",
  },
  {
    id: "oem-custom",
    name: "OEM & Custom Solutions",
    description:
      "Custom battery packs and power electronics engineered to your voltage, capacity and form-factor needs.",
    icon: "Wrench",
    href: "/products",
  },
];
