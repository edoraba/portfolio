'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { useConsole } from '@/lib/console-store'
import { site } from '@/lib/site'
import { useUi } from '@/lib/ui-store'
import { CopyEmail } from '../copy-email'
import { Cell } from '../sheet/cell'
import { Sheet } from '../sheet/sheet'
import { ConsoleLine } from './console-line'
import { MobileMenu } from './mobile-menu'
import { Monogram } from './monogram'
import { NavCells } from './nav-cells'
import { ThemeSwatches, switchTheme } from './theme-swatches'
import { useTheme } from '@/lib/theme-store'
import { nextTheme, themeByName } from '@/lib/themes'
import { useMounted } from '@/lib/use-mounted'

/**
 * The console: a two-row sheet of cells at the top of every page. Row one is identity and
 * navigation, row two is the live readout and the site's controls. Below lg the navigation
 * collapses into a MENU button that opens the full-screen menu.
 */
export function SiteHeader() {
  const setHover = useConsole((s) => s.setHover)
  const grid = useUi((s) => s.grid)
  const toggleGrid = useUi((s) => s.toggleGrid)
  const setPaletteOpen = useUi((s) => s.setPaletteOpen)
  const menuOpen = useUi((s) => s.menuOpen)
  const setMenuOpen = useUi((s) => s.setMenuOpen)
  const theme = useTheme((s) => s.theme)
  const mounted = useMounted()
  const menuButton = useRef<HTMLButtonElement>(null)
  const echo = (label: string) => ({
    onPointerEnter: () => setHover(label),
    onPointerLeave: () => setHover(null),
    onFocus: () => setHover(label),
    onBlur: () => setHover(null),
  })
  const current = themeByName(theme)

  return (
    <>
      <Sheet
        as="header"
        className="site-header"
        style={{ viewTransitionName: 'site-header' } as React.CSSProperties}
      >
        {/* Row 1 */}
        <Cell col={1} end={3} md={{ col: 1, end: 3 }} sm={{ col: 1, end: 2 }} row={1} l b flush>
          <Link href="/" aria-label={site.name} className="console-link" {...echo(site.name)}>
            <Monogram size={20} className="text-ink" />
          </Link>
        </Cell>
        <Cell col={3} end={9} row={1} l b className="hidden lg:block">
          <p className="truncate label text-ink-muted">{site.status1}</p>
        </Cell>
        <NavCells />

        {/* Row 1, below lg: current swatch and MENU */}
        <Cell
          col={3}
          end={4}
          md={{ col: 3, end: 4 }}
          sm={{ col: 2, end: 3 }}
          row={1}
          l
          b
          flush
          className="lg:hidden"
        >
          <button
            type="button"
            className="console-link swatch"
            style={{ '--swatch': current.tokens.canvas } as React.CSSProperties}
            aria-label={`Theme: ${current.label}. Next theme`}
            onClick={() => switchTheme(nextTheme(theme))}
          />
        </Cell>
        <Cell
          col={4}
          end={7}
          md={{ col: 4, end: 7 }}
          sm={{ col: 3, end: 5 }}
          row={1}
          l
          r
          b
          flush
          className="lg:hidden"
        >
          <button
            ref={menuButton}
            type="button"
            className="console-link label"
            aria-expanded={mounted ? menuOpen : false}
            aria-controls="site-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </Cell>

        {/* Row 2 */}
        <Cell col={1} end={3} md={{ col: 1, end: 4 }} sm={{ col: 1, end: 5 }} row={2} l b r>
          <ConsoleLine />
        </Cell>
        <Cell col={3} end={9} md={{ col: 4, end: 7 }} row={2} l b className="hidden md:block">
          <p className="truncate label text-ink-muted">
            <span className="hidden lg:inline">{site.status2} </span>
            <CopyEmail className="label" />
          </p>
        </Cell>
        <Cell col={9} end={11} row={2} l b flush className="hidden lg:flex lg:items-center">
          <ThemeSwatches className="px-[6px]" />
        </Cell>
        <Cell col={11} end={12} row={2} l b flush className="hidden lg:block">
          <button
            type="button"
            className="console-link label"
            onClick={() => setPaletteOpen(true)}
            {...echo('Command palette')}
          >
            <kbd className="font-mono">Cmd K</kbd>
          </button>
        </Cell>
        <Cell col={12} end={13} row={2} l r b flush className="hidden lg:block">
          <button
            type="button"
            className="console-link label"
            aria-pressed={mounted ? grid : false}
            onClick={toggleGrid}
            {...echo('Grid overlay')}
          >
            <kbd className="font-mono">G</kbd>
            <span className="ml-2 text-ink-muted">Grid</span>
          </button>
        </Cell>
      </Sheet>
      <MobileMenu returnTo={menuButton} />
    </>
  )
}
