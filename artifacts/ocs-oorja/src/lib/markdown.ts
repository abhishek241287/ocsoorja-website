// =============================================================================
// Minimal Markdown body parser for blog articles.
//
// Deliberately small on purpose (per the project scope directive — no plugin
// architecture, no AST library): a body is split into "## Heading" sections;
// each section's text is split into blocks by blank lines; each block is
// either a bullet/numbered list, a blockquote (all lines start with `>`), or
// a plain paragraph. Inline formatting (**bold**, *italic*, `code`, links) is
// kept as raw markdown in block text and rendered by
// `src/lib/markdown-inline.tsx` at display time — this file has zero React
// dependency so it can also run in vite.config.ts / the API server.
//
// Two heading conventions are auto-extracted into dedicated fields instead of
// staying inline sections, so the rest of the site can render them specially:
//   "## Key Takeaways"                 -> the section's bullet list becomes
//                                          `keyTakeaways: string[]`
//   "## FAQ" / "## Frequently Asked…"  -> **bold** lines inside the section
//                                          are treated as questions, and the
//                                          text until the next bold line (or
//                                          end of section) is the answer.
// =============================================================================

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; level: 3 | 4; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type ArticleSection = {
  id: string;
  heading?: string;
  blocks: ContentBlock[];
};

export type ArticleFaq = { question: string; answer: string };

export interface ParsedArticle {
  sections: ArticleSection[];
  keyTakeaways: string[];
  faqs: ArticleFaq[];
  toc: { id: string; text: string }[];
  wordCount: number;
  readingTime: string;
  /** Flattened lowercase text of the whole article, for simple client-side search. */
  plainText: string;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const BULLET_RE = /^[-*•]\s+(.*)$/;
const NUMBERED_RE = /^\d+[.)]\s+(.*)$/;
const QUOTE_RE = /^>\s?(.*)$/;
const BOLD_ONLY_RE = /^\*\*(.+)\*\*$/;
const TABLE_ROW_RE = /^\|/;
const TABLE_SEP_RE = /^[\|\s\-:]+$/;

function parseTableRow(line: string): string[] {
  return line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
}

function isTableBlock(lines: string[]): boolean {
  return (
    lines.length >= 2 &&
    lines.every((l) => TABLE_ROW_RE.test(l.trim())) &&
    TABLE_SEP_RE.test(lines[1].trim())
  );
}

function splitBlocks(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);
}

function parseBlock(raw: string): ContentBlock {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 1) {
    const h4 = /^####\s+(.+)$/.exec(lines[0]);
    if (h4) return { type: "subheading", level: 4, text: h4[1].trim() };
    const h3 = /^###\s+(.+)$/.exec(lines[0]);
    if (h3) return { type: "subheading", level: 3, text: h3[1].trim() };
  }
  if (isTableBlock(lines)) {
    const headers = parseTableRow(lines[0]);
    const rows = lines.slice(2).map(parseTableRow);
    return { type: "table", headers, rows };
  }
  if (lines.length > 0 && lines.every((l) => BULLET_RE.test(l))) {
    return { type: "list", ordered: false, items: lines.map((l) => BULLET_RE.exec(l)![1]) };
  }
  if (lines.length > 0 && lines.every((l) => NUMBERED_RE.test(l))) {
    return { type: "list", ordered: true, items: lines.map((l) => NUMBERED_RE.exec(l)![1]) };
  }
  if (lines.length > 0 && lines.every((l) => QUOTE_RE.test(l))) {
    return { type: "blockquote", text: lines.map((l) => QUOTE_RE.exec(l)![1]).join(" ") };
  }
  return { type: "paragraph", text: lines.join(" ") };
}

function blockText(block: ContentBlock): string {
  if (block.type === "list") return block.items.join(" ");
  if (block.type === "table") return [...block.headers, ...block.rows.flat()].join(" ");
  if (block.type === "subheading") return block.text;
  return block.text;
}

function isKeyTakeawaysHeading(h: string): boolean {
  return h.toLowerCase().includes("key takeaway");
}

function isFaqHeading(h: string): boolean {
  const s = h.toLowerCase().trim();
  return s === "faq" || s === "faqs" || s.includes("frequently asked");
}

export function parseMarkdownBody(md: string): ParsedArticle {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");

  type RawSection = { heading?: string; bodyLines: string[] };
  const rawSections: RawSection[] = [];
  let current: RawSection = { bodyLines: [] };

  for (const line of lines) {
    const h2 = /^##\s+(.+)$/.exec(line.trim());
    if (h2) {
      rawSections.push(current);
      current = { heading: h2[1].trim(), bodyLines: [] };
      continue;
    }
    current.bodyLines.push(line);
  }
  rawSections.push(current);

  const sections: ArticleSection[] = [];
  let keyTakeaways: string[] = [];
  const faqs: ArticleFaq[] = [];

  for (const raw of rawSections) {
    const bodyText = raw.bodyLines.join("\n").trim();
    const blocks = splitBlocks(bodyText).map(parseBlock);

    if (raw.heading && isKeyTakeawaysHeading(raw.heading)) {
      const listBlock = blocks.find((b) => b.type === "list");
      if (listBlock && listBlock.type === "list") keyTakeaways = listBlock.items;
      continue;
    }

    if (raw.heading && isFaqHeading(raw.heading)) {
      let pendingQuestion: string | null = null;
      let pendingAnswer: string[] = [];
      const flush = () => {
        if (pendingQuestion) {
          faqs.push({ question: pendingQuestion, answer: pendingAnswer.join(" ").trim() });
        }
        pendingQuestion = null;
        pendingAnswer = [];
      };
      for (const block of blocks) {
        if (block.type === "paragraph") {
          const m = BOLD_ONLY_RE.exec(block.text.trim());
          if (m) {
            flush();
            pendingQuestion = m[1].trim();
            continue;
          }
        }
        if (pendingQuestion) pendingAnswer.push(blockText(block));
      }
      flush();
      continue;
    }

    if (!raw.heading && blocks.length === 0) continue;
    sections.push({
      id: raw.heading ? slugifyHeading(raw.heading) : `section-${sections.length + 1}`,
      heading: raw.heading,
      blocks,
    });
  }

  const toc = sections
    .filter((s): s is ArticleSection & { heading: string } => Boolean(s.heading))
    .map((s) => ({ id: s.id, text: s.heading }));

  const allText = [
    ...sections.flatMap((s) => s.blocks.map(blockText)),
    ...keyTakeaways,
    ...faqs.flatMap((f) => [f.question, f.answer]),
  ]
    .join(" ")
    .toLowerCase();
  const wordCount = allText.split(/\s+/).filter(Boolean).length;
  const readingTime = `${Math.max(2, Math.ceil(wordCount / 200))} min read`;

  return { sections, keyTakeaways, faqs, toc, wordCount, readingTime, plainText: allText };
}

export function truncateAtWord(s: string, max: number): string {
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).trimEnd()}…`;
}

/** First real paragraph of the article, used as a fallback excerpt. */
export function deriveExcerpt(sections: ArticleSection[], max = 200): string | undefined {
  for (const s of sections) {
    for (const b of s.blocks) {
      if (b.type === "paragraph" && b.text.trim()) return truncateAtWord(b.text.trim(), max);
    }
  }
  return undefined;
}
