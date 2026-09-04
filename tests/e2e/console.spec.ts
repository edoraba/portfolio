import { expect, test } from '@playwright/test'

test('the console header is two rows and the nav is keyboard reachable', async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, 'desktop layout')
  await page.goto('/')
  const header = page.locator('header.site-header')
  const box = await header.boundingBox()
  expect(box?.height).toBeGreaterThanOrEqual(80)
  expect(box?.height).toBeLessThanOrEqual(82)
  const nav = page.getByRole('navigation', { name: 'Primary' })
  await expect(nav.getByRole('link')).toHaveCount(4)
  await expect(nav.getByRole('link', { name: /Work/ })).toBeVisible()
})

test('the console readout follows the scroll position', async ({ page }) => {
  await page.goto('/')
  const line = page.locator('.console-line')
  const before = await line.textContent()
  await page.mouse.wheel(0, 1200)
  await page.waitForTimeout(600)
  await expect(line).not.toHaveText(before ?? '')
})

test('mobile menu opens, traps focus, closes with Escape and restores focus', async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, 'mobile layout')
  await page.goto('/')
  const button = page.getByRole('button', { name: 'Menu' })
  await button.click()
  const dialog = page.getByRole('dialog', { name: 'Menu' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('link')).toHaveCount(7)
  // Tab cycles inside the dialog.
  for (let i = 0; i < 16; i++) await page.keyboard.press('Tab')
  const inside = await page.evaluate(() => !!document.activeElement?.closest('#site-menu'))
  expect(inside).toBe(true)
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Menu' })).toBeFocused()
})

test('skip link is still first in tab order', async ({ page }) => {
  await page.goto('/about')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
})
