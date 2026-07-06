---
name: wouter Link breaks mailto:/tel:
description: Why mailto:/tel: (and other non-http schemes) must use a plain <a>, never wouter's <Link>, in this SPA.
---

# wouter `<Link>` silently breaks `mailto:` / `tel:` (and other non-http schemes)

Rule: for `mailto:`, `tel:`, or any external / non-in-app-route href, use a plain
`<a href=...>` — never wouter's `<Link>`.

**Why:** wouter's `<Link>` intercepts the click and calls `history.pushState`
against the href. For a `mailto:`/`tel:` URL that just pushes a bogus SPA entry
and the browser never hands off to the mail client / dialer, so the link looks
clickable but does nothing. It fails silently — no console error, tsc is happy.

**How to apply:** In the OCS OORJA site, contact info (email/phone) is a
customer-facing lead-gen path. The Footer already uses `<a>`; the contact page
regressed to `<Link>` and was fixed. When adding any contact link, reach for `<a>`.
The single email source is `CONTACT` in `src/data/brand.ts` (`email` + ready-made
`emailHref`).
