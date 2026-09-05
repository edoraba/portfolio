'use client'
import { ScrollTrigger, setupGsap } from './gsap'

export const RULE_SELECTOR = '.cell:not(.is-drawn), .rule:not(.is-drawn)'
export const RULE_STAGGER_MS = 60

/**
 * Draws the hairlines of cells and rules as they enter the viewport: each element gets
 * `is-drawn` (CSS animates the line from scale 0) with a 60ms stagger inside a batch, in DOM
 * order. Returns a function that kills the triggers it created. Elements already drawn are
 * skipped, so calling it again after the DOM changes is cheap.
 */
export function drawRules(root: ParentNode = document): () => void {
  setupGsap()
  const targets = Array.from(root.querySelectorAll<HTMLElement>(RULE_SELECTOR))
  if (targets.length === 0) return () => {}
  const timers: number[] = []
  const triggers = ScrollTrigger.batch(targets, {
    start: 'top bottom',
    once: true,
    onEnter: (batch) => {
      batch.forEach((el, i) => {
        timers.push(window.setTimeout(() => el.classList.add('is-drawn'), i * RULE_STAGGER_MS))
      })
    },
  })
  return () => {
    timers.forEach((t) => window.clearTimeout(t))
    triggers.forEach((t) => t.kill())
  }
}

/** Reduced motion or no JS motion: everything is drawn at once. */
export function drawAllRules(root: ParentNode = document) {
  root.querySelectorAll(RULE_SELECTOR).forEach((el) => el.classList.add('is-drawn'))
}
