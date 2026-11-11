import { ArrowUpRight } from 'lucide-react'
import Badge from '@/components/ui/Badge.jsx'
import ProjectPreview from './ProjectPreview.jsx'

export default function ProjectRow({ project, index }) {
  const compact = index > 0
  return (
    <article
      data-professional-project={project.id}
      data-reveal
      aria-labelledby={`${project.id}-heading`}
      className={
        compact
          ? 'grid min-w-0 content-start gap-6 rounded-2xl border border-line bg-surface p-5 sm:p-7'
          : 'grid min-w-0 items-center gap-8 rounded-2xl border border-line bg-surface/40 p-5 sm:p-8 lg:col-span-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12'
      }
    >
      <div className={`min-w-0 ${compact ? 'order-2' : ''}`}>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="text-xs text-muted">0{index + 1}</span>
          <Badge>{project.engagement === 'freelance' ? 'Freelance client' : 'Company work'}</Badge>
          <span className="text-xs text-accent-text">
            {project.status === 'in-progress' ? 'In progress' : 'Development & deployment'}
          </span>
        </div>
        <h3
          id={`${project.id}-heading`}
          className="text-2xl leading-tight font-semibold tracking-[-0.025em] sm:text-3xl"
        >
          {project.name}
        </h3>
        <p className="mt-4 max-w-[55ch] text-secondary">{project.presentation.context}</p>
        <p className="mt-6 text-xs font-semibold tracking-[0.1em] text-muted uppercase">
          My contribution
        </p>
        <ul className="mt-3 space-y-2 text-sm text-secondary">
          {project.contributions.map((contribution) => (
            <li key={contribution} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.65em] size-1 shrink-0 rounded-full bg-accent-text"
              />
              <span>{contribution}</span>
            </li>
          ))}
        </ul>
        {project.ongoingWork && (
          <p className="mt-5 border-l-2 border-accent pl-4 text-sm text-secondary">
            <span className="font-semibold text-ink">Currently: </span>
            {project.ongoingWork}
          </p>
        )}
        {project.technologies.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
            {project.technologies.map((technology) => (
              <li key={technology}>
                <Badge>{technology}</Badge>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {project.links.view && (
            <a
              href={project.links.view}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-link inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent-text underline-offset-4 hover:underline"
            >
              {project.presentation.linkLabel}
              <ArrowUpRight size={17} aria-hidden="true" />
              <span className="sr-only"> — {project.name} (opens in a new tab)</span>
            </a>
          )}
          {project.links.code && (
            <a
              href={project.links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-link inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-secondary hover:text-ink"
            >
              View source
              <ArrowUpRight size={17} aria-hidden="true" />
              <span className="sr-only"> — {project.name} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
      <div className={`min-w-0 ${compact ? 'order-1' : ''}`}>
        <ProjectPreview project={project} />
      </div>
    </article>
  )
}
