# jefflesterdev-web

This is the front end for my personal portfolio site. Rather than building it once, I built it three times using three different frameworks, all pulling data from the same API. The idea is that any developer looking at this repo can see how I approach the same problem in React, Vue, and plain TypeScript without any framework at all.

All three apps look and behave identically from a user perspective. Each one has a switcher in the sidebar so you can jump between them and compare.

## Apps

**`apps/next-app`** - Built with Next.js 15 (App Router) and React. Runs as a static export deployed to Cloudflare Workers via `@cloudflare/next-on-pages`.

**`apps/nuxt-app`** - Built with Nuxt 3 in SPA mode (no SSR). Deployed to Cloudflare Pages as a static site.

**`apps/vanilla`** - No framework. Just TypeScript, a small hand-rolled render function, and the DOM. Built with Vite and deployed to Cloudflare Workers as a static site.

## Shared packages

**`packages/types`** - TypeScript types shared across all three apps. Defines the shape of the API responses so there's one source of truth.

**`packages/i18n`** - Translation strings and a tiny `useTranslations` helper. The site supports English and French (Canada).

## Stack

- **Styling:** Tailwind CSS v4 across all three apps
- **Fonts:** Inter + JetBrains Mono via Google Fonts
- **API:** [jefflesterdev-api](https://github.com/jefflesterdev/jefflesterdev-api) running on Cloudflare Workers
- **Hosting:** Cloudflare Pages / Workers
- **Package manager:** pnpm workspaces

## Getting started

Install everything from the repo root:

```bash
pnpm install
```

Run each app on its own port:

```bash
pnpm dev:next     # http://localhost:3000
pnpm dev:nuxt     # http://localhost:3001
pnpm dev:vanilla  # http://localhost:3002
```

Each app points at the production API by default in dev. If you're running the API locally as well, update the `VITE_API_URL` environment variable.

## Environment variables

Each app reads from a `.env.local` file (for local overrides) and `.env.production` (baked in at build time by Vite).

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Base URL for the resume API |
| `VITE_NEXT_URL` | URL for the Next.js app (used by the switcher) |
| `VITE_NUXT_URL` | URL for the Nuxt app |
| `VITE_VANILLA_URL` | URL for the Vanilla app |

## Resume page

All three apps include a `/resume` route that fetches live data from the API and renders a clean, print-ready resume layout. There's a "Save as PDF" button that triggers the browser's print dialog, which in Chrome and Edge produces a clean PDF with no extra headers or footers if you turn those off in the print settings.

## Deployment

Each app deploys independently to Cloudflare via GitHub Actions or Wrangler. The Nuxt and Vanilla apps deploy as static sites, and the Next.js app goes through `@cloudflare/next-on-pages`.
