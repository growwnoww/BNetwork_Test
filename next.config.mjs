/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.deepai.org', // Removed extra quotation mark
          pathname: '/art-image/**', // Add a pathname pattern to specify image paths
        },
      ],
    },
  };
  
  export default nextConfig;
  