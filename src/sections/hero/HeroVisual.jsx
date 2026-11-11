import { ArrowUpRight } from 'lucide-react'
import omPreview from '@/assets/images/projects/om-sanskaram-800.webp'
import yashviPreview from '@/assets/images/projects/yashvi-infosys-640.webp'

/** Decorative montage of real public project captures; project details remain in Work. */
export default function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true" data-ambient data-motion="hero">
      <span className="hero-project-word">BUILD.</span>
      <div className="hero-project-primary">
        <div className="hero-project-bar">
          <span>OM SANSKARAM</span>
          <ArrowUpRight size={16} />
        </div>
        <img src={omPreview} width="800" height="500" alt="" />
        <div className="hero-project-bar">
          <span>Full-stack platform</span>
          <span>In progress</span>
        </div>
      </div>
      <div className="hero-project-secondary">
        <div className="hero-project-bar">
          <span>YASHVI INFOSYS</span>
          <ArrowUpRight size={16} />
        </div>
        <img src={yashviPreview} width="640" height="400" alt="" />
      </div>
      <div className="hero-project-tag">
        <span className="size-2 rounded-full bg-accent-text" /> Real projects. End-to-end work.
      </div>
    </div>
  )
}
