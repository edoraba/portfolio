import { expect, test } from '@playwright/test'

test('T cycles the theme in registry order and it persists', async ({ page }) => {
  await page.goto('/about')
  const html = page.locator('html')
  await expect(html).toHaveAttribute('data-theme', 'signal')
  await page.keyboard.press('t')
  await expect(html).toHaveAttribute('data-theme', 'field')
  await page.keyboard.press('t')
  await expect(html).toHaveAttribute('data-theme', 'paper')
  await page.reload()
  await expect(html).toHaveAttribute('data-theme', 'paper')
})

test('legacy stored values map to the new names', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'field')
})

test('an unknown stored value falls back to signal', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'neon'))
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'signal')
})

test('the palette lists every theme', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Control+k')
  await page.getByPlaceholder('Type a command or search').fill('theme')
  const list = page.locator('[cmdk-list]')
  await expect(list.locator('[cmdk-item]')).toHaveCount(6)
  await list.getByText('Theme: Phosphor').click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'phosphor')
})
