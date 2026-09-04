/**
 * The Toolbox plate's physics, kept as plain data and geometry so the component only has to
 * feed a Matter world and copy positions back onto the DOM. Nothing here imports Matter.
 */

export type Rect = { width: number; height: number }
export type BodySeed = {
  index: number
  width: number
  height: number
  /** Start position inside the container, above its ceiling so the tag drops in. */
  x: number
  y: number
  angle: number
}
export type Wall = { x: number; y: number; width: number; height: number }

export const BODY_OPTIONS = {
  restitution: 0.25,
  friction: 0.6,
  frictionAir: 0.012,
  chamfer: { radius: 0 },
} as const

/** Tags come from the case studies and the about page, in first-appearance order, no repeats. */
export function tagsFromContent(stacks: readonly (readonly string[])[], extra: readonly string[]) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const list of [...stacks, extra]) {
    for (const raw of list) {
      const tag = raw.trim()
      const key = tag.toLowerCase()
      if (!tag || seen.has(key)) continue
      seen.add(key)
      out.push(tag)
    }
  }
  return out
}

/**
 * Where each tag starts: spread across the width in a few ranks above the ceiling, so they
 * fall in a shower instead of a single column. Deterministic, so the server and client agree.
 */
export function seedFor(index: number, rect: Rect, size: Rect, count: number): BodySeed {
  const perRank = Math.max(1, Math.floor(rect.width / Math.max(120, size.width + 24)))
  const rank = Math.floor(index / perRank)
  const slot = index % perRank
  const step = rect.width / (perRank + 1)
  // A fixed pseudo-random spread keeps the pile from stacking in perfect columns.
  const jitter = (((index * 2654435761) % 1000) / 1000 - 0.5) * step * 0.5
  return {
    index,
    width: size.width,
    height: size.height,
    x: step * (slot + 1) + jitter,
    y: -40 - rank * (size.height + 28) - (count > 20 ? 20 : 0),
    angle: ((((index * 40503) % 200) / 200) * 2 - 1) * 0.35,
  }
}

/** Four static walls just outside the container, thick enough that nothing tunnels through. */
export function wallsFor(rect: Rect, thickness = 120): Wall[] {
  const { width: w, height: h } = rect
  return [
    { x: w / 2, y: h + thickness / 2, width: w + thickness * 2, height: thickness },
    { x: -thickness / 2, y: h / 2, width: thickness, height: h * 4 },
    { x: w + thickness / 2, y: h / 2, width: thickness, height: h * 4 },
    // A ceiling well above the container keeps thrown tags from escaping upwards.
    { x: w / 2, y: -h, width: w + thickness * 2, height: thickness },
  ]
}

/** Clamp a body back inside the container if a throw ever pushes it out. */
export function insideBounds(
  p: { x: number; y: number },
  rect: Rect,
  size: Rect,
): { x: number; y: number } {
  return {
    x: Math.min(Math.max(p.x, size.width / 2), rect.width - size.width / 2),
    y: Math.min(p.y, rect.height - size.height / 2),
  }
}
