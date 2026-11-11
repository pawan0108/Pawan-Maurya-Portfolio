# Quality report

## Mobile navigation overlay

Validation: all **37 production browser tests passed in 36.3s**; lint, formatting, content, build and release checks pass. Includes overlay keyboard wrapping, scroll/inert cleanup, mobile/desktop resizing, accessibility and both themes.

Replaced the in-flow dropdown with a viewport overlay below the persistent header. Numbered large links, section highlighting, a subtle blue glow and a compact email/social footer work in both themes. Background content is inert and scroll-locked while open; Tab wraps inside the header/overlay, Escape restores the trigger, and desktop resizing closes the overlay. CSS supports safe-area padding, short-screen scrolling, reduced motion and the shared motion pause preference. Dark and light screenshots inspected at 390px × 667px.

## Light theme visual refinement

Reworked the light treatment with an ivory canvas, white raised cards, solid cobalt hero name, softer project shadows, section surface separation, a featured-project accent border and a distinct contact background. Styles live in `src/styles/light-theme.css` and apply only to light mode. Desktop hero/work/contact and mobile hero screenshots were inspected. Visual acceptance remains the user's review.

Lint, formatting, content, build and release checks passed. Five targeted theme/accessibility browser checks passed; the two light-theme checks passed again after the final featured-card cascade correction, including full-page automated contrast audits at 320px and 1440px. No full-suite rerun was needed for the scoped visual change.

## Header, resume, social profiles and themes

Following the user's request, the mobile menu is icon-only with an accessible name. Restored the saved Drive resume viewer in the header and contact area and Instagram alongside LinkedIn/GitHub; hero social actions use icons. The user can replace `profile.resumeUrl` to update their resume. Restoring the saved link does not verify the document's freshness or sharing permissions.

Added a sun/moon theme control with persistent local preference, pre-render initialization and light palette overrides for cards, hero and form text. Phone remains hidden. This supersedes older notes about hiding resume/Instagram actions.

Validation: all **36 production browser tests passed**, including saved theme after reload, light-mode accessibility at 320px/1440px, icon-only menu, resume/social links and existing form/navigation coverage. Light screenshots inspected at both widths. Lint, formatting, content, build and five release checks pass.

## Inline validation and submission dialogs

Replaced browser validation bubbles with red messages beneath each field, first-error focus and correction feedback. Sending has a visible pending banner. Confirmed success opens a personalized thank-you modal; errors open a separate error state while preserving input. The responsive dialog supports Escape, focus containment/restoration, reduced motion and an explicit close action. Desktop and mobile screenshots were visually inspected.

All **34 production browser tests passed in 31.0s**, including eight intercepted contact tests and mobile dialog accessibility. No live POST/email was sent; delivery limitations in the integration document still apply. This section supersedes earlier references to native validation and inline submission feedback.

## Supplied Apps Script contract alignment

Reviewed the user's full Apps Script source and supplied deployment URL. The URL exactly matches the configured endpoint. Read-only live GET returned HTTP 200 with the expected `doGet` health text; no POST or email sent. Corrected visitor Phone from optional to required, matching `doPost` validation. Client now accepts only the supplied `{ success: boolean, message: string }` JSON contract and displays the server message. HTTP-200 `success: false` remains an error with fields preserved; legacy heuristic/plain-text confirmation has been removed.

All **32 production browser tests passed in 29.3s**, including exact success JSON, server false/error message, required phone, invalid email, duplicate guard, and earlier accessibility/responsive/motion coverage. Lint, build, content and release checks pass. Submission tests intercept external requests; Sheet writes, live POST CORS, MailApp permissions/quotas and actual inbox delivery remain unverified. See [contact-integration.md](./contact-integration.md).

## Restored contact form and more visible motion

Recovered the original public Google Apps Script URL from Git history and restored the name/email/optional-phone/message form. It uses the original multipart FormData field names. Added native required/email validation, sending/disabled state, duplicate submission guard, 20s timeout, accessible status/error feedback, preserved input after errors, and reset only after a readable success confirmation. No no-cors blind-success workaround is used. Service confirmation means submitted, not guaranteed inbox delivery.

All **30 production browser tests pass in 25.6s**. Four form cases intercept the external URL locally: correct legacy POST payload plus duplicate protection, server failure, unconfirmed HTML/auth response, and native invalid-email blocking. No live POST/email was sent; backend delivery/CORS/permissions remain unverified. Axe and responsive checks pass with the form present. Mobile form screenshot inspected.

