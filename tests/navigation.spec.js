import { test, expect } from '@playwright/test'

test('mobile disclosure supports keyboard, Escape, and section navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const menu = page.getByRole('button', { name: /^(Menu|Close)$/ })
  const mobile = page.getByRole('navigation', { name: 'Mobile', exact: true })
  await expect(mobile).toBeHidden()
  await menu.focus()
  await page.keyboard.press('Enter')
  await expect(mobile).toBeVisible()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('main')).toHaveAttribute('inert', '')
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden')
  await page.keyboard.press('Tab')
  await expect(mobile.getByRole('link', { name: 'Work', exact: true })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(mobile).toBeHidden()
  await expect(menu).toBeFocused()
  await expect(page.locator('main')).not.toHaveAttribute('inert', '')
  await menu.click()
  await mobile.getByRole('link', { name: 'Contact', exact: true }).click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(mobile).toBeHidden()
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
})

test('overlay keeps focus inside the header and stays usable in both themes on a short screen', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 667 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#work')
  const menu = page.getByRole('button', { name: 'Menu', exact: true })
  await menu.click()
  const mobile = page.getByRole('navigation', { name: 'Mobile', exact: true })
  const last = mobile.getByRole('link', { name: /^Instagram/ })
  await last.focus()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Pawan Maurya, home' })).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(last).toBeFocused()
  await mobile.evaluate((element) => {
    element.scrollTop = 0
  })
  await page.screenshot({ path: testInfo.outputPath('menu-dark.png') })
  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  await page.screenshot({ path: testInfo.outputPath('menu-light.png') })
  const bounds = await mobile.boundingBox()
  expect(Math.round(bounds.y + bounds.height)).toBe(667)
  await page.getByRole('button', { name: 'Close', exact: true }).click()
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
})

test('breakpoint change closes stale mobile navigation and preserves usable focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Menu', exact: true }).click()
  const mobile = page.getByRole('navigation', { name: 'Mobile', exact: true })
  await mobile.getByRole('link', { name: 'About', exact: true }).focus()
  await page.setViewportSize({ width: 1280, height: 900 })
  await expect(
    page
      .getByRole('navigation', { name: 'Primary', exact: true })
      .getByRole('link', { name: 'Work', exact: true }),
  ).toBeFocused()
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(mobile).toBeHidden()
  await expect(page.getByRole('button', { name: 'Menu', exact: true })).toBeFocused()
})

test('skip link and reduced-motion behavior remain available', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('main')).toBeFocused()
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  )
})

for (const width of [320, 360, 390, 480, 640, 768, 820, 1024, 1280, 1440, 1920]) {
  test(`shell has no horizontal overflow at ${width}px`, async ({ page }, testInfo) => {
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(errors).toEqual([])
    expect(await page.evaluate(() => document.fonts.check('600 16px "Manrope Variable"'))).toBe(
      true,
    )
    if ([390, 1440].includes(width)) {
      await page.screenshot({ path: testInfo.outputPath(`shell-${width}.png`), fullPage: true })
      await page.locator('#home').screenshot({ path: testInfo.outputPath(`hero-${width}.png`) })
      for (const id of ['experience', 'expertise', 'about', 'contact']) {
        await page.locator(`#${id}`).screenshot({
          path: testInfo.outputPath(`${id}-${width}.png`),
          style: 'header { visibility: hidden; }',
        })
      }
    }
    if (width < 1024) {
      await page.getByRole('button', { name: 'Menu', exact: true }).click()
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true)
    }
  })
}

test('hero actions reach work and contact with unobscured destinations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('link', { name: 'View selected work', exact: true }).click()
  await expect(page).toHaveURL(/#work$/)
  expect(
    await page.locator('#work').evaluate((section) => section.getBoundingClientRect().top),
  ).toBeGreaterThanOrEqual(64)
  await page.goto('/')
  await page.getByRole('link', { name: 'Get in touch', exact: true }).click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(
    page.getByRole('link', { name: 'pawanmaurya8931@gmail.com', exact: true }),
  ).toBeInViewport()
})

test('short landscape and 200% text enlargement retain content and navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 844, height: 390 })
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Menu', exact: true })).toBeVisible()
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%'
  })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
  await page
    .getByRole('link', { name: 'pawanmaurya8931@gmail.com', exact: true })
    .scrollIntoViewIfNeeded()
  await expect(
    page.getByRole('link', { name: 'pawanmaurya8931@gmail.com', exact: true }),
  ).toBeInViewport()
})
