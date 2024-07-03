// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cyhrqdwlnzgpvufdauvi.supabase.co',
          pathname: '/storage/v1/object/public/image/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  