import { URL } from 'node:url'

/** Public build settings only; no credentials are read or exposed to the client. */
export function resolveReleaseConfig(environment = {}) {
  const rawBase = environment.PORTFOLIO_BASE_PATH || '/'
  if (!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(rawBase)) {
    throw new Error('PORTFOLIO_BASE_PATH must be / or a slash-delimited path such as /portfolio/.')
  }
  const indexSetting = environment.PORTFOLIO_INDEXABLE || 'false'
  if (!['true', 'false'].includes(indexSetting))
    throw new Error('PORTFOLIO_INDEXABLE must be true or false.')
  const indexable = indexSetting === 'true'
  const rawUrl = environment.PORTFOLIO_PUBLIC_URL?.trim()
  let publicUrl = null
  if (rawUrl) {
    const parsed = new URL(rawUrl)
    if (
      parsed.protocol !== 'https:' ||
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash
    ) {
      throw new Error(
        'PORTFOLIO_PUBLIC_URL must be an HTTPS URL without credentials, query, or fragment.',
      )
    }
    if (!parsed.pathname.endsWith('/')) parsed.pathname += '/'
    if (parsed.pathname !== rawBase)
      throw new Error('Public URL pathname must match PORTFOLIO_BASE_PATH.')
    publicUrl = parsed.href
  }
  if (indexable && !publicUrl)
    throw new Error('Indexing requires a confirmed PORTFOLIO_PUBLIC_URL.')
  return {
    base: rawBase,
    publicUrl,
    indexable,
    robots: indexable ? 'index, follow' : 'noindex, nofollow',
    sharingImage: publicUrl
      ? new URL('social-preview.png', publicUrl).href
      : `${rawBase}social-preview.png`,
  }
}

export function resolveBuildReleaseConfig(environment, mode, metadata) {
  return resolveReleaseConfig({
    PORTFOLIO_BASE_PATH: '/',
    PORTFOLIO_PUBLIC_URL: metadata.publicUrl,
    PORTFOLIO_INDEXABLE: 'true',
    ...environment,
    ...(mode !== 'production' || environment.VERCEL_ENV === 'preview'
      ? { PORTFOLIO_INDEXABLE: 'false' }
      : {}),
  })
}
