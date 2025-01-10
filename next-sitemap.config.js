// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://solvejet.net",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "daily",
  priority: 0.7,
  exclude: ["/server-sitemap.xml"], // Exclude server-side sitemap if you have one
  robotsTxtOptions: {
    additionalSitemaps: [
      // Add any additional sitemaps here if needed
      // 'https://solvejet.net/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
