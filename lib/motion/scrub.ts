/**
 * Scroll choreography helpers. Pure maths here so the plates stay declarative and testable:
 * how long a pin may be, which beat a progress falls in, and how a staggered item maps global
 * progress to its own 0 to 1.
 */

/** Pins are capped: 200vh on desktop, 100vh on mobile (spec section 9). */
export function pinLength(desiredVh: number, isMobile: boolean): number {
  const max = isMobile ? 100 : 200
  return Math.max(0, Math.min(max, desiredVh))
}

export function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp01(t)
}

/**
 * Which beat a global progress falls in, and how far through that beat it is.
 * `boundaries` are the cut points between beats, e.g. [0.3, 0.8] means three beats.
 */
export function beatAt(progress: number, boundaries: number[]): { index: number; local: number } {
  const p = clamp01(progress)
  const edges = [0, ...boundaries, 1]
  for (let i = 0; i < edges.length - 1; i++) {
    const from = edges[i]
    const to = edges[i + 1]
    if (p < to || i === edges.length - 2) {
      const span = to - from
      return { index: i, local: span <= 0 ? 1 : clamp01((p - from) / span) }
    }
  }
  return { index: 0, local: 0 }
}

/**
 * Local 0 to 1 for item `index` of `count`, each taking `span` of the timeline and starting
 * evenly across the rest. With count 1 the item uses the first `span` of the timeline.
 */
export function itemProgress(progress: number, index: number, count: number, span = 0.4): number {
  const start = count > 1 ? (index / (count - 1)) * (1 - span) : 0
  return clamp01((clamp01(progress) - start) / span)
}
