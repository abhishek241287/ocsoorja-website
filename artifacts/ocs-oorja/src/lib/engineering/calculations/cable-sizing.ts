import { ENGINEERING_CONSTANTS, roundToStandardSize } from "../constants";

export interface CableInputs {
  current: number;
  distance: number;
  voltage: number;
  maxVoltageDrop: number;
  cableType: "copper" | "aluminum";
  installation: "conduit" | "tray" | "underground" | "aerial";
  ambientTemperature?: number;
}

export interface CalcStep {
  label: string;
  value: string;
  unit?: string;
}

export interface CableResult {
  requiredSize: number;
  standardSize: number;
  actualVoltageDrop: number;
  actualVoltageDropPercent: number;
  cableAmpacity: number;
  safetyMargin: number;
  steps: CalcStep[];
}

export function calculateCableSizing(inputs: CableInputs): CableResult {
  const { current, distance, voltage, maxVoltageDrop, cableType, installation } = inputs;

  const resistivity =
    cableType === "copper"
      ? ENGINEERING_CONSTANTS.cable.copperResistivity
      : ENGINEERING_CONSTANTS.cable.aluminumResistivity;

  const derating = ENGINEERING_CONSTANTS.cable.ampacityDerating[installation];

  const maxDropVolts = voltage * (maxVoltageDrop / 100);
  const requiredSize = (2 * current * distance * resistivity) / maxDropVolts;
  const standardSize = roundToStandardSize(requiredSize, ENGINEERING_CONSTANTS.cable.standardSizes);
  const actualVoltageDrop = (2 * current * distance * resistivity) / standardSize;
  const actualVoltageDropPercent = (actualVoltageDrop / voltage) * 100;
  const baseAmpacity = standardSize * 8;
  const cableAmpacity = baseAmpacity * derating;
  const safetyMargin = ((cableAmpacity - current) / current) * 100;

  const steps: CalcStep[] = [
    { label: "Load Current", value: current.toString(), unit: "A" },
    { label: "One-way Cable Length", value: distance.toString(), unit: "m" },
    { label: "System Voltage", value: voltage.toString(), unit: "V" },
    { label: "Max Allowable Voltage Drop", value: `${maxVoltageDrop}%`, unit: "" },
    { label: `${cableType === "copper" ? "Copper" : "Aluminium"} Resistivity`, value: resistivity.toString(), unit: "Ω·mm²/m" },
    { label: "Installation Derating Factor", value: `${(derating * 100).toFixed(0)}%`, unit: "" },
    { label: "Calculated Cross-Section", value: requiredSize.toFixed(2), unit: "mm²" },
    { label: "Standard Cable Size (rounded up)", value: standardSize.toString(), unit: "mm²" },
    { label: "Actual Voltage Drop", value: actualVoltageDropPercent.toFixed(2), unit: "%" },
    { label: "Derated Ampacity", value: cableAmpacity.toFixed(0), unit: "A" },
  ];

  return {
    requiredSize,
    standardSize,
    actualVoltageDrop,
    actualVoltageDropPercent,
    cableAmpacity,
    safetyMargin,
    steps,
  };
}
