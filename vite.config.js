import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'
import { resolveBuildReleaseConfig } from './config/release.js'

const metadata = JSON.parse(readFileSync(new URL('./src/data/site.json', import.meta.url), 'utf8'))
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

export default defineConfig(({ mode }) => {
  const release = resolveBuildReleaseConfig(
    { ...loadEnv(mode, process.cwd(), 'PORTFOLIO_'), VERCEL_ENV: process.env.VERCEL_ENV },
    mode,
    metadata,
  )
  return {
    base: release.base,
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'portfolio-release-metadata',
        transformIndexHtml(html) {
          const tags = [
            { tag: 'meta', attrs: { name: 'robots', content: release.robots } },
            { tag: 'meta', attrs: { name: 'theme-color', content: metadata.themeColor } },
            { tag: 'meta', attrs: { name: 'author', content: 'Pawan Maurya' } },
            ...Object.entries({
              'og:type': 'website',
              'og:locale': 'en_IN',
              'og:title': metadata.title,
              'og:description': metadata.description,
              'og:image': release.sharingImage,
              'og:image:width': '1200',
              'og:image:height': '630',
              'og:image:alt': 'Pawan Maurya — Full Stack Developer. From interface to application.',
            }).map(([property, content]) => ({ tag: 'meta', attrs: { property, content } })),
            ...Object.entries({
              'twitter:card': 'summary_large_image',
              'twitter:title': metadata.title,
              'twitter:description': metadata.description,
              'twitter:image': release.sharingImage,
              'twitter:image:alt': 'Pawan Maurya — Full Stack Developer',
            }).map(([name, content]) => ({ tag: 'meta', attrs: { name, content } })),
          ]
          if (release.publicUrl)
            tags.push(
              { tag: 'link', attrs: { rel: 'canonical', href: release.publicUrl } },
              { tag: 'meta', attrs: { property: 'og:url', content: release.publicUrl } },
            )
          return {
            html: html
              .replaceAll('__SITE_TITLE__', escape(metadata.title))
              .replaceAll('__SITE_DESCRIPTION__', escape(metadata.description)),
            tags: tags.map((tag) => ({ ...tag, injectTo: 'head' })),
          }
        },
        generateBundle() {
          const robots = release.indexable
            ? `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', release.publicUrl).href}\n`
            : 'User-agent: *\nDisallow: /\n'
          this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
          if (release.indexable)
            this.emitFile({
              type: 'asset',
              fileName: 'sitemap.xml',
              source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(release.publicUrl)}</loc></url></urlset>\n`,
            })
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
