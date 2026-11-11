import lighthouse from 'lighthouse'
import desktopConfig from 'lighthouse/core/config/desktop-config.js'
import { launch } from 'chrome-launcher'
import { mkdir, writeFile } from 'node:fs/promises'

const url = process.argv[2] || 'http://127.0.0.1:4173/'
const parsed = new URL(url)
if (!['127.0.0.1', 'localhost'].includes(parsed.hostname)) {
  throw new Error('This audit script only targets a local production preview.')
}
const directory = new URL('../audit-results.local/', import.meta.url)
await mkdir(directory, { recursive: true })
const results = []
for (const mode of ['mobile', 'desktop']) {
  const chrome = await launch({ chromeFlags: ['--headless', '--disable-gpu', '--no-first-run'] })
  try {
    const options = {
      port: chrome.port,
      output: ['html', 'json'],
      logLevel: 'error',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    }
    const result = await lighthouse(url, options, mode === 'desktop' ? desktopConfig : undefined)
    if (!result?.lhr || result.lhr.runtimeError)
      throw new Error(result?.lhr?.runtimeError?.message || 'Audit failed')
    const { lhr, report } = result
    await writeFile(new URL(`${mode}.html`, directory), report[0])
    await writeFile(new URL(`${mode}.json`, directory), report[1])
    const summary = {
      mode,
      fetchedAt: lhr.fetchTime,
      lighthouseVersion: lhr.lighthouseVersion,
      formFactor: lhr.configSettings.formFactor,
      throttlingMethod: lhr.configSettings.throttlingMethod,
      screenEmulation: lhr.configSettings.screenEmulation,
      scores: Object.fromEntries(
        Object.entries(lhr.categories).map(([name, category]) => [
          name,
          Math.round(category.score * 100),
        ]),
      ),
      metrics: Object.fromEntries(
        [
          'first-contentful-paint',
          'largest-contentful-paint',
          'total-blocking-time',
          'cumulative-layout-shift',
          'speed-index',
        ].map((name) => [
          name,
          { value: lhr.audits[name].numericValue, display: lhr.audits[name].displayValue },
        ]),
      ),
      findings: Object.values(lhr.audits)
        .filter(
          (audit) =>
            audit.score !== null &&
            audit.score < 1 &&
            !['notApplicable', 'manual', 'informative'].includes(audit.scoreDisplayMode),
        )
        .map((audit) => ({
          id: audit.id,
          title: audit.title,
          score: audit.score,
          display: audit.displayValue,
        })),
    }
    results.push(summary)
    console.log(JSON.stringify(summary))
  } finally {
    await chrome.kill()
  }
}
await writeFile(new URL('summary.json', directory), JSON.stringify(results, null, 2) + '\n')
