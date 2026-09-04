'use client'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useRef } from 'react'
import { useField } from '@/lib/field/store'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { useMotion } from '@/lib/motion/store'
import { site } from '@/lib/site'
import { CopyEmail } from '../copy-email'
import { Decode } from '../decode'
import { HeroMask } from '../hero-mask'
import { LocalTime } from '../local-time'
import { Cell } from '../sheet/cell'
import { Plate } from './plate'

export type HeroWork = { slug: string; order: number; client: string; year: string }

/**
 * P/01. Two windows onto the same field: a strip above the fold and the headline itself, both
 * cut out of one mask. Scrolling closes the strip and compresses the words along the width
 * axis, so the first gesture of the site is the type reacting to the reader.
 */
export function Hero({ works }: { works: HeroWork[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const bandRef = useRef<HTMLDivElement>(null)
  const reduced = useMotion((s) => s.reduced)
  const cell = useField((s) => s.cell)

  useGSAP(
    () => {
      const section = sectionRef.current
      const band = bandRef.current
      if (!section || !band || reduced) return
      setupGsap()
      const state = { h: 1 }
      const tween = gsap.to(state, {
        h: 0,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: '45% top', scrub: true },
        onUpdate: () => band.style.setProperty('--band-scale', state.h.toFixed(3)),
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        band.style.removeProperty('--band-scale')
      }
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  return (
    <Plate
      id="hero"
      sectionRef={sectionRef}
      className="hero-sheet"
      meta={
        <span className="hero-meta">
          <span>{site.coordinates}</span>
          <span className="hidden sm:inline">
            <LocalTime />
          </span>
          <span className="hidden md:inline">Field cell {cell}</span>
        </span>
      }
    >
      <Cell col={1} end={13} l r flush>
        <div ref={bandRef} className="hero-band" aria-hidden="true">
          <svg className="hero-band__fallback" focusable="false">
            <rect width="100%" height="100%" fill="url(#hero-dither)" />
          </svg>
        </div>
      </Cell>

      <Cell col={1} end={13} l r t flush className="pt-10 md:pt-16">
        <HeroMask band={bandRef} />
      </Cell>

      <Cell col={1} end={7} md={{ col: 1, end: 5 }} sm={{ col: 1, end: 5 }} l t b className="py-8">
        <p className="measure text-ink-muted">
          <span className="text-ink">{site.role}.</span> Whole products, from the interface to the
          database, shipped from {site.location}.
        </p>
        <CopyEmail className="mt-6 block" />
      </Cell>

      <Cell
        as="nav"
        aria-label="Selected work"
        col={8}
        end={13}
        md={{ col: 5, end: 7 }}
        sm={{ col: 1, end: 5 }}
        l
        r
        t
        b
        className="py-8 label"
      >
        <ol className="space-y-3">
          {works.map((w) => (
            <li key={w.slug} className="flex gap-3">
              <Decode className="text-ink">{`P/${String(w.order).padStart(2, '0')}`}</Decode>
              <Link
                href={`/work/${w.slug}`}
                className="text-ink-muted transition-colors hover:text-ink"
              >
                {w.client}
              </Link>
              <span className="ml-auto text-accent">{w.year}</span>
            </li>
          ))}
        </ol>
      </Cell>
    </Plate>
  )
}
