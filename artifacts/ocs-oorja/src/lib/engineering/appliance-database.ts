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
  id: string;
  name: string;
  watts: number;
  category: ApplianceCategory;
  segment: Segment;
  isMotor?: boolean;
  defaultHours: number;
  rooms?: Room[];
}

export const APPLIANCE_DATABASE: ApplianceDef[] = [
  { id: "ac-1t",          name: "1 Ton Inverter AC",              watts: 1100, category: "Cooling",          segment: "household", isMotor: true,  defaultHours: 8,   rooms: ["Bedroom", "Living Room"] },
  { id: "ac-1_5t",        name: "1.5 Ton Inverter AC",            watts: 1500, category: "Cooling",          segment: "household", isMotor: true,  defaultHours: 8,   rooms: ["Bedroom", "Living Room"] },
  { id: "ac-2t",          name: "2 Ton Inverter AC",              watts: 2000, category: "Cooling",          segment: "household", isMotor: true,  defaultHours: 8,   rooms: ["Living Room"] },
  { id: "air-cooler",     name: "Air Cooler",                     watts: 200,  category: "Cooling",          segment: "household", isMotor: true,  defaultHours: 10,  rooms: ["Bedroom", "Living Room"] },
  { id: "ceiling-fan",    name: "Ceiling Fan",                    watts: 75,   category: "Cooling",          segment: "household", isMotor: true,  defaultHours: 12,  rooms: ["Living Room", "Bedroom", "Kitchen"] },
  { id: "exhaust-fan",    name: "Exhaust Fan",                    watts: 40,   category: "Cooling",          segment: "household", isMotor: true,  defaultHours: 4,   rooms: ["Kitchen", "Bathroom"] },
  { id: "table-fan",      name: "Table Fan",                      watts: 50,   category: "Cooling",          segment: "household", isMotor: true,  defaultHours: 8,   rooms: ["Bedroom", "Living Room"] },
  { id: "led-9w",         name: "LED Bulb 9W",                    watts: 9,    category: "Lighting",         segment: "household", defaultHours: 6,   rooms: ["Living Room", "Bedroom", "Kitchen", "Bathroom"] },
  { id: "led-12w",        name: "LED Bulb 12W",                   watts: 12,   category: "Lighting",         segment: "household", defaultHours: 6,   rooms: ["Living Room", "Bedroom", "Kitchen", "Bathroom"] },
  { id: "tube-light",     name: "Tube Light",                     watts: 36,   category: "Lighting",         segment: "household", defaultHours: 6,   rooms: ["Living Room", "Bedroom", "Kitchen"] },
  { id: "led-panel",      name: "LED Panel Light",                watts: 18,   category: "Lighting",         segment: "household", defaultHours: 6,   rooms: ["Living Room", "Bedroom", "Office"] },
  { id: "outdoor-light",  name: "Outdoor Light",                  watts: 30,   category: "Lighting",         segment: "household", defaultHours: 10 },
  { id: "tv-32",          name: 'LED TV 32"',                     watts: 50,   category: "Entertainment",    segment: "household", defaultHours: 5,   rooms: ["Bedroom", "Living Room"] },
  { id: "tv-43",          name: 'LED TV 43"',                     watts: 80,   category: "Entertainment",    segment: "household", defaultHours: 5,   rooms: ["Living Room", "Bedroom"] },
  { id: "tv-55",          name: 'LED TV 55"',                     watts: 120,  category: "Entertainment",    segment: "household", defaultHours: 5,   rooms: ["Living Room"] },
  { id: "smart-tv",       name: "Smart TV",                       watts: 100,  category: "Entertainment",    segment: "household", defaultHours: 5,   rooms: ["Living Room", "Bedroom"] },
  { id: "home-theatre",   name: "Home Theatre",                   watts: 150,  category: "Entertainment",    segment: "household", defaultHours: 3,   rooms: ["Living Room"] },
  { id: "set-top-box",    name: "Set Top Box",                    watts: 15,   category: "Entertainment",    segment: "household", defaultHours: 8,   rooms: ["Living Room", "Bedroom"] },
  { id: "fridge-single",  name: "Refrigerator (Single Door)",     watts: 150,  category: "Kitchen",          segment: "household", isMotor: true,  defaultHours: 24,  rooms: ["Kitchen"] },
  { id: "fridge-double",  name: "Refrigerator (Double Door)",     watts: 250,  category: "Kitchen",          segment: "household", isMotor: true,  defaultHours: 24,  rooms: ["Kitchen"] },
  { id: "deep-freezer",   name: "Deep Freezer",                   watts: 200,  category: "Kitchen",          segment: "household", isMotor: true,  defaultHours: 24,  rooms: ["Kitchen"] },
  { id: "microwave",      name: "Microwave",                      watts: 1200, category: "Kitchen",          segment: "household", defaultHours: 0.5, rooms: ["Kitchen"] },
  { id: "induction",      name: "Induction Cooktop",              watts: 1800, category: "Kitchen",          segment: "household", defaultHours: 1.5, rooms: ["Kitchen"] },
  { id: "mixer",          name: "Mixer Grinder",                  watts: 500,  category: "Kitchen",          segment: "household", isMotor: true,  defaultHours: 0.5, rooms: ["Kitchen"] },
  { id: "kettle",         name: "Electric Kettle",                watts: 1500, category: "Kitchen",          segment: "household", defaultHours: 0.5, rooms: ["Kitchen"] },
  { id: "purifier",       name: "Water Purifier",                 watts: 60,   category: "Kitchen",          segment: "household", defaultHours: 2,   rooms: ["Kitchen"] },
  { id: "chimney",        name: "Chimney",                        watts: 150,  category: "Kitchen",          segment: "household", isMotor: true,  defaultHours: 1,   rooms: ["Kitchen"] },
  { id: "washing-machine",name: "Washing Machine",                watts: 500,  category: "Laundry",          segment: "household", isMotor: true,  defaultHours: 1 },
  { id: "dryer",          name: "Dryer",                          watts: 2000, category: "Laundry",          segment: "household", defaultHours: 1 },
  { id: "iron",           name: "Iron",                           watts: 1000, category: "Laundry",          segment: "household", defaultHours: 0.5 },
  { id: "laptop",         name: "Laptop",                         watts: 65,   category: "Computers",        segment: "household", defaultHours: 6,   rooms: ["Bedroom", "Living Room", "Office"] },
  { id: "desktop",        name: "Desktop Computer",               watts: 200,  category: "Computers",        segment: "household", defaultHours: 6,   rooms: ["Bedroom", "Office"] },
  { id: "wifi-router",    name: "WiFi Router",                    watts: 15,   category: "Computers",        segment: "household", defaultHours: 24,  rooms: ["Living Room", "Bedroom", "Office"] },
  { id: "printer-home",   name: "Printer",                        watts: 50,   category: "Computers",        segment: "household", defaultHours: 0.5, rooms: ["Office"] },
  { id: "pump-0_5hp",     name: "0.5 HP Water Pump",              watts: 375,  category: "Water & Heating",  segment: "household", isMotor: true,  defaultHours: 1,   rooms: ["Water"] },
  { id: "pump-1hp",       name: "1 HP Water Pump",                watts: 750,  category: "Water & Heating",  segment: "household", isMotor: true,  defaultHours: 1,   rooms: ["Water"] },
  { id: "pump-2hp",       name: "2 HP Water Pump",                watts: 1500, category: "Water & Heating",  segment: "household", isMotor: true,  defaultHours: 1,   rooms: ["Water"] },
  { id: "geyser",         name: "Geyser / Water Heater",          watts: 2000, category: "Water & Heating",  segment: "household", defaultHours: 1,   rooms: ["Bathroom"] },
  { id: "mobile-charger", name: "Mobile Charger",                 watts: 10,   category: "Miscellaneous",    segment: "household", defaultHours: 3,   rooms: ["Bedroom", "Living Room"] },
  { id: "cctv",           name: "CCTV Camera",                    watts: 15,   category: "Miscellaneous",    segment: "household", defaultHours: 24 },
  { id: "door-bell",      name: "Door Bell",                      watts: 5,    category: "Miscellaneous",    segment: "household", defaultHours: 0.2 },
  { id: "vacuum",         name: "Vacuum Cleaner",                 watts: 1200, category: "Miscellaneous",    segment: "household", isMotor: true,  defaultHours: 0.5 },
  { id: "office-desktop", name: "Desktop Computer (Office)",      watts: 250,  category: "Office",           segment: "office",    defaultHours: 8,   rooms: ["Office"] },
  { id: "office-laptop",  name: "Laptop (Office)",                watts: 65,   category: "Office",           segment: "office",    defaultHours: 8,   rooms: ["Office"] },
  { id: "office-printer", name: "Printer (Office)",               watts: 60,   category: "Office",           segment: "office",    defaultHours: 2,   rooms: ["Office"] },
  { id: "photocopier",    name: "Photocopier",                    watts: 1000, category: "Office",           segment: "office",    defaultHours: 2,   rooms: ["Office"] },
  { id: "server",         name: "Server",                         watts: 500,  category: "Office",           segment: "office",    defaultHours: 24,  rooms: ["Office"] },
  { id: "office-router",  name: "Router (Office)",                watts: 20,   category: "Office",           segment: "office",    defaultHours: 24,  rooms: ["Office"] },
  { id: "switch",         name: "Network Switch",                 watts: 30,   category: "Office",           segment: "office",    defaultHours: 24,  rooms: ["Office"] },
  { id: "office-ac",      name: "Air Conditioner (Office)",       watts: 1500, category: "Office",           segment: "office",    isMotor: true,  defaultHours: 8,   rooms: ["Office"] },
  { id: "conf-display",   name: "Conference Display",             watts: 150,  category: "Office",           segment: "office",    defaultHours: 4,   rooms: ["Office"] },
  { id: "coffee-machine", name: "Coffee Machine",                 watts: 1000, category: "Office",           segment: "office",    defaultHours: 1,   rooms: ["Office"] },
  { id: "shop-lighting",  name: "Shop Lighting (per fixture)",    watts: 40,   category: "Commercial",       segment: "commercial",defaultHours: 10,  rooms: ["Shop"] },
  { id: "pos-system",     name: "POS System",                     watts: 100,  category: "Commercial",       segment: "commercial",defaultHours: 10,  rooms: ["Shop"] },
  { id: "display-fridge", name: "Display Refrigerator",           watts: 300,  category: "Commercial",       segment: "commercial",isMotor: true,  defaultHours: 24,  rooms: ["Shop"] },
  { id: "comm-freezer",   name: "Commercial Freezer",             watts: 500,  category: "Commercial",       segment: "commercial",isMotor: true,  defaultHours: 24,  rooms: ["Shop"] },
  { id: "sign-board",     name: "Sign Board",                     watts: 100,  category: "Commercial",       segment: "commercial",defaultHours: 8,   rooms: ["Shop"] },
  { id: "cash-counter",   name: "Cash Counter",                   watts: 50,   category: "Commercial",       segment: "commercial",defaultHours: 10,  rooms: ["Shop"] },
  { id: "cctv-comm",      name: "CCTV (Commercial)",              watts: 15,   category: "Commercial",       segment: "commercial",defaultHours: 24,  rooms: ["Shop"] },
  { id: "motor-3ph",      name: "3 Phase Motor",                  watts: 3000, category: "Industrial",       segment: "industrial",isMotor: true,  defaultHours: 8 },
  { id: "compressor",     name: "Compressor",                     watts: 2200, category: "Industrial",       segment: "industrial",isMotor: true,  defaultHours: 6 },
  { id: "hydraulic-pump", name: "Hydraulic Pump",                 watts: 3000, category: "Industrial",       segment: "industrial",isMotor: true,  defaultHours: 6 },
  { id: "lathe",          name: "Lathe Machine",                  watts: 2200, category: "Industrial",       segment: "industrial",isMotor: true,  defaultHours: 6 },
  { id: "drill-machine",  name: "Drill Machine",                  watts: 750,  category: "Industrial",       segment: "industrial",isMotor: true,  defaultHours: 4 },
  { id: "cnc",            name: "CNC Machine",                    watts: 5000, category: "Industrial",       segment: "industrial",isMotor: true,  defaultHours: 8 },
  { id: "welding",        name: "Welding Machine",                watts: 5000, category: "Industrial",       segment: "industrial",defaultHours: 4 },
  { id: "air-compressor", name: "Air Compressor",                 watts: 2200, category: "Industrial",       segment: "industrial",isMotor: true,  defaultHours: 6 },
];

