// Loads routes in a GPU-enabled headed Chromium and prints every console error and page error
// in full, with hydration diffs. Usage: node scripts/console-check.mjs [baseURL] [route ...]
import { chromium } from '@playwright/test'

const [base = 'http://localhost:3000', ...routesArg] = process.argv.slice(2)
const routes = routesArg.length ? routesArg : ['/', '/about']
const browser = await chromium.launch({
  headless: false,
  args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-position=-3000,0'],
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${m.type()}] ${m.text()}`)
})
page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}\n${e.stack ?? ''}`))
for (const route of routes) {
  errors.length = 0
  await page.evaluate(() => sessionStorage.removeItem('calibrated')).catch(() => {})
  await page.goto(base + route, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2000)
  const html = await page.evaluate(() => ({
    cls: document.documentElement.className,
    theme: document.documentElement.dataset.theme,
    motion: document.documentElement.dataset.motion,
    loader: !!document.querySelector('[data-loader]'),
    canvas: !!document.querySelector('canvas.field-canvas'),
  }))
  console.log(`\n=== ${route}`, JSON.stringify(html))
  for (const e of errors) console.log(e.slice(0, 3000))
  if (errors.length === 0) console.log('no console errors')
}
await browser.close()
