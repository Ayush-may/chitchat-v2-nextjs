/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: 'http://localhost:5000/api/graphql',
      },
    ];
  },
};

export default nextConfig;
