import { ArrowUp, Pause, Play } from 'lucide-react'
import Container from '@/components/ui/Container.jsx'
import profile from '@/data/profile.json'

export default function Footer({ motionPaused, onToggleMotion }) {
  return (
    <footer className="border-t border-line py-6">
      <Container className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <button
            type="button"
            onClick={onToggleMotion}
            className="inline-flex min-h-11 items-center gap-2 text-xs text-secondary hover:text-ink motion-reduce:hidden"
          >
            {motionPaused ? (
              <Play size={14} aria-hidden="true" />
            ) : (
              <Pause size={14} aria-hidden="true" />
            )}
            {motionPaused ? 'Resume motion' : 'Pause motion'}
          </button>
          <a
            href="#home"
            className="inline-flex min-h-11 w-fit items-center gap-2 text-secondary hover:text-ink"
          >
            Back to top <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
