import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/pdfjs/pdf.worker.min.js", // 👈 Match this to your import path
        destination: "https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.js",
      },
    ];
  },
};

export default nextConfig;


