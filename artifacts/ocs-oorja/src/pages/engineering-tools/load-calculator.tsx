import { Link } from "wouter";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SmartLoadBuilder } from "@/components/engineering/SmartLoadBuilder";

export default function LoadCalculatorPage() {
  return (
    <>
      <Seo
        title="Home Load Calculator — Engineering Tools"
        description="Select your appliances and get instant inverter, battery, and solar sizing recommendations. No wattage knowledge needed."
        canonical="/engineering-tools/load-calculator"
      />

      <div className="container mx-auto max-w-6xl px-4 py-6">
        <Link
          href="/engineering-tools"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          All Calculators
        </Link>

        <div className="mt-6 mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Home Load Calculator
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Select your appliances — we handle the wattage. Get instant inverter, battery, and
            solar recommendations based on your actual load.
          </p>
        </div>

        <SmartLoadBuilder />

        <div className="mt-8 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-300">
            These calculations are engineering estimates based on standard Indian appliance ratings
            and your inputs. Actual system requirements may differ due to site conditions, equipment
            specifications, local regulations, and safety standards. All results must be verified
            and signed off by a qualified licensed engineer before procurement or installation.
          </p>
        </div>
      </div>
    </>
  );
}
