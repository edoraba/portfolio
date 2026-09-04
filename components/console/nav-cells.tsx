'use client'
import Link from 'next/link'
import { useConsole } from '@/lib/console-store'
import { navItems } from '@/lib/site'
import { FlipText } from '../flip-text'
import { Cell } from '../sheet/cell'

/**
 * The four primary links as one cell each in the header's top row (lg only). Hovering echoes
 * the label in the console cell.
 */
export function NavCells() {
  const setHover = useConsole((s) => s.setHover)
  return (
    <nav aria-label="Primary" className="contents">
      {navItems.map((item, i) => (
        <Cell
          key={item.href}
          as="div"
          col={9 + i}
          end={10 + i}
          row={1}
          l
          b
          r={i === navItems.length - 1}
          flush
          className="hidden lg:block"
        >
          <Link
            href={item.href}
            transitionTypes={['nav-forward']}
            className="console-link flip label"
            onPointerEnter={() => setHover(item.label)}
            onPointerLeave={() => setHover(null)}
            onFocus={() => setHover(item.label)}
            onBlur={() => setHover(null)}
          >
            <span className="text-accent">{item.n}</span>
            <FlipText className="ml-2 text-ink" alt={`${item.label} ${item.n}`}>
              {item.label}
            </FlipText>
          </Link>
        </Cell>
      ))}
    </nav>
  )
}
