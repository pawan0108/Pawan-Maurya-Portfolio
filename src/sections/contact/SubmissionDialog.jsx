import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, CircleCheck, CircleAlert, X } from 'lucide-react'
import Button from '@/components/ui/Button.jsx'
import './submission-dialog.css'

export default function SubmissionDialog({ result, onDismiss }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const success = result?.type === 'success'

  useEffect(() => {
    const dialog = dialogRef.current
    if (!result) {
      if (dialog.open) dialog.close()
      return
    }
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      if (dialog.open) dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [result])

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onDismiss}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        const buttons = event.currentTarget.querySelectorAll('button')
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }}
      aria-labelledby="submission-title"
      aria-describedby="submission-message submission-note"
      className="submission-dialog fixed inset-0 m-auto max-h-[calc(100svh_-_2rem)] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-[1.75rem] border border-line bg-surface p-0 text-ink shadow-[0_32px_120px_#0009]"
    >
      <div className={`h-1 w-full ${success ? 'bg-accent' : 'bg-rose-400'}`} />
      <button
        ref={closeRef}
        type="button"
        onClick={() => dialogRef.current.close()}
        aria-label="Close message"
        className="absolute top-4 right-4 grid size-11 place-items-center rounded-full text-muted hover:bg-surface-raised hover:text-ink"
      >
        <X size={20} aria-hidden="true" />
      </button>
      <div className="px-6 pt-12 pb-7 text-center sm:px-10 sm:pt-14 sm:pb-9">
        <div
          className={`mx-auto mb-7 grid size-20 place-items-center rounded-full border ${success ? 'border-accent-text/25 bg-accent/10 text-accent-text shadow-[0_0_50px_#2563eb18]' : 'border-rose-300/25 bg-rose-400/10 text-rose-300'}`}
        >
          {success ? (
            <CircleCheck size={38} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <CircleAlert size={38} strokeWidth={1.5} aria-hidden="true" />
          )}
        </div>
        <p
          className={`mb-3 text-[0.6875rem] font-semibold tracking-[0.18em] uppercase ${success ? 'text-accent-text' : 'text-rose-300'}`}
        >
          {success ? 'Message submitted' : 'Submission needs attention'}
        </p>
        <h2
          id="submission-title"
          className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl"
        >
          {success
            ? `Thank you${result?.name ? `, ${result.name.split(/\s+/)[0]}` : ''}!`
            : 'Couldn’t send your message.'}
        </h2>
        <p id="submission-message" className="mt-5 text-sm leading-relaxed text-secondary">
          {result?.message}
        </p>
        <p id="submission-note" className="mt-3 text-sm leading-relaxed text-muted">
          {success
            ? 'Thanks for reaching out. I’ll review your message and get back to you.'
            : 'Your details are still in the form, so you don’t have to type them again.'}
        </p>
        <Button onClick={() => dialogRef.current.close()} className="mt-8 w-full">
          {success ? 'Back to portfolio' : 'Back to message'}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Button>
        {success && (
          <p className="mt-6 text-xs text-muted">
            Pawan Maurya <span aria-hidden="true">/</span> Full Stack Developer
          </p>
        )}
      </div>
    </dialog>,
    document.body,
  )
}
