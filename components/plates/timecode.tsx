'use client'
/**
 * The scrubber under the work stage: one pin per project on a hairline, a marker bound to the
 * plate's own progress, and Prev and Next for the keyboard. Clicking a pin scrolls to the beat
 * where that cover lands, so the pinned section is navigable without dragging the wheel.
 */
export function Timecode({
  labels,
  index,
  onSelect,
}: {
  labels: string[]
  index: number
  onSelect: (i: number) => void
}) {
  const count = labels.length
  const clamp = (i: number) => Math.max(0, Math.min(count - 1, i))
  return (
    <div className="timecode">
      <button
        type="button"
        className="timecode__step label"
        onClick={() => onSelect(clamp(index - 1))}
        disabled={index <= 0}
      >
        Prev
      </button>
      <div className="timecode__track">
        <div className="timecode__rule" aria-hidden="true" />
        <div
          className="timecode__marker"
          aria-hidden="true"
          style={{ '--at': count > 1 ? index / (count - 1) : 0 } as React.CSSProperties}
        />
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            className="timecode__pin"
            aria-label={`Go to ${label}`}
            aria-current={i === index ? 'true' : undefined}
            style={{ '--at': count > 1 ? i / (count - 1) : 0 } as React.CSSProperties}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
      <p className="timecode__read label" aria-live="polite">
        {`P/${String(index + 1).padStart(2, '0')} of ${String(count).padStart(2, '0')}`}
      </p>
      <button
        type="button"
        className="timecode__step label"
        onClick={() => onSelect(clamp(index + 1))}
        disabled={index >= count - 1}
      >
        Next
      </button>
    </div>
  )
}
