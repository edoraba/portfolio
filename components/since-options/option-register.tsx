'use client'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { clamp01 } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { SINCE_FRAMES } from '@/lib/since-frames'
import { Bay, useFit } from './bay'

/**
 * Option 3, out of register. All five words are printed in the same place, one on top of another,
 * off register the way a sheet comes off a press that has not been set: each in its own tint,
 * each pushed a different way. Scrolling brings them into register one at a time, so the whole
 * story is always on the plate and only one of it is ever sharp.
 */
const OFF = [
  { x: -38, y: -26 },
  { x: 44, y: 18 },
  { x: -26, y: 30 },
  { x: 34, y: -34 },
  { x: -18, y: 22 },
] as const

export function OptionRegister() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLOListElement>(null)
  const reduced = useMotion((s) => s.reduced)
  useFit(stackRef, 'one')

  useGSAP(
    () => {
      const section = sectionRef.current
      const stage = stageRef.current
      const stack = stackRef.current
      if (!section || !stage || !stack || reduced) return
      setupGsap()
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const words = Array.from(stack.querySelectorAll<HTMLElement>('[data-word]'))
        const moments = Array.from(stage.querySelectorAll<HTMLElement>('[data-moment]'))
        let live = -1
        const state = { p: 0 }
        const tween = gsap.to(state, {
          p: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: () => 'top top+=' + headerHeight(),
            end: '+=170%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 2,
          },
          onUpdate: () => {
            // One turn each, and the last one keeps its turn to the end.
            const turn = state.p * (words.length - 1)
            let read = 0
            let best = -1
            words.forEach((word, i) => {
              const reg = clamp01(1 - Math.abs(turn - i))
              word.style.setProperty('--reg', reg.toFixed(3))
              if (reg > best) {
                best = reg
                read = i
              }
            })
            if (read !== live) {
              live = read
              moments.forEach((el, i) => {
                el.dataset.on = i === read ? '1' : '0'
              })
            }
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
      id="opt-register"
      n="Option 3"
      title="Out of register"
      note="Five words in one place. One of them in register at a time."
      sectionRef={sectionRef}
      className="opt--register"
    >
      <div className="reg" ref={stageRef}>
        <h2 className="reg__title label">From design school to the whole stack</h2>
        <div className="reg__plate">
          <span className="reg__mark reg__mark--tl" aria-hidden="true" />
          <span className="reg__mark reg__mark--tr" aria-hidden="true" />
          <span className="reg__mark reg__mark--bl" aria-hidden="true" />
          <span className="reg__mark reg__mark--br" aria-hidden="true" />
          <ol className="reg__stack" ref={stackRef} aria-hidden="true">
            {SINCE_FRAMES.map((frame, i) => (
              <li
                key={frame.id}
                className="reg__word"
                data-word=""
                style={
                  {
                    '--ox': OFF[i].x + 'px',
                    '--oy': OFF[i].y + 'px',
                  } as React.CSSProperties
                }
              >
                <span>{frame.word}</span>
              </li>
            ))}
          </ol>
        </div>
        <ol className="opt-read">
          {SINCE_FRAMES.map((frame, i) => (
            <li
              key={frame.id}
              className="reg__moment"
              data-moment={i}
              data-on={i === 0 ? '1' : '0'}
            >
              <span className="opt-no">{String(i + 1).padStart(2, '0')}</span>
              <span className="opt-year">{frame.year ?? ''}</span>
              <span className="opt-caption">{frame.caption}</span>
            </li>
          ))}
        </ol>
      </div>
    </Bay>
  )
}
