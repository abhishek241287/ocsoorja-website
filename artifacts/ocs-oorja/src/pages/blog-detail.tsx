import { useState } from "react";
import { Link, useParams } from "wouter";
import {
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Linkedin,
  Twitter,
  Facebook,
  MessageCircle,
  Link2,
  Check,
} from "lucide-react";
import { Seo } from "@/components/Seo";
import { SITE as siteConfig } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { HEADLINES, CTAS } from "@/data/brand";
import { formatDate } from "@/lib/format";
import { getPostBySlug, getRelatedPosts, getAdjacentPosts } from "@/data/blog";
import {
  getArticleSchema,
  getBreadcrumbSchema,
  renderJsonLd,
} from "@/lib/seo";
import ArticleCard from "@/components/blog/ArticleCard";

const SITE = siteConfig.url;

export default function BlogDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const post = getPostBySlug(slug);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <>
        <Seo title="Article not found" />
        <Container className="py-20 text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <p className="mt-4 text-muted-foreground">
            The article you are looking for does not exist.
          </p>
          <Button className="mt-8" asChild>
            <Link href="/blog">Back to blog</Link>
          </Button>
        </Container>
      </>
    );
  }

  const url = `${SITE}/blog/${post.slug}`;
  const related = getRelatedPosts(post.slug, 3);
  const { previous, next } = getAdjacentPosts(post.slug);

  const articleSchema = getArticleSchema({
    title: post.title,
    description: post.seoDescription,
    url,
    image: `${SITE}${post.image}`,
    author: post.author,
    datePublished: post.publishDate,
  });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `${SITE}/` },
    { name: "Blog", url: `${SITE}/blog` },
    { name: post.title, url },
  ]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(post.title);
  const shareLinks = [
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: Linkedin,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: Twitter,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: Facebook,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      Icon: MessageCircle,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — silently ignore.
    }
  };

  return (
    <div className="py-12 md:py-16">
      <Seo
        title={post.seoTitle}
        description={post.seoDescription}
        canonical={url}
      />
      <Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={renderJsonLd(articleSchema)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={renderJsonLd(breadcrumbSchema)}
        />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-sm text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground"
          >
            Blog
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="truncate font-medium text-foreground">
            {post.title}
          </span>
        </nav>

        <article className="mx-auto mt-6 max-w-3xl">
          {/* Header */}
          <header>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-strong">
                {post.category}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {formatDate(post.publishDate)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {post.readingTime}
              </span>
            </div>
          </header>

          {/* Hero image */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-card-border bg-card">
            <div className="relative aspect-[16/9] w-full">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Share */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5 border-b border-border pb-6">
            <span className="mr-1 text-sm font-medium text-muted-foreground">
              Share
            </span>
            {shareLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-primary-strong"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
            <button
              type="button"
              onClick={copyLink}
              aria-label="Copy link"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-card px-3.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-primary-strong"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" aria-hidden="true" /> Copied
                </>
              ) : (
                <>
                  <Link2 className="h-4 w-4" aria-hidden="true" /> Copy link
                </>
              )}
            </button>
          </div>

          {/* Body */}
          <div className="mt-8">
            {post.content.map((section, i) => (
              <div key={i} className={i === 0 ? "" : "mt-8"}>
                {section.heading && (
                  <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((paragraph, j) => (
                  <p
                    key={j}
                    className="mt-3 text-base leading-8 text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Prev / next */}
          {(previous || next) && (
            <nav
              className="mt-12 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2"
              aria-label="More articles"
            >
              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Previous
                  </span>
                  <span className="mt-2 font-medium text-foreground transition-colors group-hover:text-primary-strong">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" aria-hidden="true" />
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group flex flex-col items-start rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 sm:items-end sm:text-right"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Next
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="mt-2 font-medium text-foreground transition-colors group-hover:text-primary-strong">
                    {next.title}
                  </span>
                </Link>
              )}
            </nav>
          )}
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary-strong">
                Keep reading
              </div>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                Related articles
              </h2>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ArticleCard key={p.slug} post={p} className="h-full" />
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
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                {HEADLINES.cta.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={CTAS.requestQuote.href}>
                  {CTAS.requestQuote.label}
                </Link>
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
