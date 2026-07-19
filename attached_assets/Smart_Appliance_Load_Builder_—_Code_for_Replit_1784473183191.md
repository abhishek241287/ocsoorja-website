Upgrade all engineering calculators to be homeowner-friendly — Smart Appliance Load Builder.

RULES:
- Users never need to know watt values — they select appliances, quantities, and usage hours only
- Standard Indian appliance wattages auto-filled from a single database file
- Advanced Mode unlocks manual wattage editing
- Appliance database lives in ONE file (appliance-database.ts) — update it without touching calculator logic
- Live running summary: connected load, running load, daily kWh, recommended inverter / battery / solar
- Reuses existing hub logic (calculateInverterSizing, calculateBatteryBackup, solar sizing) so results stay consistent
- Room-based Quick Add for homeowners (Living Room / Bedroom / Kitchen / Bathroom / Water)

Return the following files:

─── FILE 1: src/lib/engineering/appliance-database.ts ───

// src/lib/engineering/appliance-database.ts
// Single source of truth for all appliance wattage data.
// To add/edit appliances, ONLY touch this file — calculator logic never changes.
// Wattages follow standard Indian household appliance ratings (typical values).

export type ApplianceCategory =
  | "Cooling"
  | "Lighting"
  | "Entertainment"
  | "Kitchen"
  | "Laundry"
  | "Computers"
  | "Water & Heating"
  | "Miscellaneous"
  | "Office"
  | "Commercial"
  | "Industrial";

export type Segment = "household" | "office" | "commercial" | "industrial";

export type Room = "Living Room" | "Bedroom" | "Kitchen" | "Bathroom" | "Water" | "Office" | "Shop";

export interface ApplianceDef {
  id: string;               // stable unique key — never rename once shipped
  name: string;             // display name
  watts: number;            // default rated wattage (W)
  category: ApplianceCategory;
  segment: Segment;
  isMotor?: boolean;        // motors get surge factor in inverter sizing
  defaultHours: number;     // typical running hours per day (prefilled)
  rooms?: Room[];           // rooms where this appliance appears in Quick Add
}

