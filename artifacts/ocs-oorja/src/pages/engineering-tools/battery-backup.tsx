import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { Seo } from "@/components/Seo";
import { CalculatorLayout } from "@/components/engineering/CalculatorLayout";
import { CalculationSteps } from "@/components/engineering/CalculationSteps";
import { ResultCard } from "@/components/engineering/ResultCard";
import {
  calculateBatteryBackup,
  type ApplianceLoad,
  type BatteryResult,
} from "@/lib/engineering/calculations/battery-backup";
import type { BatteryChemistry } from "@/lib/engineering/constants";
import { ENGINEERING_CONSTANTS } from "@/lib/engineering/constants";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

const DEFAULT_APPLIANCES: ApplianceLoad[] = [
  { name: "LED Bulbs", wattage: ENGINEERING_CONSTANTS.appliances.ledBulb, quantity: 6 },
  { name: "Ceiling Fan", wattage: ENGINEERING_CONSTANTS.appliances.ceilingFan, quantity: 2 },
];

export default function BatteryBackupCalculator() {
  const [appliances, setAppliances] = useState<ApplianceLoad[]>(DEFAULT_APPLIANCES);
  const [backupHours, setBackupHours] = useState("4");
  const [voltage, setVoltage] = useState("48");
  const [chemistry, setChemistry] = useState<BatteryChemistry>("lifepo4");
  const [reserveMargin, setReserveMargin] = useState("10");
  const [result, setResult] = useState<BatteryResult | null>(null);

  const addRow = () =>
    setAppliances((p) => [...p, { name: "", wattage: 0, quantity: 1 }]);

  const updateRow = (i: number, field: keyof ApplianceLoad, val: string) =>
    setAppliances((p) =>
      p.map((a, idx) =>
        idx === i
          ? { ...a, [field]: field === "name" ? val : Number(val) }
          : a,
      ),
    );

  const removeRow = (i: number) =>
    setAppliances((p) => p.filter((_, idx) => idx !== i));

  const handleCalculate = (mode: "basic" | "advanced") => {
    setResult(
      calculateBatteryBackup({
        appliances: appliances.filter((a) => a.wattage > 0 && a.quantity > 0),
        backupHours: Number(backupHours) || 4,
        voltage: Number(voltage) || 48,
        chemistry,
        reserveMargin: mode === "advanced" ? Number(reserveMargin) / 100 : 0,
      }),
    );
  };

  return (
    <>
      <Seo
        title="Battery Backup Calculator — Engineering Tools"
        description="Size your battery bank for reliable backup power. Supports LiFePO₄ and lead-acid chemistry."
        canonical="/engineering-tools/battery-backup"
      />

      <div className="container mx-auto max-w-3xl px-4 pt-6">
        <Link href="/engineering-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          All Calculators
        </Link>
      </div>

      <CalculatorLayout
        title="Battery Backup Calculator"
        description="Estimate the battery capacity required to power your appliances during a grid outage."
        onCalculate={handleCalculate}
        result={
          result && (
            <>
              <ResultCard
                title="Battery Sizing Results"
                results={[
                  {
                    label: "Recommended Battery Capacity",
                    value: result.standardCapacityKwh.toString(),
                    unit: "kWh",
                    highlight: true,
                  },
                  {
                    label: "Standard Capacity (Ah)",
                    value: result.standardCapacityAh.toString(),
                    unit: `Ah @ ${voltage}V`,
                  },
                  {
                    label: "Total Connected Load",
                    value: result.totalLoad.toString(),
                    unit: "W",
                  },
                  {
                    label: "Actual Backup Time (standard size)",
                    value: result.actualBackupTime.toFixed(1),
                    unit: "hours",
                  },
                  {
                    label: "Chemistry",
                    value: chemistry === "lifepo4" ? "LiFePO₄" : "Lead-Acid",
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
              <div className="space-y-2">
                {appliances.map((a, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      placeholder="Appliance name"
                      value={a.name}
                      onChange={(e) => updateRow(i, "name", e.target.value)}
                      className="min-w-0 flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Watts"
                      value={a.wattage || ""}
                      onChange={(e) => updateRow(i, "wattage", e.target.value)}
                      className="w-24"
                    />
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={a.quantity || ""}
                      onChange={(e) => updateRow(i, "quantity", e.target.value)}
                      className="w-16"
                    />
                    <button
                      onClick={() => removeRow(i)}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                      aria-label="Remove row"
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

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="backupHours">Backup Duration (hours) *</Label>
                <Input
                  id="backupHours"
                  type="number"
                  step="0.5"
                  value={backupHours}
                  onChange={(e) => setBackupHours(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="voltage">System Voltage (V) *</Label>
                <select
                  id="voltage"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                >
                  {ENGINEERING_CONSTANTS.battery.standardVoltages.map((v) => (
                    <option key={v} value={v}>
                      {v} V
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="chemistry">Battery Chemistry *</Label>
                <select
                  id="chemistry"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={chemistry}
                  onChange={(e) => setChemistry(e.target.value as BatteryChemistry)}
                >
                  <option value="lifepo4">LiFePO₄</option>
                  <option value="leadAcid">Lead-Acid</option>
                </select>
              </div>
            </div>

            {mode === "advanced" && (
              <div className="space-y-1.5 rounded-lg border border-dashed border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Advanced Parameters
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="reserveMargin">Reserve Margin (%)</Label>
                  <Input
                    id="reserveMargin"
                    type="number"
                    placeholder="10"
                    value={reserveMargin}
                    onChange={(e) => setReserveMargin(e.target.value)}
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
