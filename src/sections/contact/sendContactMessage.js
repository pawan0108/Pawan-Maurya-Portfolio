import configuration from '@/data/contact.json'

/** Match the supplied Apps Script contract: FormData in, { success, message } JSON out. */
export async function sendContactMessage(formData, signal) {
  const controller = new AbortController()
  const abort = () => controller.abort()
  if (signal?.aborted) controller.abort()
  signal?.addEventListener('abort', abort, { once: true })
  let timedOut = false
  const timeout = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, 20000)
  try {
    const response = await fetch(configuration.endpoint, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
      credentials: 'omit',
    })
    if (!response.ok)
      throw new Error(
        'The server could not accept your message. Please try again or email me directly.',
      )
    const body = (await response.text()).trim()
    let result
    try {
      result = JSON.parse(body)
    } catch {
      throw new Error(
        'The server did not confirm submission. Please email me directly before retrying.',
      )
    }
    if (
      typeof result?.success !== 'boolean' ||
      typeof result?.message !== 'string' ||
      !result.message.trim()
    ) {
      throw new Error(
        'The server did not confirm submission. Please email me directly before retrying.',
      )
    }
    if (!result.success) throw new Error(result.message.trim())
    return result.message.trim()
  } catch (error) {
    if (timedOut)
      throw new Error(
        'Submission timed out. Delivery is unconfirmed; please email me directly before retrying.',
      )
    if (error.name === 'AbortError') throw error
    if (error instanceof TypeError)
      throw new Error(
        'Could not reach the contact service. Your message has been kept; try again or email me directly.',
      )
    throw error
  } finally {
    clearTimeout(timeout)
    signal?.removeEventListener('abort', abort)
  }
}
