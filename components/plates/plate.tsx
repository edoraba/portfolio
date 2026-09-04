'use client'
import { useRef, type ReactNode, type RefObject } from 'react'
import { PLATES, usePlate, type PlateId } from '@/lib/plates'
import { Cell } from '../sheet/cell'
import { PlateNumber } from '../sheet/plate-number'
import { Sheet } from '../sheet/sheet'

/**
 * One plate of the home story: a sheet section with its mono number and title in the top-left
 * cell, a ruled cell across the rest of that row, and the plate's own content below. While the
 * plate is the most visible one the console header prints its number and title.
 *
 * A plate that animates passes its own `sectionRef` so it can build a ScrollTrigger on it.
 */
export function Plate({
  id,
  className,
  children,
  meta,
  sectionRef,
}: {
  id: PlateId
  className?: string
  children?: ReactNode
  /** Mono facts printed in the ruled cell next to the plate number. */
  meta?: ReactNode
  sectionRef?: RefObject<HTMLElement | null>
}) {
  const own = useRef<HTMLElement>(null)
  const ref = sectionRef ?? own
  usePlate(id, ref)
  const plate = PLATES.find((p) => p.id === id)
  return (
    <Sheet
      as="section"
      id={id}
      ref={ref}
      className={['plate', className].filter(Boolean).join(' ')}
      aria-label={plate?.title}
    >
      <PlateNumber
        n={plate?.n ?? 1}
        label={plate?.title}
        col={1}
        end={4}
        md={{ col: 1, end: 4 }}
        sm={{ col: 1, end: 3 }}
      />
      <Cell
        col={4}
        end={13}
        md={{ col: 4, end: 7 }}
        sm={{ col: 3, end: 5 }}
        l
        r
        t
        className="label text-ink-muted"
      >
        {meta}
      </Cell>
      {children}
    </Sheet>
  )
}
