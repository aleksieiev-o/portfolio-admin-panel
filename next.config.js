/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/personal-info',
        permanent: true,
        basePath:false
      },
    ];
  },
};

module.exports = nextConfig;
