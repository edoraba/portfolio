'use client'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { clamp01, lerp } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { SINCE_FRAMES } from '@/lib/since-frames'
import { Bay, useFit } from './bay'

/**
 * Option 1, the specimen. Five lines at one size, ragged, the way a foundry shows a family: what
 * changes down the page is not the word but the cut. Nothing moves at all. Scrolling drives a
 * weight front down the column, so the story gains body as it goes, from the lightest cut on two
 * years of engineering to the heaviest on the whole stack, and the line the front is on is the
 * one whose label is lit. Reference: klim.co.nz, the Soehne specimen.
 */
const WEIGHT = [300, 420, 540, 660, 800]

export function OptionSpecimen() {
  const sectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useMotion((s) => s.reduced)
  useFit(listRef, 'one')

  useGSAP(
    () => {
      const section = sectionRef.current
      const list = listRef.current
      if (!section || !list || reduced) return
      setupGsap()
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-row]'))
        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => 'top top+=' + headerHeight(),
            end: '+=140%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 4,
          },
          onUpdate: () => {
            // One front, moving down the column. A line ahead of it is still the lightest cut, a
            // line behind it has arrived at its own.
            const front = state.p * (rows.length + 0.6) - 0.3
            rows.forEach((row, i) => {
              const near = clamp01(front - i + 0.5)
              row.style.setProperty('--w', Math.round(lerp(WEIGHT[0], WEIGHT[i], near)).toString())
              row.style.setProperty('--lit', (0.28 + 0.72 * near).toFixed(3))
            })
            section.dataset.state = state.p > 0.98 ? 'done' : 'running'
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
      id="opt-specimen"
      n="Option 1"
      title="The specimen"
      note="One size, five cuts. Nothing moves: the weight does."
      sectionRef={sectionRef}
      className="opt--specimen"
    >
      <div className="spec">
        <h2 className="spec__title label">From design school to the whole stack</h2>
        <ol className="spec__list" ref={listRef}>
          {SINCE_FRAMES.map((frame, i) => (
            <li key={frame.id} className="spec__row" data-row={i}>
              <p className="spec__meta">
                <span className="spec__no">{String(i + 1).padStart(2, '0')}</span>
                <span className="spec__year">{frame.year ?? ''}</span>
                <span className="spec__caption">{frame.caption}</span>
                <span className="spec__wght">{WEIGHT[i]}</span>
              </p>
              <p className="spec__word" data-word="">
                <span>{frame.word}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Bay>
  )
}
