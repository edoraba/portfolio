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
const browser = await chromium.launch()
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
    await page.waitForTimeout(1500)
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
    if (process.env.SCROLL) {
      await page.mouse.wheel(0, Number(process.env.SCROLL))
      await page.waitForTimeout(1200)
      await page.screenshot({ path: path.join(out, `${size.name}-${slug}-scrolled.png`) })
    }
    if (grid) await page.keyboard.press('g')
  }
  await ctx.close()
}
await browser.close()
console.log(`wrote screenshots to ${out}`)
