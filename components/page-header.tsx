import { ConsolePlate } from './console/console-plate'
import { Cell } from './sheet/cell'
import { PlateNumber } from './sheet/plate-number'
import { Rule } from './sheet/rule'
import { Sheet } from './sheet/sheet'

export type Fact = { label: string; value: string }

/**
 * Title band of every page except the home: a mono plate cell, the title cell spanning eight
 * columns with its lede, and the readout on the right. The readout is what the page is made of,
 * in the console's voice: how many case studies, what it was set in, when it was last touched.
 * Without it that cell is an empty rectangle for the width of a screen, which is the one thing a
 * ruled sheet cannot carry.
 */
export function PageHeader({
  n,
  eyebrow,
  title,
  lede,
  facts = [],
}: {
  n?: string
  eyebrow?: string
  title: string
  lede?: string
  facts?: Fact[]
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
      <Cell col={9} end={13} l r className="hidden pt-8 pb-10 md:pt-12 md:pb-14 lg:block">
        {facts.length > 0 ? (
          <dl className="page-header__facts">
            {facts.map((f) => (
              <div key={f.label} className="page-header__fact">
                <dt className="label text-ink-muted">{f.label}</dt>
                <dd className="label text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Cell>
      <Rule />
    </Sheet>
  )
}
