'use client'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { ABOUT_FACTS, ABOUT_SENTENCE } from '@/lib/about-facts'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { lerp } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { Monogram } from '../console/monogram'
import { Decode } from '../decode'
import { LineReveal } from '../line-reveal'
import { Cell } from '../sheet/cell'
import { Rule } from '../sheet/rule'
import { Sheet } from '../sheet/sheet'
import { spanStyle } from '../sheet/span'
import { Plate } from './plate'

const DEPTH = 180
const TILT = 10

/**
 * P/02. A column of text with a ruled table of facts under it, and one object beside it: a
 * shallow drawer holding the mark, tipped towards the reader and flattening as the plate crosses
 * the viewport. The text is never inside the three dimensional object, and nothing pins: the
 * plate says who he is and gets out of the way.
 */
export function AboutBox() {
  const sectionRef = useRef<HTMLElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const reduced = useMotion((s) => s.reduced)

  useGSAP(
    () => {
      const section = sectionRef.current
      const drawer = drawerRef.current
      if (!section || !drawer || reduced) return
      setupGsap()
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'center center',
            scrub: true,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            drawer.style.setProperty('--box-tilt', `${lerp(TILT, 0, state.p).toFixed(2)}deg`)
            drawer.style.setProperty('--box-depth', `${Math.round(lerp(DEPTH, 0, state.p))}px`)
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
    <Plate id="about" sectionRef={sectionRef} className="about-plate" meta={<span>Who</span>}>
      {/* Below lg the drawer is no longer beside it, so the sentence takes the whole band and
          closes it. */}
      <Cell
        col={1}
        end={8}
        row={2}
        md={{ col: 1, end: 7 }}
        sm={{ col: 1, end: 5 }}
        l
        r
        className="py-10 lg:after:hidden"
      >
        <LineReveal as="h2" className="about-plate__sentence">
          {ABOUT_SENTENCE}
        </LineReveal>
      </Cell>

      {/* Only wide enough for a column of its own on lg, where the drawer stands beside the
          sentence and the facts. Below that it takes a band after them: half a sheet is less room
          than the 96px mark inside it needs, and spanning the rows put the box over the text.
          The row goes through classes because an inline grid-row could not answer to a
          breakpoint. */}
      <Cell
        col={8}
        end={13}
        md={{ col: 1, end: 7 }}
        sm={{ col: 1, end: 5 }}
        l
        r
        flush
        className="[grid-row:4] lg:[grid-row:2/4]"
      >
        <div className="about-drawer">
          <div ref={drawerRef} className="box3d">
            <div className="box3d__side box3d__side--top" aria-hidden="true" />
            <div className="box3d__side box3d__side--bottom" aria-hidden="true" />
            <div className="box3d__side box3d__side--left" aria-hidden="true" />
            <div className="box3d__side box3d__side--right" aria-hidden="true" />
            <div className="box3d__face">
              <Monogram size={96} className="text-ink" />
            </div>
          </div>
        </div>
      </Cell>

      <Sheet
        as="dl"
        nested
        className="about-facts on-sheet"
        // A nested sheet only lines up with the page when it spans the full content width.
        style={{ ...spanStyle({ col: 1, end: 13 }), gridRow: 3 }}
      >
        {ABOUT_FACTS.map((f, i) => {
          const col = (i % 2) * 4 + 1
          return (
            <Cell
              key={f.label}
              col={col}
              end={col + 4}
              md={{ col: (i % 2) * 3 + 1, end: (i % 2) * 3 + 4 }}
              sm={{ col: 1, end: 5 }}
              l
              r={i % 2 === 1}
              className="about-fact"
            >
              <dt className="label text-ink-muted">
                <Decode>{f.label}</Decode>
              </dt>
              <dd className="mt-2 text-ink">{f.value}</dd>
            </Cell>
          )
        })}
      </Sheet>
      <Rule />
    </Plate>
  )
}
