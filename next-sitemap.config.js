/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://skill-swap-ten.vercel.app',
    outDir: './public',
    sitemapSize: 7000,
    generateRobotsTxt: true,
    exclude: ['/admin/*', '/user/*'],
}