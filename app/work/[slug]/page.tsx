import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ViewTransition } from 'react'
import { ConsolePlate } from '@/components/console/console-plate'
import { Decode } from '@/components/decode'
import { Mdx } from '@/components/mdx-components'
import { PageTransition } from '@/components/page-transition'
import { Cell } from '@/components/sheet/cell'
import { PlateNumber } from '@/components/sheet/plate-number'
import { Rule } from '@/components/sheet/rule'
import { Sheet } from '@/components/sheet/sheet'
import { Toc } from '@/components/toc'
import { workBySlug, works } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const w = workBySlug(slug)
  return w ? { title: w.title, description: w.summary } : {}
}

export default async function WorkDetail({ params }: Props) {
  const { slug } = await params
  const w = workBySlug(slug)
  if (!w) notFound()
  const meta: [string, string][] = [
    ['Client', w.client],
    ['Year', w.year],
    ['Role', w.role],
    ['Team', w.team],
    ['Stack', w.stack.join(', ')],
    ['Status', w.status],
    ...Object.entries(w.links).map(([k, href]) => [k, href] as [string, string]),
  ]
  const isLink = (v: string) => /^https?:\/\//.test(v)
  return (
    <PageTransition>
      <article className="pb-16">
        <ConsolePlate label={`P/${String(w.order).padStart(2, '0')} ${w.client}`} />
        <Sheet as="header">
          <Rule />
          <PlateNumber n={w.order} col={1} end={3} md={{ col: 1, end: 3 }} />
          <Cell col={3} end={13} md={{ col: 3, end: 7 }} sm={{ col: 2, end: 5 }} l r>
            <Link
              href="/work"
              transitionTypes={['nav-back']}
              className="label text-ink-muted hover:text-ink"
            >
              Back to work
            </Link>
          </Cell>
          <Rule />
          <Cell col={1} end={10} md={{ col: 1, end: 7 }} l className="pt-8 pb-10 md:pt-12">
            <ViewTransition name={`work-title-${w.slug}`} share="morph" default="none">
              <h1 className="display">{w.title}</h1>
            </ViewTransition>
            <p className="mt-8 measure text-ink-muted">{w.summary}</p>
          </Cell>
          <Cell col={10} end={13} l r className="hidden lg:block" />
        </Sheet>

        <Sheet as="dl" className="case-meta">
          <Rule />
          {meta.map(([k, v], i) => {
            const c = (i % 3) * 4 + 1
            return (
              <Cell
                key={k}
                col={c}
                end={c + 4}
                md={{ col: (i % 2) * 3 + 1, end: (i % 2) * 3 + 4 }}
                sm={{ col: 1, end: 5 }}
                l
              >
                <dt className="label text-ink-muted">
                  <Decode>{k}</Decode>
                </dt>
                <dd className="mt-1">
                  {isLink(v) ? (
                    <a href={v} className="text-accent underline underline-offset-4">
                      {v.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </Cell>
            )
          })}
          <Rule />
        </Sheet>

        <Sheet className="mt-8">
          <Cell col={1} end={4} l className="hidden lg:block">
            <Toc headings={w.headings} />
          </Cell>
          <Cell id="case-body" col={4} end={11} md={{ col: 1, end: 7 }} l r className="prose-cell">
            <Mdx code={w.body} />
          </Cell>
        </Sheet>
      </article>
    </PageTransition>
  )
}
