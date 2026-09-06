import Link from 'next/link'

/**
 * The column beside the prose on a page that has only prose. Ruled rows in the console's voice,
 * the same grammar as the readout in the title band: a heading, then one line per thing, the
 * label left and the value right.
 */
export function Aside({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="aside">
      <h2 className="label text-ink-muted">{heading}</h2>
      <ul className="aside__list">{children}</ul>
    </section>
  )
}

export function AsideRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const line = (
    <>
      <span className="label text-ink-muted">{label}</span>
      <span className="label text-ink">{value}</span>
    </>
  )
  return (
    <li className="aside__row">
      {href ? (
        href.startsWith('http') ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="aside__link">
            {line}
          </a>
        ) : (
          <Link href={href} className="aside__link">
            {line}
          </Link>
        )
      ) : (
        line
      )}
    </li>
  )
}
