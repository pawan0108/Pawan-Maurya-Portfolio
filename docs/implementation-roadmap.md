# Premium portfolio implementation roadmap

Status: VISUAL ACCEPTANCE REOPENED after the user rejected the rendered design. Historical phase completion below records implementation/checks, not user approval. Current correction restores all 11 projects, four education records and 31 skills; revises hero/composition/spacing. T40 resume and final factual review remain open. User handles Git push/deployment.

Owner: Pawan Maurya  
Created: 11 November 2026  
Scope: Local React portfolio; publication requires a separate deployment decision.

## 1. Objective and agreed direction

Build an original, modern portfolio that presents Pawan's real engineering work with a premium visual finish. Use charcoal surfaces, electric blue accents, strong typography, generous spacing, and restrained motion. The previous portfolio provides information only; its layout, assets, effects, and implementation will not be reused.

Professional credibility must come from clear contributions, technical decisions, and project evidence. Do not invent seniority, employment dates, achievements, metrics, clients, or endorsements.

Stack: React, Vite, JavaScript, and Tailwind CSS. Keep the current working setup. The architecture should be maintainable and appropriate for a portfolio; avoid unnecessary services, abstractions, and dependencies.

## 2. Delivery overview

**10 phases, 60 tasks: six tasks per phase.** Every phase has a concrete exit criterion. Update task checkboxes and the phase status table as implementation proceeds.

The React/Vite/Tailwind setup and legacy information extraction are already complete. They are prerequisites, not part of the 60 tracked tasks.

| Phase | Focus                                 | Tasks   | Status                                           | Depends on                                  |
| ----- | ------------------------------------- | ------- | ------------------------------------------------ | ------------------------------------------- |
| 01    | Content and evidence                  | T01-T06 | Content prepared; final review/verification open | User details                                |
| 02    | Architecture and tooling              | T07-T12 | Complete                                         | Existing setup; independent of pending copy |
| 03    | UX and visual specification           | T13-T18 | Complete                                         | Initial content inventory                   |
| 04    | Design system and application shell   | T19-T24 | Complete                                         | 02, 03                                      |
| 05    | Hero and introduction                 | T25-T30 | Complete                                         | 04; confirmed positioning                   |
| 06    | Project showcase                      | T31-T36 | Complete                                         | 04; selected project evidence               |
| 07    | Experience, expertise, about, contact | T37-T42 | UI delivered; T40 resume confirmation open       | 01, 04                                      |
| 08    | Motion and interaction polish         | T43-T48 | Complete                                         | 05-07                                       |
| 09    | Quality, accessibility, performance   | T49-T54 | Complete                                         | 05-08                                       |
| 10    | Release preparation and handoff       | T55-T60 | Complete — local handoff, user deploys           | 09                                          |

Execution normally follows this order. Architecture and visual exploration may proceed while employment details are pending. A phase cannot be marked complete when its required content or verification remains unresolved.

## 3. Information architecture and visitor journey

Primary visitor goal: understand what Pawan builds, inspect convincing work, assess experience, and make contact.

Single-page flow:

1. **Header:** name/wordmark, Work, Experience, About, Contact; compact mobile navigation.
2. **Hero:** name, Full Stack Developer positioning, short factual introduction, View Work and Contact actions.
3. **Selected Work:** approximately three strong projects with real previews, problem, contribution, stack, and working links.
4. **Experience:** Codetrex role progression followed by the Softpro internship.
5. **Expertise:** grouped capabilities connected to real work, rather than percentage bars.
6. **About:** concise background, working approach, education, and optional portrait.
7. **Contact and footer:** direct email, relevant social links, resume, and simple closing navigation.

The user's corrections supersede earlier curation: show all education records and all supplied projects/skills. Contact includes the restored legacy submission form as well as email/social links. It uses the original Google Apps Script backend; its removal was not authorized and is corrected. Extra project detail pages, blog, CMS, authentication and analytics remain outside scope.

## 4. Target project architecture

This is the target structure, not a requirement to create empty folders. Add a folder when its first real responsibility exists.

