/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'unitechlabs.io' },
      { protocol: 'https', hostname: 'aroushtech.in' },      // fixed: was http (mixed content)
      { protocol: 'https', hostname: 'sunriseadvertising.org' },
      { protocol: 'https', hostname: 'craftuary.com' },
      { protocol: 'https', hostname: 'extramilesolutions.in' },
      { protocol: 'https', hostname: 'shakeitabhi.com' },
      { protocol: 'https', hostname: 'www.drkiteacademy.com' },
    ],
  },
}

export default nextConfig
