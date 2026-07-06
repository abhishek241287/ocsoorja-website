import type { Product } from "./types";

// Hybrid Solar Inverters
// To add or edit a product in this family, copy an entry below and change the
// values. Product photos go in public/images/products/hybrid-solar-inverters/ and brochures/
// datasheets in public/downloads/. Editing here updates the whole site.

export const hybridSolarInverters: Product[] = [
  {
    "id": "p-mppt-inverter-12v-1600w",
    "name": "OCS OORJA SOLAR INVERTER 12V 1600W",
    "slug": "mppt-solar-inverter-12v-1600w",
    "family": "hybrid-solar-inverters",
    "series": "MPPT Hybrid Series",
    "image": "/images/products/solar-inverter-12v.jpeg",
    "summary": "Advanced hybrid solar inverter with MPPT charge controller, AC + PV inputs, pure sine wave output, and intelligent battery management. Supports up to 2000W solar input with 94% peak efficiency.",
    "warranty": "24 Months",
    "tags": [
      "Inverter",
      "Hybrid",
      "MPPT",
      "Solar",
      "12V",
      "Made in India"
    ],
    "specs": [
      {
        "key": "Model",
        "value": "OCS OORJA MPPT-1600-12V"
      },
      {
        "key": "Rated Power",
        "value": "1600W"
      },
      {
        "key": "Peak Power",
        "value": "3200VA"
      },
      {
        "key": "AC Input Voltage",
        "value": "240VAC"
      },
      {
        "key": "Input Voltage Range (Normal)",
        "value": "90–280VAC ±3V"
      },
      {
        "key": "Input Voltage Range (UPS)",
        "value": "185–264VAC ±3V"
      },
      {
        "key": "Input Frequency",
        "value": "50/60Hz (Auto-sensing)"
      },
      {
        "key": "Output Voltage",
        "value": "208/220/230/240VAC ±5% (Selectable)"
      },
      {
        "key": "Output Frequency",
        "value": "50/60Hz ±0.1%"
      },
      {
        "key": "Waveform",
        "value": "Pure Sine Wave"
      },
      {
        "key": "Transfer Time",
        "value": "10ms (Computer Mode) / 20ms (Appliance Mode)"
      },
      {
        "key": "Peak Efficiency",
        "value": ">94% (Battery Mode)"
      },
      {
        "key": "Battery Voltage",
        "value": "12VDC (12.8V LiFePO₄ Compatible)"
      },
      {
        "key": "Charging Type",
        "value": "3-Stage (Bulk/Absorb/Float)"
      },
      {
        "key": "Constant Charge Voltage",
        "value": "14.1VDC"
      },
      {
        "key": "Float Charge Voltage",
        "value": "13.5VDC"
      },
      {
        "key": "Max AC Charge Current",
        "value": "60A"
      },
      {
        "key": "Solar Input (PV)",
        "value": "MPPT, Max 2000W"
      },
      {
        "key": "MPPT Voltage Range",
        "value": "40–500VDC"
      },
      {
        "key": "Max PV Open Circuit Voltage",
        "value": "500VDC"
      },
      {
        "key": "Max Solar Charge Current",
        "value": "100A"
      },
      {
        "key": "Max Total Charge Current",
        "value": "100A (AC+Solar Combined)"
      },
      {
        "key": "MPPT Efficiency",
        "value": ">98%"
      },
      {
        "key": "Display",
        "value": "LCD with Real-time Monitoring"
      },
      {
        "key": "Communication",
        "value": "RS232 (5-pin, 2.54mm pitch)"
      },
      {
        "key": "Expansion Port",
        "value": "BMS / WiFi Module Support"
      },
      {
        "key": "Parallel Operation",
        "value": "Not Supported"
      },
      {
        "key": "Operating Temperature",
        "value": "0°C to 40°C"
      },
      {
        "key": "Storage Temperature",
        "value": "−15°C to 60°C"
      },
      {
        "key": "Humidity",
        "value": "5–95% (Non-condensing)"
      },
      {
        "key": "Cooling",
        "value": "Smart Fan (Temperature Controlled)"
      },
      {
        "key": "Audible Noise",
        "value": "<50 dB"
      },
      {
        "key": "Protection Rating",
        "value": "IP20 (Indoor Use)"
      },
      {
        "key": "Dimensions (W×H×D)",
        "value": "Approx. 340 × 220 × 95 mm"
      },
      {
        "key": "Weight",
        "value": "Approx. 5–6 kg"
      },
      {
        "key": "Country of Origin",
        "value": "India"
      }
    ],
    "features": [
      "Hybrid AC + Solar Operation – Seamlessly switches between grid, solar, and battery power",
      "Advanced MPPT Technology – 98% efficient solar charge controller with 40–500VDC tracking range",
      "High Solar Input Capacity – Supports up to 2000W solar panels with 100A charging current",
      "Pure Sine Wave Output – Clean power for sensitive electronics and appliances",
      "Fast UPS Transfer – 10ms for computers, 20ms for household appliances",
      "High Efficiency – >94% conversion efficiency in battery mode",
      "3-Stage Intelligent Charging – Bulk, Absorb, Float for optimal battery health",
      "LiFePO₄ Battery Compatible – Works perfectly with OCS OORJA 12.8V batteries",
      "Dual Charging Sources – Combines AC and solar charging up to 100A total",
      "Smart LCD Display – Real-time monitoring of voltage, current, power, and status",
      "Wide Input Voltage Range – Operates from 90–280VAC in normal mode",
      "Selectable Output Voltage – 208/220/230/240VAC for different regions",
      "RS232 Communication Port – For remote monitoring and control",
      "BMS/WiFi Expansion Ready – Optional modules for advanced monitoring",
      "Multiple Protection Features – Overload, short circuit, over-temperature, over/under voltage",
      "Temperature-Controlled Fan – Smart cooling for quiet operation",
      "Compact Design – Space-saving form factor for easy installation",
      "Made in India – Engineered and tested at OCS OORJA Labs, Lucknow"
    ],
    "applications": [
      "Off-Grid Solar Home Systems",
      "Hybrid Solar Installations with Grid Backup",
      "Home Power Backup with Solar Integration",
      "Small Office and Business Solar Systems",
      "Remote Locations with Solar Power",
      "Solar Water Pump Systems",
      "Telecommunications Tower Backup",
      "Rural Electrification Projects",
      "Emergency Power Systems",
      "Solar-Powered Workshops and Studios"
    ],
    "details": "The OCS OORJA MPPT Solar Hybrid Inverter is an advanced power management solution that seamlessly integrates solar energy, grid power, and battery storage. Engineered and manufactured in India, this 1600W pure sine wave inverter features a high-efficiency MPPT charge controller capable of handling up to 2000W of solar input with 98% MPPT efficiency. The intelligent 3-stage charging algorithm ensures optimal battery health and longevity, making it perfect for use with OCS OORJA LiFePO₄ batteries. With dual charging capability (AC + Solar), the system can deliver up to 100A combined charging current for rapid battery replenishment. The wide MPPT voltage range (40–500VDC) provides flexibility in solar panel configuration, while the adjustable transfer time (10ms/20ms) ensures uninterrupted power for both sensitive electronics and household appliances. The built-in LCD display provides real-time monitoring, and optional RS232 connectivity enables remote management. Comprehensive protection features including overload, short circuit, and temperature safeguards ensure safe and reliable operation. Ideal for homes, small businesses, and off-grid applications seeking to maximize solar energy utilization while maintaining grid backup capability. Designed for Indian climate conditions and backed by OCS OORJA's quality assurance from our Lucknow facility.",
    "dateAdded": "2025-10-14"
  },
  {
    "id": "p-solar-hybrid-24v-3p5kw",
    "name": "Solar Hybrid Inverter 24V 4.2kW",
    "slug": "solar-hybrid-inverter-24v-3-5kw",
    "family": "hybrid-solar-inverters",
    "series": "Solar Hybrid Series",
    "image": "/images/products/solar-inverter-12v.jpeg",
    "summary": "Hybrid inverter for 24V systems with PV charging and grid/generator support.",
    "warranty": "Warranty details on request",
    "tags": [
      "Inverter",
      "Hybrid",
      "Solar"
    ],
    "specs": [
      {
        "key": "Battery Input",
        "value": "24V"
      },
      {
        "key": "Rated Power",
        "value": "4.2kW"
      },
      {
        "key": "PV",
        "value": "MPPT solar charging"
      },
      {
        "key": "Mode",
        "value": "Hybrid (PV + Grid + Battery)"
      }
    ],
    "dateAdded": "2024-06-15"
  },
  {
    "id": "p-solar-hybrid-48v-6kw",
    "name": "Solar Hybrid Inverter 48V 6kW",
    "slug": "solar-hybrid-inverter-48v-6kw",
    "family": "hybrid-solar-inverters",
    "series": "Solar Hybrid Series",
    "image": "/images/products/hybrid-solar-inverters/hybrid-solar-inverters-solar-hybrid-48v-6kw-front.png",
    "summary": "High‑power 48V hybrid inverter for residential and small C&I.",
    "warranty": "Warranty details on request",
    "tags": [
      "Inverter",
      "Hybrid",
      "Solar"
    ],
    "specs": [
      {
        "key": "Battery Input",
        "value": "48V"
      },
      {
        "key": "Rated Power",
        "value": "6kW"
      },
      {
        "key": "PV",
        "value": "MPPT solar charging"
      },
      {
        "key": "Mode",
        "value": "Hybrid (PV + Grid + Battery)"
      }
    ],
    "dateAdded": "2024-06-22"
  },
  // --- Placeholders: awaiting real photography, specs, and downloads ---
  {
    "id": "p-hybrid-solar-8kw",
    "name": "Hybrid Solar Inverter 8kW",
    "slug": "hybrid-solar-inverter-8kw",
    "family": "hybrid-solar-inverters",
    "series": "Solar Hybrid Series",
    "image": "/images/placeholder.svg",
    "summary": "Placeholder listing — full specifications, photography, and downloads coming soon.",
    "warranty": "Warranty details on request",
    "tags": [
      "Inverter",
      "Hybrid",
      "Solar"
    ],
    "specs": [
      {
        "key": "Rated Power",
        "value": "8kW"
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
    "id": "p-hybrid-solar-11kw",
    "name": "Hybrid Solar Inverter 11kW",
    "slug": "hybrid-solar-inverter-11kw",
    "family": "hybrid-solar-inverters",
    "series": "Solar Hybrid Series",
    "image": "/images/placeholder.svg",
    "summary": "Placeholder listing — full specifications, photography, and downloads coming soon.",
    "warranty": "Warranty details on request",
    "tags": [
      "Inverter",
      "Hybrid",
      "Solar"
    ],
    "specs": [
      {
        "key": "Rated Power",
        "value": "11kW"
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