Motion was previously implemented but too restrained for the user's expectation: strengthened hero entry/stagger and once-only scroll transitions, and added visible 7s/9s desktop project-preview float. Reduced-motion preference and the footer pause control remain effective. Existing motion tests pass; no new runtime package. Older Lighthouse scores are not measurements of this corrected form/visual revision.

## Reopened visual review — content completeness correction

The user rejected the first rendered portfolio. Previous automated/Lighthouse results establish only the checks they measured, not premium design quality or user acceptance. Corrected omission of eight legacy personal projects and Class 10/Class 12 education from the UI. All three professional projects, eight personal projects and four education records now render. Added a completeness regression test.

The initial revision changes the hero to Pawan's name and a real-project montage, replaces repetitive company rows with one lead feature and two supporting cards, restores a complete personal-project grid and all 31 skills, and reduces excess section spacing. Earlier Lighthouse measurements are historical and have not been rerun for this visual revision. Visual acceptance is open.

Correction verification: lint, formatting, content/build/release checks pass; all 26 production browser tests pass in 19.3s, including the new completeness regression and sampled responsive/keyboard checks. Desktop/mobile hero screenshots were inspected. Fixed mobile montage caption overlap and ensured reduced-motion changes cancel existing CSS transitions as well as tracked entrance animations; asynchronous preference assertions wait for the browser event to settle. These checks do not establish that the revised design meets the user's aesthetic expectations.

## Phase 10 — Local release preparation and handoff

Date: 11 November 2026. User selected `https://pawan-maurya-portfolio.vercel.app/` and reserved local testing, Git push, and Vercel deployment for themselves. No remote action performed.

- Added root `vercel.json` (Vite, `npm run build`, `dist`), Node 24.x engines/`.nvmrc`, and [release handoff](./release-handoff.md).
- Added metadata source, canonical and absolute OG/Twitter URLs, theme/author metadata, generated robots and one-page sitemap. Production defaults to public indexing; development and Vercel previews are noindex. Public flags have validation and an explicit opt-out. No invented domain or structured-data claim.
- Generated/inspected local 1200×630 social PNG (160,271 bytes) and 180×180 touch icon (3,533 bytes). No external image service or new runtime dependency.
- **Five release config tests pass.** Built-asset validator checks metadata replacement, canonical/indexing, local asset paths, PNG dimensions, crawler files, license, and early UTF-8 declaration. Final audit caught charset being pushed down by prepended tags; moved tag injection to end of head and added a regression guard.
- Root build validation and independent indexable/noindex subpath fixtures pass. Chrome loaded `/portfolio/#contact`, JS/CSS/font/images without failed responses. Reserved `example.test` appears only in ignored fixtures/tests, never the production build.
- **25 production browser tests passed in 16.9s**, exit 0 after selected-host metadata configuration. The final head-order correction was verified by build validation/Lighthouse; runtime JS/CSS are unchanged.
- Final Lighthouse 13.6.0: **mobile and desktop both 100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**. Mobile LCP 0.755s, TBT 10.5ms, CLS 0.00099; desktop LCP 0.207s, TBT 0ms, CLS 0.00177. [Recorded summary](./audits/phase-10-lighthouse.json). Single local simulated runs, not field/device/hosted guarantees. Phase 09's robots finding is resolved in the built release.
- Lint, content/format/build and release checks pass. Runtime remains JS 264.13 kB (81.64 kB gzip), CSS 24.93 kB (6.29 kB gzip). HTML approximately 2.33 kB; sharing PNG is metadata-only and not loaded in the page UI.
- Reviewed candidate source paths and whitespace diff; legacy deletions are prior user-authorized cleanup. Generated fixtures/artifacts are ignored. Filename-only scan for common private-key/API-key signatures in candidate application/config files found no matches; limited check, not security certification. No credentials logged. `.local` bundles are excluded from lint/format.
- Resume freshness and final Phase 01 facts remain open; optional resume/phone/Instagram actions stay hidden. Actual hosted routing/SSL/CDN/unfurling and existing Vercel Git branch settings are unverified because user handles deployment. No commit, push or deployment performed.

## Phase 09 — Production quality, accessibility, performance

