import { Link } from "wouter";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HOME_SECTIONS } from "@/data/home";
import { CTAS } from "@/data/brand";
import { getLatestPosts } from "@/data/blog";
import ArticleCard from "@/components/blog/ArticleCard";

// Homepage teaser — automatically shows the latest three blog articles
// (newest first). Add an article in src/data/blog.ts and it appears here.
export default function LatestArticles() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow={HOME_SECTIONS.insights.eyebrow}
          title={HOME_SECTIONS.insights.title}
          subtitle={HOME_SECTIONS.insights.subtitle}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <Link href={CTAS.viewAllArticles.href}>
              {CTAS.viewAllArticles.label}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
