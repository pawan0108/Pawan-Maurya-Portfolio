import { test, expect } from '@playwright/test'

test('reduced motion and unavailable enhancement APIs leave content usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Pause motion', exact: true })).toBeHidden()
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.getAnimations().filter((animation) => animation.playState === 'running').length,
      ),
    )
    .toBe(0)
  await page.getByRole('link', { name: 'Get in touch', exact: true }).click()
  await expect(
    page.getByRole('link', { name: 'pawanmaurya8931@gmail.com', exact: true }),
  ).toBeInViewport()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.addInitScript(() => {
    window.IntersectionObserver = undefined
    Element.prototype.animate = undefined
  })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.getByRole('link', { name: 'View selected work', exact: true }).click()
  await expect(page.getByRole('region', { name: 'Selected work', exact: true })).toBeVisible()
  expect(errors).toEqual([])
})

test('motion can be paused, resumed, and overridden by the system preference', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const visual = page.locator('.hero-visual')
  await expect(visual).toHaveAttribute('data-ambient-active', 'true')
  await page.getByRole('button', { name: 'Pause motion', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Resume motion', exact: true })).toBeVisible()
  await expect(visual).toHaveAttribute('data-ambient-active', 'false')
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.getAnimations().filter((animation) => animation.playState === 'running').length,
      ),
    )
    .toBe(0)
  await page.getByRole('button', { name: 'Resume motion', exact: true }).click()
  await page.getByRole('link', { name: 'Back to top', exact: true }).click()
  await expect(visual).toHaveAttribute('data-ambient-active', 'true')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(visual).toHaveAttribute('data-ambient-active', 'false')
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.getAnimations().filter((animation) => animation.playState === 'running').length,
      ),
    )
    .toBe(0)
})

test('section reveals never hide focused actions or restart on repeated scrolling', async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.revealCounts = {}
    const animate = Element.prototype.animate
    Element.prototype.animate = function (...args) {
      if (this.hasAttribute('data-reveal')) {
        const key = this.getAttribute('aria-labelledby') || this.textContent.slice(0, 50)
        window.revealCounts[key] = (window.revealCounts[key] || 0) + 1
      }
      return animate.apply(this, args)
    }
  })
  await page.goto('/')
  const firstProject = page.getByRole('article', { name: 'Om Sanskaram', exact: true })
  await firstProject.scrollIntoViewIfNeeded()
  const link = firstProject.getByRole('link')
  await link.focus()
  await expect(link).toBeFocused()
  expect(await firstProject.evaluate((element) => getComputedStyle(element).opacity)).toBe('1')
  await page.locator('#contact').scrollIntoViewIfNeeded()
  await firstProject.scrollIntoViewIfNeeded()
  await expect
    .poll(() =>
      page.evaluate(() => Object.values(window.revealCounts).every((count) => count === 1)),
    )
    .toBe(true)
})
