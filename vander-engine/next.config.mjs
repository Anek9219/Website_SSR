/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "export",
  images: {
    unoptimized: true, // Disable Next.js Image Optimization
    domains: ["res.cloudinary.com"], // Allow external images from Cloudinary
  },
};

export default nextConfig;

