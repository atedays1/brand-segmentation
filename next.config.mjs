/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
    // Allow large POST bodies for Route Handlers (Figma boards can be heavy)
    proxyClientMaxBodySize: '50mb',
  },
}

export default nextConfig
