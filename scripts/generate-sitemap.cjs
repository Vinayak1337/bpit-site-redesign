const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const routesManifestPath = path.join(rootDir, '.next', 'routes-manifest.json');
const admissionsProgramsPath = path.join(
	rootDir,
	'src',
	'data',
	'admissions-process-programs.json'
);

const defaultSiteUrl = 'https://redesogn.bpitindia.com';
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? defaultSiteUrl;
const siteUrl = rawSiteUrl.replace(/\/$/, '');
const excludedPublicRoutes = ['/cse', '/departments'];

function readJson(filePath) {
	return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function isPublicRoute(route) {
	return Boolean(route) &&
		route !== '/_not-found' &&
		!route.startsWith('/api') &&
		!route.startsWith('/admin') &&
		!excludedPublicRoutes.some(
			excludedRoute => route === excludedRoute || route.startsWith(`${excludedRoute}/`)
		);
}

function expandDynamicRoute(route) {
	if (route !== '/admissions/process/[programId]') {
		return [];
	}

	if (!fs.existsSync(admissionsProgramsPath)) {
		return [];
	}

	const programs = readJson(admissionsProgramsPath);
	return programs
		.map(program => program?.id)
		.filter(Boolean)
		.map(programId => `/admissions/process/${programId}`);
}

function collectRoutes() {
	if (!fs.existsSync(routesManifestPath)) {
		throw new Error(`Missing build manifest: ${routesManifestPath}`);
	}

	const manifest = readJson(routesManifestPath);
	const staticRoutes = (manifest.staticRoutes ?? [])
		.map(route => route.page)
		.filter(isPublicRoute);
	const dynamicRoutes = (manifest.dynamicRoutes ?? [])
		.map(route => route.page)
		.filter(isPublicRoute)
		.flatMap(expandDynamicRoute);

	return [...new Set([...staticRoutes, ...dynamicRoutes])].sort((a, b) =>
		a.localeCompare(b)
	);
}

function escapeXml(value) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function buildUrlSetXml(routes) {
	const lastmod = new Date().toISOString();
	const urls = routes
		.map(route => {
			const loc = `${siteUrl}${route}`;
			return [
				'  <url>',
				`    <loc>${escapeXml(loc)}</loc>`,
				`    <lastmod>${lastmod}</lastmod>`,
				'  </url>'
			].join('\n');
		})
		.join('\n');

	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		urls,
		'</urlset>',
		''
	].join('\n');
}

function buildIndexXml() {
	return [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		`  <sitemap><loc>${escapeXml(`${siteUrl}/sitemap-0.xml`)}</loc></sitemap>`,
		'</sitemapindex>',
		''
	].join('\n');
}

function main() {
	const routes = collectRoutes();

	fs.mkdirSync(publicDir, { recursive: true });
	fs.writeFileSync(path.join(publicDir, 'sitemap-0.xml'), buildUrlSetXml(routes));
	fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), buildIndexXml());

	console.log(`Generated sitemap.xml and sitemap-0.xml for ${routes.length} public URLs`);
}

main();
