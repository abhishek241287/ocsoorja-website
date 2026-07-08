// Renders inline markdown (**bold**, *italic*, `code`, [text](url)) kept as
// raw text in ContentBlock strings (see src/lib/markdown.ts) into JSX. This is
// the one browser-only piece of the markdown pipeline — everything else in
// src/lib/markdown.ts and src/lib/frontmatter.ts is pure Node+browser-safe so
// it can also run in vite.config.ts and the API server.
import type { ReactNode } from "react";

const INLINE_RE = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

export function renderInlineMarkdown(text: string): ReactNode[] {
  return text
    .split(INLINE_RE)
    .filter((part) => part !== "")
    .map((part, i) => {
      const bold = /^\*\*([^*]+)\*\*$/.exec(part);
      if (bold) return <strong key={i}>{bold[1]}</strong>;

      const italic = /^\*([^*]+)\*$/.exec(part);
      if (italic) return <em key={i}>{italic[1]}</em>;

      const code = /^`([^`]+)`$/.exec(part);
      if (code) {
        return (
          <code key={i} className="rounded bg-muted px-1.5 py-0.5 text-[0.9em]">
            {code[1]}
          </code>
        );
      }

      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
      if (link) {
        const isExternal = /^https?:\/\//.test(link[2]);
        return (
          <a
            key={i}
            href={link[2]}
            className="font-medium text-primary-strong underline underline-offset-2 hover:no-underline"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {link[1]}
          </a>
        );
      }

      return part;
    });
}
