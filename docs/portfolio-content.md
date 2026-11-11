# Portfolio content handoff

Implementation phases, architecture, and acceptance criteria are tracked in [implementation-roadmap.md](./implementation-roadmap.md).

Phase 01 copy, project shortlist, evidence review, asset inventory, and outstanding confirmations are tracked in [content-draft.md](./content-draft.md). This is draft material, not approved public copy.

Content was extracted from the previous local portfolio on 11 November 2026, with current employment updated from the user's instructions.

- `src/data/profile.json`: identity, contact links, resume link, education, internship, and current company/role.
- `src/data/projects.json`: all eight original project names, descriptions, categories, demo links, and source links.
- `src/data/skills.json`: normalized combined inventory of 31 skills, preserving all 18 previous skills and the user's current stack with current/legacy provenance.
- `src/data/professional-projects.json`: Om Sanskaram, Codetrex website redesign, and Yashvi Infosys; includes user-reported contributions, ongoing scope, and public review limitations. These take priority for featured work; the eight older projects remain preserved.

**Ownership correction:** Yashvi Infosys is the user's personal freelance client and is independent of Codetrex employment. Its project record has no employer association. Om Sanskaram and Codetrex redesign are employment work.

The original HTML/CSS/JavaScript, visual assets, template content, and contact-form integrations are not part of the new implementation. Existing Git history remains available. No remote links have been verified during this local extraction.

## Confirm before final portfolio copy

- Joining date confirmed: **12 November 2025**, at Codetrex Infotech Private Limited. Frontend for more than six months, followed by a gradual transition; currently fully working across the stack.
- Exact transition date is unspecified; use one employment entry with progression unless separate dated roles are requested. Confirm official job title if different.
- Current stack confirmed and stored in `profile.json`: HTML, CSS, JavaScript, Bootstrap, Tailwind CSS, C#, ASP.NET Core, ASP.NET Core MVC, Web API, MS SQL Server, PostgreSQL, pgAdmin, Firebase, Redis, Entity Framework Core, Dapper, Git, GitHub.
- Responsibilities and three professional projects are captured. Om Sanskaram includes subscription/store flows, APIs, administration/banners, payments, and wallet funding; five separate puja flows are ongoing. Codetrex redesign is ongoing; Yashvi build/deployment is user-reported. Project-specific stacks and measurable outcomes are not supplied.
- Whether the previous contact details, location, and resume link are still current.
- Which older skills and projects to feature publicly.

## Design direction

Build a new modern, premium portfolio with a fresh structure in React, Vite, and Tailwind CSS. Do not reproduce the old portfolio's design. Design implementation is pending the user's next instructions.
