// In-page navigation for long articles. Renders only with >= 3 headings —
// auto-derived from the article's "##" headings, nothing to maintain.
// Plain <a> anchors (not wouter's <Link>) so in-page hash scrolling works.
export default function TableOfContents({
  items,
}: {
  items: { id: string; text: string }[];
}) {
  if (items.length < 3) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="mt-8 rounded-2xl border border-border bg-card p-5"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-sm text-primary-strong hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
