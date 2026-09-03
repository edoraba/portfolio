import { MDXContent } from '@content-collections/mdx/react'
import type { ComponentProps } from 'react'
import { LineReveal } from './line-reveal'

const components = {
  h2: ({ children, ...p }: ComponentProps<'h2'>) => (
    <h2 className="mt-block scroll-mt-24 headline" {...p}>
      <LineReveal as="span" className="block">
        {children}
      </LineReveal>
    </h2>
  ),
  h3: (p: ComponentProps<'h3'>) => <h3 className="mt-10 text-body font-medium" {...p} />,
  p: (p: ComponentProps<'p'>) => <p className="mt-5 measure text-ink-muted" {...p} />,
  ul: (p: ComponentProps<'ul'>) => (
    <ul className="mt-5 measure list-none space-y-2 pl-4 text-ink-muted" {...p} />
  ),
  li: (p: ComponentProps<'li'>) => (
    <li
      className="relative before:absolute before:top-[0.75em] before:-left-4 before:h-px before:w-2 before:bg-ink-muted"
      {...p}
    />
  ),
  a: (p: ComponentProps<'a'>) => (
    <a className="text-accent underline-offset-4 hover:underline" {...p} />
  ),
  figure: (p: ComponentProps<'figure'>) => <figure className="mt-block" {...p} />,
  figcaption: (p: ComponentProps<'figcaption'>) => (
    <figcaption className="mt-3 label text-ink-muted" {...p} />
  ),
}

export function Mdx({ code }: { code: string }) {
  return <MDXContent code={code} components={components} />
}
