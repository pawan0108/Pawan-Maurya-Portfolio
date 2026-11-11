import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, FileText, Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle.jsx'
import profile from '@/data/profile.json'
import Container from '@/components/ui/Container.jsx'
import { siteConfig } from '@/app/config.js'
import { Linkedin, Github, Instagram } from '@/components/ui/SocialIcons.jsx'
import './mobile-navigation.css'

const linkStyle =
  'nav-link inline-flex min-h-11 items-center text-sm font-medium text-secondary hover:text-ink motion-safe:transition-colors'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(window.location.hash)
  const headerRef = useRef(null)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)
  const desktopRef = useRef(null)
  const lastFocusedRef = useRef(null)

  useEffect(() => {
    const syncHash = () => setActiveSection(window.location.hash)
    window.addEventListener('hashchange', syncHash)
    const observer =
      typeof IntersectionObserver === 'function'
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries)
                if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
            },
            { rootMargin: '-15% 0px -65% 0px' },
          )
        : null
    document.querySelectorAll('main section[id]').forEach((section) => observer?.observe(section))
    return () => {
      window.removeEventListener('hashchange', syncHash)
      observer?.disconnect()
    }
  }, [])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 64rem)')
    function rememberFocus(event) {
      lastFocusedRef.current = event.target
    }
    function handleBreakpoint(event) {
      if (event.matches) {
        if (
          panelRef.current?.contains(lastFocusedRef.current) ||
          lastFocusedRef.current === toggleRef.current
        ) {
          desktopRef.current?.focus()
        }
        setIsOpen(false)
      } else if (desktopRef.current?.parentElement?.contains(lastFocusedRef.current)) {
        toggleRef.current?.focus()
      }
    }
    desktop.addEventListener('change', handleBreakpoint)
    document.addEventListener('focusin', rememberFocus)
    return () => {
      desktop.removeEventListener('change', handleBreakpoint)
      document.removeEventListener('focusin', rememberFocus)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const background = [...document.querySelectorAll('main, footer')].map((element) => [
      element,
      element.inert,
    ])
    background.forEach(([element]) => {
      element.inert = true
    })
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
      if (event.key === 'Tab') {
        const actions = [...headerRef.current.querySelectorAll('a, button')].filter(
          (element) => element.getClientRects().length,
        )
        const first = actions[0]
        const last = actions[actions.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = overflow
      background.forEach(([element, inert]) => {
        element.inert = inert
      })
    }
  }, [isOpen])

  return (
    <header
      ref={headerRef}
      data-menu-open={isOpen}
      className="sticky top-0 z-30 border-b border-line bg-canvas"
    >
      <Container>
        <div className="flex h-[var(--header-height)] items-center justify-between gap-2 sm:gap-6">
          <a
            href="#home"
            aria-label="Pawan Maurya, home"
            className="inline-flex min-h-11 items-center text-xl font-bold tracking-[-0.05em]"
            onClick={() => setIsOpen(false)}
          >
            pawan<span className="text-accent-text">.</span>
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {siteConfig.navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                ref={index === 0 ? desktopRef : undefined}
                className={linkStyle}
              >
                {item.label}
                {item.href === '#contact' && (
                  <ArrowUpRight size={16} className="ml-1" aria-hidden="true" />
                )}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-control border border-line px-3 text-sm font-medium hover:bg-surface-raised"
            >
              <FileText size={17} aria-hidden="true" />
              Resume
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close' : 'Menu'}
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex min-h-11 items-center gap-2 rounded-control px-2 text-sm font-medium lg:hidden"
            >
              {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </Container>
      <nav
        id="mobile-navigation"
        ref={panelRef}
        aria-label="Mobile"
        hidden={!isOpen}
        className="mobile-navigation border-t border-line lg:hidden"
      >
        <Container className="mobile-navigation-inner">
          <p className="mb-5 text-[0.6875rem] font-semibold tracking-[0.2em] text-muted uppercase">
            Explore the portfolio
          </p>
          <div className="mobile-navigation-links">
            {siteConfig.navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={activeSection === item.href ? 'location' : undefined}
                style={{ '--nav-index': index }}
                onClick={() => {
                  setIsOpen(false)
                  toggleRef.current?.focus()
                }}
                className="mobile-navigation-link group"
              >
                <span className="mr-5 font-mono text-xs text-muted" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="flex-1">{item.label}</span>
                <ArrowUpRight size={24} strokeWidth={1.5} aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mobile-navigation-footer">
            <p className="mb-2 text-[0.6875rem] font-semibold tracking-[0.16em] text-muted uppercase">
              Let’s connect
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-11 max-w-full items-center text-sm font-medium text-ink [overflow-wrap:anywhere] hover:text-accent-text"
            >
              {profile.email}
            </a>
            <div className="mt-3 flex gap-3">
              {[
                { name: 'LinkedIn', href: profile.socials.linkedin, icon: Linkedin },
                { name: 'GitHub', href: profile.socials.github, icon: Github },
                { name: 'Instagram', href: profile.socials.instagram, icon: Instagram },
              ].map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={`${name} (opens in a new tab)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 place-items-center rounded-full border border-line text-secondary hover:bg-surface-raised hover:text-accent-text"
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </nav>
    </header>
  )
}
