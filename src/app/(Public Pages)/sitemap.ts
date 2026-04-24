import type { MetadataRoute } from 'next';
import { PUBLIC_TO_ADMIN_PAGE_MAP } from '@/data/admin-page-map';

const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bpitindia.com';

// Routes excluded from the sitemap (auth walls, portals, etc.)
const EXCLUDED_PREFIXES = ['/student-portal', '/admin'];

// Per-route priority tuning
function priorityFor(path: string): number {
	if (path === '/') return 1.0;
	const depth = path.split('/').filter(Boolean).length;
	if (depth === 1) return 0.9;
	if (depth === 2) return 0.75;
	return 0.6;
}

function changeFreqFor(
	path: string
): 'daily' | 'weekly' | 'monthly' | 'yearly' {
	if (path === '/') return 'daily';
	if (path.startsWith('/academia/notices-circulars')) return 'daily';
	if (path.startsWith('/academia/')) return 'weekly';
	if (path.startsWith('/placements/')) return 'weekly';
	if (path.startsWith('/gallery')) return 'weekly';
	if (path.startsWith('/admissions/')) return 'monthly';
	if (path.startsWith('/student-life/')) return 'monthly';
	return 'monthly';
}

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();
	const routes = Object.keys(PUBLIC_TO_ADMIN_PAGE_MAP).filter(
		path => !EXCLUDED_PREFIXES.some(p => path.startsWith(p))
	);

	// Ensure `/` is present
	if (!routes.includes('/')) routes.unshift('/');

	return routes.map(path => ({
		url: `${SITE_URL}${path === '/' ? '' : path}`,
		lastModified: now,
		changeFrequency: changeFreqFor(path),
		priority: priorityFor(path)
	}));
}