export const APPLIANCE_DATABASE: ApplianceDef[] = [
  // ─── HOUSEHOLD · Cooling ───
  { id: "ac-1t",       name: "1 Ton Inverter AC",        watts: 1100, category: "Cooling", segment: "household", isMotor: true, defaultHours: 8,  rooms: ["Bedroom", "Living Room"] },
  { id: "ac-1_5t",     name: "1.5 Ton Inverter AC",      watts: 1500, category: "Cooling", segment: "household", isMotor: true, defaultHours: 8,  rooms: ["Bedroom", "Living Room"] },
  { id: "ac-2t",       name: "2 Ton Inverter AC",        watts: 2000, category: "Cooling", segment: "household", isMotor: true, defaultHours: 8,  rooms: ["Living Room"] },
  { id: "air-cooler",  name: "Air Cooler",               watts: 200,  category: "Cooling", segment: "household", isMotor: true, defaultHours: 10, rooms: ["Bedroom", "Living Room"] },
  { id: "ceiling-fan", name: "Ceiling Fan",              watts: 75,   category: "Cooling", segment: "household", isMotor: true, defaultHours: 12, rooms: ["Living Room", "Bedroom", "Kitchen"] },
  { id: "exhaust-fan", name: "Exhaust Fan",              watts: 40,   category: "Cooling", segment: "household", isMotor: true, defaultHours: 4,  rooms: ["Kitchen", "Bathroom"] },
  { id: "table-fan",   name: "Table Fan",                watts: 50,   category: "Cooling", segment: "household", isMotor: true, defaultHours: 8,  rooms: ["Bedroom", "Living Room"] },

  // ─── HOUSEHOLD · Lighting ───
  { id: "led-9w",      name: "LED Bulb 9W",              watts: 9,    category: "Lighting", segment: "household", defaultHours: 6, rooms: ["Living Room", "Bedroom", "Kitchen", "Bathroom"] },
  { id: "led-12w",     name: "LED Bulb 12W",             watts: 12,   category: "Lighting", segment: "household", defaultHours: 6, rooms: ["Living Room", "Bedroom", "Kitchen", "Bathroom"] },
  { id: "tube-light",  name: "Tube Light",               watts: 36,   category: "Lighting", segment: "household", defaultHours: 6, rooms: ["Living Room", "Bedroom", "Kitchen"] },
  { id: "led-panel",   name: "LED Panel Light",          watts: 18,   category: "Lighting", segment: "household", defaultHours: 6, rooms: ["Living Room", "Bedroom", "Office"] },
  { id: "outdoor-light", name: "Outdoor Light",          watts: 30,   category: "Lighting", segment: "household", defaultHours: 10 },

  // ─── HOUSEHOLD · Entertainment ───
  { id: "tv-32",       name: 'LED TV 32"',               watts: 50,   category: "Entertainment", segment: "household", defaultHours: 5, rooms: ["Bedroom", "Living Room"] },
  { id: "tv-43",       name: 'LED TV 43"',               watts: 80,   category: "Entertainment", segment: "household", defaultHours: 5, rooms: ["Living Room", "Bedroom"] },
  { id: "tv-55",       name: 'LED TV 55"',               watts: 120,  category: "Entertainment", segment: "household", defaultHours: 5, rooms: ["Living Room"] },
  { id: "smart-tv",    name: "Smart TV",                 watts: 100,  category: "Entertainment", segment: "household", defaultHours: 5, rooms: ["Living Room", "Bedroom"] },
  { id: "home-theatre", name: "Home Theatre",            watts: 150,  category: "Entertainment", segment: "household", defaultHours: 3, rooms: ["Living Room"] },
  { id: "set-top-box", name: "Set Top Box",              watts: 15,   category: "Entertainment", segment: "household", defaultHours: 8, rooms: ["Living Room", "Bedroom"] },

  // ─── HOUSEHOLD · Kitchen ───
  { id: "fridge-single", name: "Refrigerator (Single Door)", watts: 150, category: "Kitchen", segment: "household", isMotor: true, defaultHours: 24, rooms: ["Kitchen"] },
  { id: "fridge-double", name: "Refrigerator (Double Door)", watts: 250, category: "Kitchen", segment: "household", isMotor: true, defaultHours: 24, rooms: ["Kitchen"] },
  { id: "deep-freezer",  name: "Deep Freezer",           watts: 200,  category: "Kitchen", segment: "household", isMotor: true, defaultHours: 24, rooms: ["Kitchen"] },
  { id: "microwave",   name: "Microwave",                watts: 1200, category: "Kitchen", segment: "household", defaultHours: 0.5, rooms: ["Kitchen"] },
  { id: "induction",   name: "Induction Cooktop",        watts: 1800, category: "Kitchen", segment: "household", defaultHours: 1.5, rooms: ["Kitchen"] },
  { id: "mixer",       name: "Mixer Grinder",            watts: 500,  category: "Kitchen", segment: "household", isMotor: true, defaultHours: 0.5, rooms: ["Kitchen"] },
  { id: "kettle",      name: "Electric Kettle",          watts: 1500, category: "Kitchen", segment: "household", defaultHours: 0.5, rooms: ["Kitchen"] },
  { id: "purifier",    name: "Water Purifier",           watts: 60,   category: "Kitchen", segment: "household", defaultHours: 2, rooms: ["Kitchen"] },
  { id: "chimney",     name: "Chimney",                  watts: 150,  category: "Kitchen", segment: "household", isMotor: true, defaultHours: 1, rooms: ["Kitchen"] },

  // ─── HOUSEHOLD · Laundry ───
  { id: "washing-machine", name: "Washing Machine",      watts: 500,  category: "Laundry", segment: "household", isMotor: true, defaultHours: 1 },
  { id: "dryer",       name: "Dryer",                    watts: 2000, category: "Laundry", segment: "household", defaultHours: 1 },
  { id: "iron",        name: "Iron",                     watts: 1000, category: "Laundry", segment: "household", defaultHours: 0.5 },

  // ─── HOUSEHOLD · Computers ───
  { id: "laptop",      name: "Laptop",                   watts: 65,   category: "Computers", segment: "household", defaultHours: 6, rooms: ["Bedroom", "Living Room", "Office"] },
  { id: "desktop",     name: "Desktop Computer",         watts: 200,  category: "Computers", segment: "household", defaultHours: 6, rooms: ["Bedroom", "Office"] },
  { id: "wifi-router", name: "WiFi Router",              watts: 15,   category: "Computers", segment: "household", defaultHours: 24, rooms: ["Living Room", "Bedroom", "Office"] },
  { id: "printer-home", name: "Printer",                 watts: 50,   category: "Computers", segment: "household", defaultHours: 0.5, rooms: ["Office"] },

  // ─── HOUSEHOLD · Water & Heating ───
  { id: "pump-0_5hp",  name: "0.5 HP Water Pump",        watts: 375,  category: "Water & Heating", segment: "household", isMotor: true, defaultHours: 1, rooms: ["Water"] },
  { id: "pump-1hp",    name: "1 HP Water Pump",          watts: 750,  category: "Water & Heating", segment: "household", isMotor: true, defaultHours: 1, rooms: ["Water"] },
  { id: "pump-2hp",    name: "2 HP Water Pump",          watts: 1500, category: "Water & Heating", segment: "household", isMotor: true, defaultHours: 1, rooms: ["Water"] },
  { id: "geyser",      name: "Geyser / Water Heater",    watts: 2000, category: "Water & Heating", segment: "household", defaultHours: 1, rooms: ["Bathroom"] },

  // ─── HOUSEHOLD · Miscellaneous ───
  { id: "mobile-charger", name: "Mobile Charger",        watts: 10,   category: "Miscellaneous", segment: "household", defaultHours: 3, rooms: ["Bedroom", "Living Room"] },
  { id: "cctv",        name: "CCTV Camera",              watts: 15,   category: "Miscellaneous", segment: "household", defaultHours: 24 },
  { id: "door-bell",   name: "Door Bell",                watts: 5,    category: "Miscellaneous", segment: "household", defaultHours: 0.2 },
  { id: "vacuum",      name: "Vacuum Cleaner",           watts: 1200, category: "Miscellaneous", segment: "household", isMotor: true, defaultHours: 0.5 },

  // ─── OFFICE ───
  { id: "office-desktop", name: "Desktop Computer (Office)", watts: 250, category: "Office", segment: "office", defaultHours: 8, rooms: ["Office"] },
  { id: "office-laptop",  name: "Laptop (Office)",       watts: 65,   category: "Office", segment: "office", defaultHours: 8, rooms: ["Office"] },
  { id: "office-printer", name: "Printer (Office)",      watts: 60,   category: "Office", segment: "office", defaultHours: 2, rooms: ["Office"] },
  { id: "photocopier", name: "Photocopier",              watts: 1000, category: "Office", segment: "office", defaultHours: 2, rooms: ["Office"] },
  { id: "server",      name: "Server",                   watts: 500,  category: "Office", segment: "office", defaultHours: 24, rooms: ["Office"] },
  { id: "office-router", name: "Router (Office)",        watts: 20,   category: "Office", segment: "office", defaultHours: 24, rooms: ["Office"] },
  { id: "switch",      name: "Network Switch",           watts: 30,   category: "Office", segment: "office", defaultHours: 24, rooms: ["Office"] },
  { id: "office-ac",   name: "Air Conditioner (Office)", watts: 1500, category: "Office", segment: "office", isMotor: true, defaultHours: 8, rooms: ["Office"] },
  { id: "conf-display", name: "Conference Display",      watts: 150,  category: "Office", segment: "office", defaultHours: 4, rooms: ["Office"] },
  { id: "coffee-machine", name: "Coffee Machine",        watts: 1000, category: "Office", segment: "office", defaultHours: 1, rooms: ["Office"] },

  // ─── COMMERCIAL ───
  { id: "shop-lighting", name: "Shop Lighting (per fixture)", watts: 40, category: "Commercial", segment: "commercial", defaultHours: 10, rooms: ["Shop"] },
  { id: "pos-system",  name: "POS System",               watts: 100,  category: "Commercial", segment: "commercial", defaultHours: 10, rooms: ["Shop"] },
  { id: "display-fridge", name: "Display Refrigerator",  watts: 300,  category: "Commercial", segment: "commercial", isMotor: true, defaultHours: 24, rooms: ["Shop"] },
  { id: "comm-freezer", name: "Commercial Freezer",      watts: 500,  category: "Commercial", segment: "commercial", isMotor: true, defaultHours: 24, rooms: ["Shop"] },
  { id: "sign-board",  name: "Sign Board",               watts: 100,  category: "Commercial", segment: "commercial", defaultHours: 8, rooms: ["Shop"] },
  { id: "cash-counter", name: "Cash Counter",            watts: 50,   category: "Commercial", segment: "commercial", defaultHours: 10, rooms: ["Shop"] },
  { id: "cctv-comm",   name: "CCTV (Commercial)",        watts: 15,   category: "Commercial", segment: "commercial", defaultHours: 24, rooms: ["Shop"] },

  // ─── INDUSTRIAL ───
  { id: "motor-3ph",   name: "3 Phase Motor",            watts: 3000, category: "Industrial", segment: "industrial", isMotor: true, defaultHours: 8 },
  { id: "compressor",  name: "Compressor",               watts: 2200, category: "Industrial", segment: "industrial", isMotor: true, defaultHours: 6 },
  { id: "hydraulic-pump", name: "Hydraulic Pump",        watts: 3000, category: "Industrial", segment: "industrial", isMotor: true, defaultHours: 6 },
  { id: "lathe",       name: "Lathe Machine",            watts: 2200, category: "Industrial", segment: "industrial", isMotor: true, defaultHours: 6 },
  { id: "drill-machine", name: "Drill Machine",          watts: 750,  category: "Industrial", segment: "industrial", isMotor: true, defaultHours: 4 },
  { id: "cnc",         name: "CNC Machine",              watts: 5000, category: "Industrial", segment: "industrial", isMotor: true, defaultHours: 8 },
  { id: "welding",     name: "Welding Machine",          watts: 5000, category: "Industrial", segment: "industrial", defaultHours: 4 },
  { id: "air-compressor", name: "Air Compressor",        watts: 2200, category: "Industrial", segment: "industrial", isMotor: true, defaultHours: 6 },
];

