// Field intensity on the home page: full at the top, gone after 80 percent of the hero height.
export function heroIntensity(scrollY: number, heroHeight: number): number {
  const end = heroHeight * 0.8
  if (end <= 0) return 0
  return Math.min(1, Math.max(0, 1 - scrollY / end))
}
