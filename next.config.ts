import { withContentCollections } from '@content-collections/next'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  images: { formats: ['image/avif', 'image/webp'] },
}

export default withContentCollections(nextConfig)
