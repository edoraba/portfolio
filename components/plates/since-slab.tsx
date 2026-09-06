'use client'
import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { clamp01 } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { SINCE_FRAMES } from '@/lib/since-frames'
import { Cell } from '../sheet/cell'
import { Rule } from '../sheet/rule'
import { Plate } from './plate'

/**
 * Which way each word is shoved out of the column while it is still coming, as a share of its own
 * width. Alternating, and never the same distance twice: five words leaning the same way would be
 * one gesture repeated, and the point is that the column is broken before it is whole.
 */
const SHOVE = [-0.44, 0.56, -0.36, 0.5, -0.46] as const

/**
 * Where a word is read, as a share of the plate, and the longest approach any of them gets, also
 * as a share of the plate. A word that starts closer than that gets the shorter run instead, so
 * the first one is as far out of line as the rest even though it begins on screen.
 */
const LOCK = 0.5
const REACH = 0.85

/**
 * When the outline starts filling with ink, as a share of the approach still to run. Held hollow
 * for most of the way: a word half filled reads as a wash rather than as type, and the whole
 * point of the outline is that it is empty until it is true.
 */
const INK_FROM = 0.5

/**
 * P/06. The story is set as one column of type at the width of the sheet, a word to a moment, and
 * every word arrives out of line: shoved sideways and drawn in outline, filling with ink and
 * closing onto the column as it reaches the reading height. What resolves is not one word but the
 * column itself, because the ruled edge each word carries only becomes a ladder when they are all
 * home, which is the section: two halves that did not line up, and then did. Below 1024px and
 * under reduced motion the column is already whole.
 */
export function SinceSlab() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const blockRef = useRef<HTMLDivElement>(null)
  const reduced = useMotion((s) => s.reduced)

  // Every word is set to the width of the column, so a short word is a big one and the five of
  // them read as one slab. The container width gets within a few per cent of it on its own; this
  // is the correction, and it is measured in layout widths because the words are transformed.
  useEffect(() => {
    const block = blockRef.current
    if (!block) return
    const words = Array.from(block.querySelectorAll<HTMLElement>('[data-word]'))
    const fit = () => {
      const column = block.clientWidth
      if (!column) return
      for (const word of words) {
        const span = word.firstElementChild as HTMLElement | null
        if (!span) continue
        word.style.setProperty('--fit', '1')
        const natural = span.offsetWidth
        if (natural > 0) word.style.setProperty('--fit', (column / natural).toFixed(4))
      }
    }
    fit()
    let cancelled = false
    void document.fonts?.ready.then(() => {
      if (!cancelled) fit()
    })
    const ro = new ResizeObserver(fit)
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
        const words = Array.from(block.querySelectorAll<HTMLElement>('[data-word]'))
        const moments = Array.from(stage.querySelectorAll<HTMLElement>('[data-moment]'))
        const ticks = Array.from(stage.querySelectorAll<HTMLElement>('[data-tick]'))
        // Where each word sits in the column, where it is read, and how far the column has to
        // travel for the last word to get there. Measured on every refresh, which is what a
        // resize becomes.
        let centres: number[] = []
        let runs: number[] = []
        let lock = 0
        let travel = 0
        const measure = () => {
          const tall = stage.clientHeight
          centres = words.map((word) => word.offsetTop + word.offsetHeight / 2)
          lock = tall * LOCK
          runs = centres.map((c) => Math.max(1, Math.min(tall * REACH, c - lock)))
          travel = Math.max(0, (centres[centres.length - 1] ?? 0) - lock)
        }
        measure()

        let live = -1
        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => 'top top+=' + headerHeight(),
            end: '+=200%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onRefresh: measure,
          },
          onUpdate: () => {
            const p = state.p
            const y = -travel * p
            block.style.setProperty('--travel', y.toFixed(1) + 'px')
            let read = 0
            let near = Infinity
            for (let i = 0; i < words.length; i++) {
              const at = centres[i] + y
              // 1 while the word is still coming, 0 once it is home. Nothing above the reading
              // height ever moves again: the column only closes.
              const t = clamp01((at - lock) / runs[i])
              words[i].style.setProperty('--t', t.toFixed(3))
              const ink = clamp01((INK_FROM - t) / INK_FROM)
              words[i].style.setProperty('--ink-in', (ink * 100).toFixed(1) + '%')
              const d = Math.abs(at - lock)
              if (d < near) {
                near = d
                read = i
              }
            }
            if (read !== live) {
              live = read
              moments.forEach((el, i) => {
                el.dataset.on = i === read ? '1' : '0'
              })
              ticks.forEach((el, i) => {
                el.dataset.on = i <= read ? '1' : '0'
              })
            }
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
      className="slab-plate"
      meta={<span>How the two halves met</span>}
    >
      <Rule />
      <Cell col={1} end={13} l r flush className="slab">
        <div ref={stageRef} className="slab__stage">
          <div ref={blockRef} className="slab__block">
            <h2 className="slab__title display">From design school to the whole stack</h2>
            <ol className="slab__words" aria-hidden="true">
              {SINCE_FRAMES.map((frame, i) => (
                <li
                  key={frame.id}
                  className="slab__word"
                  data-word={i}
                  style={
                    {
                      '--len': frame.word.length,
                      '--shove': SHOVE[i % SHOVE.length],
                    } as React.CSSProperties
                  }
                >
                  <span>{frame.word}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="slab__read">
            <ol className="slab__ticks" aria-hidden="true">
              {SINCE_FRAMES.map((frame, i) => (
                <li
                  key={frame.id}
                  className="slab__tick"
                  data-tick={i}
                  data-on={i === 0 ? '1' : '0'}
                />
              ))}
            </ol>
            <ol className="slab__moments">
              {SINCE_FRAMES.map((frame, i) => (
                <li
                  key={frame.id}
                  className="slab__moment"
                  data-moment={i}
                  data-on={i === 0 ? '1' : '0'}
                >
                  <span className="slab__no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="slab__year">{frame.year ?? ''}</span>
                  <span className="slab__caption">{frame.caption}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Cell>
      <Rule />
    </Plate>
  )
}
