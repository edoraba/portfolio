import type { CSSProperties } from 'react'
import { flipDelays, sliceClipPaths } from '@/lib/motion/slice-flip'

/**
 * A label that flips in strips on hover or focus of its `.flip` parent: four horizontal slices
 * slide out in alternating directions and slide back showing `alt`. The real text stays in the
 * DOM for assistive tech; the strips are decoration. The box is sized to the wider of the two
 * labels by a hidden twin, so neither ever gets clipped. Reduced motion: the text swaps in place.
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
      <span className="flip-text__ghost" aria-hidden="true">
        {second}
      </span>
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
