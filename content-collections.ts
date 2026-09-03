import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import GithubSlugger from 'github-slugger'
import { z } from 'zod'

const mdxOptions: Parameters<typeof compileMDX>[2] = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug],
}

const slugOf = (p: string) => p.replace(/\.mdx$/, '')
const content = z.string()

/** Level 2 headings with the same ids rehype-slug will produce, for tables of contents. */
function headingsOf(markdown: string): { id: string; text: string }[] {
  const slugger = new GithubSlugger()
  return markdown
    .split('\n')
    .filter((line) => /^## /.test(line))
    .map((line) => {
      const text = line.replace(/^## /, '').trim()
      return { id: slugger.slug(text), text }
    })
}

const work = defineCollection({
  name: 'work',
  directory: 'content/work',
  include: '*.mdx',
  schema: z.object({
    content,
    title: z.string(),
    outcome: z.string(),
    client: z.string(),
    year: z.string(),
    role: z.string(),
    team: z.string(),
    stack: z.array(z.string()),
    status: z.string(),
    links: z.record(z.string(), z.string()).default({}),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().int(),
    confidential: z.boolean().default(false),
    summary: z.string(),
  }),
  transform: async (doc, ctx) => ({
    ...doc,
    slug: slugOf(doc._meta.path),
    headings: headingsOf(doc.content),
    body: await compileMDX(ctx, doc, mdxOptions),
  }),
})

const lab = defineCollection({
  name: 'lab',
  directory: 'content/lab',
  include: '*.mdx',
  schema: z.object({
    content,
    title: z.string(),
    date: z.string(),
    description: z.string(),
    component: z.string(),
    source: z.string().nullable().default(null),
    still: z.string().optional(),
  }),
  transform: async (doc, ctx) => ({
    ...doc,
    slug: slugOf(doc._meta.path),
    body: await compileMDX(ctx, doc, mdxOptions),
  }),
})

const writing = defineCollection({
  name: 'writing',
  directory: 'content/writing',
  include: '*.mdx',
  schema: z.object({
    content,
    title: z.string(),
    date: z.string(),
    description: z.string(),
    draft: z.boolean().default(true),
  }),
  transform: async (doc, ctx) => ({
    ...doc,
    slug: slugOf(doc._meta.path),
    body: await compileMDX(ctx, doc, mdxOptions),
  }),
})

const pages = defineCollection({
  name: 'pages',
  directory: 'content/pages',
  include: '*.mdx',
  schema: z.object({
    content,
    title: z.string(),
    description: z.string(),
    updated: z.string().optional(),
  }),
  transform: async (doc, ctx) => ({
    ...doc,
    slug: slugOf(doc._meta.path),
    body: await compileMDX(ctx, doc, mdxOptions),
  }),
})

export default defineConfig({ content: [work, lab, writing, pages] })
