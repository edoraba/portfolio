import type { CSSProperties, ReactNode } from 'react'
import { flipDelays, sliceClipPaths } from '@/lib/motion/slice-flip'

/**
 * A label that flips in strips on hover or focus of its `.flip` parent: four horizontal slices
 * slide out in alternating directions and slide back showing `alt`. The real text stays in the
 * DOM for assistive tech; the strips are decoration. Reduced motion: the text swaps in place.
 * Wrap the interactive element with `className="flip"` (or pass `self` to make this the group).
 */
export function FlipText({
  children,
  alt,
  className,
}: {
  children: string
  alt?: string
  className?: string
}) {
  const clips = sliceClipPaths()
  const delays = flipDelays()
  const second = alt ?? children
  return (
    <span className={['flip-text', className].filter(Boolean).join(' ')}>
      <span className="flip-text__real">{children}</span>
      <span className="flip-text__strips" aria-hidden="true">
        {clips.map((clip, i) => (
          <span
            key={i}
            className="flip-text__strip"
            style={
              {
                clipPath: clip,
                '--d': `${delays[i].delay}ms`,
                '--dir': delays[i].dir,
              } as CSSProperties
            }
          >
            <span className="flip-text__a">{children}</span>
            <span className="flip-text__b">{second}</span>
          </span>
        ))}
      </span>
    </span>
  )
}

export type FlipTextProps = { children: ReactNode }
