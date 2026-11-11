/**
 * Editorial JSON contracts. These describe data; they do not create UI state.
 * Dates are ISO day or month precision. Null means unknown, not an estimated date.
 * Project stacks stay empty until confirmed for that particular project.
 *
 * @typedef {Object} Project
 * @property {string} id Stable identifier used as a React key.
 * @property {string} name Public display name.
 * @property {string} summary Factual editorial summary.
 * @property {string} category Presentation grouping.
 * @property {'personal'|'employment'|'freelance'} engagement
 * @property {string|null} employerId Employment record ID; null outside employment.
 * @property {'in-progress'|'delivered-user-reported'|'legacy-unverified'} status
 * @property {boolean} featured
 * @property {string|null} role
 * @property {string[]} contributions
 * @property {string|null} ongoingWork Incomplete scope must remain explicitly labelled.
 * @property {string[]} technologies Confirmed project-specific names from skills.json.
 * @property {{src: string, smallSrc?: string, mediumSrc?: string, alt: string, width: number, height: number, caption: string}|null} preview
 * @property {{context: string, focus: string, linkLabel: string, previewCaption: string}} [presentation] Professional showcase editorial copy.
 * @property {{view: string|null, code: string|null}} links No placeholder URLs.
 * @property {{ownership: string, publicReview: string, reviewedOn: string, limitations: string}} evidence
 *
 * @typedef {Object} Skill
 * @property {string} id Stable normalized identifier.
 * @property {string} name Human-readable technology name.
 * @property {'frontend'|'backend'|'data'|'services'|'tools'|'languages'} group
 * @property {Array<'current'|'legacy'>} contexts Provenance, not proficiency ratings.
 *
 * @typedef {Object} Experience
 * @property {string} id
 * @property {string} company
 * @property {string} role
 * @property {string|null} previousRole
 * @property {string|null} startDate
 * @property {string|null} roleTransitionDate
 * @property {string|null} endDate
 * @property {boolean} isCurrent
 * @property {string[]} responsibilities
 * @property {string} notes Editorial provenance; do not render automatically.
 */

export {}
