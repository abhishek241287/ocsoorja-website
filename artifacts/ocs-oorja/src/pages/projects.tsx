import { useCallback, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SITE as siteConfig } from "@/data/site";
import { projects, projectsSortedByDateDesc, type ProjectCaseStudy } from "@/data/projects";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilters from "@/components/projects/ProjectFilters";
import { HEADLINES, CTAS } from "@/data/brand";
import { getItemListSchema, getBreadcrumbSchema, renderJsonLd } from "@/lib/seo";

const SITE = siteConfig.url;

export default function Projects() {
  const sortedProjects = useMemo(() => projectsSortedByDateDesc(projects), []);
  const [filteredProjects, setFilteredProjects] = useState<ProjectCaseStudy[]>(sortedProjects);

  const handleFilteredProjects = useCallback((filtered: ProjectCaseStudy[]) => {
    setFilteredProjects(filtered);
  }, []);

  const itemListSchema = useMemo(
    () =>
      getItemListSchema(
        sortedProjects.map((p) => ({ name: p.title, url: `${SITE}/projects/${p.slug}` })),
      ),
    [sortedProjects],
  );
  const breadcrumbSchema = useMemo(
    () =>
      getBreadcrumbSchema([
        { name: "Home", url: `${SITE}/` },
        { name: "Projects", url: `${SITE}/projects` },
      ]),
    [],
  );

  return (
    <div className="py-12 md:py-16">
      <Seo
        title={HEADLINES.projects.metaTitle}
        description={HEADLINES.projects.metaDescription}
        canonical={`${SITE}/projects`}
      />
      <Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(itemListSchema)} />

        <div className="mb-10">
          <SectionHeading
            eyebrow={HEADLINES.projects.pageEyebrow}
            title={HEADLINES.projects.pageTitle}
            subtitle={HEADLINES.projects.pageSubtitle}
            align="left"
          />
        </div>

        <ProjectFilters projects={sortedProjects} onFilteredProjects={handleFilteredProjects} />

        {filteredProjects.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} className="h-full" />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-16 text-center">
            <div className="mb-4 rounded-full bg-secondary p-6">
              <Search className="h-10 w-10 text-primary-strong" aria-hidden="true" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">No projects found</h3>
            <p className="max-w-md text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
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
