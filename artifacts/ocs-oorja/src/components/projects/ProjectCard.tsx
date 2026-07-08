import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { getSegmentInfo, type ProjectCaseStudy } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { MapPin } from "lucide-react";

const STATUS_LABEL: Record<ProjectCaseStudy["status"], string> = {
  completed: "Completed",
  commissioning: "Commissioning",
  "in-progress": "In Progress",
  upcoming: "Upcoming",
};

const STATUS_CLASS: Record<ProjectCaseStudy["status"], string> = {
  completed: "bg-primary/10 text-primary-strong",
  commissioning: "bg-accent-energy/15 text-accent-energy-foreground",
  "in-progress": "bg-accent-energy/15 text-accent-energy-foreground",
  upcoming: "bg-secondary text-secondary-foreground",
};

export type ProjectCardProps = {
  project: ProjectCaseStudy;
  className?: string;
};

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const href = `/projects/${project.slug}`;
  const segment = getSegmentInfo(project.segment);
  const titleId = `project-${project.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card cursor-pointer",
        "transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:transform-none hover:-translate-y-1 hover:shadow-lg",
        "hover:border-primary/40 hover:ring-1 hover:ring-primary/20",
        "min-h-[420px]",
        className,
      )}
    >
      <Link aria-hidden="true" tabIndex={-1} href={href} className="absolute inset-0 z-[1]" />

      <div className="relative aspect-[4/3] overflow-hidden border-b border-card-border bg-neutral-50">
        <span
          className={cn(
            "absolute left-3 top-3 z-[2] inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
            STATUS_CLASS[project.status],
          )}
        >
          {STATUS_LABEL[project.status]}
        </span>
        <img
          src={project.heroImage.src}
          alt={project.heroImage.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {segment && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-strong">
            {segment.shortLabel}
          </span>
        )}
        <h3
          id={titleId}
          className="mt-1.5 text-base sm:text-lg font-semibold tracking-tight text-foreground line-clamp-2 min-h-[44px] sm:min-h-[48px]"
        >
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 min-h-10">{project.subtitle}</p>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
          <span>
            {project.location.city}, {project.location.state}
          </span>
        </div>

        {project.technologies?.length ? (
          <div className="mt-4 flex flex-wrap gap-1.5 overflow-hidden">
            {project.technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-secondary-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <div className="pt-5 mt-auto relative z-[2]">
          <Button asChild size="sm" variant="outline" className="group/btn">
            <Link href={href} aria-label={`${project.title} – View case study`}>
              View case study
              <svg
                className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