export const POPULAR_APPLIANCE_IDS = [
  "ac-1_5t", "ceiling-fan", "fridge-single", "tv-43",
  "led-9w", "laptop", "pump-1hp", "wifi-router",
];

export const ROOM_QUICK_ADD: { room: Room; emoji: string; applianceIds: string[] }[] = [
  { room: "Living Room", emoji: "🛋️", applianceIds: ["tv-43", "ceiling-fan", "led-9w", "ac-1_5t", "set-top-box", "wifi-router"] },
  { room: "Bedroom",     emoji: "🛏️", applianceIds: ["ac-1_5t", "ceiling-fan", "led-9w", "tv-32", "mobile-charger"] },
  { room: "Kitchen",     emoji: "🍳", applianceIds: ["fridge-double", "microwave", "mixer", "led-9w", "exhaust-fan", "purifier"] },
  { room: "Bathroom",    emoji: "🚿", applianceIds: ["geyser", "exhaust-fan", "led-9w"] },
  { room: "Water",       emoji: "💧", applianceIds: ["pump-0_5hp", "pump-1hp", "pump-2hp"] },
];

export interface BhkPresetItem { applianceId: string; quantity: number; hoursPerDay: number }
export interface BhkPreset { id: string; label: string; emoji: string; items: BhkPresetItem[] }

