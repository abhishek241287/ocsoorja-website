import type { Product } from "./types";

// Battery Energy Storage Systems (BESS)
// To add or edit a product in this family, copy an entry below and change the
// values. Product photos go in public/images/products/bess/ and brochures/
// datasheets in public/downloads/. Editing here updates the whole site.

export const bess: Product[] = [
  // --- Placeholders: awaiting real photography, specs, and downloads ---
  {
    "id": "p-bess-5kwh",
    "name": "OCS OORJA BESS 5 kWh (Residential)",
    "slug": "bess-5kwh-residential",
    "family": "bess",
    "series": "Residential BESS",
    "image": "/images/placeholder.svg",
    "summary": "Placeholder listing — full specifications, photography, and downloads coming soon.",
    "warranty": "Warranty details on request",
    "tags": [
      "BESS",
      "Storage",
      "LFP"
    ],
    "specs": [
      {
        "key": "Usable Capacity",
        "value": "5 kWh"
      },
      {
        "key": "Status",
        "value": "Full specifications coming soon"
      }
    ],
    "dateAdded": "2026-07-05",
    "status": "placeholder",
    "awaiting": [
      "images",
      "specs",
      "datasheet",
      "brochure"
    ]
  },
  {
    "id": "p-bess-100kwh",
    "name": "OCS OORJA BESS 100 kWh (Commercial)",
    "slug": "bess-100kwh-commercial",
    "family": "bess",
    "series": "Commercial & Industrial BESS",
    "image": "/images/placeholder.svg",
    "summary": "Placeholder listing — full specifications, photography, and downloads coming soon.",
    "warranty": "Warranty details on request",
    "tags": [
      "BESS",
      "C&I",
      "Storage",
      "LFP"
    ],
    "specs": [
      {
        "key": "Usable Capacity",
        "value": "100 kWh"
      },
      {
        "key": "Status",
        "value": "Full specifications coming soon"
      }
    ],
    "dateAdded": "2026-07-05",
    "status": "placeholder",
    "awaiting": [
      "images",
      "specs",
      "datasheet",
      "brochure"
    ]
  }
];
