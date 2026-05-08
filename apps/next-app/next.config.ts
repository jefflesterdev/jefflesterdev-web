import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['@jld/types', '@jld/i18n'],
}

export default nextConfig
