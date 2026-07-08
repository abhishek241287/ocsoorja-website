---
name: OCS OORJA cross-page data reuse
description: Pattern for sharing a single data source across multiple page sections without duplicating content
---

When a new page needs the same underlying entities that an existing page already renders (e.g. About page's "Industries We Serve" needing the same industries as the Homepage), extend the existing shared data file with an additional optional field rather than creating a second, parallel data file.

**Why:** OCS OORJA's non-developer-maintainability principle requires a single source of truth per content type. Duplicating `industries.ts` into an About-specific copy would mean two places to update the same facts, and the two lists could silently drift apart.

**How to apply:** Add the new field as optional on the shared type (e.g. `icon?: string`, lucide icon name), populate it for all existing entries, and have the new page's section component render the same array with a different presentation (e.g. icon cards instead of photo cards) instead of importing/authoring new data.
