# Phase 03 — UX and visual specification

## User correction after rendered review

The user rejected the initial rendered design as repetitive and insufficiently premium, and rejected omission of older projects and school education. Earlier implementation-readiness checks and lab scores do not establish visual acceptance. All eight personal projects, all four education records, and all 31 supplied skills must be visible. Do not silently curate them away. Current revision prioritizes Pawan's identity, real-work imagery, a varied featured/card composition, and tighter spacing. The generic capability-box hero is retired. This revision remains subject to user visual review; the original specification below is historical wherever it conflicts with these corrections.

Version 1, 11 November 2026. Implementation blueprint for Phases 04–08.

Phase 08 implementation note: native WAAPI/IntersectionObserver selected; no motion library required. The optional ambient effect has an explicit footer Pause/Resume control and is disabled for reduced motion, offscreen/hidden pages, and touch/mobile layouts. Reveal animation enhances an already visible base rather than waiting in a hidden state. See architecture and quality report for actual checks and limits.

Direction: **Dark & sharp — charcoal, electric blue, precise typography.** The user selected this direction. This document resolves composition and interaction choices; no final browser UI or visual/device verification is claimed in this phase.

## 1. Creative direction

The portfolio should feel like a thoughtful developer's studio: confident typography, restrained technical detail, substantial project stories, and carefully spaced content. Use electric blue for actions and small directional accents. Charcoal surfaces and fine rules establish depth; avoid neon everywhere, excessive glass panels, floating skill-logo clouds, or a grid of identical cards for every section.

Core idea: **From interface to application.** Show Pawan's progression through frontend, full-stack product work, and independent client delivery. Professional work carries the narrative; no fabricated senior designation or metrics.

Default hero choice: typography plus a code-native abstract workflow visual, not a portrait. This allows implementation without waiting for a photo. No generated image is needed. A future portrait is optional and must fit the same layout without a redesign.

## 2. Visitor journey, navigation, and actions

| Order | Section / anchor           | Reader question                       | Content priority                                 |
| ----- | -------------------------- | ------------------------------------- | ------------------------------------------------ |
| 1     | Header                     | Where can I go?                       | Pawan wordmark; Work, Experience, About, Contact |
| 2     | Hero / `#home`             | Who is this developer?                | Name, role, concise introduction, two actions    |
| 3     | Work / `#work`             | What has he actually built?           | Om Sanskaram, Codetrex redesign, Yashvi Infosys  |
| 4     | Experience / `#experience` | What is his professional progression? | Codetrex employment, then Softpro internship     |
| 5     | Expertise / `#expertise`   | What can he work with?                | Current stack groups; compact MERN background    |
| 6     | About / `#about`           | What is his background?               | Short biography and compact MCA/BCA education    |
| 7     | Contact / `#contact`       | How do I reach him?                   | Email action, LinkedIn, GitHub; optional resume  |
| 8     | Footer                     | Where next?                           | Name, copyright year, back-to-top link           |

Use the same DOM/content order on every screen. Expertise remains an in-page section but does not need an extra header link. No initial route system or project modal is required.

- Primary hero action **View selected work** → `#work`.
- Secondary hero action **Get in touch** → `#contact`.
- Project actions use **Visit website**, visibly paired with external-link icon and an external destination. New tabs must use `rel="noopener noreferrer"` and an accessible new-tab indication.
- No source-code action for professional projects without a supplied repository. Do not show disabled fake GitHub buttons.
- Contact action **Email Pawan** uses the confirmed legacy email with factual review still tracked. Display the address as wrapping selectable text. Native mail links remain the baseline; optional clipboard feedback is a later enhancement.
- Resume is a normal external link only after freshness/access review; do not promise a download for the Google Drive viewer URL.

## 3. Composition wireframes

### Desktop, 1024 CSS pixels and wider

