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
    "name": "OCS OORJA BESS 100 kWh (Commercial & Industrial)",
    "slug": "bess-100kwh-commercial",
    "family": "bess",
    "series": "Commercial & Industrial BESS",
    "image": "/images/products/bess/bess-100kwh-commercial.png",
    "images": [
      "/images/products/bess/bess-100kwh-commercial.png"
    ],
    "summary": "Fully customised 100 kWh+ LiFePO₄ battery energy storage system for commercial, industrial, and utility applications. Designed and built to your site's load profile, grid configuration, and integration requirements.",
    "warranty": "As per project contract (typically 5–10 years)",
    "tags": [
      "BESS",
      "C&I",
      "LFP",
      "Made in India",
      "Customised"
    ],
    "specs": [
      { "key": "Usable Energy", "value": "100 kWh (scalable; custom capacity available)" },
      { "key": "Cell Chemistry", "value": "LiFePO₄ (Lithium Iron Phosphate)" },
      { "key": "System Voltage", "value": "As per project requirement (48V – 800V DC bus)" },
      { "key": "Charge / Discharge Power", "value": "Configurable — 50 kW to 500 kW+ (C-rate matched to load)" },
      { "key": "Cycle Life", "value": ">6000 Times @80% DoD, 25°C" },
      { "key": "Communication", "value": "RS-485 / CAN / Modbus TCP / Ethernet (EMS ready)" },
      { "key": "Protection Rating", "value": "IP54 standard (IP65 outdoor optional)" },
      { "key": "Cooling", "value": "Forced-air / liquid cooling (project dependent)" },
      { "key": "Safety", "value": "Emergency stop, multi-level BMS, arc-flash protection" },
      { "key": "Grid Integration", "value": "On-grid, off-grid, and microgrid configurations" },
      { "key": "Certifications", "value": "As per project scope (IEC / IS / BIS applicable standards)" },
      { "key": "Warranty", "value": "As per project contract (typically 5–10 years)" }
    ],
    "features": [
      "Fully Customised Design – Engineered to your specific load profile, site constraints, and grid topology",
      "Scalable Capacity – Modular architecture from 50 kWh to multiple MWh; grow as your needs expand",
      "LiFePO₄ Chemistry – Safest lithium chemistry; no thermal runaway risk, suitable for indoor and outdoor installation",
      ">6000 Cycle Life – Decades of daily cycling with no capacity degradation warranty",
      "Intelligent Multi-Level BMS – Cell-level monitoring, balancing, and fault isolation with EMS connectivity",
      "Touchscreen HMI Control Panel – Real-time system status, alarms, and remote monitoring from a single screen",
      "Emergency Stop & Arc-Flash Protection – IEC-compliant safety interlocks for commercial and industrial sites",
      "Grid & Microgrid Ready – Supports peak shaving, demand response, solar self-consumption, and islanding",
      "Remote Monitoring & SCADA Integration – RS-485, Modbus TCP, CAN, and Ethernet interfaces as standard",
      "IP54+ Enclosure – Heavy-duty steel cabinet rated for industrial environments; IP65 outdoor option available",
      "Project Management Support – OCS OORJA provides design, supply, installation supervision, and commissioning",
      "Make in India – Designed, integrated, and quality-tested at OCS OORJA Labs, Lucknow"
    ],
    "applications": [
      "Commercial & Industrial Peak Shaving",
      "Solar + Storage Hybrid Plants",
      "Captive Power & Demand Response",
      "EV Charging Hub Energy Buffer",
      "Microgrid & Islanding Systems",
      "Telecom & Data Centre Backup",
      "Agricultural Cold Chain & Irrigation",
      "Government & Municipal Utilities"
    ],
    "details": "The OCS OORJA Commercial BESS is not an off-the-shelf product — it is an engineered solution. Every installation begins with a detailed load study and grid analysis, from which our engineering team specifies the optimal cell count, DC bus voltage, inverter pairing, and thermal management strategy. The system ships as a fully assembled, factory-tested cabinet (or multi-cabinet array for larger capacities), complete with a touchscreen HMI, emergency stop, multi-level BMS, and all communications pre-wired. Integration with your existing SCADA, EMS, or solar inverter platform is handled via RS-485, Modbus TCP, CAN, or Ethernet — whichever your control system requires. Capacity starts at 100 kWh and scales to multiple MWh through modular cabinet stacking with no re-engineering. Common deployment modes include solar self-consumption maximisation, utility peak-shaving, captive power arbitrage, and off-grid microgrid with automatic transfer switching. To receive a technical proposal and indicative pricing, contact our project team with your site load data.",
    "dateAdded": "2026-07-20"
  }
];
