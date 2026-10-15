/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'unitechlabs.io' },
      { protocol: 'https', hostname: 'sunriseadvertising.org' },
      { protocol: 'https', hostname: 'craftuary.com' },
      { protocol: 'https', hostname: 'extramilesolutions.in' },
      { protocol: 'https', hostname: 'www.drkiteacademy.com' },
      { protocol: 'https', hostname: 'www.sparkmindz.com' },
      { protocol: 'https', hostname: 'bangalorerealtors.com' },
      { protocol: 'https', hostname: 'www.izrasmile.org' },
      { protocol: 'https', hostname: 'www.saibabaastro.store' },
    ],
  },
}

export default nextConfig
