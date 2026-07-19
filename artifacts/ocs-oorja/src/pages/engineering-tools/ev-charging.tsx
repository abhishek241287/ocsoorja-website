import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Seo } from "@/components/Seo";
import { CalculatorLayout } from "@/components/engineering/CalculatorLayout";
import { CalculationSteps } from "@/components/engineering/CalculationSteps";
import { ResultCard } from "@/components/engineering/ResultCard";
import {
  calculateEVCharging,
  type EVInputs,
  type EVResult,
} from "@/lib/engineering/calculations/ev-charging";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

type ChargerType = EVInputs["chargerType"];
type ChargingLocation = EVInputs["chargingLocation"];

const CHARGER_OPTIONS: { value: ChargerType; label: string }[] = [
  { value: "ac-3.3", label: "AC 3.3 kW (Level 1 home)" },
  { value: "ac-7.2", label: "AC 7.2 kW (Level 2 home)" },
  { value: "ac-11", label: "AC 11 kW (3-phase)" },
  { value: "ac-22", label: "AC 22 kW (3-phase fast)" },
  { value: "dc-50", label: "DC 50 kW (fast charge)" },
  { value: "dc-120", label: "DC 120 kW (ultra-fast)" },
];

export default function EVChargingCalculator() {
  const [batterySize, setBatterySize] = useState("40");
  const [dailyCommute, setDailyCommute] = useState("50");
  const [efficiency, setEfficiency] = useState("7");
  const [chargerType, setChargerType] = useState<ChargerType>("ac-7.2");
  const [electricityTariff, setElectricityTariff] = useState("7");
  const [chargingLocation, setChargingLocation] = useState<ChargingLocation>("home");
  const [result, setResult] = useState<EVResult | null>(null);

  const handleCalculate = (mode: "basic" | "advanced") => {
    setResult(
      calculateEVCharging({
        batterySize: Number(batterySize) || 40,
        dailyCommute: Number(dailyCommute) || 50,
        efficiency: mode === "advanced" ? Number(efficiency) || 7 : undefined,
        chargerType,
        electricityTariff: Number(electricityTariff) || 7,
        chargingLocation,
      }),
    );
  };

  return (
    <>
      <Seo
        title="EV Charging Calculator — Engineering Tools"
        description="Calculate EV charging time, daily energy needed, range per hour, and running costs."
        canonical="/engineering-tools/ev-charging"
      />

      <div className="container mx-auto max-w-3xl px-4 pt-6">
        <Link href="/engineering-tools" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          All Calculators
        </Link>
      </div>

      <CalculatorLayout
        title="EV Charging Calculator"
        description="Calculate charging time, running costs, and range metrics for electric vehicles."
        onCalculate={handleCalculate}
        result={
          result && (
            <>
              <ResultCard
                title="EV Charging Results"
                results={[
                  {
                    label: "Charging Time for Daily Commute",
                    value: result.chargingTime.toFixed(2),
                    unit: "hours",
                    highlight: true,
                  },
                  {
                    label: "Full Battery Charge Time",
                    value: result.fullChargeTime.toFixed(2),
                    unit: "hours",
                  },
                  {
                    label: "Daily Energy Needed",
                    value: result.dailyEnergyNeeded.toFixed(2),
                    unit: "kWh",
                  },
                  {
                    label: "Range Added per Hour of Charging",
                    value: result.rangePerHour.toFixed(0),
                    unit: "km/h",
                  },
                  {
                    label: "Daily Charging Cost",
                    value: `₹ ${result.dailyCost.toFixed(2)}`,
                  },
                  {
                    label: "Monthly Charging Cost (est.)",
                    value: `₹ ${result.monthlyCost.toFixed(0)}`,
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
                <Label htmlFor="batterySize">Vehicle Battery Capacity (kWh) *</Label>
                <Input
                  id="batterySize"
                  type="number"
                  value={batterySize}
                  onChange={(e) => setBatterySize(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dailyCommute">Daily Commute (km) *</Label>
                <Input
                  id="dailyCommute"
                  type="number"
                  value={dailyCommute}
                  onChange={(e) => setDailyCommute(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tariff">Electricity Tariff (₹/kWh) *</Label>
                <Input
                  id="tariff"
                  type="number"
                  step="0.5"
                  value={electricityTariff}
                  onChange={(e) => setElectricityTariff(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="location">Charging Location</Label>
                <select
                  id="location"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={chargingLocation}
                  onChange={(e) => setChargingLocation(e.target.value as ChargingLocation)}
                >
                  <option value="home">Home</option>
                  <option value="office">Office / Workplace</option>
                  <option value="public">Public Station</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="chargerType">Charger Type *</Label>
              <select
                id="chargerType"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                value={chargerType}
                onChange={(e) => setChargerType(e.target.value as ChargerType)}
              >
                {CHARGER_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {mode === "advanced" && (
              <div className="space-y-1.5 rounded-lg border border-dashed border-border p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Advanced Parameters
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="efficiency">Vehicle Efficiency (km/kWh)</Label>
                  <Input
                    id="efficiency"
                    type="number"
                    step="0.5"
                    placeholder="7.0"
                    value={efficiency}
                    onChange={(e) => setEfficiency(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Default 7 km/kWh. Check your vehicle's spec sheet for the actual figure.
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
