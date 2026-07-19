import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Seo } from "@/components/Seo";
import { CalculatorLayout } from "@/components/engineering/CalculatorLayout";
import { CalculationSteps } from "@/components/engineering/CalculationSteps";
import { ResultCard } from "@/components/engineering/ResultCard";
import {
  calculateSolarSizing,
  type SolarInputs,
  type SolarResult,
} from "@/lib/engineering/calculations/solar-sizing";
import { ENGINEERING_CONSTANTS } from "@/lib/engineering/constants";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const STATES = Object.keys(ENGINEERING_CONSTANTS.solar.peakSunHours);

export default function SolarSizingCalculator() {
  const [result, setResult] = useState<SolarResult | null>(null);
  const [inputs, setInputs] = useState<Partial<Record<keyof SolarInputs, string>>>({});

  const set = (k: keyof SolarInputs, v: string) => setInputs((p) => ({ ...p, [k]: v }));

  const handleCalculate = (mode: "basic" | "advanced") => {
    const calc: SolarInputs = {
      monthlyBill: Number(inputs.monthlyBill) || 5000,
      tariff: Number(inputs.tariff) || 7,
      state: inputs.state || "Uttar Pradesh",
      ...(mode === "advanced" && {
        performanceRatio: inputs.performanceRatio ? Number(inputs.performanceRatio) : undefined,
        temperatureLoss: inputs.temperatureLoss ? Number(inputs.temperatureLoss) / 100 : undefined,
        dustLoss: inputs.dustLoss ? Number(inputs.dustLoss) / 100 : undefined,
        shadingLoss: inputs.shadingLoss ? Number(inputs.shadingLoss) / 100 : undefined,
        orientationLoss: inputs.orientationLoss ? Number(inputs.orientationLoss) / 100 : undefined,
      }),
    };
    setResult(calculateSolarSizing(calc));
  };

  return (
    <>
      <Seo
        title="Solar Sizing Calculator — Engineering Tools"
        description="Calculate the right solar panel capacity for your electricity consumption and location in India."
        canonical="/engineering-tools/solar-sizing"
      />

      <div className="container mx-auto max-w-3xl px-4 pt-6">
        <Link href="/engineering-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          All Calculators
        </Link>
      </div>

      <CalculatorLayout
        title="Solar Sizing Calculator"
        description="Estimate the solar system capacity needed to offset your electricity consumption."
        onCalculate={handleCalculate}
        result={
          result && (
            <>
              <ResultCard
                title="Solar Sizing Results"
                results={[
                  {
                    label: "Recommended Solar Capacity",
                    value: result.standardSize.toString(),
                    unit: "kW",
                    highlight: true,
                  },
                  {
                    label: "Estimated Daily Generation",
                    value: result.dailyGeneration.toFixed(1),
                    unit: "kWh/day",
                  },
                  {
                    label: "Estimated Monthly Generation",
                    value: result.monthlyGeneration.toFixed(0),
                    unit: "kWh/month",
                  },
                  {
                    label: "Estimated Monthly Savings",
                    value: `₹ ${result.monthlySavings.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
                    unit: "",
                  },
                  {
                    label: "Approx. Roof Area Required",
                    value: result.areaRequired.toFixed(0),
                    unit: "sq ft",
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
                <Label htmlFor="monthlyBill">Monthly Electricity Bill (₹) *</Label>
                <Input
                  id="monthlyBill"
                  type="number"
                  placeholder="5000"
                  value={inputs.monthlyBill ?? ""}
                  onChange={(e) => set("monthlyBill", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tariff">Electricity Tariff (₹/kWh) *</Label>
                <Input
                  id="tariff"
                  type="number"
                  step="0.5"
                  placeholder="7.0"
                  value={inputs.tariff ?? ""}
                  onChange={(e) => set("tariff", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="state">State / Union Territory *</Label>
              <select
                id="state"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={inputs.state ?? ""}
                onChange={(e) => set("state", e.target.value)}
              >
                <option value="">Select state…</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {mode === "advanced" && (
              <div className="grid gap-4 rounded-lg border border-dashed border-border p-4 sm:grid-cols-2">
                <p className="col-span-full text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Advanced Parameters
                </p>
                {[
                  { key: "performanceRatio" as const, label: "Performance Ratio", placeholder: "0.80", step: "0.01" },
                  { key: "temperatureLoss" as const, label: "Temperature Loss (%)", placeholder: "10" },
                  { key: "dustLoss" as const, label: "Dust / Soiling Loss (%)", placeholder: "5" },
                  { key: "shadingLoss" as const, label: "Shading Loss (%)", placeholder: "0" },
                  { key: "orientationLoss" as const, label: "Orientation / Tilt Loss (%)", placeholder: "0" },
                ].map(({ key, label, placeholder, step }) => (
                  <div key={key} className="space-y-1.5">
                    <Label htmlFor={key}>{label}</Label>
                    <Input
                      id={key}
                      type="number"
                      step={step}
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
