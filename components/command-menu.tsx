'use client'
import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useField } from '@/lib/field/store'
import type { Cell } from '@/lib/field/quality'
import { useMotion } from '@/lib/motion/store'
import { site } from '@/lib/site'
import { THEMES } from '@/lib/themes'
import { switchTheme } from './console/theme-swatches'
import { useUi } from '@/lib/ui-store'

export type CommandItem = { group: string; label: string; href: string; hint?: string }

const PAGES: CommandItem[] = [
  { group: 'Go', label: 'Home', href: '/' },
  { group: 'Go', label: 'Work', href: '/work' },
  { group: 'Go', label: 'Lab', href: '/lab' },
  { group: 'Go', label: 'Writing', href: '/writing' },
  { group: 'Go', label: 'About', href: '/about' },
  { group: 'Go', label: 'Now', href: '/now' },
  { group: 'Go', label: 'Colophon', href: '/colophon' },
]

function isEditable(t: EventTarget | null) {
  return (
    t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))
  )
}

/**
 * Cmd+K palette (cmdk, MIT). Navigation, the whole index, site controls and a few playful
 * commands in the Toyfight spirit. No open animation: a tool used many times a day should
 * not perform. Rendered in the root layout with the content index passed from the server.
 */
export function CommandMenu({ items }: { items: CommandItem[] }) {
  const router = useRouter()
  const open = useUi((s) => s.paletteOpen)
  const setOpen = useUi((s) => s.setPaletteOpen)
  const toggleGrid = useUi((s) => s.toggleGrid)
  const setFx = useUi((s) => s.setFx)
  const setPreference = useMotion((s) => s.setPreference)
  const setCell = useField((s) => s.setCell)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!useUi.getState().paletteOpen)
      } else if (e.key === '/' && !isEditable(e.target) && !useUi.getState().paletteOpen) {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [setOpen])

  const run = (fn: () => void) => () => {
    setOpen(false)
    fn()
  }
  const go = (href: string) => run(() => router.push(href))
  const dither = (cell: Cell) => run(() => setCell(cell))

  const groups = Array.from(new Set([...PAGES, ...items].map((i) => i.group)))

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      filter={(value, search) => {
        // Plain substring match on words: fuzzy scoring surfaced "Redergo" for "grid".
        const v = value.toLowerCase()
        const terms = search.toLowerCase().split(/\s+/).filter(Boolean)
        return terms.every((t) => v.includes(t)) ? 1 : 0
      }}
      className="palette"
      overlayClassName="palette__overlay"
      contentClassName="palette__content"
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
