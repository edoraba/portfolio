// Measures frame intervals while scrolling a range, so a choreography can be judged by numbers
// instead of by eye. Usage: node scripts/frames.mjs <url> <fromY> <toY> [ms]
// Needs hardware WebGL to say anything about the field, so it runs headed with ANGLE.
import { chromium } from '@playwright/test'

const [url, from = '0', to = '900', ms = '2500'] = process.argv.slice(2)
const browser = await chromium.launch({
  headless: false,
  args: ['--use-angle=d3d11', '--ignore-gpu-blocklist', '--window-position=-3000,0'],
})
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(2500)

const result = await page.evaluate(
  async ([fromY, toY, duration]) => {
    const deltas = []
    let last = performance.now()
    let raf = 0
    const tick = () => {
      const now = performance.now()
      deltas.push(now - last)
      last = now
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const start = performance.now()
    await new Promise((resolve) => {
      const step = () => {
        const t = Math.min(1, (performance.now() - start) / duration)
        window.scrollTo(0, fromY + (toY - fromY) * t)
        if (t < 1) requestAnimationFrame(step)
        else resolve()
      }
      requestAnimationFrame(step)
    })
    cancelAnimationFrame(raf)
    const sorted = deltas.slice(2).sort((a, b) => a - b)
    const at = (q) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * q))]
    const canvas = document.querySelector('canvas.field-canvas')
    return {
      frames: sorted.length,
      p50: +at(0.5).toFixed(1),
      p75: +at(0.75).toFixed(1),
      p95: +at(0.95).toFixed(1),
      worst: +sorted[sorted.length - 1].toFixed(1),
      canvas: canvas ? `${canvas.width}x${canvas.height}` : 'none',
      mode: canvas?.dataset.mode ?? '',
    }
  },
  [Number(from), Number(to), Number(ms)],
)
console.log(JSON.stringify(result))
await browser.close()
