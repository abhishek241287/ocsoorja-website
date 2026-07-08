import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SEGMENTS, type IndustrySegment, type ProjectCaseStudy } from "@/data/projects";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS: { id: ProjectCaseStudy["status"]; label: string }[] = [
  { id: "completed", label: "Completed" },
  { id: "commissioning", label: "Commissioning" },
  { id: "in-progress", label: "In Progress" },
  { id: "upcoming", label: "Upcoming" },
];

type ProjectFiltersProps = {
  projects: ProjectCaseStudy[];
  onFilteredProjects: (projects: ProjectCaseStudy[]) => void;
};

export default function ProjectFilters({ projects, onFilteredProjects }: ProjectFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedSegment, setSelectedSegment] = useState<IndustrySegment | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ProjectCaseStudy["status"] | "all">("all");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const availableSegments = useMemo(() => {
    const present = new Set(projects.map((p) => p.segment));
    return SEGMENTS.filter((s) => present.has(s.id));
  }, [projects]);

  const filtered = useMemo(() => {
    let list = projects;
    if (selectedSegment !== "all") list = list.filter((p) => p.segment === selectedSegment);
    if (selectedStatus !== "all") list = list.filter((p) => p.status === selectedStatus);
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [projects, selectedSegment, selectedStatus, debouncedQuery]);

  useEffect(() => {
    onFilteredProjects(filtered);
  }, [filtered, onFilteredProjects]);

  const clearAll = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSelectedSegment("all");
    setSelectedStatus("all");
  };

  const pill = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium transition-colors border",
      active
        ? "border-primary bg-primary text-primary-foreground shadow-sm"
        : "border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground",
    );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2.5">
        <button type="button" onClick={() => setSelectedSegment("all")} className={pill(selectedSegment === "all")}>
          All Segments
        </button>
        {availableSegments.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedSegment(s.id)}
            className={pill(selectedSegment === s.id)}
          >
            {s.shortLabel}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, city, technology…"
            aria-label="Search projects"
            className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedStatus("all")}
            className={pill(selectedStatus === "all")}
          >
            All Status
          </button>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedStatus(s.id)}
              className={pill(selectedStatus === s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {filtered.length === projects.length ? (
            <>
              Showing all <span className="font-semibold text-foreground">{projects.length}</span> projects
            </>
          ) : (
            <>
              Found <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
              <span className="font-medium text-foreground">{projects.length}</span> projects
            </>
          )}
        </p>
        {(searchQuery || selectedSegment !== "all" || selectedStatus !== "all") && (
          <button
            type="button"
            onClick={clearAll}
            className="shrink-0 text-sm font-medium text-primary-strong hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
