import { expect, test } from '@playwright/test'

test('the toolbox is a real list of tags taken from the content', async ({ page }) => {
  await page.goto('/')
  const tags = page.locator('.toolbox__tag')
  const count = await tags.count()
  expect(count).toBeGreaterThanOrEqual(14)
  expect(count).toBeLessThanOrEqual(30)
  await expect(page.getByLabel('Stack')).toBeVisible()
  await expect(tags.filter({ hasText: 'TypeScript' })).toHaveCount(1)
})

test('every tag stays inside the container once the physics runs', async ({ page, isMobile }) => {
  test.skip(isMobile, 'the pile is checked on the desktop layout')
  await page.goto('/')
  await page.locator('#toolbox').scrollIntoViewIfNeeded()
  await page.waitForTimeout(4500)
  const escaped = await page.evaluate(() => {
    const stage = document.querySelector('.toolbox')
    if (!stage) return ['no stage']
    const box = stage.getBoundingClientRect()
    return Array.from(document.querySelectorAll('.toolbox__tag'))
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter(
        ({ r }) => r.left < box.left - 2 || r.right > box.right + 2 || r.bottom > box.bottom + 2,
      )
      .map(({ el }) => el.textContent)
  })
  expect(escaped).toEqual([])
})

test('reduced motion keeps the tags in flow', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.locator('#toolbox').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500)
  await expect(page.locator('.toolbox__list')).not.toHaveAttribute('data-physics', /.*/)
  const transformed = await page.evaluate(
    () =>
      Array.from(document.querySelectorAll<HTMLElement>('.toolbox__tag')).filter(
        (el) => el.style.transform !== '',
      ).length,
  )
  expect(transformed).toBe(0)
})

test('the palette can shake the toolbox', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Control+k')
  await page.getByPlaceholder('Type a command or search').fill('shake')
  await expect(page.locator('[cmdk-list]').getByText('Shake the toolbox')).toBeVisible()
})
