import { describe, expect, it } from 'vitest'
import { decodeFrame } from '@/lib/motion/decode'
import { resolveReduced } from '@/lib/motion/store'

describe('resolveReduced', () => {
  it('site toggle wins over the OS', () => {
    expect(resolveReduced('reduced', false)).toBe(true)
    expect(resolveReduced('full', true)).toBe(false)
  })
  it('auto follows the OS', () => {
    expect(resolveReduced('auto', true)).toBe(true)
    expect(resolveReduced('auto', false)).toBe(false)
  })
})

describe('decodeFrame', () => {
  const final = 'TURIN 45.07'
  it('keeps spaces and the decoded prefix', () => {
    const f = decodeFrame(final, 6, 12, () => 0)
    expect(f.length).toBe(final.length)
    expect(f.startsWith(final.slice(0, 5))).toBe(true)
    expect(f[5]).toBe(' ')
  })
  it('resolves to the final string at the last step', () => {
    expect(decodeFrame(final, 12, 12)).toBe(final)
  })
  it('is fully scrambled at step 0 except spaces', () => {
    const f = decodeFrame(final, 0, 12, () => 0.5)
    expect(f).not.toBe(final)
    expect(f[5]).toBe(' ')
  })
})
