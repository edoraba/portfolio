import type { Metadata } from 'next'
import { MdxPage } from '@/components/mdx-page'
import { pageBySlug } from '@/lib/content'

const page = pageBySlug('colophon')

export const metadata: Metadata = page ? { title: page.title, description: page.description } : {}

export default function ColophonPage() {
  return <MdxPage slug="colophon" />
}
