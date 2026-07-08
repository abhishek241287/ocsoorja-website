import { useCallback, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SITE as siteConfig } from "@/data/site";
import { projects, projectsSortedByDateDesc, type ProjectCaseStudy } from "@/data/projects";
import { photos as allPhotos, sortPhotos, type GalleryPhoto } from "@/data/gallery";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilters from "@/components/projects/ProjectFilters";
import GalleryCard from "@/components/gallery/GalleryCard";
import GalleryFilters from "@/components/gallery/GalleryFilters";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import { HEADLINES, CTAS } from "@/data/brand";
import { getItemListSchema, getBreadcrumbSchema, renderJsonLd } from "@/lib/seo";

const SITE = siteConfig.url;

type ProjectsTab = "case-studies" | "gallery";

export default function Projects() {
  const [activeTab, setActiveTab] = useState<ProjectsTab>("case-studies");

  const sortedProjects = useMemo(() => projectsSortedByDateDesc(projects), []);
  const [filteredProjects, setFilteredProjects] = useState<ProjectCaseStudy[]>(sortedProjects);
  const handleFilteredProjects = useCallback((filtered: ProjectCaseStudy[]) => {
    setFilteredProjects(filtered);
  }, []);

  const sortedPhotos = useMemo(() => sortPhotos(allPhotos, "newest"), []);
  const [filteredPhotos, setFilteredPhotos] = useState<GalleryPhoto[]>(sortedPhotos);
  const handleFilteredPhotos = useCallback((filtered: GalleryPhoto[]) => {
    setFilteredPhotos(filtered);
  }, []);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback(
    (photo: GalleryPhoto) => {
      const index = filteredPhotos.findIndex((p) => p.id === photo.id);
      setLightboxIndex(index >= 0 ? index : 0);
    },
    [filteredPhotos],
  );
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goToIndex = useCallback(
    (i: number) => {
      if (filteredPhotos.length === 0) return;
      const wrapped = ((i % filteredPhotos.length) + filteredPhotos.length) % filteredPhotos.length;
      setLightboxIndex(wrapped);
    },
    [filteredPhotos],
  );
  const goPrev = useCallback(() => {
    if (lightboxIndex !== null) goToIndex(lightboxIndex - 1);
  }, [lightboxIndex, goToIndex]);
  const goNext = useCallback(() => {
    if (lightboxIndex !== null) goToIndex(lightboxIndex + 1);
  }, [lightboxIndex, goToIndex]);
  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : undefined;

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

  const tabButton = (tab: ProjectsTab, label: string) => (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      aria-current={activeTab === tab ? "page" : undefined}
      className={cn(
        "rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
        activeTab === tab
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      {label}
    </button>
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

        <div className="mb-8">
          <SectionHeading
            eyebrow={HEADLINES.projects.pageEyebrow}
            title={HEADLINES.projects.pageTitle}
            subtitle={HEADLINES.projects.pageSubtitle}
            align="left"
          />
        </div>

        <div className="mb-8 inline-flex flex-wrap gap-1 rounded-full border border-border bg-card p-1">
          {tabButton("case-studies", "Case Studies")}
          {tabButton("gallery", "Installation Gallery")}
        </div>

        {activeTab === "case-studies" ? (
          <>
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
          </>
        ) : (
          <>
            {sortedPhotos.length === 0 ? (
              <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-16 text-center">
                <div className="mb-4 rounded-full bg-secondary p-6">
                  <Search className="h-10 w-10 text-primary-strong" aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">Installation photos coming soon</h3>
                <p className="max-w-md text-muted-foreground">Check back as we document our latest projects.</p>
              </div>
            ) : (
              <>
                <GalleryFilters photos={sortedPhotos} onFilteredPhotos={handleFilteredPhotos} />

                {filteredPhotos.length > 0 ? (
                  <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                    {filteredPhotos.map((p) => (
                      <GalleryCard key={p.id} photo={p} onOpen={openLightbox} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-16 text-center">
                    <div className="mb-4 rounded-full bg-secondary p-6">
                      <Search className="h-10 w-10 text-primary-strong" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-foreground">No installations found</h3>
                    <p className="max-w-md text-muted-foreground">
                      Try a different search term or browse all photos.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
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

      {activePhoto && (
        <GalleryLightbox
          photo={activePhoto}
          index={lightboxIndex ?? 0}
          total={filteredPhotos.length || 1}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}
