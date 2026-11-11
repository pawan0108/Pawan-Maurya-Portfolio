import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { siteConfig } from '../src/app/config.js'

const load = async (name) =>
  JSON.parse(await readFile(new URL(`../src/data/${name}.json`, import.meta.url), 'utf8'))

const [profile, personal, professional, skills] = await Promise.all(
  ['profile', 'projects', 'professional-projects', 'skills'].map(load),
)
const introduction = await load('introduction')
const sections = await load('sections')
const contact = await load('contact')

const text = (value, label) =>
  assert(typeof value === 'string' && value.trim().length > 0, `${label}: expected text`)

function uniqueIds(records, label) {
  assert(Array.isArray(records), `${label}: expected an array`)
  const seen = new Set()
  for (const record of records) {
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.id), `${label}: invalid ID`)
    assert(!seen.has(record.id), `${label}: duplicate ID ${record.id}`)
    seen.add(record.id)
  }
  return seen
}

function date(value, label, nullable = true) {
  if (nullable && value === null) return
  assert(typeof value === 'string', `${label}: expected ISO date`)
  assert(/^\d{4}-\d{2}(?:-\d{2})?$/.test(value), `${label}: invalid ISO precision`)
  const day = value.length === 7 ? `${value}-01` : value
  const parsed = new Date(`${day}T00:00:00Z`)
  assert(!Number.isNaN(parsed.getTime()), `${label}: invalid date`)
  assert(parsed.toISOString().slice(0, 10) === day, `${label}: invalid calendar date`)
}

function url(value, label, nullable = true) {
  if (nullable && value === null) return
  text(value, label)
  const parsed = new URL(value)
  assert(['https:', 'http:'].includes(parsed.protocol), `${label}: expected web URL`)
  assert(!parsed.username && !parsed.password, `${label}: embedded credentials disallowed`)
}

text(profile.name, 'profile name')
url(contact.endpoint, 'contact endpoint', false)
assert(new URL(contact.endpoint).hostname === 'script.google.com', 'Unexpected legacy contact host')
text(profile.title, 'profile title')
assert(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email), 'Invalid contact email')
assert(typeof profile.visibility.phone === 'boolean', 'Phone visibility must be explicit')
assert(typeof profile.visibility.instagram === 'boolean', 'Instagram visibility must be explicit')
assert(typeof profile.visibility.resume === 'boolean', 'Resume visibility must be explicit')
Object.entries(profile.socials).forEach(([key, value]) => url(value, key, false))
url(profile.resumeUrl, 'resume')
const employerIds = uniqueIds(profile.experience, 'experience')
const educationIds = uniqueIds(profile.education, 'education')
assert(
  siteConfig.featuredEducation.every((id) => educationIds.has(id)),
  'Unknown featured education',
)
for (const record of profile.education) {
  for (const field of ['institution', 'qualification', 'period', 'status'])
    text(record[field], `education.${field}`)
}
for (const field of ['description', 'progression'])
  text(sections.experience[field], `experience copy ${field}`)
text(sections.about.headline, 'about headline')
assert(
  Array.isArray(sections.about.paragraphs) && sections.about.paragraphs.length > 0,
  'About copy missing',
)
sections.about.paragraphs.forEach((paragraph) => text(paragraph, 'about paragraph'))
for (const field of ['eyebrow', 'heading', 'description'])
  text(sections.contact[field], `contact copy ${field}`)
for (const experience of profile.experience) {
  text(experience.company, 'company')
  text(experience.role, 'role')
  assert(typeof experience.isCurrent === 'boolean', 'Current role state must be explicit')
  for (const field of ['startDate', 'roleTransitionDate', 'endDate']) {
    date(experience[field], `${experience.id}.${field}`)
  }
  assert(!experience.isCurrent || experience.endDate === null, 'Current role cannot have end date')
  if (experience.startDate && experience.endDate) {
    assert(experience.startDate <= experience.endDate, 'Employment dates out of order')
  }
  if (experience.roleTransitionDate) {
    assert(experience.startDate, 'Role transition needs an employment start date')
    assert(experience.roleTransitionDate >= experience.startDate, 'Transition precedes joining')
    if (experience.endDate) {
      assert(experience.roleTransitionDate <= experience.endDate, 'Transition follows departure')
    }
  }
  assert(Array.isArray(experience.responsibilities), 'Responsibilities must be an array')
  experience.responsibilities.forEach((value) => text(value, 'responsibility'))
}

