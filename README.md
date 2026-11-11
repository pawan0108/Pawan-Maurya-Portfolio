# Portfolio

See the [implementation roadmap](docs/implementation-roadmap.md) for the 10-phase, 60-task plan and target architecture, and the [content handoff](docs/portfolio-content.md) for extracted information.

React + Vite + Tailwind CSS portfolio with completed local implementation and release setup. Use **Node 24.x**. Selected deployment target is `https://pawan-maurya-portfolio.vercel.app/`; the user manages the eventual Git push and Vercel deployment. Resume confirmation remains open; its action is hidden. See [release handoff](docs/release-handoff.md) for exact setup and verification limits.

## Local development

```sh
npm.cmd ci
npm.cmd run dev
```

On shells without the Windows PowerShell script restriction, `npm` can be used instead of `npm.cmd`.

## Production build

```sh
npm.cmd run build
npm.cmd run preview
```

## Source

The [design specification](docs/design-spec.md) defines the charcoal/blue visual system, responsive wireframes, section composition, and motion behavior for the next implementation phases.

- `src/app/App.jsx`: page composition
- `src/sections/experience/`, `expertise/`, `about/`, `contact/`: dedicated content sections
- `src/sections/hero/`: responsive hero and decorative technical visual; copy in `src/data/introduction.json`
- `src/sections/work/`: professional project rows and previews; [capture provenance](docs/project-previews.md)
- `src/hooks/usePageMotion.js` and `src/styles/motion.css`: progressive motion and user preference handling
- `src/components/ui/`: shared design primitives
- `src/components/layout/`: responsive header and footer
- `src/styles/globals.css`: Tailwind entry and base styles
- `src/styles/tokens.css`: theme tokens
- `src/data/`: profile, projects, skills, and JSDoc contracts
- `vite.config.js`: React and Tailwind Vite plugins

`@/` maps to `src/`. Shared folders are added when actual responsibilities exist. See [architecture.md](docs/architecture.md) for boundaries, tooling, and content contracts, and [quality-report.md](docs/quality-report.md) for actual checks and limitations.

## Quality commands

| Command                     | Purpose                                    |
| --------------------------- | ------------------------------------------ |
| `npm.cmd run lint`          | JavaScript, React/hooks, JSX accessibility |
| `npm.cmd run check:content` | Content contracts and ownership validation |
| `npm.cmd run format:check`  | Verify formatting                          |
| `npm.cmd run format`        | Apply formatting                           |
| `npm.cmd run check`         | All checks and production build            |

After a checkout, use `npm.cmd ci`. Dependency changes use `npm.cmd install` and must include the lockfile. No credentials or environment variables are required.

`npm.cmd run test:browser` runs Playwright against locally installed Google Chrome; `npm.cmd run check:all` runs automated checks/build plus browser tests. Install Chrome or deliberately configure another available browser before running them on another machine. The test runner starts/stops its own Vite server. Manrope is bundled locally with its license; no runtime font CDN is used.

## Production audits

`npm.cmd run check` now also runs five release config tests and built-asset/metadata validation. `npm.cmd run check:subpath` verifies alternate base paths in ignored fixtures. `npm.cmd run generate:sharing` regenerates local sharing/touch images after metadata edits. Production defaults to the selected Vercel URL and public indexing; development/Vercel previews are noindex. No environment values are needed for those defaults; `.env.example` documents optional public overrides. `vercel.json` explicitly selects Vite/build/dist, with no extra SPA rewrite for native hash links.

Build with `npm.cmd run build`. Run `npm.cmd run test:production` to test built output with axe and the browser suite. It can reuse a separately started `npm.cmd run preview -- --host 127.0.0.1 --port 4173 --strictPort` server, which avoids this Windows sandbox's automatic-server teardown issue.

With that production preview running, `npm.cmd run audit:performance` measures mobile and desktop Lighthouse profiles against localhost. Chrome debugging access must be permitted. Reports are written to ignored `audit-results.local/`; see [quality report](docs/quality-report.md) and [recorded summary](docs/audits/phase-09-lighthouse.json) for the actual final measurements and limits. These commands do not deploy the site.

## Editing content

The restored contact form posts to the supplied Apps Script service in `src/data/contact.json`. All four FormData keys (`name`, `email`, `phone`, `message`) are required, matching the supplied backend. Responses must be JSON `{ success, message }`; backend error messages are shown without clearing input. Local tests mock submission and never send real emails. Live GET health is verified; inbox delivery must be checked separately. See [contact integration](docs/contact-integration.md). Keep the form alongside direct email links. Content corrections require all 11 projects, four education records and 31 skills to stay visible.

Personal facts and employment belong in `src/data/profile.json`; older personal projects in `projects.json`; professional projects in `professional-projects.json`; normalized skills in `skills.json`. Run `check:content` after editing. Missing project-specific stacks/previews are intentional unknowns, not placeholders to fabricate.

Section editorial copy is in `src/data/sections.json`. The header Resume action uses `profile.resumeUrl` in `src/data/profile.json`; replace that URL when updating the resume. It opens the saved Drive viewer, rather than promising a PDF download. Instagram, LinkedIn and GitHub icons appear in the hero and contact section; phone remains hidden. `src/app/config.js` selects featured education IDs without deleting source records.

The header sun/moon button switches the whole page between dark and light themes. Dark is the initial default; the explicit choice is saved in `portfolio-theme` local storage and applied before rendering to avoid a theme flash. Theme colours are centralized in `src/styles/tokens.css`.

**Yashvi Infosys is a personal freelance client, independent of Codetrex employment.** Om Sanskaram and Codetrex redesign remain ongoing. No remote commit, push, or deployment is included in this phase.

References: [Vite](https://vite.dev/guide/) and [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite).
