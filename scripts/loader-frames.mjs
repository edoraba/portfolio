// Captures the calibration loader frame by frame (needs hardware WebGL: run with a GPU).
// Usage: node scripts/loader-frames.mjs [baseURL] [outDir]
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { chromium } from '@playwright/test'

const [base = 'http://localhost:3000', out = 'loader-frames'] = process.argv.slice(2)
mkdirSync(out, { recursive: true })
const browser = await chromium.launch({
  headless: false,
  args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-position=-3000,0'],
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(base + '/about', { waitUntil: 'networkidle' })
const renderer = await page.evaluate(() => {
  const g = document.createElement('canvas').getContext('webgl2')
  const d = g && g.getExtension('WEBGL_debug_renderer_info')
  return d ? g.getParameter(d.UNMASKED_RENDERER_WEBGL) : String(!!g)
})
console.log('renderer:', renderer)
await page.evaluate(() => sessionStorage.removeItem('calibrated'))
const nav = page.goto(base + '/')
for (let i = 0; i < 30; i++) {
  await page.waitForTimeout(100)
  try {
    const on = await page.evaluate(
      () => document.querySelector('[data-loader]')?.getAttribute('data-loader') ?? '-',
    )
    console.log(`frame ${i}: loader ${on}`)
    await page.screenshot({ path: path.join(out, `frame-${String(i).padStart(2, '0')}.png`) })
  } catch {
    // navigation in flight
  }
}
await nav
console.log('calibrated:', await page.evaluate(() => sessionStorage.getItem('calibrated')))
await browser.close()
