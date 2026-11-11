import { Mail, FileText, Phone } from 'lucide-react'
import { Linkedin, Github, Instagram } from '@/components/ui/SocialIcons.jsx'
import Container from '@/components/ui/Container.jsx'
import profile from '@/data/profile.json'
import content from '@/data/sections.json'
import ContactForm from './ContactForm.jsx'

export default function ContactSection() {
  const socialLinks = [
    { name: 'LinkedIn', href: profile.socials.linkedin, icon: Linkedin },
    { name: 'GitHub', href: profile.socials.github, icon: Github },
    ...(profile.visibility.instagram
      ? [{ name: 'Instagram', href: profile.socials.instagram, icon: Instagram }]
      : []),
  ]
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate border-t border-line py-[var(--section-space)]"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="min-w-0">
            <p className="mb-6 text-xs font-semibold tracking-[0.12em] text-accent-text uppercase">
              05 / {content.contact.eyebrow}
            </p>
            <h2
              data-reveal
              id="contact-heading"
              className="text-[clamp(3rem,6vw,4.75rem)] leading-[1.08] font-semibold tracking-[-0.035em]"
            >
              {content.contact.heading}
            </h2>
            <p className="mt-6 max-w-[42ch] text-secondary">{content.contact.description}</p>
            <div className="mt-7 border-t border-line pt-5">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-11 max-w-full items-center gap-3 text-sm font-medium text-ink underline-offset-4 hover:underline sm:text-base"
              >
                <Mail size={19} className="shrink-0 text-accent-text" aria-hidden="true" />
                <span className="min-w-0 [overflow-wrap:anywhere]">{profile.email}</span>
              </a>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.name} (opens in a new tab)`}
                    title={link.name}
                    className="grid size-11 place-items-center rounded-full border border-line text-secondary hover:bg-surface-raised hover:text-accent-text"
                  >
                    <link.icon size={19} aria-hidden="true" />
                  </a>
                ))}
                {profile.visibility.resume && profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-control border border-line px-3 text-sm text-secondary hover:bg-surface-raised hover:text-ink"
                  >
                    <FileText size={17} aria-hidden="true" />
                    View resume<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
              {profile.visibility.phone && (
                <a
                  href={`tel:${profile.phone.replace(/\s/g, '')}`}
                  className="mt-3 flex min-h-11 w-fit items-center gap-2 text-sm text-secondary hover:text-ink"
                >
                  <Phone size={17} aria-hidden="true" />
                  {profile.phone}
                </a>
              )}
            </div>
          </div>
          <div className="min-w-0">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  )
}
