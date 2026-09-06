'use client'
import { useEffect, type ReactNode, type RefObject } from 'react'
import { Cell } from '../sheet/cell'
import { Rule } from '../sheet/rule'
import { Sheet } from '../sheet/sheet'

/**
 * Provisional. One bay of the P/06 comparison page: the same sheet grammar as a plate, with its
 * own mono head, so four candidate treatments can be judged against each other in the real grid,
 * the real fonts and any of the six themes. Delete with the page once one is chosen.
 */
export function Bay({
  id,
  n,
  title,
  note,
  sectionRef,
  className,
  children,
}: {
  id: string
  n: string
  title: string
  note: string
  sectionRef?: RefObject<HTMLElement | null>
  className?: string
  children?: ReactNode
}) {
  return (
    <Sheet
      as="section"
      id={id}
      ref={sectionRef}
      className={['opt', className].filter(Boolean).join(' ')}
    >
      <Rule />
      <Cell col={1} end={4} md={{ col: 1, end: 4 }} sm={{ col: 1, end: 3 }} l r className="label">
        <span className="text-ink-muted">{n}</span>
        <br />
        {title}
      </Cell>
      <Cell
        col={4}
        end={13}
        md={{ col: 4, end: 7 }}
        sm={{ col: 3, end: 5 }}
        l
        r
        className="label text-ink-muted"
      >
        {note}
      </Cell>
      <Cell col={1} end={13} l r flush className="opt__body">
        {children}
      </Cell>
      <Rule />
    </Sheet>
  )
}

/**
 * Sets every word to the width of its own box, or all of them to one size that the longest can
 * live at. Layout widths only: the words are transformed, so a measured rect would be the
 * projection and not the type.
 */
export function useFit(
  ref: RefObject<HTMLElement | null>,
  mode: 'each' | 'one',
  deps: unknown[] = [],
) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const words = Array.from(root.querySelectorAll<HTMLElement>('[data-word]'))
    const fit = () => {
      const measure = root.clientWidth
      if (!measure) return
      let smallest = Infinity
      for (const word of words) {
        const span = word.firstElementChild as HTMLElement | null
        if (!span) continue
        word.style.setProperty('--fit', '1')
        const natural = span.offsetWidth
        if (natural <= 0) continue
        const ratio = measure / natural
        smallest = Math.min(smallest, ratio)
        if (mode === 'each') word.style.setProperty('--fit', ratio.toFixed(4))
        // In one size mode the value belongs to the list, not to the word: leaving the measuring
        // value behind would override it.
        else word.style.removeProperty('--fit')
      }
      if (mode === 'one' && Number.isFinite(smallest)) {
        root.style.setProperty('--fit', smallest.toFixed(4))
      }
    }
    fit()
    let cancelled = false
    void document.fonts?.ready.then(() => {
      if (!cancelled) fit()
    })
    const ro = new ResizeObserver(fit)
    ro.observe(root)
    return () => {
      cancelled = true
      ro.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, mode, ...deps])
}
