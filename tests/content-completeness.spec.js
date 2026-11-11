import { test, expect } from '@playwright/test'

test('all supplied personal projects and education records remain visible', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('[data-personal-project]')).toHaveCount(8)
  for (const id of [
    'pitch-for-profit',
    'weather-app',
    'movie-library',
    'spotify-clone',
    'limejungle',
    'newsletter-1',
    'newsletter-2',
    'google-components',
  ]) {
    const project = page.locator(`[data-personal-project="${id}"]`)
    await expect(project).toBeVisible()
    await expect(project.getByRole('link')).toHaveCount(2)
  }
  await expect(page.locator('[data-education]')).toHaveCount(4)
  await expect(page.locator('[data-skill]')).toHaveCount(31)
  await expect(page.locator('[data-education="intermediate"]')).toContainText('Class 12')
  await expect(page.locator('[data-education="high-school"]')).toContainText('Class 10')
})
