# Phase 01 — Content draft and evidence review

Status: Prepared for factual review; not approved for publication.  
Reviewed: 11 November 2026

Phase 07 implementation note: factual source records now drive the dedicated content sections, with editorial copy in `src/data/sections.json`. Email/LinkedIn/GitHub are presented from the original supplied information. Phone and Instagram remain hidden. The resume viewer action is supported but hidden (`visibility.resume: false`) because the legacy Drive URL could not be retrieved and freshness is unconfirmed. T40 remains open for that decision; education integration is complete.

## Latest scope update — professional work

The user's latest instructions prioritize the following three professional projects. This supersedes the older provisional personal-project shortlist below. Additional professional work will be discussed later. Structured records are in `src/data/professional-projects.json`; the eight legacy projects stay unchanged in `projects.json`.

### Om Sanskaram — primary featured project

**Draft:** Building a platform from scratch with distinct daily subscription and store purchase journeys. My work spans frontend and backend, APIs, administration, banner management, payment gateway integration, and wallet add-money functionality. I am currently extending the platform with separate journeys for five puja offerings.

- Ownership and features: explicitly reported by Pawan; not independently verified through source or transaction tests.
- State: ongoing development. The five-puja flow separation must not be represented as completed.
- Public link: [Om Sanskaram](http://omsanskaram.com/).
- Phase 06 review update: the earlier web-tool restriction was resolved through local Chrome with network access. HTTP redirected to HTTPS and returned 200; real public homepage preview captured and inspected. Authenticated/transaction functionality remains untested.
- Unknown: project-specific stack, payment provider, precise subscription rules, technical decisions, and measurable results. Do not map every current skill to this project automatically.

### Codetrex — supporting featured project

**Draft:** Redesigning the Codetrex company website to update its public presentation of the business and its services.

- Ownership: Pawan reports ongoing redesign work; completion is not claimed.
- Public review: [Codetrex homepage](https://codetrex.in/) exposes services, solutions, work, and contact navigation in retrieved page text.
- Limit: this was content inspection, not visual/browser QA. Whether the currently live page contains the latest redesign is unknown. Company statistics, company portfolio outcomes, and broad company technology lists must not become Pawan's personal claims.
- Missing: exact redesign scope, project-specific stack, before/after evidence, and approved screenshots.

### Yashvi Infosys — supporting featured project

**Draft:** Developed and deployed the Yashvi Infosys website, handling the website build through deployment.

- Ownership: build and deployment reported by Pawan.
- Public review: [Yashvi Infosys homepage](https://yashviinfosys.in/) contains IT services/repair information, service listings, and contact navigation.
- Limit: no visual responsiveness test, form submission, hosting inspection, or source review. The site's client reviews relate to its IT services; they are not testimonials about Pawan's development.
- Missing: exact implementation stack and approved preview assets. No performance or business outcome is claimed.

### Updated employment copy

**Codetrex Infotech Private Limited — Full Stack Developer | November 2025–Present**

- Building Om Sanskaram from scratch across frontend and backend.
- Implemented separate daily subscription and store purchasing journeys.
- Developed APIs, administration features, and banner management.
- Integrated payment gateway and wallet add-money functionality.
- Currently developing distinct flows for five puja offerings.
- Redesigning the Codetrex company website.

The user has confirmed Yashvi is a **personal freelance client**, independent of Codetrex. Present it under freelance/client work, never under Codetrex employment. The structured record explicitly uses `engagement: freelance` and `employerId: null`.

**Phase 01 delivery:** Available content capture, professional project drafts, contribution records, initial public-page review, and asset inventory are prepared. Remaining factual/asset/link review items below are explicitly open. Later projects are deferred at the user's request; no further project intake is needed to begin architecture work.

This document is the editorial working copy. The extracted facts remain in `src/data/profile.json`, `projects.json`, and `skills.json`. Do not replace unknown facts with assumptions when implementing the UI.

## Content confidence

| Information                                                                  | Source                      | State                                                                    |
| ---------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------ |
| Pawan Maurya                                                                 | Previous portfolio          | Extracted; current confirmation pending                                  |
| Full Stack work at Codetrex Infotech Private Limited                         | User's current instructions | Confirmed by user; official title spelling pending                       |
| Previously Frontend at the same company                                      | User's current instructions | Confirmed by user                                                        |
| ASP.NET Core MVC work                                                        | User's current instructions | Confirmed by user                                                        |
| Joined Codetrex on 12 November 2025                                          | User's follow-up            | Confirmed; first anniversary is 12 November 2026                         |
| Frontend for more than six months, followed by gradual Full Stack transition | User's follow-up            | Confirmed progression; no precise transition date supplied               |
| Current frontend, .NET, database, and tooling stack                          | User's follow-up            | Captured in `profile.json`; does not establish specific responsibilities |
| MERN/React project background                                                | Previous portfolio and user | Confirmed background; implementation details pending review              |
| Contact, education, internship, resume, older skills                         | Previous portfolio          | Extracted; current accuracy pending                                      |

## Proposed public copy

These are drafts, not additional factual claims. Use concise English for the public portfolio; confirm the language preference during review.

### Hero

- Eyebrow: **Pawan Maurya / Full Stack Developer**
- Headline: **From interface to application.**
- Introduction: **I'm Pawan, a Full Stack Developer at Codetrex Infotech Private Limited. I work with ASP.NET Core MVC and bring a background in frontend development, React, and the MERN stack.**
- Primary action: **View selected work** → Work section.
- Secondary action: **Get in touch** → Contact section.
- Supporting context: **Currently at Codetrex Infotech Private Limited.**

No senior title, years counter, availability badge, client count, or performance statistic is approved.

### About

**I started with frontend development and now work across the stack at Codetrex Infotech Private Limited. My current work involves ASP.NET Core MVC, alongside a background in building web projects with React and the MERN stack.**

Add a working-approach paragraph only after Pawan describes his actual process. No claims about architecture ownership, mentoring, scale, or business impact have been supplied.

### Experience

**Codetrex Infotech Private Limited — Full Stack Developer**  
Dates: **November 2025–Present**. Exact joining date: **12 November 2025**.

- Worked in frontend development for more than six months before gradually moving into full-stack work.
- Currently working across the stack with ASP.NET Core MVC and the user-supplied technologies below.
- Specific responsibilities are now captured in the latest scope update above and `profile.json`; quantitative outcomes remain unspecified.

**Softpro India Computer Technologies Pvt Ltd — MERN Stack Developer (Intern)**  
February–May 2025, as recorded in the previous portfolio; confirmation pending.

No internship responsibilities have been supplied; do not invent them.

### Expertise groups

These groups organize the old inventory, not proficiency ratings or proof that every tool is used professionally today.

| Group                             | Proposed items                                                     | Evidence/state                                                                   |
| --------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Current frontend                  | HTML, CSS, JavaScript, Bootstrap, Tailwind CSS                     | User-confirmed current stack                                                     |
| Current backend                   | C#, ASP.NET Core, ASP.NET Core MVC, Web API                        | User-confirmed; exact API responsibilities pending                               |
| Current databases and data access | MS SQL Server, PostgreSQL, Entity Framework Core, Dapper           | User-confirmed; project-specific usage pending                                   |
| Current services and tooling      | Firebase, Redis, pgAdmin, Git, GitHub                              | User-confirmed; Firebase services and Redis use cases unspecified                |
| MERN and React background         | React, Node.js, Express, MongoDB                                   | Previous projects and user-confirmed background                                  |
| Additional prior tools            | MySQL, MongoDB Atlas, Postman, VS Code, Vercel, Render, Cloudinary | Previous inventory; current usage pending                                        |
| Additional languages              | Java, Python                                                       | Preserve in inventory; omit from featured expertise until relevance is confirmed |

The user explicitly supplied Tailwind CSS, C#, MS SQL Server, and the other current-stack items above. Preserve the older inventory separately from this confirmed current stack. Do not infer Azure, authentication, architecture ownership, Firebase products, Redis caching responsibilities, or measurable outcomes from the technology names alone.

### Education

| Qualification          | Institution                                                                                    | Period from old site |
| ---------------------- | ---------------------------------------------------------------------------------------------- | -------------------- |
| MCA                    | Babu Banarasi Das University, Lucknow                                                          | 2023–2025; completed |
| BCA                    | University of Lucknow; Integral & Innovative Sustainable Education College, Kalyanpur, Lucknow | 2020–2023; completed |
| Intermediate, UP Board | Shri Vishwanath Inter College, Gyanpur, Bhadohi, Uttar Pradesh                                 | 2016–2017; completed |
| High School, UP Board  | Maharaj Kumar Anant Narayan Singh Vidyalaya, Gyanpur, Bhadohi, Uttar Pradesh                   | 2014–2015; completed |

Recommend emphasizing MCA/BCA and keeping school details compact. Preserve every record in data; final display choice and accuracy require confirmation.

### Contact

- Heading: **Let's talk about your next project.**
- Email: `pawanmaurya8931@gmail.com` — legacy; confirm current.
- Primary social links: GitHub and LinkedIn from `profile.json`.
- Instagram: optional; confirm whether it belongs in a professional portfolio.
- Location: propose **Noida, India** as the compact public label; the legacy record contains Sector 66 and postal code 201301.
- Phone: `+91 8931982906` — legacy; public visibility undecided. Do not display by default until confirmed.
- Resume: existing Google Drive URL; freshness, access, and download behavior unverified. Do not label it a downloadable PDF unless that behavior is confirmed.
- Use direct email/social actions. Do not promise form delivery or add a backend in this phase.

## Legacy project inventory and superseded provisional selection

The original shortlist below is retained as editorial history only. The professional projects above now take priority. Legacy selection was based on descriptions from the old site, not source-code inspection, visual quality, or verified functionality.

| Project              | Recorded scope                               | Proposed treatment   | Reason / missing evidence                                                                |
| -------------------- | -------------------------------------------- | -------------------- | ---------------------------------------------------------------------------------------- |
| Pitch For Profit     | MERN entrepreneur/investor pitching platform | Featured candidate 1 | Strongest stated full-stack relevance; exact owned features, stack, and outcomes pending |
| Movie Library        | React browsing and personal watchlist        | Featured candidate 2 | Product interaction example; data source, persistence, contribution pending              |
| Weather App          | React city-weather application               | Featured candidate 3 | Additional React example; API, states, implementation quality pending                    |
| LimeJungle           | HTML/CSS website                             | Alternate candidate  | Could replace Weather if visual evidence is stronger                                     |
| Spotify clone        | HTML/CSS interface recreation                | Secondary/archive    | Frame as a UI practice project, not an original streaming product                        |
| News Latter 2        | HTML/CSS newsletter page                     | Secondary/archive    | Smaller scope; preserve original name/links in data                                      |
| News Latter 1        | HTML/CSS newsletter design                   | Secondary/archive    | Smaller scope; do not claim email-client compatibility without evidence                  |
| Google Components UI | HTML/CSS Google-inspired elements            | Secondary/archive    | Practice component work; avoid implying affiliation                                      |

### Featured project copy drafts

**Pitch For Profit**

- Context: A platform for entrepreneurs to present startup ideas to potential investors.
- Description: A MERN-stack project centered on startup pitches and entrepreneur–investor connections.
- Contribution: Pending user/source review. Do not invent authentication, dashboards, messaging, payments, or deployment ownership.
- Outcome: Project artifact only; no adoption, funding, or commercial result supplied.

**Movie Library**

- Context: Browse movies and keep a personal watchlist.
- Description: A React project for exploring movies and managing a watchlist.
- Contribution: Pending user/source review. API provider, storage, filtering, and accessibility details unknown.
- Outcome: Project artifact only; no usage metrics supplied.

**Weather App**

- Context: Look up weather by city.
- Description: A single-page React application that displays city weather.
- Contribution: Pending user/source review. API provider, forecast coverage, caching, and error behavior unknown.
- Outcome: Project artifact only; no performance or usage metrics supplied.

For each featured project, collect: personal/team context, exact contribution, actual stack, a technical decision and reason, current working features, screenshot, limitations, and any supported outcome. Metrics are optional; qualitative factual outcomes are acceptable.

## Link verification record

On 11 November 2026, attempted to open all eight demo URLs and the three provisional featured GitHub repositories using the available web tool. Every demo returned a tool accessibility error; the three repositories returned fetch/cache errors. These results do **not** establish that the sites are down or repositories are private.

- All eight original demo/source pairs are preserved unchanged in `src/data/projects.json`.
- Featured demo candidates: [Pitch For Profit](https://pitch-for-profit-frontend-id57.vercel.app/), [Movie Library](https://movie-library-roan-five.vercel.app/), [Weather App](https://weather-app-lake-mu-19.vercel.app/).
- Featured source candidates: [Pitch For Profit repository](https://github.com/pawan0108/Pitch-For-Profit), [Movie Library repository](https://github.com/pawan0108/Movie-Library), [Weather App repository](https://github.com/pawan0108/Weather-App).
- The five remaining source repositories, social profiles, and resume were not checked in this pass.
- Link syntax is present; reachability and application behavior remain unverified. Repeat verification with an available network/browser path before approving featured work.

## Asset inventory

| Asset                               | Current state                          | Required action                                                             |
| ----------------------------------- | -------------------------------------- | --------------------------------------------------------------------------- |
| Portrait                            | No current asset retained              | Optional; use an abstract hero unless a new portrait is chosen              |
| Three professional project previews | New real captures prepared in Phase 06 | Local JPEGs with dimensions, alt text, captions; see project-previews.md    |
| Company project screenshots         | None supplied                          | Confirm public sharing rights and remove confidential data before inclusion |
| Resume                              | Legacy external Drive link only        | Confirm freshness and accessible destination; local PDF optional            |
| Education logos                     | Not retained                           | Not required; typography is sufficient                                      |
| Icon system                         | Not installed                          | Phase 04 implementation decision; roadmap identifies Lucide as candidate    |
| Social sharing image/favicon        | Not created                            | Phase 10 release assets                                                     |

The user requested removal of legacy visuals. Do not restore previous photos or screenshots from Git automatically. Git history remains available if the user later requests an old asset.

## Review checklist / pending user inputs

- [ ] Confirm public name/title and English copy.
- [ ] Confirm email, compact location, LinkedIn/GitHub, optional Instagram, and phone visibility.
- [x] Confirm joining date: 12 November 2025; frontend for more than six months followed by gradual Full Stack progression. A precise transition date is optional if the timeline describes progression within one employment entry.
- [ ] Confirm official job title if different from Full Stack Developer.
- [x] Capture user-supplied current technologies and databases.
- [x] Capture current technologies and real responsibilities from the user's professional project descriptions.
- [x] Identify professional projects for public portfolio descriptions: Om Sanskaram, Codetrex redesign, Yashvi Infosys. Private/admin screenshots remain out of scope unless separately cleared.
- [ ] Confirm internship and education details.
- [x] Replace the provisional shortlist with the three user-supplied professional projects and record their contributions.
- [ ] Confirm current resume and optional portrait preference.
- [ ] Complete link/functionality checks and approve final factual copy.

## Phase 01 task record

| Task | Work prepared                                                                                      | Remaining                                                                        |
| ---- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| T01  | Existing identity/contact facts inventoried; public labels proposed                                | User confirmation and visibility choices                                         |
| T02  | Joining date and gradual role progression confirmed                                                | Official title; precise transition date only if separate dated roles are desired |
| T03  | Current stack and responsibilities captured; public project descriptions supplied                  | Confidential screenshots and project-specific technical detail if needed         |
| T04  | Three professional projects prioritized; two public pages retrieved; eight older records preserved | Om Sanskaram access and actual functional/visual verification                    |
| T05  | Hero, About, experience, professional project, contact copy and skill groups drafted               | Final copy/education confirmation; no metrics supplied                           |
| T06  | Asset inventory and final-review checklist prepared                                                | Approved assets/content review                                                   |

Phase 01 remains **in progress** until its exit criteria are satisfied. Draft preparation is complete for the information currently available.
