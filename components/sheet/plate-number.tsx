import { Decode } from '../decode'
import { Cell } from './cell'
import type { SpanProps } from './span'

/**
 * The mono plate number in the top-left cell of a plate or page: `P/03`. Encodes real order.
 */
export function PlateNumber({
  n,
  label,
  col = 1,
  end = 2,
  md,
  sm = { col: 1, end: 2 },
  className,
}: { n: number | string; label?: string; className?: string } & SpanProps) {
  const text = typeof n === 'number' ? `P/${String(n).padStart(2, '0')}` : n
  return (
    <Cell
      col={col}
      end={end}
      md={md}
      sm={sm}
      l
      t
      className={['label text-ink-muted', className].filter(Boolean).join(' ')}
    >
      <Decode className="text-ink">{text}</Decode>
      {label ? <span className="ml-2 hidden sm:inline">{label}</span> : null}
    </Cell>
  )
}
