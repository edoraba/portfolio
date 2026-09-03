'use client'
import { useEffect, useState } from 'react'

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Rome',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

/** Turin clock, updated on the minute. Server renders a neutral placeholder. */
export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const msToNextMinute = 60_000 - (Date.now() % 60_000)
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      tick()
      interval = window.setInterval(tick, 60_000)
    }, msToNextMinute)
    return () => {
      window.clearTimeout(timeout)
      if (interval) window.clearInterval(interval)
    }
  }, [])

  return (
    <time dateTime={now?.toISOString()} aria-live="off" suppressHydrationWarning>
      {now ? `${fmt.format(now)} CET` : '--:-- CET'}
    </time>
  )
}
