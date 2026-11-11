export const contactFields = ['name', 'email', 'phone', 'message']

export function validateContactField(name, rawValue) {
  const value = String(rawValue || '').trim()
  const required = {
    name: 'Please enter your name.',
    email: 'Please enter your email address.',
    phone: 'Please enter your phone number.',
    message: 'Please write a message.',
  }
  if (!value) return required[name]
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Enter a valid email address.'
  }
  if (name === 'phone') {
    const digits = value.replace(/\D/g, '')
    if (!/^[+\d\s().-]+$/.test(value) || digits.length < 7 || digits.length > 15) {
      return 'Enter a valid phone number (7–15 digits).'
    }
  }
  return ''
}
