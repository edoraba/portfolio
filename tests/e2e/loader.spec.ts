import { expect, test } from '@playwright/test'

// Headless Chromium has no hardware WebGL, so the loader does not show there (the field cannot
// render). These tests pin the rules that hold everywhere: never under reduced motion, never twice
// in a session, and when it shows it is gone within two seconds.

test('the loader never shows under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.waitForTimeout(500)
  await expect(page.locator('[data-loader]')).toHaveCount(0)
})

test('the loader shows at most once per session and always exits', async ({ page }) => {
  await page.goto('/')
  const shown = (await page.locator('[data-loader]').count()) > 0
  if (shown) {
    await expect(page.locator('[data-loader]')).toHaveCount(0, { timeout: 2500 })
    expect(await page.evaluate(() => sessionStorage.getItem('calibrated'))).toBe('1')
  }
  await page.reload()
  await page.waitForTimeout(300)
  await expect(page.locator('[data-loader]')).toHaveCount(0)
})

test('a calibrated session renders the page directly', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('calibrated', '1'))
  await page.goto('/')
  await expect(page.locator('[data-loader]')).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Design, then build.')
})
