import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import projects from '@/data/professional-projects.json'
import ProjectRow from './ProjectRow.jsx'
import PersonalProjects from './PersonalProjects.jsx'

export default function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="border-t border-line py-[var(--section-space)]"
    >
      <Container>
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-14 lg:flex-row lg:items-end">
          <SectionHeading
            id="work-heading"
            number="01"
            title="Selected work"
            description="From connected product flows to a company's digital presence. A closer look at what I've been building."
          />
          <p className="shrink-0 text-xs text-muted">Company projects & independent clients</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {projects
            .filter((project) => project.featured)
            .map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} />
            ))}
        </div>
        <PersonalProjects />
      </Container>
    </section>
  )
}
