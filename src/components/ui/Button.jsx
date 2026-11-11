const variants = {
  primary: 'border-accent bg-accent text-white hover:border-accent-hover hover:bg-accent-hover',
  secondary: 'border-muted bg-transparent text-ink hover:border-ink hover:bg-surface-raised',
}

/** Render navigation as anchors and operations as buttons, with identical visual variants. */
export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const classes = `interactive-action inline-flex min-h-12 items-center justify-center gap-2 rounded-control border px-5 py-3 text-sm font-semibold motion-safe:transition-colors motion-safe:duration-150 ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
