import type { Metadata } from 'next'
import { MdxPage } from '@/components/mdx-page'
import { Aside, AsideRow } from '@/components/page-aside'
import { pageBySlug } from '@/lib/content'
import { site } from '@/lib/site'
import { THEMES } from '@/lib/themes'

const page = pageBySlug('colophon')

export const metadata: Metadata = page ? { title: page.title, description: page.description } : {}

export default function ColophonPage() {
  return (
    <MdxPage
      slug="colophon"
      n="P/05"
      facts={[
        { label: 'Display', value: 'Funnel Display' },
        { label: 'Text', value: 'Switzer' },
        { label: 'Mono', value: 'Geist Mono' },
        { label: 'Worlds', value: String(THEMES.length) },
      ]}
      aside={
        <>
          {/* Names only: the descriptions are a sentence each and belong in the palette, where
              there is room to read them. */}
          <Aside heading="Six worlds">
            {THEMES.map((t, i) => (
              <AsideRow key={t.name} label={String(i + 1).padStart(2, '0')} value={t.label} />
            ))}
          </Aside>
          <Aside heading="Keys">
            <AsideRow label="0 to 4" value="Pages" />
            <AsideRow label="G" value="Grid" />
            <AsideRow label="T" value="Theme" />
            <AsideRow label="Cmd K" value="Palette" />
          </Aside>
          <Aside heading="Source">
            <AsideRow label="Repository" value="edoraba/portfolio" href={site.repo} />
          </Aside>
        </>
      }
    />
  )
}
