import { test, expect } from '@playwright/test'

test('contact actions are native, keyboard accessible, and respect unpublished fields', async ({
  page,
}) => {
  await page.goto('/#contact')
  const contact = page.getByRole('region', { name: "Let's talk.", exact: true })
  const email = contact.getByRole('link', { name: 'pawanmaurya8931@gmail.com', exact: true })
  await expect(email).toHaveAttribute('href', 'mailto:pawanmaurya8931@gmail.com')
  await email.focus()
  await expect(email).toBeFocused()
  expect(await email.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none')
  for (const name of ['LinkedIn', 'GitHub', 'Instagram']) {
    const link = contact.getByRole('link', { name: new RegExp(`^${name}`) })
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    await link.focus()
    await expect(link).toBeFocused()
  }
  await expect(contact.getByRole('form', { name: 'Send a message' })).toHaveCount(1)
  await expect(contact.locator('a[href^="tel:"]')).toHaveCount(0)
  await expect(contact.getByRole('link', { name: /View resume/i })).toHaveAttribute(
    'href',
    /drive.google.com/,
  )
  await expect(
    page.getByRole('region', { name: 'Experience', exact: true }).getByText(/Yashvi/),
  ).toHaveCount(0)
})
