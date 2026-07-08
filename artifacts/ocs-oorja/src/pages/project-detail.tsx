import { Seo } from "@/components/Seo";
import { SITE as siteConfig } from "@/data/site";
import { Link, useParams } from "wouter";
import {
  getProjectBySlug,
  getSegmentInfo,
  projects,
  type ProjectCaseStudy,
} from "@/data/projects";
import { getProductBySlug } from "@/data/products";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import ProjectCard from "@/components/projects/ProjectCard";
import ProductCard from "@/components/ui/ProductCard";
import {
  ChevronRight,
  MapPin,
  Calendar,
  Sun,
  BatteryCharging,
  Zap,
  IndianRupee,
  Leaf,
  Clock,
  FileDown,
} from "lucide-react";
import { getProjectSchema, getBreadcrumbSchema, renderJsonLd } from "@/lib/seo";
import { HEADLINES, CTAS } from "@/data/brand";

const SITE = siteConfig.url;

const STATUS_LABEL: Record<ProjectCaseStudy["status"], string> = {
  completed: "Completed",
  commissioning: "Commissioning",
  "in-progress": "In Progress",
  upcoming: "Upcoming",
};

function StatCard({ icon: Icon, label, value }: { icon: typeof Sun; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-card-border bg-card p-4 text-center">
      <Icon className="mx-auto h-5 w-5 text-primary-strong" aria-hidden="true" />
      <div className="mt-2 text-lg font-semibold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function formatInr(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <>
        <Seo title="Project not found" robots="noindex, nofollow" />
        <Container className="py-20 text-center">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <p className="mt-4 text-muted-foreground">The case study you are looking for does not exist.</p>
          <Button className="mt-8" asChild>
            <Link href="/projects">Back to projects</Link>
          </Button>
        </Container>
      </>
    );
  }

  const segment = getSegmentInfo(project.segment);
  const relatedProducts = (project.relatedProductIds ?? project.productsUsed)
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const relatedProjects = (project.relatedProjectIds ?? [])
    .map((s) => getProjectBySlug(s))
    .filter((p): p is ProjectCaseStudy => Boolean(p) && p!.slug !== project.slug);
  const seenProjects = new Set(relatedProjects.map((p) => p.slug));
  const moreProjects = [
    ...relatedProjects,
    ...projects.filter(
      (p) => p.segment === project.segment && p.slug !== project.slug && !seenProjects.has(p.slug),
    ),
  ].slice(0, 3);

  const url = `${SITE}/projects/${slug}`;
  const projectSchema = getProjectSchema({
    name: project.title,
    description: project.seo?.metaDescription ?? project.subtitle,
    url,
    image: `${SITE}${project.heroImage.src}`,
    schemaType: project.schemaType,
    location: project.location,
    dateCompleted: project.completedDate,
  });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `${SITE}/` },
    { name: "Projects", url: `${SITE}/projects` },
    { name: project.title, url },
  ]);

  return (
    <div className="py-12 md:py-16">
      <Seo
        title={project.seo?.metaTitle ?? project.title}
        description={project.seo?.metaDescription ?? project.subtitle}
        canonical={url}
        ogType="article"
        ogImage={`${SITE}${project.heroImage.src}`}
        lastModified={project.updatedAt}
      />
      <Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(projectSchema)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)} />

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/projects" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="truncate font-medium text-foreground">{project.title}</span>
        </nav>

        {/* Hero */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-card-border bg-card">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50 sm:aspect-[21/9]">
            <img
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-5 sm:p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              {segment && (
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
                  {segment.label}
                </span>
              )}
              <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                {STATUS_LABEL[project.status]}
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
              {project.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{project.subtitle}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary-strong" aria-hidden="true" />
                {project.location.city}, {project.location.state}
              </span>
              {project.completedDate && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-primary-strong" aria-hidden="true" />
                  Completed{" "}
                  {new Date(project.completedDate).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              <span>{project.clientType}</span>
            </div>

            {project.technologies?.length ? (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* System size */}
        <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {project.systemSize.solarKw > 0 && (
            <StatCard icon={Sun} label="Solar Capacity" value={`${project.systemSize.solarKw} kW`} />
          )}
          {project.systemSize.batteryKwh > 0 && (
            <StatCard icon={BatteryCharging} label="Battery Storage" value={`${project.systemSize.batteryKwh} kWh`} />
          )}
          {project.systemSize.inverterKw > 0 && (
            <StatCard icon={Zap} label="Inverter Capacity" value={`${project.systemSize.inverterKw} kW`} />
          )}
        </section>

        {/* Challenge / Solution / Results */}
        <div className="mt-10 space-y-6">
          <section className="rounded-2xl border border-card-border bg-card p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Challenge</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.challenge}</p>
          </section>
          <section className="rounded-2xl border border-card-border bg-card p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Solution</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.solution}</p>
          </section>
          <section className="rounded-2xl border border-card-border bg-card p-5 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Results</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.results}</p>
          </section>
        </div>

        {/* Gallery */}
        {project.galleryImages?.length ? (
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">Project gallery</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.galleryImages.map((img) => (
                <figure
                  key={img.src}
                  className="overflow-hidden rounded-2xl border border-card-border bg-neutral-50"
                >
                  <img src={img.src} alt={img.alt} className="aspect-[4/3] w-full object-cover" />
                  {img.caption && (
                    <figcaption className="p-3 text-xs text-muted-foreground">{img.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {/* Before / After */}
        {project.beforeAfter?.length ? (
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">Before &amp; after</h2>
            <div className="mt-5 space-y-6">
              {project.beforeAfter.map((pair, i) => (
                <div key={i} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <figure className="overflow-hidden rounded-2xl border border-card-border bg-neutral-50">
                    <img src={pair.before.src} alt={pair.before.alt} className="aspect-[4/3] w-full object-cover" />
                    <figcaption className="p-3 text-xs text-muted-foreground">Before</figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-2xl border border-card-border bg-neutral-50">
                    <img src={pair.after.src} alt={pair.after.alt} className="aspect-[4/3] w-full object-cover" />
                    <figcaption className="p-3 text-xs text-muted-foreground">After</figcaption>
                  </figure>
                  {pair.caption && (
                    <p className="sm:col-span-2 text-sm text-muted-foreground">{pair.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* ROI / Impact */}
        {project.roi ? (
          <section className="mt-10 rounded-3xl border border-border bg-secondary/60 p-5 sm:p-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Impact &amp; return on investment
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {project.roi.estimatedMonthlySavings !== undefined && (
                <StatCard
                  icon={IndianRupee}
                  label="Est. Monthly Savings"
                  value={formatInr(project.roi.estimatedMonthlySavings)}
                />
              )}
              {project.roi.annualSavings !== undefined && (
                <StatCard icon={IndianRupee} label="Est. Annual Savings" value={formatInr(project.roi.annualSavings)} />
              )}
              {project.roi.estimatedPaybackYears !== undefined && (
                <StatCard icon={Clock} label="Est. Payback" value={`${project.roi.estimatedPaybackYears} yrs`} />
              )}
              {project.roi.backupDurationHours !== undefined && (
                <StatCard icon={BatteryCharging} label="Backup Duration" value={`${project.roi.backupDurationHours} hrs`} />
              )}
              {project.roi.co2ReductionKgPerYear !== undefined && (
                <StatCard
                  icon={Leaf}
                  label="CO₂ Reduced / yr"
                  value={`${project.roi.co2ReductionKgPerYear.toLocaleString("en-IN")} kg`}
                />
              )}
              {project.roi.energyGeneratedKwhPerYear !== undefined && (
                <StatCard
                  icon={Sun}
                  label="Energy Generated / yr"
                  value={`${project.roi.energyGeneratedKwhPerYear.toLocaleString("en-IN")} kWh`}
                />
              )}
            </div>
          </section>
        ) : null}

        {/* Timeline */}
        {project.timeline?.length ? (
          <section className="mt-10">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">Project timeline</h2>
            <ol className="mt-5 space-y-5 border-l-2 border-border pl-6">
              {project.timeline.map((entry, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-card bg-primary" />
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
                    {new Date(entry.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-foreground">{entry.label}</div>
                  {entry.description && (
                    <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
                  )}
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {/* Testimonial — only rendered when a real, attributed customer quote exists */}
        {project.testimonial ? (
          <section className="mt-10 rounded-3xl border border-card-border bg-card p-6 sm:p-8">
            <blockquote className="text-lg font-medium leading-relaxed text-foreground">
              “{project.testimonial.quote}”
            </blockquote>
            <div className="mt-4 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{project.testimonial.author}</span>
              {project.testimonial.role && <> — {project.testimonial.role}</>}
            </div>
          </section>
        ) : null}

        {/* Brochure download */}
        {project.brochureUrl && (
          <div className="mt-8">
            <Button asChild size="lg" variant="outline">
              <a href={project.brochureUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                <FileDown className="h-4 w-4" /> Download case study PDF
              </a>
            </Button>
          </div>
        )}

        {/* Products used */}
        {relatedProducts.length > 0 && (
          <section className="mt-14">
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
                Equipment used
              </div>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Products in this project
              </h2>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} specsLimit={3} tagsLimit={3} showTags className="h-full" />
              ))}
            </div>
          </section>
        )}

        {/* Related projects */}
        {moreProjects.length > 0 && (
          <section className="mt-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
                  More case studies
                </div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Related projects
                </h2>
              </div>
              <Button asChild variant="link" className="hidden sm:inline-flex">
                <Link href="/projects">View all projects</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {moreProjects.map((p) => (
                <ProjectCard key={p.id} project={p} className="h-full" />
              ))}
            </div>
          </section>
        )}

        {/* Lead generation */}
        <section className="mt-16 rounded-3xl border border-border bg-secondary/60 px-6 py-10 sm:px-10 sm:py-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {HEADLINES.cta.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">{HEADLINES.cta.body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={CTAS.requestQuote.href}>{CTAS.requestQuote.label}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={CTAS.contactUs.href}>{CTAS.contactUs.label}</Link>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