Date: 11 November 2026. Node 24.21.0, Lighthouse 13.6.0, local Google Chrome, Windows. The test target is **built `dist/` served by Vite preview on port 4173**, not the development server. Raw Lighthouse reports are ignored under `audit-results.local/`; the measured summary is retained in [audits/phase-09-lighthouse.json](./audits/phase-09-lighthouse.json).

### Verification and fixes

- **25 production browser tests passed in 15.9s**, exit 0, following final responsive asset changes. This includes all existing keyboard/navigation/motion/contact/touch tests plus axe scans at 390px and 1440px (mobile menu closed/open), and forced-colour/200% enlarged-text navigation at 640×480.
- Axe scans reported **zero violations** for selected WCAG 2 A/AA, 2.1 A/AA, and 2.2 AA rules. This is automated coverage, not WCAG certification. Semantic landmarks/headings, focus styling, action names, preview alt text, and reduced-motion behavior were also reviewed through the suite and visual inspection.
- Confirmed no horizontal overflow at 320/360/390/480/640/768/820/1024/1280/1440/1920px, short landscape 844×390, and 200% root-font enlargement at 640px and 1280px. Found and fixed an actual enlarged-text overflow: the earlier MERN label consumed flex-row width, leaving the skill list too narrow. Replaced that row with a responsive grid and a minmax content column.
- Replaced fixed-size JPEG previews with 640/800/1280px WebP variants plus `srcset`/`sizes`. At the final mobile Lighthouse dimensions, the three 800px previews total **122,194 bytes**, versus original JPEGs **353,246 bytes**: approximately **65.4% less image payload**. At 1× desktop sizing, the three 640px variants total 94,114 bytes. Nine stored variants total 448,732 bytes; browsers select appropriate variants rather than downloading all of them.
- Image tests now verify successful decoded content and aspect ratio, accounting for browser density-corrected natural dimensions with width-descriptor srcsets. Preview metadata/file checks cover all referenced variants. Inspected final work captures; the visual composition remains intact.
- Lighthouse revealed a missing default favicon request (404); added a small local SVG monogram and explicit icon link. Final console-errors audit passed, and Best Practices reached 100. Favicon work was brought forward from Phase 10 to resolve this concrete defect.
- No new runtime dependency. Axe, Lighthouse, and Chrome Launcher are development-only tools. Updated Node minimum to 22.19 for the installed Lighthouse; Node 24 remains the tested workspace version.
- Explicitly restricted Tailwind scanning to application `src/`; documentation and audit fixtures no longer influence generated utility CSS. This removed roughly 3.6 kB of unneeded CSS and makes documentation-only changes reproducible without stylesheet drift. Production tests and Lighthouse were rerun after this final source-boundary change.

### Final local Lighthouse results

| Metric              | Mobile  | Desktop |
| ------------------- | ------- | ------- |
| Performance         | **100** | **100** |
| Accessibility       | **100** | **100** |
| Best Practices      | **100** | **100** |
| SEO                 | 92      | 92      |
| FCP                 | 0.75s   | 0.20s   |
| LCP                 | 0.75s   | 0.20s   |
| Total Blocking Time | 6ms     | 0ms     |
| CLS                 | 0.00099 | 0.00177 |

Conditions: one final measurement per profile, localhost preview, simulated Lighthouse throttling, mobile 412×823 at DPR 1.75 and desktop 1350×940 at DPR 1. Chrome debugging access required an executor escalation; no application was published. The first attempted desktop measurement incorrectly used a CLI-only preset flag; discarded it and changed the Node API to the actual desktop config. Final profile settings are stored in the summary. Scores vary by run and do not measure field INP or hosted network/CDN behavior.

Remaining diagnostics: approximately 37 KiB estimated unused JS (largely React runtime coverage), 33 KiB mobile / 19 KiB desktop estimated further image savings, and font/CSS dependency/render-blocking suggestions. The runtime is 81.64 kB gzip and meets the intended lightweight footprint; no extra code splitting or critical-CSS machinery was added merely to chase diagnostic estimates. Build CSS is 6.29 kB gzip; the single font is 24.83 kB.

SEO's open finding is `/robots.txt`: no deployment/indexing policy exists yet, and Vite's SPA fallback returns HTML for that request. Resolve robots, canonical URL, sitemap, and sharing metadata in Phase 10 after the public URL/indexing choice is known. Do not claim SEO is fully complete or introduce a made-up domain.

### Review limits and outstanding content

