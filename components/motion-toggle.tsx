'use client'
import { useMotion, type MotionPreference } from '@/lib/motion/store'
import { useMounted } from '@/lib/use-mounted'

const OPTIONS: { value: MotionPreference; label: string }[] = [
  { value: 'auto', label: 'System' },
  { value: 'full', label: 'Full' },
  { value: 'reduced', label: 'Reduced' },
]

/** Site-level motion preference, mirrored to html[data-motion]. Reduced motion is a design, not a kill switch. */
export function MotionToggle() {
  const preference = useMotion((s) => s.preference)
  const setPreference = useMotion((s) => s.setPreference)
  const mounted = useMounted()
  return (
    <div
      role="radiogroup"
      aria-label="Motion"
      className="flex flex-wrap gap-x-4 label text-ink-muted"
    >
      {OPTIONS.map((o) => {
        const on = mounted && preference === o.value
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setPreference(o.value)}
            className={`inline-flex min-h-6 items-center py-2 transition-colors hover:text-ink ${on ? 'theme-switch__on' : ''}`}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
