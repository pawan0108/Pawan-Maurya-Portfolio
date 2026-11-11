import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

// Read-only public-page captures. Inspect candidates before promoting them into src/assets.
const targets = [
  ['om-sanskaram', 'http://omsanskaram.com/'],
  ['codetrex-redesign', 'https://codetrex.in/'],
  ['yashvi-infosys', 'https://yashviinfosys.in/'],
]
const output = new URL('../preview-captures.local/', import.meta.url)
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const report = []
try {
  for (const [id, url] of targets.filter(
    ([id]) => process.argv.length === 2 || process.argv.slice(2).includes(id),
  )) {
    const page = await browser.newPage({
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1,
    })
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 })
      if (!response?.ok()) throw new Error(`HTTP ${response?.status() ?? 'no response'}`)
      await page.locator('h1').first().waitFor({ state: 'visible', timeout: 12000 })
      await page.evaluate(() => document.fonts.ready)
      await page.waitForFunction(
        () => {
          const heading = document.querySelector('h1')
          if (!heading) return false
          let opacity = 1
          for (let element = heading; element; element = element.parentElement) {
            opacity *= Number(getComputedStyle(element).opacity)
          }
          const bounds = heading.getBoundingClientRect()
          return opacity > 0.98 && bounds.top >= 0 && bounds.top < window.innerHeight
        },
        null,
        { timeout: 15000 },
      )
      await page.screenshot({
        path: fileURLToPath(new URL(`${id}.jpg`, output)),
        type: 'jpeg',
        quality: 80,
        animations: 'disabled',
        timeout: 15000,
      })
      report.push({
        id,
        requestedUrl: url,
        finalUrl: page.url(),
        status: response.status(),
        title: await page.title(),
        captured: true,
      })
    } catch (error) {
      report.push({ id, requestedUrl: url, captured: false, error: error.message })
    } finally {
      await page.close()
    }
  }
} finally {
  await browser.close()
}
await writeFile(new URL('report.json', output), JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify(report, null, 2))
