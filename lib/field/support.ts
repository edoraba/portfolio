import { isReduced } from '@/lib/motion/store'

// Feature detection for the field. Runs on the client only.
// Motion preference comes from the site store (OS setting or the visible toggle).
export function prefersReducedMotion(): boolean {
  return isReduced()
}

const SOFTWARE = /swiftshader|llvmpipe|softpipe|software|mesa offscreen|microsoft basic render/i

/**
 * True only for a hardware accelerated WebGL2 context. Software rasterizers (headless
 * browsers, some virtual machines) would turn the field into a main-thread cost with no
 * visual payoff, so they get the static fallback like everyone else without WebGL.
 */
export function hasHardwareWebGL2(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true })
    if (!gl) return false
    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = info
      ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
      : String(gl.getParameter(gl.RENDERER))
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return !SOFTWARE.test(renderer)
  } catch {
    return false
  }
}

export function supportsSvgMask(): boolean {
  return (
    typeof CSS !== 'undefined' &&
    (CSS.supports('mask-image', 'url(#x)') || CSS.supports('-webkit-mask-image', 'url(#x)'))
  )
}

// The field runs only when every part of the experience can be delivered.
// Otherwise the static dither fallback in the hero is the design.
export function canRenderField(): boolean {
  if (typeof window === 'undefined') return false
  return !prefersReducedMotion() && hasHardwareWebGL2() && supportsSvgMask()
}
