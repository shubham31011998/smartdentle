/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["smile-dental-buckett.s3.us-west-2.amazonaws.com"],
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

export default nextConfig;