```text
Portfolio/
|-- docs/
|   |-- implementation-roadmap.md       # Phases, tasks, decisions, completion criteria
|   |-- portfolio-content.md            # Content provenance and missing facts
|   |-- design-spec.md                  # Layout, tokens, responsive and motion rules
|   `-- quality-report.md               # Actual checks, findings, remaining limits
|-- public/
|   |-- favicon.svg
|   |-- robots.txt                      # Final public URL/indexing policy required
|   `-- social-preview.webp
|-- src/
|   |-- app/
|   |   |-- App.jsx                     # Composes layout and sections only
|   |   `-- config.js                   # Public site metadata/configuration
|   |-- assets/
|   |   |-- images/
|   |   |   |-- profile/
|   |   |   `-- projects/
|   |   `-- fonts/                      # Only if self-hosted fonts are chosen
|   |-- components/
|   |   |-- ui/                         # Button, Container, SectionHeading, etc.
|   |   |-- layout/                     # Header, MobileNavigation, Footer
|   |   `-- motion/                     # Shared reveal/motion primitives if needed
|   |-- sections/
|   |   |-- hero/
|   |   |-- work/
|   |   |-- experience/
|   |   |-- expertise/
|   |   |-- about/
|   |   `-- contact/
|   |-- data/
|   |   |-- profile.json
|   |   |-- projects.json
|   |   `-- skills.json
|   |-- hooks/                         # Reused behavior only
|   |-- lib/                           # Small shared utilities only
|   |-- styles/
|   |   |-- tokens.css                 # Tailwind theme/design tokens
|   |   `-- globals.css                # Tailwind entry, base and accessibility rules
|   `-- main.jsx                       # React mounting and global CSS import
|-- tests/                             # Meaningful cross-component/critical-flow tests
|-- .gitignore
|-- index.html
|-- package.json
|-- package-lock.json
|-- vite.config.js
`-- README.md
```

### Ownership and dependency rules

- `app` composes sections and shared layout. Avoid page-sized markup in `App.jsx`.
- Each section owns its specific components. Move a component into shared `components` only when there is a real shared use or clear system-level purpose.
- Shared UI must not import sections or hardcode Pawan's biography/project content.
- Store personal facts, links, experience, and project descriptions in `data`; presentation imports that data. Keep visual configuration separate from factual content.
- Section dependencies flow toward shared UI, data, hooks, and utilities. Avoid circular dependencies and imports between unrelated sections.
- Use PascalCase for React components, `useName` for hooks, and descriptive names for other modules. Prefer direct imports; avoid unnecessary barrel exports.
- Use Tailwind utilities and shared tokens. Add custom CSS for behavior utilities cannot express cleanly. Avoid repeated magic values, pervasive inline styles, and scattered global selectors.
- Keep bundled imagery in `src/assets`; use `public` for files that need stable root URLs. Do not commit `dist`, `node_modules`, secrets, or local editor state.
- Add dependencies only for a concrete benefit. Do not introduce a global state store, router, API layer, or backend without a real feature requiring it.
- Add lint rules and useful JSDoc for non-obvious data contracts. A TypeScript migration is not assumed.
- No dummy anchors, fake submission success, invented statistics, or unfinished controls in the final site.

### Migration from current starter

Move `src/App.jsx` to `src/app/App.jsx`; update `src/main.jsx`. Split the existing `src/index.css` into theme tokens and global styles. Keep the extracted JSON under `src/data` and normalize it before UI integration. Preserve Git history, the `pawan` branch, remote configuration, and the lockfile.

## 5. Phase tasks and exit criteria

### Phase 01 — Content and evidence

Working deliverable: [content-draft.md](./content-draft.md). All six tasks have prepared material, now including Om Sanskaram, Codetrex redesign, and Yashvi Infosys. Checkboxes remain open where final review/verification requirements are unmet. See its task record for exact outstanding work. Further professional projects are deferred per user instruction; they do not block Phase 02.

- [ ] **T01:** Confirm name, public headline, location, email, phone visibility, social links, and resume currency.
- [ ] **T02:** Confirm Codetrex joining date, role transition date, official title, and current employment status.
- [ ] **T03:** Gather actual responsibilities, technologies, technical decisions, and publishable achievements; establish which company work can be shown.
- [ ] **T04:** Review all eight older projects; select approximately three strongest examples and verify intended demo/source links.
- [ ] **T05:** Draft concise introduction, biography, experience bullets, project problem/contribution/outcome, and grouped expertise; confirm education.
- [ ] **T06:** Inventory needed portrait, screenshots, and resume assets; record missing items and obtain final factual content review.

**Exit:** Publishable content is accurate and selected projects have evidence. Pending facts are explicitly recorded rather than guessed. A portrait is optional; its absence must not block a typography-led layout.

### Phase 02 — Architecture and tooling

- [x] **T07:** Implement the target source boundaries and move starter files with imports updated.
- [x] **T08:** Configure a source import alias consistently in Vite and editor configuration if it improves readability.
- [x] **T09:** Set up focused ESLint rules for React, hooks, and accessibility, plus consistent formatting conventions and scripts.
- [x] **T10:** Normalize content contracts, stable project IDs, technology names, current-role fields, optional links, and asset references.
- [x] **T11:** Define the verification strategy and scripts; add test tooling only for meaningful behaviors that will actually be tested.
- [x] **T12:** Verify clean installation/build behavior and document architecture, commands, and dependency ownership.

Delivered: [architecture.md](./architecture.md), source alias, normalized content/JSDoc contracts, ESLint/Prettier, and content ownership validation. Clean offline `npm ci` succeeds; see [quality-report.md](./quality-report.md) for checks and limits. Shared UI/asset/test folders are created only when their first real implementation exists.

**Exit:** Organized starter builds successfully, lint passes, content has a clear home, and no unused architecture or tooling is added.

### Phase 03 — UX and visual specification

- [x] **T13:** Finalize desktop/mobile section order, navigation labels, calls to action, and content hierarchy.
- [x] **T14:** Specify charcoal/blue colour tokens, typography scale, spacing, container widths, border treatments, and focus styles.
- [x] **T15:** Define desktop hero composition, image/abstract-visual choice, header behavior, and first-screen balance.
- [x] **T16:** Define project preview layouts, experience presentation, expertise groups, About, and contact compositions.
- [x] **T17:** Specify mobile reflow, touch interactions, motion timings, reduced-motion alternatives, and loading behavior.
- [x] **T18:** Record the cohesive specification in `docs/design-spec.md` and review the direction before full visual implementation.

Delivered: [design-spec.md](./design-spec.md), desktop/mobile wireframes, concrete design tokens, section layouts, navigation states, motion timings, and implementation-readiness review. This is specification completion, not approval or browser verification of a rendered design. Theme CSS and UI components follow in Phase 04.

**Exit:** Desktop/mobile composition, tokens, and interactions are concrete enough to implement consistently. Premium does not mean adding an effect to every section.

### Phase 04 — Design system and application shell

- [x] **T19:** Implement theme tokens, font loading/fallbacks, global styles, semantic colour roles, and selection styles.
- [x] **T20:** Build shared Container, SectionHeading, button/link variants, and badges as needed with accessible states.
- [x] **T21:** Implement semantic page landmarks, section anchors, skip link, and robust header spacing.
- [x] **T22:** Build desktop/mobile navigation with keyboard operation, dismissal, and sensible focus behavior.
- [x] **T23:** Build the responsive page shell and footer, including reusable spacing and consistent content alignment.
- [x] **T24:** Verify shared elements across narrow/wide screens, keyboard input, contrast, and zoom before section work.

Delivered: charcoal/blue Tailwind tokens, local licensed Manrope, selected Lucide icons, shared UI primitives, working header/footer and anchored content foundation. Fifteen Chrome checks cover navigation, 11 viewport widths, reduced motion, short landscape, and 200% text enlargement; desktop/mobile screenshots were inspected. Native browser zoom, Safari/Firefox, and physical-device QA remain later verification limits. Detailed hero/work/content layouts follow in Phases 05–07.

**Exit:** Responsive navigation and page foundation work without animation; shared components look consistent and remain accessible.

### Phase 05 — Hero and introduction

- [x] **T25:** Integrate approved headline and introduction with an intentional readable line length and hierarchy.
- [x] **T26:** Implement View Work and Contact actions with correct destinations and clear focus/hover states.
- [x] **T27:** Build the chosen abstract technical visual or approved portrait composition with an accessible text alternative where needed.
- [x] **T28:** Add concise factual context such as current company and technology focus, without invented counters or availability claims.
- [x] **T29:** Refine hero composition for small phones, landscape, desktop, and short-height screens.
- [x] **T30:** Review the first-screen experience for clear identity, visible actions, legibility, and loading stability.

Delivered: dedicated `HeroSection`/`HeroVisual`, local editorial introduction data, responsive CSS capability illustration, verified anchor actions, and real company/technology context. Sixteen Chrome tests pass; hero screenshots at 390px and 1440px were inspected. Motion remains Phase 08. No new dependencies or bitmap assets were needed; no CLS/field performance guarantee is claimed.

**Exit:** A visitor can immediately understand who Pawan is, what he does, and how to inspect work or contact him.

### Phase 06 — Project showcase

- [x] **T31:** Prepare real project previews with descriptive filenames, appropriate dimensions, compression, and alt text.
- [x] **T32:** Implement responsive project cards/rows with a consistent visual hierarchy and data-driven content.
- [x] **T33:** Present each selected project's problem, contribution, technologies, and supported outcome.
- [x] **T34:** Wire verified live/source links; handle unavailable/private links with honest labels or omission.
- [x] **T35:** Add equivalent hover, keyboard, and touch interactions; avoid hiding essential details behind hover.
- [x] **T36:** Verify every selected project, preview, link, and layout; preserve the full project inventory in data.

Delivered: dedicated WorkSection/ProjectRow/ProjectPreview, three real compressed homepage captures, visible contribution and ongoing-scope copy, accessible external actions, and text-led preview fallback. All three public destinations returned HTTP 200 in Chrome; Om Sanskaram uses its verified HTTPS destination. Unknown project stacks and metrics remain omitted; absent source links stay absent. Eight legacy projects remain preserved. See [project-previews.md](./project-previews.md) for provenance and verification limits.

**Exit:** Work is supported by real evidence, links work as represented, and essential project information is available on every input type.

### Phase 07 — Experience, expertise, about, contact

- [x] **T37:** Implement Codetrex role progression and Softpro internship with confirmed dates and clear responsibilities.
- [x] **T38:** Implement grouped expertise distinguishing current ASP.NET Core MVC work from existing MERN experience.
- [x] **T39:** Implement concise About content and an optional approved portrait without duplicating the hero.
- [ ] **T40:** Integrate compact education records and the confirmed resume link with clear link behavior.
- [x] **T41:** Implement direct email and social contact actions; add copy-email feedback only if useful and reliable.
- [x] **T42:** Review content consistency, section rhythm, destinations, empty states, and mobile layouts across these sections.

Delivered: dedicated Experience/Expertise/About/Contact sections, data-driven dates/education/current skills, timeline progression, compact MCA/BCA records, and native email/social links. All 19 Chrome tests pass with 11 viewport samples and text enlargement. T40 is partially implemented: education is integrated and resume rendering supports a real external viewer link, but the legacy Drive URL could not be verified and freshness is unknown. `profile.visibility.resume` stays false until confirmed; no dummy action is shown. This pending content decision does not prevent Phase 08 work. Internship/education retain source-portfolio facts with final editorial review still tracked in Phase 01.

**Exit:** All core content sections are complete, factual, and usable. No unconfigured contact form or fabricated professional claim remains.

### Phase 08 — Motion and interaction polish

- [x] **T43:** Choose CSS/native browser APIs or one focused motion library based on approved effects; define reusable motion rules.
- [x] **T44:** Add a brief hero entrance with readable content available immediately and no blocking intro loader.
- [x] **T45:** Implement restrained section reveals and staggered elements with a safe content-visible fallback.
- [x] **T46:** Polish project, link, button, and navigation transitions; prioritize transform/opacity for animated movement.
- [x] **T47:** Implement any approved ambient grid/glow effect with touch, reduced-motion, and performance fallbacks; keep native cursor/scroll usable.
- [x] **T48:** Verify reduced-motion settings, effect cleanup, navigation after scrolling, and smoothness on mobile-sized screens.

Delivered: native WAAPI/IntersectionObserver enhancement, 450ms staggered hero entry, 380ms once-only reveals, subtle SVG/preview/nav states, and 14s ambient glow restricted to visible desktop/fine-pointer hero. Footer Pause/Resume motion controls ongoing movement. OS reduced motion takes precedence; missing APIs leave content visible. All 22 Chrome tests passed, including fallback, pause/resume, dynamic preference, focus and navigation regressions. Code review confirms effect/listener/observer cleanup; no continuous React scroll/pointer state or animation dependency added. Physical-device speed remains Phase 09 verification work.

**Exit:** Motion feels coherent, supports hierarchy, and never blocks reading or interaction. Reduced-motion mode removes nonessential movement.

### Phase 09 — Quality, accessibility, performance

- [x] **T49:** Verify at 360, 390, 768, 1024, and 1440 CSS pixels plus a wide screen; inspect overflow, wrapping, orientation, and 200% zoom.
- [x] **T50:** Audit semantic headings, keyboard order, visible focus, navigation dismissal, contrast, alt text, and reduced motion against relevant WCAG 2.2 AA criteria.
- [x] **T51:** Run meaningful checks for critical flows such as mobile navigation and contact feedback if implemented; verify all outbound actions.
- [x] **T52:** Review browser console, image/font loading, layout shifts, bundle output, and animation cost; optimize demonstrated issues.
- [x] **T53:** Run available browser and Lighthouse checks and fix findings; record tool/device limitations without claiming unperformed verification.
- [x] **T54:** Complete a visual consistency review against the design specification and record actual results in `docs/quality-report.md`.

Delivered: 25 passing production-preview tests, axe WCAG checks, forced-colours and enlarged-text coverage, resolved 640px enlarged-text overflow, responsive WebP previews, favicon 404 fix, and reproducible local Lighthouse tooling. Final local simulated results: mobile Performance 100 / Accessibility 100; desktop 100 / 100. Complete score/metric evidence and residual findings are recorded in [quality-report.md](./quality-report.md) and [audit summary](./audits/phase-09-lighthouse.json). Native zoom UI, real devices, screen-reader use, Safari/Firefox, and field INP remain unverified; zoom-related coverage is 200% root-font enlargement and viewport reflow. Robots/indexing remains Phase 10 configuration, not a functional blocker for the local portfolio.

**Exit:** No known blocking functional/accessibility issues remain. Build and lint pass, critical interactions work, and observed performance issues have been addressed.

Performance targets: aim for Lighthouse mobile Performance >= 90 and Accessibility >= 95 under recorded test conditions. Target LCP <= 2.5s, CLS <= 0.1, and field INP <= 200ms; local lab checks cannot establish field performance. Treat scores as diagnostic targets, not proof of accessibility or production guarantees.

### Phase 10 — Release preparation and handoff

- [x] **T55:** Finalize page title, description, favicon, sharing image, and metadata; use only truthful structured data if useful.
- [x] **T56:** Confirm hosting platform, public URL, indexing preference, and base-path requirements before configuring canonical URL/robots/sitemap.
- [x] **T57:** Verify production assets and direct URL behavior for the selected host; prepare deployment instructions and environment documentation if needed.
- [x] **T58:** Update README, content-editing instructions, architecture notes, and known limitations; remove obsolete starter text/files.
- [x] **T59:** Run final required checks after final changes and review the Git diff for accidental assets, secrets, unfinished content, and unwanted files.
- [x] **T60:** Present the completed local portfolio and quality report for final review; commit, push, and publish only when authorized for those actions.

User scope clarification: local setup only; user manages the eventual Git push and existing Vercel integration. Selected URL: `https://pawan-maurya-portfolio.vercel.app/`, base `/`. Normal public indexing is the production default with an explicit opt-out; development/Vercel previews are noindex. T57 is local root/subpath release preflight plus host instructions, not live deployment verification.