```text
┌────────────────────────────────────────────────────────────┐
│ Pawan.                         Work Experience About Contact│
├────────────────────────────────────────────────────────────┤
│ FULL STACK DEVELOPER                [abstract workflow]    │
│ From interface                                            │
│ to application.                     Interface → Logic     │
│ Short factual introduction.                   → Data       │
│ [View selected work ↗] [Get in touch]                       │
│ Pawan Maurya / Currently at Codetrex                       │
├────────────────────────────────────────────────────────────┤
│ 01 / SELECTED WORK                  Professional + freelance│
│ Om Sanskaram story        │ Large genuine project preview  │
│ contributions + status    │                                │
│ action                    │                                │
│ ────────────────────────────────────────────────────────── │
│ Codetrex preview          │ Redesign story / ongoing        │
│ ────────────────────────────────────────────────────────── │
│ Yashvi story / freelance  │ Yashvi preview                  │
├────────────────────────────────────────────────────────────┤
│ 02 / EXPERIENCE    │ Company, dates, progression and bullets│
├────────────────────────────────────────────────────────────┤
│ 03 / EXPERTISE     │ Frontend / Backend / Data / Services   │
├────────────────────────────────────────────────────────────┤
│ 04 / ABOUT         │ Biography + compact education         │
├────────────────────────────────────────────────────────────┤
│ Have a project in mind?                                    │
│ Let's talk.          [Email Pawan ↗]     LinkedIn / GitHub   │
└────────────────────────────────────────────────────────────┘
```

Wireframe blocks describe hierarchy, not literal boxed containers. Hero and About stay visually open; project rows supply the largest visual surfaces.

### Mobile, 320–639 CSS pixels

```text
┌───────────────────────────────┐
│ Pawan.                 Menu   │
│ FULL STACK DEVELOPER          │
│ From interface               │
│ to application.              │
│ Introduction, natural wrap.  │
│ [View selected work]         │
│ [Get in touch]               │
│ Small abstract visual        │
│ Current company context      │
│ ──────────────────────────── │
│ 01 / SELECTED WORK           │
│ Om Sanskaram / Ongoing       │
│ Context + contribution       │
│ [genuine preview if ready]   │
│ [Visit website ↗]            │
│ Next projects, same order    │
│ Experience, one-column list  │
│ Expertise, wrapping groups   │
│ About + stacked education    │
│ Let's talk / Email / socials │
└───────────────────────────────┘
```

At 640–1023px, keep the hero single-column with a restrained horizontal visual below copy. Project rows also stay stacked until each text/preview column has comfortable space. Expertise can use two columns from 640px. Do not force desktop layout simply because a device is called a tablet.

## 4. Design tokens for Phase 04

Values below are the approved implementation baseline, not yet applied theme CSS. Phase 04 maps them into Tailwind `@theme` tokens and shared component variants.

### Colour and surfaces

| Token            | Value     | Role                                       |
| ---------------- | --------- | ------------------------------------------ |
| `canvas`         | `#101216` | Main charcoal page                         |
| `surface`        | `#161A21` | Project preview frame and navigation panel |
| `surface-raised` | `#1C222C` | Hover/elevated elements                    |
| `text-primary`   | `#F3F5F7` | Titles and main text                       |
| `text-secondary` | `#AEB7C6` | Body/support text                          |
| `text-muted`     | `#919CAC` | Dates, labels, metadata                    |
| `accent`         | `#2563EB` | Primary filled actions                     |
| `accent-hover`   | `#1D4ED8` | Primary action hover                       |
| `accent-text`    | `#72A7FF` | Inline links and small blue labels         |
| `on-accent`      | `#FFFFFF` | Text on filled actions                     |
| `border`         | `#303846` | Decorative dividers/frame borders          |
| `focus`          | `#72A7FF` | Focus ring                                 |

Static contrast calculations for opaque pairs: primary/canvas **17.15:1**, secondary/raised **7.90:1**, muted/raised **5.75:1**, white/accent **5.17:1**, accent-text/raised **6.61:1**. Computed with sRGB relative luminance. These are token checks, not a complete accessibility audit. Avoid opacity on meaningful text. Decorative border contrast is not sufficient for a required control boundary; use a higher-contrast semantic treatment when needed.

Blue should occupy a small fraction of the page. Status labels use readable text and a border; state must not depend on colour or a pulsing dot alone. Ambient blue gradient is decorative and locally clipped, never behind important text at reduced contrast.

### Typography

- Primary font: **self-hosted variable Manrope**, Latin WOFF2, normal style, only required weights (400–700); obtain from an official/licensed source during Phase 04. Keep the required font license. If unavailable, ship a system sans fallback and record the difference instead of blocking content.
- Fallback: `Manrope, "Segoe UI", Arial, sans-serif`. No external runtime font stylesheet. Use `font-display: swap`; preload only one genuinely critical font file if used.
- Metadata uses the same family with moderate letter spacing; monospace is limited to small technical labels using system monospace. No second downloaded family.

