// GLSL ES 3.00 on WebGL2. One full-screen triangle, everything happens per cell.
export const UNIFORMS = [
  'uCells',
  'uAspect',
  'uTime',
  'uPointer',
  'uPointerStrength',
  'uIntensity',
  'uFloor',
  'uOn',
  'uOff',
  'uAccent',
  'uMode',
  'uBand',
  'uOffset',
] as const

export const vertex = /* glsl */ `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

export const fragment = /* glsl */ `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 uCells;           // canvas size in cells (one cell = one canvas pixel)
uniform float uAspect;         // width / height
uniform float uTime;           // seconds
uniform vec2 uPointer;         // pointer in cell coordinates, y up
uniform float uPointerStrength;// 0..1 smoothed presence
uniform float uIntensity;      // 0..1 overall visibility
uniform float uFloor;          // minimum density (keeps text legible in hero mode)
uniform vec3 uOn;
uniform vec3 uOff;
uniform vec3 uAccent;
uniform int uMode;             // 0 hero, 1 band, 2 off, 3 calibrate (full, unmasked)
uniform vec2 uBand;            // band range in 0..1 from the top, band mode only
uniform vec2 uOffset;            // pattern offset in the same space as p, quantised to cells

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p = p * 2.03 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return v;
}

const int bayer[64] = int[64](
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21
);

void main() {
  vec2 cell = floor(vUv * uCells);
  vec2 p = cell / uCells;
  p.x *= uAspect;

  // Domain-warped flow, slow. The noise is sampled at an offset position so the pattern can be
  // pinned to the page while the canvas stays fixed to the viewport; the pointer maths below
  // keeps using the unshifted p, so the light stays under the cursor.
  vec2 pn = p + uOffset;
  float t = uTime * 0.06;
  vec2 q = vec2(fbm(pn * 1.6 + t), fbm(pn * 1.6 - t * 0.7 + 5.2));
  float d = fbm(pn * 2.2 + 1.5 * q + vec2(t * 0.3, -t * 0.2));
  d = smoothstep(0.28, 0.82, d);

  // Pointer light: brighter and accented near the pointer, radius relative to the short side.
  vec2 pc = uPointer / uCells;
  pc.x *= uAspect;
  float dist = distance(p, pc);
  float near = (1.0 - smoothstep(0.0, 0.45, dist)) * uPointerStrength;
  // Behind the footer the field is texture, not a spotlight: keep the pointer light faint.
  if (uMode == 1) near *= 0.2;
  d = d * (0.6 + 0.4 * near) + near * 0.35;

  // Floor keeps the headline legible, intensity fades the whole field.
  d = uFloor + d * (1.0 - uFloor);
  d *= uIntensity;

  // Band mode: the dither thins out towards the top edge instead of starting with a hard line.
  // The fade is a share of the band, not a fixed slice of the viewport: a fixed one washed out
  // a short band completely.
  float yTop = 1.0 - vUv.y;
  if (uMode == 1) d *= smoothstep(uBand.x, uBand.x + (uBand.y - uBand.x) * 0.55, yTop);

  int bx = int(mod(cell.x, 8.0));
  int by = int(mod(cell.y, 8.0));
  float threshold = (float(bayer[by * 8 + bx]) + 0.5) / 64.0;
  float on = step(threshold, d);

  vec3 col = mix(uOff, mix(uOn, uAccent, near * 0.9), on);

  float alpha = 1.0;
  if (uMode == 1) {
    alpha = step(uBand.x, yTop) * step(yTop, uBand.y);
  }
  if (uMode == 2) alpha = 0.0;

  fragColor = vec4(col, alpha);
}
`