Delivered: Vercel config, Node 24 pin, local sharing/touch assets, canonical/OG/Twitter metadata, robots/sitemap, five config tests, release validation and subpath smoke checks. Twenty-five production browser tests pass. Final local Lighthouse scores are 100 in all four categories on mobile and desktop. See [release-handoff.md](./release-handoff.md). No commit, push, account change or deployment. Phase 01/T40 remain open; this is not a claim that all 60 tasks are closed.

**Exit:** The local project is complete and reviewable, with reproducible build instructions and an honest verification report. Remote publication is separate from local completion and requires its own verified outcome.

## 6. Premium design acceptance rules

- Charcoal is the main surface; electric blue highlights actions and selected details. Use restrained surface variation and readable secondary text.
- Typography, whitespace, and composition lead the design. Avoid generic template repetition and competing decorative treatments.
- Use one coherent font system, consistent radii, clear content hierarchy, and aligned containers throughout.
- Use real screenshots and accurate descriptions. Avoid fake dashboards, unrelated code snippets, stock endorsements, and invented results.
- Every interaction has usable keyboard/touch behavior. Decorative visuals cannot interfere with text or pointer input.
- No forced scroll hijacking, long preloaders, mandatory custom cursor, autoplay audio, flashing effects, or hover-only content.
- Content remains readable when animation is disabled. Essential text and actions cannot depend on an entrance animation completing.
- Mobile is designed deliberately; desktop effects must not cause overflow, scroll jank, or tiny touch targets.

