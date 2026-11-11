import Header from '@/components/layout/Header.jsx'
import Footer from '@/components/layout/Footer.jsx'
import HeroSection from '@/sections/hero/HeroSection.jsx'
import WorkSection from '@/sections/work/WorkSection.jsx'
import ExperienceSection from '@/sections/experience/ExperienceSection.jsx'
import ExpertiseSection from '@/sections/expertise/ExpertiseSection.jsx'
import AboutSection from '@/sections/about/AboutSection.jsx'
import ContactSection from '@/sections/contact/ContactSection.jsx'
import { useRef, useState } from 'react'
import usePageMotion from '@/hooks/usePageMotion.js'

export default function App() {
  const mainRef = useRef(null)
  const [motionPaused, setMotionPaused] = useState(false)
  usePageMotion(mainRef, motionPaused)
  return (
    <div data-page-motion-paused={motionPaused}>
      <a
        href="#main-content"
        className="sr-only fixed top-3 left-5 z-50 rounded-control bg-ink px-5 py-3 font-semibold text-canvas focus:not-sr-only"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} ref={mainRef}>
        <HeroSection />
        <WorkSection />
        <ExperienceSection />
        <ExpertiseSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer
        motionPaused={motionPaused}
        onToggleMotion={() => setMotionPaused((value) => !value)}
      />
    </div>
  )
}
