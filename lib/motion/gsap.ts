'use client'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Tempus from 'tempus'

let ready = false

/**
 * Registers the plugins once, creates the two site eases and hands GSAP's clock to Tempus,
 * so the field, Lenis and every tween tick in one requestAnimationFrame in a fixed order.
 */
export function setupGsap() {
  if (ready || typeof window === 'undefined') return gsap
  ready = true
  gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText)
  CustomEase.create('editorial', '0.625, 0.05, 0, 1')
  CustomEase.create('wipe', '0.56, 0, 0.35, 0.98')
  gsap.ticker.remove(gsap.updateRoot)
  Tempus.add(({ time }) => gsap.updateRoot(time / 1000), { order: -10, label: 'gsap' })
  gsap.ticker.lagSmoothing(0)
  return gsap
}

export { gsap, ScrollTrigger, SplitText }

export const T = {
  line: 0.8,
  lineStagger: 0.08,
  lineStaggerBudget: 0.5,
  fade: 0.4,
  decodeTickMs: 40,
  decodeSteps: 12,
} as const