| Role            | Size                                      | Line height / tracking |
| --------------- | ----------------------------------------- | ---------------------- |
| Hero headline   | `clamp(2.5rem, 5.5vw + 1rem, 5.75rem)`    | 1.04; -0.045em         |
| Contact display | `clamp(2.25rem, 5vw, 4.75rem)`            | 1.08; -0.035em         |
| Section heading | `clamp(1.875rem, 3vw, 3rem)`              | 1.15; -0.03em          |
| Project heading | `clamp(1.5rem, 2.2vw, 2.25rem)`           | 1.2; -0.025em          |
| Lead paragraph  | `clamp(1.0625rem, 0.5vw + 1rem, 1.25rem)` | 1.65; normal           |
| Body            | 1rem                                      | 1.7; normal            |
| Small text      | 0.875rem                                  | 1.55; normal           |
| Eyebrow         | 0.75rem                                   | 1.5; 0.12em; uppercase |

Use rem-based sizes so browser preferences work. Hero line breaks may guide composition above 640px; natural wrapping must win on narrow screens. Never use `white-space: nowrap` on headings to preserve a desktop art direction. Body copy max width 60ch, hero intro 48ch.

### Layout, spacing, shape

- Content container: `max-width: 76rem`, centred, width 100% with responsive inline padding. Text/visual grid: 12 columns with 24–32px gaps on desktop.
- Inline page padding: 20px below 640px, 32px at 640px, 48px at 1024px. Respect safe-area insets where needed.
- Section block padding: `clamp(4rem, 8vw, 7.5rem)`; adjacent sections should not accidentally double spacing.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 120px, represented in rem when implemented.
- Body max width 60ch; narrow editorial columns 48ch. Project text/preview ratio approximately 5:7 on desktop, with row gap 48px.
- Radius: actions 10px, smaller surfaces 12px, project preview frames 20px. Pills only for compact tags/status.
- Borders: 1px rules, restrained; no card outline around every paragraph. Shadows limited to navigation separation and a soft preview hover treatment.
- Layer order: decorative background 0; page content 1; sticky header 30; expanded navigation 40. Avoid arbitrary escalating z-index values.
- Focus: 2px solid focus colour with 4px offset; never removed. Primary controls minimum height 48px; icon/menu controls at least 44px square.

## 5. Header and hero behavior

Header height: 72px on desktop, 64px below 1024px. Sticky at the top, with an opaque-enough charcoal background and fine bottom rule; no backdrop blur required. Anchor `scroll-margin-top` must account for header plus 24px.

At 1024px and wider show the four text links. Below 1024px, show an inline disclosure button labelled Menu/Close with `aria-expanded` and `aria-controls`. Its panel expands below the header **in document flow**, not as a modal/fullscreen overlay. No focus trap is needed for this non-modal pattern. Escape closes and returns focus to the button; selecting an anchor closes the panel; switching to desktop clears stale expanded state. Hidden links must not remain focusable. Native anchor navigation should preserve expected back/forward hash behavior.

Hero uses approximately 7/12 text and 5/12 visual columns from 1024px. The left has role eyebrow, headline, a short introduction, actions, then current-company context. No mandatory 100vh or hardcoded hero height; ensure copy and actions appear promptly on short-height screens.

The abstract visual is a sparse **Interface → Logic → Data** composition built in HTML/CSS or inline SVG: three aligned planes/nodes and fine connecting lines, a restrained blue light, and a few precise labels. It illustrates capabilities, not a diagram of a particular application's architecture. Do not invent API responses, code ownership, dashboards, or usage numbers. Decorative elements are `aria-hidden`; meaningful context remains in text.

On mobile, reduce the visual's detail and height to roughly 160–200px, after actions. If a narrow/short screen would be dominated by decoration, omit decorative layers while preserving all meaningful content. Desktop visual can be 320–420px high, bounded by its column.

## 6. Section specifications

### Work — strongest proof first

Intro: **Selected work** with short context such as “Products, company work, and independent client delivery.”

Use three editorial project rows divided by fine rules, not an animated carousel. Preview/text can alternate visually on desktop through grid placement, while DOM reading order remains coherent. On mobile, title/status and contribution copy precede the preview and action.

