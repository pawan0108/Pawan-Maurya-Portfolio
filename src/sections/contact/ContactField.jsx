const control =
  'mt-2 block min-h-12 w-full min-w-0 rounded-xl border bg-canvas px-4 py-3 text-base text-ink placeholder:text-muted focus:outline-2 focus:outline-offset-2 disabled:opacity-60'

export default function ContactField({ name, label, error, multiline = false, ...props }) {
  const Control = multiline ? 'textarea' : 'input'
  const id = `contact-${name}`
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="text-sm text-secondary">
        {label}{' '}
        <span className="text-accent-text" aria-hidden="true">
          *
        </span>
      </label>
      <Control
        {...props}
        id={id}
        name={name}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${control} ${multiline ? 'resize-y' : ''} ${error ? 'border-rose-400/80 focus:border-rose-300 focus:outline-rose-300' : 'border-line focus:border-accent-text focus:outline-focus'}`}
      />
      <p
        id={`${id}-error`}
        aria-live="polite"
        className={error ? 'mt-2 text-xs leading-relaxed text-rose-300' : ''}
      >
        {error}
      </p>
    </div>
  )
}
