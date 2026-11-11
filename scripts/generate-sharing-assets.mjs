import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const metadata = JSON.parse(
  await readFile(new URL('../src/data/site.json', import.meta.url), 'utf8'),
)
const font = await readFile(
  new URL(
    '../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
    import.meta.url,
  ),
)
const icon = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8')
const escape = (text) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })
  await page.setContent(
    `<style>@font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font.toString('base64')})}*{box-sizing:border-box}body{margin:0;background:#101216;color:#f3f5f7;font-family:Manrope,sans-serif}main{width:1200px;height:630px;padding:64px 72px;background:radial-gradient(ellipse at right top,#2563eb30,transparent 65%)}header{display:flex;justify-content:space-between;border-bottom:1px solid #303846;padding-bottom:28px;font-size:20px}small{color:#72a7ff;font-size:15px;letter-spacing:2px}h1{font-size:82px;line-height:1.12;letter-spacing:-4px;max-width:900px;margin:64px 0 30px;font-weight:650}p{color:#aeb7c6;font-size:23px;margin:0}footer{margin-top:42px;font-size:15px;color:#919cac}.dot{color:#72a7ff}</style><main><header><strong>pawan<span class="dot">.</span></strong><small>PAWAN MAURYA / PORTFOLIO</small></header><h1>${escape(metadata.sharingTitle)}</h1><p>${escape(metadata.sharingSubtitle)}</p><footer>Professional projects & independent client work</footer></main>`,
  )
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({
    path: fileURLToPath(new URL('../public/social-preview.png', import.meta.url)),
    type: 'png',
  })
  await page.setViewportSize({ width: 180, height: 180 })
  await page.setContent(
    `<style>body{margin:0}svg{width:180px;height:180px;display:block}</style>${icon}`,
  )
  await page.screenshot({
    path: fileURLToPath(new URL('../public/apple-touch-icon.png', import.meta.url)),
    type: 'png',
  })
  console.log('Generated local 1200×630 social preview and 180×180 touch icon.')
} finally {
  await browser.close()
}
