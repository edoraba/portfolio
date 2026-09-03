'use client'
import { useUi } from '@/lib/ui-store'

/** The visible way into the palette: a mono key hint in the header. */
export function PaletteTrigger({ className = '' }: { className?: string }) {
  const setOpen = useUi((s) => s.setPaletteOpen)
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open command menu"
      className={`inline-flex min-h-6 items-center py-2 label text-ink-muted transition-colors duration-200 hover:text-ink ${className}`}
    >
      <kbd className="font-mono">Cmd K</kbd>
    </button>
  )
}