The audit covers Chromium desktop/mobile emulation, not physical phones/tablets or Safari/Firefox. Zoom coverage uses root-font enlargement and reflow; native browser zoom UI was not exercised. No manual screen-reader session, field INP, hosted-cache test, client payment/admin test, or remote email submission occurred. External action destinations/security attributes and touch/keyboard operation were verified; this does not certify social account availability.

No known blocking functional/accessibility issue remains in the tested local experience. T40 resume freshness/link confirmation and Phase 01 final facts remain open; the resume action stays hidden. No remote Git action or deployment occurred.

## Phase 08 — Motion and interaction polish

Date: 11 November 2026. No new dependency or external visual asset.

- Central `usePageMotion` uses WAAPI and IntersectionObserver; hero entry 450ms with bounded 50ms staggering, section/project reveals 380ms. Default DOM/CSS stays visible; animations start at 72% opacity instead of hidden, with at most 12px translation. There is no pending hidden state, loader, or scroll hijacking.
- Once-only tracking survives pause/resume. Focus inside an animating region cancels movement immediately; hash destinations skip/cancel their reveals. Effect cleanup disconnects observers/listeners, cancels RAF and live animations; initialization is deferred by one RAF for development Strict Mode cleanup safety.
- Ambient glow runs over 14s using transform only, desktop fine-pointer/hover media only. Observer and document visibility gate activity. Reduced motion and the footer Pause/Resume control stop ongoing motion; touch layouts remain static. No animated filters, WebGL, custom cursor, or scroll-frame React updates.
- Buttons/links have <=2px icon movement, previews a bounded 1.012 hover scale, desktop nav underline, and brief mobile panel opacity entry. Hover-specific transformations are restricted to fine-pointer devices, and reduced motion removes nonessential movement.
- **22 Chrome tests passed in 19.5s**, exit 0: existing responsive/contact/work/navigation suite plus motion API fallback, initial/dynamically changed reduced motion, pause/resume, focus visibility, and once-only reveal behavior. Desktop hero screenshot inspected after enhancement; underlying visual hierarchy is preserved.
- A short synthetic mobile-viewport scroll sample (390×844, headless Chrome, 59 RAF intervals) measured median 16.7ms, p95 16.9ms, maximum 17ms. This is an unthrottled local sanity sample, not a device FPS guarantee, field metric, or substitute for Phase 09 performance work.
- Lint, content validation, formatting, and production build passed. Output: JS 262.79 kB (81.32 kB gzip), CSS 28.44 kB (6.84 kB gzip); font/previews unchanged. No Safari/Firefox, real low-end device, native zoom, screen-reader, or Lighthouse claim.
- T40 resume confirmation remains open, with its action hidden. Motion work does not resolve pending factual review.

## Phase 07 — Experience, expertise, About, Contact

Date: 11 November 2026. Replaced the remaining foundation bodies with four dedicated section components; no new dependency.

- Experience uses source ISO dates, semantic time elements, real responsibilities, and a gradual undated role progression. Yashvi stays out of employment. Internship remains the preserved February–May 2025 record; no duties invented.
- Expertise derives all 18 current technologies from skill provenance, in four readable groups. Earlier React/Node.js/Express/MongoDB work is separate. About uses source biography and MCA/BCA education; school records remain in data.
- Contact uses native email, named LinkedIn/GitHub anchors, keyboard focus styles, and secure new-tab attributes. Phone/Instagram visibility remains false. Legacy resume retrieval through the web tool failed; resume action is implemented conditionally but hidden pending link/freshness confirmation (open T40).
- **19 Chrome browser tests passed in 14.5s**, exit 0. Includes previous viewport/keyboard/touch/font/image coverage plus native email destination, external-link attributes, focus visibility, unpublished-field suppression, and separation of freelance work from employment.
- Inspected Experience and About captures at 390px, Expertise and Contact at 1440px; layout, text wrapping, timeline, education, and contact hierarchy fit. Screenshot artifacts are ignored. Wider/narrower overflow checks passed at all 11 viewport samples, with 200% root-font enlargement coverage.
- Lint, content validation, formatting and production build passed. Output: JS 259.59 kB (80.14 kB gzip), CSS 26.59 kB (6.41 kB gzip), unchanged font and three previews. No outbound email was sent and no external social account interaction was performed.
- Native browser zoom, physical devices, screen-reader audit, Lighthouse, and Safari/Firefox remain unperformed. No public availability, tenure inflation, project-stack inference, or unsupported business metrics were added.