// ─── Room Quick-Add presets (homeowner mode) ───
// Maps a room to the appliance ids shown as one-tap add buttons.
export const ROOM_QUICK_ADD: { room: Room; emoji: string; applianceIds: string[] }[] = [
  { room: "Living Room", emoji: "🛋️", applianceIds: ["tv-43", "ceiling-fan", "led-9w", "ac-1_5t", "set-top-box", "wifi-router"] },
  { room: "Bedroom",     emoji: "🛏️", applianceIds: ["ac-1_5t", "ceiling-fan", "led-9w", "tv-32", "mobile-charger"] },
  { room: "Kitchen",     emoji: "🍳", applianceIds: ["fridge-double", "microwave", "mixer", "led-9w", "exhaust-fan", "purifier"] },
  { room: "Bathroom",    emoji: "🚿", applianceIds: ["geyser", "exhaust-fan", "led-9w"] },
  { room: "Water",       emoji: "💧", applianceIds: ["pump-0_5hp", "pump-1hp", "pump-2hp"] },
];

// ─── Lookup helpers ───
export function getAppliance(id: string): ApplianceDef | undefined {
  return APPLIANCE_DATABASE.find((a) => a.id === id);
}

export function getAppliancesBySegment(segment: Segment): ApplianceDef[] {
  return APPLIANCE_DATABASE.filter((a) => a.segment === segment);
}

