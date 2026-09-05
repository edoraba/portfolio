# Fonts

Two families, two ways of getting here.

## Funnel Display, display

[Google Fonts](https://fonts.google.com/specimen/Funnel+Display), SIL Open Font License 1.1,
loaded through `next/font/google`, which downloads it at build time and serves it from this
site's own origin. Variable on one axis, weight 300 to 800, which is the axis the headline
animates. It has no italic, so emphasis is weight.

## Switzer, text

[Fontshare](https://www.fontshare.com/fonts/switzer), ITF Free Font License 2.0. Commercial use
and self-hosting on this site are permitted and no attribution is required, but two clauses
shape how it is handled here:

- subsetting and format conversion are not allowed, so the official variable woff2 files are
  stored exactly as published, unmodified;
- the font software may not be made available through a public repository, and this repository
  is public, so `Switzer-*.woff2` is gitignored and fetched at build time instead. The deployed
  site self-hosts the files, which is what the licence permits.

`pnpm fonts`, also run by `prebuild`, puts them in place. Anyone building this repo gets them
from Fontshare the same way they would by downloading them: each person is independently bound
by the licence.
