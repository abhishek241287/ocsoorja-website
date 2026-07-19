import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Minus, Plus, Trash2, ChevronDown, ChevronUp, Pencil, Search, Zap, Battery, Sun, X } from "lucide-react";
import {
  APPLIANCE_DATABASE,
  BHK_PRESETS,
  POPULAR_APPLIANCE_IDS,
  ROOM_QUICK_ADD,
  getAppliancesByCategory,
  getAppliance,
  type Segment,
  type BhkPresetItem,
} from "@/lib/engineering/appliance-database";
import {
  calculateLoadBuilder,
  type SelectedAppliance,
} from "@/lib/engineering/calculations/load-builder";
import { ENGINEERING_CONSTANTS } from "@/lib/engineering/constants";
import { CalculationSteps } from "@/components/engineering/CalculationSteps";

const SEGMENTS: { id: Segment; label: string }[] = [
  { id: "household", label: "Household" },
  { id: "office", label: "Office" },
  { id: "commercial", label: "Commercial" },
  { id: "industrial", label: "Industrial" },
];

const STATES = Object.keys(ENGINEERING_CONSTANTS.solar.peakSunHours);

export function SmartLoadBuilder() {
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  const [segment, setSegment] = useState<Segment>("household");
  const [selections, setSelections] = useState<Record<string, SelectedAppliance>>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [state, setState] = useState("Uttar Pradesh");
  const [backupHours, setBackupHours] = useState(4);

  const selectedList = useMemo(() => Object.values(selections), [selections]);

  const result = useMemo(
    () => calculateLoadBuilder({ appliances: selectedList, state, backupHours, futureExpansion: "low" }),
    [selectedList, state, backupHours],
  );

  const categories = useMemo(() => getAppliancesByCategory(segment), [segment]);

  const searchResults = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    return APPLIANCE_DATABASE.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.id.includes(q),
    );
  }, [search]);

  const popularAppliances = useMemo(
    () => POPULAR_APPLIANCE_IDS.map((id) => getAppliance(id)).filter(Boolean),
    [],
  );

  const addAppliance = (id: string) => {
    const def = getAppliance(id);
    if (!def) return;
    setSelections((prev) =>
      prev[id]
        ? { ...prev, [id]: { ...prev[id], quantity: prev[id].quantity + 1 } }
        : { ...prev, [id]: { applianceId: id, quantity: 1, hoursPerDay: def.defaultHours } },
    );
  };

  const updateSelection = (id: string, patch: Partial<SelectedAppliance>) =>
    setSelections((prev) => (prev[id] ? { ...prev, [id]: { ...prev[id], ...patch } } : prev));

  const removeAppliance = (id: string) =>
    setSelections((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });

  const loadPreset = (items: BhkPresetItem[]) => {
    const next: Record<string, SelectedAppliance> = {};
    for (const item of items) {
      next[item.applianceId] = {
        applianceId: item.applianceId,
        quantity: item.quantity,
        hoursPerDay: item.hoursPerDay,
      };
    }
    setSelections(next);
    setSearch("");
  };

  return (
    <div className="space-y-6">
      {/* ── BHK Presets ── */}
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Start with a preset — then edit
        </p>
        <div className="flex flex-wrap gap-2">
          {BHK_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                loadPreset(preset.items);
                if (preset.id === "office-preset") setSegment("office");
                else if (preset.id === "shop-preset") setSegment("commercial");
                else setSegment("household");
              }}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium transition-colors hover:border-primary/60 hover:bg-primary/5 hover:text-primary-strong"
            >
              {preset.emoji} {preset.label}
            </button>
          ))}
          {Object.keys(selections).length > 0 && (
            <button
              onClick={() => setSelections({})}
              className="rounded-lg border border-dashed border-destructive/40 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* ════ LEFT: Picker ════ */}
        <div className="space-y-5">
          {/* Basic / Advanced toggle */}
          <div className="flex items-center gap-4">
            <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1">
              {(["basic", "advanced"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors",
                    mode === m
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
            {mode === "advanced" && (
              <span className="text-xs text-muted-foreground">
                Wattage values become editable in Advanced mode
              </span>
            )}
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search appliance — AC, TV, Fan, Pump, Laptop…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* ── Search Results ── */}
          {searchResults !== null && (
            <div>
              <p className="mb-2 text-xs text-muted-foreground">
                {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for "{search}"
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {searchResults.length === 0 ? (
                  <p className="col-span-full rounded-lg border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
                    No appliances matched. Try a different keyword.
                  </p>
                ) : (
                  searchResults.map((app) => {
                    const sel = selections[app.id];
                    return (
                      <ApplianceCard
                        key={app.id}
                        app={app}
                        sel={sel}
                        onAdd={() => addAppliance(app.id)}
                        onInc={() => addAppliance(app.id)}
                        onDec={() =>
                          sel?.quantity === 1
                            ? removeAppliance(app.id)
                            : updateSelection(app.id, { quantity: (sel?.quantity ?? 1) - 1 })
                        }
                      />
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ── No-search: Popular + Segment + Room + Categories ── */}
          {searchResults === null && (
            <>
              {/* Popular appliances */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  ⭐ Most Selected
                </p>
                <div className="flex flex-wrap gap-2">
                  {popularAppliances.map((app) => {
                    if (!app) return null;
                    const sel = selections[app.id];
                    return (
                      <button
                        key={app.id}
                        onClick={() => addAppliance(app.id)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors",
                          sel
                            ? "border-primary bg-primary/10 text-primary-strong"
                            : "border-border bg-card hover:border-primary/50 hover:text-primary-strong",
                        )}
                      >
                        {sel && <span className="font-semibold">{sel.quantity}×</span>}
                        <Plus className="h-3 w-3" />
                        {app.name.replace(/ \(.*?\)/, "").replace(/"/, "")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Segment tabs */}
              <div className="flex flex-wrap gap-2">
                {SEGMENTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSegment(s.id);
                      setExpandedCategory(null);
                    }}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      segment === s.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Room Quick Add */}
              {segment === "household" && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Quick Add by Room
                  </p>
                  {ROOM_QUICK_ADD.map(({ room, emoji, applianceIds }) => (
                    <div key={room} className="flex flex-wrap items-center gap-2">
                      <span className="w-28 shrink-0 text-sm font-medium">
                        {emoji} {room}
                      </span>
                      {applianceIds.map((id) => {
                        const def = getAppliance(id);
                        if (!def) return null;
                        const sel = selections[id];
                        return (
                          <button
                            key={id}
                            onClick={() => addAppliance(id)}
                            className={cn(
                              "rounded-full border px-2.5 py-1 text-xs transition-colors",
                              sel
                                ? "border-primary bg-primary/10 text-primary-strong"
                                : "border-border bg-card hover:border-primary/50",
                            )}
                          >
                            {sel ? `${sel.quantity}× ` : "+ "}
                            {def.name.replace(/ \(.*?\)/, "").replace(/ \d+"/, "").replace("Inverter ", "").trim()}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}

              {/* Category accordions */}
              <div className="space-y-2">
                {Object.entries(categories).map(([category, apps]) => {
                  const open = expandedCategory === category;
                  const selectedCount = apps.filter((a) => selections[a.id]).length;
                  return (
                    <div key={category} className="rounded-xl border border-border bg-card overflow-hidden">
                      <button
                        onClick={() => setExpandedCategory(open ? null : category)}
                        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-muted/30 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          {category}
                          {selectedCount > 0 && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary-strong">
                              {selectedCount} added
                            </span>
                          )}
                        </span>
                        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                      {open && (
                        <div className="grid gap-2 border-t border-border p-4 sm:grid-cols-2">
                          {apps.map((app) => {
                            const sel = selections[app.id];
                            return (
                              <ApplianceCard
                                key={app.id}
                                app={app}
                                sel={sel}
                                onAdd={() => addAppliance(app.id)}
                                onInc={() => addAppliance(app.id)}
                                onDec={() =>
                                  sel?.quantity === 1
                                    ? removeAppliance(app.id)
                                    : updateSelection(app.id, { quantity: (sel?.quantity ?? 1) - 1 })
                                }
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* ════ RIGHT: Summary ════ */}
        <div className="lg:sticky lg:top-4 lg:self-start space-y-4">
          {/* Selected list */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 text-base font-semibold">
              Selected Appliances
              {result.lines.length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({result.lines.length})
                </span>
              )}
            </h3>

            {result.lines.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No appliances yet. Search or tap any appliance to begin.
              </p>
            ) : (
              <div className="space-y-2">
                {result.lines.map((line) => {
                  const sel = selections[line.applianceId];
                  return (
                    <div key={line.applianceId} className="rounded-lg bg-muted/40 p-3">
                      {/* Name + delete */}
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium leading-tight">{line.name}</span>
                        <button
                          onClick={() => removeAppliance(line.applianceId)}
                          className="shrink-0 text-muted-foreground hover:text-destructive"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {/* Controls row */}
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        {/* Quantity stepper */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              sel?.quantity === 1
                                ? removeAppliance(line.applianceId)
                                : updateSelection(line.applianceId, { quantity: (sel?.quantity ?? 1) - 1 })
                            }
                            className="flex h-5 w-5 items-center justify-center rounded border border-border bg-background hover:bg-muted"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-sm font-semibold text-foreground">
                            {line.quantity}
                          </span>
                          <button
                            onClick={() => addAppliance(line.applianceId)}
                            className="flex h-5 w-5 items-center justify-center rounded border border-border bg-background hover:bg-muted"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Hours */}
                        <label className="flex items-center gap-1">
                          <input
                            type="number"
                            min={0}
                            max={24}
                            step={0.5}
                            value={sel?.hoursPerDay ?? 0}
                            onChange={(e) =>
                              updateSelection(line.applianceId, {
                                hoursPerDay: Math.min(24, Math.max(0, Number(e.target.value))),
                              })
                            }
                            className="h-6 w-14 rounded border border-input bg-background px-1 text-center text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                          />
                          <span>h/day</span>
                        </label>

                        {/* Wattage */}
                        {mode === "advanced" ? (
                          <label className="flex items-center gap-1">
                            <Pencil className="h-3 w-3" />
                            <input
                              type="number"
                              min={1}
                              value={sel?.wattageOverride ?? line.watts}
                              onChange={(e) =>
                                updateSelection(line.applianceId, {
                                  wattageOverride: Math.max(1, Number(e.target.value)),
                                })
                              }
                              className="h-6 w-16 rounded border border-input bg-background px-1 text-center text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                            />
                            <span>W</span>
                          </label>
                        ) : (
                          <span>{line.watts} W</span>
                        )}

                        <span className="ml-auto font-medium text-foreground">
                          {line.dailyEnergy.toFixed(2)} kWh/day
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recommendation card */}
          {result.lines.length > 0 && (
            <>
              {/* Settings */}
              <div className="grid grid-cols-2 gap-3 rounded-xl border border-border bg-card p-4 text-xs">
                <label className="space-y-1">
                  <span className="text-muted-foreground">State (for solar)</span>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    {STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="text-muted-foreground">Backup duration</span>
                  <Input
                    type="number"
                    min={1}
                    max={24}
                    value={backupHours}
                    onChange={(e) => setBackupHours(Math.max(1, Number(e.target.value)))}
                    className="h-8 text-xs"
                  />
                </label>
              </div>

              {/* System summary */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Recommended System
                </h3>

                {/* Big 3 */}
                <div className="space-y-2 mb-4">
                  <RecommendRow
                    icon={<Zap className="h-4 w-4" />}
                    label="Inverter"
                    value={`${result.recommendedInverterKva} kVA`}
                    color="text-primary-strong"
                    bg="bg-primary/10"
                  />
                  <RecommendRow
                    icon={<Battery className="h-4 w-4" />}
                    label="Battery"
                    value={`${result.recommendedBatteryKwh} kWh`}
                    color="text-primary-strong"
                    bg="bg-primary/10"
                  />
                  <RecommendRow
                    icon={<Sun className="h-4 w-4" />}
                    label="Solar"
                    value={`${result.recommendedSolarKw} kW`}
                    color="text-primary-strong"
                    bg="bg-primary/10"
                  />
                </div>

                {/* Metrics */}
                <div className="space-y-1.5 border-t border-border pt-3 text-sm">
                  <SummaryRow
                    label="⚡ Connected Load"
                    value={`${(result.totalConnectedLoad / 1000).toFixed(2)} kW`}
                  />
                  <SummaryRow
                    label="🏃 Running Load (est.)"
                    value={`${(result.estimatedRunningLoad / 1000).toFixed(2)} kW`}
                  />
                  <SummaryRow
                    label="📅 Daily Consumption"
                    value={`${result.dailyEnergyConsumption.toFixed(1)} kWh/day`}
                    highlight
                  />
                </div>

                <div className="mt-4">
                  <CalculationSteps steps={result.steps} />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Wattages are standard estimates for typical Indian appliances. Actual ratings vary by
                model — check the appliance nameplate. Final system design must be verified by a
                qualified engineer.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ApplianceCard({
  app,
  sel,
  onAdd,
  onInc,
  onDec,
}: {
  app: { id: string; name: string; watts: number };
  sel: SelectedAppliance | undefined;
  onAdd: () => void;
  onInc: () => void;
  onDec: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-colors",
        sel ? "border-primary/40 bg-primary/5" : "border-border",
      )}
    >
      <div className="min-w-0 flex-1 pr-2">
        <div className="font-medium leading-tight">{app.name}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{app.watts} W</div>
      </div>
      {sel ? (
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onDec}
            className="flex h-6 w-6 items-center justify-center rounded border border-border bg-background hover:bg-muted"
            aria-label="Decrease"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-6 text-center text-sm font-semibold">{sel.quantity}</span>
          <button
            onClick={onInc}
            className="flex h-6 w-6 items-center justify-center rounded border border-border bg-background hover:bg-muted"
            aria-label="Increase"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <Button size="sm" variant="outline" onClick={onAdd} className="shrink-0 h-7 text-xs">
          + Add
        </Button>
      )}
    </div>
  );
}

function RecommendRow({
  icon,
  label,
  value,
  color,
  bg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  bg: string;
}) {
  return (
    <div className={cn("flex items-center justify-between rounded-lg px-3 py-2.5", bg)}>
      <div className={cn("flex items-center gap-2", color)}>
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className={cn("text-base font-bold tabular-nums", color)}>{value}</span>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-semibold tabular-nums", highlight && "text-primary-strong")}>{value}</span>
    </div>
  );
}
