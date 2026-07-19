import { ENGINEERING_CONSTANTS } from "../constants";

export interface ROIInputs {
  systemCost: number;
  systemCapacity: number;
  electricityTariff: number;
  annualGeneration?: number;
  tariffEscalation?: number;
  maintenanceCost?: number;
  analysisPeriod?: number;
}

export interface YearlyData {
  year: number;
  generation: number;
  savings: number;
  cumulativeSavings: number;
  maintenance: number;
  netSavings: number;
}

export interface CalcStep {
  label: string;
  value: string;
  unit?: string;
}

export interface ROIResult {
  paybackPeriod: number;
  tenYearSavings: number;
  totalSavings: number;
  roi: number;
  npv: number;
  yearlyData: YearlyData[];
  steps: CalcStep[];
}

export function calculateROI(inputs: ROIInputs): ROIResult {
  const {
    systemCost,
    systemCapacity,
    electricityTariff,
    annualGeneration,
    tariffEscalation = ENGINEERING_CONSTANTS.financial.defaultTariffEscalation,
    maintenanceCost = ENGINEERING_CONSTANTS.financial.defaultMaintenanceCost,
    analysisPeriod = ENGINEERING_CONSTANTS.financial.defaultAnalysisPeriod,
  } = inputs;

  const peakSunHours = 5.0;
  const performanceRatio = ENGINEERING_CONSTANTS.solar.defaultPerformanceRatio;
  const actualAnnualGeneration =
    annualGeneration || systemCapacity * peakSunHours * 365 * performanceRatio;
  const yearlyMaintenance = systemCost * maintenanceCost;

  const yearlyData: YearlyData[] = [];
  let cumulativeSavings = 0;
  let paybackPeriod = 0;
  let paybackFound = false;
  let npv = -systemCost;

  for (let year = 1; year <= analysisPeriod; year++) {
    const tariff = electricityTariff * Math.pow(1 + tariffEscalation, year - 1);
    const savings = actualAnnualGeneration * tariff;
    const netSavings = savings - yearlyMaintenance;
    cumulativeSavings += netSavings;
    npv += netSavings / Math.pow(1 + ENGINEERING_CONSTANTS.financial.discountRate, year);

    if (!paybackFound && cumulativeSavings >= systemCost) {
      paybackPeriod =
        year - 1 + (systemCost - (cumulativeSavings - netSavings)) / netSavings;
      paybackFound = true;
    }

    yearlyData.push({
      year,
      generation: actualAnnualGeneration,
      savings,
      cumulativeSavings,
      maintenance: yearlyMaintenance,
      netSavings,
    });
  }

  const totalSavings = cumulativeSavings;
  const roi = ((totalSavings - systemCost) / systemCost) * 100;
  const tenYearSavings = yearlyData.slice(0, 10).reduce((sum, y) => sum + y.netSavings, 0);

  const steps: CalcStep[] = [
    { label: "System Cost", value: `₹ ${systemCost.toLocaleString()}`, unit: "INR" },
    { label: "System Capacity", value: systemCapacity.toString(), unit: "kW" },
    { label: "Annual Generation (estimated)", value: actualAnnualGeneration.toFixed(0), unit: "kWh" },
    { label: "Year-1 Electricity Tariff", value: `₹ ${electricityTariff}`, unit: "per kWh" },
    { label: "Tariff Escalation (per year)", value: `${(tariffEscalation * 100).toFixed(0)}%`, unit: "" },
    { label: "Annual Maintenance", value: `₹ ${yearlyMaintenance.toFixed(0)}`, unit: "INR" },
    { label: "Simple Payback Period", value: paybackPeriod > 0 ? paybackPeriod.toFixed(1) : ">25", unit: "years" },
    { label: "10-Year Net Savings", value: `₹ ${tenYearSavings.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, unit: "INR" },
    { label: `${analysisPeriod}-Year ROI`, value: `${roi.toFixed(0)}%`, unit: "" },
    { label: "NPV (discounted)", value: `₹ ${npv.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`, unit: "INR" },
  ];

  return { paybackPeriod, tenYearSavings, totalSavings, roi, npv, yearlyData, steps };
}
