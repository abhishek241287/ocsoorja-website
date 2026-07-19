import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Download, Printer, Share2, CheckCircle2 } from "lucide-react";

interface ResultRow {
  label: string;
  value: string;
  unit?: string;
  highlight?: boolean;
}

interface ResultCardProps {
  title: string;
  results: ResultRow[];
}

function handlePrint() {
  window.print();
}

function handleShare() {
  if (navigator.share) {
    void navigator.share({ title: document.title, url: window.location.href });
  } else {
    void navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard.");
    });
  }
}

export function ResultCard({ title, results }: ResultCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-foreground">{title}</h3>

      <div className="space-y-2">
        {results.map((row, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between gap-4 rounded-lg px-4 py-3",
              row.highlight
                ? "bg-primary/10 ring-1 ring-primary/20"
                : "bg-muted/40",
            )}
          >
            <div className="flex items-center gap-2">
              {row.highlight && (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-strong" />
              )}
              <span className="text-sm text-muted-foreground">{row.label}</span>
            </div>
            <span
              className={cn(
                "font-semibold tabular-nums",
                row.highlight ? "text-primary-strong" : "text-foreground",
              )}
            >
              {row.value}
              {row.unit && (
                <span className="ml-1 text-xs font-normal text-muted-foreground">{row.unit}</span>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
        <Button variant="outline" size="sm" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button variant="outline" size="sm" onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Share Link
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          title="Use Print → Save as PDF in the print dialog"
        >
          <Download className="mr-2 h-4 w-4" />
          Save PDF
        </Button>
      </div>
    </div>
  );
}
