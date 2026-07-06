import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/data/blog";

// Shared blog card used on the homepage teaser, the /blog grid and the
// "related articles" strip — one card, one consistent look everywhere.
export default function ArticleCard({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  const href = `/blog/${post.slug}`;
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg",
        className,
      )}
    >
      <Link href={href} className="block" aria-label={post.title}>
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold uppercase tracking-wider text-primary-strong">
            {post.category}
          </span>
          <span className="text-muted-foreground">
            {formatDate(post.publishDate)} · {post.readingTime}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
          <Link href={href} className="transition-colors hover:text-primary-strong">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-primary-strong transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          Read More
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
