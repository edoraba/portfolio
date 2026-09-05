import { expect, test } from '@playwright/test'

/** Scrolls the whole page in steps so every scrubbed trigger runs, then settles at the bottom. */
async function scrollThrough(page: import('@playwright/test').Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 500) {
    await page.evaluate((to) => window.scrollTo(0, to), y)
    await page.waitForTimeout(90)
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await page.waitForTimeout(1200)
}

test('the home has all seven plates in order', async ({ page }) => {
  await page.goto('/')
  const ids = await page.evaluate(() =>
    Array.from(document.querySelectorAll('section.plate')).map((el) => el.id),
  )
  expect(ids).toEqual(['hero', 'about', 'work', 'notes', 'toolbox', 'since', 'contact'])
})

test('pinned plates reach their end state after scrolling through', async ({ page, isMobile }) => {
  test.skip(isMobile, 'no pins below 1024px')
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await scrollThrough(page)
  await expect(page.locator('#work')).toHaveAttribute('data-state', 'done')
  await expect(page.locator('#since')).toHaveAttribute('data-state', 'done')
  // The mark of P/02 draws itself in bar by bar; by the end every bar is at full size.
  await expect
    .poll(() =>
      page.evaluate(() => {
        const bars = document.querySelectorAll('.about-mark__svg rect')
        const last = bars[bars.length - 1]
        return last ? Number(last.getAttribute('width')) : -1
      }),
    )
    .toBeGreaterThan(170)
})

test('nothing is pinned below the pin breakpoint', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile layout')
  await page.goto('/')
  await scrollThrough(page)
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
})

test('reduced motion pins nothing and still shows every cover', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await scrollThrough(page)
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  const hidden = await page.evaluate(
    () =>
      Array.from(document.querySelectorAll('.cover')).filter(
        (el) => getComputedStyle(el).opacity !== '1',
      ).length,
  )
  expect(hidden).toBe(0)
})

test('the console readout names the plate being read', async ({ page, isMobile }) => {
  test.skip(isMobile, 'the readout is the same, the plate order differs with no pins')
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  // Wait for the pins: they change the document height, so scrolling before they exist lands
  // somewhere else entirely.
  await expect(page.locator('.pin-spacer').first()).toBeAttached()
  await page.waitForTimeout(600)
  await page.evaluate(() => document.querySelector('#work')?.scrollIntoView({ block: 'center' }))
  await page.waitForTimeout(900)
  await expect(page.locator('.console-line')).toContainText('P/03 WORK')
})

test('the timecode is keyboard operable and moves the reader', async ({ page, isMobile }) => {
  test.skip(isMobile, 'the timecode leads the pinned stage on desktop')
  await page.goto('/')
  const pins = page.locator('.timecode__pin')
  await expect(pins).toHaveCount(5)
  await expect(pins.first()).toHaveAttribute('aria-label', /Go to /)
  const before = await page.evaluate(() => window.scrollY)
  await page.getByRole('button', { name: 'Next' }).click()
  await page.waitForTimeout(1200)
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(before)
})

test('no horizontal overflow anywhere down the page', async ({ page }) => {
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (const y of [0, height * 0.25, height * 0.5, height * 0.75, height]) {
    await page.evaluate((to) => window.scrollTo(0, to), y)
    await page.waitForTimeout(400)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(overflow, `overflow at ${Math.round(y)}`).toBe(false)
  }
})

test('decoration cannot be selected, words can', async ({ page }) => {
  await page.goto('/')
  const none = [
    '.hero-svg',
    '.porthole__letters',
    '.toolbox__tag',
    '.monogram',
    '.cloth__grid',
    '.console-line',
  ]
  for (const sel of none) {
    const value = await page
      .locator(sel)
      .first()
      .evaluate((el) => getComputedStyle(el).userSelect)
    expect(value, sel).toBe('none')
  }
  const selectable = ['h1.sr-only', '.cover__title', '.site-footer p']
  for (const sel of selectable) {
    const value = await page
      .locator(sel)
      .first()
      .evaluate((el) => getComputedStyle(el).userSelect)
    expect(value, sel).not.toBe('none')
  }
})