export function getAppliancesByCategory(segment: Segment): Record<string, ApplianceDef[]> {
  const grouped: Record<string, ApplianceDef[]> = {};
  for (const app of APPLIANCE_DATABASE.filter((a) => a.segment === segment)) {
    if (!grouped[app.category]) grouped[app.category] = [];
    grouped[app.category].push(app);
  }
  return grouped;
}

─── FILE 2: src/lib/engineering/calculations/load-builder.ts ───

// src/lib/engineering/calculations/load-builder.ts
// Calculation engine for the Smart Appliance Load Builder.
// Pure functions — no UI. Reuses constants and sizing helpers from the existing hub.

import { ENGINEERING_CONSTANTS, getPeakSunHours, roundToStandardSize } from "../constants";
import { getAppliance } from "../appliance-database";

export interface SelectedAppliance {
  applianceId: string;   // id from APPLIANCE_DATABASE
  quantity: number;
  hoursPerDay: number;   // running hours per day
  wattageOverride?: number; // set only in Advanced Mode when user edits watts
}

export interface LoadBuilderInputs {
  appliances: SelectedAppliance[];
  state?: string;              // for solar recommendation (peak sun hours)
  backupHours?: number;        // for battery recommendation (default 4)
  diversityFactor?: number;    // running-load estimate (default 0.75)
  futureExpansion?: "none" | "low" | "high"; // inverter headroom (default "low")
}

