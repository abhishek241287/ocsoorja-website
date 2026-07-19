import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { Seo } from "@/components/Seo";
import { CalculatorLayout } from "@/components/engineering/CalculatorLayout";
import { CalculationSteps } from "@/components/engineering/CalculationSteps";
import { ResultCard } from "@/components/engineering/ResultCard";
import {
  calculateInverterSizing,
  type InverterAppliance,
  type InverterResult,
} from "@/lib/engineering/calculations/inverter-sizing";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

const DEFAULT_APPLIANCES: InverterAppliance[] = [
  { name: "LED Lights", wattage: 60, quantity: 6, isMotor: false },
  { name: "Ceiling Fan", wattage: 75, quantity: 2, isMotor: false },
  { name: "Water Pump", wattage: 750, quantity: 1, isMotor: true },
];

export default function InverterSizingCalculator() {
  const [appliances, setAppliances] = useState<InverterAppliance[]>(DEFAULT_APPLIANCES);
  const [futureExpansion, setFutureExpansion] = useState<"none" | "low" | "high">("low");
  const [powerFactor, setPowerFactor] = useState("0.80");
  const [diversityFactor, setDiversityFactor] = useState("1.0");
  const [result, setResult] = useState<InverterResult | null>(null);

  const addRow = () =>
    setAppliances((p) => [...p, { name: "", wattage: 0, quantity: 1, isMotor: false }]);

  const updateRow = (i: number, field: keyof InverterAppliance, val: string | boolean) =>
    setAppliances((p) =>
      p.map((a, idx) =>
        idx === i
          ? {
              ...a,
              [field]:
                field === "name"
                  ? val
                  : field === "isMotor"
                  ? val
                  : Number(val),
            }
          : a,
      ),
    );

  const removeRow = (i: number) =>
    setAppliances((p) => p.filter((_, idx) => idx !== i));

  const handleCalculate = (mode: "basic" | "advanced") => {
    setResult(
      calculateInverterSizing({
        appliances: appliances.filter((a) => a.wattage > 0),
        futureExpansion,
        ...(mode === "advanced" && {
          powerFactor: Number(powerFactor) || 0.8,
          diversityFactor: Number(diversityFactor) || 1.0,
        }),
      }),
    );
  };

  return (
    <>
      <Seo
        title="Inverter Sizing Calculator — Engineering Tools"
        description="Calculate the correct inverter kVA rating for your load, accounting for motor surge and future expansion."
        canonical="/engineering-tools/inverter-sizing"
      />

      <div className="container mx-auto max-w-3xl px-4 pt-6">
        <Link href="/engineering-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          All Calculators
        </Link>
      </div>

      <CalculatorLayout
        title="Inverter Sizing Calculator"
        description="Select the right inverter capacity for your loads, including motor surge allowance."
        onCalculate={handleCalculate}
        result={
          result && (
            <>
              <ResultCard
                title="Inverter Sizing Results"
                results={[
                  {
                    label: "Recommended Inverter Size",
                    value: result.standardSize.toString(),
                    unit: "kVA",
                    highlight: true,
                  },
                  {
                    label: "Running Load",
                    value: result.runningLoad.toString(),
                    unit: "W",
                  },
                  {
                    label: "Peak Surge Load",
                    value: result.peakSurgeLoad.toString(),
                    unit: "W",
                  },
                  {
                    label: "Calculated Requirement",
                    value: result.requiredCapacity.toFixed(2),
                    unit: "kVA",
                  },
                  {
                    label: "Future Headroom Included",
                    value: `${result.futureHeadroom}%`,
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
            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Appliances / Loads</p>
              <div className="mb-1 grid grid-cols-[1fr_6rem_4rem_4rem_2rem] gap-2 text-xs text-muted-foreground">
                <span>Name</span>
                <span>Watts</span>
                <span>Qty</span>
                <span>Motor?</span>
                <span />
              </div>
              <div className="space-y-2">
                {appliances.map((a, i) => (
                  <div key={i} className="grid grid-cols-[1fr_6rem_4rem_4rem_2rem] items-center gap-2">
                    <Input
                      placeholder="Appliance"
                      value={a.name}
                      onChange={(e) => updateRow(i, "name", e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="W"
                      value={a.wattage || ""}
                      onChange={(e) => updateRow(i, "wattage", e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="1"
                      value={a.quantity || ""}
                      onChange={(e) => updateRow(i, "quantity", e.target.value)}
                    />
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={a.isMotor ?? false}
                        onChange={(e) => updateRow(i, "isMotor", e.target.checked)}
                        className="h-4 w-4 accent-primary"
                      />
                    </div>
                    <button
                      onClick={() => removeRow(i)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-2" onClick={addRow}>
                <Plus className="mr-2 h-4 w-4" />
                Add Appliance
              </Button>
            </div>

            <div className="space-y-1.5">
              <Label>Future Expansion Headroom</Label>
              <div className="flex gap-2">
                {(["none", "low", "high"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFutureExpansion(opt)}
                    className={`rounded-md border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                      futureExpansion === opt
                        ? "border-primary bg-primary/10 text-primary-strong"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt} {opt === "none" ? "(0%)" : opt === "low" ? "(+20%)" : "(+50%)"}
                  </button>
                ))}
              </div>
            </div>

            {mode === "advanced" && (
              <div className="grid gap-4 rounded-lg border border-dashed border-border p-4 sm:grid-cols-2">
                <p className="col-span-full text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Advanced Parameters
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="pf">Power Factor</Label>
                  <Input
                    id="pf"
                    type="number"
                    step="0.01"
                    placeholder="0.80"
                    value={powerFactor}
                    onChange={(e) => setPowerFactor(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="df">Diversity Factor</Label>
                  <Input
                    id="df"
                    type="number"
                    step="0.05"
                    placeholder="1.0"
                    value={diversityFactor}
                    onChange={(e) => setDiversityFactor(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </CalculatorLayout>
    </>
  );
}
