/**
 * The facts printed in the About plate. Every value is taken from content/pages/about.mdx and
 * lib/site.ts; nothing here is new. Add a fact only after it exists in the content.
 */
export const ABOUT_SENTENCE =
  'I build whole products, from the interface to the database, and I came to it from design.'

export type Fact = { label: string; value: string }

export const ABOUT_FACTS: Fact[] = [
  { label: 'Builds', value: 'React, Next.js, Astro, TypeScript' },
  { label: 'Ships', value: 'Interface, API, database, deploy' },
  { label: 'Range', value: 'Marketing sites to bespoke back office systems' },
  { label: 'Role', value: 'Partner, coordinates the developers' },
  { label: 'Team', value: 'Ten people' },
  { label: 'Based', value: 'Turin, IT' },
  { label: 'Since', value: '2020 at Redergo' },
  { label: 'Trained', value: 'Digital Communication Design, IAAD' },
]
