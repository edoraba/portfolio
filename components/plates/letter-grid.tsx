/**
 * The word WORK repeated as a field of letters behind the covers, purely decorative. Rows slide
 * in from alternating sides while the plate is pinned and part again at the end, so the covers
 * always sit on a moving ground. Hidden below 1024px and under reduced motion.
 */
const WORD = ['W', 'O', 'R', 'K'] as const
const PER_ROW = 7

export function LetterGrid() {
  return (
    <div className="letters" aria-hidden="true">
      {WORD.map((letter, row) => (
        <div key={letter} className="letters__row" data-row={row}>
          {Array.from({ length: PER_ROW }, (_, i) => (
            <span key={i} className="letters__glyph">
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
