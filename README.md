# Origins — Multi-page company website

This is the Origins marketing site expanded into a complete company web presence while preserving the premium dark/forest visual direction.

## Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion (existing components only)

## Performance approach
The primary landing page uses lightweight reveal animations based on `IntersectionObserver` plus CSS `transform`/`opacity`. There is no always-running canvas particle system on the new landing page. Reduced-motion support is included. The intent is to keep animation work usable on low-end hardware, including old Pentium-class PCs.

## Main routes
- `/` — premium landing page
- `/about` — company story and principles
- `/services` — capabilities and engagement models
- `/work` — selected work
- `/process` — delivery methodology
- `/company` — company information / registered details placeholder
- `/contact` — project and client contact paths

## Legal / trust routes
- `/legal/privacy`
- `/legal/terms`
- `/legal/service-terms`
- `/legal/cookies`
- `/legal/security`
- `/legal/accessibility`
- `/legal/acceptable-use`
- `/.well-known/security.txt`

The legal pages are practical website templates, not legal advice. Before production launch, replace placeholders (company number, registered office, privacy contacts, supervisory authority, actual cookies/providers, etc.) and have the final text reviewed for the jurisdictions in which Origins operates.

## SEO / platform essentials
- `sitemap.xml` is generated from `src/app/sitemap.ts`.
- `robots.txt` is generated from `src/app/robots.ts`.
- A basic web app manifest is generated from `src/app/manifest.ts`.
- `NEXT_PUBLIC_SITE_URL` controls the canonical site origin used by metadata/SEO files.
- `NEXT_PUBLIC_CLIENT_PORTAL_URL` controls the client portal link.

## Run locally
```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Production checklist
1. Fill in legal company details on `/company`.
2. Replace legal-policy placeholders with the approved company policies.
3. Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CLIENT_PORTAL_URL`.
4. Confirm the client portal is deployed separately and authenticated.
5. Review actual analytics/cookie behavior before enabling any consent categories.
6. Run `npm run lint` and `npm run build` in the normal project environment before deployment.
