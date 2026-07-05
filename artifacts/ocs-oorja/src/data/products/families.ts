import type { ProductCta, ProductFamilyMeta } from "./types";
import { CTAS } from "../brand";

// Default call-to-action used when a product does not define its own `cta`.
// Sourced from the shared CTA library so quote wording stays consistent site-wide.
export const DEFAULT_CTA: ProductCta = CTAS.requestQuote;

// The seven product families, in site display order.
//
// `icon` is a lucide-react icon NAME (a string). The UI layer maps this name to
// an actual React component — icons are never stored as components in data so
// this file stays plain, non-developer-editable data.
export const FAMILIES: ProductFamilyMeta[] = [
  {
    id: "hybrid-solar-inverters",
    label: "Hybrid Solar Inverters",
    shortLabel: "Solar Inverters",
    description: "MPPT hybrid inverters that combine solar, grid, and battery power.",
    icon: "Sun",
    order: 1,
  },
  {
    id: "inbuilt-lithium-inverters",
    label: "Inbuilt Lithium Battery Inverters",
    shortLabel: "Lithium Inverters",
    description: "Integrated inverter and LiFePO₄ battery systems for home backup.",
    icon: "Home",
    order: 2,
  },
  {
    id: "lifepo4-batteries",
    label: "LiFePO₄ Battery Systems",
    shortLabel: "Batteries",
    description: "Grade-A prismatic lithium battery packs for solar, home, and EV use.",
    icon: "BatteryCharging",
    order: 3,
  },
  {
    id: "ac-ev-chargers",
    label: "AC EV Chargers",
    shortLabel: "AC Chargers",
    description: "AC charging stations for homes, workplaces, and fleets.",
    icon: "Zap",
    order: 4,
  },
  {
    id: "dc-fast-chargers",
    label: "DC Fast Chargers",
    shortLabel: "DC Fast",
    description: "High-power DC fast charging for rapid EV top-ups.",
    icon: "Zap",
    order: 5,
  },
  {
    id: "e-rickshaw-chargers",
    label: "E-Rickshaw Chargers",
    shortLabel: "E-Rickshaw",
    description: "Smart CC/CV chargers for e-rickshaw and traction LiFePO₄ packs.",
    icon: "BatteryCharging",
    order: 6,
  },
  {
    id: "bess",
    label: "Battery Energy Storage Systems (BESS)",
    shortLabel: "BESS",
    description: "Scalable energy storage for residential, commercial, and industrial sites.",
    icon: "Battery",
    order: 7,
  },
];
