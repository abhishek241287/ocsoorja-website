import type { Product } from "./types";

// Hybrid Solar Inverters
// To add or edit a product in this family, copy an entry below and change the
// values. Product photos go in public/images/products/hybrid-solar-inverters/ and brochures/
// datasheets in public/downloads/. Editing here updates the whole site.

export const hybridSolarInverters: Product[] = [
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
      { "key": "Battery Input", "value": "24V" },
      { "key": "Rated Power", "value": "4.2kW" },
      { "key": "PV", "value": "MPPT solar charging" },
      { "key": "Mode", "value": "Hybrid (PV + Grid + Battery)" }
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
      { "key": "Battery Input", "value": "48V" },
      { "key": "Rated Power", "value": "6kW" },
      { "key": "PV", "value": "MPPT solar charging" },
      { "key": "Mode", "value": "Hybrid (PV + Grid + Battery)" }
    ],
    "dateAdded": "2024-06-22"
  },

  // ── IP54 Series (launched July 2026) ───────────────────────────────────────
  {
    "id": "p-hybrid-ip54-4kw",
    "name": "OCS OORJA 4 kW Hybrid Solar Inverter (IP54)",
    "slug": "hybrid-solar-inverter-ip54-4kw",
    "family": "hybrid-solar-inverters",
    "series": "IP54 Hybrid Series",
    "image": "/images/products/hybrid-solar-inverters/hybrid-solar-ip54.png",
    "images": [
      "/images/products/hybrid-solar-inverters/hybrid-solar-ip54.png"
    ],
    "summary": "4 kW pure sine wave hybrid solar inverter with IP54 weatherproof protection, built-in AI cloud monitoring, WiFi connectivity, and grid-feed capability. Ideal for homes, offices, and farms that need reliable solar power in any environment.",
    "warranty": "24 Months",
    "tags": [
      "Inverter",
      "Hybrid",
      "Solar",
      "IP54",
      "Waterproof",
      "4kW",
      "Grid-tie",
      "Off-grid",
      "WiFi",
      "Made in India"
    ],
    "certifications": ["IEC Certified", "EU Standards Compliant", "IP54"],
    "features": [
      "IP54 Protection – Weatherproof, dustproof, and salt-spray resistant enclosure for outdoor and semi-outdoor installation",
      "IEC Certified & EU Standards Compliant – Meets international quality and safety benchmarks",
      "Built-in AI Cloud Function – Intelligent real-time energy management and predictive diagnostics",
      "Off-grid & Grid-tied Operation – Seamlessly switches modes to maximise solar self-consumption",
      "PV Power Feed to Grid – Exports surplus solar energy and monitors grid feeding status",
      "LCD Intelligent Display – 6-parameter real-time dashboard: PV, battery, load, grid, frequency, and efficiency",
      "WiFi Monitoring & Remote Operation – Manage your system from anywhere via the OCS OORJA app",
      "Pure Sine Wave Output – Clean 220/230/240 VAC for sensitive electronics and appliances",
      "Fast UPS Transfer – 10 ms for computers, 20 ms for household appliances",
      "Wide AC Input Range – 90–200 VAC (Normal Mode) / 170–200 VAC (UPS Mode)",
      "High-efficiency MPPT – >98% DC-to-AC conversion with 60–550 VDC tracking range",
      "24 V LiFePO₄ Compatible – 3-stage intelligent charging (Bulk / Absorb / Float)",
      "Overload & Short-circuit Protection – 8000 VA peak handling with auto-recovery",
      "Smart Fan Cooling – Temperature-controlled for quiet, long-life operation",
      "Parallel-ready Architecture – Upgrade path to higher capacity without replacing hardware"
    ],
    "specs": [
      { "key": "Input Formation", "value": "L + N + E" },
      { "key": "AC Input Voltage (Normal Mode)", "value": "90–200 VAC" },
      { "key": "AC Input Voltage (UPS Mode)", "value": "170–200 VAC" },
      { "key": "Input Frequency", "value": "50/60 Hz (Selectable, ±0.5%)" },
      { "key": "Rated Output Power", "value": "4000 W" },
      { "key": "Peak Output Power", "value": "4500 W" },
      { "key": "Output Voltage", "value": "220 / 230 / 240 VAC ±5%" },
      { "key": "Output Frequency", "value": "50 / 60 Hz ±0.1%" },
      { "key": "Output Waveform", "value": "Pure Sine Wave" },
      { "key": "Transfer Time", "value": "10 ms (Computer) / 20 ms (Household)" },
      { "key": "Overload Capacity", "value": "8000 VA (200–400%, up to 400 ms)" },
      { "key": "Grid Voltage Range", "value": "170–265 VAC" },
      { "key": "Grid Frequency Range", "value": "49–51 Hz / 59.8–61 Hz" },
      { "key": "Grid Output Current", "value": "17.4 A" },
      { "key": "Grid Power Factor", "value": ">0.99" },
      { "key": "Max Efficiency (DC/AC)", "value": ">98%" },
      { "key": "Battery Rated Voltage", "value": "24 VDC" },
      { "key": "Constant Charging Voltage", "value": "28.2 VDC" },
      { "key": "Float Charging Voltage", "value": "27 VDC" },
      { "key": "Charging Method", "value": "MPPT" },
      { "key": "Max PV Input Power", "value": "6500 W" },
      { "key": "PV Input Voltage Range", "value": "60–550 VDC" },
      { "key": "Max PV Open Circuit Voltage", "value": "600 VDC" },
      { "key": "Max PV Charge Current", "value": "120 A" },
      { "key": "Max AC Charge Current", "value": "100 A" },
      { "key": "Max Total Charge Current", "value": "120 A" },
      { "key": "Display", "value": "LCD Intelligent Display (6-parameter)" },
      { "key": "Communication", "value": "RS232 – 5-pin RJ12, Baud Rate 2400" },
      { "key": "Expansion Slot", "value": "BMS Communication + WiFi + 2 × 5-pin RJ12 (2.54 mm)" },
      { "key": "Parallel Interface", "value": "Not Supported" },
      { "key": "Operating Temperature", "value": "0°C – 60°C" },
      { "key": "Storage Temperature", "value": "−15°C – +70°C" },
      { "key": "Max Altitude", "value": "≤1000 m (derate above; max 4000 m)" },
      { "key": "Operating Humidity", "value": "20–95% Non-condensing" },
      { "key": "Audible Noise", "value": "<50 dB" },
      { "key": "Ingress Protection", "value": "IP54" }
    ],
    "applications": [
      "Residential Solar Home Systems",
      "Commercial Rooftop Solar",
      "Off-grid Farms & Agriculture",
      "Retail Shops",
      "Clinics & Healthcare Facilities",
      "Offices",
      "Educational Institutes",
      "Remote & Semi-urban Installations"
    ],
    "details": "The OCS OORJA 4 kW Hybrid Solar Inverter (IP54) is a professional-grade energy management device that combines grid-tied and off-grid functionality in a single IP54-rated enclosure. Designed for Indian climate conditions — dust, humidity, and coastal salt spray — it delivers uninterrupted power whether the grid is present or not. The built-in AI cloud function continuously analyses energy flows and flags anomalies before they become failures, while WiFi connectivity lets you monitor and control the system remotely from your smartphone. Its wide MPPT tracking range (60–550 VDC) accommodates a broad variety of solar panel configurations, and the >98% DC-to-AC efficiency ensures that every watt of solar energy captured is put to work. The 24 V LiFePO₄-compatible charging profile (3-stage: Bulk / Absorb / Float) maximises battery cycle life, and the 10 ms UPS transfer keeps computers and sensitive instruments running without interruption. IEC-certified and EU-standards-compliant, this inverter is equally at home in a residential rooftop system, a rural clinic, or a commercial retail installation.",
    "faqs": [
      {
        "question": "Can the 4 kW IP54 inverter work without a battery?",
        "answer": "Yes. In grid-tied mode it exports surplus PV power to the grid without requiring a battery. A battery is needed for off-grid or backup operation."
      },
      {
        "question": "Is it suitable for outdoor installation?",
        "answer": "Yes. The IP54 rating means it is protected against dust ingress and water splashing from any direction, making it suitable for semi-outdoor mounting such as under a canopy or on an external wall."
      },
      {
        "question": "Which battery types are compatible?",
        "answer": "It supports 24 V LiFePO₄ (lithium iron phosphate) batteries, including the OCS OORJA BESS range, as well as standard lead-acid and AGM batteries."
      },
      {
        "question": "How do I monitor the system remotely?",
        "answer": "Plug in the optional WiFi module into the expansion slot. The inverter then connects to the OCS OORJA cloud platform, allowing real-time monitoring and remote control via a smartphone app."
      },
      {
        "question": "Can multiple units run in parallel?",
        "answer": "The 4 kW model does not support parallel operation. For higher capacity, consider the 11 kW IP54 model, which supports parallel stacking."
      }
    ],
    "relatedSlugs": [
      "hybrid-solar-inverter-ip54-6kw",
      "hybrid-solar-inverter-ip54-11kw"
    ],
    "seo": {
      "metaTitle": "4 kW IP54 Hybrid Solar Inverter | OCS OORJA",
      "metaDescription": "OCS OORJA 4 kW IP54 Hybrid Solar Inverter — weatherproof, WiFi-enabled, grid-tied & off-grid. IEC certified. Pure sine wave. Ideal for homes, offices & farms in India."
    },
    "dateAdded": "2026-07-20"
  },

  {
    "id": "p-hybrid-ip54-6kw",
    "name": "OCS OORJA 6.2 kW Hybrid Solar Inverter (IP54)",
    "slug": "hybrid-solar-inverter-ip54-6kw",
    "family": "hybrid-solar-inverters",
    "series": "IP54 Hybrid Series",
    "image": "/images/products/hybrid-solar-inverters/hybrid-solar-ip54.png",
    "images": [
      "/images/products/hybrid-solar-inverters/hybrid-solar-ip54.png"
    ],
    "summary": "6.2 kW pure sine wave hybrid solar inverter with IP54 weatherproof protection, AI cloud monitoring, WiFi connectivity, and grid-feed capability. Engineered for larger homes, commercial premises, and off-grid farms requiring robust, always-on solar power.",
    "warranty": "24 Months",
    "tags": [
      "Inverter",
      "Hybrid",
      "Solar",
      "IP54",
      "Waterproof",
      "6kW",
      "Grid-tie",
      "Off-grid",
      "WiFi",
      "48V",
      "Made in India"
    ],
    "certifications": ["IEC Certified", "EU Standards Compliant", "IP54"],
    "features": [
      "IP54 Protection – Weatherproof, dustproof, and salt-spray resistant enclosure for outdoor and semi-outdoor installation",
      "IEC Certified & EU Standards Compliant – Meets international quality and safety benchmarks",
      "Built-in AI Cloud Function – Intelligent real-time energy management and predictive diagnostics",
      "Off-grid & Grid-tied Operation – Seamlessly switches modes to maximise solar self-consumption",
      "PV Power Feed to Grid – Exports surplus solar energy and monitors grid feeding status",
      "LCD Intelligent Display – 6-parameter real-time dashboard: PV, battery, load, grid, frequency, and efficiency",
      "WiFi Monitoring & Remote Operation – Manage your system from anywhere via the OCS OORJA app",
      "Pure Sine Wave Output – Clean 220/230/240 VAC for sensitive electronics and appliances",
      "Fast UPS Transfer – 10 ms for computers, 20 ms for household appliances",
      "High-efficiency MPPT – >98% DC-to-AC conversion with 60–500 VDC tracking range",
      "48 V LiFePO₄ Compatible – 3-stage intelligent charging (Bulk / Absorb / Float)",
      "Overload & Short-circuit Protection – 12 400 VA peak handling with auto-recovery",
      "Smart Fan Cooling – Temperature-controlled for quiet, long-life operation",
      "Support up to 11 Units Parallel Connection – Scale capacity without additional equipment"
    ],
    "specs": [
      { "key": "Input Formation", "value": "L + N + E" },
      { "key": "AC Input Voltage (Normal Mode)", "value": "90–200 VAC" },
      { "key": "AC Input Voltage (UPS Mode)", "value": "170–200 VAC" },
      { "key": "Input Frequency", "value": "50/60 Hz (Selectable, ±0.5%)" },
      { "key": "Rated Output Power", "value": "6200 W" },
      { "key": "Peak Output Power", "value": "6500 W" },
      { "key": "Output Voltage", "value": "220 / 230 / 240 VAC ±5%" },
      { "key": "Output Frequency", "value": "50 / 60 Hz ±0.1%" },
      { "key": "Output Waveform", "value": "Pure Sine Wave" },
      { "key": "Transfer Time", "value": "10 ms (Computer) / 20 ms (Household)" },
      { "key": "Overload Capacity", "value": "12 400 VA (200–400%, up to 400 ms)" },
      { "key": "Grid Voltage Range", "value": "170–265 VAC" },
      { "key": "Grid Frequency Range", "value": "49–51 Hz / 59.8–61 Hz" },
      { "key": "Grid Output Current", "value": "26.9 A" },
      { "key": "Grid Power Factor", "value": ">0.99" },
      { "key": "Max Efficiency (DC/AC)", "value": ">98%" },
      { "key": "Battery Rated Voltage", "value": "48 VDC" },
      { "key": "Constant Charging Voltage", "value": "56.4 VDC" },
      { "key": "Float Charging Voltage", "value": "54 VDC" },
      { "key": "Charging Method", "value": "MPPT" },
      { "key": "Max PV Input Power", "value": "8500 W" },
      { "key": "PV Input Voltage Range", "value": "60–500 VDC" },
      { "key": "Max PV Open Circuit Voltage", "value": "600 VDC" },
      { "key": "Max PV Charge Current", "value": "120 A" },
      { "key": "Max AC Charge Current", "value": "100 A" },
      { "key": "Max Total Charge Current", "value": "120 A" },
      { "key": "Display", "value": "LCD Intelligent Display (6-parameter)" },
      { "key": "Communication", "value": "RS232 – 5-pin RJ12, Baud Rate 2400" },
      { "key": "Expansion Slot", "value": "BMS Communication + WiFi + 2 × 5-pin RJ12 (2.54 mm)" },
      { "key": "Parallel Interface", "value": "Support Parallel (up to 11 units)" },
      { "key": "Operating Temperature", "value": "0°C – 60°C" },
      { "key": "Storage Temperature", "value": "−15°C – +70°C" },
      { "key": "Max Altitude", "value": "≤1000 m (derate above; max 4000 m)" },
      { "key": "Operating Humidity", "value": "20–95% Non-condensing" },
      { "key": "Audible Noise", "value": "<50 dB" },
      { "key": "Ingress Protection", "value": "IP54" }
    ],
    "applications": [
      "Residential Solar Home Systems",
      "Commercial Rooftop Solar",
      "Off-grid Farms & Agriculture",
      "Retail Shops",
      "Clinics & Healthcare Facilities",
      "Offices",
      "Educational Institutes",
      "Remote & Semi-urban Installations"
    ],
    "details": "The OCS OORJA 6.2 kW Hybrid Solar Inverter (IP54) steps up to 48 V architecture, delivering 6200 W of continuous pure sine wave power in a rugged IP54-rated enclosure that withstands dust, moisture, and coastal salt spray. Its AI-powered cloud platform continuously tracks energy production, battery state-of-health, and grid conditions — alerting you to issues before they cause downtime. Built-in WiFi and RS232 connectivity give you full remote visibility and control. The MPPT tracking range (60–500 VDC) and 120 A maximum PV charge current allow you to connect a large solar array and harvest every available photon. Support for up to 11 units in parallel means the system grows with your energy needs without scrapping existing hardware. IEC-certified and EU-standards-compliant, this inverter is the right choice for larger homes, commercial offices, retail shops, clinics, and educational institutions that demand premium reliability and smart energy management.",
    "faqs": [
      {
        "question": "Can I add more units in parallel to increase capacity?",
        "answer": "Yes. The 6.2 kW IP54 model supports parallel stacking of up to 11 units, giving you a maximum combined output of approximately 68 kW from a single coordinated system."
      },
      {
        "question": "What battery voltage does this model require?",
        "answer": "It operates on a 48 V battery bank. OCS OORJA LiFePO₄ BESS modules in 48 V configuration are the recommended pairing."
      },
      {
        "question": "Does the AI cloud function require a subscription?",
        "answer": "Basic cloud monitoring is included with the product. Contact OCS OORJA for details on advanced analytics plans."
      },
      {
        "question": "Is it safe to install on an external wall?",
        "answer": "Yes. IP54 protection guards against dust ingress and water spray from any direction. Avoid direct prolonged rain exposure; mount under a canopy where possible."
      },
      {
        "question": "How large a solar array can I connect?",
        "answer": "Up to 8500 W of PV with a maximum open-circuit voltage of 600 VDC and a maximum PV charge current of 120 A."
      }
    ],
    "relatedSlugs": [
      "hybrid-solar-inverter-ip54-4kw",
      "hybrid-solar-inverter-ip54-11kw"
    ],
    "seo": {
      "metaTitle": "6.2 kW IP54 Hybrid Solar Inverter | OCS OORJA",
      "metaDescription": "OCS OORJA 6.2 kW IP54 Hybrid Solar Inverter — 48 V, weatherproof, WiFi-enabled, parallel-capable. IEC certified. For homes, offices & commercial solar in India."
    },
    "dateAdded": "2026-07-20"
  },

  {
    "id": "p-hybrid-ip54-11kw",
    "name": "OCS OORJA 11 kW Hybrid Solar Inverter (IP54)",
    "slug": "hybrid-solar-inverter-ip54-11kw",
    "family": "hybrid-solar-inverters",
    "series": "IP54 Hybrid Series",
    "image": "/images/products/hybrid-solar-inverters/hybrid-solar-ip54.png",
    "images": [
      "/images/products/hybrid-solar-inverters/hybrid-solar-ip54.png"
    ],
    "summary": "11 kW three-phase-ready hybrid solar inverter with IP54 weatherproof protection, dual MPPT inputs, AI cloud monitoring, parallel stacking up to 11 units, and full grid-feed capability. Built for commercial, industrial, and large off-grid applications.",
    "warranty": "24 Months",
    "tags": [
      "Inverter",
      "Hybrid",
      "Solar",
      "IP54",
      "Waterproof",
      "11kW",
      "Grid-tie",
      "Off-grid",
      "WiFi",
      "Parallel",
      "48V",
      "Commercial",
      "Made in India"
    ],
    "certifications": ["IEC Certified", "EU Standards Compliant", "IP54"],
    "features": [
      "IP54 Protection – Weatherproof, dustproof, and salt-spray resistant enclosure for outdoor and semi-outdoor installation",
      "IEC Certified & EU Standards Compliant – Meets international quality and safety benchmarks",
      "Built-in AI Cloud Function – Intelligent real-time energy management and predictive diagnostics",
      "Off-grid & Grid-tied Operation – Seamlessly switches modes to maximise solar self-consumption",
      "PV Power Feed to Grid – Exports surplus solar energy and monitors grid feeding status",
      "LCD Intelligent Display – 6-parameter real-time dashboard: PV, battery, load, grid, frequency, and efficiency",
      "WiFi Monitoring & Remote Operation – Manage your system from anywhere via the OCS OORJA app",
      "Pure Sine Wave Output – Clean 220/230/240 VAC for sensitive electronics and appliances",
      "Fast UPS Transfer – 10 ms for computers, 20 ms for household appliances",
      "Dual MPPT Inputs – 2 × 7500 W PV strings with 90–550 VDC tracking range",
      "High-efficiency MPPT – >98% DC-to-AC conversion for maximum solar harvest",
      "48 V LiFePO₄ Compatible – 3-stage intelligent charging with 190 A max PV charge current",
      "Parallel Stacking – Up to 11 units for scalable capacity up to ~121 kW",
      "Overload & Short-circuit Protection – 21 000 VA peak handling with auto-recovery"
    ],
    "specs": [
      { "key": "Input Formation", "value": "L + N + E" },
      { "key": "AC Input Voltage (Normal Mode)", "value": "90–200 VAC" },
      { "key": "AC Input Voltage (UPS Mode)", "value": "170–200 VAC" },
      { "key": "Input Frequency", "value": "50/60 Hz (Selectable, ±0.5%)" },
      { "key": "Rated Output Power", "value": "11 000 W" },
      { "key": "Peak Output Power", "value": "15 000 W" },
      { "key": "Output Voltage", "value": "220 / 230 / 240 VAC ±5%" },
      { "key": "Output Frequency", "value": "50 / 60 Hz ±0.1%" },
      { "key": "Output Waveform", "value": "Pure Sine Wave" },
      { "key": "Transfer Time", "value": "10 ms (Computer) / 20 ms (Household)" },
      { "key": "Overload Capacity", "value": "21 000 VA (200–400%, up to 400 ms)" },
      { "key": "Grid Voltage Range", "value": "170–265 VAC" },
      { "key": "Grid Frequency Range", "value": "49–51 Hz / 59.8–61 Hz" },
      { "key": "Grid Output Current", "value": "47.8 A" },
      { "key": "Grid Power Factor", "value": ">0.99" },
      { "key": "Max Efficiency (DC/AC)", "value": ">98%" },
      { "key": "Battery Rated Voltage", "value": "48 VDC" },
      { "key": "Constant Charging Voltage", "value": "56.4 VDC" },
      { "key": "Float Charging Voltage", "value": "54 VDC" },
      { "key": "Charging Method", "value": "MPPT" },
      { "key": "Max PV Input Power", "value": "2 × 7500 W (15 000 W total)" },
      { "key": "PV Input Voltage Range", "value": "90–550 VDC" },
      { "key": "Max PV Open Circuit Voltage", "value": "600 VDC" },
      { "key": "Max PV Charge Current", "value": "190 A" },
      { "key": "Max AC Charge Current", "value": "150 A" },
      { "key": "Max Total Charge Current", "value": "150 A" },
      { "key": "Display", "value": "LCD Intelligent Display (6-parameter)" },
      { "key": "Communication", "value": "RS232 – 5-pin RJ12, Baud Rate 2400" },
      { "key": "Expansion Slot", "value": "BMS Communication + WiFi + 2 × 5-pin RJ12 (2.54 mm)" },
      { "key": "Parallel Interface", "value": "Support Parallel (up to 11 units)" },
      { "key": "Operating Temperature", "value": "0°C – 60°C" },
      { "key": "Storage Temperature", "value": "−15°C – +70°C" },
      { "key": "Max Altitude", "value": "≤1000 m (derate above; max 4000 m)" },
      { "key": "Operating Humidity", "value": "20–95% Non-condensing" },
      { "key": "Audible Noise", "value": "<50 dB" },
      { "key": "Ingress Protection", "value": "IP54" }
    ],
    "applications": [
      "Large Residential Solar Systems",
      "Commercial & Industrial Rooftop Solar",
      "Off-grid Farms & Agriculture",
      "Retail Shops & Malls",
      "Clinics & Hospitals",
      "Corporate Offices",
      "Educational Institutes & Campuses",
      "Telecom Tower Power Backup"
    ],
    "details": "The OCS OORJA 11 kW Hybrid Solar Inverter (IP54) is the flagship of the IP54 Series, delivering 11 000 W of continuous pure sine wave power with dual MPPT inputs capable of harvesting up to 15 000 W from two independent solar strings (90–550 VDC). Its 48 V battery architecture and 190 A maximum PV charge current make it the ideal choice for large battery banks and high-capacity solar installations. The IP54-rated enclosure protects all internal electronics from dust, moisture, and salt spray — enabling deployment in factories, farms, coastal commercial premises, and large institutional buildings. Parallel stacking of up to 11 units allows the system to scale to approximately 121 kW with a single coordinated control plane. The built-in AI cloud function monitors system health in real time, while WiFi connectivity and the OCS OORJA app give facility managers full remote visibility. With >98% DC-to-AC efficiency, IEC certification, and EU-standards compliance, this inverter matches the performance benchmarks set by global leaders in hybrid power electronics.",
    "faqs": [
      {
        "question": "How many solar panels can I connect to the 11 kW model?",
        "answer": "Up to 15 000 W total across two MPPT inputs. Each string can handle up to 7500 W with a maximum open-circuit voltage of 600 VDC."
      },
      {
        "question": "Can I scale beyond 11 kW by adding more units?",
        "answer": "Yes. Up to 11 units can be stacked in parallel, delivering approximately 121 kW of combined output under a single monitoring dashboard."
      },
      {
        "question": "What is the difference between the 6.2 kW and 11 kW IP54 models?",
        "answer": "The 11 kW model adds a second MPPT input (dual 7500 W strings vs single 8500 W), raises the max PV charge current to 190 A, and increases the overload capacity to 21 000 VA — making it the right choice for larger commercial and institutional loads."
      },
      {
        "question": "Is the 11 kW inverter suitable for a factory or hospital?",
        "answer": "Yes. The IP54 enclosure, parallel scalability, and AI cloud monitoring make it well-suited for mission-critical commercial and institutional applications."
      },
      {
        "question": "What battery is recommended for the 11 kW model?",
        "answer": "48 V LiFePO₄ batteries, such as the OCS OORJA BESS modules, are the recommended pairing. Lead-acid and AGM 48 V banks are also compatible."
      }
    ],
    "relatedSlugs": [
      "hybrid-solar-inverter-ip54-4kw",
      "hybrid-solar-inverter-ip54-6kw"
    ],
    "seo": {
      "metaTitle": "11 kW IP54 Hybrid Solar Inverter | OCS OORJA",
      "metaDescription": "OCS OORJA 11 kW IP54 Hybrid Solar Inverter — dual MPPT, 15 kW PV input, parallel-capable up to 121 kW. IEC certified. For commercial & industrial solar in India."
    },
    "dateAdded": "2026-07-20"
  }
];
