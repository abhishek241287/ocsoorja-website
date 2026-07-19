import { ENGINEERING_CONSTANTS, roundToStandardSize } from "../constants";

export interface EVInputs {
  batterySize: number;
  dailyCommute: number;
  efficiency?: number;
  chargerType: "ac-3.3" | "ac-7.2" | "ac-11" | "ac-22" | "dc-50" | "dc-120";
  electricityTariff: number;
  chargingLocation: "home" | "office" | "public";
}

export interface CalcStep {
  label: string;
  value: string;
  unit?: string;
}

export interface EVResult {
  dailyEnergyNeeded: number;
  chargerPower: number;
  chargingTime: number;
  dailyCost: number;
  monthlyCost: number;
  rangePerHour: number;
  fullChargeTime: number;
  standardChargerSize: number;
  steps: CalcStep[];
}

const CHARGER_POWER_MAP: Record<string, number> = {
  "ac-3.3": 3.3,
  "ac-7.2": 7.2,
  "ac-11": 11,
  "ac-22": 22,
  "dc-50": 50,
  "dc-120": 120,
};

export function calculateEVCharging(inputs: EVInputs): EVResult {
  const {
    batterySize,
    dailyCommute,
    efficiency = ENGINEERING_CONSTANTS.ev.defaultEfficiency,
    chargerType,
    electricityTariff,
  } = inputs;

  const chargerPower = CHARGER_POWER_MAP[chargerType];
  const dailyEnergyNeeded = dailyCommute / efficiency;
  const chargingTime = dailyEnergyNeeded / chargerPower;
  const dailyCost = dailyEnergyNeeded * electricityTariff;
  const monthlyCost = dailyCost * 30;
  const rangePerHour = chargerPower * efficiency;
  const fullChargeTime = batterySize / chargerPower;
  const standardChargerSize = roundToStandardSize(
    chargerPower,
    ENGINEERING_CONSTANTS.ev.standardChargerSizes,
  );

  const steps: CalcStep[] = [
    { label: "Daily Commute", value: dailyCommute.toString(), unit: "km" },
    { label: "Vehicle Efficiency", value: efficiency.toString(), unit: "km/kWh" },
    { label: "Daily Energy Needed", value: dailyEnergyNeeded.toFixed(2), unit: "kWh" },
    { label: "Charger Power", value: chargerPower.toString(), unit: "kW" },
    { label: "Daily Charging Time", value: chargingTime.toFixed(2), unit: "h" },
    { label: "Full Charge Time (empty→full)", value: fullChargeTime.toFixed(2), unit: "h" },
    { label: "Range Added per Hour of Charging", value: rangePerHour.toFixed(0), unit: "km/h" },
    { label: "Daily Charging Cost", value: `₹ ${dailyCost.toFixed(2)}`, unit: "" },
    { label: "Monthly Charging Cost", value: `₹ ${monthlyCost.toFixed(0)}`, unit: "" },
  ];

  return {
    dailyEnergyNeeded,
    chargerPower,
    chargingTime,
    dailyCost,
    monthlyCost,
    rangePerHour,
    fullChargeTime,
    standardChargerSize,
    steps,
  };
}
