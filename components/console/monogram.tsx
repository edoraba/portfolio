/** Bar heights of the EB mark, as a fraction of the full height. Shared with the loader. */
export const MONOGRAM_BARS = [1, 0.6, 0.8, 0.4, 0.9] as const

/**
 * The monogram: five vertical bars in the current ink. `size` is the height in px; the mark
 * is 1.2 times as wide as it is tall. Decorative: the parent link carries the name.
 */
export function Monogram({ size = 24, className }: { size?: number; className?: string }) {
  const w = size * 1.2
  const bar = w / 9
  return (
    <svg
      className={className}
      width={w}
      height={size}
      viewBox={`0 0 ${w} ${size}`}
      aria-hidden="true"
      focusable="false"
    >
      {MONOGRAM_BARS.map((h, i) => (
        <rect
          key={i}
          className="monogram__bar"
          x={i * bar * 2}
          y={size - size * h}
          width={bar}
          height={size * h}
          fill="currentColor"
        />
      ))}
    </svg>
  )
}
