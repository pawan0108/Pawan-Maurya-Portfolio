import {
  ArrowUpRight,
  CodeXml,
  Layers3,
  CloudSun,
  Film,
  Music2,
  LayoutTemplate,
} from 'lucide-react'
import projects from '@/data/projects.json'

const icons = { mern: Layers3, react: CodeXml, ui: LayoutTemplate, 'ui-clone': Music2 }
const labels = { mern: 'MERN stack', react: 'React', ui: 'HTML & CSS', 'ui-clone': 'UI recreation' }

export default function PersonalProjects() {
  return (
    <div className="mt-12 border-t border-line pt-10" aria-labelledby="personal-projects-heading">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.12em] text-accent-text uppercase">
            The rest of my work
          </p>
          <h3
            id="personal-projects-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Personal projects & experiments<span className="text-accent-text">.</span>
          </h3>
        </div>
        <p className="text-sm text-muted">MERN · React · Frontend</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => {
          const Icon =
            project.id === 'weather-app'
              ? CloudSun
              : project.id === 'movie-library'
                ? Film
                : icons[project.category] || CodeXml
          return (
            <article
              key={project.id}
              data-personal-project={project.id}
              data-reveal
              data-reveal-delay={(index % 3) * 70}
              aria-labelledby={`${project.id}-title`}
              className="group flex min-w-0 flex-col rounded-2xl border border-line bg-surface p-6 motion-safe:transition-colors hover:border-accent-text/60"
            >
              <div className="mb-7 flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl border border-accent-text/20 bg-accent/10 text-accent-text">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className="mb-2 text-xs text-accent-text">{labels[project.category]}</p>
              <h4 id={`${project.id}-title`} className="text-xl font-semibold tracking-tight">
                {project.name}
              </h4>
              <p className="mt-3 mb-6 text-sm leading-relaxed text-secondary">{project.summary}</p>
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 text-sm font-medium">
                <a
                  href={project.links.view}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="motion-link inline-flex min-h-11 items-center gap-2 text-ink hover:text-accent-text"
                >
                  View project
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> — {project.name} (opens in a new tab)</span>
                </a>
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-secondary hover:text-ink"
                >
                  <CodeXml size={16} aria-hidden="true" />
                  Source code<span className="sr-only"> — {project.name} (opens in a new tab)</span>
                </a>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