1. **Om Sanskaram:** main feature; badge **Company work · In progress**. Show scratch-built product scope, distinct subscription/store flows, APIs/admin/banners, payment integration and wallet funding. A separate small line identifies five-puja journeys as ongoing. Do not suggest the entire product is complete.
2. **Codetrex Website Redesign:** **Company work · Redesign in progress**. Link label **View company website**, with concise text clarifying that the redesign is ongoing; the current URL is not proof of the final version.
3. **Yashvi Infosys:** **Freelance client · Development & deployment**. Clearly outside Codetrex employment. Use Pawan's user-reported ownership without copying the client's service testimonials as developer endorsements.

Preview frame uses a consistent 16:10 container, with intrinsic width/height supplied. Capture composition must keep the meaningful viewport visible; use `object-fit: contain` on a matching dark surface unless an intentional reviewed crop is documented. A small domain label replaces fake browser chrome.

**Missing-preview policy:** while `preview` is null, render a refined text-led project presentation with its domain and actual contribution list. Do not show broken images, a skeleton forever, or an invented screenshot. Work can still look intentional with fewer image surfaces. Add real previews during Phase 06 when available.

Do not show project stack tags until confirmed per project. Contributions may appear as compact scope labels if a stack is unknown. External links remain real anchors. No whole-card nested interactive link; title/action links must have a clear target. Keep essential descriptions visible without hover.

Legacy projects remain in data. Optionally include a compact “Earlier MERN & React work” list after the main rows when links are verified; it is secondary, not necessary to reach the main three.

### Experience — factual progression

Desktop: sticky-looking editorial heading column (actual stickiness optional only if unobstructive) and a 2/3 width chronological list. Mobile: simple stacked records with a short left rule; no zigzag timeline.

- Codetrex, **Nov 2025–Present**: current Full Stack role, then an undated “Started in frontend; gradually moved across the stack” line and 4–6 concise contribution bullets. Exact joining date remains in data; no invented transition month.
- Softpro internship, **Feb–May 2025**: role and known background only; do not fill space with invented responsibilities.
- Yashvi appears in Work as freelance, not inside this employment list.

### Expertise — grouped and readable

Two-column editorial groups on desktop/tablet, one column on narrow screens. Use Frontend; Backend & APIs; Databases & data access; Services & tooling. Show current work first, followed by a quieter MERN/React background line. No skills percentages, proficiency stars, 31 equally prominent badges, or endlessly moving logo marquee. Java/Python stay out of primary display until relevance is confirmed.

Icons are optional group markers, not replacements for names. Use one SVG family (Lucide candidate, installed when used), consistent 20px/1.75–2 stroke. Brand logos need accurate assets and a concrete purpose; no second icon pack simply for decoration.

### About — short and personal

Use a narrow editorial paragraph opposite compact MCA/BCA education rows. Keep the biography grounded in the content draft. Display school education only if the final content review calls for it; all records remain stored. Do not insert a stock portrait or a fabricated working-method manifesto.

### Contact and footer — decisive ending

Open composition with a large **Let's talk.** heading, short invitation, filled email action, selectable email address, and LinkedIn/GitHub. Contact address can break safely with `overflow-wrap: anywhere` when necessary. Phone and Instagram remain hidden under current visibility settings. Resume remains conditional on verification.

Footer has Pawan's name, current calendar year, and a normal Back to top link. No newsletter form, social counters, unsolicited availability claims, or unnecessary legal links to empty pages.

## 7. Responsive and accessibility behavior

| Width       | Layout rule                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------- |
| 320–639px   | 20px side gutters; single columns; stacked primary actions where needed; compact hero visual |
| 640–767px   | 32px gutters; actions can sit inline if they fit; expertise may be two columns               |
| 768–1023px  | Comfortable tablet single-column hero/work; wider previews; disclosure navigation            |
| 1024–1279px | 48px gutters; desktop navigation; two-column hero/project rows                               |
| 1280px+     | Bounded 76rem container; larger whitespace rather than endlessly enlarged text/previews      |

Breakpoints are starting rules, not excuses to ignore content wrapping. Inspect 320, 360, 390, 480, 640, 768, 820, 1024, 1280, 1440, and 1920px plus intermediate widths, portrait/landscape and short-height screens. Check 200% zoom and 320 CSS pixel reflow.

