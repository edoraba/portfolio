import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from 'react'
import { spanStyle, type SpanProps } from './span'

type Props<T extends ElementType> = SpanProps & {
  as?: T
  /** Explicit grid row (for multi-row sheets such as the header). */
  row?: number | string
  /** Hairlines on the left, right, top, bottom edges. They sit exactly on grid lines. */
  l?: boolean
  r?: boolean
  t?: boolean
  b?: boolean
  /** No inner padding (for figures and canvases that fill the cell). */
  flush?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children' | 'style'>

/**
 * A cell on the sheet: a grid child spanning column lines, with optional hairlines that draw
 * in when the cell enters the viewport (see RulesObserver) and 12px of inner padding so text
 * never touches a line.
 */
export function Cell<T extends ElementType = 'div'>({
  as,
  col,
  end,
  md,
  sm,
  row,
  l,
  r,
  t,
  b,
  flush,
  className,
  style,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? 'div') as ElementType
  const cls = [
    'cell on-sheet',
    l && 'cell-l',
    r && 'cell-r',
    t && 'cell-t',
    b && 'cell-b',
    flush && 'cell-flush',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const merged: CSSProperties = {
    ...spanStyle({ col, end, md, sm }),
    ...(row !== undefined ? { gridRow: row } : null),
    ...style,
  }
  return (
    <Tag className={cls} style={merged} {...rest}>
      {children}
    </Tag>
  )
}
