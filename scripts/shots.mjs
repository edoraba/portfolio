// Visual review helper: screenshots of routes at desktop and mobile widths with the grid on.
// Usage: node scripts/shots.mjs [baseURL] [outDir] [route ...]
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { chromium } from '@playwright/test'

const [base = 'http://localhost:3000', out = 'shots', ...routesArg] = process.argv.slice(2)
const routes = routesArg.length ? routesArg : ['/', '/work', '/work/refattura', '/about']
const sizes = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844, mobile: true },
]
mkdirSync(out, { recursive: true })
// GPU=1 launches a headed browser with hardware WebGL so the field really renders.
const gpu = process.env.GPU === '1'
const browser = await chromium.launch(
  gpu
    ? {
        headless: false,
        args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-position=-3000,0'],
      }
    : {},
)
for (const size of sizes) {
  const ctx = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    isMobile: !!size.mobile,
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(gpu ? 2600 : 1500)
    const grid = process.env.GRID !== '0'
    if (grid) await page.keyboard.press('g')
    if (process.env.MENU === '1' && size.mobile) {
      await page.getByRole('button', { name: 'Menu' }).click()
      await page.waitForTimeout(600)
    }
    await page.waitForTimeout(300)
    const slug = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '')
    await page.screenshot({
      path: path.join(out, `${size.name}-${slug}.png`),
      fullPage: process.env.FULL === '1',
    })
    // SCROLLS=800,1600,2400 captures one frame per scroll position, for choreography review.
    const stops = (process.env.SCROLLS ?? process.env.SCROLL ?? '')
      .split(',')
      .map((s) => Number(s.trim()))
      .filter((n) => Number.isFinite(n) && n > 0)
    for (const stop of stops) {
      await page.evaluate((to) => window.scrollTo(0, to), stop)
      await page.waitForTimeout(1100)
      await page.screenshot({ path: path.join(out, `${size.name}-${slug}-${stop}.png`) })
    }
    if (stops.length) await page.evaluate(() => window.scrollTo(0, 0))
    if (grid) await page.keyboard.press('g')
  }
  await ctx.close()
}
await browser.close()
console.log(`wrote screenshots to ${out}`)
