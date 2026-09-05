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
      // Layout position, not painted position: a cell inside a 3D transformed plate is still
      // on the grid even though its projected rect is not.
      const layoutLeft = (el: HTMLElement) => {
        let x = 0
        let node: HTMLElement | null = el
        while (node) {
          x += node.offsetLeft
          node = node.offsetParent as HTMLElement | null
        }
        return Math.round(x * 10) / 10
      }
      const cells = Array.from(document.querySelectorAll<HTMLElement>('.cell'))
        .filter((el) => el.getBoundingClientRect().width > 0)
        .map(layoutLeft)
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

// Every band on a sheet opens on the left content line and closes on the right one, and no two
// neighbours draw a line each a gutter apart. The footer is the one deliberate exception: it is
// unboxed, with no side lines and no line above it.
const banded = [...routes, '/writing', '/lab', '/lab/field', '/nope']

for (const route of banded) {
  test(`${route}: every band closes on the grid`, async ({ page }) => {
    await page.goto(route)
    await page.evaluate(() => document.fonts.ready)
    const faults = await page.evaluate(() => {
      const out: string[] = []
      const shown = (el: Element, pseudo: string) => getComputedStyle(el, pseudo).display !== 'none'
      for (const sheet of document.querySelectorAll<HTMLElement>('.sheet')) {
        if (sheet.closest('footer')) continue
        const cells = Array.from(sheet.children).filter(
          (c): c is HTMLElement =>
            c.classList.contains('cell') && c.getBoundingClientRect().width > 0,
        )
        if (!cells.length) continue
        // The content lines come from the grid: a band holding one narrow cell is still judged
        // against the sheet's own edges.
        const cs = getComputedStyle(sheet)
        const tracks = cs.gridTemplateColumns
          .split(' ')
          .filter((t) => !t.startsWith('['))
          .map(parseFloat)
        const gap = parseFloat(cs.columnGap) || 0
        const box = sheet.getBoundingClientRect()
        const gutter = sheet.classList.contains('subsheet') ? 0 : tracks[0] + gap
        const left = Math.round(box.left + gutter)
        const right = Math.round(box.right - (gutter ? tracks[tracks.length - 1] + gap : 0))
        const rows = new Map<number, { el: HTMLElement; r: DOMRect }[]>()
        for (const el of cells) {
          const r = el.getBoundingClientRect()
          const key = Math.round(r.top)
          rows.set(key, [...(rows.get(key) ?? []), { el, r }])
        }
        const name = sheet.className.trim().replace(/\s+/g, '.') || 'sheet'
        for (const [top, list] of rows) {
          list.sort((a, b) => a.r.left - b.r.left)
          const first = list[0]
          const last = list[list.length - 1]
          if (
            Math.round(first.r.left) === left &&
            !(first.el.classList.contains('cell-l') && shown(first.el, '::before'))
          )
            out.push(`${name} row@${top} opens without a left line`)
          if (
            Math.round(last.r.right) === right &&
            !(last.el.classList.contains('cell-r') && shown(last.el, '::after'))
          )
            out.push(`${name} row@${top} ends without a right line`)
          for (let i = 0; i < list.length - 1; i++) {
            const a = list[i]
            const b = list[i + 1]
            if (
              a.el.classList.contains('cell-r') &&
              shown(a.el, '::after') &&
              b.el.classList.contains('cell-l') &&
              shown(b.el, '::before')
            )
              out.push(`${name} row@${top} draws two lines at ${Math.round(a.r.right)}`)
          }
        }
      }
      return out
    })
    expect(faults, faults.join('\n')).toEqual([])
  })
}
