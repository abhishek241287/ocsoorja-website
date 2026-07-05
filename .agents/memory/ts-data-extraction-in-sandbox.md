---
name: Eval TS data files in the code_execution sandbox
description: How to load a pure-data TypeScript module's values inside the JS code sandbox when workspace deps aren't resolvable.
---

The `code_execution` sandbox runs from the repo root and **cannot resolve
workspace-installed packages** via `await import(...)` — e.g. `import('esbuild')`
fails with ERR_MODULE_ONT_FOUND even though esbuild is a dependency of an
artifact (pnpm hoists it under a path the root import can't see).

**Why it matters:** to transform/migrate a large TS *data* file (no runtime
imports, just typed literals) you often want the real JS values, not to re-type
them by hand.

**How to apply:** don't reach for a transpiler. Read the file as text, locate the
`export const <name>: <Type> = [` marker, and scan forward with a
string/comment/bracket-aware cursor to capture the balanced array/object literal,
then `eval('(' + literalText + ')')`. The scanner must skip `//` line comments,
`/* */` block comments, and string bodies (`"`, `'`, backtick) with escape
handling — otherwise an apostrophe inside a `// comment` is misread as a string
start and bracket matching breaks. Trailing commas and inline comments inside the
literal are fine for `eval`.

This preserves long text blocks (specs, multi-paragraph descriptions)
byte-for-byte, which hand-retyping would not.
