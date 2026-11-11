import { execFileSync } from 'node:child_process'
import { preview } from 'vite'
import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'

// Reserved example.test is a build fixture, never a selected deployment destination.
for (const indexable of [false, true]) {
  const directory = `release-check.local/${indexable ? 'public-fixture' : 'preview'}`
  const environment = {
    ...process.env,
    PORTFOLIO_BASE_PATH: '/portfolio/',
    PORTFOLIO_PUBLIC_URL: indexable ? 'https://example.test/portfolio/' : '',
    PORTFOLIO_INDEXABLE: String(indexable),
  }
  execFileSync(
    process.execPath,
    ['node_modules/vite/bin/vite.js', 'build', '--outDir', directory],
    { env: environment, stdio: 'pipe' },
  )
  const validation = execFileSync(process.execPath, ['scripts/validate-release.mjs', directory], {
    env: environment,
    encoding: 'utf8',
  })
  console.log(validation.trim())
}
const server = await preview({
  base: '/portfolio/',
  build: { outDir: 'release-check.local/preview' },
  preview: { host: '127.0.0.1', port: 4174, strictPort: true, open: false },
})
const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
  })
  const failures = []
  page.on('pageerror', (error) => failures.push(error.message))
  page.on('response', (response) => {
    if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`)
  })
  await page.goto('http://127.0.0.1:4174/portfolio/#contact', { waitUntil: 'networkidle' })
  await page.getByRole('link', { name: 'Email Pawan', exact: true }).waitFor({ state: 'visible' })
  for (const image of await page.locator('#work img').all()) {
    await image.scrollIntoViewIfNeeded()
    await image.evaluate((element) => element.decode())
  }
  assert(failures.length === 0, failures.join('\n'))
  assert(
    await page.evaluate(() => document.fonts.check('600 16px "Manrope Variable"')),
    'Subpath font missing',
  )
  console.log('Subpath direct URL, scripts, styles, images, font, and anchor smoke check passed.')
} finally {
  await browser.close()
  await new Promise((resolve, reject) =>
    server.httpServer.close((error) => (error ? reject(error) : resolve())),
  )
}