export interface ApplianceLineResult {
  applianceId: string;
  name: string;
  quantity: number;
  hoursPerDay: number;
  watts: number;           // effective wattage (override or database default)
  isMotor: boolean;
  connectedLoad: number;   // watts × qty
  dailyEnergy: number;     // kWh/day
  surgeLoad: number;       // connected × surgeFactor if motor, else connected
}

export interface LoadBuilderStep {
  label: string;
  value: string;
  unit?: string;
}

export interface LoadBuilderResult {
  lines: ApplianceLineResult[];
  totalConnectedLoad: number;      // W
  estimatedRunningLoad: number;    // W (connected × diversity)
  peakSurgeLoad: number;           // W (motor surge accounted)
  dailyEnergyConsumption: number;  // kWh
  recommendedInverterKva: number;
  recommendedBatteryKwh: number;
  recommendedSolarKw: number;
  steps: LoadBuilderStep[];
}

export function calculateLoadBuilder(inputs: LoadBuilderInputs): LoadBuilderResult {
  const {
    appliances,
    state,
    backupHours = 4,
    diversityFactor = 0.75,
    futureExpansion = "low",
  } = inputs;

  const surgeFactor = ENGINEERING_CONSTANTS.inverter.surgeFactor;
  const powerFactor = ENGINEERING_CONSTANTS.inverter.powerFactor;
  const futureFactor = ENGINEERING_CONSTANTS.inverter.futureExpansion[futureExpansion];

  // ── Per-appliance line items ──
  const lines: ApplianceLineResult[] = appliances
    .map((sel) => {
      const def = getAppliance(sel.applianceId);
      if (!def || sel.quantity <= 0) return null;
      const watts = sel.wattageOverride ?? def.watts;
      const connectedLoad = watts * sel.quantity;
      return {
        applianceId: def.id,
        name: def.name,
        quantity: sel.quantity,
        hoursPerDay: sel.hoursPerDay,
        watts,
        isMotor: def.isMotor ?? false,
        connectedLoad,
        dailyEnergy: (connectedLoad * sel.hoursPerDay) / 1000,
        surgeLoad: def.isMotor ? connectedLoad * surgeFactor : connectedLoad,
      };
    })
    .filter((l): l is ApplianceLineResult => l !== null);

  // ── Totals ──
  const totalConnectedLoad = lines.reduce((s, l) => s + l.connectedLoad, 0);
  const dailyEnergyConsumption = lines.reduce((s, l) => s + l.dailyEnergy, 0);
  const peakSurgeLoad = lines.reduce((s, l) => s + l.surgeLoad, 0);
  const estimatedRunningLoad = totalConnectedLoad * diversityFactor;

  // ── Recommended Inverter (same logic as inverter-sizing calculator) ──
  const inverterBase = Math.max(estimatedRunningLoad, peakSurgeLoad) * futureFactor;
  const requiredKva = inverterBase / powerFactor / 1000;
  const recommendedInverterKva = totalConnectedLoad > 0
    ? roundToStandardSize(requiredKva, ENGINEERING_CONSTANTS.inverter.standardSizes)
    : 0;

  // ── Recommended Battery (LiFePO4, same logic as battery-backup calculator) ──
  const batt = ENGINEERING_CONSTANTS.battery.lifepo4;
  // Battery sized on the running load for the requested backup duration
  const backupEnergyWh = estimatedRunningLoad * backupHours;
  const requiredWh = backupEnergyWh / (batt.dod * batt.efficiency);
  const recommendedBatteryKwh = estimatedRunningLoad > 0
    ? roundToStandardSize(requiredWh / 1000, ENGINEERING_CONSTANTS.battery.standardCapacitiesKwh)
    : 0;

  // ── Recommended Solar (same logic as solar-sizing calculator) ──
  const psh = state ? getPeakSunHours(state) : 5.0;
  const pr = ENGINEERING_CONSTANTS.solar.defaultPerformanceRatio
    * (1 - ENGINEERING_CONSTANTS.solar.defaultTemperatureLoss)
    * (1 - ENGINEERING_CONSTANTS.solar.defaultDustLoss);
  const rawSolarKw = dailyEnergyConsumption / (psh * pr);
  const recommendedSolarKw = dailyEnergyConsumption > 0
    ? roundToStandardSize(rawSolarKw, ENGINEERING_CONSTANTS.solar.standardSizes)
    : 0;

  const steps: LoadBuilderStep[] = [
    { label: "Total Connected Load", value: totalConnectedLoad.toFixed(0), unit: "W" },
    { label: "Diversity Factor", value: diversityFactor.toFixed(2), unit: "" },
    { label: "Estimated Running Load", value: estimatedRunningLoad.toFixed(0), unit: "W" },
    { label: "Peak Surge Load (motor starting)", value: peakSurgeLoad.toFixed(0), unit: "W" },
    { label: "Daily Energy Consumption", value: dailyEnergyConsumption.toFixed(1), unit: "kWh" },
    { label: "Inverter: base load × headroom ÷ PF", value: requiredKva.toFixed(2), unit: "kVA" },
    { label: "Recommended Inverter", value: recommendedInverterKva.toString(), unit: "kVA" },
    { label: `Battery: ${backupHours}h backup, LiFePO4 (DoD ${batt.dod * 100}%)`, value: recommendedBatteryKwh.toString(), unit: "kWh" },
    { label: `Solar: ${psh.toFixed(1)} peak sun hours, PR ${pr.toFixed(2)}`, value: rawSolarKw.toFixed(2), unit: "kW" },
    { label: "Recommended Solar Capacity", value: recommendedSolarKw.toString(), unit: "kW" },
  ];

  return {
    lines,
    totalConnectedLoad,
    estimatedRunningLoad,
    peakSurgeLoad,
    dailyEnergyConsumption,
    recommendedInverterKva,
    recommendedBatteryKwh,
    recommendedSolarKw,
    steps,
  };
}

