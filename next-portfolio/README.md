# Next.js Portfolio (Migration)

This directory contains the in-progress migration of the static portfolio to a modern **Next.js 14 (App Router)** + **TypeScript** stack with **Tailwind CSS**, **framer-motion**, and **next-themes**.

## Stack
- Next.js App Router (server components + edge-capable routing)
- TypeScript strict mode
- Tailwind CSS with custom design tokens & animations
- framer-motion for declarative motion (prefers-reduced-motion aware)
- next-themes for light / dark (future: dim / contrast) modes
- API Route for contact form with validation + rate limiting (demo)

## Implemented Features
- Home, Projects list, Dynamic project pages
- About page (philosophy, skills, tooling)
- Contact form (client validation + server schema validation)
- Accessible toast host (single instance) groundwork
- Global metadata (OpenGraph + Twitter)
- `sitemap.xml` + `robots.txt`
- Basic performance-conscious styling & layout shift avoidance

## Pending / Roadmap
- Additional theme variants: dim & high-contrast
- Reduced-effects hook to selectively disable / shorten motion
- Optional MDX content pipeline for project long-form writeups
- Image optimization via `next/image`
- Form submission persistence (database / email service)
- Testing (Playwright + unit tests for helpers)

## Contact API
Location: `app/api/contact/route.ts`

Validation powered by `zod` (add to dependencies if not already). Simple in-memory rate limiter: 5 submissions / hour / IP.

Response shape:
```json
{ "ok": true }
```
Or on error:
```json
{ "error": "message" }
```

## Environment Variables
Create a `.env.local` (not committed):
```
NEXT_PUBLIC_SITE_URL=https://your-domain.tld
```
(Used for sitemap + metadataBase.)

## Development
Install dependencies:
```
npm install
```
Run dev server:
```
npm run dev
```
Build:
```
npm run build
```
Start production preview:
```
npm start
```

## Data
Project data: `data/projects.json`. Utilities: `lib/projects.ts`.

To add a project, append an object with `title`, `slug`, `summary`, (optional) `updated`, `tags`.

## Theming
Currently ships light / dark / system via `next-themes`. Additional variants will extend CSS variable layers in `app/globals.css` and toggle logic in `ThemeToggle`.

## Accessibility & Motion
Animations lean on framer-motion. A future `useMotionSafe()` hook will gate or shorten transitions based on `prefers-reduced-motion` and a manual override.

## Motion Preferences Hook
Implemented `useMotionPreferences` in `lib/motion.ts`:
- Respects `prefers-reduced-motion`
- Optional override via `localStorage.setItem('motion', 'reduced' | 'full' | 'none')`
- Adds `reduce-effects` class for coarse CSS fallback

Usage example in `components/Hero.tsx` scaling durations.

## MDX Integration
Configured via `next.config.mjs` using `@next/mdx`.
- MDX files live under `content/projects/*.mdx`
- Dynamic project route attempts to load an MDX file by slug; falls back to JSON content.

Add a new MDX file:
```
content/projects/my-project.mdx
```
Frontmatter keys supported (parsed manually for now): `slug`, `title`, `summary`, `updated`.

## Deployment
Vercel: `vercel.json` includes security headers.
Netlify: `netlify.toml` with build command + basic redirects.
Ensure environment variable:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.tld
```
Redeploy after adding new MDX or project JSON entries for updated sitemap.

## Legacy Feature Parity Additions
- Service Worker: `public/sw.js` registered via `ServiceWorkerRegister` (prod only) for offline-first static shell.
- Lightbox: Global `LightboxProvider` and `LightboxImage` component for zoomable images.
- Performance Budget: `lib/perfBudget.ts` + `PerfBudgetClient` warns in dev when configured thresholds exceeded (from `performance-budget.json`).
- Contact Persistence: `/api/submissions` reads from `backend/contact-submissions.json` (dev file store). Admin view at `/admin` (Bearer token: `ADMIN_TOKEN`).
- Toast System: Central `ToastHost` + `useToast` hook; contact form uses success/error toasts.

### Image Assets Migration
Copy original binary assets (e.g. `assets/images/profile.jpg`) into `public/`:
```
# Example (PowerShell)
Copy-Item ..\assets\images\profile.jpg .\public\profile.jpg
```
Then reference as `<img src="/profile.jpg" />` or with a future `next/image` optimization.

### Admin Token Setup
Add to `.env.local`:
```
ADMIN_TOKEN=choose-a-long-random-string
```
Requests to `/api/submissions` must include header: `Authorization: Bearer <token>`.

### Lightbox Usage
Wrap layout with `LightboxProvider` (already done). Use:
```tsx
<LightboxImage src="/profile.jpg" alt="Profile" caption="Author portrait" />
```

### Performance Budget Customization
Edit root `performance-budget.json` metrics. Adjust `setTimeout` delay in `runPerfBudgetCheck` if you need later sampling.

## Remaining Opportunities
- Replace manual JSON persistence with a DB or serverless KV.
- Implement auth (NextAuth / middleware) instead of static bearer token.
- Add PWA manifest + icons for richer offline install.
- Integrate `next/image` with responsive sizes & blur placeholders.
- Add test coverage (Playwright + Vitest/Jest for lib logic).

## Testing
Unit & component tests use **Vitest** + **@testing-library/react** with a jsdom environment.

Scripts:
```
npm run test        # one-off run
npm run test:watch  # watch mode
```

Structure:
- `tests/*.test.ts(x)` colocated in `tests/` root.
- `vitest.config.ts` sets `jsdom` environment and loads `setupTests.ts` (jest-dom matchers & small DOM shims).

Current coverage samples:
- Motion preferences hook (`useMotionPreferences`)
- Performance budget utility (`runPerfBudgetCheck`) – dev-only warnings
- Toast host (push + render)
- Lightbox (smoke render)
- Contact API route (validation success/error)

Notes:
- Portal + animation-heavy components are smoke-tested to avoid brittle timing assertions.
- For future additions, prefer querying by accessible roles / text; avoid implementation details.
- Add integration (E2E) tests later via Playwright for full page flows.

## Upgrade Notes (Next 15 Alignment)
Upgraded to **Next.js 15.5.3** to match `@next/mdx@15.x`:
- Removed deprecated `experimental.serverActions` (now always on).
- Migrated `experimental.typedRoutes` to top-level `typedRoutes` config key.
- Converted `lib/motion.ts` to a client module (`"use client"`) because it uses React hooks.
- Replaced `dynamic(..., { ssr:false })` for `PerfBudgetClient` with a direct client import (App Router Server Component boundary no longer allows `ssr:false`).
- Added explicit `.js` extensions on relative imports under NodeNext module resolution.

Post-upgrade validation:
```
npm run build   # passes after adjustments
npm test        # all unit tests green
```

If you introduce new hook-based utilities intended for client use only, start the file with `"use client";` to avoid server build errors.

## License
Personal project – treat as all-rights-reserved unless a LICENSE file is added later.
