/**
 * The EB monogram, drawn by Edoardo in Figma as ten rectangles on a modular grid: three bars of
 * 175.355 separated by two voids of 236.967, in both axes, inside a 1000 square. Nothing is
 * curved and nothing overlaps, so the mark is the same system as the sheet the site sits on.
 *
 * The rectangles are grouped in five parts. The loader reveals one part per resource that
 * becomes ready, each growing along its own axis, so the mark assembles itself while the page
 * calibrates. `parts` is how many of the five are visible; the default shows the whole mark.
 */
const U = 175.355 // bar
const G = 236.967 // void
const S = 1000
/** Left edge of each of the five tracks: bar, void, bar, void, bar. */
const C = [0, U, U + G, U + G + U, U + G + U + G] as const

type Part = { x: number; y: number; w: number; h: number; part: number; grow: 'x' | 'y' | 'c' }

/** Reading order of the mark: stems, right stem halves, top arms, bottom arms, the two tongues. */
export const MONOGRAM_PARTS: Part[] = [
  // 0: the two full-height stems (E spine, shared B spine)
  { x: C[0], y: 0, w: U, h: S, part: 0, grow: 'y' },
  { x: C[2], y: 0, w: U, h: S, part: 0, grow: 'y' },
  // 1: the right stem, split by the B counter
  { x: C[4], y: 0, w: U, h: C[2], part: 1, grow: 'y' },
  { x: C[4], y: C[3], w: U, h: C[2], part: 1, grow: 'y' },
  // 2: top arms
  { x: C[1], y: 0, w: G, h: U, part: 2, grow: 'x' },
  { x: C[3], y: 0, w: G, h: U, part: 2, grow: 'x' },
  // 3: bottom arms
  { x: C[1], y: C[4], w: G, h: U, part: 3, grow: 'x' },
  { x: C[3], y: C[4], w: G, h: U, part: 3, grow: 'x' },
  // 4: the two tongues that make it read as E and B
  { x: C[1], y: C[2], w: U, h: U, part: 4, grow: 'c' },
  { x: C[3] + G - U, y: C[2], w: U, h: U, part: 4, grow: 'c' },
]

export const MONOGRAM_PART_COUNT = 5

export function Monogram({
  size = 24,
  parts = MONOGRAM_PART_COUNT,
  className,
}: {
  size?: number
  /** How many of the five parts are drawn (the loader counts up). */
  parts?: number
  className?: string
}) {
  return (
    <svg
      className={['monogram', className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      viewBox={`0 0 ${S} ${S}`}
      aria-hidden="true"
      focusable="false"
    >
      {MONOGRAM_PARTS.map((r, i) => (
        <rect
          key={i}
          className="monogram__part"
          data-grow={r.grow}
          data-on={r.part < parts || undefined}
          x={r.x}
          y={r.y}
          width={r.w}
          height={r.h}
          fill="currentColor"
          style={{
            // Bars grow from the far edge of their own axis, tongues from their centre.
            transformOrigin:
              r.grow === 'y'
                ? `${r.x + r.w / 2}px ${r.y > S / 2 ? r.y + r.h : r.y}px`
                : r.grow === 'x'
                  ? `${r.x}px ${r.y + r.h / 2}px`
                  : `${r.x + r.w / 2}px ${r.y + r.h / 2}px`,
            transitionDelay: `${r.part * 60}ms`,
          }}
        />
      ))}
    </svg>
  )
}
