import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Seo } from "@/components/Seo";
import { CalculatorLayout } from "@/components/engineering/CalculatorLayout";
import { CalculationSteps } from "@/components/engineering/CalculationSteps";
import { ResultCard } from "@/components/engineering/ResultCard";
import {
  calculateCableSizing,
  type CableInputs,
  type CableResult,
} from "@/lib/engineering/calculations/cable-sizing";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

type CableType = CableInputs["cableType"];
type Installation = CableInputs["installation"];

export default function CableSizingCalculator() {
  const [current, setCurrent] = useState("20");
  const [distance, setDistance] = useState("30");
  const [voltage, setVoltage] = useState("230");
  const [maxDrop, setMaxDrop] = useState("3");
  const [cableType, setCableType] = useState<CableType>("copper");
  const [installation, setInstallation] = useState<Installation>("conduit");
  const [ambientTemp, setAmbientTemp] = useState("40");
  const [result, setResult] = useState<CableResult | null>(null);

  const handleCalculate = (_mode: "basic" | "advanced") => {
    setResult(
      calculateCableSizing({
        current: Number(current) || 20,
        distance: Number(distance) || 30,
        voltage: Number(voltage) || 230,
        maxVoltageDrop: Number(maxDrop) || 3,
        cableType,
        installation,
        ambientTemperature: Number(ambientTemp) || 40,
      }),
    );
  };

  return (
    <>
      <Seo
        title="Cable Sizing Calculator — Engineering Tools"
        description="Calculate the correct cable cross-section for copper or aluminium conductors based on load current and allowable voltage drop."
        canonical="/engineering-tools/cable-sizing"
      />

      <div className="container mx-auto max-w-3xl px-4 pt-6">
        <Link href="/engineering-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          All Calculators
        </Link>
      </div>

      <CalculatorLayout
        title="Cable Sizing Calculator"
        description="Calculate the minimum cable cross-section based on voltage-drop limits and installation method."
        onCalculate={handleCalculate}
        result={
          result && (
            <>
              <ResultCard
                title="Cable Sizing Results"
                results={[
                  {
                    label: "Recommended Cable Size",
                    value: result.standardSize.toString(),
                    unit: "mm²",
                    highlight: true,
                  },
                  {
                    label: "Calculated Cross-Section",
                    value: result.requiredSize.toFixed(2),
                    unit: "mm²",
                  },
                  {
                    label: "Actual Voltage Drop",
                    value: result.actualVoltageDropPercent.toFixed(2),
                    unit: "%",
                  },
                  {
                    label: "Derated Cable Ampacity",
                    value: result.cableAmpacity.toFixed(0),
                    unit: "A",
                  },
                  {
                    label: "Current Safety Margin",
                    value: `${result.safetyMargin.toFixed(0)}%`,
                  },
                ]}
              />
              <CalculationSteps steps={result.steps} />
            </>
          )
        }
      >
        {(mode) => (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="current">Load Current (A) *</Label>
                <Input
                  id="current"
                  type="number"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="distance">One-Way Cable Length (m) *</Label>
                <Input
                  id="distance"
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="voltage">System Voltage (V) *</Label>
                <Input
                  id="voltage"
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="maxDrop">Max Allowable Voltage Drop (%) *</Label>
                <Input
                  id="maxDrop"
                  type="number"
                  step="0.5"
                  placeholder="3"
                  value={maxDrop}
                  onChange={(e) => setMaxDrop(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Conductor Material</Label>
              <div className="flex gap-2">
                {(["copper", "aluminum"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setCableType(t)}
                    className={cn(
                      "rounded-md border px-4 py-2 text-sm font-medium capitalize transition-colors",
                      cableType === t
                        ? "border-primary bg-primary/10 text-primary-strong"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {t === "copper" ? "Copper" : "Aluminium"}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="installation">Installation Method</Label>
              <select
                id="installation"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={installation}
                onChange={(e) => setInstallation(e.target.value as Installation)}
              >
                <option value="conduit">In conduit (derating 0.8×)</option>
                <option value="tray">Cable tray (no derating)</option>
                <option value="underground">Underground direct burial (0.7×)</option>
                <option value="aerial">Aerial / open air (0.9×)</option>
              </select>
            </div>

            {mode === "advanced" && (
              <div className="space-y-1.5 rounded-lg border border-dashed border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Advanced Parameters
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="ambientTemp">Ambient Temperature (°C)</Label>
                  <Input
                    id="ambientTemp"
                    type="number"
                    placeholder="40"
                    value={ambientTemp}
                    onChange={(e) => setAmbientTemp(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Note: temperature derating applied via the installation method factor above.
                    A full IEC 60364 correction table is not yet implemented.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CalculatorLayout>
    </>
  );
}