## 7. Responsive, React, and performance implementation contract

These requirements apply to every implementation phase, not only final QA. The user's requirement is a consistent premium visual identity on mobile, tablet, laptop, and larger displays. Layouts may recompose to fit available space; typography, hierarchy, spacing quality, and interaction polish must remain consistent.

### Responsive design

- Implement mobile-first with Tailwind CSS. Choose breakpoints when actual content needs them, using Tailwind's responsive variants rather than device/user-agent detection.
- Support a 320 CSS pixel minimum viewport and fluid layouts above it. Verify representative widths of 320, 360, 390, 480, 640, 768, 820, 1024, 1280, 1440, and 1920 pixels, plus widths between breakpoints. These are test samples, not a claim that every device has been tested.
- Check portrait, landscape, short viewport heights, touch input, and 200% browser zoom. Verify readable reflow at 320 CSS pixels without page-level horizontal scrolling, except genuinely two-dimensional content if introduced.
- Use fluid type/spacing where appropriate, bounded containers, flexible grids, wrapping navigation/content, and intrinsic image sizing. Avoid fixed card heights, brittle absolute positioning, and viewport-height assumptions that clip content.
- Account for long project titles, technology names, email addresses, enlarged text, and image aspect ratios. Apply minimum-width and wrapping rules deliberately to prevent overflow.
- Mobile composition receives its own design review. Reflow project previews, hero visuals, and timelines deliberately instead of simply shrinking the desktop layout. Essential information and calls to action remain available on every size.
- Make touch targets comfortably usable, aiming for at least 44 by 44 CSS pixels for primary controls. Never rely on hover; apply equivalent focus states and touch-accessible behavior. Avoid sticky UI covering content, keyboard focus, or section headings.
- Decorative glows and ambient visuals must be clipped within their own containers without hiding meaningful content or masking real overflow problems with a global overflow rule.
- Respect safe-area insets when relevant and prefer modern small/dynamic viewport units with suitable fallback if full-height sections are used.