export const BHK_PRESETS: BhkPreset[] = [
  {
    id: "1bhk", label: "1 BHK", emoji: "🏠",
    items: [
      { applianceId: "ac-1_5t",       quantity: 1,  hoursPerDay: 8 },
      { applianceId: "ceiling-fan",   quantity: 3,  hoursPerDay: 12 },
      { applianceId: "led-9w",        quantity: 6,  hoursPerDay: 6 },
      { applianceId: "fridge-single", quantity: 1,  hoursPerDay: 24 },
      { applianceId: "tv-43",         quantity: 1,  hoursPerDay: 4 },
      { applianceId: "wifi-router",   quantity: 1,  hoursPerDay: 24 },
      { applianceId: "pump-0_5hp",    quantity: 1,  hoursPerDay: 1 },
    ],
  },
  {
    id: "2bhk", label: "2 BHK", emoji: "🏠",
    items: [
      { applianceId: "ac-1_5t",        quantity: 2, hoursPerDay: 8 },
      { applianceId: "ceiling-fan",    quantity: 5, hoursPerDay: 12 },
      { applianceId: "led-9w",         quantity: 10, hoursPerDay: 6 },
      { applianceId: "fridge-double",  quantity: 1, hoursPerDay: 24 },
      { applianceId: "tv-43",          quantity: 1, hoursPerDay: 5 },
      { applianceId: "tv-32",          quantity: 1, hoursPerDay: 3 },
      { applianceId: "wifi-router",    quantity: 1, hoursPerDay: 24 },
      { applianceId: "washing-machine",quantity: 1, hoursPerDay: 1 },
      { applianceId: "pump-1hp",       quantity: 1, hoursPerDay: 1 },
    ],
  },
  {
    id: "3bhk", label: "3 BHK", emoji: "🏠",
    items: [
      { applianceId: "ac-1_5t",        quantity: 3, hoursPerDay: 8 },
      { applianceId: "ceiling-fan",    quantity: 7, hoursPerDay: 12 },
      { applianceId: "led-9w",         quantity: 14, hoursPerDay: 6 },
      { applianceId: "fridge-double",  quantity: 1, hoursPerDay: 24 },
      { applianceId: "tv-43",          quantity: 2, hoursPerDay: 5 },
      { applianceId: "tv-32",          quantity: 1, hoursPerDay: 3 },
      { applianceId: "wifi-router",    quantity: 1, hoursPerDay: 24 },
      { applianceId: "washing-machine",quantity: 1, hoursPerDay: 1 },
      { applianceId: "microwave",      quantity: 1, hoursPerDay: 0.5 },
      { applianceId: "pump-1hp",       quantity: 1, hoursPerDay: 1 },
    ],
  },
  {
    id: "4bhk", label: "4 BHK", emoji: "🏡",
    items: [
      { applianceId: "ac-1_5t",        quantity: 3, hoursPerDay: 8 },
      { applianceId: "ac-2t",          quantity: 1, hoursPerDay: 8 },
      { applianceId: "ceiling-fan",    quantity: 10, hoursPerDay: 12 },
      { applianceId: "led-9w",         quantity: 20, hoursPerDay: 6 },
      { applianceId: "fridge-double",  quantity: 1, hoursPerDay: 24 },
      { applianceId: "tv-55",          quantity: 1, hoursPerDay: 5 },
      { applianceId: "tv-43",          quantity: 2, hoursPerDay: 4 },
      { applianceId: "wifi-router",    quantity: 1, hoursPerDay: 24 },
      { applianceId: "washing-machine",quantity: 1, hoursPerDay: 1 },
      { applianceId: "microwave",      quantity: 1, hoursPerDay: 0.5 },
      { applianceId: "pump-1hp",       quantity: 1, hoursPerDay: 1 },
    ],
  },
  {
    id: "villa", label: "Villa", emoji: "🏰",
    items: [
      { applianceId: "ac-2t",          quantity: 4, hoursPerDay: 8 },
      { applianceId: "ceiling-fan",    quantity: 14, hoursPerDay: 10 },
      { applianceId: "led-9w",         quantity: 30, hoursPerDay: 6 },
      { applianceId: "fridge-double",  quantity: 1, hoursPerDay: 24 },
      { applianceId: "deep-freezer",   quantity: 1, hoursPerDay: 24 },
      { applianceId: "tv-55",          quantity: 2, hoursPerDay: 5 },
      { applianceId: "tv-43",          quantity: 2, hoursPerDay: 4 },
      { applianceId: "wifi-router",    quantity: 2, hoursPerDay: 24 },
      { applianceId: "washing-machine",quantity: 1, hoursPerDay: 1 },
      { applianceId: "microwave",      quantity: 1, hoursPerDay: 0.5 },
      { applianceId: "pump-2hp",       quantity: 1, hoursPerDay: 1 },
    ],
  },
  {
    id: "office-preset", label: "Office", emoji: "🏢",
    items: [
      { applianceId: "office-ac",      quantity: 2, hoursPerDay: 8 },
      { applianceId: "ceiling-fan",    quantity: 4, hoursPerDay: 8 },
      { applianceId: "led-panel",      quantity: 10, hoursPerDay: 8 },
      { applianceId: "office-laptop",  quantity: 10, hoursPerDay: 8 },
      { applianceId: "office-printer", quantity: 2, hoursPerDay: 2 },
      { applianceId: "office-router",  quantity: 1, hoursPerDay: 24 },
    ],
  },
  {
    id: "shop-preset", label: "Shop", emoji: "🛒",
    items: [
      { applianceId: "office-ac",      quantity: 1, hoursPerDay: 10 },
      { applianceId: "ceiling-fan",    quantity: 3, hoursPerDay: 10 },
      { applianceId: "shop-lighting",  quantity: 10, hoursPerDay: 10 },
      { applianceId: "pos-system",     quantity: 1, hoursPerDay: 10 },
      { applianceId: "cctv-comm",      quantity: 2, hoursPerDay: 24 },
    ],
  },
];

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
