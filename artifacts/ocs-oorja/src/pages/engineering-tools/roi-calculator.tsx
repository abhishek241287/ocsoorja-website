import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Seo } from "@/components/Seo";
import { CalculatorLayout } from "@/components/engineering/CalculatorLayout";
import { CalculationSteps } from "@/components/engineering/CalculationSteps";
import { ResultCard } from "@/components/engineering/ResultCard";
import {
  calculateROI,
  type ROIInputs,
  type ROIResult,
} from "@/lib/engineering/calculations/roi-calculator";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function ROICalculatorPage() {
  const [inputs, setInputs] = useState<Partial<Record<keyof ROIInputs, string>>>({});
  const [result, setResult] = useState<ROIResult | null>(null);

  const set = (k: keyof ROIInputs, v: string) => setInputs((p) => ({ ...p, [k]: v }));

  const handleCalculate = (mode: "basic" | "advanced") => {
    const calc: ROIInputs = {
      systemCost: Number(inputs.systemCost) || 0,
      systemCapacity: Number(inputs.systemCapacity) || 0,
      electricityTariff: Number(inputs.electricityTariff) || 7,
      ...(inputs.annualGeneration && { annualGeneration: Number(inputs.annualGeneration) }),
      ...(mode === "advanced" && {
        tariffEscalation: inputs.tariffEscalation
          ? Number(inputs.tariffEscalation) / 100
          : undefined,
        maintenanceCost: inputs.maintenanceCost
          ? Number(inputs.maintenanceCost) / 100
          : undefined,
        analysisPeriod: inputs.analysisPeriod ? Number(inputs.analysisPeriod) : undefined,
      }),
    };
    setResult(calculateROI(calc));
  };

  return (
    <>
      <Seo
        title="Solar ROI Calculator — Engineering Tools"
        description="Estimate payback period, savings, NPV, and return on investment for a solar installation."
        canonical="/engineering-tools/roi-calculator"
      />

      <div className="container mx-auto max-w-3xl px-4 pt-6">
        <Link href="/engineering-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          All Calculators
        </Link>
      </div>

      <CalculatorLayout
        title="Solar ROI Calculator"
        description="Estimate payback period, cumulative savings, NPV, and total ROI over the system lifetime."
        onCalculate={handleCalculate}
        result={
          result && (
            <>
              <ResultCard
                title="Financial Analysis Results"
                results={[
                  {
                    label: "Simple Payback Period",
                    value: result.paybackPeriod > 0 ? `${result.paybackPeriod.toFixed(1)}` : "> analysis period",
                    unit: result.paybackPeriod > 0 ? "years" : "",
                    highlight: true,
                  },
                  {
                    label: "10-Year Net Savings",
                    value: `₹ ${result.tenYearSavings.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
                  },
                  {
                    label: "Total Savings (lifetime)",
                    value: `₹ ${result.totalSavings.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
                  },
                  {
                    label: "Return on Investment",
                    value: `${result.roi.toFixed(0)}%`,
                  },
                  {
                    label: "Net Present Value (NPV)",
                    value: `₹ ${result.npv.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
                  },
                ]}
              />
              <CalculationSteps steps={result.steps} />
            </>
          )
        }
      >
        {(mode) => (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="systemCost">Total System Cost (₹) *</Label>
                <Input
                  id="systemCost"
                  type="number"
                  placeholder="250000"
                  value={inputs.systemCost ?? ""}
                  onChange={(e) => set("systemCost", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="systemCapacity">System Capacity (kW) *</Label>
                <Input
                  id="systemCapacity"
                  type="number"
                  step="0.5"
                  placeholder="5"
                  value={inputs.systemCapacity ?? ""}
                  onChange={(e) => set("systemCapacity", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="electricityTariff">Current Electricity Tariff (₹/kWh) *</Label>
                <Input
                  id="electricityTariff"
                  type="number"
                  step="0.5"
                  placeholder="7.0"
                  value={inputs.electricityTariff ?? ""}
                  onChange={(e) => set("electricityTariff", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="annualGeneration">
                  Annual Generation (kWh) — optional
                </Label>
                <Input
                  id="annualGeneration"
                  type="number"
                  placeholder="Auto-calculated from capacity"
                  value={inputs.annualGeneration ?? ""}
                  onChange={(e) => set("annualGeneration", e.target.value)}
                />
              </div>
            </div>

            {mode === "advanced" && (
              <div className="grid gap-4 rounded-lg border border-dashed border-border p-4 sm:grid-cols-3">
                <p className="col-span-full text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Advanced Parameters
                </p>
                {[
                  {
                    key: "tariffEscalation" as const,
                    label: "Tariff Escalation (% / year)",
                    placeholder: "6",
                  },
                  {
                    key: "maintenanceCost" as const,
                    label: "Maintenance Cost (% of system cost / year)",
                    placeholder: "1",
                  },
                  {
                    key: "analysisPeriod" as const,
                    label: "Analysis Period (years)",
                    placeholder: "25",
                  },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} className="space-y-1.5">
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      type="number"
                      placeholder={placeholder}
                      value={inputs[key] ?? ""}
                      onChange={(e) => set(key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CalculatorLayout>
    </>
  );
}