### React implementation

- Use focused function components, semantic HTML, stable data IDs as list keys, and direct, explicit data flow. Keep state local to the interaction that owns it and derive values instead of storing duplicate state.
- Use effects only for synchronization with external systems. Clean up observers, event listeners, timers, and animation subscriptions. Keep rendering pure and verify development Strict Mode behavior.
- Prefer CSS/Tailwind for responsive layout and simple transitions. Avoid React state updates on every scroll or pointer frame; use native browser mechanisms or an appropriate animation API for continuous effects.
- Apply memoization, lazy loading, or code splitting only when useful for the actual component/bundle. Do not add a global store or performance abstractions without evidence.
- Keep navigation functional as real links, actions as buttons, and contact feedback accessible. Every interactive control needs a defined loading/error/success behavior when its operation requires one.

### Icons and dependencies

- Use one coherent SVG icon family. `lucide-react` is the initial candidate; verify its current package/API and suitability when installing. Another library is acceptable if it better fits the approved design and bundle requirements.
- Import only the icons used through the library's documented tree-shakable entry points. Do not ship a full icon font, mix multiple general-purpose icon packs, or load an icon library through a CDN.
- Use accurate brand assets only where a generic icon is insufficient. Keep brand imagery licensed/attributed as required, visually consistent, and local where appropriate.
- Decorative icons are hidden from assistive technology; icon-only controls have accessible names and visible focus. Use consistent size/stroke tokens and pair unfamiliar icons with text.
- Any new motion, icon, or utility dependency must have a clear purpose, fit the supported React/Vite setup, and be checked against production bundle output. Prefer a small maintained solution over several overlapping libraries.