uniqueIds(skills, 'skills')
const skillNames = new Set()
for (const skill of skills) {
  text(skill.name, 'skill name')
  assert(!skillNames.has(skill.name), `Duplicate skill ${skill.name}`)
  skillNames.add(skill.name)
  assert(
    ['frontend', 'backend', 'data', 'services', 'tools', 'languages'].includes(skill.group),
    `Invalid skill group: ${skill.id}`,
  )
  assert(Array.isArray(skill.contexts) && skill.contexts.length > 0, 'Missing skill provenance')
  assert(
    skill.contexts.every((value) => ['current', 'legacy'].includes(value)),
    'Invalid context',
  )
}
assert(Array.isArray(profile.currentTechnologies), 'Missing current technologies')
for (const technology of profile.currentTechnologies) {
  assert(skillNames.has(technology), `Unknown current technology: ${technology}`)
  assert(
    skills.find((skill) => skill.name === technology).contexts.includes('current'),
    `Missing current provenance: ${technology}`,
  )
}

for (const field of ['eyebrow', 'headline', 'description', 'primaryAction', 'secondaryAction']) {
  text(introduction[field], `introduction.${field}`)
}
assert(Array.isArray(introduction.focus), 'Hero focus must be an array')
for (const technology of introduction.focus) {
  assert(profile.currentTechnologies.includes(technology), `Unconfirmed hero focus: ${technology}`)
}

const projects = [...personal, ...professional]
uniqueIds(projects, 'projects')
assert(
  personal.every((project) => project.engagement === 'personal'),
  'Legacy ownership changed',
)
assert(
  professional.every((project) => ['employment', 'freelance'].includes(project.engagement)),
  'Professional records must have explicit engagement',
)
for (const project of projects) {
  text(project.name, 'project name')
  text(project.summary, 'project summary')
  text(project.category, 'project category')
  assert(['personal', 'employment', 'freelance'].includes(project.engagement), 'Invalid engagement')
  if (project.engagement === 'employment') {
    assert(employerIds.has(project.employerId), `Unknown employer: ${project.id}`)
  } else {
    assert(
      project.employerId === null,
      `Non-employment project attached to employer: ${project.id}`,
    )
  }
  assert(
    ['in-progress', 'delivered-user-reported', 'legacy-unverified'].includes(project.status),
    `Invalid project status: ${project.id}`,
  )
  assert(typeof project.featured === 'boolean', 'Featured state must be explicit')
  if (project.role !== null) text(project.role, 'project role')
  assert(Array.isArray(project.contributions), 'Contributions must be an array')
  project.contributions.forEach((value) => text(value, 'project contribution'))
  if (project.ongoingWork !== null) {
    text(project.ongoingWork, 'ongoing work')
    assert(project.status === 'in-progress', 'Incomplete scope must not be labelled delivered')
  }
  assert(Array.isArray(project.technologies), 'Project technologies must be an array')
  project.technologies.forEach((name) =>
    assert(skillNames.has(name), `Unknown project skill: ${name}`),
  )
  url(project.links.view, `${project.id} demo`)
  url(project.links.code, `${project.id} source`)
  if (project.preview !== null) {
    text(project.preview.src, 'preview source')
    text(project.preview.alt, 'preview alt')
    assert(project.preview.width > 0 && project.preview.height > 0, 'Missing preview dimensions')
    assert(
      project.preview.src.startsWith('/src/assets/images/projects/'),
      'Unexpected asset location',
    )
    assert(!project.preview.src.includes('..'), 'Preview path cannot traverse directories')
    await access(new URL(`..${project.preview.src}`, import.meta.url))
    for (const variant of [project.preview.smallSrc, project.preview.mediumSrc].filter(Boolean)) {
      assert(
        variant.startsWith('/src/assets/images/projects/') && !variant.includes('..'),
        'Invalid small preview path',
      )
      await access(new URL(`..${variant}`, import.meta.url))
    }
    text(project.preview.caption, 'preview caption')
  }
  if (project.engagement !== 'personal') {
    for (const field of ['context', 'focus', 'linkLabel', 'previewCaption']) {
      text(project.presentation[field], `${project.id} presentation ${field}`)
    }
  }
  for (const field of ['ownership', 'publicReview', 'limitations']) {
    text(project.evidence[field], `${project.id} evidence ${field}`)
  }
  date(project.evidence.reviewedOn, 'review date', false)
}

// Explicit ownership regression: this client must never appear under company employment.
const yashvi = projects.find((project) => project.id === 'yashvi-infosys')
assert(
  yashvi?.engagement === 'freelance' && yashvi.employerId === null,
  'Yashvi must remain freelance',
)
assert(
  profile.experience.every(
    (experience) => !experience.responsibilities.some((value) => /yashvi/i.test(value)),
  ),
  'Personal client work must not appear in employment responsibilities',
)

console.log(
  `Content valid: ${projects.length} projects, ${skills.length} skills, ${profile.experience.length} employment records. Yashvi remains freelance.`,
)
