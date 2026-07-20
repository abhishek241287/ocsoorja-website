// Renders an article's Markdown-derived sections (see src/lib/markdown.ts).
// Non-developers never touch this file — content comes from content/blog/*.md.
import { renderInlineMarkdown } from "@/lib/markdown-inline";
import type { ArticleSection } from "@/lib/markdown";

export default function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="mt-8">
      {sections.map((section, i) => (
        <div key={section.id} className={i === 0 ? "" : "mt-8"}>
          {section.heading && (
            <h2
              id={section.id}
              className="scroll-mt-28 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
            >
              {section.heading}
            </h2>
          )}
          {section.blocks.map((block, j) => {
            if (block.type === "table") {
              return (
                <div key={j} className="mt-6 overflow-x-auto rounded-xl border border-border shadow-sm">
                  <table className="w-full min-w-[560px] text-sm border-collapse">
                    <thead>
                      <tr className="bg-primary text-primary-foreground">
                        {block.headers.map((h, k) => (
                          <th
                            key={k}
                            className="px-4 py-3 text-left font-semibold whitespace-nowrap first:rounded-tl-xl last:rounded-tr-xl"
                          >
                            {renderInlineMarkdown(h ?? "")}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, k) => (
                        <tr
                          key={k}
                          className={
                            k % 2 === 0
                              ? "bg-background hover:bg-secondary/30 transition-colors"
                              : "bg-secondary/40 hover:bg-secondary/60 transition-colors"
                          }
                        >
                          {row.map((cell, l) => (
                            <td
                              key={l}
                              className="px-4 py-3 text-muted-foreground border-t border-border align-top leading-6"
                            >
                              {renderInlineMarkdown(cell ?? "")}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
            if (block.type === "subheading") {
              const Tag = block.level === 3 ? "h3" : "h4";
              return (
                <Tag
                  key={j}
                  className={
                    block.level === 3
                      ? "mt-6 text-lg font-semibold tracking-tight text-foreground"
                      : "mt-5 text-base font-semibold tracking-tight text-foreground"
                  }
                >
                  {block.text}
                </Tag>
              );
            }
            if (block.type === "paragraph") {
              return (
                <p key={j} className="mt-3 text-base leading-8 text-muted-foreground">
                  {renderInlineMarkdown(block.text)}
                </p>
              );
            }
            if (block.type === "list") {
              if (block.ordered) {
                return (
                  <ol
                    key={j}
                    className="mt-3 list-decimal space-y-2 pl-6 text-base leading-7 text-muted-foreground"
                  >
                    {block.items.map((item, k) => (
                      <li key={k}>{renderInlineMarkdown(item)}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <ul key={j} className="mt-3 space-y-2">
                  {block.items.map((item, k) => (
                    <li
                      key={k}
                      className="flex items-start gap-2.5 text-base leading-7 text-muted-foreground"
                    >
                      <span
                        className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60"
                        aria-hidden="true"
                      />
                      <span>{renderInlineMarkdown(item)}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <blockquote
                key={j}
                className="mt-4 rounded-xl border-l-4 border-primary bg-secondary/50 px-5 py-4 text-base leading-7 text-foreground"
              >
                {renderInlineMarkdown(block.text)}
              </blockquote>
            );
          })}
        </div>
      ))}
    </div>
  );
}
