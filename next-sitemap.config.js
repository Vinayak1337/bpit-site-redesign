const defaultSiteUrl = 'https://redesogn.bpitindia.com';
const rawSiteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? defaultSiteUrl;
const siteUrl = rawSiteUrl.replace(/\/$/, '');

/** @type {import('next-sitemap').IConfig} */
const config = {
	siteUrl,
	generateRobotsTxt: true,
	exclude: ['/api/*', '/(Private Pages)/*'],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				disallow: ['/api/*', '/(Private Pages)']
			},
			{
				userAgent: '*',
				allow: ['/']
			}
		],
		additionalSitemaps: [`${siteUrl}/sitemap-0.xml`]
	}
};

module.exports = config;
