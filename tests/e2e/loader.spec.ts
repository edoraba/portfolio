import { expect, test } from '@playwright/test'

// Headless Chromium has no hardware WebGL, so the loader does not show there (the field cannot
// render). These tests pin the rules that hold everywhere: never under reduced motion, always
// gone quickly, and never a barrier when there is nothing to wait for.

test('the loader never shows under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.waitForTimeout(500)
  await expect(page.locator('[data-loader]')).toHaveCount(0)
})

test('the loader always lets the page through', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('[data-loader]')).toHaveCount(0, { timeout: 2500 })
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Design, then build.')
})

test('it runs on every visit, not once per session', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(2000)
  // Whatever it does, it must not remember having run: the field mounts on every load and the
  // entrance is what hides it arriving.
  const remembered = await page.evaluate(() => sessionStorage.getItem('calibrated'))
  expect(remembered).toBeNull()
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Design, then build.')
})