### Speed and regression checks

- Prioritize fast first render: essential content must not wait for animation, a font download, or a simulated loader. Avoid unnecessary network calls for content already available locally.
- Size and compress images, specify dimensions/aspect ratios, lazy-load below-the-fold previews, and reserve eager/high-priority loading for a genuine critical image when justified.
- Limit font families/weights, provide suitable fallbacks, and avoid rendering-blocking third-party assets. Prevent layout shifts from fonts, previews, and deferred content.
- Audit the production bundle when adding significant dependencies/assets. Animate transform/opacity where possible and avoid large expensive blur/filter effects, especially on mobile.
- Recheck affected screen sizes and interactions after shared UI, navigation, typography, or motion changes. Use meaningful regression checks for critical behavior and visual inspection for layout quality.
- Record tested browsers/viewports, available devices or emulation, measured results, and unresolved limitations in the quality report. Do not claim universal device coverage or guaranteed zero defects.
- A phase is incomplete if its new UI has known clipping, overlap, broken actions, unreadable contrast, inaccessible interaction, or a clear performance regression.

## 8. Completion and change tracking

For each phase:

1. Check dependencies and content requirements.
2. Implement only the phase's agreed tasks and justified shared groundwork.
3. Validate its exit criteria and fix observed issues.
4. Check off completed tasks and update phase status.
5. Report what changed, what was verified, and any pending facts or limitations.

