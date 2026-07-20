import type { Product } from "./types";

// LiFePO₄ Battery Systems
// To add or edit a product in this family, copy an entry below and change the
// values. Product photos go in public/images/products/lifepo4-batteries/ and brochures/
// datasheets in public/downloads/. Editing here updates the whole site.

export const lifepo4Batteries: Product[] = [
  {
    "id": "p-ebike-60v-20ah",
    "name": "E‑Bike 60V 20Ah",
    "slug": "e-bike-60v-20ah",
    "family": "lifepo4-batteries",
    "series": "E-Mobility Packs (NMC)",
    "image": "/images/products/lifepo4-batteries/ebike-lifepo4-battery.png",
    "summary": "Lightweight 60V 20Ah pack for two‑wheelers, tuned for daily commuting.",
    "warranty": "Warranty details on request",
    "tags": [
      "EV",
      "E‑Bike",
      "NMC"
    ],
    "specs": [
      {
        "key": "Nominal Voltage",
        "value": "60V"
      },
      {
        "key": "Capacity",
        "value": "20Ah"
      },
      {
        "key": "Chemistry",
        "value": "NMC"
      },
      {
        "key": "BMS",
        "value": "Smart protections"
      }
    ],
    "dateAdded": "2023-01-15",
    "awaiting": [
      "images",
      "specs"
    ],
    "needsReview": true
  },
  {
    "id": "p-ebike-60v-30ah",
    "name": "E‑Bike 60V 30Ah",
    "slug": "e-bike-60v-30ah",
    "family": "lifepo4-batteries",
    "series": "E-Mobility Packs (NMC)",
    "image": "/images/products/lifepo4-batteries/ebike-lifepo4-battery.png",
    "summary": "Extended‑range 60V 30Ah pack for two‑wheelers.",
    "warranty": "Warranty details on request",
    "tags": [
      "EV",
      "E‑Bike",
      "NMC"
    ],
    "specs": [
      {
        "key": "Nominal Voltage",
        "value": "60V"
      },
      {
        "key": "Capacity",
        "value": "30Ah"
      },
      {
        "key": "Chemistry",
        "value": "NMC"
      },
      {
        "key": "BMS",
        "value": "Smart protections"
      }
    ],
    "dateAdded": "2023-01-10",
    "awaiting": [
      "images",
      "specs"
    ],
    "needsReview": true
  },
  {
    "id": "p-ebike-60v-35ah",
    "name": "E‑Bike 60V 35Ah",
    "slug": "e-bike-60v-35ah",
    "family": "lifepo4-batteries",
    "series": "E-Mobility Packs (NMC)",
    "image": "/images/products/lifepo4-batteries/ebike-lifepo4-battery.png",
    "summary": "Balanced performance 60V 35Ah pack for two‑wheelers.",
    "warranty": "Warranty details on request",
    "tags": [
      "EV",
      "E‑Bike",
      "NMC"
    ],
    "specs": [
      {
        "key": "Nominal Voltage",
        "value": "60V"
      },
      {
        "key": "Capacity",
        "value": "35Ah"
      },
      {
        "key": "Chemistry",
        "value": "NMC"
      },
      {
        "key": "BMS",
        "value": "Smart protections"
      }
    ],
    "dateAdded": "2023-01-05",
    "awaiting": [
      "images",
      "specs"
    ],
    "needsReview": true
  },
  {
    "id": "p-ebike-60v-40ah",
    "name": "E‑Bike 60V 40Ah",
    "slug": "e-bike-60v-40ah",
    "family": "lifepo4-batteries",
    "series": "E-Mobility Packs (NMC)",
    "image": "/images/products/lifepo4-batteries/ebike-lifepo4-battery.png",
    "summary": "High‑capacity 60V 40Ah pack for extended range two‑wheelers.",
    "warranty": "Warranty details on request",
    "tags": [
      "EV",
      "E‑Bike",
      "NMC"
    ],
    "specs": [
      {
        "key": "Nominal Voltage",
        "value": "60V"
      },
      {
        "key": "Capacity",
        "value": "40Ah"
      },
      {
        "key": "Chemistry",
        "value": "NMC"
      },
      {
        "key": "BMS",
        "value": "Smart protections"
      }
    ],
    "dateAdded": "2023-01-01",
    "awaiting": [
      "images",
      "specs"
    ],
    "needsReview": true
  },
  {
    "id": "p-charger-51v-20a-home-rcd-can",
    "name": "OCS OORJA 51.2V 20A Smart Charger for Home Storage (RCD + CAN)",
    "slug": "ocs-oorja-51v-20a-smart-charger-home-storage",
    "family": "lifepo4-batteries",
    "series": "Battery Chargers",
    "image": "/images/products/ev-charger-erickshaw-new.jpeg",
    "summary": "Fast, dependable charging for 80–150Ah LiFePO₄ home storage packs with BMS-aware taper, RCD protection, and CAN communication—perfect for residential solar and backup systems.",
    "warranty": "60 Months (5 Years)",
    "tags": [
      "Charger",
      "Fast",
      "Smart",
      "LiFePO₄",
      "Home Storage",
      "CAN",
      "Made in India"
    ],
    "specs": [
      {
        "key": "Model",
        "value": "OCS OORJA SC-51.2V-20A-HS"
      },
      {
        "key": "Output Voltage",
        "value": "51.2V (Nominal)"
      },
      {
        "key": "Charging Voltage (CV)",
        "value": "58.4V"
      },
      {
        "key": "Rated Current",
        "value": "20A"
      },
      {
        "key": "Charging Profile",
        "value": "CC/CV with BMS-aware taper"
      },
      {
        "key": "Battery Chemistry",
        "value": "LiFePO₄ (16S Configuration)"
      },
      {
        "key": "Recommended Capacity Range",
        "value": "80–150Ah"
      },
      {
        "key": "AC Input Voltage",
        "value": "180–265VAC"
      },
      {
        "key": "AC Input Frequency",
        "value": "50/60Hz"
      },
      {
        "key": "RCD Protection",
        "value": "Built-in 30mA, Type A"
      },
      {
        "key": "CAN Communication",
        "value": "CAN 2.0A/2.0B"
      },
      {
        "key": "BMS Compatibility",
        "value": "Daly, Xiaoxiang, and other 16S BMS"
      },
      {
        "key": "Charging Algorithm",
        "value": "Fast CC/CV with intelligent BMS sync"
      },
      {
        "key": "Efficiency",
        "value": ">92%"
      },
      {
        "key": "Operating Temperature",
        "value": "−10°C to 50°C"
      },
      {
        "key": "Cooling",
        "value": "Active thermal management with smart fan"
      },
      {
        "key": "Protections",
        "value": "Reverse-polarity, Short-circuit, Over-voltage, Over-temperature, Output overcurrent"
      },
      {
        "key": "Duty Cycle",
        "value": "Continuous operation"
      },
      {
        "key": "Noise Level",
        "value": "<50 dB"
      },
      {
        "key": "Dimensions (Approx.)",
        "value": "280 × 160 × 85 mm"
      },
      {
        "key": "Weight (Approx.)",
        "value": "3–4 kg"
      },
      {
        "key": "Enclosure",
        "value": "Powder-coated metal"
      },
      {
        "key": "Display",
        "value": "LED indicators + Optional LCD"
      },
      {
        "key": "Country of Origin",
        "value": "India"
      }
    ],
    "features": [
      "Fast CC/CV Charging – Rapid charging to 58.4V with BMS-aware taper for enhanced battery longevity",
      "Integrated RCD Protection – 30mA Type A on AC input for enhanced user safety in home environments",
      "CAN-Enabled Intelligence – Handshakes with 16S BMS to sync charge current/voltage, read SOC, temperatures, and alarms",
      "Real-Time BMS Communication – Monitors battery state and dynamically adjusts charging parameters",
      "Residential-Grade Protections – Robust thermal design and comprehensive safety features",
      "High Efficiency (>92%) – Minimizes energy waste and heat generation during fast charging",
      "Active Thermal Management – Smart fan control ensures optimal operating temperature",
      "Wide Operating Temperature – Functions reliably from −10°C to 50°C for diverse conditions",
      "Durable Enclosure – Powder-coated metal housing for home installations",
      "Continuous Operation Capable – Designed for daily home charging schedules",
      "Multiple Safety Layers – Reverse-polarity, short-circuit, over-voltage, over-temp, overcurrent protection",
      "Perfect for Home Solar Systems – Optimized for residential solar + battery storage",
      "Made in India – Engineered for Indian climate and usage patterns at OCS OORJA Labs, Lucknow",
      "5-Year Warranty – Extended warranty with India-wide support network"
    ],
    "applications": [
      "Large Home Power Backup Systems (80–150Ah)",
      "Residential Solar + Battery Storage",
      "Off-Grid Home Energy Systems",
      "Hybrid Solar Home Installations",
      "Home UPS Systems",
      "Villa and Bungalow Backup Power",
      "Multi-Story Home Energy Storage",
      "Residential Micro-Grid Systems"
    ],
    "details": "The OCS OORJA 51.2V 20A Smart Charger for Home Storage delivers fast, dependable charging for 80–150Ah LiFePO₄ battery packs in residential applications. Engineered with a sophisticated CC/CV charging algorithm that communicates with 16S BMS systems via CAN 2.0A/2.0B protocol, this charger synchronizes charge current and voltage while continuously monitoring SOC, cell temperatures, and battery alarms. The BMS-aware taper function ensures optimal charge completion without compromising battery longevity. Integrated 30mA Type A RCD protection on the AC input provides enhanced user safety in home environments. Residential-grade construction features robust thermal design with active smart fan control, enabling continuous operation for daily home charging schedules. High efficiency (>92%) minimizes energy costs and heat generation during fast charging sessions. The powder-coated metal enclosure is designed for clean home installations while operating across a wide temperature range (−10°C to 50°C). Comprehensive safety protections include reverse-polarity, short-circuit, over-voltage, over-temperature, and output overcurrent safeguards. Ideal for large home power backup systems, residential solar + battery storage, and off-grid home energy applications. Manufactured in India at OCS OORJA's Lucknow facility, backed by an extended 5-year warranty with India-wide support.",
    "dateAdded": "2025-10-17",
    "needsReview": true
  },
  {
    "id": "p-charger-51v-25a-home-rcd-can",
    "name": "OCS OORJA 51.2V 25A Smart Charger for Home Storage (RCD + CAN)",
    "slug": "ocs-oorja-51v-25a-smart-charger-home-storage",
    "family": "lifepo4-batteries",
    "series": "Battery Chargers",
    "image": "/images/products/ev-charger-erickshaw-new.jpeg",
    "summary": "High-capacity powerhouse for 100–200Ah LiFePO₄ home storage packs with advanced CAN control, residential protections, and smart thermal management—maximize energy independence.",
    "warranty": "60 Months (5 Years)",
    "tags": [
      "Charger",
      "High-Power",
      "Home Storage",
      "Smart",
      "LiFePO₄",
      "CAN",
      "Solar",
      "Made in India"
    ],
    "specs": [
      {
        "key": "Model",
        "value": "OCS OORJA SC-51.2V-25A-HS"
      },
      {
        "key": "Output Voltage",
        "value": "51.2V (Nominal)"
      },
      {
        "key": "Charging Voltage (CV)",
        "value": "58.4V"
      },
      {
        "key": "Rated Current",
        "value": "25A"
      },
      {
        "key": "Current Limit Control",
        "value": "Selectable via CAN"
      },
      {
        "key": "Charging Profile",
        "value": "High-current CC/CV with intelligent taper"
      },
      {
        "key": "Battery Chemistry",
        "value": "LiFePO₄ (16S Configuration)"
      },
      {
        "key": "Recommended Capacity Range",
        "value": "100–200Ah"
      },
      {
        "key": "AC Input Voltage",
        "value": "180–265VAC"
      },
      {
        "key": "AC Input Frequency",
        "value": "50/60Hz"
      },
      {
        "key": "Power Rating",
        "value": "~1460W (at 58.4V × 25A)"
      },
      {
        "key": "RCD Protection",
        "value": "Built-in 30mA, Type A"
      },
      {
        "key": "CAN Communication",
        "value": "CAN 2.0A/2.0B with Telemetry"
      },
      {
        "key": "BMS Compatibility",
        "value": "Daly, Xiaoxiang, and other 16S LiFePO₄ BMS"
      },
      {
        "key": "Charging Algorithm",
        "value": "Advanced intelligent taper with CAN control"
      },
      {
        "key": "Efficiency",
        "value": ">93%"
      },
      {
        "key": "Operating Temperature",
        "value": "−10°C to 55°C"
      },
      {
        "key": "Cooling",
        "value": "Smart thermal management with dual fans"
      },
      {
        "key": "Protections",
        "value": "Residential-grade: Reverse-polarity, Short-circuit, Over-voltage, Over-temperature, Overcurrent"
      },
      {
        "key": "Duty Cycle",
        "value": "Continuous operation for home energy systems"
      },
      {
        "key": "Noise Level",
        "value": "<55 dB"
      },
      {
        "key": "Dimensions (Approx.)",
        "value": "320 × 180 × 95 mm"
      },
      {
        "key": "Weight (Approx.)",
        "value": "4.5–5.5 kg"
      },
      {
        "key": "Enclosure",
        "value": "Premium powder-coated metal with ventilation"
      },
      {
        "key": "Display & Interface",
        "value": "LED + Optional LCD with CAN telemetry"
      },
      {
        "key": "Country of Origin",
        "value": "India"
      }
    ],
    "features": [
      "High-Current CC/CV Charging – 25A output to 58.4V with intelligent taper for rapid, safe charging",
      "Selectable Current Limits via CAN – Programmable charge current for different battery capacities and conditions",
      "RCD Built-in – 30mA Type A for AC shock protection in residential installations",
      "Advanced CAN Control & Telemetry – Full CAN 2.0A/2.0B integration with Daly, Xiaoxiang, and other 16S LiFePO₄ BMS",
      "Real-Time Battery Monitoring – Reads SOC, cell voltages, temperatures, current, alarms, and health metrics",
      "Residential-Grade Protections – Comprehensive safeguards for continuous home operation",
      "Smart Thermal Management – Dual-fan active cooling with temperature-based speed control",
      "High Efficiency (>93%) – Minimal power loss and heat generation even at full 25A output",
      "Continuous Operation Rated – Engineered for 24/7 home energy storage systems",
      "Wide Operating Range – Functions reliably from −10°C to 55°C in all climates",
      "Premium Construction – Robust enclosure designed for residential installations",
      "Maximize Energy Independence – Fast charging enables better solar energy utilization",
      "Extended Battery Life – Intelligent algorithms extend battery lifespan through optimal charging",
      "Made in India – Engineered for Indian residential requirements at OCS OORJA Labs, Lucknow",
      "5-Year Warranty – Extended warranty with dedicated home user support network"
    ],
    "applications": [
      "Large-Capacity Home Energy Storage (100–200Ah)",
      "Premium Residential Solar + Battery Systems",
      "Off-Grid Home Power Solutions",
      "Villa and Luxury Home Backup",
      "Multi-Battery Home Energy Banks",
      "24/7 Home Energy Management",
      "Residential Micro-Grid Installations",
      "High-End Home UPS Systems",
      "Solar-First Home Energy Systems",
      "Whole-Home Backup Power"
    ],
    "details": "The OCS OORJA 51.2V 25A Smart Charger for Home Storage is a high-capacity powerhouse engineered for 100–200Ah LiFePO₄ battery packs in premium residential energy storage applications. Delivering up to 1460W of charging power with 25A output current, this residential-grade charger maximizes energy independence while ensuring battery longevity through intelligent BMS integration. Advanced CAN 2.0A/2.0B control and telemetry enable full communication with popular 16S BMS systems like Daly and Xiaoxiang, providing real-time monitoring of SOC, cell voltages, temperatures, current flow, alarms, and overall battery health. The charger can adjust charge parameters dynamically based on BMS feedback, with selectable current limits programmable via CAN for different battery capacities and charging scenarios. Built-in 30mA Type A RCD protection safeguards against AC shock hazards in home installations. Premium construction features powder-coated metal enclosure with smart dual-fan thermal management, enabling continuous operation even in high ambient temperatures up to 55°C. High efficiency (>93%) ensures minimal energy waste and reduced electricity costs for homeowners. Comprehensive protection suite includes reverse-polarity, short-circuit, over-voltage, over-temperature, and overcurrent safeguards engineered for 24/7 reliability in home environments. Perfect for large-capacity home energy storage, premium residential solar + battery systems, off-grid home power solutions, and whole-home backup applications. Ideal for homeowners seeking maximum energy independence and solar utilization. Manufactured in India at OCS OORJA's Lucknow facility with deep understanding of Indian residential requirements, backed by an extended 5-year warranty with dedicated home user support.",
    "dateAdded": "2025-10-17",
    "needsReview": true
  }
];
