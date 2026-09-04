import type { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from 'react'

type Props<T extends ElementType> = {
  as?: T
  /** A grid nested inside a cell: same content columns, without the page gutter tracks. */
  nested?: boolean
  className?: string
  children?: ReactNode
  /** React 19 passes ref as a plain prop; plates need one to build their ScrollTrigger. */
  ref?: Ref<HTMLElement>
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children' | 'ref'>

/**
 * One row band of the site grid: a full-bleed CSS grid with the page gutters as outer tracks
 * and 12 (lg), 6 (md) or 4 (sm) content columns between named lines `c 1` to `c cols + 1`.
 * Children place themselves with Cell, Rule or the `on-sheet` class plus span variables.
 */
export function Sheet<T extends ElementType = 'section'>({
  as,
  nested,
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? 'section') as ElementType
  return (
    <Tag className={[nested ? 'subsheet' : 'sheet', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  )
}
