import type { Product } from "./types";

// E-Rickshaw Chargers
// To add or edit a product in this family, copy an entry below and change the
// values. Product photos go in public/images/products/e-rickshaw-chargers/ and brochures/
// datasheets in public/downloads/. Editing here updates the whole site.

export const eRickshawChargers: Product[] = [
  {
    "id": "p-erickshaw-battery-51v2",
    "name": "OCS OORJA 51.2V 100Ah LiFePO₄ Battery",
    "slug": "e-rickshaw-battery-51v2-100ah",
    "family": "e-rickshaw-chargers",
    "series": "E-Rickshaw Traction Battery",
    "image": "/images/products/e-rickshaw-chargers/erickshaw-lifepo4-battery.png",
    "images": [
      "/images/products/e-rickshaw-chargers/erickshaw-lifepo4-battery.png"
    ],
    "summary": "51.2V 100Ah (5.1 kWh) LiFePO₄ traction battery engineered for e-rickshaws and EV swap stations. 16S prismatic cells, 100A continuous discharge, RS-485/CAN communication, and >5000 cycles at 80% DoD.",
    "warranty": "36 Months (3 Years)",
    "tags": [
      "Battery",
      "E‑Rickshaw",
      "LFP",
      "51.2V",
      "Made in India"
    ],
    "specs": [
      { "key": "Array Mode", "value": "16S" },
      { "key": "Nominal Energy", "value": "5.1 kWh" },
      { "key": "Nominal Voltage", "value": "51.2V" },
      { "key": "Charge Voltage", "value": "58.4V" },
      { "key": "Discharge Cut-off Voltage", "value": "42V" },
      { "key": "Max Continuous Charging Current", "value": "100A" },
      { "key": "Max Continuous Discharging Current", "value": "100A" },
      { "key": "Cycle Life", "value": ">5000 Times @80% DoD, 25°C" },
      { "key": "Communication Mode", "value": "RS-485 / CAN" },
      { "key": "Operating Temperature (Charge)", "value": "0°C – 60°C" },
      { "key": "Operating Temperature (Discharge)", "value": "−10°C – 65°C" },
      { "key": "Gross Weight", "value": "45 kg" }
    ],
    "features": [
      "16S LiFePO₄ Prismatic Cells – Grade-A cells for high power density and long cycle life",
      "5.1 kWh Usable Energy – Ample capacity for full-day e-rickshaw operation",
      "100A Continuous Charge & Discharge – Handles rapid charging and heavy acceleration loads",
      ">5000 Cycle Life @80% DoD – Over 10 years of daily cycling at 25°C",
      "RS-485 / CAN Communication – Smart BMS integration for real-time SOC, temperature, and fault monitoring",
      "Wide Operating Temperature – Charges 0–60°C, discharges −10 to 65°C for all Indian seasons",
      "Smart BMS Protection – Guards against overcharge, over-discharge, over-current, and short circuits",
      "Zero Maintenance – No water topping, no acid fumes, safe for enclosed spaces",
      "Compact Flat-Pack Design – Easy under-seat or chassis installation in e-rickshaws",
      "Drop-in Replacement – Compatible with standard 48V lead-acid e-rickshaw battery bays",
      "3-Year Warranty – Backed by OCS OORJA's India-wide service network"
    ],
    "applications": [
      "E-Rickshaw Traction",
      "EV Battery Swap Stations",
      "Electric Cargo Vehicles",
      "Solar Hybrid Power Systems",
      "Telecom Tower Backup",
      "Industrial UPS & Power Backup"
    ],
    "details": "The OCS OORJA 51.2V 100Ah LiFePO₄ Battery is a purpose-built traction pack for e-rickshaws and light electric vehicles. Configured in a 16S prismatic cell arrangement, it delivers 5.1 kWh of nominal energy with 100A continuous charge and discharge capability — enough for a full day of operation on a single overnight charge. The built-in RS-485/CAN communication interface allows the BMS to exchange real-time data with chargers and vehicle controllers, enabling accurate SOC display, temperature monitoring, and fault protection. With more than 5000 cycles at 80% depth-of-discharge (tested at 25°C), this battery outlasts conventional lead-acid packs by 3–5× while eliminating the maintenance burden of watering and equalisation. Designed and quality-checked at OCS OORJA Labs, Lucknow, and backed by a 3-year warranty.",
    "dateAdded": "2026-07-20"
  },
  {
    "id": "p-ev-charger-erickshaw",
    "name": "EV Charger for E‑Rickshaw Battery",
    "slug": "ev-charger-e-rickshaw",
    "family": "e-rickshaw-chargers",
    "series": "E-Rickshaw Charger Series",
    "image": "/images/products/ev-charger-erickshaw-new.jpeg",
    "summary": "Dedicated smart charger tailored for e‑rickshaw battery packs.",
    "warranty": "36 Months (3 Years)",
    "tags": [
      "Charger",
      "E‑Rickshaw",
      "EV"
    ],
    "specs": [
      {
        "key": "Voltage Range",
        "value": "48–60V packs"
      },
      {
        "key": "Charging",
        "value": "Smart CC/CV"
      },
      {
        "key": "Safety",
        "value": "OVP/OTP/Short‑circuit protections"
      },
      {
        "key": "Compatibility",
        "value": "Lithium with BMS"
      }
    ],
    "dateAdded": "2024-07-08"
  },
  {
    "id": "p-charger-51v-7a-rcd-can",
    "name": "OCS OORJA 51.2V 7A Smart Charger for E-Rickshaw (RCD + CAN)",
    "slug": "ocs-oorja-51v-7a-smart-charger",
    "family": "e-rickshaw-chargers",
    "series": "51.2V Smart Charger Series",
    "image": "/images/products/ev-charger-erickshaw-new.jpeg",
    "summary": "Compact, silent, and battery-friendly smart charger ideal for 40–120Ah LiFePO₄ packs with built-in RCD protection and optional CAN communication for overnight charging.",
    "warranty": "36 Months (3 Years)",
    "tags": [
      "Charger",
      "Smart",
      "LiFePO₄",
      "E-Rickshaw",
      "CAN",
      "Made in India"
    ],
    "specs": [
      {
        "key": "Model",
        "value": "OCS OORJA SC-51.2V-7A"
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
        "value": "7A"
      },
      {
        "key": "Charging Profile",
        "value": "CC/CV (Constant Current / Constant Voltage)"
      },
      {
        "key": "Battery Chemistry",
        "value": "LiFePO₄ (16S Configuration)"
      },
      {
        "key": "Recommended Capacity Range",
        "value": "40–120Ah"
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
        "value": "CAN 2.0A/2.0B (Optional)"
      },
      {
        "key": "BMS Compatibility",
        "value": "Daly, Xiaoxiang, and other 16S BMS"
      },
      {
        "key": "Charging Algorithm",
        "value": "Soft-start with intelligent taper"
      },
      {
        "key": "Efficiency",
        "value": ">90%"
      },
      {
        "key": "Operating Temperature",
        "value": "0°C to 45°C"
      },
      {
        "key": "Cooling",
        "value": "Temperature-aware fan control"
      },
      {
        "key": "Protections",
        "value": "Reverse-polarity, Short-circuit, Over-voltage, Over-temperature, Output overcurrent"
      },
      {
        "key": "Noise Level",
        "value": "<45 dB (Quiet operation)"
      },
      {
        "key": "Dimensions (Approx.)",
        "value": "220 × 120 × 65 mm"
      },
      {
        "key": "Weight (Approx.)",
        "value": "1.5–2 kg"
      },
      {
        "key": "Enclosure",
        "value": "Powder-coated metal"
      },
      {
        "key": "LED Indicators",
        "value": "Power, Charging, Fault"
      },
      {
        "key": "Country of Origin",
        "value": "India"
      }
    ],
    "features": [
      "True CC/CV LiFePO₄ Profile – 58.4V constant voltage with soft-start and gentle taper for full, balanced charge",
      "Built-in RCD Protection – 30mA Type A residual current device for extra layer of shock protection on AC input",
      "CAN-Enabled Smart Control – CAN 2.0A/2.0B communication with popular 16S BMS (Daly, Xiaoxiang) for dynamic charge adjustment",
      "BMS Integration – Reads pack status (SOC, temperature, alarms) and adjusts charging parameters in real-time",
      "Battery-First Safety – Comprehensive protection: reverse-polarity, short-circuit, over-voltage, over-temperature, output overcurrent",
      "Quiet Operation – High-efficiency design with temperature-aware fan control for silent charging",
      "Compact & Lightweight – Space-saving design perfect for home and small workshop installations",
      "Intelligent Taper Algorithm – Ensures complete, balanced charging without overcharging",
      "Wide Input Voltage Range – Works with 180–265VAC for compatibility across regions",
      "LED Status Indicators – Clear visual feedback for power, charging status, and fault conditions",
      "Perfect for Overnight Charging – Optimized for slow, gentle charging cycles that extend battery life",
      "Made in India – Engineered and quality-tested at OCS OORJA Labs, Lucknow",
      "3-Year Warranty – Backed by India-wide support network"
    ],
    "applications": [
      "E-Rickshaw Swap Battery Top-up (40–120Ah)",
      "Home Power Bank Charging (51.2V LiFePO₄)",
      "Small & Medium Enterprise (SME) Backup Systems",
      "Overnight Charging Stations",
      "Workshop Battery Maintenance",
      "Off-Grid Solar Battery Charging",
      "Electric Vehicle Battery Conditioning"
    ],
    "details": "The OCS OORJA 51.2V 7A Smart Charger is a compact, silent, and battery-friendly charging solution engineered for 40–120Ah LiFePO₄ battery packs. Perfect for overnight charging applications, it features a true CC/CV charging profile optimized for 16S LiFePO₄ chemistry with a 58.4V constant voltage setting and intelligent soft-start with gentle current taper. Safety is paramount with built-in 30mA Type A RCD protection on the AC input, providing an extra layer of shock protection. Optional CAN 2.0A/2.0B communication enables smart integration with popular BMS systems like Daly and Xiaoxiang, allowing the charger to read real-time pack status including SOC, temperature, cell voltages, and alarms, then dynamically adjust charging parameters for optimal battery health. Comprehensive battery-first safety features include reverse-polarity protection, short-circuit protection, over-voltage protection, over-temperature monitoring, and output overcurrent protection. The high-efficiency design incorporates temperature-aware fan control for whisper-quiet operation below 45dB. Ideal for e-rickshaw swap battery top-up, home power banks, and SME backup systems. Manufactured in India at OCS OORJA facilities in Lucknow, backed by a 3-year warranty and India-wide support network.",
    "dateAdded": "2025-10-17"
  },
  {
    "id": "p-charger-51v-20a-rcd-can",
    "name": "OCS OORJA 51.2V 20A Smart Charger for E-Rickshaw (RCD + CAN)",
    "slug": "ocs-oorja-51v-20a-smart-charger",
    "family": "e-rickshaw-chargers",
    "series": "51.2V Smart Charger Series",
    "image": "/images/products/ev-charger-erickshaw-new.jpeg",
    "summary": "Fast, dependable charging for 80–150Ah LiFePO₄ packs with BMS-aware taper, RCD protection, and CAN communication—perfect for workshops and fleet operations.",
    "warranty": "36 Months (3 Years)",
    "tags": [
      "Charger",
      "Fast",
      "Smart",
      "LiFePO₄",
      "Fleet",
      "CAN",
      "Made in India"
    ],
    "specs": [
      {
        "key": "Model",
        "value": "OCS OORJA SC-51.2V-20A"
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
        "value": "Fleet-grade continuous operation"
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
        "value": "Industrial-grade powder-coated metal"
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
      "Integrated RCD Protection – 30mA Type A on AC input for enhanced user safety in workshop environments",
      "CAN-Enabled Intelligence – Handshakes with 16S BMS to sync charge current/voltage, read SOC, temperatures, and alarms",
      "Real-Time BMS Communication – Monitors battery state and dynamically adjusts charging parameters",
      "Fleet-Grade Protections – Robust thermal design and comprehensive safety features for longer duty cycles",
      "High Efficiency (>92%) – Minimizes energy waste and heat generation during fast charging",
      "Active Thermal Management – Smart fan control ensures optimal operating temperature",
      "Wide Operating Temperature – Functions reliably from −10°C to 50°C for diverse conditions",
      "Industrial Enclosure – Durable powder-coated metal housing for workshop and depot use",
      "Continuous Operation Capable – Designed for daily fleet charging schedules",
      "Multiple Safety Layers – Reverse-polarity, short-circuit, over-voltage, over-temp, overcurrent protection",
      "Perfect Daily Driver – Optimized charge time for workshop turnaround and fleet management",
      "Made in India – Engineered for Indian climate and usage patterns at OCS OORJA Labs, Lucknow",
      "3-Year Warranty – Priority service network support for fleet users"
    ],
    "applications": [
      "E-Rickshaw Depot Fast Charging (80–150Ah)",
      "Fleet Service Centers and Workshops",
      "EV Battery Swap Stations",
      "Commercial Charging Facilities",
      "Battery Reconditioning Centers",
      "Fast Turnaround Charging Operations",
      "Multi-Vehicle Fleet Management",
      "Electric Auto Service Stations"
    ],
    "details": "The OCS OORJA 51.2V 20A Smart Charger delivers fast, dependable charging for 80–150Ah LiFePO₄ battery packs, making it the perfect daily driver for workshops and fleet operations. Engineered with a sophisticated CC/CV charging algorithm that communicates with 16S BMS systems via CAN 2.0A/2.0B protocol, this charger synchronizes charge current and voltage while continuously monitoring SOC, cell temperatures, and battery alarms. The BMS-aware taper function ensures optimal charge completion without compromising battery longevity. Integrated 30mA Type A RCD protection on the AC input provides enhanced user safety in busy workshop environments. Fleet-grade construction features robust thermal design with active smart fan control, enabling continuous operation and longer duty cycles. High efficiency (>92%) minimizes energy costs and heat generation during fast charging sessions. The industrial-grade powder-coated metal enclosure withstands the rigors of daily fleet operations while operating across a wide temperature range (−10°C to 50°C). Comprehensive safety protections include reverse-polarity, short-circuit, over-voltage, over-temperature, and output overcurrent safeguards. Ideal for e-rickshaw depots, service centers, and any application requiring fast turnaround charging with minimal downtime. Manufactured in India at OCS OORJA's Lucknow facility, backed by a 3-year warranty with   support for fleet users.",
    "dateAdded": "2025-10-17"
  },
  {
    "id": "p-charger-51v-25a-rcd-can",
    "name": "OCS OORJA 51.2V 25A Smart Charger for E-Rickshaw (RCD + CAN)",
    "slug": "ocs-oorja-51v-25a-smart-charger",
    "family": "e-rickshaw-chargers",
    "series": "51.2V Smart Charger Series",
    "image": "/images/products/ev-charger-erickshaw-new.jpeg",
    "summary": "High-throughput powerhouse for 100–200Ah LiFePO₄ packs with advanced CAN control, industrial protections, and smart thermal management—minimize downtime, maximize cycles.",
    "warranty": "36 Months (3 Years) with Priority Fleet Support",
    "tags": [
      "Charger",
      "High-Power",
      "Fleet",
      "Smart",
      "LiFePO₄",
      "CAN",
      "Industrial",
      "Made in India"
    ],
    "specs": [
      {
        "key": "Model",
        "value": "OCS OORJA SC-51.2V-25A"
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
        "value": "Industrial-grade: Reverse-polarity, Short-circuit, Over-voltage, Over-temperature, Overcurrent"
      },
      {
        "key": "Duty Cycle",
        "value": "Continuous operation for fleet charging benches"
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
        "value": "Heavy-duty powder-coated metal with ventilation"
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
      "RCD Built-in – 30mA Type A for AC shock protection in high-throughput charging facilities",
      "Advanced CAN Control & Telemetry – Full CAN 2.0A/2.0B integration with Daly, Xiaoxiang, and other 16S LiFePO₄ BMS",
      "Real-Time Battery Monitoring – Reads SOC, cell voltages, temperatures, current, alarms, and health metrics",
      "Industrial-Grade Protections – Comprehensive safeguards for continuous fleet operation",
      "Smart Thermal Management – Dual-fan active cooling with temperature-based speed control",
      "High Efficiency (>93%) – Minimal power loss and heat generation even at full 25A output",
      "Continuous Operation Rated – Engineered for swap-and-ride hubs and fleet charging benches",
      "Wide Operating Range – Functions reliably from −10°C to 55°C in demanding environments",
      "Heavy-Duty Construction – Robust enclosure designed for 24/7 charging station deployment",
      "Minimize Downtime – Fast charging reduces vehicle idle time and maximizes fleet utilization",
      "Maximize Charge Cycles – Intelligent algorithms extend battery lifespan while delivering high throughput",
      "Made in India – Engineered for Indian EV fleet requirements at OCS OORJA Labs, Lucknow",
      "3-Year Warranty – Priority support for fleet users with dedicated service network"
    ],
    "applications": [
      "E-Rickshaw Swap-and-Ride Hubs (100–200Ah)",
      "Fleet Charging Benches and Depots",
      "Commercial EV Charging Stations",
      "Battery Swap Networks",
      "High-Volume Service Centers",
      "24/7 Fleet Operations",
      "Multi-Bay Charging Facilities",
      "Electric Auto Fleet Management",
      "Large-Scale Battery Reconditioning",
      "Industrial Backup Power Systems"
    ],
    "details": "The OCS OORJA 51.2V 25A Smart Charger is a high-throughput powerhouse engineered for 100–200Ah LiFePO₄ battery packs in demanding fleet and swap-station environments. Delivering up to 1460W of charging power with 25A output current, this industrial-grade charger minimizes vehicle downtime while maximizing charge cycle longevity through intelligent BMS integration. Advanced CAN 2.0A/2.0B control and telemetry enable full communication with popular 16S BMS systems like Daly and Xiaoxiang, providing real-time monitoring of SOC, cell voltages, temperatures, current flow, alarms, and overall battery health. The charger can adjust charge parameters dynamically based on BMS feedback, with selectable current limits programmable via CAN for different battery capacities and charging scenarios. Built-in 30mA Type A RCD protection safeguards against AC shock hazards in busy charging facilities. Industrial-grade construction features heavy-duty powder-coated metal enclosure with smart dual-fan thermal management, enabling continuous operation even in high ambient temperatures up to 55°C. High efficiency (>93%) ensures minimal energy waste and reduced operating costs for fleet operators. Comprehensive protection suite includes reverse-polarity, short-circuit, over-voltage, over-temperature, and overcurrent safeguards engineered for 24/7 reliability. Perfect for e-rickshaw swap-and-ride hubs, fleet charging benches, and any high-volume charging application where throughput and uptime are critical. Manufactured in India at OCS OORJA's Lucknow facility with deep understanding of Indian EV fleet requirements, backed by a 3-year warranty with   support for fleet operators.",
    "dateAdded": "2025-10-17"
  }
];
