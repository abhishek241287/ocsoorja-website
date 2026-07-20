import type { Product } from "./types";

// Inbuilt Lithium Battery Inverters
// To add or edit a product in this family, copy an entry below and change the
// values. Product photos go in public/images/products/inbuilt-lithium-inverters/ and brochures/
// datasheets in public/downloads/. Editing here updates the whole site.

export const inbuiltLithiumInverters: Product[] = [
  {
    "id": "p-lithium-inverter-1000",
    "name": "Lithium Inverter OCS-LI-1000",
    "slug": "lithium-inverter-ocs-li-1000",
    "family": "inbuilt-lithium-inverters",
    "series": "OCS-LI Series",
    "image": "/images/products/lithium-inverter-new.jpeg",
    "images": [
      "/images/products/lithium-inverter-new.jpeg",
      "/images/products/lithium-inverter-ad.jpeg",
      "/images/products/lithium-inverter-product.jpeg"
    ],
    "summary": "Integrated lithium battery inverter system with 1000VA power rating, featuring smart LCD display and multi-level protection.",
    "warranty": "Warranty details on request",
    "tags": [
      "Inverter",
      "Lithium",
      "UPS",
      "Home Backup",
      "LFP"
    ],
    "specs": [
      { "key": "Model", "value": "OCS-LI-1000" },
      { "key": "Power Rating", "value": "1000 VA / 800W" },
      { "key": "Battery Voltage", "value": "12.8V" },
      { "key": "Battery Capacity", "value": "100Ah (1280Wh)" },
      { "key": "Battery Chemistry", "value": "Lithium Ferro Phosphate (LFP)" },
      { "key": "Input Voltage Range", "value": "100-280 Vac" },
      { "key": "Output Voltage", "value": "220 ±7Vac" },
      { "key": "Frequency", "value": "50Hz" },
      { "key": "Waveform", "value": "Pure Sine Wave" },
      { "key": "Peak Efficiency", "value": "82%" },
      { "key": "Charging Time", "value": "5-6 hours" },
      { "key": "Backup Time @ 400W", "value": ">3 hours" },
      { "key": "Backup Time @ 100W", "value": ">10 hours" },
      { "key": "Charging Current", "value": "12A" },
      { "key": "Discharging Current", "value": "80A" },
      { "key": "Operating Temp (Charge)", "value": "-10°C to 45°C" },
      { "key": "Operating Temp (Discharge)", "value": "0°C to 60°C" },
      { "key": "Audible Noise", "value": "<50 dB" },
      { "key": "Changeover Time (UPS)", "value": "<10 ms" },
      { "key": "THD", "value": ">10% at 220VAC input" },
      { "key": "Voltage Harmonic", "value": "<5% (Linear Load)" },
      { "key": "Max Voc", "value": "25V" },
      { "key": "Max Current", "value": "40A" }
    ],
    "features": [
      "100% Charging within 4 to 5 hours",
      "Smart LCD Display with 3-color indication (Inv mode - Light green, Mains mode - Dark green, Fault mode - Red)",
      "Compact & Space Saving design",
      "Eco Friendly & Safe",
      "Multi Level Protection & Safety",
      "Pure Sine Wave Output",
      "No Exposed Wires",
      "Over Charge Protection",
      "Over Discharge Protection",
      "Short Circuit Protection",
      "Smart Shutdown on low battery",
      "Constant Current/Voltage charging topology",
      "Audible alarm function",
      "LED indication for UPS ON/OFF and UPS Mode"
    ],
    "applications": [
      "Home power backup",
      "Office equipment backup",
      "Small business UPS",
      "Emergency lighting systems",
      "Critical appliance backup"
    ],
    "details": "The OCS-LI-1000 is an integrated lithium inverter system combining a 12.8V 100Ah LiFePO4 battery with a 1000VA pure sine wave inverter. It features advanced protections including over-charge, over-discharge, and short-circuit protection. The smart LCD display provides real-time monitoring of battery voltage, mains voltage, load percentage, and system status. With fast charging capability (5-6 hours) and extended backup times, it's ideal for home and small office applications. The system operates with minimal noise (<50dB) and offers seamless UPS changeover (<10ms) for uninterrupted power supply.",
    "relatedSlugs": ["lithium-inverter-ocs-li-2200va"],
    "dateAdded": "2025-10-14"
  },
  {
    "id": "p-lithium-inverter-2200va",
    "name": "Lithium Inverter OCS-LI-2200VA",
    "slug": "lithium-inverter-ocs-li-2200va",
    "family": "inbuilt-lithium-inverters",
    "series": "OCS-LI Series",
    "image": "/images/products/lithium-inverter-new.jpeg",
    "images": [
      "/images/products/lithium-inverter-new.jpeg",
      "/images/products/lithium-inverter-ad.jpeg",
      "/images/products/lithium-inverter-product.jpeg"
    ],
    "summary": "High-capacity 2200VA / 1800W integrated lithium inverter with 24V LiFePO₄ battery, PWM solar charge controller, 5-colour LCD display, and comprehensive multi-level protection. Ideal for larger homes, offices, and small commercial setups.",
    "warranty": "Warranty details on request",
    "tags": [
      "Inverter",
      "Lithium",
      "UPS",
      "Home Backup",
      "LFP",
      "2200VA",
      "24V",
      "Solar"
    ],
    "specs": [
      { "key": "Power Rating", "value": "2200 VA / 1800W" },
      { "key": "Battery Voltage", "value": "24VDC (LiFePO₄)" },
      { "key": "Battery Chemistry", "value": "Lithium Ferro Phosphate (LFP)" },
      { "key": "Input Voltage Range", "value": "100–280 VAC" },
      { "key": "Output Voltage", "value": "220 ±7 VAC" },
      { "key": "Output Supply Phases", "value": "Single" },
      { "key": "Nominal Frequency (Inverter Mode)", "value": "50 ±1 Hz" },
      { "key": "Output Voltage Regulation", "value": "195–220 V" },
      { "key": "Output THD (Linear Load)", "value": "<5%" },
      { "key": "Waveform", "value": "Pure Sine Wave" },
      { "key": "Crest Factor", "value": ">01" },
      { "key": "Efficiency of SCC", "value": ">98%" },
      { "key": "Type of Control", "value": "PWM" },
      { "key": "PV Input Voltage Max Voc", "value": "45V" },
      { "key": "Maximum Solar Array Power", "value": "1500W" },
      { "key": "Solar Current Rating at SCC", "value": "40A DC" },
      { "key": "Overload Capacity", "value": "135% (6 Retries)" },
      { "key": "Cooling Fan ON at", "value": "60°C or 45% of rated load / Solar >15A" },
      { "key": "Cooling Fan OFF at", "value": "55°C or 40% of rated load / Solar <5A" },
      { "key": "Battery Low Voltage Cut per Battery", "value": "11V (70.1V with 4 batteries)" },
      { "key": "Max Battery Charging Voltage (Grid HiLo)", "value": "14.6V per battery" },
      { "key": "Max Battery Charging Voltage (Solar)", "value": "14.3 ±0.1 VDC per battery" },
      { "key": "Max Battery Charging Current by Solar", "value": "20² BE" },
      { "key": "Grid Low Cut Voltage Recovery (OT Load / Normal Load)", "value": "180V / 190V" },
      { "key": "Grid High Cut Voltage Recovery (OT Load / Normal Load)", "value": "265V / 280V ±10V" },
      { "key": "Grid Charging Enable / Disable", "value": "Yes" },
      { "key": "Selection of UPS Input Voltage", "value": "235/270 ±10 VDC" },
      { "key": "Output Voltage in No-load at Rated Battery Voltage", "value": "220 VDC" },
      { "key": "Audible Noise", "value": "<50 dB" },
      { "key": "Protection", "value": "Overload, Battery deep discharge, Battery overcharge, Short circuit, Over temperature" },
      { "key": "Display", "value": "5-colour LCD (Inv: Light green | Mains: Dark green | Fault: Red)" },
      { "key": "Display Parameters", "value": "Battery voltage, UPS ON/OFF & Mode, Load, Output voltage, Conversion efficiency, Temperature, Operation mode" },
      { "key": "Operating Temperature Range", "value": "0–50°C" },
      { "key": "Storage Temperature Range", "value": "0–50°C" },
      { "key": "Front Panel", "value": "Display with tact switch" },
      { "key": "Side Panel (PCBs, MCB, Terminals)", "value": "O/P Socket, Fuse, Mains & Battery Cable, Fan" },
      { "key": "Changeover Time (Inverter to Mains, UPS Mode)", "value": "<10 ms" },
      { "key": "Changeover Time (Mains to Inverter, Normal Mode)", "value": "<40 ms" }
    ],
    "features": [
      "2200VA / 1800W Pure Sine Wave Output – Powers heavy loads including ACs, refrigerators, and office equipment",
      "24V LiFePO₄ Architecture – Higher energy density, longer cycle life, and safer chemistry than lead-acid",
      "PWM Solar Charge Controller – Built-in SCC supporting up to 1500W solar input, 40A at 45V Voc",
      "5-Colour Smart LCD Display – Real-time visibility of battery voltage, load %, output voltage, efficiency, temperature, and mode",
      "Colour-coded Mode Indication – Light green (Inverter), Dark green (Mains), Red (Fault) for instant status at a glance",
      "Ultra-fast UPS Changeover – <10 ms in UPS mode, <40 ms in Normal mode for uninterrupted power",
      "Grid Charging Enable / Disable – Configurable to prioritise solar or grid charging per user preference",
      "Selectable UPS Input Voltage – 235V / 270V threshold selection to suit local grid conditions",
      "Overload Protection with Auto-retry – 135% overload handled with 6 automatic retries before shutdown",
      "Multi-level Protection – Overload, battery deep discharge, overcharge, short circuit, and over-temperature",
      "Smart Fan Cooling – Temperature and load-triggered fan control for quiet and efficient thermal management",
      "Battery Low Voltage Cut – Per-battery cutoff at 11V (70.1V for 4-battery bank) to protect cell health",
      "No Exposed Wires – Clean, safe integrated design with O/P socket, MCB, fuse, and cables enclosed",
      "Eco Friendly & Maintenance-Free – Zero watering, no acid fumes, safe for indoor installation"
    ],
    "applications": [
      "Home power backup (larger homes)",
      "Office and small commercial UPS",
      "Retail shops and clinics",
      "Solar hybrid home systems",
      "Emergency lighting and critical loads",
      "Educational institutes",
      "Small workshops and studios"
    ],
    "details": "The OCS-LI-2200VA is the high-capacity variant of OCS OORJA's integrated lithium inverter series, delivering 2200VA / 1800W of pure sine wave output from a 24V LiFePO₄ battery bank. The built-in PWM Solar Charge Controller accepts up to 1500W of solar input (max Voc 45V, 40A), enabling self-sufficient solar-backed operation during daylight hours. The intelligent 5-colour LCD display monitors battery voltage, load percentage, output voltage, conversion efficiency, temperature, and operating mode in real time — with colour-coded status LEDs (light green for inverter, dark green for mains, red for fault) for instant situational awareness. Grid charging is user-configurable: enable when solar is insufficient, disable to run purely on solar. The selectable UPS input voltage threshold (235V / 270V) adapts to varying regional grid conditions across India. Ultra-fast changeover — under 10 ms in UPS mode, under 40 ms in normal mode — ensures computers, medical equipment, and other sensitive electronics stay powered without interruption. Comprehensive protections (overload with 6 auto-retries, deep discharge, overcharge, short circuit, over-temperature) and smart fan cooling combine to deliver a long-service, low-maintenance power solution for larger homes, offices, clinics, and retail establishments.",
    "faqs": [
      {
        "question": "What battery does the OCS-LI-2200VA use?",
        "answer": "It uses a 24V LiFePO₄ (lithium iron phosphate) battery bank. A typical configuration is four 3.2V cells or two 12V LFP modules in series."
      },
      {
        "question": "Can I connect solar panels directly?",
        "answer": "Yes. The built-in PWM Solar Charge Controller supports up to 1500W of solar input with a maximum open-circuit voltage of 45V and 40A charging current."
      },
      {
        "question": "How quickly does it switch from mains to battery?",
        "answer": "In UPS mode, changeover is under 10 ms — fast enough for computers and sensitive electronics. In Normal mode, changeover is under 40 ms."
      },
      {
        "question": "Can I disable grid charging and run on solar only?",
        "answer": "Yes. Grid charging can be enabled or disabled via the settings, allowing you to prioritise solar energy and avoid grid electricity costs during daylight hours."
      },
      {
        "question": "What loads can the 2200VA / 1800W model handle?",
        "answer": "It can power typical household loads including fans, lights, televisions, computers, refrigerators (check startup surge), and small ACs — up to 1800W continuous draw."
      }
    ],
    "relatedSlugs": ["lithium-inverter-ocs-li-1000"],
    "seo": {
      "metaTitle": "2200VA Lithium Inverter OCS-LI-2200VA | OCS OORJA",
      "metaDescription": "OCS OORJA 2200VA / 1800W LiFePO₄ lithium inverter with built-in PWM solar charger, 5-colour LCD, <10ms UPS changeover, and multi-level protection. Made in India."
    },
    "dateAdded": "2026-07-20"
  },
  {
    "id": "p-combo-12v-inverter",
    "name": "Combo Power Pack 12V (Battery + Inverter)",
    "slug": "combo-power-pack-12v",
    "family": "inbuilt-lithium-inverters",
    "series": "Combo Power Packs",
    "image": "/images/products/ess-home-storage.jpeg",
    "summary": "All‑in‑one home backup combo: 12V LFP battery paired with inverter.",
    "warranty": "Warranty details on request",
    "tags": [
      "Combo",
      "Home",
      "Backup"
    ],
    "specs": [
      { "key": "Battery", "value": "12.8V 100Ah LFP" },
      { "key": "Inverter", "value": "Pure sine, 220–240VAC" },
      { "key": "Use Case", "value": "Home power backup" },
      { "key": "Expandability", "value": "Modular options" }
    ],
    "dateAdded": "2024-09-05"
  }
];
