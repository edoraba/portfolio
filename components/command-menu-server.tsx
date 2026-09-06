import { labs, works } from '@/lib/content'
import { CommandMenu, type CommandItem } from './command-menu'

/** Builds the searchable index from the content collections and hands it to the client palette. */
export function CommandMenuServer() {
  const items: CommandItem[] = [
    ...works.map((w) => ({ group: 'Work', label: w.title, href: `/work/${w.slug}`, hint: w.year })),
    ...labs.map((l) => ({ group: 'Lab', label: l.title, href: `/lab/${l.slug}`, hint: l.date })),
  ]
  return <CommandMenu items={items} />
}
