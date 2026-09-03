import { allLabs, allPages, allWorks, allWritings } from 'content-collections'

const isProd = process.env.NODE_ENV === 'production'

export const works = [...allWorks].sort((a, b) => a.order - b.order)
export const featuredWorks = works.filter((w) => w.featured)
export const labs = [...allLabs].sort((a, b) => b.date.localeCompare(a.date))
export const writings = [...allWritings]
  .filter((w) => !isProd || !w.draft)
  .sort((a, b) => b.date.localeCompare(a.date))

export const workBySlug = (slug: string) => works.find((w) => w.slug === slug)
export const labBySlug = (slug: string) => labs.find((l) => l.slug === slug)
export const writingBySlug = (slug: string) => writings.find((w) => w.slug === slug)
export const pageBySlug = (slug: string) => allPages.find((p) => p.slug === slug)
