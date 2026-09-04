'use client'
import Link from 'next/link'
import { ViewTransition } from 'react'
import { useConsole } from '@/lib/console-store'
import { Decode } from '../decode'
import { Cell } from '../sheet/cell'
import type { SpanProps } from '../sheet/span'

export type CoverWork = {
  slug: string
  order: number
  title: string
  client: string
  year: string
  stack: string[]
  confidential: boolean
}

/**
 * A project cover as a typographic plate: the number, a ruled dither panel standing in for the
 * screenshot Edoardo has not shipped yet, then client, title and stack. Swapping in a real
 * image later means filling the panel, not rebuilding the plate. The title carries the shared
 * name that morphs into the case study heading.
 */
export function WorkCover({
  work,
  span,
  className,
}: {
  work: CoverWork
  span: SpanProps & { row?: number | string }
  className?: string
}) {
  const setHover = useConsole((s) => s.setHover)
  return (
    <Cell
      {...span}
      as="article"
      l
      r
      t
      b
      flush
      className={['cover', className].filter(Boolean).join(' ')}
      data-cover={work.order}
    >
      <Link
        href={`/work/${work.slug}`}
        transitionTypes={['nav-forward']}
        className="cover__link"
        onPointerEnter={() => setHover(work.client)}
        onPointerLeave={() => setHover(null)}
        onFocus={() => setHover(work.client)}
        onBlur={() => setHover(null)}
      >
        <span className="cover__head label">
          <Decode className="text-accent">{`P/${String(work.order).padStart(2, '0')}`}</Decode>
          <span className="text-ink-muted">
            {work.year}
            {work.confidential ? ' NDA' : ''}
          </span>
        </span>
        <span className="cover__panel" aria-hidden="true" />
        <span className="cover__body">
          <span className="label text-ink-muted">{work.client}</span>
          <ViewTransition name={`work-title-${work.slug}`} share="morph" default="none">
            <span className="cover__title">{work.title}</span>
          </ViewTransition>
          <span className="cover__stack label text-ink-muted">
            {work.stack.slice(0, 3).join(', ')}
          </span>
        </span>
      </Link>
    </Cell>
  )
}
