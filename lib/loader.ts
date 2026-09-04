/**
 * The calibration loader's logic, framework free. Readiness is real: the steps are marked as
 * fonts, the shader, the content and the above-the-fold images become ready. `done` resolves
 * when every step is marked and at least `min` ms have passed, when everything but images is
 * ready at `max`, or at `cap` no matter what, so a stuck resource never blocks the page.
 */
export const LOADER_STEPS = ['fonts', 'shader', 'content', 'images', 'ready'] as const
export type LoaderStep = (typeof LOADER_STEPS)[number]

export const LOADER_MIN_MS = 600
export const LOADER_MAX_MS = 1200
export const LOADER_CAP_MS = 1500

export function shouldShowLoader(input: {
  canRender: boolean
  reduced: boolean
  calibrated: boolean
}): boolean {
  return input.canRender && !input.reduced && !input.calibrated
}

export type Readiness = {
  mark: (step: LoaderStep) => void
  marked: () => LoaderStep[]
  progress: () => number
  done: Promise<void>
}

type Options = { min?: number; max?: number; cap?: number; now?: () => number }

export function createReadiness(opts: Options = {}): Readiness {
  const min = opts.min ?? LOADER_MIN_MS
  const max = opts.max ?? LOADER_MAX_MS
  const cap = opts.cap ?? LOADER_CAP_MS
  const now = opts.now ?? (() => Date.now())
  const start = now()
  const done = new Set<LoaderStep>()
  let resolve!: () => void
  let settled = false
  const promise = new Promise<void>((r) => {
    resolve = r
  })
  const timers: ReturnType<typeof setTimeout>[] = []
  const finish = () => {
    if (settled) return
    settled = true
    timers.forEach(clearTimeout)
    resolve()
  }
  const allButImages = () =>
    LOADER_STEPS.filter((s) => s !== 'images' && s !== 'ready').every((s) => done.has(s))
  const check = () => {
    if (settled) return
    const elapsed = now() - start
    const all = LOADER_STEPS.filter((s) => s !== 'ready').every((s) => done.has(s))
    if (all) {
      done.add('ready')
      if (elapsed >= min) finish()
      else timers.push(setTimeout(finish, min - elapsed))
    }
  }
  timers.push(
    setTimeout(() => {
      if (allButImages()) finish()
    }, max),
  )
  timers.push(setTimeout(finish, cap))
  return {
    mark: (step) => {
      if (settled || step === 'ready') return
      done.add(step)
      check()
    },
    marked: () => LOADER_STEPS.filter((s) => done.has(s)),
    progress: () => done.size / LOADER_STEPS.length,
    done: promise,
  }
}

/** Dither cell for a given progress: coarse at the start, fine at the end. */
export function cellForProgress(progress: number): 8 | 4 | 2 {
  if (progress < 0.4) return 8
  if (progress < 0.8) return 4
  return 2
}
