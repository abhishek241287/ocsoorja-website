import type { Product } from "./types";

// AC EV Chargers
// To add or edit a product in this family, copy an entry below and change the
// values. Product photos go in public/images/products/ac-ev-chargers/ and brochures/
// datasheets in public/downloads/. Editing here updates the whole site.

export const acEvChargers: Product[] = [
  {
    "id": "p-ev-charger-ac",
    "name": "EV Charger (AC)",
    "slug": "ev-charger-ac",
    "family": "ac-ev-chargers",
    "series": "AC Wallbox Series",
    "image": "/images/products/ev-charger-ac.jpeg",
    "summary": "AC charger for electric vehicles suitable for homes and workplaces.",
    "warranty": "Warranty details on request",
    "tags": [
      "Charger",
      "AC",
      "EV"
    ],
    "specs": [
      {
        "key": "Type",
        "value": "AC charging"
      },
      {
        "key": "Power Options",
        "value": "7–22kW"
      },
      {
        "key": "Connectivity",
        "value": "Smart/OCPP options"
      },
      {
        "key": "Safety",
        "value": "Protections & metering"
      }
    ],
    "dateAdded": "2024-08-12"
  }
];
