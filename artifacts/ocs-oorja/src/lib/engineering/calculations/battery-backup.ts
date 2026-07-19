import { ENGINEERING_CONSTANTS, getBatteryChemistry, roundToStandardSize } from "../constants";
import type { BatteryChemistry } from "../constants";

export interface ApplianceLoad {
  name: string;
  wattage: number;
  quantity: number;
}

export interface BatteryInputs {
  appliances: ApplianceLoad[];
  backupHours: number;
  voltage: number;
  chemistry: BatteryChemistry;
  reserveMargin?: number;
}

export interface CalcStep {
  label: string;
  value: string;
  unit?: string;
}

export interface BatteryResult {
  totalLoad: number;
  totalEnergy: number;
  requiredCapacityWh: number;
  requiredCapacityAh: number;
  standardCapacityKwh: number;
  standardCapacityAh: number;
  actualBackupTime: number;
  steps: CalcStep[];
}

export function calculateBatteryBackup(inputs: BatteryInputs): BatteryResult {
  const { appliances, backupHours, voltage, chemistry, reserveMargin = 0 } = inputs;
  const batterySpecs = getBatteryChemistry(chemistry);
  const dod = batterySpecs.dod;
  const efficiency = batterySpecs.efficiency;

  const totalLoad = appliances.reduce((sum, app) => sum + app.wattage * app.quantity, 0);
  const totalEnergy = totalLoad * backupHours;
  const requiredCapacityWh = totalEnergy / (dod * efficiency);
  const requiredCapacityAh = requiredCapacityWh / voltage;
  const capacityWithReserve = requiredCapacityWh * (1 + reserveMargin);
  const standardCapacityKwh = roundToStandardSize(
    capacityWithReserve / 1000,
    ENGINEERING_CONSTANTS.battery.standardCapacitiesKwh,
  );
  const standardCapacityAh = roundToStandardSize(
    requiredCapacityAh,
    ENGINEERING_CONSTANTS.battery.standardCapacitiesAh,
  );
  const actualBackupTime = (standardCapacityKwh * 1000 * dod * efficiency) / (totalLoad || 1);

  const steps: CalcStep[] = [
    { label: "Total Connected Load", value: totalLoad.toString(), unit: "W" },
    { label: "Backup Duration", value: backupHours.toString(), unit: "h" },
    { label: "Total Energy Needed", value: totalEnergy.toString(), unit: "Wh" },
    { label: "Depth of Discharge", value: `${(dod * 100).toFixed(0)}%`, unit: "" },
    { label: "Round-trip Efficiency", value: `${(efficiency * 100).toFixed(0)}%`, unit: "" },
    { label: "Required Usable Capacity", value: requiredCapacityWh.toFixed(0), unit: "Wh" },
    { label: "Required Capacity (Ah @ voltage)", value: requiredCapacityAh.toFixed(0), unit: "Ah" },
    { label: "Standard Capacity (rounded up)", value: standardCapacityKwh.toString(), unit: "kWh" },
  ];

  return {
    totalLoad,
    totalEnergy,
    requiredCapacityWh,
    requiredCapacityAh,
    standardCapacityKwh,
    standardCapacityAh,
    actualBackupTime,
    steps,
  };
}
