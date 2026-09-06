import type { Metadata } from 'next'
import { PageTransition } from '@/components/page-transition'
import { Cell } from '@/components/sheet/cell'
import { Rule } from '@/components/sheet/rule'
import { Sheet } from '@/components/sheet/sheet'
import { OptionLeading } from '@/components/since-options/option-leading'
import { OptionRegister } from '@/components/since-options/option-register'
import { OptionSpecimen } from '@/components/since-options/option-specimen'
import { OptionWindow } from '@/components/since-options/option-window'
import { SmoothScroll } from '@/components/smooth-scroll'
import './options.css'

export const metadata: Metadata = { title: 'P/06 candidates', robots: { index: false } }

/**
 * Provisional. Four treatments for P/06, one under the other, in the real grid and the real
 * fonts so they can be judged against each other and in any of the six themes. Not linked from
 * anywhere. Delete this route, `components/since-options` and `options.css` once one is chosen.
 */
export default function SinceOptionsPage() {
  return (
    <PageTransition>
      <SmoothScroll />
      <Sheet as="section" className="pt-10 pb-6">
        <Rule />
        <Cell col={1} end={7} md={{ col: 1, end: 5 }} sm={{ col: 1, end: 5 }} l r>
          <p className="label text-ink-muted">Provisional</p>
          <h1 className="mt-3 display">Four ways to tell P/06</h1>
          <p className="mt-4 max-w-[52ch] text-ink-muted">
            The same five moments, four treatments. Scroll each one to the end: every bay pins the
            way the real plate would. Press T to change the world, G for the grid.
          </p>
        </Cell>
        <Cell col={7} end={13} md={{ col: 5, end: 7 }} sm={{ col: 1, end: 5 }} l r>
          <ol className="grid gap-2 label text-ink-muted">
            <li>1 The specimen, one size and five cuts</li>
            <li>2 The reading window, a slot that inverts</li>
            <li>3 Out of register, five words in one place</li>
            <li>4 The leading, text opened until it is type</li>
          </ol>
        </Cell>
      </Sheet>

      <OptionSpecimen />
      <OptionWindow />
      <OptionRegister />
      <OptionLeading />

      <Sheet as="section" className="py-16">
        <Rule />
        <Cell col={1} end={13} l r>
          <p className="label text-ink-muted">End of the candidates</p>
        </Cell>
      </Sheet>
    </PageTransition>
  )
}
