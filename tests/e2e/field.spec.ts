import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('home headline is a real h1 for assistive tech', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Design, then build.')
})

test('the hero is either the live field or the static dither, never empty', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(2500)
  const canvasCount = await page.locator('canvas.field-canvas').count()
  const fill = await page.locator('.hero-svg text').first().getAttribute('fill')
  if (canvasCount === 1) {
    // Hardware WebGL: the canvas is masked to the headline and the text lets it through.
    await expect(page.locator('canvas.field-canvas')).toHaveCSS('mask-image', /hero-mask/)
    expect(fill).toBe('none')
  } else {
    // Software or missing WebGL (headless CI): the letters carry the static dither.
    expect(fill).toBe('url(#hero-dither)')
  }
})

test('reduced motion gets the static dither and no canvas', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.waitForTimeout(1500)
  await expect(page.locator('canvas.field-canvas')).toHaveCount(0)
  await expect(page.locator('.hero-svg text').first()).toHaveAttribute('fill', 'url(#hero-dither)')
})

test('pages without a hero never mount the field', async ({ page }) => {
  await page.goto('/work/refattura')
  await page.waitForTimeout(1500)
  await expect(page.locator('canvas.field-canvas')).toHaveCount(0)
})

test('home with the hero has no axe violations in both themes', async ({ page }) => {
  for (const theme of ['signal', 'field', 'paper']) {
    await page.addInitScript((t) => localStorage.setItem('theme', t), theme)
    await page.goto('/')
    await page.waitForTimeout(1000)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze()
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([])
  }
})

// A claim is what brings the canvas in, so nothing may gate claiming on the field already being
// enabled. That deadlock is invisible without hardware WebGL, but the request is not.
test('the hero asks for the field, and the footer asks for it again', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('html')).toHaveAttribute('data-field', 'requested')
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await page.waitForTimeout(1000)
  await expect(page.locator('html')).toHaveAttribute('data-field', 'requested')
})

test('a page with no field never asks for it', async ({ page }) => {
  await page.goto('/colophon')
  await page.waitForTimeout(800)
  await expect(page.locator('html')).toHaveAttribute('data-field', 'idle')
})
