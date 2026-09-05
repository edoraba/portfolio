// Audits every sheet row: does the band open on the left line, close on the right one, and
// does any pair of neighbours draw two lines a gutter apart?
import { chromium } from '@playwright/test'
const base = process.argv[2] ?? 'http://localhost:3000'
const routes = process.argv.slice(3)
const sizes = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 900, height: 1000 },
  { name: 'desktop', width: 1440, height: 900 },
]
const browser = await chromium.launch()
for (const size of sizes) {
  const page = await browser.newPage({ viewport: { width: size.width, height: size.height } })
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(900)
    const bad = await page.evaluate(() => {
      const out = []
      const vis = (el, pseudo) => getComputedStyle(el, pseudo).display !== 'none'
      // The footer is deliberately unboxed: no side lines, no top line.
      for (const sheet of document.querySelectorAll('.sheet')) {
        if (sheet.closest('footer')) continue
        const cells = [...sheet.children].filter(
          (c) => c.classList.contains('cell') && c.getBoundingClientRect().width > 0,
        )
        if (!cells.length) continue
        // The content lines come from the grid itself: a band holding one narrow cell still has
        // to be judged against the sheet's edges, not against that cell's own box.
        const cs = getComputedStyle(sheet)
        const tracks = cs.gridTemplateColumns
          .split(' ')
          .filter((t) => !t.startsWith('['))
          .map(parseFloat)
        const gap = parseFloat(cs.columnGap) || 0
        const box = sheet.getBoundingClientRect()
        const gutter = sheet.classList.contains('subsheet') ? 0 : 1
        const left = Math.round(box.left + (gutter ? tracks[0] + gap : 0))
        const right = Math.round(box.right - (gutter ? tracks[tracks.length - 1] + gap : 0))
        const rows = new Map()
        for (const c of cells) {
          const r = c.getBoundingClientRect()
          const key = Math.round(r.top)
          if (!rows.has(key)) rows.set(key, [])
          rows.get(key).push({ el: c, r })
        }
        const name = sheet.className.replace(/\s+/g, '.')
        for (const [top, list] of rows) {
          list.sort((a, b) => a.r.left - b.r.left)
          const first = list[0]
          const last = list[list.length - 1]
          const opens = first.el.classList.contains('cell-l') && vis(first.el, '::before')
          const closes = last.el.classList.contains('cell-r') && vis(last.el, '::after')
          if (Math.round(first.r.left) === left && !opens)
            out.push(`${name} row@${top}: left edge open`)
          if (Math.round(last.r.right) === right && !closes)
            out.push(
              `${name} row@${top}: right edge open [${last.el.className}] "${(last.el.textContent ?? '').trim().slice(0, 30)}"`,
            )
          for (let i = 0; i < list.length - 1; i++) {
            const a = list[i]
            const b = list[i + 1]
            const ar = a.el.classList.contains('cell-r') && vis(a.el, '::after')
            const bl = b.el.classList.contains('cell-l') && vis(b.el, '::before')
            if (ar && bl) out.push(`${name} row@${top}: double line at ${Math.round(a.r.right)}`)
          }
        }
      }
      return out
    })
    if (bad.length) console.log(`\n${size.name} ${route}\n  ` + bad.join('\n  '))
  }
  await page.close()
}
await browser.close()
console.log('\naudit done')
