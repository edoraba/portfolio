import type { FieldMode } from './store'

/**
 * The field is one surface, so exactly one component owns it at a time. Components do not switch
 * it on and off: they file a claim while they are on screen and drop it when they leave, and the
 * store hands the field to the highest priority claim. Nobody can leave it in a state it does
 * not own, which is what used to strand the band on screen for the rest of the page.
 */
export type Claim = {
  mode: Exclude<FieldMode, 'off'>
  /** 0 to 1. */
  intensity: number
  /** Band range from the top of the viewport, 0 to 1. Band mode only. */
  band?: [number, number]
  /**
   * Id of an SVG mask to cut the canvas to, so the field is only seen through a shape the
   * claimant draws: the headline's letters, a monogram, a plate. Without one it fills its band.
   */
  mask?: string
  priority: number
}

export const PRIORITY = {
  /** The entrance owns the screen until it is done. */
  loader: 40,
  /** The home headline is the field's home. */
  hero: 30,
  /** The full screen menu covers everything else. */
  menu: 20,
  /** The end of every page. */
  footer: 10,
  /** Any plate that asks for a quiet band. */
  plate: 5,
} as const

export const DEFAULT_BAND: [number, number] = [0.5, 1]

export type Resolved = {
  owner: string | null
  mode: FieldMode
  intensity: number
  band: [number, number]
  mask: string | null
}

export const OFF: Resolved = {
  owner: null,
  mode: 'off',
  intensity: 0,
  band: DEFAULT_BAND,
  mask: null,
}

/**
 * The winner is the highest priority claim. On a tie the current owner keeps the field, so a
 * plate that re-files its claim every frame never steals it from an equal peer mid-scroll.
 */
export function resolveClaims(claims: Record<string, Claim>, current: string | null): Resolved {
  let bestId: string | null = null
  let best: Claim | null = null
  for (const [id, claim] of Object.entries(claims)) {
    if (!best || claim.priority > best.priority) {
      bestId = id
      best = claim
      continue
    }
    if (claim.priority === best.priority && id === current) {
      bestId = id
      best = claim
    }
  }
  if (!bestId || !best) return OFF
  return {
    owner: bestId,
    mode: best.mode,
    intensity: best.intensity,
    band: best.band ?? DEFAULT_BAND,
    mask: best.mask ?? null,
  }
}

export function sameClaim(a: Claim | undefined, b: Claim): boolean {
  if (!a) return false
  return (
    a.mode === b.mode &&
    a.intensity === b.intensity &&
    a.priority === b.priority &&
    (a.mask ?? '') === (b.mask ?? '') &&
    (a.band?.[0] ?? -1) === (b.band?.[0] ?? -1) &&
    (a.band?.[1] ?? -1) === (b.band?.[1] ?? -1)
  )
}
