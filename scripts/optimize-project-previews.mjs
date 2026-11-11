import { chromium } from '@playwright/test'
import { readFile, writeFile } from 'node:fs/promises'

// Encodes existing public captures without modifying their content or making remote requests.
const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage()
  for (const id of ['om-sanskaram', 'codetrex-redesign', 'yashvi-infosys']) {
    const original = await readFile(new URL(`../preview-captures.local/${id}.jpg`, import.meta.url))
    for (const width of [640, 800, 1280]) {
      const encoded = await page.evaluate(
        async ({ base64, width }) => {
          const image = new Image()
          image.src = `data:image/jpeg;base64,${base64}`
          await image.decode()
          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = (width * image.height) / image.width
          canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height)
          return canvas.toDataURL('image/webp', 0.82).split(',')[1]
        },
        { base64: original.toString('base64'), width },
      )
      const bytes = Buffer.from(encoded, 'base64')
      await writeFile(
        new URL(`../src/assets/images/projects/${id}-${width}.webp`, import.meta.url),
        bytes,
      )
      console.log(`${id}-${width}.webp: ${bytes.length} bytes`)
    }
  }
} finally {
  await browser.close()
}
