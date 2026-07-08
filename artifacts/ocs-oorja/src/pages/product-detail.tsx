import { Seo } from "@/components/Seo";
import { SITE as siteConfig } from "@/data/site";
import { Link, useParams } from "wouter";
import {
  getProductBySlug,
  getProductsByFamily,
  getFamilyInfo,
  DEFAULT_CTA,
  type Product,
} from "@/data/products";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import {
  CheckCircle2,
  FileDown,
  ChevronRight,
  ShieldCheck,
  Award,
  Sun,
  Home,
  BatteryCharging,
  Zap,
  Battery,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ProductImageGallery from "@/components/ui/ProductImageGallery";
import ProductCard from "@/components/ui/ProductCard";
import ProjectCard from "@/components/projects/ProjectCard";
import { getProjectsUsingProduct } from "@/data/projects";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  getProductSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  renderJsonLd,
} from "@/lib/seo";
import { HEADLINES, CTAS } from "@/data/brand";

const SITE = siteConfig.url;

// Map the lucide icon NAME stored in family data to its component (UI layer).
const FAMILY_ICONS: Record<string, LucideIcon> = {
  Sun,
  Home,
  BatteryCharging,
  Zap,
  Battery,
};

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-card-border bg-card p-5 sm:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {items.map((txt, i) => (
          <li key={`${title}-${i}`} className="flex items-start gap-2.5 text-sm text-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary-strong" aria-hidden="true" />
            <span>{txt}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProductDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <>
        <Seo title="Product not found" robots="noindex, nofollow" />
        <Container className="py-20 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-4 text-muted-foreground">The product you are looking for does not exist.</p>
          <Button className="mt-8" asChild>
            <Link href="/products">Back to products</Link>
          </Button>
        </Container>
      </>
    );
  }

  const family = getFamilyInfo(product.family);
  const FamilyIcon = family ? FAMILY_ICONS[family.icon] : undefined;
  const hasMain = Boolean(product.details || product.features?.length || product.applications?.length);
  const isPlaceholder = product.status === "placeholder";
  const cta = product.cta ?? DEFAULT_CTA;

  // Related products: prefer explicit relatedSlugs, then fill from the same
  // family (excluding this product), capped at 3.
  const relatedBySlug = (product.relatedSlugs ?? [])
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => Boolean(p) && p!.slug !== product.slug);
  const seen = new Set(relatedBySlug.map((p) => p.slug));
  const related = [
    ...relatedBySlug,
    ...getProductsByFamily(product.family).filter((p) => p.slug !== product.slug && !seen.has(p.slug)),
  ].slice(0, 3);

  const url = `${SITE}/products/${slug}`;
  const productSchema = getProductSchema({
    name: product.name,
    description: product.seo?.metaDescription ?? product.summary,
    url,
    image: product.image ? `${SITE}${product.image}` : undefined,
  });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `${SITE}/` },
    { name: "Products", url: `${SITE}/products` },
    { name: product.name, url },
  ]);
  const faqSchema = product.faqs?.length ? getFAQSchema(product.faqs) : null;
  const projectsUsingProduct = getProjectsUsingProduct(product.slug);

  return (
    <div className="py-12 md:py-16">
      <Seo
        title={product.seo?.metaTitle ?? product.name}
        description={product.seo?.metaDescription ?? product.summary}
        canonical={url}
        ogType="product"
        ogImage={product.image ? `${SITE}${product.image}` : undefined}
        contentType="product"
        lastModified={product.dateAdded}
      />
      <Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(productSchema)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)} />
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={renderJsonLd(faqSchema)} />
        )}

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/products" className="transition-colors hover:text-foreground">
            Products
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="truncate font-medium text-foreground">{product.name}</span>
        </nav>

        {/* Hero */}
        <section className="mt-6 rounded-3xl border border-card-border bg-card p-5 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:items-center md:gap-8">
            <div className="md:col-span-2">
              {product.images && product.images.length > 1 ? (
                <ProductImageGallery images={product.images} alt={product.name} />
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-card-border bg-neutral-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain p-6"
                  />
                </div>
              )}
            </div>

            <div className="md:col-span-3">
              <div className="flex flex-wrap items-center gap-3">
                {family && (
                  <div className="flex items-center gap-1.5 text-primary-strong">
                    {FamilyIcon && <FamilyIcon className="h-4 w-4" aria-hidden="true" />}
                    <span className="text-xs font-semibold uppercase tracking-wider">{family.label}</span>
                  </div>
                )}
                {isPlaceholder && (
                  <span className="inline-flex items-center rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    Coming soon
                  </span>
                )}
              </div>

              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{product.summary}</p>

              {product.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {product.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 inline-flex items-center gap-2.5 rounded-xl border border-border bg-secondary/60 px-4 py-2.5">
                <ShieldCheck className="h-5 w-5 flex-none text-primary-strong" aria-hidden="true" />
                <span className="text-sm text-foreground">
                  <span className="font-semibold">Warranty:</span> {product.warranty}
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
                {product.downloads?.datasheet && (
                  <Button asChild size="lg" variant="outline">
                    <a href={product.downloads.datasheet} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                      <FileDown className="h-4 w-4" /> Datasheet
                    </a>
                  </Button>
                )}
                {product.downloads?.brochure && (
                  <Button asChild size="lg" variant="outline">
                    <a href={product.downloads.brochure} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                      <FileDown className="h-4 w-4" /> Brochure
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Details + specifications */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {hasMain && (
            <div className="space-y-6 lg:col-span-8">
              {product.details && (
                <section className="rounded-2xl border border-card-border bg-card p-5 sm:p-6">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Overview</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{product.details}</p>
                </section>
              )}
              {product.features?.length ? <ListCard title="Features" items={product.features} /> : null}
              {product.applications?.length ? <ListCard title="Applications" items={product.applications} /> : null}
            </div>
          )}

          <aside className={cn("h-fit", hasMain ? "lg:col-span-4 lg:sticky lg:top-24" : "lg:col-span-12")}>
            <div className="rounded-2xl border border-card-border bg-card p-5 sm:p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Key specifications
              </h2>
              <dl className="mt-3 divide-y divide-border">
                <div className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-sm text-muted-foreground">Warranty</dt>
                  <dd className="min-w-0 text-right text-sm font-medium text-foreground">{product.warranty}</dd>
                </div>
                {product.specs.map((s) => (
                  <div key={s.key} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="text-sm text-muted-foreground">{s.key}</dt>
                    <dd className="min-w-0 text-right text-sm font-medium text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>

              {product.certifications?.length ? (
                <div className="mt-5 border-t border-border pt-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Certifications</h3>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {product.certifications.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        <Award className="h-3.5 w-3.5" aria-hidden="true" /> {c}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="mt-6">
                <Button asChild size="lg" className="w-full">
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>

        {/* FAQ */}
        {product.faqs?.length ? (
          <section className="mt-12">
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Frequently asked questions
            </h2>
            <div className="mt-4 rounded-2xl border border-card-border bg-card px-5 sm:px-6">
              <Accordion type="single" collapsible className="w-full">
                {product.faqs.map((f, i) => (
                  <AccordionItem key={`faq-${i}`} value={`faq-${i}`}>
                    <AccordionTrigger className="text-base font-medium text-foreground hover:no-underline">
                      {f.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-7 text-muted-foreground">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        ) : null}

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
                  More from this range
                </div>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Related products
                </h2>
              </div>
              <Button asChild variant="link" className="hidden sm:inline-flex">
                <Link href="/products">View all products</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} specsLimit={3} tagsLimit={3} showTags className="h-full" />
              ))}
            </div>
          </section>
        )}

        {/* Used in projects (bidirectional discovery) */}
        {projectsUsingProduct.length > 0 && (
          <section className="mt-14">
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
                Proven in the field
              </div>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Used in real projects
              </h2>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projectsUsingProduct.map((p) => (
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
