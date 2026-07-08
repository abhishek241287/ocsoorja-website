import { useCallback, useMemo, useState } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { Search } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SITE as siteConfig } from "@/data/site";
import { photos as allPhotos, sortPhotos, getPhotoBySlug, type GalleryPhoto } from "@/data/gallery";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import GalleryCard from "@/components/gallery/GalleryCard";
import GalleryFilters from "@/components/gallery/GalleryFilters";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import { HEADLINES, CTAS } from "@/data/brand";
import { getItemListSchema, getBreadcrumbSchema, renderJsonLd } from "@/lib/seo";

const SITE = siteConfig.url;

export default function Gallery() {
  const [, routeParams] = useRoute<{ slug: string }>("/gallery/photo/:slug");
  const [, navigate] = useLocation();

  const sortedPhotos = useMemo(() => sortPhotos(allPhotos, "newest"), []);
  const [filteredPhotos, setFilteredPhotos] = useState<GalleryPhoto[]>(sortedPhotos);

  const handleFilteredPhotos = useCallback((filtered: GalleryPhoto[]) => {
    setFilteredPhotos(filtered);
  }, []);

  const activeSlug = routeParams?.slug;
  const activeIndex = activeSlug ? filteredPhotos.findIndex((p) => p.slug === activeSlug) : -1;
  const activePhoto = activeSlug
    ? (activeIndex >= 0 ? filteredPhotos[activeIndex] : getPhotoBySlug(activeSlug))
    : undefined;

  const closeLightbox = useCallback(() => navigate("/gallery"), [navigate]);
  const goToIndex = useCallback(
    (i: number) => {
      if (filteredPhotos.length === 0) return;
      const wrapped = ((i % filteredPhotos.length) + filteredPhotos.length) % filteredPhotos.length;
      navigate(`/gallery/photo/${filteredPhotos[wrapped].slug}`);
    },
    [filteredPhotos, navigate],
  );
  const goPrev = useCallback(() => goToIndex(activeIndex - 1), [activeIndex, goToIndex]);
  const goNext = useCallback(() => goToIndex(activeIndex + 1), [activeIndex, goToIndex]);

  const heroImage = sortedPhotos.find((p) => p.featured) ?? sortedPhotos[0];

  const itemListSchema = useMemo(
    () =>
      getItemListSchema(sortedPhotos.map((p) => ({ name: p.alt, url: `${SITE}/gallery/photo/${p.slug}` }))),
    [sortedPhotos],
  );
  const breadcrumbSchema = useMemo(
    () =>
      getBreadcrumbSchema([
        { name: "Home", url: `${SITE}/` },
        { name: "Gallery", url: `${SITE}/gallery` },
      ]),
    [],
  );

  return (
    <div className="pb-12 md:pb-16">
      <Seo
        title={HEADLINES.gallery.metaTitle}
        description={HEADLINES.gallery.metaDescription}
        canonical={`${SITE}/gallery`}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(itemListSchema)} />

      <section className="relative flex min-h-[50vh] items-end overflow-hidden sm:min-h-[60vh]">
        {heroImage && (
          <img
            src={heroImage.src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70"
          aria-hidden="true"
        />
        <Container className="relative z-10 pb-10 pt-28 sm:pb-14">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {HEADLINES.gallery.pageTitle}
          </h1>
          <p className="mt-3 max-w-xl text-base text-white/80 sm:text-lg">{HEADLINES.gallery.pageSubtitle}</p>
          <Button asChild size="lg" className="mt-6 bg-white text-black hover:bg-white/90">
            <Link href={CTAS.requestQuote.href}>Request Similar Installation</Link>
          </Button>
        </Container>
      </section>

      <Container className="pt-8">
        {sortedPhotos.length === 0 ? (
          <EmptyState
            title="Installation photos coming soon"
            body="Check back as we document our latest projects."
          />
        ) : (
          <>
            <GalleryFilters photos={sortedPhotos} onFilteredPhotos={handleFilteredPhotos} />

            {filteredPhotos.length > 0 ? (
              <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                {filteredPhotos.map((p) => (
                  <GalleryCard key={p.id} photo={p} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No installations found"
                body="Try a different search term or browse all photos."
              />
            )}
          </>
        )}

        <section className="mt-16 rounded-3xl border border-border bg-secondary/60 px-6 py-10 text-center sm:px-10 sm:py-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Ready to power your property?
          </h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href={CTAS.requestQuote.href}>Request Similar Installation</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={CTAS.contactUs.href}>{CTAS.contactUs.label}</Link>
            </Button>
          </div>
        </section>
      </Container>

      {activePhoto && (
        <GalleryLightbox
          photo={activePhoto}
          index={Math.max(activeIndex, 0)}
          total={filteredPhotos.length || 1}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border border-border bg-card py-16 text-center">
      <div className="mb-4 rounded-full bg-secondary p-6">
        <Search className="h-10 w-10 text-primary-strong" aria-hidden="true" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-foreground">{title}</h3>
      <p className="max-w-md text-muted-foreground">{body}</p>
    </div>
  );
}
