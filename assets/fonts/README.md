# Fonts

Two families, two licences, two ways of getting here. `pnpm fonts` (also run by `prebuild`)
puts all four files in place.

## Martian Grotesk, display

[evilmartians/grotesk](https://github.com/evilmartians/grotesk), SIL Open Font License 1.1,
no reserved font name. The variable file carries the weight and width axes the headline
animates. OFL permits redistribution, so the file and `MartianGrotesk-OFL.txt` are committed.

## Switzer, text

[Fontshare](https://www.fontshare.com/fonts/switzer), ITF Free Font License 2.0. Commercial use
and self-hosting on this site are permitted and no attribution is required, but two clauses
shape how it is handled here:

- subsetting and format conversion are not allowed, so the official variable woff2 files are
  stored exactly as published, unmodified;
- the font software may not be made available through a public repository, and this repository
  is public, so `Switzer-*.woff2` is gitignored and fetched at build time instead. The deployed
  site self-hosts the files, which is what the licence permits.

Anyone building this repo gets them from Fontshare through `scripts/fonts.mjs`, which is the
same thing as downloading them yourself: each person is independently bound by the licence.
