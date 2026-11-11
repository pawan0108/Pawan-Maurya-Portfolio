import { Layers3, ArrowUpRight } from 'lucide-react'

const imageModules = import.meta.glob('/src/assets/images/projects/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export default function ProjectPreview({ project }) {
  const source = project.preview && imageModules[project.preview.src]
  const smallSource = project.preview?.smallSrc && imageModules[project.preview.smallSrc]
  const mediumSource = project.preview?.mediumSrc && imageModules[project.preview.mediumSrc]
  const domain = project.links.view ? new URL(project.links.view).hostname : null

  return (
    <figure className="project-preview min-w-0 overflow-hidden rounded-panel border border-line bg-surface motion-safe:transition-colors hover:border-muted">
      <div className="flex min-h-12 items-center justify-between gap-4 border-b border-line px-5 py-3 text-xs text-muted">
        <span className="min-w-0 break-all">{domain || project.name}</span>
        <ArrowUpRight size={16} aria-hidden="true" className="shrink-0" />
      </div>
      {source ? (
        <img
          src={source}
          srcSet={
            smallSource
              ? [`${smallSource} 640w`, mediumSource && `${mediumSource} 800w`, `${source} 1280w`]
                  .filter(Boolean)
                  .join(', ')
              : undefined
          }
          sizes="(min-width: 1280px) 624px, (min-width: 1024px) 52vw, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
          alt={project.preview.alt}
          width={project.preview.width}
          height={project.preview.height}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-contain"
        />
      ) : (
        <div className="flex min-h-64 flex-col justify-center bg-[radial-gradient(ellipse_at_top_right,#2563eb14,transparent_70%)] p-6 sm:aspect-[16/10] sm:p-10">
          <Layers3
            size={28}
            strokeWidth={1.25}
            aria-hidden="true"
            className="mb-6 text-accent-text"
          />
          <p className="text-xs tracking-[0.12em] text-muted uppercase">{project.role}</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{project.name}</p>
          <p className="mt-5 max-w-[40ch] text-sm text-secondary">{project.presentation.focus}</p>
        </div>
      )}
      <figcaption className="border-t border-line px-5 py-3 text-xs leading-relaxed text-muted">
        {source ? project.preview.caption : project.presentation.previewCaption}
      </figcaption>
    </figure>
  )
}
