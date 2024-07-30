/** @type {import('next').NextConfig} */

const devImageDomain = {
  protocol: 'http',
  hostname: 'localhost',
  port: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_PORT,
  pathname: `/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com/**`,
};

const prodImageDomain = {
  protocol: 'https',
  hostname: 'firebasestorage.googleapis.com',
  port: '',
  pathname: `/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com/**`,
};

const nextConfig = {
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/personal-info',
  //       permanent: true,
  //       basePath: false,
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [process.env.NODE_ENV === 'development' ? devImageDomain : prodImageDomain],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};
