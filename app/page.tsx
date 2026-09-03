import Link from 'next/link'
import { CopyEmail } from '@/components/copy-email'
import { HeroMask } from '@/components/hero-mask'
import { MarginIndex } from '@/components/margin-index'
import { WorkList } from '@/components/work-list'
import { featuredWorks, labs, writings } from '@/lib/content'
import { site } from '@/lib/site'
import { PageTransition } from '@/components/page-transition'
import { SmoothScroll } from '@/components/smooth-scroll'

export default function Home() {
  const four = featuredWorks.slice(0, 4)
  return (
    <PageTransition>
      <SmoothScroll />
      <section className="site-container grid min-h-[80dvh] content-between page-x pt-8 pb-12 lg:grid-cols-[1fr_18rem] lg:gap-12">
        <div className="self-end">
          <HeroMask />
          <p className="mt-10 measure text-ink-muted">
            <span className="text-ink">{site.role}.</span> Whole products, from the interface to the
            database, shipped from {site.location}.
          </p>
          <CopyEmail className="mt-6 block" />
        </div>
        <aside className="hidden self-end lg:block">
          <MarginIndex
            label="Selected work"
            items={four.map((w) => ({
              n: String(w.order).padStart(2, '0'),
              label: w.client,
              href: `/work/${w.slug}`,
              meta: w.year,
            }))}
          />
        </aside>
      </section>

      <section className="site-container mt-section page-x">
        <h2 className="label text-ink-muted">Selected work</h2>
        <div className="mt-6">
          <WorkList works={four} />
        </div>
        <Link href="/work" className="mt-6 inline-block label text-accent">
          All work
        </Link>
      </section>

      <section className="site-container mt-section grid gap-block page-x md:grid-cols-2">
        <div>
          <h2 className="label text-ink-muted">Lab</h2>
          <ul className="mt-6 space-y-3">
            {labs.slice(0, 3).map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/lab/${l.slug}`}
                  className="headline transition-colors hover:text-accent"
                >
                  {l.title}
                </Link>
                <span className="ml-3 label text-ink-muted">{l.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div hidden={writings.length === 0}>
          <h2 className="label text-ink-muted">Writing</h2>
          <ul className="mt-6 space-y-3">
            {writings.slice(0, 3).map((w) => (
              <li key={w.slug}>
                <Link
                  href={`/writing/${w.slug}`}
                  className="headline transition-colors hover:text-accent"
                >
                  {w.title}
                </Link>
                <span className="ml-3 label text-ink-muted">{w.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  )
}
