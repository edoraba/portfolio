/**
 * The five moments of P/06, in order. Every caption comes from content/pages/about.mdx, and every
 * word is that moment reduced to the one thing it changed: the road is read as five stations, not
 * as five sentences. The two study frames have no year yet: TODO(edoardo) confirm the years for
 * Politecnico and IAAD, then add `year` here. A moment without a year prints its word and caption
 * and leaves the year column empty.
 */
export type Frame = { id: string; word: string; year?: string; caption: string }

export const SINCE_FRAMES: Frame[] = [
  {
    id: 'politecnico',
    word: 'Systems',
    caption: 'Two years of energy engineering, Politecnico di Torino',
  },
  { id: 'iaad', word: 'Design', caption: 'Digital Communication Design, IAAD' },
  {
    id: 'redergo',
    word: 'Handoff',
    year: '2020',
    caption: 'Joining Redergo, designing interfaces in Figma',
  },
  {
    id: 'stopped',
    word: 'Code',
    year: '2021',
    caption: 'Stopped handing off, started shipping the code',
  },
  {
    id: 'refattura',
    word: 'Stack',
    year: '2026',
    caption: 'Refattura, 12,000+ documents generated',
  },
]
