import { expect, test } from '@playwright/test'

const routes = ['/', '/work', '/work/refattura', '/about']

// The G overlay is a `.sheet` like every section, so each cell's left hairline must sit on
// an overlay column line. This is the acceptance test of spec section 2.
for (const route of routes) {
  test(`${route}: every cell left edge lies on an overlay column line`, async ({ page }) => {
    await page.goto(route)
    await page.evaluate(() => document.fonts.ready)
    await page.keyboard.press('g')
    await expect(page.locator('.guides')).toHaveCount(1)
    const { cols, cells } = await page.evaluate(() => {
      const cols = Array.from(document.querySelectorAll('.guides__col'))
        .filter((el) => getComputedStyle(el).display !== 'none')
        .map((el) => Math.round(el.getBoundingClientRect().left * 10) / 10)
      const cells = Array.from(document.querySelectorAll('.cell'))
        .filter((el) => el.getBoundingClientRect().width > 0)
        .map((el) => Math.round(el.getBoundingClientRect().left * 10) / 10)
      return { cols, cells }
    })
    expect(cols.length).toBeGreaterThanOrEqual(4)
    expect(cells.length).toBeGreaterThan(3)
    const off = cells.filter((x) => !cols.some((c) => Math.abs(c - x) <= 1))
    expect(
      off,
      `cells off the grid at x = ${off.join(', ')} (columns at ${cols.join(', ')})`,
    ).toEqual([])
    await page.keyboard.press('g')
  })
}

test('no element uses the retired container utilities', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.site-container, .page-x')).toHaveCount(0)
})
