import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Linkedin, Github, Instagram } from '@/components/ui/SocialIcons.jsx'
import Container from '@/components/ui/Container.jsx'
import Button from '@/components/ui/Button.jsx'
import profile from '@/data/profile.json'
import introduction from '@/data/introduction.json'
import HeroVisual from './HeroVisual.jsx'
import './hero.css'

export default function HeroSection() {
  const currentEmployment = profile.experience.find((experience) => experience.isCurrent)
  const [givenName, ...familyName] = profile.name.split(' ')

  return (
    <section id="home" aria-labelledby="intro-heading" className="hero-section">
      <Container>
        <div className="hero-intro-line mb-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-sm">
          <p className="text-sm font-semibold text-ink">
            {profile.name}
            <span className="mx-3 text-line" aria-hidden="true">
              /
            </span>
            <span className="font-normal text-secondary">{profile.title}</span>
          </p>
          <p className="hidden text-xs tracking-[0.08em] text-muted uppercase lg:block">
            FRONTEND ROOTS / FULL STACK NOW
          </p>
        </div>
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-7">
          <div className="min-w-0">
            <p className="mb-4 text-sm font-medium text-secondary">Hello, I&apos;m</p>
            <h1
              id="intro-heading"
              className="hero-heading text-display font-semibold"
              data-motion="hero"
            >
              <span className="block">{givenName.toUpperCase()}</span>
              <span className="hero-name-outline block">
                {familyName.join(' ').toUpperCase()}
                <span className="text-accent-text">.</span>
              </span>
            </h1>
            <p className="mt-5 text-xl font-medium tracking-tight text-ink sm:text-2xl">
              I build the interface.
              <br />
              <span className="text-accent-text">And everything behind it.</span>
            </p>
            <p className="mt-7 max-w-[46ch] text-lead text-secondary" data-motion="hero">
              {introduction.description}
            </p>
            <div
              className="mt-8 flex flex-col gap-3 min-[440px]:flex-row min-[440px]:flex-wrap"
              data-motion="hero"
            >
              <Button href="#work">
                {introduction.primaryAction}
                <ArrowDownRight size={18} aria-hidden="true" />
              </Button>
              <Button href="#contact" variant="secondary">
                {introduction.secondaryAction}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Button>
            </div>
            <div className="mt-5 flex items-center gap-3" aria-label="Social profiles">
              {[
                { name: 'LinkedIn', href: profile.socials.linkedin, icon: Linkedin },
                { name: 'GitHub', href: profile.socials.github, icon: Github },
                { name: 'Instagram', href: profile.socials.instagram, icon: Instagram },
              ].map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} (opens in a new tab)`}
                  className="grid size-11 place-items-center rounded-full border border-line text-secondary hover:bg-surface-raised hover:text-accent-text"
                >
                  <Icon size={19} aria-hidden="true" />
                </a>
              ))}
            </div>
            <div
              className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted"
              aria-label="Current technology focus"
            >
              {introduction.focus.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>
          <HeroVisual />
        </div>
        {currentEmployment && (
          <div className="mt-9 flex flex-col gap-2 border-t border-line pt-5 text-xs sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p className="text-muted">
              Currently at <span className="text-secondary">{currentEmployment.company}</span>
            </p>
            <a
              href="#work"
              className="inline-flex min-h-11 items-center gap-2 text-secondary hover:text-ink"
            >
              Explore my work <ArrowDownRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
      </Container>
    </section>
  )
}