## Phase 06 — Project showcase

Date: 11 November 2026. Replaced the foundation card grid with three detailed editorial project rows and real previews.

- Chrome retrieved all three supplied public homepages with HTTP 200. Om Sanskaram redirected from HTTP to HTTPS; the portfolio now uses that verified HTTPS destination. Public pages were captured and inspected; source code, admin, payments, wallet, subscriptions, and forms remain untested.
- Captures: 1280×800 JPEG quality 80, approximately 353 kB combined. Preview images have dimensions, alt text, `loading=lazy`, async decoding, and matching aspect ratio. No runtime screenshot service or new dependency. Provenance is documented in `project-previews.md`.
- Showcase distinguishes company work from personal freelance Yashvi; visible contributions and ongoing five-puja work stay factual. Unknown stacks/metrics and missing code repositories are not fabricated. All eight legacy records remain intact.
- Browser suite: **18 passed in 13.0s**, exit 0. Includes previous responsive/navigation checks and new work-specific image, touch, keyboard focus, attribution, and unfinished-scope checks. Touch navigation is intercepted locally, not a remote business action.
- Inspected desktop/mobile work screenshots. Sticky header appeared within tall element captures due to screenshot scrolling; capture-only styling hides it for clean artifacts, without changing the app. Corrected a caption encoding separator after inspection.
- Final lint, content validation, formatting, and production build passed after copy/document polish. Both targeted work tests passed again (2 passed in 3.5s). Observed JS 249.66 kB (77.89 kB gzip), CSS 23.92 kB (5.98 kB gzip), unchanged 24.83 kB font. Physical-device and Safari/Firefox/Lighthouse verification remain later work.

## Phase 05 — Hero and introduction

Date: 11 November 2026. Dedicated hero composition replaces the Phase 04 opening section.

- Implemented name/role, editorial heading, factual introduction, real anchor actions, confirmed technology focus, and company context. Editorial copy lives in `src/data/introduction.json`; company identity is derived from the current employment record.
- Added a local HTML/CSS/SVG-icon capability visual. It is decorative (`aria-hidden`), not a client architecture claim; it makes no network requests and requires no new dependencies or raster assets.
- Desktop uses two columns with three staggered layers. Tablet/mobile use a compact horizontal illustration, with details reduced on narrow widths; short landscape screens omit decoration. No fixed full-screen hero, opacity-zero entrance state, or new animation is introduced.
- Browser suite: **16 passed in 11.1s**, exit 0, locally installed Chrome. Existing keyboard, breakpoint focus, reduced-motion, 11 viewport widths, font, short landscape, and 200% text enlargement checks passed. Added verification that hero actions reach Work/Contact and the Work destination clears the sticky header.
- Inspected hero captures at 390px and 1440px: typography/action hierarchy, visual reflow, and company context fit without clipping. Actions appear before decoration on mobile.
- Lint, content validation, formatting, and build passed. Output: JS 244.01 kB (76.65 kB gzip), CSS 21.99 kB (5.62 kB gzip), unchanged 24.83 kB local font.
- No runtime loading gate or external hero asset. Intrinsic visual space is reserved; no measured CLS, native browser zoom, physical-device, Safari/Firefox, or field-performance claim is made. Motion refinement remains Phase 08.

## Phase 04 — Design system and application shell

Date: 11 November 2026. Windows, Node 24.21.0, locally installed Google Chrome via Playwright.

