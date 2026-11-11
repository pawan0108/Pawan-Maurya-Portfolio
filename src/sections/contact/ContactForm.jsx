import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, LoaderCircle } from 'lucide-react'
import Button from '@/components/ui/Button.jsx'
import { sendContactMessage } from './sendContactMessage.js'
import { contactFields, validateContactField } from './contactValidation.js'
import ContactField from './ContactField.jsx'
import SubmissionDialog from './SubmissionDialog.jsx'

export default function ContactForm() {
  const [state, setState] = useState({ status: 'idle' })
  const [errors, setErrors] = useState({})
  const [popup, setPopup] = useState(null)
  const request = useRef(null)
  const [attempted, setAttempted] = useState(false)
  const submitRef = useRef(null)
  useEffect(() => () => request.current?.abort(), [])

  const dismissPopup = useCallback(() => {
    setPopup(null)
    requestAnimationFrame(() => submitRef.current?.focus())
  }, [])

  function validateOnBlur(event) {
    const { name, value } = event.currentTarget
    setErrors((previous) => ({ ...previous, [name]: validateContactField(name, value) }))
  }

  function validateOnChange(event) {
    const { name, value } = event.currentTarget
    if (attempted || errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: validateContactField(name, value) }))
    }
  }

  function field(name) {
    return { name, error: errors[name], onBlur: validateOnBlur, onChange: validateOnChange }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (request.current) return
    const form = event.currentTarget
    const values = new FormData(form)
    for (const key of contactFields) values.set(key, String(values.get(key) || '').trim())
    setAttempted(true)
    const nextErrors = Object.fromEntries(
      contactFields.map((key) => [key, validateContactField(key, values.get(key))]),
    )
    setErrors(nextErrors)
    const firstInvalid = contactFields.find((key) => nextErrors[key])
    if (firstInvalid) {
      form.elements.namedItem(firstInvalid)?.focus()
      return
    }
    const controller = new AbortController()
    request.current = controller
    setState({ status: 'sending' })
    try {
      const message = await sendContactMessage(values, controller.signal)
      if (controller.signal.aborted) return
      form.reset()
      setErrors({})
      setAttempted(false)
      setState({ status: 'success' })
      setPopup({ type: 'success', name: values.get('name'), message })
    } catch (error) {
      if (controller.signal.aborted) return
      setState({ status: 'error' })
      setPopup({ type: 'error', message: error.message })
    } finally {
      if (request.current === controller) request.current = null
    }
  }

  const sending = state.status === 'sending'
  const errorCount = Object.values(errors).filter(Boolean).length
  return (
    <>
      <form
        id="contact-form"
        noValidate
        onSubmit={handleSubmit}
        aria-label="Send a message"
        aria-busy={sending}
        className="rounded-2xl border border-line bg-surface p-5 sm:p-7"
      >
        <h3 className="mb-6 text-xl font-semibold tracking-tight">
          Tell me what you have in mind<span className="text-accent-text">.</span>
        </h3>
        <p className="sr-only" role="alert">
          {errorCount ? 'Please correct the highlighted fields below.' : ''}
        </p>
        <fieldset disabled={sending} className="min-w-0 space-y-5">
          <legend className="sr-only">Your contact details and message</legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <ContactField
              {...field('name')}
              label="Name"
              autoComplete="name"
              maxLength={120}
              placeholder="Your name"
            />
            <ContactField
              {...field('email')}
              label="Email"
              type="email"
              autoComplete="email"
              maxLength={254}
              placeholder="you@example.com"
            />
          </div>
          <ContactField
            {...field('phone')}
            label="Phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            placeholder="Your phone number"
          />
          <ContactField
            {...field('message')}
            label="Message"
            multiline
            maxLength={5000}
            rows={5}
            placeholder="A little about your project or question..."
          />
        </fieldset>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">* Required fields</p>
          <Button
            ref={submitRef}
            type="submit"
            disabled={sending}
            className="disabled:cursor-wait disabled:opacity-60"
          >
            {sending ? 'Sending...' : 'Send message'}
            {sending ? (
              <LoaderCircle size={18} aria-hidden="true" className="motion-safe:animate-spin" />
            ) : (
              <ArrowUpRight size={18} aria-hidden="true" />
            )}
          </Button>
        </div>
        {sending && (
          <p
            role="status"
            className="mt-5 rounded-xl border border-accent-text/20 bg-accent/10 px-4 py-3 text-sm text-accent-text"
          >
            Sending your message. Please wait...
          </p>
        )}
      </form>
      <SubmissionDialog result={popup} onDismiss={dismissPopup} />
    </>
  )
}
