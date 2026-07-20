import type { Product } from "./types";

// LiFePO₄ Battery Systems
// To add or edit a product in this family, copy an entry below and change the
// values. Product photos go in public/images/products/lifepo4-batteries/ and brochures/
// datasheets in public/downloads/. Editing here updates the whole site.

export const lifepo4Batteries: Product[] = [
  {
    "id": "p-home-12v-100ah",
    "name": "OCS OORJA 12.8V 100Ah LiFePO₄ Battery",
    "slug": "12v-100ah-home-power-storage",
    "family": "lifepo4-batteries",
    "series": "Home Power Storage",
    "image": "/images/products/lithium-12v8-100ah-new.jpeg",
    "summary": "High-efficiency LiFePO₄ battery pack engineered for solar and inverter applications with advanced Grade-A prismatic cells and intelligent BMS. Delivers up to 5000 cycles and 99% energy efficiency.",
    "warranty": "60 Months (5 Years)",
    "tags": [
      "Home Storage",
      "LFP",
      "Solar",
      "Made in India"
    ],
    "specs": [
      { "key": "Model Name", "value": "OORJA-LFP-12V100" },
      { "key": "Nominal Voltage", "value": "12.8V" },
      { "key": "Nominal Capacity", "value": "100Ah" },
      { "key": "Energy", "value": "1280Wh (1.28kWh)" },
      { "key": "Battery Type", "value": "LiFePO₄ (Lithium Iron Phosphate)" },
      { "key": "Cell Configuration", "value": "4S Prismatic" },
      { "key": "Cycle Life (@80% DoD)", "value": "≥5000 Cycles" },
      { "key": "Continuous Discharge Current", "value": "60A" },
      { "key": "Peak Discharge Current (10s)", "value": "100A" },
      { "key": "Recommended Charging Current", "value": "≤40A" },
      { "key": "Full-Charge Voltage (CV)", "value": "14.6V" },
      { "key": "Discharge Cut-off Voltage", "value": "10.8V" },
      { "key": "Efficiency", "value": "≥98%" },
      { "key": "Operating Temp (Charge)", "value": "0°C to 60°C" },
      { "key": "Operating Temp (Discharge)", "value": "−10°C to 65°C" },
      { "key": "Dimensions (Approx.)", "value": "31 × 41.5 × 16.5 cm" },
      { "key": "Weight (Approx.)", "value": "13–15 kg" },
      { "key": "Enclosure Type", "value": "Powder-Coated MS / Aluminum" },
      { "key": "Protection Rating", "value": "IP65 (Optional IP67)" },
      { "key": "Communication", "value": "Optional RS485 / UART / CAN" },
      { "key": "Country of Origin", "value": "India" }
    ],
    "features": [
      "High-Performance LiFePO₄ Chemistry – Safe, stable, and long-lasting energy storage",
      "High Efficiency (≥98%) – Minimum power loss during charge and discharge",
      "Smart BMS Protection – Safeguards against overcharge, over-discharge, over-current, and short circuits",
      "Wide Temperature Range – Reliable operation from 0°C to +60°C (charge) and −10°C to +65°C (discharge)",
      "Solar-Compatible – Ideal for hybrid and off-grid solar setups",
      "Compact & Lightweight Design – 60% lighter than equivalent lead-acid models",
      "Zero Maintenance – No water topping or acid spillage",
      "Long Life >5000 Cycles @ 80% DoD – extended service life",
      "Engineered with automotive-grade A+ LiFePO₄ cells",
      "Designed for Indian climate conditions (0°C to 60°C charge, −10°C to 65°C discharge)",
      "Plug-and-Play replacement for lead-acid batteries",
      "Optional RFID, QR & Cloud-based warranty registration"
    ],
    "applications": [
      "Home & Office Inverter Systems",
      "Hybrid / Off-Grid Solar Power Systems",
      "Portable Power Units & UPS Systems",
      "Emergency backup power",
      "Small business power backup"
    ],
    "details": "Experience next-generation power backup with OCS OORJA LiFePO₄ Battery Pack, engineered for high-efficiency solar and inverter applications. Designed and assembled in India at OCS OORJA Green Private Limited with advanced Grade-A prismatic LiFePO₄ cells and an intelligent BMS (Battery Management System). This battery delivers up to 5000 charge–discharge cycles and 99% energy efficiency. Perfect for home inverters, solar hybrid systems, offering lightweight design, zero maintenance, deep-discharge capability, and long lifespan — making it a sustainable replacement for lead-acid batteries. QC-tested at OCS OORJA Labs, Lucknow.",
    "dateAdded": "2024-01-15"
  },
  {
    "id": "p-home-24v-100ah",
    "name": "OCS OORJA 25.6V 100Ah LiFePO₄ Battery",
    "slug": "24v-100ah-home-power-storage",
    "family": "lifepo4-batteries",
    "series": "Home Power Storage",
    "image": "/images/products/lithium-25v6-100ah-new.jpeg",
    "summary": "High-capacity 24V-class LiFePO₄ battery pack for larger home backup and solar hybrid systems with advanced Grade-A prismatic cells. Delivers up to 5000 cycles and 99% energy efficiency.",
    "warranty": "60 Months (5 Years)",
    "tags": [
      "Home Storage",
      "Solar",
      "LFP",
      "Made in India"
    ],
    "specs": [
      { "key": "Model Name", "value": "OORJA-LFP-24V100" },
      { "key": "Nominal Voltage", "value": "25.6V" },
      { "key": "Nominal Capacity", "value": "100Ah" },
      { "key": "Energy", "value": "2560Wh (2.56kWh)" },
      { "key": "Battery Type", "value": "LiFePO₄ (Lithium Iron Phosphate)" },
      { "key": "Cell Configuration", "value": "8S Prismatic" },
      { "key": "Cycle Life (@80% DoD)", "value": "≥5000 Cycles" },
      { "key": "Continuous Discharge Current", "value": "80A" },
      { "key": "Peak Discharge Current (10s)", "value": "150A" },
      { "key": "Recommended Charging Current", "value": "≤50A" },
      { "key": "Full-Charge Voltage (CV)", "value": "29.2V" },
      { "key": "Discharge Cut-off Voltage", "value": "21.6V" },
      { "key": "Efficiency", "value": "≥98%" },
      { "key": "Operating Temp (Charge)", "value": "0°C to 60°C" },
      { "key": "Operating Temp (Discharge)", "value": "−10°C to 65°C" },
      { "key": "Dimensions (Approx.)", "value": "33 × 43 × 18 cm" },
      { "key": "Gross Weight", "value": "45 kg" },
      { "key": "Enclosure Type", "value": "Powder-Coated MS / Aluminum" },
      { "key": "Protection Rating", "value": "IP65 (Optional IP67)" },
      { "key": "Communication", "value": "Optional RS485 / UART / CAN" },
      { "key": "Country of Origin", "value": "India" }
    ],
    "features": [
      "High-Performance LiFePO₄ Chemistry – Safe, stable, and long-lasting energy storage",
      "High Efficiency (≥98%) – Minimum power loss during charge and discharge",
      "Smart BMS Protection – Safeguards against overcharge, over-discharge, over-current, and short circuits",
      "Wide Temperature Range – Reliable operation from 0°C to +60°C (charge) and −10°C to +65°C (discharge)",
      "Solar-Compatible – Ideal for hybrid and off-grid solar setups",
      "Compact & Lightweight Design – 60% lighter than equivalent lead-acid models",
      "Zero Maintenance – No water topping or acid spillage",
      "Long Life >5000 Cycles @ 80% DoD – extended service life",
      "Engineered with automotive-grade A+ LiFePO₄ cells",
      "Designed for Indian climate conditions (0°C to 60°C charge, −10°C to 65°C discharge)",
      "Plug-and-Play replacement for lead-acid batteries",
      "Optional RFID, QR & Cloud-based warranty registration"
    ],
    "applications": [
      "Home & Office Inverter Systems",
      "Hybrid / Off-Grid Solar Power Systems",
      "Telecom Towers & Data Backups",
      "Portable Power Units & UPS Systems",
      "Medium business power backup"
    ],
    "details": "Experience next-generation power backup with OCS OORJA LiFePO₄ Battery Pack, engineered for high-efficiency solar and inverter applications. Designed and assembled in India at OCS OORJA Green Private Limited with advanced Grade-A prismatic LiFePO₄ cells and an intelligent BMS (Battery Management System). This 24V-class battery delivers up to 5000 charge–discharge cycles and 99% energy efficiency. Perfect for larger home inverters, solar hybrid systems, and commercial applications, offering lightweight design, zero maintenance, deep-discharge capability, and long lifespan — making it a sustainable replacement for lead-acid batteries. QC-tested at OCS OORJA Labs, Lucknow.",
    "dateAdded": "2024-02-20"
  },
  {
    "id": "p-erickshaw-51v2-100ah",
    "name": "OCS OORJA 51.2V 105Ah LiFePO₄ Battery",
    "slug": "e-rickshaw-51v2-100ah",
    "family": "lifepo4-batteries",
    "series": "E-Rickshaw Traction",
    "image": "/images/products/e-rickshaw-48v-120ah.svg",
    "summary": "High-power 48V-class LiFePO₄ battery pack engineered for e-rickshaw duty cycles, EV swap stations, and industrial applications with advanced Grade-A prismatic cells. Delivers up to 5000 cycles and 99% energy efficiency.",
    "warranty": "36 Months (3 Years)",
    "tags": [
      "EV",
      "E‑Rickshaw",
      "LFP",
      "Made in India",
      "Solar"
    ],
    "specs": [
      { "key": "Model Name", "value": "OORJA-LFP-48V105" },
      { "key": "Nominal Voltage", "value": "51.2V" },
      { "key": "Nominal Capacity", "value": "105Ah" },
      { "key": "Energy", "value": "5120Wh (5.12kWh)" },
      { "key": "Battery Type", "value": "LiFePO₄ (Lithium Iron Phosphate)" },
      { "key": "Cell Configuration", "value": "16S Prismatic" },
      { "key": "Cycle Life (@80% DoD)", "value": "≥5000 Cycles" },
      { "key": "Continuous Discharge Current", "value": "100A" },
      { "key": "Peak Discharge Current (10s)", "value": "200A" },
      { "key": "Recommended Charging Current", "value": "≤60A" },
      { "key": "Full-Charge Voltage (CV)", "value": "58.4V" },
      { "key": "Discharge Cut-off Voltage", "value": "43.2V" },
      { "key": "Efficiency", "value": "≥98%" },
      { "key": "Operating Temp (Charge)", "value": "0°C to 60°C" },
      { "key": "Operating Temp (Discharge)", "value": "−10°C to 65°C" },
      { "key": "Dimensions (Approx.)", "value": "42 × 47 × 21 cm" },
      { "key": "Gross Weight", "value": "45 kg" },
      { "key": "Enclosure Type", "value": "Powder-Coated MS / Aluminum" },
      { "key": "Protection Rating", "value": "IP65 (Optional IP67)" },
      { "key": "Communication", "value": "Optional RS485 / UART / CAN" },
      { "key": "Country of Origin", "value": "India" }
    ],
    "features": [
      "High-Performance LiFePO₄ Chemistry – Safe, stable, and long-lasting energy storage",
      "High Efficiency (≥98%) – Minimum power loss during charge and discharge",
      "Smart BMS Protection – Safeguards against overcharge, over-discharge, over-current, and short circuits",
      "Wide Temperature Range – Reliable operation from 0°C to +60°C (charge) and −10°C to +65°C (discharge)",
      "Solar-Compatible – Ideal for hybrid and off-grid solar setups",
      "Compact & Lightweight Design – 60% lighter than equivalent lead-acid models",
      "Zero Maintenance – No water topping or acid spillage",
      "Long Life >5000 Cycles @ 80% DoD – extended service life",
      "Engineered with automotive-grade A+ LiFePO₄ cells",
      "Designed for Indian climate conditions (0°C to 60°C charge, −10°C to 65°C discharge)",
      "High discharge current capability for demanding EV applications",
      "Optional RFID, QR & Cloud-based warranty registration"
    ],
    "applications": [
      "E-Rickshaw / EV Swap Stations",
      "Hybrid / Off-Grid Solar Power Systems",
      "Telecom Towers & Data Backups",
      "Portable Power Units & UPS Systems",
      "Industrial power backup",
      "Large commercial installations"
    ],
    "details": "Experience next-generation power backup with OCS OORJA LiFePO₄ Battery Pack, engineered for high-efficiency solar, inverter, and electric vehicle applications. Designed and assembled in India at OCS OORJA Green Private Limited with advanced Grade-A prismatic LiFePO₄ cells and an intelligent BMS (Battery Management System). This high-capacity 48V-class battery delivers up to 5000 charge–discharge cycles and 99% energy efficiency. Perfect for e-rickshaw applications, EV swap stations, solar hybrid systems, and industrial power backup, offering lightweight design, zero maintenance, deep-discharge capability, and long lifespan — making it a sustainable replacement for lead-acid batteries. QC-tested at OCS OORJA Labs, Lucknow.",
    "dateAdded": "2024-03-10",
    "awaiting": ["images"]
  },
  {
    "id": "p-ebike-60v-20ah",
    "name": "E‑Bike 60V 20Ah",
    "slug": "e-bike-60v-20ah",
    "family": "lifepo4-batteries",
    "series": "E-Mobility Packs (NMC)",
    "image": "/images/products/lifepo4-batteries/ebike-lifepo4-battery.png",
    "summary": "Lightweight 60V 20Ah pack for two‑wheelers, tuned for daily commuting.",
    "warranty": "Warranty details on request",
    "tags": ["EV", "E‑Bike", "NMC"],
    "specs": [
      { "key": "Nominal Voltage", "value": "60V" },
      { "key": "Capacity", "value": "20Ah" },
      { "key": "Chemistry", "value": "NMC" },
      { "key": "BMS", "value": "Smart protections" }
    ],
    "dateAdded": "2023-01-15",
    "awaiting": ["images", "specs"],
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
    "tags": ["EV", "E‑Bike", "NMC"],
    "specs": [
      { "key": "Nominal Voltage", "value": "60V" },
      { "key": "Capacity", "value": "30Ah" },
      { "key": "Chemistry", "value": "NMC" },
      { "key": "BMS", "value": "Smart protections" }
    ],
    "dateAdded": "2023-01-10",
    "awaiting": ["images", "specs"],
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
    "tags": ["EV", "E‑Bike", "NMC"],
    "specs": [
      { "key": "Nominal Voltage", "value": "60V" },
      { "key": "Capacity", "value": "35Ah" },
      { "key": "Chemistry", "value": "NMC" },
      { "key": "BMS", "value": "Smart protections" }
    ],
    "dateAdded": "2023-01-05",
    "awaiting": ["images", "specs"],
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
    "tags": ["EV", "E‑Bike", "NMC"],
    "specs": [
      { "key": "Nominal Voltage", "value": "60V" },
      { "key": "Capacity", "value": "40Ah" },
      { "key": "Chemistry", "value": "NMC" },
      { "key": "BMS", "value": "Smart protections" }
    ],
    "dateAdded": "2023-01-01",
    "awaiting": ["images", "specs"],
    "needsReview": true
  }
];
