'use client'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { ABOUT_FACTS, ABOUT_SENTENCE } from '@/lib/about-facts'
import { useField } from '@/lib/field/store'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { itemProgress } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { Monogram } from '../console/monogram'
import { Decode } from '../decode'
import { Cell } from '../sheet/cell'
import { Sheet } from '../sheet/sheet'
import { spanStyle } from '../sheet/span'
import { Plate } from './plate'

const DEPTH = 240
const TILT = 12

/**
 * P/02. The bio and the facts sit on the front face of a ruled box seen slightly from above.
 * Scrolling flattens it: the tilt goes to zero, the depth collapses and the facts draw in one
 * by one, so the reader ends with a plain table. Below 1024px and under reduced motion the box
 * is flat from the start and the facts reveal with the normal rules.
 */
export function AboutBox() {
  const sectionRef = useRef<HTMLElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const reduced = useMotion((s) => s.reduced)

  useGSAP(
    () => {
      const section = sectionRef.current
      const box = boxRef.current
      if (!section || !box || reduced) return
      setupGsap()
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const rows = Array.from(box.querySelectorAll<HTMLElement>('[data-fact]'))
        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => `top top+=${headerHeight()}`,
            end: '+=150%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            const p = state.p
            box.style.setProperty('--box-tilt', `${(TILT * (1 - p)).toFixed(2)}deg`)
            box.style.setProperty('--box-depth', `${Math.round(DEPTH * (1 - p))}px`)
            rows.forEach((row, i) => {
              const local = itemProgress(p, i, rows.length, 0.45)
              row.classList.toggle('is-drawn', local > 0.05)
              row.style.setProperty('--fact-in', local.toFixed(3))
            })
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

  // The field sits behind the box floor as a quiet band while the plate is on screen.
  useGSAP(
    () => {
      const section = sectionRef.current
      if (!section) return
      const store = useField
      const io = new IntersectionObserver(
        ([entry]) => {
          const s = store.getState()
          if (entry.isIntersecting) {
            s.request('about')
            if (s.mode === 'off') {
              s.setMode('band')
              s.setBand([0.45, 1])
              s.setIntensity(0.2)
            }
          } else {
            s.release('about')
            if (s.mode === 'band' && s.requests.length === 0) {
              s.setMode('off')
              s.setIntensity(0)
            }
          }
        },
        { threshold: 0.25 },
      )
      io.observe(section)
      return () => {
        io.disconnect()
        useField.getState().release('about')
      }
    },
    { scope: sectionRef },
  )

  return (
    <Plate id="about" sectionRef={sectionRef} className="about-plate" meta={<span>Who</span>}>
      <Cell col={1} end={13} l r flush className="about-stage">
        <div ref={boxRef} className="box3d">
          <div className="box3d__side box3d__side--top" aria-hidden="true" />
          <div className="box3d__side box3d__side--bottom" aria-hidden="true" />
          <div className="box3d__side box3d__side--left" aria-hidden="true" />
          <div className="box3d__side box3d__side--right" aria-hidden="true" />
          <Sheet nested className="box3d__face">
            <Cell col={1} end={9} md={{ col: 1, end: 7 }} sm={{ col: 1, end: 5 }} b>
              <p className="headline text-ink">{ABOUT_SENTENCE}</p>
            </Cell>
            <Cell col={9} end={13} b className="hidden items-end justify-end lg:flex">
              <Monogram size={88} className="text-ink" />
            </Cell>
            <Sheet
              as="dl"
              nested
              className="box3d__facts on-sheet"
              style={spanStyle({ col: 1, end: 13 })}
            >
              {ABOUT_FACTS.map((f, i) => {
                const c = (i % 4) * 3 + 1
                return (
                  <Cell
                    key={f.label}
                    data-fact=""
                    col={c}
                    end={c + 3}
                    md={{ col: (i % 2) * 3 + 1, end: (i % 2) * 3 + 4 }}
                    sm={{ col: 1, end: 5 }}
                    b
                    r={i % 4 === 3}
                    className="fact"
                  >
                    <dt className="label text-ink-muted">
                      <Decode>{f.label}</Decode>
                    </dt>
                    <dd className="mt-2 text-ink">{f.value}</dd>
                  </Cell>
                )
              })}
            </Sheet>
          </Sheet>
        </div>
      </Cell>
    </Plate>
  )
}
