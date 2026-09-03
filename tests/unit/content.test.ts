import { describe, expect, it } from 'vitest'
import { allLabs, allPages, allWorks, allWritings } from 'content-collections'

describe('content collections', () => {
  it('has exactly five featured case studies in order 1 to 5', () => {
    const featured = allWorks.filter((w) => w.featured).sort((a, b) => a.order - b.order)
    expect(featured.map((w) => w.order)).toEqual([1, 2, 3, 4, 5])
    expect(featured.map((w) => w.slug)).toEqual([
      'refattura',
      'traceability',
      'html-to-figma',
      'redergo-sales',
      'envergo',
    ])
  })
  it('every work has an outcome-led title and a role', () => {
    for (const w of allWorks) {
      expect(w.title.length).toBeGreaterThan(10)
      expect(w.role.length).toBeGreaterThan(3)
    }
  })
  it('pages exist for about, now and colophon', () => {
    expect(allPages.map((p) => p.slug).sort()).toEqual(['about', 'colophon', 'now'])
  })
  it('writing drafts are flagged', () => {
    expect(allWritings.every((w) => typeof w.draft === 'boolean')).toBe(true)
  })
  it('lab entries have a registry key', () => {
    expect(allLabs.every((l) => l.component.length > 0)).toBe(true)
  })
})
