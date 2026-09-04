'use client'
import { Cell } from '@/components/sheet/cell'
import { PlateNumber } from '@/components/sheet/plate-number'
import { Sheet } from '@/components/sheet/sheet'

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <Sheet className="pb-16">
      <PlateNumber n="Error" col={1} end={3} md={{ col: 1, end: 3 }} />
      <Cell col={3} end={13} md={{ col: 3, end: 7 }} sm={{ col: 2, end: 5 }} l r t />
      <Cell col={1} end={13} l r t b className="py-10 md:py-16">
        <h1 className="display">Something broke on my side.</h1>
        <button type="button" onClick={reset} className="mt-10 label text-accent">
          Try again
        </button>
      </Cell>
    </Sheet>
  )
}
