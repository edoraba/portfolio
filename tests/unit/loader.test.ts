import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cellForProgress, createReadiness, shouldShowLoader } from '../../lib/loader'

describe('shouldShowLoader', () => {
  it('shows only with a renderable field, full motion and no prior calibration', () => {
    expect(shouldShowLoader({ canRender: true, reduced: false, calibrated: false })).toBe(true)
    expect(shouldShowLoader({ canRender: false, reduced: false, calibrated: false })).toBe(false)
    expect(shouldShowLoader({ canRender: true, reduced: true, calibrated: false })).toBe(false)
    expect(shouldShowLoader({ canRender: true, reduced: false, calibrated: true })).toBe(false)
  })
})

describe('createReadiness', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('resolves once every step is marked and min has elapsed', async () => {
    const r = createReadiness({ min: 600, max: 1200, cap: 1500, now: () => Date.now() })
    let done = false
    r.done.then(() => (done = true))
    r.mark('fonts')
    r.mark('shader')
    r.mark('content')
    r.mark('images')
    await vi.advanceTimersByTimeAsync(100)
    expect(done).toBe(false)
    expect(r.marked()).toContain('ready')
    await vi.advanceTimersByTimeAsync(600)
    expect(done).toBe(true)
  })

  it('resolves at max when only images are missing', async () => {
    const r = createReadiness({ min: 600, max: 1200, cap: 1500 })
    let done = false
    r.done.then(() => (done = true))
    r.mark('fonts')
    r.mark('shader')
    r.mark('content')
    await vi.advanceTimersByTimeAsync(1199)
    expect(done).toBe(false)
    await vi.advanceTimersByTimeAsync(2)
    expect(done).toBe(true)
  })

  it('resolves at cap no matter what', async () => {
    const r = createReadiness({ min: 600, max: 1200, cap: 1500 })
    let done = false
    r.done.then(() => (done = true))
    await vi.advanceTimersByTimeAsync(1499)
    expect(done).toBe(false)
    await vi.advanceTimersByTimeAsync(2)
    expect(done).toBe(true)
  })

  it('reports progress as a fraction of the steps', () => {
    const r = createReadiness()
    expect(r.progress()).toBe(0)
    r.mark('fonts')
    r.mark('shader')
    expect(r.progress()).toBe(0.4)
  })
})

describe('cellForProgress', () => {
  it('steps 8, 4, 2', () => {
    expect(cellForProgress(0)).toBe(8)
    expect(cellForProgress(0.4)).toBe(4)
    expect(cellForProgress(0.8)).toBe(2)
    expect(cellForProgress(1)).toBe(2)
  })
})
