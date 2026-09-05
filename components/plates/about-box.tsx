'use client'
import { ABOUT_FACTS, ABOUT_SENTENCE } from '@/lib/about-facts'
import { Decode } from '../decode'
import { LineReveal } from '../line-reveal'
import { Cell } from '../sheet/cell'
import { Rule } from '../sheet/rule'
import { Sheet } from '../sheet/sheet'
import { spanStyle } from '../sheet/span'
import { AboutMark } from './about-mark'
import { Plate } from './plate'

/**
 * P/02. A column of text with a ruled table of facts under it, and the mark beside them, cut
 * out of the field and drawing itself as the plate arrives. The text is never inside the mark
 * and nothing pins: the plate says who he is and gets out of the way.
 */
export function AboutBox() {
  return (
    <Plate id="about" className="about-plate" meta={<span>Who</span>}>
      {/* Below lg the mark is no longer beside it, so the sentence takes the whole band. */}
      <Cell
        col={1}
        end={9}
        row={3}
        md={{ col: 1, end: 7 }}
        sm={{ col: 1, end: 5 }}
        l
        r
        className="py-10 lg:after:hidden"
      >
        <LineReveal as="h2" className="about-plate__sentence">
          {ABOUT_SENTENCE}
        </LineReveal>
      </Cell>

      {/* Column nine is where the facts end, so the mark starts there and nothing crosses it.
          Below lg it takes a band of its own after the facts: half a sheet is not room for an
          object this size. The row goes through classes because an inline grid-row could not
          answer to a breakpoint. */}
      <Cell
        col={9}
        end={13}
        md={{ col: 1, end: 7 }}
        sm={{ col: 1, end: 5 }}
        l
        r
        flush
        className="[grid-row:5] lg:[grid-row:3/5]"
      >
        <AboutMark />
      </Cell>

      <Sheet
        as="dl"
        nested
        className="about-facts on-sheet"
        // A nested sheet only lines up with the page when it spans the full content width.
        style={{ ...spanStyle({ col: 1, end: 13 }), gridRow: 4 }}
      >
        {ABOUT_FACTS.map((f, i) => {
          const col = (i % 2) * 4 + 1
          return (
            <Cell
              key={f.label}
              col={col}
              end={col + 4}
              md={{ col: (i % 2) * 3 + 1, end: (i % 2) * 3 + 4 }}
              sm={{ col: 1, end: 5 }}
              l
              r={i % 2 === 1}
              className="about-fact"
            >
              <dt className="label text-ink-muted">
                <Decode>{f.label}</Decode>
              </dt>
              <dd className="mt-2 text-ink">{f.value}</dd>
            </Cell>
          )
        })}
      </Sheet>
      <Rule />
    </Plate>
  )
}
