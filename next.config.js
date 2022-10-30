/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // env: {
  //   PATH_URL: process.env.PATH_URL
  // },
  images: {
    // domains: ["http2.mlstatic.com"]
  },
  i18n
  // i18n: {
  //   locales: ["en-US", "es-MX"],
  //   defaultLocale: "es-MX"
  // }
};

module.exports = nextConfig;
