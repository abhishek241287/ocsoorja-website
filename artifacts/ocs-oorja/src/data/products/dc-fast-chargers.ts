import type { Product } from "./types";

// DC Fast Chargers
// To add or edit a product in this family, copy an entry below and change the
// values. Product photos go in public/images/products/dc-fast-chargers/ and brochures/
// datasheets in public/downloads/. Editing here updates the whole site.

export const dcFastChargers: Product[] = [
  {
    "id": "p-ev-charger-dc-fast",
    "name": "EV Charger (DC Fast)",
    "slug": "ev-charger-dc-fast",
    "family": "dc-fast-chargers",
    "series": "DC Fast Series",
    "image": "/images/products/ev-charger-dc-fast.jpeg",
    "summary": "DC fast charging solution for rapid EV energy top‑ups.",
    "warranty": "Warranty details on request",
    "tags": [
      "Charger",
      "DC Fast",
      "EV"
    ],
    "specs": [
      {
        "key": "Type",
        "value": "DC fast charging"
      },
      {
        "key": "Power Options",
        "value": "30–120kW"
      },
      {
        "key": "Connectors",
        "value": "CCS2/CHAdeMO options"
      },
      {
        "key": "Features",
        "value": "Smart/OCPP, billing"
      }
    ],
    "dateAdded": "2024-08-20"
  }
];
