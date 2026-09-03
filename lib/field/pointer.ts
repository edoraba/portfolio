export type Smoothed = { x: number; y: number; s: number }
export type Target = { x: number; y: number; active: boolean }

// Exponential smoothing with separate time constants: the light snaps towards
// the pointer (attack) and lingers when it leaves (release). dt in milliseconds.
// Position only follows while the pointer is active, so the glow fades in place.
export function smoothPointer(
  prev: Smoothed,
  target: Target,
  dt: number,
  attackMs: number,
  releaseMs: number,
): Smoothed {
  const goalS = target.active ? 1 : 0
  const tau = goalS > prev.s ? attackMs : releaseMs
  const k = 1 - Math.exp(-dt / tau)
  const kPos = target.active ? 1 - Math.exp(-dt / attackMs) : 0
  return {
    x: prev.x + (target.x - prev.x) * kPos,
    y: prev.y + (target.y - prev.y) * kPos,
    s: prev.s + (goalS - prev.s) * k,
  }
}
