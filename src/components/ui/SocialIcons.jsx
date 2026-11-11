const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function Linkedin({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10v7M11 17v-7m0 3a3 3 0 0 1 6 0v4" />
      <circle cx="7.5" cy="7" r=".7" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Instagram({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Github({ size = 20 }) {
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.9c0-1.1-.4-1.8-1-2.2 3.3-.4 6.7-1.6 6.7-7.1A5.5 5.5 0 0 0 19.2 5c.2-.5.7-2.2-.2-4 0 0-1.3-.4-4.1 1.5a14 14 0 0 0-7.5 0C4.6.6 3.3 1 3.3 1c-.9 1.8-.4 3.5-.2 4a5.5 5.5 0 0 0-1.5 3.8c0 5.5 3.4 6.7 6.7 7.1-.5.4-1 1.2-1 2.2V22"
        transform="translate(1 1) scale(.9)"
      />
    </svg>
  )
}
