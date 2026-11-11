import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [390, 1440]) {
  test(`WCAG automated audit at ${width}px including navigation state`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const audit = async (state) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze()
      await testInfo.attach(`axe-${state}-${width}`, {
        body: JSON.stringify(results, null, 2),
        contentType: 'application/json',
      })
      expect(results.violations).toEqual([])
    }
    await audit('page')
    if (width < 1024) {
      await page.getByRole('button', { name: 'Menu', exact: true }).click()
      await audit('menu-open')
    }
  })
}

test('large text, forced colours, and keyboard focus retain usable navigation', async ({
  page,
}) => {
  await page.setViewportSize({ width: 640, height: 480 })
  await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' })
  await page.goto('/')
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '200%'
  })
  const menu = page.getByRole('button', { name: 'Menu', exact: true })
  await menu.focus()
  await page.keyboard.press('Enter')
  await page.keyboard.press('Tab')
  const work = page
    .getByRole('navigation', { name: 'Mobile', exact: true })
    .getByRole('link', { name: 'Work', exact: true })
  await expect(work).toBeFocused()
  expect(await work.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe('none')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  )
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
})
