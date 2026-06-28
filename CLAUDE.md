# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> ⚠️ This is **Next.js 16.2.9 + React 19** (see `package.json`). The App Router APIs here
> differ from older Next.js — e.g. dynamic route `params` is a **Promise** and must be
> `await`ed. Read `node_modules/next/dist/docs/` before writing framework code (per AGENTS.md).

## What this repo is

The **source** for Ray Leung's footwear & product-design portfolio — a Next.js App Router
site that is **statically exported** and served from GitHub Pages. (This repo previously held
only the built output; it now holds the source, and CI produces the output.)

The entire site sits behind a **client-side password gate** (`src/components/Gate.tsx`,
`PASSWORD = "RayPortfolio2026"`). This is a deterrent only — on a static site the password
ships in the page source, so it is **not real security**.

## Commands

```bash
npm install            # or: npm ci
npm run dev            # dev server → http://localhost:3000
npm run build          # static export → ./out
npm run lint           # eslint (eslint-config-next, flat config)
npx serve out          # preview the static export locally after a build
```

There is no test suite in this repo.

## Architecture

**Content is data-driven.** Pages are thin; the actual portfolio content lives in two files:

- `src/lib/projects.ts` — the array of `Project` objects (slug, copy, gallery image paths,
  optional `story`) plus helpers `getProject(slug)` and `adjacent(slug)` (circular prev/next).
  **This file is marked AUTO-GENERATED** from an external scrape (`gen_projects.mjs`, which
  is *not* in this repo). Hand-edits are fine but would be lost if it is ever regenerated.
- `src/lib/site.ts` — single `site` object: name, role, bio, email, résumé link, running PRs,
  socials, and nav links. Edit copy/identity here, not in components.

**Routing (`src/app/`).** Home (`page.tsx`), `about/`, `contact/`, and the dynamic case-study
route `work/[slug]/page.tsx`. The dynamic route drives the static build via
`generateStaticParams()` (one page per project) and `generateMetadata()`; it `await`s
`params` (Next 16) and calls `notFound()` for unknown slugs. The gallery layout alternates
1-up / 2-up rows via the local `buildRows()` helper.

**Components (`src/components/`).** Server components by default. The client components
(`"use client"`) are `Gate`, `Nav`, `Marquee`, and `Reveal`. `Reveal` is the scroll-in
animation primitive (IntersectionObserver → `.reveal.in`); `ProjectStory` composes `Reveal`
to render the optional `story` blocks.

**Styling.** Tailwind CSS **v4** (via `@import "tailwindcss"` + `@theme inline` in
`src/app/globals.css`) layered over a hand-written CSS design system using custom-property
tokens (the "Performance Lab" palette). Most layout uses semantic classes from `globals.css`
rather than utility classes. Fonts are loaded with `next/font/google` (Bebas Neue / Inter /
Space Mono) and exposed as CSS variables in `layout.tsx`.

**Path alias.** `@/*` → `./src/*`.

## Static-export constraints

`next.config.ts` sets `output: "export"`, `trailingSlash: true`, and `images: { unoptimized: true }`.
Consequences when editing:

- No server runtime — no API routes, no Server Actions, no dynamic SSR, no middleware.
- **Do not use `next/image`.** Use plain `<img>` (existing code disables the lint rule inline:
  `{/* eslint-disable-next-line @next/next/no-img-element */}`). Reference images from
  `public/img/...` with absolute `/img/...` paths.
- Any new dynamic route must be fully enumerable at build time via `generateStaticParams()`.

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build` and
publishes `./out` to GitHub Pages via the Pages artifact (`upload-pages-artifact` /
`deploy-pages`). It does **not** commit anything back to the repo. Just commit and push.

**Do not run `deploy.sh`.** It is the legacy manual deploy from when this repo was
output-only: it wipes the repo contents and force-pushes `out/` to `main`, which would now
**overwrite the source**. CI replaces it entirely; it is kept only for reference.
