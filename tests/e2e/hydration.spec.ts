import { expect, test } from '@playwright/test'

const routes = ['/', '/work', '/work/refattura', '/lab', '/about', '/colophon']

// A hydration mismatch makes React re-render the whole document and throws away the
// attributes the head script set (theme, js class). Guard it in every motion preference.
for (const reducedMotion of ['no-preference', 'reduce'] as const) {
  for (const route of routes) {
    test(`${route} hydrates cleanly with reduced motion ${reducedMotion}`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (e) => errors.push(e.message))
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text())
      })
      await page.emulateMedia({ reducedMotion })
      await page.goto(route)
      await page.waitForTimeout(1200)
      expect(errors, errors.join('\n')).toEqual([])
      await expect(page.locator('html')).toHaveAttribute(
        'data-theme',
        /^(signal|field|paper|phosphor|cobalt|ash)$/,
      )
      await expect(page.locator('html')).toHaveClass(/\bjs\b/)
      await expect(page.locator('html')).toHaveAttribute(
        'data-motion',
        reducedMotion === 'reduce' ? 'reduced' : 'full',
      )
    })
  }
}
