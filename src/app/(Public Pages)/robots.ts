import type { MetadataRoute } from 'next';

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bpitindia.com';
const IS_PROD = process.env.NEXT_PUBLIC_SITE_ENV === 'production';

export default function robots(): MetadataRoute.Robots {
	if (!IS_PROD) {
		return {
			rules: [{ userAgent: '*', disallow: '/' }]
		};
	}
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/admin', '/admin/', '/api/', '/student-portal/']
			}
		],
		sitemap: `${SITE_URL}/sitemap.xml`,
		host: SITE_URL
	};
}
