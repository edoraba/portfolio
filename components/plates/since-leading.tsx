'use client'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { clamp01, lerp } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { SINCE_FRAMES } from '@/lib/since-frames'
import { Cell } from '../sheet/cell'
import { Rule } from '../sheet/rule'
import { Plate } from './plate'

/**
 * The size the block is set at, and the size one word ends at. Everything between is measured
 * once against the first of them and multiplied, so a word's place on its line never has to be
 * read again.
 */
const BASE = 22
const BIG = 260

/** The beat that opens the type, and the one that walks the sentence. They overlap a little. */
const OPEN = [0.08, 0.45] as const
const WALK = [0.3, 1] as const

/**
 * P/06. The section starts as five lines of ordinary text, the size of anything else on the page,
 * and it is meant to be read that way. Then the scroll opens it: the type grows and the plate
 * travels to whichever word the sentence is on, until one word is all there is. What the reader
 * begins by reading they end by looking at, which is the story itself, a designer who began with
 * the words and ended with the thing.
 *
 * The lines never rewrap and the tracking never changes, so every word's place in the block is a
 * straight multiple of the size: one measurement on mount, arithmetic after that, and two values
 * written a frame. Below 1024px and under reduced motion it stays the paragraph it starts as.
 */
export function SinceLeading() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLParagraphElement>(null)
  const reduced = useMotion((s) => s.reduced)

  // Where each word sits in the block, and the size that was measured at, read off the element
  // rather than assumed: everything after is a multiple of it, so a stale number moves the aim.
  const spots = useRef<{ x: number; y: number }[]>([])
  const middle = useRef({ x: 0, y: 0 })
  const base = useRef(BASE)
  useEffect(() => {
    const block = blockRef.current
    if (!block) return
    const read = () => {
      base.current = parseFloat(getComputedStyle(block).fontSize) || BASE
      middle.current = { x: block.offsetWidth / 2, y: block.offsetHeight / 2 }
      spots.current = Array.from(block.querySelectorAll<HTMLElement>('[data-mark]')).map(
        (mark) => ({
          x: mark.offsetLeft + mark.offsetWidth / 2,
          y: mark.offsetTop + mark.offsetHeight / 2,
        }),
      )
    }
    read()
    let cancelled = false
    void document.fonts?.ready.then(() => {
      if (!cancelled) read()
    })
    const ro = new ResizeObserver(read)
    ro.observe(block)
    return () => {
      cancelled = true
      ro.disconnect()
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
            const open = clamp01((p - OPEN[0]) / (OPEN[1] - OPEN[0]))
            // Squared: the first move out of reading size is the one that has to be gentle, or
            // the paragraph is gone before the reader knows it was text.
            const size = lerp(BASE, BIG, open * open)
            const k = size / base.current
            const walk = clamp01((p - WALK[0]) / (WALK[1] - WALK[0])) * (spot.length - 1)
            const i = Math.min(spot.length - 2, Math.floor(walk))
            const f = clamp01(walk - i)
            const a = spot[i]
            const b = spot[Math.min(spot.length - 1, i + 1)]
            // Closed, the plate is on the middle of the paragraph, which is how a paragraph is
            // set. Open, it is on the word the sentence has reached. At reading size the two are
            // a few centimetres apart, so the growth is a zoom and never a slide.
            const x = lerp(middle.current.x, lerp(a.x, b.x, f), open) * k
            const y = lerp(middle.current.y, lerp(a.y, b.y, f), open) * k
            const wide = stage.clientWidth
            const tall = stage.clientHeight
            block.style.setProperty('--size', size.toFixed(2) + 'px')
            block.style.setProperty('--x', (wide / 2 - x).toFixed(1) + 'px')
            block.style.setProperty('--y', (tall / 2 - y).toFixed(1) + 'px')
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
    <Plate
      id="since"
      sectionRef={sectionRef}
      className="lead-plate"
      meta={<span>How the two halves met</span>}
    >
      <Rule />
      <Cell col={1} end={13} l r flush className="lead">
        <div ref={stageRef} className="lead__stage">
          <h2 className="lead__title">From design school to the whole stack</h2>
          <p className="lead__block" ref={blockRef}>
            {SINCE_FRAMES.map((frame, i) => (
              <span key={frame.id}>
                <span className="lead__said">
                  {frame.year ? frame.year + '. ' : ''}
                  {frame.caption}.{' '}
                </span>
                <span className="lead__word" data-mark={i}>
                  {frame.word}
                </span>
                {i < SINCE_FRAMES.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>
      </Cell>
      <Rule />
    </Plate>
  )
}