Task states: `[ ]` pending, `[x]` complete. Record a blocker beside its task; do not silently skip it. Track any newly agreed scope as additional numbered tasks and update the total. Tests must cover meaningful behavior, not duplicate static markup or CSS implementation.

### Initial decisions and outstanding inputs

| Item                                                     | State                                                                                                                            |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| React + Vite + Tailwind, JavaScript                      | Confirmed; setup builds                                                                                                          |
| Dark charcoal + electric blue direction                  | Confirmed                                                                                                                        |
| Fresh design, no legacy design reuse                     | Confirmed                                                                                                                        |
| Local project root and Git branch                        | `Portfolio/`, branch `pawan`                                                                                                     |
| Current company                                          | Codetrex Infotech Private Limited                                                                                                |
| Current work                                             | Full Stack; ASP.NET Core MVC                                                                                                     |
| Joining date / progression                               | 12 November 2025; frontend for more than six months, then gradual Full Stack transition; exact transition date unspecified       |
| Current technology stack                                 | User-confirmed; stored in `src/data/profile.json` and grouped in content draft                                                   |
| Responsibilities and professional projects               | Captured: Om Sanskaram, Codetrex redesign, Yashvi Infosys; user-reported ownership, with public content review limits documented |
| Featured projects                                        | Prioritize the three professional projects; preserve eight legacy projects                                                       |
| Current resume, contact visibility, final factual review | Pending review                                                                                                                   |
| Portrait versus abstract hero visual                     | Pending; abstract composition can be explored                                                                                    |
| Domain, hosting, and deployment                          | Existing Vercel URL selected by user; root base; user owns push/deployment; local release preflight complete                     |

**Next step:** User local review via `npm.cmd run dev`; resolve Phase 01 facts and T40 resume when supplied. User handles push/deployment. See [release-handoff.md](./release-handoff.md) for completed setup and verification limits.
