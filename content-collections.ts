import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { z } from 'zod'

const mdxOptions: Parameters<typeof compileMDX>[2] = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
}

const slugOf = (p: string) => p.replace(/\.mdx$/, '')
const content = z.string()

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

export default defineConfig({ collections: [work, lab, writing, pages] })
