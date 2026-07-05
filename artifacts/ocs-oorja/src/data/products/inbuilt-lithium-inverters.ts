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
      {
        "key": "Model",
        "value": "OCS-LI-1000"
      },
      {
        "key": "Power Rating",
        "value": "1000 VA / 800W"
      },
      {
        "key": "Battery Voltage",
        "value": "12.8V"
      },
      {
        "key": "Battery Capacity",
        "value": "100Ah (1280Wh)"
      },
      {
        "key": "Battery Chemistry",
        "value": "Lithium Ferro Phosphate (LFP)"
      },
      {
        "key": "Input Voltage Range",
        "value": "100-280 Vac"
      },
      {
        "key": "Output Voltage",
        "value": "220 ±7Vac"
      },
      {
        "key": "Frequency",
        "value": "50Hz"
      },
      {
        "key": "Waveform",
        "value": "Pure Sine Wave"
      },
      {
        "key": "Peak Efficiency",
        "value": "82%"
      },
      {
        "key": "Charging Time",
        "value": "5-6 hours"
      },
      {
        "key": "Backup Time @ 400W",
        "value": ">3 hours"
      },
      {
        "key": "Backup Time @ 100W",
        "value": ">10 hours"
      },
      {
        "key": "Charging Current",
        "value": "12A"
      },
      {
        "key": "Discharging Current",
        "value": "80A"
      },
      {
        "key": "Operating Temp (Charge)",
        "value": "-10°C to 45°C"
      },
      {
        "key": "Operating Temp (Discharge)",
        "value": "0°C to 60°C"
      },
      {
        "key": "Audible Noise",
        "value": "<50 dB"
      },
      {
        "key": "Changeover Time (UPS)",
        "value": "<10 ms"
      },
      {
        "key": "THD",
        "value": ">10% at 220VAC input"
      },
      {
        "key": "Voltage Harmonic",
        "value": "<5% (Linear Load)"
      },
      {
        "key": "Max Voc",
        "value": "25V"
      },
      {
        "key": "Max Current",
        "value": "40A"
      }
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
    "dateAdded": "2025-10-14"
  },
  {
    "id": "p-inverter-12-24v",
    "name": "Inverter for 12V/24V Lithium Batteries",
    "slug": "inverter-12v-24v",
    "family": "inbuilt-lithium-inverters",
    "series": "Lithium-Compatible Inverters",
    "image": "/images/products/ess-home-storage.jpeg",
    "summary": "Pure‑sine inverter compatible with 12V and 24V lithium battery systems.",
    "warranty": "Warranty details on request",
    "tags": [
      "Inverter",
      "Home",
      "Lithium"
    ],
    "specs": [
      {
        "key": "Battery Input",
        "value": "12V / 24V"
      },
      {
        "key": "Output",
        "value": "220–240VAC, 50Hz"
      },
      {
        "key": "Waveform",
        "value": "Pure sine wave"
      },
      {
        "key": "Battery Type",
        "value": "Lithium compatible (BMS‑aware)"
      }
    ],
    "dateAdded": "2024-05-10",
    "needsReview": true
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
      {
        "key": "Battery",
        "value": "12.8V 100Ah LFP"
      },
      {
        "key": "Inverter",
        "value": "Pure sine, 220–240VAC"
      },
      {
        "key": "Use Case",
        "value": "Home power backup"
      },
      {
        "key": "Expandability",
        "value": "Modular options"
      }
    ],
    "dateAdded": "2024-09-05"
  }
];
