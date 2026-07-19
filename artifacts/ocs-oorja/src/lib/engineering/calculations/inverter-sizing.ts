import { ENGINEERING_CONSTANTS, roundToStandardSize } from "../constants";

export interface InverterAppliance {
  name: string;
  wattage: number;
  quantity: number;
  isMotor?: boolean;
}

export interface InverterInputs {
  appliances: InverterAppliance[];
  futureExpansion: "none" | "low" | "high";
  powerFactor?: number;
  surgeFactor?: number;
  diversityFactor?: number;
}

export interface CalcStep {
  label: string;
  value: string;
  unit?: string;
}

export interface InverterResult {
  runningLoad: number;
  peakSurgeLoad: number;
  requiredCapacity: number;
  standardSize: number;
  futureHeadroom: number;
  steps: CalcStep[];
}

export function calculateInverterSizing(inputs: InverterInputs): InverterResult {
  const {
    appliances,
    futureExpansion,
    powerFactor = ENGINEERING_CONSTANTS.inverter.powerFactor,
    surgeFactor = ENGINEERING_CONSTANTS.inverter.surgeFactor,
    diversityFactor = 1.0,
  } = inputs;

  const futureFactor = ENGINEERING_CONSTANTS.inverter.futureExpansion[futureExpansion];
  const runningLoad = appliances.reduce((sum, app) => sum + app.wattage * app.quantity, 0);

  const motorLoad = appliances
    .filter((app) => app.isMotor)
    .reduce((sum, app) => sum + app.wattage * app.quantity * surgeFactor, 0);
  const nonMotorLoad = appliances
    .filter((app) => !app.isMotor)
    .reduce((sum, app) => sum + app.wattage * app.quantity, 0);
  const peakSurgeLoad = motorLoad + nonMotorLoad;

  const adjustedLoad = Math.max(runningLoad, peakSurgeLoad) * diversityFactor * futureFactor;
  const requiredCapacity = adjustedLoad / powerFactor / 1000;
  const standardSize = roundToStandardSize(requiredCapacity, ENGINEERING_CONSTANTS.inverter.standardSizes);
  const futureHeadroom = Math.round((futureFactor - 1) * 100);

  const steps: CalcStep[] = [
    { label: "Total Running Load", value: runningLoad.toString(), unit: "W" },
    { label: "Peak Surge Load (motors × surge factor)", value: peakSurgeLoad.toString(), unit: "W" },
    { label: "Diversity Factor", value: diversityFactor.toFixed(2), unit: "" },
    { label: "Future Expansion Headroom", value: `${futureHeadroom}%`, unit: "" },
    { label: "Power Factor", value: powerFactor.toFixed(2), unit: "" },
    { label: "Required Capacity", value: requiredCapacity.toFixed(2), unit: "kVA" },
    { label: "Standard Size (rounded up)", value: standardSize.toString(), unit: "kVA" },
  ];

  return { runningLoad, peakSurgeLoad, requiredCapacity, standardSize, futureHeadroom, steps };
}
