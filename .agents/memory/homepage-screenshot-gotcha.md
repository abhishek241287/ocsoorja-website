---
name: Homepage screenshot gotcha (full-height hero)
description: Why the app_preview screenshot tool can't capture below-the-fold homepage sections, and what to use instead.
---

The OCS OORJA homepage Hero uses a full-viewport min-height (`min-h-[100svh]`).

**Consequence:** the `screenshot` (app_preview) tool is top-anchored and captures a
single viewport starting at scroll=0. Because `100svh` scales with the requested
viewport height, the Hero always fills the entire capture — even at a very tall
viewport like 1280x3000. You therefore **cannot** capture any section below the
Hero (Why / Industries / Featured / etc.) with a single app_preview screenshot.

**How to apply:** to verify or capture below-the-fold homepage sections, use the
`testing` skill's Playwright subagent (`runTest`) — it can scroll to each section
and assert/screenshot. Do not waste turns retrying app_preview at bigger viewports.
