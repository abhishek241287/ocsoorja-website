// Public entry point for the Projects & Case Studies catalog.
//
// Consumers import from "@/data/projects" and get: the full `projects` list,
// `SEGMENTS` metadata, the `ProjectCaseStudy`/`IndustrySegment` types, and
// helper queries. The catalog is assembled by concatenating one file per
// segment, so the only place you edit to add/change a case study is that
// segment's file (mirrors src/data/products/index.ts).

import type { ProjectCaseStudy, IndustrySegment, SegmentMeta } from "./types";
import { SEGMENTS } from "./segments";
import { residential } from "./residential";
import { commercial } from "./commercial";
import { ev } from "./ev";

export * from "./types";
export * from "./segments";

// The complete case study catalog. Segments with no seed projects yet
// (Industrial, Agriculture) simply contribute nothing — no placeholder files.
export const projects: ProjectCaseStudy[] = [...residential, ...commercial, ...ev];

// Sort by completion date (falls back to publish date for in-progress /
// upcoming projects), newest first.
export function projectsSortedByDateDesc(list: ProjectCaseStudy[] = projects): ProjectCaseStudy[] {
  return [...list].sort((a, b) => {
    const aDate = new Date(a.completedDate ?? a.publishDate).getTime();
    const bDate = new Date(b.completedDate ?? b.publishDate).getTime();
    return bDate - aDate;
  });
}

// Look up a single case study by its stable slug.
export function getProjectBySlug(
  slug: string,
  list: ProjectCaseStudy[] = projects,
): ProjectCaseStudy | undefined {
  return list.find((p) => p.slug === slug);
}

// All case studies within a segment.
export function getProjectsBySegment(
  segment: IndustrySegment,
  list: ProjectCaseStudy[] = projects,
): ProjectCaseStudy[] {
  return list.filter((p) => p.segment === segment);
}

// Segment metadata by id.
export function getSegmentInfo(segment: IndustrySegment): SegmentMeta | undefined {
  return SEGMENTS.find((s) => s.id === segment);
}

// Case studies that reference a given product slug (used for the "Used in
// Projects" section on product detail pages — bidirectional discovery).
export function getProjectsUsingProduct(
  productSlug: string,
  list: ProjectCaseStudy[] = projects,
): ProjectCaseStudy[] {
  return list.filter((p) => p.productsUsed.includes(productSlug));
}

// Case studies that reference a given blog article slug (used for a "Related
// Projects" section on article pages, if/when one is added).
export function getProjectsUsingArticle(
  articleSlug: string,
  list: ProjectCaseStudy[] = projects,
): ProjectCaseStudy[] {
  return list.filter((p) => p.relatedArticleIds?.includes(articleSlug));
}

// Case studies grouped by segment, following the SEGMENTS display order.
// Segments with no projects are omitted.
export function getProjectsGroupedBySegment(
  list: ProjectCaseStudy[] = projects,
): { segment: SegmentMeta; projects: ProjectCaseStudy[] }[] {
  return SEGMENTS.map((segment) => ({
    segment,
    projects: list.filter((p) => p.segment === segment.id),
  })).filter((group) => group.projects.length > 0);
}
