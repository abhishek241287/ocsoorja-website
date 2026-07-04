import { Seo } from "@/components/Seo";
import { Link } from "wouter";
import { products } from "@/data/products";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, FileDown, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductImageGallery from "@/components/ui/ProductImageGallery";
import { getProductSchema, renderJsonLd } from "@/lib/seo";
import { useParams } from "wouter";

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-foreground/10 p-5 sm:p-6">
      <h2 className="text-sm font-semibold tracking-wide text-foreground/80">{title}</h2>
      <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-foreground/80">
        {items.map((txt, i) => (
          <li key={`${title}-${i}`} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none shrink-0 text-emerald-500" /> {txt}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProductDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const product = products.find((p) => p.slug === slug);
  
  if (!product) {
    return (
      <>
        <Seo title="Product not found" />
        <Container className="py-20 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-4">The product you are looking for does not exist.</p>
          <Button className="mt-8" asChild>
            <Link href="/products">Back to products</Link>
          </Button>
        </Container>
      </>
    );
  }

  const hasMain = Boolean(product.details || product.features?.length || product.applications?.length);
  const productSchema = getProductSchema({
    name: product.name,
    description: product.summary,
    url: `https://www.ocsoorja.com/products/${slug}`,
  });

  return (
    <div className="py-12 md:py-16">
      <Seo
        title={product.name}
        description={product.summary}
        canonical={`https://www.ocsoorja.com/products/${slug}`}
      />
      <Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={renderJsonLd(productSchema)}
        />
        <nav className="text-sm text-foreground/70">
          <Link href="/products" className="hover:text-foreground">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <section className="mt-6 rounded-3xl border border-foreground/10 bg-foreground/[0.02] supports-[backdrop-filter]:bg-foreground/5 supports-[backdrop-filter]:backdrop-blur-md p-5 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:items-center">
            <div className="md:col-span-2">
              {product.images && product.images.length > 1 ? (
                <ProductImageGallery images={product.images} alt={product.name} />
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-foreground/10 bg-background">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain p-4 w-full h-full"
                  />
                </div>
              )}
            </div>
            <div className="md:col-span-3">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">{product.name}</h1>
              <p className="mt-3 text-base leading-7 text-foreground/80 max-w-2xl">{product.summary}</p>
              {product.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-background px-2.5 py-1 text-xs text-foreground/70">
                      <Tag className="h-3.5 w-3.5" /> {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {hasMain && (
            <div className="lg:col-span-8 space-y-6">
              {product.details && (
                <div className="rounded-2xl border border-foreground/10 p-5 sm:p-6">
                  <h2 className="text-sm font-semibold tracking-wide text-foreground/80">Overview</h2>
                  <p className="mt-2 text-sm text-foreground/80 max-w-3xl">{product.details}</p>
                </div>
              )}

              {product.features?.length ? (
                <ListCard title="Features" items={product.features} />
              ) : null}
              {product.applications?.length ? (
                <ListCard title="Applications" items={product.applications} />
              ) : null}
            </div>
          )}

          <aside className={cn("h-fit", hasMain ? "lg:col-span-4 lg:sticky lg:top-20" : "lg:col-span-12") }>
            <div className="rounded-2xl border border-foreground/10 bg-background p-5 sm:p-6">
              <h2 className="text-sm font-semibold tracking-wide text-foreground/80">Key specifications</h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-foreground/80">
                {product.specs.map((s) => (
                  <li key={s.key} className="rounded-md border border-foreground/10 px-3 py-2">
                    <span className="font-medium text-foreground">{s.key}</span>: {s.value}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {product.datasheetUrl && (
                  <Button variant="outline" asChild>
                    <a href={product.datasheetUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
                      <FileDown className="h-4 w-4" /> Datasheet
                    </a>
                  </Button>
                )}
                <Button asChild>
                  <Link href="/contact">Request quote</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
