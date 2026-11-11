export default function Badge({ children }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-full border border-line px-3 py-1 text-xs leading-relaxed text-secondary">
      {children}
    </span>
  )
}
