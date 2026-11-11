import { test, expect } from '@playwright/test'

test('showcase retains factual attribution, ongoing scope, and usable previews', async ({
  page,
}, testInfo) => {
  await page.goto('/')
  const work = page.getByRole('region', { name: 'Selected work', exact: true })
  await expect(work.locator('[data-professional-project]')).toHaveCount(3)
  await expect(work.locator('[data-personal-project]')).toHaveCount(8)
  const om = work.getByRole('article', { name: 'Om Sanskaram', exact: true })
  await expect(om.getByText(/five puja offerings/)).toBeVisible()
  await expect(om.getByText('In progress', { exact: true })).toBeVisible()
  const yashvi = work.getByRole('article', { name: 'Yashvi Infosys', exact: true })
  await expect(yashvi.getByText('Freelance client', { exact: true })).toBeVisible()
  await expect(yashvi.getByText('Company work', { exact: true })).toHaveCount(0)
  for (const image of await work.getByRole('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect
      .poll(() =>
        image.evaluate(
          (element) =>
            element.complete &&
            element.naturalWidth > 0 &&
            Math.abs(element.naturalWidth / element.naturalHeight - 1.6) < 0.01,
        ),
      )
      .toBe(true)
  }
  for (const link of await work.getByRole('link').all()) {
    await expect(link).toHaveAttribute('href', /^https:\/\//)
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    await link.focus()
    await expect(link).toBeFocused()
    expect(await link.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe(
      'none',
    )
  }
  await expect(work.getByRole('link', { name: /View source/ })).toHaveCount(0)
  await work.screenshot({
    path: testInfo.outputPath('work-desktop.png'),
    style: 'header { visibility: hidden; }',
  })
})

test('project text and previews work on touch without hover', async ({
  browser,
  baseURL,
}, testInfo) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  })
  const page = await context.newPage()
  await page.goto(`${baseURL}/#work`)
  const work = page.getByRole('region', { name: 'Selected work', exact: true })
  await expect(work.locator('[data-professional-project]')).toHaveCount(3)
  await expect(work.locator('[data-personal-project]')).toHaveCount(8)
  await expect(work.getByText('My contribution', { exact: true })).toHaveCount(3)
  for (const image of await work.getByRole('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect
      .poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0))
      .toBe(true)
  }
  await work.screenshot({
    path: testInfo.outputPath('work-mobile.png'),
    style: 'header { visibility: hidden; }',
  })
  const destination = work.getByRole('link', { name: /Visit client website/ })
  // Intercept locally: verify interaction without exercising or depending on a client website.
  await context.route('https://yashviinfosys.in/**', (route) =>
    route.fulfill({ status: 200, body: '<title>Client destination</title>' }),
  )
  const popupPromise = page.waitForEvent('popup')
  await destination.tap()
  const popup = await popupPromise
  await expect(popup).toHaveURL('https://yashviinfosys.in/')
  await context.close()
})
