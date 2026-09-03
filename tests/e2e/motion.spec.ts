import { expect, test } from '@playwright/test'

test('command palette opens with Ctrl+K, closes with Escape and restores focus', async ({
  page,
}) => {
  await page.goto('/')
  await page.keyboard.press('Control+k')
  const input = page.getByPlaceholder('Type a command or search')
  await expect(input).toBeVisible()
  await expect(input).toBeFocused()
  await input.fill('grid')
  const list = page.locator('[cmdk-list]')
  await expect(list.getByText('Toggle grid')).toBeVisible()
  await expect(list.locator('[cmdk-item]')).toHaveCount(1)
  await page.keyboard.press('Escape')
  await expect(input).toHaveCount(0)
})

test('palette navigation goes to the page', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Control+k')
  await page.getByPlaceholder('Type a command or search').fill('colophon')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/colophon$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Colophon')
})

test('G toggles the grid overlay and persists', async ({ page }) => {
  await page.goto('/about')
  await expect(page.locator('.guides')).toHaveCount(0)
  await page.keyboard.press('g')
  await expect(page.locator('.guides')).toHaveCount(1)
  await page.reload()
  await expect(page.locator('.guides')).toHaveCount(1)
  await page.keyboard.press('g')
  await expect(page.locator('.guides')).toHaveCount(0)
})

test('theme control is a switch that flips the theme', async ({ page }) => {
  await page.goto('/')
  const sw = page.getByRole('switch', { name: 'Theme' })
  const before = await page.locator('html').getAttribute('data-theme')
  await sw.click()
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', before!)
  await expect(sw).toHaveAttribute('aria-checked', before === 'dark' ? 'true' : 'false')
})

test('work index to case study transition lands on the case', async ({ page }) => {
  await page.goto('/work')
  await page
    .getByRole('link', { name: /Refattura/ })
    .first()
    .click()
  await expect(page).toHaveURL(/\/work\/refattura$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Refattura')
  await page.getByRole('link', { name: 'Back to work' }).click()
  await expect(page).toHaveURL(/\/work$/)
})

test('reduced motion: no split lines, no smooth scroll, no field', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.waitForTimeout(1500)
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced')
  await expect(page.locator('.reveal .line')).toHaveCount(0)
  await expect(page.locator('html.lenis')).toHaveCount(0)
  await expect(page.locator('canvas.field-canvas')).toHaveCount(0)
})

test('motion toggle in the footer overrides the system', async ({ page }) => {
  await page.goto('/about')
  await page.getByRole('radio', { name: 'Reduced' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'reduced')
  await page.getByRole('radio', { name: 'System' }).click()
})
