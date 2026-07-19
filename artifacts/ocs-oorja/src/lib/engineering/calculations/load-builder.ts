import { ENGINEERING_CONSTANTS, getPeakSunHours, roundToStandardSize } from "../constants";
import { getAppliance } from "../appliance-database";

export interface SelectedAppliance {
  applianceId: string;
  quantity: number;
  hoursPerDay: number;
  wattageOverride?: number;
}

export interface LoadBuilderInputs {
  appliances: SelectedAppliance[];
  state?: string;
  backupHours?: number;
  diversityFactor?: number;
  futureExpansion?: "none" | "low" | "high";
}

export interface ApplianceLineResult {
  applianceId: string;
  name: string;
  quantity: number;
  hoursPerDay: number;
  watts: number;
  isMotor: boolean;
  connectedLoad: number;
  dailyEnergy: number;
  surgeLoad: number;
}

export interface LoadBuilderStep {
  label: string;
  value: string;
  unit?: string;
}

export interface LoadBuilderResult {
  lines: ApplianceLineResult[];
  totalConnectedLoad: number;
  estimatedRunningLoad: number;
  peakSurgeLoad: number;
  dailyEnergyConsumption: number;
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

  const totalConnectedLoad = lines.reduce((s, l) => s + l.connectedLoad, 0);
  const dailyEnergyConsumption = lines.reduce((s, l) => s + l.dailyEnergy, 0);
  const peakSurgeLoad = lines.reduce((s, l) => s + l.surgeLoad, 0);
  const estimatedRunningLoad = totalConnectedLoad * diversityFactor;

  const inverterBase = Math.max(estimatedRunningLoad, peakSurgeLoad) * futureFactor;
  const requiredKva = inverterBase / powerFactor / 1000;
  const recommendedInverterKva = totalConnectedLoad > 0
    ? roundToStandardSize(requiredKva, ENGINEERING_CONSTANTS.inverter.standardSizes)
    : 0;

  const batt = ENGINEERING_CONSTANTS.battery.lifepo4;
  const backupEnergyWh = estimatedRunningLoad * backupHours;
  const requiredWh = backupEnergyWh / (batt.dod * batt.efficiency);
  const recommendedBatteryKwh = estimatedRunningLoad > 0
    ? roundToStandardSize(requiredWh / 1000, ENGINEERING_CONSTANTS.battery.standardCapacitiesKwh)
    : 0;

  const psh = state ? getPeakSunHours(state) : 5.0;
  const pr = ENGINEERING_CONSTANTS.solar.defaultPerformanceRatio
    * (1 - ENGINEERING_CONSTANTS.solar.defaultTemperatureLoss)
    * (1 - ENGINEERING_CONSTANTS.solar.defaultDustLoss);
  const rawSolarKw = dailyEnergyConsumption / (psh * pr);
  const recommendedSolarKw = dailyEnergyConsumption > 0
    ? roundToStandardSize(rawSolarKw, ENGINEERING_CONSTANTS.solar.standardSizes)
    : 0;

  const steps: LoadBuilderStep[] = [
    { label: "Total Connected Load",                  value: totalConnectedLoad.toFixed(0),      unit: "W"   },
    { label: "Diversity Factor",                       value: diversityFactor.toFixed(2),         unit: ""    },
    { label: "Estimated Running Load",                 value: estimatedRunningLoad.toFixed(0),    unit: "W"   },
    { label: "Peak Surge Load (motor starting)",       value: peakSurgeLoad.toFixed(0),           unit: "W"   },
    { label: "Daily Energy Consumption",               value: dailyEnergyConsumption.toFixed(2),  unit: "kWh" },
    { label: "Inverter base × headroom ÷ PF",         value: requiredKva.toFixed(2),             unit: "kVA" },
    { label: "Recommended Inverter",                   value: recommendedInverterKva.toString(),  unit: "kVA" },
    { label: `Battery: ${backupHours}h backup (LiFePO₄)`, value: recommendedBatteryKwh.toString(), unit: "kWh" },
    { label: `Solar: ${psh.toFixed(1)}h PSH, PR ${pr.toFixed(2)}`, value: rawSolarKw.toFixed(2), unit: "kW" },
    { label: "Recommended Solar Capacity",             value: recommendedSolarKw.toString(),      unit: "kW"  },
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
