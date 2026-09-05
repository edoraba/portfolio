import { expect, test } from '@playwright/test'
import { THEME_NAMES } from '../../lib/themes'

// The lit dither cell is drawn in field-on, which equals ink in five of the six themes, so a band
// over text makes the text the colour of the cells beneath it. The field must stay off the words.
for (const theme of THEME_NAMES) {
  test(`${theme}: the field never covers footer text`, async ({ page }) => {
    await page.addInitScript((t) => localStorage.setItem('theme', t), theme)
    await page.goto('/about')
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.waitForTimeout(1200)
    const overlaps = await page.evaluate(() => {
      const canvas = document.querySelector<HTMLCanvasElement>('canvas.field-canvas')
      // No canvas means the static fallback, which never paints behind the footer.
      if (!canvas || canvas.dataset.mode !== 'band' || !canvas.dataset.band) return []
      const [from, to] = canvas.dataset.band.split(',').map(Number)
      const h = window.innerHeight
      const bandTop = from * h
      const bandBottom = to * h
      return Array.from(
        document.querySelectorAll<HTMLElement>('.site-footer :is(p, a, dd, dt, li, button, time)'),
      )
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.width > 0 && r.height > 0 && r.bottom > bandTop && r.top < bandBottom)
        .map(({ el }) => (el.textContent ?? '').trim().slice(0, 40))
    })
    expect(overlaps).toEqual([])
  })
}
