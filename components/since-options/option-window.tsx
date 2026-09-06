'use client'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { gsap, setupGsap } from '@/lib/motion/gsap'
import { lerp } from '@/lib/motion/scrub'
import { useMotion } from '@/lib/motion/store'
import { headerHeight } from '@/lib/sheet'
import { SINCE_FRAMES } from '@/lib/since-frames'
import { Bay, useFit } from './bay'

/**
 * Option 2, the reading window. The column is whole and still, printed in a tone too pale to
 * read comfortably. One band across the middle of the plate inverts everything that passes
 * through it, in the same dark half of the theme the work plate goes inside, and carries the
 * moment's own line. The reader does not follow the type: the type is drawn through a slot.
 */
export function OptionWindow() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const paleRef = useRef<HTMLOListElement>(null)
  const litRef = useRef<HTMLOListElement>(null)
  const reduced = useMotion((s) => s.reduced)
  useFit(paleRef, 'each')
  useFit(litRef, 'each')

  useGSAP(
    () => {
      const section = sectionRef.current
      const stage = stageRef.current
      const pale = paleRef.current
      if (!section || !stage || !pale || reduced) return
      setupGsap()
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const rows = Array.from(pale.querySelectorAll<HTMLElement>('[data-word]'))
        const moments = Array.from(stage.querySelectorAll<HTMLElement>('[data-moment]'))
        let from = 0
        let to = 0
        let centres: number[] = []
        let slot = 0
        const slotEl = stage.querySelector<HTMLElement>('.win__slot')
        const measure = () => {
          const tall = stage.clientHeight
          slot = tall * 0.5
          // Where the slot begins, so the lit copy can be pulled back by exactly that much and
          // the two columns are one column.
          const deep = slotEl?.offsetHeight ?? 0
          stage.style.setProperty('--slot-top', ((tall - deep) / 2).toFixed(1) + 'px')
          centres = rows.map((row) => row.offsetTop + row.offsetHeight / 2)
          // First word centred in the slot at the start, last one centred at the end.
          from = slot - (centres[0] ?? 0)
          to = slot - (centres[centres.length - 1] ?? 0)
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
            end: '+=160%',
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 3,
            onRefresh: measure,
          },
          onUpdate: () => {
            const y = lerp(from, to, state.p)
            stage.style.setProperty('--draw', y.toFixed(1) + 'px')
            let read = 0
            let near = Infinity
            for (let i = 0; i < centres.length; i++) {
              const d = Math.abs(centres[i] + y - slot)
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

  const column = (ref: React.RefObject<HTMLOListElement | null>, lit: boolean) => (
    <ol className="win__column" ref={ref} aria-hidden={lit ? 'true' : undefined}>
      {SINCE_FRAMES.map((frame) => (
        <li
          key={frame.id}
          className="win__word"
          data-word=""
          style={{ '--len': frame.word.length } as React.CSSProperties}
        >
          <span>{frame.word}</span>
        </li>
      ))}
    </ol>
  )

  return (
    <Bay
      id="opt-window"
      n="Option 2"
      title="The reading window"
      note="The column stands still. A slot inverts what crosses it."
      sectionRef={sectionRef}
      className="opt--window"
    >
      <div className="win" ref={stageRef}>
        <h2 className="win__title label">From design school to the whole stack</h2>
        <div className="win__pale">{column(paleRef, false)}</div>
        <div className="win__slot">
          <div className="win__lit">{column(litRef, true)}</div>
        </div>
        <ol className="opt-read">
          {SINCE_FRAMES.map((frame, i) => (
            <li
              key={frame.id}
              className="win__moment"
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
