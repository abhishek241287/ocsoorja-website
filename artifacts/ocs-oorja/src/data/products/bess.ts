import type { Product } from "./types";

// Battery Energy Storage Systems (BESS)
// To add or edit a product in this family, copy an entry below and change the
// values. Product photos go in public/images/products/bess/ and brochures/
// datasheets in public/downloads/. Editing here updates the whole site.

export const bess: Product[] = [
  {
    "id": "p-bess-5kwh",
    "name": "OCS OORJA BESS 5 kWh (Residential)",
    "slug": "bess-5kwh-residential",
    "family": "bess",
    "series": "Residential BESS",
    "image": "/images/products/bess/bess-5kwh-residential.png",
    "images": [
      "/images/products/bess/bess-5kwh-residential.png"
    ],
    "summary": "5.1 kWh floor-standing LiFePO₄ battery pack with DALY BMS display, RS-485/CAN communication, and 5-year warranty. Ideal for home solar storage, commercial backup, and off-grid systems.",
    "warranty": "60 Months (5 Years)",
    "tags": [
      "BESS",
      "LFP",
      "Made in India",
      "Solar",
      "51.2V",
      "5kWh"
    ],
    "specs": [
      { "key": "Array Mode", "value": "16S" },
      { "key": "Nominal Energy", "value": "5.1 kWh" },
      { "key": "Nominal Voltage", "value": "51.2V" },
      { "key": "Nominal Capacity", "value": "105Ah" },
      { "key": "Charge Voltage", "value": "58.4V" },
      { "key": "Discharge Cut-off Voltage", "value": "42V" },
      { "key": "Standard Charging Current", "value": "20A" },
      { "key": "Max Continuous Charging Current", "value": "100A" },
      { "key": "Max Continuous Discharging Current", "value": "100A" },
      { "key": "Cycle Life", "value": ">5000 Times @80% DoD, 25°C" },
      { "key": "Communication Mode", "value": "RS-485 / CAN" },
      { "key": "Operating Temperature (Charge)", "value": "0°C – 60°C" },
      { "key": "Operating Temperature (Discharge)", "value": "−10°C – 65°C" },
      { "key": "Gross Weight", "value": "45 kg" }
    ],
    "features": [
      "5.1 kWh Usable Energy – Covers a typical home's evening power needs from solar harvest",
      "16S LiFePO₄ Prismatic Cells – Grade-A cells for high energy density and >10-year service life",
      "DALY Smart BMS with Display – Real-time voltage, current, SOC, and temperature on the front panel",
      "RS-485 / CAN Communication – Integrates seamlessly with hybrid inverters and EMS platforms",
      "100A Continuous Discharge – Handles heavy loads including ACs and pumps without voltage sag",
      ">5000 Cycle Life @80% DoD – Outlasts lead-acid by 3–5× with zero maintenance",
      "Floor-Standing Cabinet with Castor Wheels – Easy installation and repositioning indoors",
      "Wide Temperature Range – Reliable in Indian summer and winter conditions",
      "Smart BMS Protection – Safeguards against overcharge, over-discharge, over-current, and short circuits",
      "5-Year Warranty – OCS OORJA's longest warranty commitment for residential and commercial installations",
      "Make in India – Designed and assembled at OCS OORJA Labs, Lucknow"
    ],
    "applications": [
      "Home Solar Energy Storage (BESS)",
      "Hybrid Solar Inverter Systems",
      "Commercial & Office Power Backup",
      "Off-Grid Power Systems",
      "Telecom Tower Backup",
      "Industrial UPS & Critical Loads"
    ],
    "details": "The OCS OORJA BESS 5 kWh is a premium floor-standing energy storage solution for homes, offices, and light commercial installations. Built with 16S Grade-A prismatic LiFePO₄ cells in a 51.2V / 105Ah configuration, it stores 5.1 kWh of usable energy — enough to power a typical Indian household through the evening peak or to act as backup during grid outages. The integrated DALY Smart BMS features a front-panel display showing real-time voltage, battery percentage, current, and temperature, giving homeowners at-a-glance system health without any app. RS-485 and CAN communication ports ensure compatibility with all major hybrid inverter brands. With more than 5000 cycles at 80% depth-of-discharge (25°C), this pack delivers over 10 years of daily cycling life. The compact cabinet mounts on heavy-duty castor wheels for easy placement and maintenance access. Backed by OCS OORJA's 5-year warranty — the longest in our range — and assembled at OCS OORJA Labs, Lucknow.",
    "dateAdded": "2026-07-20"
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
