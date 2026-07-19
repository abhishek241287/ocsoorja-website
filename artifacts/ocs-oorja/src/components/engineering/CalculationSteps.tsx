import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Step {
  label: string;
  value: string;
  unit?: string;
}

interface CalculationStepsProps {
  steps: Step[];
}

export function CalculationSteps({ steps }: CalculationStepsProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-border bg-muted/40">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
        aria-expanded={expanded}
      >
        <span>{expanded ? "Hide Calculation Steps" : "Show Calculation Steps"}</span>
        {expanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-border px-4 py-3">
          <ol className="space-y-2">
            {steps.map((step, i) => (
              <li key={i} className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-muted-foreground">
                  {i + 1}. {step.label}
                </span>
                <span className="font-medium tabular-nums">
                  {step.value}
                  {step.unit && (
                    <span className="ml-1 text-xs text-muted-foreground">{step.unit}</span>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
