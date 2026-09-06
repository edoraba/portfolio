'use client'

/**
 * Whether the page under the reader arrived through a navigation rather than a load.
 *
 * It matters because the site reveals itself twice otherwise: the page transition wipes the new
 * page in, and then everything inside it that reveals on arrival (the hairlines drawing from
 * nothing, the mono labels decoding) runs its own entrance on top. The transition is the
 * entrance; anything already on screen when it lands should simply be there.
 *
 * The mark is set before React starts the navigation, from the click, so it is already true by
 * the time the new page's effects run.
 */
let at = -Infinity

/** How long after a navigation an arrival still counts as one. Longer than the wipe. */
const WINDOW = 1400

export function markNavigation() {
  at = performance.now()
}

export function isArriving() {
  return performance.now() - at < WINDOW
}

/** True when the element is on screen right now, and so was part of what the transition showed. */
export function onScreen(el: Element) {
  const r = el.getBoundingClientRect()
  return r.bottom > 0 && r.top < window.innerHeight
}
