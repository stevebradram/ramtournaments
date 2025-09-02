/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images:{
    domains:['firebasestorage.googleapis.com','images.pexels.com'],
    minimumCacheTTL: 3600,
},
};

export default nextConfig;