- Implemented semantic charcoal/blue tokens, fluid typography, responsive gutters/section spacing, focus/selection styles, and reduced-motion scroll behavior.
- Manrope Latin variable WOFF2 is self-hosted (24.83 kB), with `swap` and system fallback. SIL OFL license is shipped in `public/licenses/manrope-OFL.txt`. Lucide imports only used generic SVG icons; no font/icon CDN requests.
- Added working anchor navigation, non-modal mobile disclosure, skip link, footer, and initial factual section bodies. Detailed section designs remain Phases 05–07; entry/reveal animation is deferred to Phase 08.
- Lint, content validation, formatting, and production build passed after implementation corrections.
- All 15 browser test cases reported passed: mobile keyboard navigation/Escape, section-link closure, responsive focus transfer and stale-state reset, skip link, reduced motion, font availability, console page-error checks, and no horizontal overflow at 320/360/390/480/640/768/820/1024/1280/1440/1920 CSS pixels. Mobile menu overflow is also checked at widths below 1024px.
- Short landscape 844×390 and 200% root-font text enlargement at 1280×800 checked. This does not claim native browser zoom UI or physical-device verification.
- Inspected full-page screenshots at 390px and 1440px. Text/actions fit, spacing is consistent, and Yashvi is labelled freelance. Temporary foundation composition intentionally lacks final hero visual/project imagery.
- Found and fixed focus loss when resizing desktop navigation to mobile. A first test incorrectly simulated native zoom using CSS `zoom`; replaced with explicit text-enlargement coverage. Current Lucide does not export the assumed social-brand symbols; generic icon exports corrected before passing build.
- Observed output: JS 240.74 kB (75.76 kB gzip), CSS 18.40 kB (4.78 kB gzip), one 24.83 kB WOFF2. No Lighthouse/field speed claims, screen reader audit, Safari/Firefox, or payment/admin-flow testing in this phase.

Browser screenshots/traces are local ignored artifacts in `test-results/`. Automated browser coverage targets the shell, not a comprehensive WCAG or cross-device certification.

Runner note: automatic test-server teardown stalled in this Windows sandbox after the assertions finished. Re-ran against a separately started local Vite server using Playwright's configured reuse behavior: **15 passed in 10.8s, exit code 0**. The separately owned server was stopped after verification. On affected environments, start `npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort` in another terminal before `test:browser`; the browser suite can reuse it.

## Phase 03 — UX and visual specification

Date: 11 November 2026. Deliverable: `docs/design-spec.md`.

- Reviewed section hierarchy, mobile/desktop wireframes, project attribution/status, missing-asset fallbacks, navigation states, reduced motion, and loading strategy against the roadmap.
- Calculated opaque sRGB token contrast: primary text/canvas 17.15:1; secondary text/raised surface 7.90:1; muted text/raised surface 5.75:1; white text/accent button 5.17:1; accent link/raised surface 6.61:1. This is a palette calculation, not a complete accessibility audit.
- No theme CSS, dependencies, or UI behavior changed. No browser screenshots, device tests, Lighthouse measurements, or font availability checks are claimed. Font acquisition/license verification occurs when implementing it in Phase 04.
- Implementation-readiness review is recorded in the design spec. The first rendered shell is reviewed in Phase 04; the user has not approved a rendered design yet.

## Phase 02 — Architecture and tooling

Date: 11 November 2026. Environment: Windows PowerShell, Node 24.21.0.

### Completed checks

- `npm.cmd ci --offline`: clean lockfile-based installation passed using the populated local cache, with install scripts enabled. Initial dependencies required network access; a fresh machine still needs registry access or its own cache.
- Compared all eight legacy demo/source URL pairs against Git HEAD: preserved.

- `npm.cmd run lint`: passed, no warnings. Covers JavaScript, React/hooks, and JSX accessibility rules.
- `npm.cmd run check:content`: passed for 11 projects, 31 normalized skills, and two employment records. Yashvi is explicitly verified as freelance with no employer association.
- `npm.cmd run format:check`: passed.
- `npm.cmd run build`: passed with Vite 8.3.8. Confirms moved entry imports, `@/` alias, JSX, and Tailwind compilation.
- Dependency installation audit reported zero known vulnerabilities at installation time. This is not a security assessment of the application.

Observed production output before final documentation changes: JavaScript 221.13 kB (69.37 kB gzip); CSS 8.57 kB (2.72 kB gzip). Development lint/format packages are not runtime imports. These are bundle measurements, not browser performance scores.

### Verification limits

This phase retains the temporary foundation screen; it does not implement the final design. No browser/device layout review, Lighthouse run, field performance measurement, navigation interaction tests, or project payment/admin tests were performed. Responsive requirements remain mandatory in subsequent UI phases.

No browser test framework is installed because no portfolio interaction exists yet. Meaningful behavioral checks will be added with actual navigation/contact behavior. Content checks validate data and link syntax, not third-party reachability or factual authorship.

The installed React/accessibility lint plugins require ESLint 9, an upstream deprecated major. Its compatibility rationale and upgrade requirement are recorded in `architecture.md`.

Phase 01 still has final contact/resume/content confirmations, assets, and some external link checks open. No facts were invented to close those tasks. Yashvi's freelance ownership is user-confirmed; Om Sanskaram's five-puja scope remains ongoing.
