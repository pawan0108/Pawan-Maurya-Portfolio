import { test } from 'node:test'
import assert from 'node:assert/strict'
import { resolveReleaseConfig, resolveBuildReleaseConfig } from '../../config/release.js'

test('unconfigured local preview is noindex without guessed canonical URL', () => {
  const config = resolveReleaseConfig()
  assert.equal(config.publicUrl, null)
  assert.equal(config.robots, 'noindex, nofollow')
  assert.equal(config.sharingImage, '/social-preview.png')
})
test('indexing cannot be enabled without an actual public URL', () => {
  assert.throws(() => resolveReleaseConfig({ PORTFOLIO_INDEXABLE: 'true' }))
})
test('root and subpath URLs produce matching canonical and absolute sharing assets', () => {
  const config = resolveReleaseConfig({
    PORTFOLIO_PUBLIC_URL: 'https://example.com/portfolio',
    PORTFOLIO_BASE_PATH: '/portfolio/',
    PORTFOLIO_INDEXABLE: 'true',
  })
  assert.equal(config.publicUrl, 'https://example.com/portfolio/')
  assert.equal(config.sharingImage, 'https://example.com/portfolio/social-preview.png')
  assert.equal(config.indexable, true)
})
test('mismatched paths and malformed public configuration fail early', () => {
  for (const environment of [
    { PORTFOLIO_BASE_PATH: 'portfolio' },
    { PORTFOLIO_PUBLIC_URL: 'https://example.com/wrong/' },
    { PORTFOLIO_PUBLIC_URL: 'http://example.com/' },
    { PORTFOLIO_PUBLIC_URL: 'https://user:password@example.com/' },
    { PORTFOLIO_PUBLIC_URL: 'https://example.com/?test=1' },
    { PORTFOLIO_INDEXABLE: 'yes' },
  ])
    assert.throws(() => resolveReleaseConfig(environment))
})

test('production uses selected public URL while development and Vercel previews stay noindex', () => {
  const site = { publicUrl: 'https://example.test/' }
  assert.equal(resolveBuildReleaseConfig({}, 'production', site).publicUrl, site.publicUrl)
  assert.equal(resolveBuildReleaseConfig({}, 'production', site).indexable, true)
  assert.equal(resolveBuildReleaseConfig({}, 'development', site).indexable, false)
  assert.equal(
    resolveBuildReleaseConfig({ VERCEL_ENV: 'preview' }, 'production', site).indexable,
    false,
  )
  assert.equal(
    resolveBuildReleaseConfig({ PORTFOLIO_INDEXABLE: 'false' }, 'production', site).indexable,
    false,
  )
})
