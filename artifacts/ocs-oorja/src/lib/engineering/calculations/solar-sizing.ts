import { ENGINEERING_CONSTANTS, getPeakSunHours, roundToStandardSize } from "../constants";

export interface SolarInputs {
  monthlyBill: number;
  tariff: number;
  state: string;
  roofArea?: number;
  performanceRatio?: number;
  panelDegradation?: number;
  temperatureLoss?: number;
  dustLoss?: number;
  shadingLoss?: number;
  orientationLoss?: number;
}

export interface CalcStep {
  label: string;
  value: string;
  unit?: string;
}

export interface SolarResult {
  recommendedCapacity: number;
  standardSize: number;
  dailyGeneration: number;
  monthlyGeneration: number;
  monthlySavings: number;
  areaRequired: number;
  steps: CalcStep[];
}

export function calculateSolarSizing(inputs: SolarInputs): SolarResult {
  const {
    monthlyBill,
    tariff,
    state,
    performanceRatio = ENGINEERING_CONSTANTS.solar.defaultPerformanceRatio,
    temperatureLoss = ENGINEERING_CONSTANTS.solar.defaultTemperatureLoss,
    dustLoss = ENGINEERING_CONSTANTS.solar.defaultDustLoss,
    shadingLoss = 0,
    orientationLoss = 0,
  } = inputs;

  const peakSunHours = getPeakSunHours(state);
  const monthlyConsumption = monthlyBill / tariff;
  const dailyConsumption = monthlyConsumption / 30;
  const adjustedPR =
    performanceRatio *
    (1 - temperatureLoss) *
    (1 - dustLoss) *
    (1 - shadingLoss) *
    (1 - orientationLoss);
  const rawCapacity = dailyConsumption / (peakSunHours * adjustedPR);
  const standardSize = roundToStandardSize(rawCapacity, ENGINEERING_CONSTANTS.solar.standardSizes);
  const dailyGeneration = standardSize * peakSunHours * adjustedPR;
  const monthlyGeneration = dailyGeneration * 30;
  const monthlySavings = monthlyGeneration * tariff;
  const areaRequired = standardSize * ENGINEERING_CONSTANTS.solar.areaPerKw;

  const steps: CalcStep[] = [
    { label: "Monthly Bill", value: `₹ ${monthlyBill.toLocaleString()}`, unit: "INR" },
    { label: "Electricity Tariff", value: `₹ ${tariff}`, unit: "per kWh" },
    { label: "Monthly Consumption", value: monthlyConsumption.toFixed(1), unit: "kWh" },
    { label: "Daily Consumption", value: dailyConsumption.toFixed(1), unit: "kWh" },
    { label: "Peak Sun Hours (location)", value: peakSunHours.toFixed(1), unit: "h/day" },
    { label: "Adjusted Performance Ratio", value: adjustedPR.toFixed(3), unit: "" },
    { label: "Raw Capacity Needed", value: rawCapacity.toFixed(2), unit: "kW" },
    { label: "Nearest Standard Size", value: standardSize.toString(), unit: "kW" },
  ];

  return {
    recommendedCapacity: rawCapacity,
    standardSize,
    dailyGeneration,
    monthlyGeneration,
    monthlySavings,
    areaRequired,
    steps,
  };
}
