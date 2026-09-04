'use client'
import { useEffect, useRef } from 'react'
import Tempus from 'tempus'
import { BODY_OPTIONS, insideBounds, seedFor, wallsFor } from '@/lib/physics/toolbox'
import { useMotion } from '@/lib/motion/store'
import { useTheme } from '@/lib/theme-store'

const FLIP_MS = 1500

/**
 * The tags fall into the ruled container and stay there. Matter.js is imported only when the
 * plate is within a screen of the viewport, the engine runs on the shared clock and sleeps when
 * the plate leaves, and the DOM list is the source of truth: if anything fails the tags simply
 * stay in flow. Dragging and throwing work with a pointer or a finger.
 */
export function ToolboxStage({ tags }: { tags: string[] }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const reduced = useMotion((s) => s.reduced)

  useEffect(() => {
    const stage = stageRef.current
    const list = listRef.current
    if (!stage || !list || reduced) return

    let disposed = false
    let dispose: (() => void) | undefined

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || dispose || disposed) return
        near.disconnect()
        void start()
      },
      { rootMargin: '100% 0px' },
    )
    near.observe(stage)

    async function start() {
      let Matter: typeof import('matter-js')
      try {
        Matter = await import('matter-js')
      } catch {
        console.warn('Toolbox: physics unavailable, the tags stay in flow')
        return
      }
      if (disposed || !stage || !list) return
      const items = Array.from(list.querySelectorAll<HTMLElement>('li'))
      const rect = { width: stage.clientWidth, height: stage.clientHeight }
      if (rect.width < 200 || rect.height < 200) return

      const sizes = items.map((el) => ({
        width: el.offsetWidth,
        height: el.offsetHeight,
      }))
      // Once the engine owns them the tags are positioned absolutely inside the container.
      list.dataset.physics = 'on'

      const engine = Matter.Engine.create({ gravity: { x: 0, y: 1, scale: 0.0012 } })
      const bodies = items.map((_, i) => {
        const seed = seedFor(i, rect, sizes[i], items.length)
        return Matter.Bodies.rectangle(seed.x, seed.y, seed.width, seed.height, {
          ...BODY_OPTIONS,
          angle: seed.angle,
        })
      })
      const walls = wallsFor(rect).map((w) =>
        Matter.Bodies.rectangle(w.x, w.y, w.width, w.height, { isStatic: true }),
      )
      Matter.Composite.add(engine.world, walls)
      // Drop them in a shower rather than all at once.
      bodies.forEach((body, i) => {
        window.setTimeout(() => {
          if (!disposed) Matter.Composite.add(engine.world, body)
        }, i * 40)
      })

      const mouse = Matter.Mouse.create(stage)
      const drag = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.16, render: { visible: false } },
      })
      Matter.Composite.add(engine.world, drag)
      // Let the page keep scrolling over the stage; only a grabbed tag captures the pointer.
      stage.removeEventListener(
        'wheel',
        (mouse as unknown as { mousewheel: EventListener }).mousewheel,
      )

      let visible = true
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 })
      io.observe(stage)

      const unsub = Tempus.add(
        ({ deltaTime }) => {
          if (!visible || document.hidden) return
          Matter.Engine.update(engine, Math.min(deltaTime, 33))
          bodies.forEach((body, i) => {
            const p = insideBounds(body.position, rect, sizes[i])
            if (p.x !== body.position.x || p.y !== body.position.y) {
              Matter.Body.setPosition(body, p)
            }
            items[i].style.transform = `translate3d(${(p.x - sizes[i].width / 2).toFixed(1)}px, ${(
              p.y -
              sizes[i].height / 2
            ).toFixed(1)}px, 0) rotate(${body.angle.toFixed(3)}rad)`
          })
        },
        { label: 'toolbox' },
      )

      // Switching the world turns the toolbox upside down for a moment.
      const unTheme = useTheme.subscribe(() => {
        engine.gravity.y = -1
        window.setTimeout(() => {
          engine.gravity.y = 1
        }, FLIP_MS)
      })

      const onShake = () => {
        for (const body of bodies) {
          Matter.Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * 0.06,
            y: -Math.random() * 0.06,
          })
        }
      }
      window.addEventListener('toolbox:shake', onShake)

      const onResize = () => {
        rect.width = stage.clientWidth
        rect.height = stage.clientHeight
      }
      window.addEventListener('resize', onResize)

      dispose = () => {
        unsub?.()
        io.disconnect()
        unTheme()
        window.removeEventListener('toolbox:shake', onShake)
        window.removeEventListener('resize', onResize)
        Matter.Composite.clear(engine.world, false)
        Matter.Engine.clear(engine)
        delete list.dataset.physics
        items.forEach((el) => (el.style.transform = ''))
      }
    }

    return () => {
      disposed = true
      near.disconnect()
      dispose?.()
    }
  }, [reduced])

  return (
    <div ref={stageRef} className="toolbox">
      <ul ref={listRef} className="toolbox__list" aria-label="Stack">
        {tags.map((tag) => (
          <li key={tag} className="toolbox__tag label">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  )
}
