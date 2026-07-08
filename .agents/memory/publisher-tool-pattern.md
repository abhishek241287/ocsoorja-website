---
name: Publisher-tool pattern
description: Architecture pattern shared by OCS OORJA's internal Blog Publisher and Gallery Publisher admin tools — use it as the template for any future "let a non-developer add content" tool.
---

OCS OORJA has a hard project principle (see `replit.md`): every routine content update must be doable by a non-developer editing a single data source, with zero new architectural layers (no DB table, no JSON store, no uploads queue) beyond what already exists.

Both admin publishers (`/blog-publisher`, `/gallery-publisher`) implement this the same way:

- **Route gating**: the API route only responds when `NODE_ENV === "development"` and there is no `REPLIT_DEPLOYMENT` env var; it 404s otherwise. The page itself is only bundled via a `lazy(() => import(...))` gated on `import.meta.env.DEV`, so it's tree-shaken out of production builds entirely.
- **Storage**: the route does NOT introduce a database, JSON file, or uploads folder as a system of record. It writes media files directly into the existing `public/images/<domain>/<category>/` convention, then appends a new record directly into the relevant existing hand-authored `.ts` data file (e.g. `src/data/gallery/<category>.ts`) via a regex-based array insert. The data file remains the single source of truth that a developer could also hand-edit.
- **Body size**: large base64 image payloads need a per-route body-size override registered BEFORE the global body parser in `app.ts` (both publishers do this at ~150mb).
- **UI success state**: because writing a new `.ts` file under `src/data/*` (or a new blog `.md` file) triggers a Vite dev-server restart, the publisher page persists its "success" panel in `sessionStorage` so the reload doesn't lose the confirmation.

**Why:** keeps the non-developer maintainability guarantee intact — anyone (dev or not) can still open the same data file and see/edit every record by hand, with no hidden second source of truth.

**How to apply:** if asked to build another "let the client add X without touching code" tool (e.g. a Projects/case-study publisher), follow this exact shape rather than introducing a database or admin CMS.
