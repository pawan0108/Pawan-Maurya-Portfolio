import { GraduationCap } from 'lucide-react'
import Container from '@/components/ui/Container.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import profile from '@/data/profile.json'
import content from '@/data/sections.json'
import { siteConfig } from '@/app/config.js'

export default function AboutSection() {
  const education = profile.education.filter((record) =>
    siteConfig.featuredEducation.includes(record.id),
  )
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-line py-[var(--section-space)]"
    >
      <Container>
        <SectionHeading id="about-heading" number="04" title="About" />
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <div className="min-w-0">
            <h3 className="max-w-[24ch] text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
              {content.about.headline}
            </h3>
            <div className="mt-6 max-w-[55ch] space-y-5 text-secondary">
              {content.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="mb-6 flex items-center gap-3 text-sm font-semibold">
              <GraduationCap
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-accent-text"
              />
              Education
            </h3>
            <ol className="grid gap-x-6 border-t border-line sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {education.map((record) => (
                <li
                  key={record.id}
                  data-education={record.id}
                  className="border-b border-line py-6"
                >
                  <p className="text-xs text-muted">
                    {record.period} / {record.status}
                  </p>
                  <h4 className="mt-3 text-base font-semibold">
                    {record.id === 'intermediate'
                      ? 'Class 12 · Intermediate (UP Board)'
                      : record.id === 'high-school'
                        ? 'Class 10 · High School (UP Board)'
                        : record.qualification}
                  </h4>
                  <p className="mt-2 text-sm text-secondary">{record.institution}</p>
                  {record.college && (
                    <p className="mt-2 text-xs leading-relaxed text-muted">{record.college}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
