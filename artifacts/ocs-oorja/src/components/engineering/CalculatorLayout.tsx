import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  children: (mode: "basic" | "advanced") => React.ReactNode;
  onCalculate: (mode: "basic" | "advanced") => void;
  result?: React.ReactNode;
}

const DISCLAIMER =
  "These calculations are engineering estimates based on user inputs and standard design assumptions. " +
  "Actual system requirements may differ due to site conditions, equipment specifications, local " +
  "regulations, and safety standards. All results must be verified and signed off by a qualified " +
  "licensed engineer before procurement or installation. No warranty, express or implied, is given.";

export function CalculatorLayout({
  title,
  description,
  children,
  onCalculate,
  result,
}: CalculatorLayoutProps) {
  const [mode, setMode] = useState<"basic" | "advanced">("basic");

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>

      <div className="mb-6 inline-flex rounded-lg border border-border bg-muted/40 p-1">
        {(["basic", "advanced"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "rounded-md px-5 py-2 text-sm font-medium capitalize transition-colors",
              mode === m
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {children(mode)}
        <div className="mt-6">
          <Button onClick={() => onCalculate(mode)} className="w-full sm:w-auto">
            Calculate
          </Button>
        </div>
      </div>

      {result && <div className="mt-8 space-y-4">{result}</div>}

      <div className="mt-8 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-300">{DISCLAIMER}</p>
      </div>
    </div>
  );
}
