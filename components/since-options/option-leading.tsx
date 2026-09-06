'use client'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { clamp01, lerp } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { Bay } from './bay'

/**
 * Option 4, the leading. The section starts as five lines of ordinary text, the size of anything
 * else on the page, and scrolling opens it: the type grows and the plate travels to whichever
 * word the sentence is on, until one word is all there is. What you begin by reading you end by
 * looking at.
 *
 * The lines never rewrap, so a word's place in the block is a straight multiple of the size and
 * can be measured once instead of every frame.
 */
const BASE = 22
const BIG = 260

const LINES = [
  { before: 'Two years of energy engineering, Politecnico di Torino. ', word: 'Systems' },
  { before: 'Digital Communication Design, IAAD. ', word: 'Design' },
  { before: '2020, Redergo, interfaces in Figma. ', word: 'Handoff' },
  { before: '2021, stopped handing off, started shipping. ', word: 'Code' },
  { before: '2026, Refattura, 12,000+ documents generated. ', word: 'Stack' },
] as const

export function OptionLeading() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLParagraphElement>(null)
  const reduced = useMotion((s) => s.reduced)

  // Where each word sits in the block at the base size, once. Everything after is arithmetic.
  const spots = useRef<{ x: number; y: number }[]>([])
  // The size the spots were measured at, read off the element rather than assumed: everything
  // after is a multiple of it, so a stale number moves every word.
  const base = useRef(BASE)
  useEffect(() => {
    const block = blockRef.current
    if (!block) return
    const read = () => {
      base.current = parseFloat(getComputedStyle(block).fontSize) || BASE
      const marks = Array.from(block.querySelectorAll<HTMLElement>('[data-mark]'))
      spots.current = marks.map((mark) => ({
        x: mark.offsetLeft + mark.offsetWidth / 2,
        y: mark.offsetTop + mark.offsetHeight / 2,
      }))
    }
    read()
    let cancelled = false
    void document.fonts?.ready.then(() => {
      if (!cancelled) read()
    })
    return () => {
      cancelled = true
    }
  }, [])

  useGSAP(
    () => {
      const section = sectionRef.current
      const stage = stageRef.current
      const block = blockRef.current
      if (!section || !stage || !block || reduced) return
      setupGsap()
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => 'top top+=' + headerHeight(),
            end: '+=190%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
          onUpdate: () => {
            const p = state.p
            const spot = spots.current
            if (!spot.length) return
            // It is a paragraph for the first beat, then it opens, then the rest of the run
            // walks the sentence word by word.
            const open = clamp01((p - 0.12) / 0.26)
            const size = lerp(BASE, BIG, open * open)
            const k = size / base.current
            const walk = clamp01((p - 0.26) / 0.74) * (spot.length - 1)
            const i = Math.min(spot.length - 2, Math.floor(walk))
            const f = clamp01(walk - i)
            const a = spot[i]
            const b = spot[Math.min(spot.length - 1, i + 1)]
            const x = lerp(a.x, b.x, f) * k
            const y = lerp(a.y, b.y, f) * k
            // Closed, the block sits where a paragraph sits and is read. Open, the plate is
            // centred on whichever word the sentence is on.
            const wide = stage.clientWidth
            const tall = stage.clientHeight
            block.style.setProperty('--size', size.toFixed(2) + 'px')
            block.style.setProperty('--x', lerp(12, wide / 2 - x, open).toFixed(1) + 'px')
            block.style.setProperty('--y', lerp(tall * 0.3, tall / 2 - y, open).toFixed(1) + 'px')
            block.style.setProperty('--open', open.toFixed(3))
            section.dataset.state = p > 0.98 ? 'done' : 'running'
          },
        })
        return () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })
      return () => mm.revert()
    },
    { scope: sectionRef, dependencies: [reduced] },
  )

  return (
    <Bay
      id="opt-leading"
      n="Option 4"
      title="The leading"
      note="Text you read, opened until it is type you look at."
      sectionRef={sectionRef}
      className="opt--leading"
    >
      <div className="lead" ref={stageRef}>
        <h2 className="lead__title label">From design school to the whole stack</h2>
        <p className="lead__block" ref={blockRef}>
          {LINES.map((line, i) => (
            <span key={line.word} className="lead__line">
              <span className="lead__before">{line.before}</span>
              <span className="lead__mark" data-mark={i}>
                {line.word}
              </span>
              {i < LINES.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>
      </div>
    </Bay>
  )
}