- Use `min-width: 0` on grid/flex children as needed; wrap tags and email; avoid fixed content heights and page-level overflow hiding.
- All navigation and project/contact actions work with keyboard and touch. Essential details never depend on hover, drag, cursor position, or animation.
- One h1, logical heading nesting, semantic landmarks, skip link, useful image alt, accessible icon names, and visible focus.
- Disable smooth scrolling for reduced motion. Anchor destinations must remain unobscured by the sticky header.
- Honour high-contrast/forced-colours behavior for controls and focus. Do not encode role/project status solely through colour.
- No modals, accordions, carousels, or tabs are needed in this initial composition. Add interaction only if it improves an actual reader task.

## 8. Motion specification

Build the static page first. Use CSS transitions and native observation for basic motion; decide whether a dedicated library is needed in Phase 08. Do not install one just for these specifications.

| Element               | Effect                                              | Timing                                        | Reduced-motion behavior   |
| --------------------- | --------------------------------------------------- | --------------------------------------------- | ------------------------- |
| Hero                  | Short opacity/translate entrance, max 16px          | 450ms; children stagger <=60ms; total <=700ms | Immediate, no translation |
| Section/project entry | Once-only gentle reveal, max 12px                   | 350–450ms; small groups only                  | Always visible            |
| Button/link           | Colour, border, icon movement max 2px               | 160ms                                         | Colour/focus state only   |
| Preview hover         | Optional 2px lift or <=1.015 scale inside frame     | 220ms                                         | No transform              |
| Navigation panel      | Brief opacity transition; state changes immediately | <=180ms                                       | Instant                   |
| Ambient hero light    | Optional very slow low-amplitude drift              | >=10s; one effect only                        | Static or absent          |

Suggested easing: `cubic-bezier(0.22, 1, 0.36, 1)` for entry; standard ease-out for controls. No spring overshoot, text splitting into hundreds of spans, perpetual card bobbing, typing loader, autoplay audio, or scroll hijacking.

Content is visible by default and only enhanced after successful motion initialization. Observation/effect failure must not leave elements at opacity zero. Keep focusable actions visible before focus reaches them; do not hide targets on in-page navigation. Disable ambient animation when not visible or reduced motion is requested. Continuous pointer/scroll effects must not trigger React render work each frame.

## 9. Loading, assets, and performance

- Ship meaningful text on first render with no artificial loading screen. Portfolio content is local; do not fetch the JSON over a separate runtime API.
- Self-host one font family with fallback, limited weights, and a license. No runtime CDN icon font or font stylesheet.
- Size and compress real previews, set dimensions/aspect ratio, and lazy-load below-the-fold imagery. Avoid bundling large unused source screenshots.
- SVG/HTML hero decoration should stay small and accessible. No WebGL/3D package, video background, or canvas particle engine is needed.
- No need to lazy-load tiny sections by default; evaluate substantial assets/dependencies using actual production output.
- Keep native scroll and cursor. Avoid full-page fixed blur layers and large animated filters on mobile.
- Preserve the roadmap's Lighthouse/Core Web Vitals targets; measure during Phase 09 rather than asserting them from this spec.

## 10. Design review and handoff

Specification review against the agreed brief:

- [x] Dark charcoal/electric blue identity, readable token palette and consistent spacing defined.
- [x] Desktop, tablet, and mobile compositions specified, including intermediate-width checks.
- [x] Professional projects lead; Yashvi is freelance; company progression stays factual.
- [x] Missing photo/previews/stacks have intentional fallback treatments rather than fabricated assets.
- [x] Navigation, actions, touch/keyboard states, reduced motion, and loading behavior specified.
- [x] Motion is bounded; heavy visuals and extra runtime libraries are not required.

This is an implementation-readiness review, **not user approval of a rendered visual**. The existing user-selected direction is sufficient to proceed to Phase 04 without another permission gate. Evaluate the first implemented shell visually in Phase 04 and revise based on actual findings or user feedback.

Phase 04 owns tokens/fonts/shared UI/navigation/shell; Phases 05–07 own section detail; Phase 08 owns motion. Do not edit `dist/` to implement this design: it is generated output and will be overwritten by the next build. Open asset/content review items remain in the content draft and roadmap.
