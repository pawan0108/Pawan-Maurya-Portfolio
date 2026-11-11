export default function SectionHeading({ number, title, description, id }) {
  return (
    <div className="max-w-2xl" data-reveal>
      <p className="mb-4 text-xs font-semibold tracking-[0.12em] text-accent-text uppercase">
        {number} / {title}
      </p>
      <h2 id={id} className="text-heading font-semibold text-ink">
        {title}
      </h2>
      {description && <p className="mt-5 max-w-[60ch] text-secondary">{description}</p>}
    </div>
  )
}
