import { describe, expect, it } from 'vitest'
import { flipDelays, sliceClipPaths } from '../../lib/motion/slice-flip'

describe('sliceClipPaths', () => {
  it('tiles the line box in n strips', () => {
    const clips = sliceClipPaths(4)
    expect(clips).toHaveLength(4)
    expect(clips[0]).toBe('inset(0% 0 74.5% 0)')
    expect(clips[3]).toBe('inset(75% 0 0% 0)')
  })
})

describe('flipDelays', () => {
  it('alternates direction and staggers by the step', () => {
    expect(flipDelays(4, 30)).toEqual([
      { delay: 0, dir: 1 },
      { delay: 30, dir: -1 },
      { delay: 60, dir: 1 },
      { delay: 90, dir: -1 },
    ])
  })
})
