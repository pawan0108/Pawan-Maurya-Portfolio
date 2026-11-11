import { ArrowRight, BriefcaseBusiness } from 'lucide-react'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import Badge from '@/components/ui/Badge.jsx'
import profile from '@/data/profile.json'
import content from '@/data/sections.json'

const month = (value) =>
  new Intl.DateTimeFormat('en-IN', { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${value.slice(0, 7)}-01T00:00:00Z`),
  )

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-line py-[var(--section-space)]"
    >
      <Container>
        <SectionHeading
          id="experience-heading"
          number="02"
          title="Experience"
          description={content.experience.description}
        />
        <ol className="mt-9 grid min-w-0 gap-4 sm:mt-11">
          {profile.experience.map((experience, index) => (
            <li key={experience.id} className="min-w-0">
              <article
                aria-labelledby={`${experience.id}-heading`}
                data-reveal
                className={`experience-card relative grid min-w-0 gap-7 overflow-hidden rounded-2xl border border-line bg-surface p-5 sm:p-7 lg:p-8 ${experience.responsibilities.length ? 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10' : 'sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:items-center'}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-0 left-0 w-[3px] ${experience.isCurrent ? 'bg-accent' : 'bg-line'}`}
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                    <p>
                      {experience.startDate ? (
                        <time dateTime={experience.startDate}>{month(experience.startDate)}</time>
                      ) : (
                        'Start date to be confirmed'
                      )}
                      <span aria-hidden="true"> — </span>
                      <span className="sr-only"> to </span>
                      {experience.isCurrent ? (
                        'Present'
                      ) : experience.endDate ? (
                        <time dateTime={experience.endDate}>{month(experience.endDate)}</time>
                      ) : (
                        'End date to be confirmed'
                      )}
                    </p>
                    {experience.isCurrent && <Badge>Current role</Badge>}
                    <span className="ml-auto font-mono text-muted" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </div>
                  {experience.responsibilities.length > 0 && (
                    <h3
                      id={`${experience.id}-heading`}
                      className="mt-5 text-xl leading-snug font-semibold tracking-tight sm:text-2xl"
                    >
                      {experience.role}
                    </h3>
                  )}
                  <p
                    className={`${experience.responsibilities.length ? 'mt-2 text-sm' : 'mt-4 text-base font-medium'} text-secondary`}
                  >
                    {experience.company}
                  </p>
                  {experience.previousRole && (
                    <div className="mt-5 border-t border-line pt-5">
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-ink">
                        <BriefcaseBusiness
                          size={16}
                          aria-hidden="true"
                          className="text-accent-text"
                        />
                        {experience.previousRole}
                        <ArrowRight size={14} aria-hidden="true" />
                        <span className="text-accent-text">{experience.role}</span>
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-muted">
                        {content.experience.progression}
                      </p>
                    </div>
                  )}
                </div>
                {experience.responsibilities.length > 0 && (
                  <div className="min-w-0 border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                    <p className="mb-5 text-xs font-semibold tracking-[0.12em] text-accent-text uppercase">
                      What I’m building
                    </p>
                    <ul className="space-y-3 text-sm leading-relaxed text-secondary">
                      {experience.responsibilities.map((responsibility) => (
                        <li key={responsibility} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-[0.7em] size-1 shrink-0 rounded-full bg-accent-text"
                          />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {experience.responsibilities.length === 0 && (
                  <h3
                    id={`${experience.id}-heading`}
                    className="min-w-0 text-xl leading-snug font-semibold tracking-tight sm:text-2xl"
                  >
                    {experience.role}
                  </h3>
                )}
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
