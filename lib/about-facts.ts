/**
 * The facts printed in the About plate. Every value is taken from content/pages/about.mdx and
 * lib/site.ts; nothing here is new. Add a fact only after it exists in the content.
 */
export const ABOUT_SENTENCE =
  'I design interfaces in Figma, then build the whole product, from the interface to the database.'

export type Fact = { label: string; value: string }

export const ABOUT_FACTS: Fact[] = [
  { label: 'Based', value: 'Turin, IT' },
  { label: 'Since', value: '2020 at Redergo' },
  { label: 'Role', value: 'Partner, coordinates the developers' },
  { label: 'Team', value: 'Ten people' },
  { label: 'Trained', value: 'Digital Communication Design, IAAD' },
  { label: 'Before', value: 'Two years of energy engineering, Politecnico di Torino' },
  { label: 'Builds', value: 'React, Next.js, Astro' },
  { label: 'Ships', value: 'Marketing sites to bespoke back office systems' },
]
