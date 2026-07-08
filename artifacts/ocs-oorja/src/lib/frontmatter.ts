// =============================================================================
// Minimal YAML-like frontmatter parser — flat fields only (no nesting).
//
// Supported value forms on the right of `key: `:
//   "quoted string"     -> string (handles \" and \\ escapes)
//   bareword / bare text -> string, used as-is (e.g. dates like 2026-07-07)
//   true / false        -> boolean
//   [a, b, c]           -> string[] (each item trimmed; quotes optional)
//
// Deliberately does NOT support nested objects, multi-line values, or full
// YAML — that complexity isn't needed for blog article metadata, and keeping
// the grammar tiny keeps this file (and the writer in blog-publish.ts that
// mirrors it) easy to reason about.
// =============================================================================

export type FrontmatterValue = string | boolean | string[];
export type Frontmatter = Record<string, FrontmatterValue>;

const FIELD_RE = /^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/;

function parseValue(raw: string): FrontmatterValue {
  const v = raw.trim();
  if (v === "true") return true;
  if (v === "false") return false;
  if (v.startsWith("[") && v.endsWith("]")) {
    const inner = v.slice(1, -1).trim();
    if (!inner) return [];
    return inner
      .split(",")
      .map((s) => s.trim().replace(/^"(.*)"$/, "$1"))
      .filter(Boolean);
  }
  if (v.startsWith('"') && v.endsWith('"') && v.length >= 2) {
    return v
      .slice(1, -1)
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\");
  }
  return v;
}

/** Parses `---\nkey: value\n---\n<body>` into { data, body }. */
export function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const normalized = raw.replace(/\r\n?/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return { data: {}, body: normalized.trim() };
  }
  const end = normalized.indexOf("\n---", 4);
  if (end === -1) {
    return { data: {}, body: normalized.trim() };
  }
  const block = normalized.slice(4, end);
  const bodyStart = normalized.indexOf("\n", end + 1);
  const body = (bodyStart === -1 ? "" : normalized.slice(bodyStart + 1)).trim();

  const data: Frontmatter = {};
  for (const line of block.split("\n")) {
    if (!line.trim()) continue;
    const m = FIELD_RE.exec(line);
    if (!m) continue;
    data[m[1]] = parseValue(m[2]);
  }
  return { data, body };
}

export function getString(data: Frontmatter, key: string): string | undefined {
  const v = data[key];
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

export function getBoolean(data: Frontmatter, key: string): boolean | undefined {
  const v = data[key];
  return typeof v === "boolean" ? v : undefined;
}

export function getStringArray(data: Frontmatter, key: string): string[] | undefined {
  const v = data[key];
  return Array.isArray(v) && v.length > 0 ? v : undefined;
}
