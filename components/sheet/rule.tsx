import { spanStyle, type SpanProps } from './span'

type Props = SpanProps & {
  /** A vertical rule fills the height of its row instead of spanning columns. */
  vertical?: boolean
  className?: string
}

/**
 * A hairline on the sheet, drawn in when it enters the viewport (scaleX from the left, or
 * scaleY from the top when vertical). Purely decorative.
 */
export function Rule({ vertical, className, ...span }: Props) {
  return (
    <div
      aria-hidden="true"
      className={['rule on-sheet', vertical && 'rule-v', className].filter(Boolean).join(' ')}
      style={spanStyle(span)}
    />
  )
}
