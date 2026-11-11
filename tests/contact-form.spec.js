import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const endpoint = 'https://script.google.com/macros/s/**'
async function fillMessage(page) {
  const form = page.getByRole('form', { name: 'Send a message' })
  await form.getByLabel(/^Name/).fill('Portfolio Test')
  await form.getByLabel(/^Email/).fill('test@example.test')
  await form.getByLabel(/^Phone/).fill('+91 0000000000')
  await form.getByLabel(/^Message/).fill('A local intercepted test. No email should be sent.')
  return form
}

test('restored form preserves legacy payload, prevents duplicate sends, and resets on confirmation', async ({
  page,
}, testInfo) => {
  let finish
  const pending = new Promise((resolve) => {
    finish = resolve
  })
  const requests = []
  await page.route(endpoint, async (route) => {
    requests.push(route.request())
    await pending
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        success: true,
        message: 'Your message has been submitted successfully!',
      }),
    })
  })
  await page.goto('/#contact')
  const form = await fillMessage(page)
  await form.getByRole('button', { name: 'Send message' }).click()
  await expect(form.getByRole('button', { name: /Sending/ })).toBeDisabled()
  await form.evaluate((element) => element.requestSubmit())
  await expect.poll(() => requests.length).toBe(1)
  expect(requests[0].method()).toBe('POST')
  const payload = requests[0].postData()
  for (const key of ['name', 'email', 'phone', 'message'])
    expect(payload).toContain(`name="${key}"`)
  expect(payload).toContain('test@example.test')
  finish()
  const dialog = page.getByRole('dialog', { name: 'Thank you, Portfolio!' })
  await expect(dialog).toBeVisible()
  await expect(dialog.locator('#submission-message')).toHaveText(
    'Your message has been submitted successfully!',
  )
  await page.screenshot({ path: testInfo.outputPath('submission-success-desktop.png') })
  await expect(form.getByLabel(/^Name/)).toHaveValue('')
  await expect(form.getByLabel(/^Message/)).toHaveValue('')
  await dialog.getByRole('button', { name: 'Back to portfolio' }).click()
  await expect(dialog).toBeHidden()
  await expect(form.getByRole('button', { name: 'Send message' })).toBeFocused()
})

test('server failure keeps entered message and offers an honest retry state', async ({ page }) => {
  await page.route(endpoint, (route) =>
    route.fulfill({ status: 500, headers: { 'Access-Control-Allow-Origin': '*' }, body: 'Error' }),
  )
  await page.goto('/#contact')
  const form = await fillMessage(page)
  await form.getByRole('button', { name: 'Send message' }).click()
  await expect(page.getByRole('dialog').locator('#submission-message')).toContainText(
    'could not accept',
  )
  await page.getByRole('dialog').getByRole('button', { name: 'Back to message' }).click()
  await expect(form.getByLabel(/^Message/)).not.toHaveValue('')
  await expect(form.getByRole('button', { name: 'Send message' })).toBeEnabled()
})

test('unconfirmed HTML response is not labelled a successful message', async ({ page }) => {
  await page.route(endpoint, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: '<html><body>Sign in required</body></html>',
    }),
  )
  await page.goto('/#contact')
  const form = await fillMessage(page)
  await form.getByRole('button', { name: 'Send message' }).click()
  await expect(page.getByRole('dialog').locator('#submission-message')).toContainText(
    'did not confirm',
  )
  await expect(form.getByLabel(/^Message/)).not.toHaveValue('')
})

test('invalid email shows an inline error without a native bubble or request', async ({ page }) => {
  let requests = 0
  await page.route(endpoint, (route) => {
    requests += 1
    return route.abort()
  })
  await page.goto('/#contact')
  const form = await fillMessage(page)
  await form.getByLabel(/^Email/).fill('invalid-email')
  await form.getByRole('button', { name: 'Send message' }).click()
  await expect(form).toHaveAttribute('novalidate', '')
  await expect(form.locator('#contact-email-error')).toHaveText('Enter a valid email address.')
  await expect(form.getByLabel(/^Email/)).toHaveAttribute('aria-invalid', 'true')
  expect(requests).toBe(0)
})

test('Apps Script success false displays its message even with HTTP 200', async ({ page }) => {
  await page.route(endpoint, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: false, message: 'All fields are required.' }),
    }),
  )
  await page.goto('/#contact')
  const form = await fillMessage(page)
  await form.getByRole('button', { name: 'Send message' }).click()
  await expect(page.getByRole('dialog').locator('#submission-message')).toHaveText(
    'All fields are required.',
  )
  await expect(form.getByLabel(/^Message/)).not.toHaveValue('')
})

test('phone is required to match the supplied Apps Script validation', async ({ page }) => {
  let requests = 0
  await page.route(endpoint, (route) => {
    requests += 1
    return route.abort()
  })
  await page.goto('/#contact')
  const form = await fillMessage(page)
  await form.getByLabel(/^Phone/).fill('')
  await form.getByRole('button', { name: 'Send message' }).click()
  await expect(form.locator('#contact-phone-error')).toHaveText('Please enter your phone number.')
  await expect(form.getByLabel(/^Phone/)).toHaveAttribute('aria-invalid', 'true')
  expect(requests).toBe(0)
})

test('empty fields show individual errors, focus the first field, and clear errors while editing', async ({
  page,
}) => {
  let requests = 0
  await page.route(endpoint, (route) => {
    requests += 1
    return route.abort()
  })
  await page.goto('/#contact')
  const form = page.getByRole('form', { name: 'Send a message' })
  await form.getByRole('button', { name: 'Send message' }).click()
  for (const field of ['name', 'email', 'phone', 'message']) {
    await expect(form.locator(`#contact-${field}`)).toHaveAttribute('aria-invalid', 'true')
    await expect(form.locator(`#contact-${field}-error`)).not.toBeEmpty()
  }
  await expect(form.getByLabel(/^Name/)).toBeFocused()
  await form.getByLabel(/^Name/).fill('Pawan')
  await expect(form.locator('#contact-name-error')).toBeEmpty()
  await expect(form.getByLabel(/^Name/)).toHaveAttribute('aria-invalid', 'false')
  await expect(page.getByRole('dialog')).toHaveCount(0)
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(results.violations).toEqual([])
  expect(requests).toBe(0)
})

test('mobile thank-you popup supports keyboard dismissal, focus restoration and accessibility', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.route(endpoint, (route) =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        success: true,
        message: 'Your message has been submitted successfully!',
      }),
    }),
  )
  await page.goto('/#contact')
  const form = await fillMessage(page)
  await form.getByRole('button', { name: 'Send message' }).click()
  const dialog = page.getByRole('dialog', { name: 'Thank you, Portfolio!' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Close message' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('button', { name: 'Back to portfolio' })).toBeFocused()
  await page.screenshot({ path: testInfo.outputPath('submission-success-mobile.png') })
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  expect(results.violations).toEqual([])
  expect(
    await dialog.evaluate((element) => element.getBoundingClientRect().width <= window.innerWidth),
  ).toBe(true)
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(form.getByRole('button', { name: 'Send message' })).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
})
