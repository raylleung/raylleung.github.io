# raylleung.github.io

Ray Leung — footwear & product design portfolio. Built with **Next.js** (App Router, static export) and deployed to **GitHub Pages**.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)

```bash
npm run build    # outputs static site to ./out
```

## Deploy

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`),
which builds the static export and publishes it to GitHub Pages automatically.
No manual steps — just commit and push.

> The local `deploy.sh` script (manual build-and-push) is no longer needed now that
> CI handles deploys, but it's kept for reference.

## Structure

- `src/app/` — pages (`page.tsx` home, `about/`, `contact/`, `work/[slug]/` case studies), `globals.css`, `layout.tsx`
- `src/components/` — `Nav`, `Footer`, `Marquee`, `ProjectGrid`, `ProjectStory`, `Reveal`, `Gate`
- `src/lib/` — `projects.ts` (project data + copy), `site.ts` (name, role, PRs, socials, nav)
- `public/img/` — optimized project imagery

## Password gate

The site is behind a light client-side password gate (`src/components/Gate.tsx`).
This is a deterrent for casual visitors, **not real security** — on a static site the
password lives in the page source. Change `PASSWORD` in that file to update it.
