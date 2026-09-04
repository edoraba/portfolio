import { expect, test } from '@playwright/test'

const routes = [
  '/',
  '/work',
  '/work/refattura',
  '/work/traceability',
  '/lab',
  '/lab/field',
  '/writing',
  '/about',
  '/now',
  '/colophon',
]

for (const route of routes) {
  test(`${route} renders with one h1 and no horizontal overflow`, async ({ page }) => {
    await page.goto(route)
    await expect(page.locator('h1')).toHaveCount(1)
    // Measure with the real fonts in place: fallback metrics differ on CI machines.
    await page.evaluate(() => document.fonts.ready)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )
    expect(overflow).toBe(false)
  })
}

test('404 is designed', async ({ page }) => {
  const res = await page.goto('/this-does-not-exist')
  expect(res?.status()).toBe(404)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nothing here.')
})

test('skip link is first in tab order and works', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#main$/)
})

test('theme toggle persists across reload', async ({ page }) => {
  await page.goto('/')
  const html = page.locator('html')
  const before = await html.getAttribute('data-theme')
  expect(before).toBe('signal')
  await page.getByRole('radio', { name: 'Paper' }).first().click()
  // The swatch applies the theme inside a view transition, so poll instead of reading at once.
  await expect(html).toHaveAttribute('data-theme', 'paper')
  await page.reload()
  await expect(html).toHaveAttribute('data-theme', 'paper')
})
