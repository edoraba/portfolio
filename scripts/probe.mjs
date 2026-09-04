// Scrolls to a position and prints computed facts about selected elements, for debugging
// scroll choreography. Usage: node scripts/probe.mjs <url> <scrollY> <selector> [selector ...]
import { chromium } from '@playwright/test'

const [url, y = '0', ...selectors] = process.argv.slice(2)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(1200)
await page.evaluate((to) => window.scrollTo(0, Number(to)), y)
await page.waitForTimeout(1200)
const out = await page.evaluate((sels) => {
  const info = (el) => {
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return {
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      opacity: cs.opacity,
      transform: cs.transform.slice(0, 60),
      display: cs.display,
      vars: ['--letters-x', '--letters-o', '--cover-in', '--box-tilt', '--band-scale']
        .map((v) => [v, el.style.getPropertyValue(v)])
        .filter(([, val]) => val)
        .map(([v, val]) => `${v}=${val}`)
        .join(' '),
    }
  }
  return sels.map((sel) => {
    const els = Array.from(document.querySelectorAll(sel)).slice(0, 4)
    return { sel, count: document.querySelectorAll(sel).length, els: els.map(info) }
  })
}, selectors)
console.log(JSON.stringify({ scrollY: await page.evaluate(() => window.scrollY), out }, null, 1))
await browser.close()
