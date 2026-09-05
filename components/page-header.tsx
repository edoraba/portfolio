import { ConsolePlate } from './console/console-plate'
import { Cell } from './sheet/cell'
import { PlateNumber } from './sheet/plate-number'
import { Rule } from './sheet/rule'
import { Sheet } from './sheet/sheet'

/**
 * Title band of every page except the home: a mono plate cell, the title cell spanning eight
 * columns with its lede, and an empty ruled cell on the right that keeps the sheet visible.
 */
export function PageHeader({
  n,
  eyebrow,
  title,
  lede,
}: {
  n?: string
  eyebrow?: string
  title: string
  lede?: string
}) {
  return (
    <Sheet as="header" className="page-header">
      <ConsolePlate label={title} />
      <Rule />
      <PlateNumber n={n ?? 'P/'} label={eyebrow} col={1} end={3} md={{ col: 1, end: 3 }} />
      <Cell col={3} end={13} md={{ col: 3, end: 7 }} sm={{ col: 2, end: 5 }} l r />
      <Rule />
      <Cell
        col={1}
        end={9}
        md={{ col: 1, end: 7 }}
        sm={{ col: 1, end: 5 }}
        l
        r
        className="pt-8 pb-10 md:pt-12 md:pb-14 lg:after:hidden"
      >
        <h1 className="display">{title}</h1>
        {lede ? <p className="mt-8 measure text-ink-muted">{lede}</p> : null}
      </Cell>
      <Cell col={9} end={13} l r className="hidden lg:block" />
      <Rule />
    </Sheet>
  )
}
