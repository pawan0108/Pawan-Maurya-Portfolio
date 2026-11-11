import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { loadEnv } from 'vite'
import { resolveBuildReleaseConfig } from '../config/release.js'

const directory = resolve(process.argv[2] || 'dist')
const metadata = JSON.parse(
  await readFile(new URL('../src/data/site.json', import.meta.url), 'utf8'),
)
const config = resolveBuildReleaseConfig(
  { ...loadEnv('production', process.cwd(), 'PORTFOLIO_'), VERCEL_ENV: process.env.VERCEL_ENV },
  'production',
  metadata,
)
const html = await readFile(join(directory, 'index.html'), 'utf8')
assert(!html.includes('__SITE_'), 'Unresolved metadata placeholder')
assert(
  html.indexOf('charset="UTF-8"') >= 0 && html.indexOf('charset="UTF-8"') < 1024,
  'Charset declaration must occur in the first 1024 bytes',
)
assert(html.includes(`content="${config.robots}"`), 'Incorrect indexing metadata')
for (const property of [
  'og:title',
  'og:description',
  'og:image',
  'og:image:width',
  'og:image:height',
])
  assert(html.includes(`property="${property}"`), `Missing ${property}`)
assert(html.includes('summary_large_image'), 'Missing sharing card metadata')
assert(
  config.publicUrl
    ? html.includes(`rel="canonical" href="${config.publicUrl}"`)
    : !html.includes('rel="canonical"'),
  'Incorrect canonical URL',
)
for (const match of html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+)"[^>]*>/g)) {
  const url = match[1]
  if (url.startsWith('https://')) continue
  assert(url.startsWith(config.base), `Asset outside configured base: ${url}`)
  const relative = url.slice(config.base.length)
  assert(!relative.includes('..'), 'Unexpected asset traversal')
  await access(join(directory, relative))
}
const robots = await readFile(join(directory, 'robots.txt'), 'utf8')
assert(
  robots.includes(config.indexable ? 'Allow: /' : 'Disallow: /'),
  'Incorrect crawler configuration',
)
if (config.indexable)
  assert(
    (await readFile(join(directory, 'sitemap.xml'), 'utf8')).includes(config.publicUrl),
    'Missing sitemap canonical',
  )
for (const [file, width, height] of [
  ['social-preview.png', 1200, 630],
  ['apple-touch-icon.png', 180, 180],
]) {
  const png = await readFile(join(directory, file))
  assert(
    png.readUInt32BE(16) === width && png.readUInt32BE(20) === height,
    `Incorrect ${file} dimensions`,
  )
}
await access(join(directory, 'licenses/manrope-OFL.txt'))
console.log(
  `Release assets valid: base ${config.base}, ${config.indexable ? 'indexable' : 'noindex'}, canonical ${config.publicUrl ? 'configured' : 'intentionally omitted'}.`,
)
