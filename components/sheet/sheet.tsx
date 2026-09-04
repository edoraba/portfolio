import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type Props<T extends ElementType> = {
  as?: T
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

/**
 * One row band of the site grid: a full-bleed CSS grid with the page gutters as outer tracks
 * and 12 (lg), 6 (md) or 4 (sm) content columns between named lines `c 1` to `c cols + 1`.
 * Children place themselves with Cell, Rule or the `on-sheet` class plus span variables.
 */
export function Sheet<T extends ElementType = 'section'>({
  as,
  className,
  children,
  ...rest
}: Props<T>) {
  const Tag = (as ?? 'section') as ElementType
  return (
    <Tag className={['sheet', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  )
}
