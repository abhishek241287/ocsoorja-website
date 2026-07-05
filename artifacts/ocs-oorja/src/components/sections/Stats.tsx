import { Container } from "@/components/layout/Container";

const stats = [
  { label: "Cycle life", value: "≥ 5000" },
  { label: "Battery protection", value: "Advanced BMS" },
  { label: "Avg. lead time", value: "1–2 weeks" },
  { label: "Supply & pricing", value: "Factory-Direct" },
];

export default function Stats() {
  return (
    <section className="py-10">
      <Container>
        <div className="grid grid-cols-2 gap-6 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-semibold tracking-tight">{s.value}</div>
              <div className="mt-1 text-xs text-foreground/60">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
