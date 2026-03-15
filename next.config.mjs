/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
    images:{
    domains:['firebasestorage.googleapis.com','images.pexels.com'],
    minimumCacheTTL: 3600,
},
};

export default nextConfig;
