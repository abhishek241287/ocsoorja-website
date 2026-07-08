---
name: vite.config.ts cannot resolve "@/" alias imports
description: Why importing a src/data file from vite.config.ts can fail with "Cannot find package '@/data'" even though the same file works fine in app code.
---

`vite.config.ts` itself is loaded/bundled by Vite's own config loader before the `resolve.alias` config it defines takes effect. If any module that `vite.config.ts` imports (directly or transitively) uses the app's `@/` alias internally, loading the config throws `Cannot find package '@/...'`.

**Why:** the alias only exists once Vite's dev/build pipeline is running with the resolved config — the config-loading step is a separate, earlier bundling pass that doesn't know about it.

**How to apply:** any `src/data/**/index.ts` (or similar) file that needs to be importable from `vite.config.ts` (e.g. for sitemap/RSS/llms.txt generation) must use relative imports (`../products`) for its own cross-folder dependencies, not `@/...`. This matches the existing convention in `src/data/products/index.ts` and `src/data/projects/index.ts` — follow it for any new `src/data/*` aggregator.
