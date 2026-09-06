'use client'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useField } from '@/lib/field/store'
import type { Cell } from '@/lib/field/quality'
import { useMotion } from '@/lib/motion/store'
import { keyedRoutes, site } from '@/lib/site'
import { THEMES } from '@/lib/themes'
import { switchTheme } from './console/theme-swatches'
import { useUi } from '@/lib/ui-store'

export type CommandItem = { group: string; label: string; href: string; hint?: string }

/** The same list the console prints and the number keys answer to, with the key as the hint. */
const PAGES: CommandItem[] = keyedRoutes.map((r) => ({
  group: 'Go',
  label: r.label,
  href: r.href,
  hint: r.n,
}))

/** Every key the site listens for, so the shortcuts are discoverable and not folklore. */
const KEYS = [
  ['0 to 4', 'Go to a page, the numbers the console prints'],
  ['G', 'Grid overlay'],
  ['T', 'Next theme'],
  ['?', 'This list'],
  ['Cmd K or /', 'Open the palette'],
  ['Esc', 'Close'],
] as const

/** How long the panel takes to leave. Matches the palette-close keyframes in globals.css. */
const LEAVE = 170

function isEditable(t: EventTarget | null) {
  return (
    t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))
  )
}

/**
 * Cmd+K palette (cmdk, MIT). Navigation, the whole index, site controls, the list of keys and a
 * few playful commands. It opens the way everything here opens, cut down from its own top edge,
 * and it has a way out as well as a way in: closing is held for the length of the animation
 * rather than left to the library, because the panel is unmounted the moment the dialog's own
 * state flips and an exit nobody can see is not an exit. Short either way, because this is a tool
 * and not a performance. Rendered in the root layout with the content index from the server.
 */
export function CommandMenu({ items }: { items: CommandItem[] }) {
  const router = useRouter()
  const open = useUi((s) => s.paletteOpen)
  const setOpen = useUi((s) => s.setPaletteOpen)
  const toggleGrid = useUi((s) => s.toggleGrid)
  const setFx = useUi((s) => s.setFx)
  const setPreference = useMotion((s) => s.setPreference)
  const setCell = useField((s) => s.setCell)
  const reduced = useMotion((s) => s.reduced)
  const [leaving, setLeaving] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const close = useCallback(() => {
    if (reduced) {
      setOpen(false)
      return
    }
    setLeaving(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setLeaving(false)
      setOpen(false)
    }, LEAVE)
  }, [reduced, setOpen])

  useEffect(() => () => clearTimeout(timer.current), [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        if (useUi.getState().paletteOpen) close()
        else setOpen(true)
      } else if (e.key === '/' && !isEditable(e.target) && !useUi.getState().paletteOpen) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setOpen, close])

  const run = (fn: () => void) => () => {
    close()
    fn()
  }
  const go = (href: string) => run(() => router.push(href))
  const dither = (cell: Cell) => run(() => setCell(cell))

  const groups = Array.from(new Set([...PAGES, ...items].map((i) => i.group)))

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(next) => (next ? setOpen(true) : close())}
      label="Command menu"
      filter={(value, search) => {
        // Plain substring match on words: fuzzy scoring surfaced "Redergo" for "grid".
        const v = value.toLowerCase()
        const terms = search.toLowerCase().split(/\s+/).filter(Boolean)
        return terms.every((t) => v.includes(t)) ? 1 : 0
      }}
      className="palette"
      overlayClassName={'palette__overlay' + (leaving ? ' is-leaving' : '')}
      contentClassName={'palette__content' + (leaving ? ' is-leaving' : '')}
    >
      <Command.Input placeholder="Type a command or search" className="palette__input" />
      <Command.List className="palette__list" data-lenis-prevent>
        <Command.Empty className="palette__empty">Nothing found.</Command.Empty>
        {groups.map((group) => (
          <Command.Group key={group} heading={group} className="palette__group">
            {[...PAGES, ...items]
              .filter((i) => i.group === group)
              .map((i) => (
                <Command.Item
                  key={i.href}
                  value={`${i.group} ${i.label}`}
                  onSelect={go(i.href)}
                  className="palette__item"
                >
                  {i.label}
                  {i.hint ? <span className="palette__hint">{i.hint}</span> : null}
                </Command.Item>
              ))}
          </Command.Group>
        ))}
        <Command.Group heading="Site" className="palette__group">
          {THEMES.map((t) => (
            <Command.Item
              key={t.name}
              value={`theme ${t.name} ${t.label}`}
              onSelect={run(() => switchTheme(t.name))}
              className="palette__item"
            >
              Theme: {t.label}
              <span className="palette__hint">{t.description}</span>
            </Command.Item>
          ))}
          <Command.Item
            value="grid overlay columns baseline"
            onSelect={run(toggleGrid)}
            className="palette__item"
          >
            Toggle grid <span className="palette__hint">G</span>
          </Command.Item>
          <Command.Item
            value="motion auto"
            onSelect={run(() => setPreference('auto'))}
            className="palette__item"
          >
            Motion: follow the system
          </Command.Item>
          <Command.Item
            value="motion full"
            onSelect={run(() => setPreference('full'))}
            className="palette__item"
          >
            Motion: full
          </Command.Item>
          <Command.Item
            value="motion reduced"
            onSelect={run(() => setPreference('reduced'))}
            className="palette__item"
          >
            Motion: reduced
          </Command.Item>
        </Command.Group>
        <Command.Group heading="Play" className="palette__group">
          <Command.Item
            value="bw black and white grayscale"
            onSelect={run(() => setFx('bw'))}
            className="palette__item"
          >
            Black and white
          </Command.Item>
          <Command.Item
            value="negative invert"
            onSelect={run(() => setFx('negative'))}
            className="palette__item"
          >
            Negative
          </Command.Item>
          <Command.Item value="dither 2 fine" onSelect={dither(2)} className="palette__item">
            Dither: fine
          </Command.Item>
          <Command.Item value="dither 3 medium" onSelect={dither(3)} className="palette__item">
            Dither: medium
          </Command.Item>
          <Command.Item value="dither 4 coarse" onSelect={dither(4)} className="palette__item">
            Dither: coarse
          </Command.Item>
          <Command.Item
            value="shake toolbox physics"
            onSelect={run(() => window.dispatchEvent(new Event('toolbox:shake')))}
            className="palette__item"
          >
            Shake the toolbox
          </Command.Item>
          <Command.Item
            value="reset"
            onSelect={run(() => {
              setFx('none')
              setCell(2)
            })}
            className="palette__item"
          >
            Reset
          </Command.Item>
        </Command.Group>
        <Command.Group heading="Keys" className="palette__group">
          {KEYS.map(([key, what]) => (
            <Command.Item
              key={key}
              value={`key ${key}`}
              onSelect={() => undefined}
              className="palette__item palette__item--flat"
            >
              {what}
              <span className="palette__hint">{key}</span>
            </Command.Item>
          ))}
        </Command.Group>
        <Command.Group heading="Contact" className="palette__group">
          <Command.Item
            value="copy email"
            onSelect={run(() => navigator.clipboard?.writeText(site.email))}
            className="palette__item"
          >
            Copy email <span className="palette__hint">{site.email}</span>
          </Command.Item>
          <Command.Item
            value="github"
            onSelect={run(() => window.open(site.github, '_blank', 'noopener'))}
            className="palette__item"
          >
            GitHub
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}
