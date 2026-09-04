/**
 * The five frames of the P/06 tunnel, in order. Every line comes from content/pages/about.mdx.
 * The two study frames have no year yet: TODO(edoardo) confirm the years for Politecnico and
 * IAAD, then add `year` here. A frame without a year simply prints its caption.
 */
export type Frame = { id: string; year?: string; caption: string }

export const SINCE_FRAMES: Frame[] = [
  { id: 'politecnico', caption: 'Two years of energy engineering, Politecnico di Torino' },
  { id: 'iaad', caption: 'Digital Communication Design, IAAD' },
  { id: 'redergo', year: '2020', caption: 'Joining Redergo, designing interfaces in Figma' },
  { id: 'stopped', year: '2021', caption: 'Stopped handing off, started shipping the code' },
  { id: 'refattura', year: '2026', caption: 'Refattura, 12,000+ documents generated' },
]
