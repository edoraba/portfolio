import { allLabs, allPages, allWorks, allWritings } from 'content-collections'

export const isProd = process.env.NODE_ENV === 'production'

export const works = [...allWorks].sort((a, b) => a.order - b.order)
export const featuredWorks = works.filter((w) => w.featured)
export const labs = [...allLabs].sort((a, b) => b.date.localeCompare(a.date))

// Drafts are visible in development and excluded from production listings.
// The detail route still receives every slug so static params are never empty
// (Cache Components requires at least one), and answers 404 for drafts in production.
export const writingsIncludingDrafts = [...allWritings].sort((a, b) => b.date.localeCompare(a.date))
export const writings = writingsIncludingDrafts.filter((w) => !isProd || !w.draft)

export const workBySlug = (slug: string) => works.find((w) => w.slug === slug)
export const labBySlug = (slug: string) => labs.find((l) => l.slug === slug)
export const writingBySlug = (slug: string) => writings.find((w) => w.slug === slug)
export const pageBySlug = (slug: string) => allPages.find((p) => p.slug === slug)
