export function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string
  title: string
  lede?: string
}) {
  return (
    <header className="site-container page-x pt-16 md:pt-24">
      {eyebrow ? <p className="label text-ink-muted">{eyebrow}</p> : null}
      <h1 className="mt-4 display">{title}</h1>
      {lede ? <p className="mt-8 measure text-ink-muted">{lede}</p> : null}
    </header>
  )
}