─── FILE 3: src/components/engineering/SmartLoadBuilder.tsx ───

// src/components/engineering/SmartLoadBuilder.tsx
// Homeowner-friendly appliance load builder.
// Users pick appliances + quantity + hours — no watt knowledge required.
// Advanced Mode unlocks manual wattage editing.

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ChevronDown, ChevronUp, Pencil } from "lucide-react";
import {
  APPLIANCE_DATABASE,
  ROOM_QUICK_ADD,
  getAppliancesByCategory,
  getAppliance,
  type Segment,
} from "@/lib/engineering/appliance-database";
import {
  calculateLoadBuilder,
  type SelectedAppliance,
} from "@/lib/engineering/calculations/load-builder";
import { ENGINEERING_CONSTANTS } from "@/lib/engineering/constants";
import { CalculationSteps } from "@/components/engineering/CalculationSteps";

const SEGMENTS: { id: Segment; label: string }[] = [
  { id: "household", label: "Household" },
  { id: "office", label: "Office" },
  { id: "commercial", label: "Commercial" },
  { id: "industrial", label: "Industrial" },
];

const STATES = Object.keys(ENGINEERING_CONSTANTS.solar.peakSunHours);

export function SmartLoadBuilder() {
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  const [segment, setSegment] = useState<Segment>("household");
  const [selections, setSelections] = useState<Record<string, SelectedAppliance>>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Cooling");
  const [state, setState] = useState<string>("Uttar Pradesh");
  const [backupHours, setBackupHours] = useState<number>(4);

  const selectedList = useMemo(() => Object.values(selections), [selections]);

  const result = useMemo(
    () =>
      calculateLoadBuilder({
        appliances: selectedList,
        state,
        backupHours,
        futureExpansion: "low",
      }),
    [selectedList, state, backupHours]
  );

  // ─── Selection helpers ───
  const addAppliance = (id: string) => {
    const def = getAppliance(id);
    if (!def) return;
    setSelections((prev) =>
      prev[id]
        ? { ...prev, [id]: { ...prev[id], quantity: prev[id].quantity + 1 } }
        : { ...prev, [id]: { applianceId: id, quantity: 1, hoursPerDay: def.defaultHours } }
    );
  };

  const updateSelection = (id: string, patch: Partial<SelectedAppliance>) => {
    setSelections((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id], ...patch } } : prev));
  };

  const removeAppliance = (id: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const categories = getAppliancesByCategory(segment);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* ═══════════ LEFT: Picker ═══════════ */}
      <div>
        {/* Basic / Advanced toggle */}
        <div className="mb-6 inline-flex rounded-lg border border-border p-1">
          {(["basic", "advanced"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors",
                mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m}
            </button>
          ))}
        </div>
        {mode === "advanced" && (
          <p className="mb-4 rounded-lg bg-muted/50 px-4 py-2 text-xs text-muted-foreground">
            Advanced Mode: wattage values become editable. Defaults follow standard Indian appliance ratings.
          </p>
        )}

        {/* Segment tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {SEGMENTS.map((s) => (
            <button
              key={s.id}
              onClick={() => { setSegment(s.id); setExpandedCategory(null); }}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                segment === s.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Room Quick Add (household only) */}
        {segment === "household" && (
          <div className="mb-8 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Quick Add by Room
            </h3>
            {ROOM_QUICK_ADD.map(({ room, emoji, applianceIds }) => (
              <div key={room} className="flex flex-wrap items-center gap-2">
                <span className="w-32 text-sm font-medium">
                  {emoji} {room}
                </span>
                {applianceIds.map((id) => {
                  const def = getAppliance(id);
                  if (!def) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => addAppliance(id)}
                      className="rounded-full border border-border bg-card px-3 py-1 text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      [+] {def.name.replace(/ \(.*\)| \d+W|'|"/g, "").replace("Inverter ", "").trim()}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* Category accordions */}
        <div className="space-y-3">
          {Object.entries(categories).map(([category, apps]) => {
            const open = expandedCategory === category;
            return (
              <div key={category} className="rounded-xl border border-border bg-card">
                <button
                  onClick={() => setExpandedCategory(open ? null : category)}
                  className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold"
                >
                  {category}
                  {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {open && (
                  <div className="grid gap-2 border-t border-border p-4 sm:grid-cols-2">
                    {apps.map((app) => {
                      const sel = selections[app.id];
                      return (
                        <div
                          key={app.id}
                          className={cn(
                            "flex items-center justify-between rounded-lg border px-3 py-2 text-sm",
                            sel ? "border-primary bg-primary/5" : "border-border"
                          )}
                        >
                          <div>
                            <div className="font-medium">{app.name}</div>
                            <div className="text-xs text-muted-foreground">{app.watts} W</div>
                          </div>
                          {sel ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() =>
                                  sel.quantity <= 1
                                    ? removeAppliance(app.id)
                                    : updateSelection(app.id, { quantity: sel.quantity - 1 })
                                }
                                className="rounded-md border border-border p-1 hover:bg-muted"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center font-semibold">{sel.quantity}</span>
                              <button
                                onClick={() => addAppliance(app.id)}
                                className="rounded-md border border-border p-1 hover:bg-muted"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => addAppliance(app.id)}>
                              + Add
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════ RIGHT: Running Summary ═══════════ */}
      <div className="lg:sticky lg:top-4 lg:self-start">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="mb-4 text-lg font-semibold">Selected Appliances</h3>

          {result.lines.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No appliances selected yet. Tap [+] on any appliance to begin.
            </p>
          )}

          <div className="space-y-3">
            {result.lines.map((line) => {
              const sel = selections[line.applianceId];
              return (
                <div key={line.applianceId} className="rounded-lg bg-muted/50 p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      {line.quantity} × {line.name}
                    </span>
                    <button onClick={() => removeAppliance(line.applianceId)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                    {/* Hours editor */}
                    <label className="flex items-center gap-1">
                      hrs/day
                      <Input
                        type="number"
                        min={0}
                        max={24}
                        step={0.5}
                        value={sel?.hoursPerDay ?? 0}
                        onChange={(e) =>
                          updateSelection(line.applianceId, { hoursPerDay: Math.min(24, Math.max(0, Number(e.target.value))) })
                        }
                        className="h-7 w-16 px-1 text-xs"
                      />
                    </label>

                    {/* Wattage: read-only in basic, editable in advanced */}
                    {mode === "advanced" ? (
                      <label className="flex items-center gap-1">
                        <Pencil className="h-3 w-3" />
                        <Input
                          type="number"
                          min={1}
                          value={sel?.wattageOverride ?? line.watts}
                          onChange={(e) =>
                            updateSelection(line.applianceId, { wattageOverride: Math.max(1, Number(e.target.value)) })
                          }
                          className="h-7 w-20 px-1 text-xs"
                        />
                        W
                      </label>
                    ) : (
                      <span>{line.watts} W</span>
                    )}

                    <span className="ml-auto font-medium text-foreground">
                      {line.dailyEnergy.toFixed(2)} kWh/day
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          {result.lines.length > 0 && (
            <>
              <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                <SummaryRow label="Total Connected Load" value={`${result.totalConnectedLoad.toLocaleString()} W`} />
                <SummaryRow label="Estimated Running Load" value={`${result.estimatedRunningLoad.toFixed(0)} W`} />
                <SummaryRow label="Daily Energy Consumption" value={`${result.dailyEnergyConsumption.toFixed(1)} kWh`} highlight />
              </div>

              {/* Settings for recommendations */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <label className="space-y-1">
                  <span className="text-muted-foreground">State (for solar)</span>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-2 py-1.5"
                  >
                    {STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="text-muted-foreground">Backup hours</span>
                  <Input
                    type="number"
                    min={1}
                    max={24}
                    value={backupHours}
                    onChange={(e) => setBackupHours(Math.max(1, Number(e.target.value)))}
                    className="h-8"
                  />
                </label>
              </div>

              {/* Recommendations */}
              <div className="mt-4 space-y-2 rounded-lg bg-primary/5 p-4 text-sm">
                <SummaryRow label="Recommended Inverter" value={`${result.recommendedInverterKva} kVA`} highlight />
                <SummaryRow label="Recommended Battery" value={`${result.recommendedBatteryKwh} kWh`} highlight />
                <SummaryRow label="Recommended Solar Capacity" value={`${result.recommendedSolarKw} kW`} highlight />
              </div>

              <div className="mt-4">
                <CalculationSteps steps={result.steps} />
              </div>
            </>
          )}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Wattage defaults are standard engineering estimates for typical Indian appliances. Actual ratings
          vary by model — check the appliance nameplate. Final system design should be verified by a
          qualified engineer.
        </p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-semibold", highlight && "text-primary")}>{value}</span>
    </div>
  );
}

─── FILE 4: src/pages/engineering-tools/load-calculator.tsx ───

// src/pages/engineering-tools/load-calculator.tsx
// Standalone page hosting the Smart Appliance Load Builder

import { SmartLoadBuilder } from "@/components/engineering/SmartLoadBuilder";

export default function LoadCalculatorPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Home Load Calculator</h1>
        <p className="mt-2 text-muted-foreground">
          Select your appliances — we handle the wattage. Get instant inverter, battery,
          and solar recommendations.
        </p>
      </div>
      <SmartLoadBuilder />
    </div>
  );
}

─── FILE 5: Update src/pages/engineering-tools/index.tsx ───

Add this card to the `calculators` array (place it FIRST — it's the entry point for homeowners):

  {
    id: "load-calculator",
    title: "Home Load Calculator",
    description: "Select appliances, get instant inverter, battery & solar sizing. No wattage knowledge needed.",
    icon: Home,   // add `Home` to the lucide-react import
    href: "/engineering-tools/load-calculator",
  },

─── FILE 6: Update src/pages/engineering-tools/battery-backup.tsx ───

Replace the manual watt-entry form with the SmartLoadBuilder in "builder" mode:

1. Import: `import { SmartLoadBuilder } from "@/components/engineering/SmartLoadBuilder";`
2. In Basic mode, render `<SmartLoadBuilder />` instead of the wattage input table.
3. Keep the existing Advanced mode (manual watts + reserve margin) unchanged.
4. The builder's "Recommended Battery" already uses the same
   calculateBatteryBackup() logic — results stay consistent.

─── FILE 7: Update src/pages/engineering-tools/inverter-sizing.tsx ───

Same pattern:
1. Basic mode → `<SmartLoadBuilder />` (inverter recommendation included).
2. Advanced mode → existing manual form with power factor / surge / diversity controls.

─── ROUTING ───

Add the route (wouter):
  <Route path="/engineering-tools/load-calculator" component={LoadCalculatorPage} />
