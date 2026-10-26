import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Separate cache folders so `npm run build` never corrupts a running `npm run dev`.
  distDir: process.env.NODE_ENV === "production" ? ".next" : ".next-dev",
  images: { formats: ["image/avif", "image/webp"] },
  webpack: (config) => {
    config.resolve.alias["@"] = path.join(root, "src");
    return config;
  },
};
export default nextConfig;
