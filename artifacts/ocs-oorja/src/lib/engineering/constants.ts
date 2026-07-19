export const ENGINEERING_CONSTANTS = {
  solar: {
    defaultPerformanceRatio: 0.80,
    defaultPanelDegradation: 0.005,
    defaultTemperatureLoss: 0.10,
    defaultDustLoss: 0.05,
    areaPerKw: 100,
    moduleEfficiency: 0.20,
    peakSunHours: {
      "Uttar Pradesh": 5.0,
      "Rajasthan": 5.5,
      "Gujarat": 5.3,
      "Maharashtra": 5.0,
      "Karnataka": 5.2,
      "Tamil Nadu": 5.4,
      "Delhi": 4.8,
      "Telangana": 5.1,
      "West Bengal": 4.7,
      "Madhya Pradesh": 5.0,
      "Punjab": 4.9,
      "Haryana": 4.9,
      "Bihar": 4.6,
      "Odisha": 4.8,
      "Kerala": 5.0,
      "Assam": 4.5,
      "Jharkhand": 4.7,
      "Chhattisgarh": 4.8,
      "Uttarakhand": 5.2,
      "Himachal Pradesh": 5.0,
      "Jammu and Kashmir": 5.0,
      "Goa": 5.2,
      "Chandigarh": 4.9,
      "Puducherry": 5.3,
      "Andaman and Nicobar Islands": 4.8,
    },
    standardSizes: [1, 2, 3, 5, 6, 8, 10, 15, 20, 25, 50, 100],
  },

  battery: {
    lifepo4: {
      dod: 0.90,
      efficiency: 0.95,
      cycleLife: 6000,
      selfDischarge: 0.02,
    },
    leadAcid: {
      dod: 0.50,
      efficiency: 0.85,
      cycleLife: 800,
      selfDischarge: 0.05,
    },
    standardVoltages: [12, 24, 48, 96, 192],
    standardCapacitiesKwh: [2.4, 5, 10, 15, 20, 30, 50, 100],
    standardCapacitiesAh: [50, 100, 150, 200, 300, 400, 500],
  },

  inverter: {
    powerFactor: 0.80,
    surgeFactor: 1.5,
    futureExpansion: { none: 1.0, low: 1.2, high: 1.5 },
    standardSizes: [1, 2, 3, 5, 7.5, 10, 15, 20, 25, 50],
  },

  cable: {
    copperResistivity: 0.0175,
    aluminumResistivity: 0.028,
    standardSizes: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240],
    ampacityDerating: {
      conduit: 0.8,
      tray: 1.0,
      underground: 0.7,
      aerial: 0.9,
    },
  },

  ev: {
    defaultEfficiency: 7.0,
    standardChargerSizes: [3.3, 7.2, 11, 22, 50, 120],
  },

  financial: {
    defaultTariffEscalation: 0.06,
    defaultMaintenanceCost: 0.01,
    defaultAnalysisPeriod: 25,
    discountRate: 0.08,
  },

  appliances: {
    ledBulb: 10,
    ceilingFan: 75,
    tubeLight: 40,
    refrigerator: 200,
    tv: 100,
    computer: 150,
    washingMachine: 500,
    ac1Ton: 1500,
    ac1_5Ton: 2000,
    waterPump: 750,
    mixer: 500,
    iron: 1000,
    geyser: 2000,
    microwave: 1200,
    wifiRouter: 20,
    exhaustFan: 40,
    airCooler: 200,
    printer: 50,
    waterPurifier: 60,
  },
} as const;

export type StateName = keyof typeof ENGINEERING_CONSTANTS.solar.peakSunHours;
export type BatteryChemistry = "lifepo4" | "leadAcid";

export function getPeakSunHours(state: string): number {
  return ENGINEERING_CONSTANTS.solar.peakSunHours[state as StateName] || 5.0;
}

export function roundToStandardSize(calculated: number, sizes: readonly number[]): number {
  const valid = sizes.filter((s) => s >= calculated);
  return valid.length > 0 ? valid[0] : sizes[sizes.length - 1];
}

export function getBatteryChemistry(chemistry: BatteryChemistry) {
  return ENGINEERING_CONSTANTS.battery[chemistry];
}
