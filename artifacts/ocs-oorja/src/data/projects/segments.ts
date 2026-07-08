import type { SegmentMeta } from "./types";

// The five market segments, in site display order. `icon` is a lucide-react
// icon NAME (a string) — the UI layer maps this name to a component, same
// convention as src/data/products/families.ts.
export const SEGMENTS: SegmentMeta[] = [
  {
    id: "Residential",
    label: "Residential",
    shortLabel: "Residential",
    description: "Home solar, battery backup, and EV charging installations.",
    icon: "Home",
    order: 1,
  },
  {
    id: "Commercial",
    label: "Commercial",
    shortLabel: "Commercial",
    description: "Rooftop solar and energy storage for offices, retail, and facilities.",
    icon: "Building2",
    order: 2,
  },
  {
    id: "Industrial",
    label: "Industrial",
    shortLabel: "Industrial",
    description: "Large-scale solar, BESS, and power backup for manufacturing sites.",
    icon: "Factory",
    order: 3,
  },
  {
    id: "Agriculture",
    label: "Agriculture",
    shortLabel: "Agriculture",
    description: "Solar power systems for irrigation, farms, and rural applications.",
    icon: "Wheat",
    order: 4,
  },
  {
    id: "EV",
    label: "EV Infrastructure",
    shortLabel: "EV",
    description: "EV and e-rickshaw charging stations and fleet charging hubs.",
    icon: "Zap",
    order: 5,
  },
];
