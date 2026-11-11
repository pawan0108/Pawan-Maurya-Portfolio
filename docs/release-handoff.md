# Release handoff

Selected target: **https://pawan-maurya-portfolio.vercel.app/**, supplied by Pawan. The user will test locally and manage Git push and the existing automatic Vercel deployment. No commit, push, Vercel account change, or deployment is performed by this work.

## Current hosting configuration

- Repository root is `Portfolio/`, containing `package.json` and `vercel.json`; the previous nested project is not the application root.
- `vercel.json` selects Vite, `npm run build`, and output `dist`.
- Node **24.x** is declared in package engines and `.nvmrc`; the lockfile is tracked source.
- This is a single-page site using native hash anchors. No router or blanket catch-all rewrite is needed for `/#work`, `/#experience`, or `/#contact`. Static `/robots.txt`, `/sitemap.xml`, and icon/image URLs must remain real files.
- The existing Vercel Git connection and production branch were not inspected or modified. The user controls those and the eventual push.

Configuration fields follow [Vercel's static configuration reference](https://vercel.com/docs/project-configuration/vercel-json) and [Vite guidance](https://vercel.com/docs/frameworks/frontend/vite).

## Metadata and indexing

`src/data/site.json` owns public title, description, sharing copy, theme colour, and selected public URL. Build hooks in `vite.config.js` generate metadata and crawler assets using `config/release.js`.

| Build context                                 | Canonical/sharing URL                   | Indexing                                                     |
| --------------------------------------------- | --------------------------------------- | ------------------------------------------------------------ |
| Normal production build                       | User-selected Vercel URL                | `index, follow`; generated Allow robots and one-page sitemap |
| Development server                            | Selected canonical, if available        | `noindex, nofollow`                                          |
| Vercel preview context (`VERCEL_ENV=preview`) | Production canonical                    | `noindex, nofollow`                                          |
| Explicit private production override          | Configured URL or intentionally omitted | `PORTFOLIO_INDEXABLE=false`                                  |

Public production indexing is the normal portfolio default chosen during implementation; the user can opt out with the explicit flag. There is no fabricated domain. Canonical and sharing image URLs point to the selected Vercel hostname. Sitemap contains the page URL, not separate hash-section pages. No inferred structured-data claims are emitted.

Optional public overrides are documented in `.env.example`; no secret or environment setup is required for the selected defaults. Do not add credentials to these flags:

- `PORTFOLIO_PUBLIC_URL`: full HTTPS page URL, ending with its base path.
- `PORTFOLIO_BASE_PATH`: `/` for the selected Vercel target; must agree with the URL pathname.
- `PORTFOLIO_INDEXABLE`: literal `true` or `false`; true requires a real configured URL. Development/preview contexts remain noindex.

The production preview served locally contains production metadata; this does not publish localhost. Social unfurl behavior on external platforms can only be verified after the user deploys and their caches refresh.

## Local review commands

```sh
npm.cmd ci
npm.cmd run dev
```

For production verification:

```sh
npm.cmd run check
npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

In another terminal, with preview running:

```sh
npm.cmd run test:production
npm.cmd run check:subpath
```

`check` includes lint, factual data validation, formatting, production build, five release configuration tests, and generated-asset/metadata checks. `check:subpath` separately builds ignored fixtures, checks indexable/noindex configurations, and performs a browser smoke check at `/portfolio/#contact`. Its reserved `example.test` URL is only a fixture, never shipped in `dist/` or selected as the public site.

On this Windows sandbox, automatic browser-test server teardown can stall. Reusing the separately started preview avoids that issue. No Chrome download is automatic; use an installed Chrome.

## Sharing assets

- `public/social-preview.png`: 1200×630, locally rendered typography matching the portfolio.
- `public/apple-touch-icon.png`: 180×180, based on the existing SVG monogram.
- `public/favicon.svg`: code-native monogram.
- Regenerate with `npm.cmd run generate:sharing` after changing sharing copy; inspect the image and rebuild.
- PNG generation uses only local fonts/content; no external image service is required. The Manrope license ships in the public assets.

## Scope and remaining review

- Local release setup is complete and reviewable; hosted routing, CDN/cache behavior, SSL/domain ownership, social unfurling, and actual automatic deployment are not claimed verified.
- T40 remains open: current resume/link confirmation. Its optional action is hidden, while the legacy viewer URL is preserved.
- Final Phase 01 factual/contact review remains open. Phone and Instagram remain hidden. Yashvi is always independent freelance work.
- Contact form uses the existing public Google Apps Script endpoint recovered from the legacy Git history, configured in `src/data/contact.json`. No new backend account or credential is required. The backend's current permissions, CORS behavior, and actual inbox delivery were not exercised; local browser tests intercept the POST. Do not claim live mail delivery from those tests.
- Working-tree changes are uncommitted. The previously requested legacy-file deletions are intentional; review them alongside the new React source when the user prepares their own commit.

After the user's eventual deployment, confirm the homepage, native hash destinations, real crawler files, social preview URL, and image/font asset URLs at the selected Vercel hostname. These are post-push checks, not performed by the local handoff.
