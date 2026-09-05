'use client'
import { Cell } from '@/components/sheet/cell'
import { PlateNumber } from '@/components/sheet/plate-number'
import { Rule } from '@/components/sheet/rule'
import { Sheet } from '@/components/sheet/sheet'

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Sheet className="pb-16">
      <Rule />
      <PlateNumber n="Error" col={1} end={3} md={{ col: 1, end: 3 }} />
      <Cell col={3} end={13} md={{ col: 3, end: 7 }} sm={{ col: 2, end: 5 }} l r />
      <Rule />
      <Cell col={1} end={13} l r className="py-10 md:py-16">
        <h1 className="display">Something broke on my side.</h1>
        <button type="button" onClick={reset} className="mt-10 label text-accent">
          Try again
        </button>
      </Cell>
    </Sheet>
  )
}
