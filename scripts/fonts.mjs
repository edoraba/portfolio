// Puts the two typefaces in assets/fonts/ before the build.
//
// Martian Grotesk is OFL, so its variable woff2 and the licence travel with the repo and this
// script only restores them if they are missing. Switzer is under the ITF Free Font License:
// self-hosting on this site is permitted, but making the files available through a public
// repository is not, so they stay out of git and are fetched here instead. The licence also
// forbids subsetting and format conversion, so both files are stored exactly as published.
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const dir = path.join(process.cwd(), 'assets', 'fonts')
const MARTIAN = 'https://raw.githubusercontent.com/evilmartians/grotesk/main'
const SWITZER_CSS = 'https://api.fontshare.com/v2/css?f%5B%5D=switzer@1,2&display=swap'

async function get(url, what) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${what}: ${url} answered ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function save(name, buf) {
  const file = path.join(dir, name)
  const before = await readFile(file).catch(() => null)
  if (before?.equals(buf)) return `${name} unchanged`
  await writeFile(file, buf)
  return `${name} ${(buf.length / 1024).toFixed(0)} KB ${createHash('sha256').update(buf).digest('hex').slice(0, 12)}`
}

async function switzerUrls() {
  const css = await get(SWITZER_CSS, 'switzer css').then((b) => b.toString('utf8'))
  const faces = css.split('@font-face').slice(1)
  const pick = (style) => {
    const face = faces.find((f) => f.includes(`font-style: ${style}`) && f.includes('100 900'))
    const url = face?.match(/url\('(\/\/[^']+\.woff2)'\)/)?.[1]
    if (!url) throw new Error(`switzer: no variable ${style} face in the stylesheet`)
    return `https:${url}`
  }
  return { roman: pick('normal'), italic: pick('italic') }
}

await mkdir(dir, { recursive: true })
const urls = await switzerUrls()
const jobs = [
  [
    'MartianGrotesk[wdth,wght].woff2',
    `${MARTIAN}/fonts/webfonts/MartianGrotesk%5Bwdth,wght%5D.woff2`,
  ],
  ['MartianGrotesk-OFL.txt', `${MARTIAN}/OFL.txt`],
  ['Switzer-Variable.woff2', urls.roman],
  ['Switzer-VariableItalic.woff2', urls.italic],
]
for (const [name, url] of jobs) {
  console.log(await save(name, await get(url, name)))
}
