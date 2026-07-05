import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";

/* ---------- small local helpers (page-scoped) ---------- */

function Swatch({
  token,
  className,
  note,
}: {
  token: string;
  className: string;
  note?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className={cn("h-16 w-full rounded-lg border border-border", className)} />
      <div className="text-xs font-medium text-foreground">{token}</div>
      {note ? <div className="text-xs text-muted-foreground">{note}</div> : null}
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border pt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/* ---------- data ---------- */

const greenScale: { token: string; className: string }[] = [
  { token: "green-50", className: "bg-brand-green-50" },
  { token: "green-100", className: "bg-brand-green-100" },
  { token: "green-200", className: "bg-brand-green-200" },
  { token: "green-300", className: "bg-brand-green-300" },
  { token: "green-400", className: "bg-brand-green-400" },
  { token: "green-500", className: "bg-brand-green-500" },
  { token: "green-600", className: "bg-brand-green-600" },
  { token: "green-700", className: "bg-brand-green-700" },
  { token: "green-800", className: "bg-brand-green-800" },
  { token: "green-900", className: "bg-brand-green-900" },
];

const roles: { token: string; className: string; note: string }[] = [
  { token: "primary", className: "bg-primary", note: "Primary fills / actions" },
  { token: "primary-strong", className: "bg-primary-strong", note: "Brand text / icons / links (AA on any bg)" },
  { token: "secondary", className: "bg-secondary", note: "Light green surface" },
  { token: "accent", className: "bg-accent", note: "Hover / selected" },
  { token: "muted", className: "bg-muted", note: "Subtle background" },
  { token: "accent-energy", className: "bg-accent-energy", note: "Energy (yellow)" },
  { token: "accent-warm", className: "bg-accent-warm", note: "Warm (orange)" },
  { token: "destructive", className: "bg-destructive", note: "Errors" },
  { token: "card", className: "bg-card", note: "Card surface" },
  { token: "border", className: "bg-border", note: "Hairlines" },
  { token: "foreground", className: "bg-foreground", note: "Text / dark UI" },
];

const typeScale: { name: string; cls: string }[] = [
  { name: "text-4xl", cls: "text-4xl" },
  { name: "text-3xl", cls: "text-3xl" },
  { name: "text-2xl", cls: "text-2xl" },
  { name: "text-xl", cls: "text-xl" },
  { name: "text-lg", cls: "text-lg" },
  { name: "text-base", cls: "text-base" },
  { name: "text-sm", cls: "text-sm" },
  { name: "text-xs", cls: "text-xs" },
];

const spacingRamp: { label: string; px: number }[] = [
  { label: "1 · 4px", px: 4 },
  { label: "2 · 8px", px: 8 },
  { label: "3 · 12px", px: 12 },
  { label: "4 · 16px", px: 16 },
  { label: "6 · 24px", px: 24 },
  { label: "8 · 32px", px: 32 },
  { label: "12 · 48px", px: 48 },
  { label: "16 · 64px", px: 64 },
];

const radii: { name: string; cls: string }[] = [
  { name: "rounded-sm", cls: "rounded-sm" },
  { name: "rounded-md", cls: "rounded-md" },
  { name: "rounded-lg", cls: "rounded-lg" },
  { name: "rounded-xl", cls: "rounded-xl" },
  { name: "rounded-full", cls: "rounded-full" },
];

const shadows: { name: string; cls: string }[] = [
  { name: "shadow-sm", cls: "shadow-sm" },
  { name: "shadow-md", cls: "shadow-md" },
  { name: "shadow-lg", cls: "shadow-lg" },
  { name: "shadow-xl", cls: "shadow-xl" },
];

const buttonVariantList: NonNullable<ButtonProps["variant"]>[] = [
  "primary",
  "secondary",
  "outline",
  "ghost",
  "energy",
  "link",
];

const buttonSizeList: NonNullable<ButtonProps["size"]>[] = ["sm", "md", "lg"];

/* ---------- page ---------- */

export default function DesignSystem() {
  const sampleProduct = products[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header>
        <div className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
          Internal reference
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          OCS Brand Design System
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          The single source of truth for color, type, spacing, elevation, motion,
          and the core UI components. Everything here is driven by design tokens in{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">src/index.css</code>,
          so a token change updates the whole site at once. This page is not linked in
          the public navigation.
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {/* PALETTE */}
        <Section
          title="Color"
          description="Deep green is the brand primary. Use bg-primary for fills (white text passes WCAG AA) and text-primary-strong for brand-colored text, icons, and links — it brightens in dark mode to stay AA-compliant. Yellow and orange are energy accents for emphasis only — never body text. Use semantic roles, not raw scale values, in components."
        >
          <div className="space-y-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">Brand green scale</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {greenScale.map((s) => (
                  <Swatch key={s.token} token={s.token} className={s.className} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-foreground">Semantic roles</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                {roles.map((r) => (
                  <Swatch key={r.token} token={r.token} className={r.className} note={r.note} />
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* TYPOGRAPHY */}
        <Section
          title="Typography"
          description="Inter across the interface. Headings use tight tracking and semibold weight; body copy stays at regular weight with comfortable line height."
        >
          <div className="space-y-3">
            {typeScale.map((t) => (
              <div key={t.name} className="flex items-baseline gap-4">
                <span className="w-24 shrink-0 text-xs text-muted-foreground">{t.name}</span>
                <span className={cn("font-semibold tracking-tight text-foreground", t.cls)}>
                  Integrated clean energy
                </span>
              </div>
            ))}
            <div className="flex items-baseline gap-4 pt-2">
              <span className="w-24 shrink-0 text-xs text-muted-foreground">body</span>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                Reliable, factory-direct power systems engineered for Indian
                conditions — inverters, LiFePO₄ storage, and EV charging.
              </p>
            </div>
          </div>
        </Section>

        {/* SPACING */}
        <Section
          title="Spacing"
          description="An 8px rhythm (with 4px half-steps). Compose layouts from these steps to keep vertical and horizontal spacing consistent."
        >
          <div className="space-y-3">
            {spacingRamp.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <span className="w-24 shrink-0 text-xs text-muted-foreground">{s.label}</span>
                <div className="h-4 rounded bg-primary" style={{ width: s.px }} />
              </div>
            ))}
          </div>
        </Section>

        {/* RADIUS + SHADOW */}
        <Section
          title="Radius & elevation"
          description="A restrained radius scale and soft, low-spread shadows. Avoid oversized or neon shadows."
        >
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Radius</h3>
              <div className="flex flex-wrap gap-5">
                {radii.map((r) => (
                  <div key={r.name} className="flex flex-col items-center gap-2">
                    <div className={cn("h-16 w-16 border border-border bg-secondary", r.cls)} />
                    <span className="text-xs text-muted-foreground">{r.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold text-foreground">Elevation</h3>
              <div className="flex flex-wrap gap-5">
                {shadows.map((s) => (
                  <div key={s.name} className="flex flex-col items-center gap-2">
                    <div className={cn("h-16 w-16 rounded-lg bg-card", s.cls)} />
                    <span className="text-xs text-muted-foreground">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* MOTION */}
        <Section
          title="Motion"
          description="Motion is functional and restrained — it clarifies state, it does not decorate."
        >
          <ul className="max-w-2xl list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Micro-interactions (hover, focus): ~150ms. Larger transitions: ~300ms.</li>
            <li>Prefer opacity, color, and small translate/scale over large movement.</li>
            <li>
              Always honor <code className="rounded bg-muted px-1 py-0.5">prefers-reduced-motion</code>{" "}
              — components disable transforms when it is set.
            </li>
            <li>No infinite/looping decorative animation on content surfaces.</li>
          </ul>
        </Section>

        {/* BUTTONS */}
        <Section
          title="Buttons"
          description="Six variants and three sizes. Every button has visible keyboard focus (tab to see the green focus ring), plus hover, active, and disabled states."
        >
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-4">
              {buttonVariantList.map((v) => (
                <Button key={v} variant={v}>
                  {v}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {buttonSizeList.map((s) => (
                <Button key={s} size={s}>
                  Size {s}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button disabled>Disabled</Button>
              <Button variant="outline" disabled>
                Disabled
              </Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
        </Section>

        {/* FORMS */}
        <Section
          title="Form controls"
          description="Inputs and textareas share the same border, focus ring, and invalid states so forms feel consistent."
        >
          <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="ds-name">Name</Label>
              <Input id="ds-name" className="mt-1.5" placeholder="Jane Doe" />
            </div>
            <div>
              <Label htmlFor="ds-email">Email (invalid)</Label>
              <Input
                id="ds-email"
                className="mt-1.5"
                aria-invalid
                defaultValue="not-an-email"
              />
              <p className="mt-1 text-xs text-destructive">Enter a valid email address.</p>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="ds-msg">Message</Label>
              <Textarea id="ds-msg" rows={4} className="mt-1.5" placeholder="How can we help?" />
            </div>
            <div>
              <Label htmlFor="ds-disabled">Disabled</Label>
              <Input id="ds-disabled" className="mt-1.5" disabled placeholder="Disabled" />
            </div>
          </div>
        </Section>

        {/* TABLE */}
        <Section
          title="Table"
          description="Used for specification sheets and comparison data. Semantic tokens keep it legible in both themes."
        >
          <div className="rounded-xl border border-card-border bg-card p-2">
            <Table>
              <TableCaption>Representative specification table</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Unit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Nominal voltage</TableCell>
                  <TableCell>12.8</TableCell>
                  <TableCell>V</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Capacity</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>Ah</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cycle life (@80% DoD)</TableCell>
                  <TableCell>≥ 5000</TableCell>
                  <TableCell>cycles</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Efficiency</TableCell>
                  <TableCell>≥ 98</TableCell>
                  <TableCell>%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Section>

        {/* CARDS */}
        <Section
          title="Cards"
          description="A neutral Card primitive for content surfaces, and the ProductCard used across the catalog."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>
                  A solid, tokenized surface — no glassmorphism or glow.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use cards to group related content. They sit on the background with a
                  hairline border and a soft shadow.
                </p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Primary action</Button>
              </CardFooter>
            </Card>
            {sampleProduct ? (
              <ProductCard product={sampleProduct} />
            ) : null}
          </div>
        </Section>
      </div>
    </div>
  );
}
