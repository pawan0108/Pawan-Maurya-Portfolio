import { Braces, Database, PanelsTopLeft, Workflow } from 'lucide-react'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import skills from '@/data/skills.json'

const groups = [
  { id: 'frontend', title: 'Frontend', icon: PanelsTopLeft, categories: ['frontend'] },
  { id: 'backend', title: 'Backend & APIs', icon: Braces, categories: ['backend'] },
  { id: 'data', title: 'Databases & data access', icon: Database, categories: ['data'] },
  {
    id: 'services',
    title: 'Services & tooling',
    icon: Workflow,
    categories: ['services', 'tools'],
  },
]
const earlierIds = ['react', 'nodejs', 'express', 'mongodb']

export default function ExpertiseSection() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="border-t border-line py-[var(--section-space)]"
    >
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <SectionHeading
            id="expertise-heading"
            number="03"
            title="Expertise"
            description="The technologies in my current work, with a foundation in React and the MERN stack."
          />
          <p className="text-xs text-muted">Current focus / .NET application development</p>
        </div>
        <div className="grid gap-x-12 sm:grid-cols-2 lg:gap-x-20">
          {groups.map(({ id, title, icon: Icon, categories }) => (
            <article
              data-reveal
              key={id}
              aria-labelledby={`${id}-skills-heading`}
              className="min-w-0 border-t border-line py-7 sm:py-8"
            >
              <div className="mb-5 flex items-center gap-3">
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="shrink-0 text-accent-text"
                />
                <h3 id={`${id}-skills-heading`} className="text-base font-semibold">
                  {title}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-secondary">
                {skills
                  .filter(
                    (skill) =>
                      skill.contexts.includes('current') && categories.includes(skill.group),
                  )
                  .map((skill) => (
                    <li key={skill.id} data-skill={skill.id}>
                      {skill.name}
                    </li>
                  ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-3 rounded-xl border border-line bg-surface px-5 py-5 sm:px-7 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-7">
          <h3 className="shrink-0 text-sm font-medium text-muted">Earlier MERN & React work</h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-secondary">
            {earlierIds
              .map((id) => skills.find((skill) => skill.id === id))
              .filter(Boolean)
              .map((skill) => (
                <li key={skill.id} data-skill={skill.id}>
                  {skill.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="mt-4 grid gap-3 rounded-xl border border-line px-5 py-5 sm:px-7 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-7">
          <h3 className="text-sm font-medium text-muted">Additional skills & tools</h3>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-secondary">
            {skills
              .filter(
                (skill) => !skill.contexts.includes('current') && !earlierIds.includes(skill.id),
              )
              .map((skill) => (
                <li key={skill.id} data-skill={skill.id}>
                  {skill.name}
                </li>
              ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
