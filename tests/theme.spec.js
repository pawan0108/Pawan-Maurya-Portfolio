import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [320, 1440]) {
  test(`theme, resume and social profiles work at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const header = page.locator('header')
    await expect(header.getByRole('link', { name: /^Resume/ })).toHaveAttribute(
      'href',
      /drive.google.com/,
    )
    if (width === 320)
      await expect(header.getByRole('button', { name: 'Menu', exact: true })).toHaveText('')
    await header.getByRole('button', { name: 'Switch to light mode' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
    await expect(header.getByRole('button', { name: 'Switch to dark mode' })).toBeVisible()
    const audit = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(audit.violations).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    for (const name of ['LinkedIn', 'GitHub', 'Instagram']) {
      await expect(
        page.locator('#home').getByRole('link', { name: new RegExp(`^${name}`) }),
      ).toBeVisible()
    }
    await page.screenshot({ path: testInfo.outputPath(`light-${width}.png`) })
    await header.getByRole('button', { name: 'Switch to dark mode' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })
}
