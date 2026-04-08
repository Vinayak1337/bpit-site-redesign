export type AdminCoverageStatus = 'complete' | 'missing';
export type AdminEditingMode = 'live' | 'form' | 'none';

export type AdminPageCoverage = {
	adminHref: string | null;
	status: AdminCoverageStatus;
	editingMode: AdminEditingMode;
	note?: string;
};

export const PUBLIC_TO_ADMIN_PAGE_MAP: Record<string, AdminPageCoverage> = {
	'/': {
		adminHref: '/admin/home',
		status: 'complete',
		editingMode: 'live'
	},
	'/about': {
		adminHref: '/admin/about',
		status: 'complete',
		editingMode: 'live'
	},
	'/about/founder-tribute': {
		adminHref: '/admin/about/founder-tribute',
		status: 'complete',
		editingMode: 'live'
	},
	'/about/chairman-message': {
		adminHref: '/admin/about/chairman-message',
		status: 'complete',
		editingMode: 'live'
	},
	'/about/principal-message': {
		adminHref: '/admin/about/principal-message',
		status: 'complete',
		editingMode: 'live'
	},
	'/vision-mission': {
		adminHref: '/admin/vision-mission',
		status: 'complete',
		editingMode: 'live'
	},
	'/vision-mission/mission': {
		adminHref: '/admin/vision-mission/mission',
		status: 'complete',
		editingMode: 'live'
	},
	'/vision-mission/quality-policy': {
		adminHref: '/admin/vision-mission/quality-policy',
		status: 'complete',
		editingMode: 'live'
	},
	'/management': {
		adminHref: '/admin/management',
		status: 'complete',
		editingMode: 'live'
	},
	'/management/leadership-team': {
		adminHref: '/admin/management/leadership-team',
		status: 'complete',
		editingMode: 'live'
	},
	'/management/governance-structure': {
		adminHref: '/admin/management/governance-structure',
		status: 'complete',
		editingMode: 'live'
	},
	'/management/policies-procedures': {
		adminHref: '/admin/management/policies-procedures',
		status: 'complete',
		editingMode: 'live'
	},
	'/statutory-committees': {
		adminHref: '/admin/statutory-committees',
		status: 'complete',
		editingMode: 'live'
	},
	'/statutory-committees/iqac': {
		adminHref: '/admin/statutory-committees/iqac',
		status: 'complete',
		editingMode: 'live'
	},
	'/statutory-committees/anti-ragging': {
		adminHref: '/admin/statutory-committees/anti-ragging',
		status: 'complete',
		editingMode: 'live'
	},
	'/statutory-committees/internal-complaints': {
		adminHref: '/admin/statutory-committees/internal-complaints',
		status: 'complete',
		editingMode: 'live'
	},
	'/statutory-committees/student-welfare': {
		adminHref: '/admin/statutory-committees/student-welfare',
		status: 'missing',
		editingMode: 'none',
		note: 'Admin route exists, but page-level editor is still under construction.'
	},
	'/statutory-committees/grievance-redressal': {
		adminHref: '/admin/statutory-committees/grievance-redressal',
		status: 'missing',
		editingMode: 'none',
		note: 'Admin route exists, but page-level editor is still under construction.'
	},
	'/mandatory-disclosure': {
		adminHref: '/admin/mandatory-disclosure',
		status: 'complete',
		editingMode: 'live'
	},
	'/gallery': {
		adminHref: '/admin/gallery',
		status: 'complete',
		editingMode: 'live'
	},
	'/academia': {
		adminHref: '/admin/academia',
		status: 'complete',
		editingMode: 'live'
	},
	'/admissions': {
		adminHref: '/admin/admissions',
		status: 'complete',
		editingMode: 'live'
	},
	'/admissions/why-bpit': {
		adminHref: '/admin/admissions/why-bpit',
		status: 'complete',
		editingMode: 'live'
	},
	'/admissions/process': {
		adminHref: '/admin/admissions/process',
		status: 'complete',
		editingMode: 'live'
	},
	'/admissions/fees': {
		adminHref: '/admin/admissions/fees',
		status: 'complete',
		editingMode: 'live'
	},
	'/admissions/scholarship': {
		adminHref: '/admin/admissions/scholarship',
		status: 'complete',
		editingMode: 'live'
	},
	'/admissions/brochure': {
		adminHref: '/admin/admissions/brochure',
		status: 'complete',
		editingMode: 'live'
	},
	'/admissions/faqs': {
		adminHref: '/admin/admissions/faqs',
		status: 'complete',
		editingMode: 'live'
	},
	'/academia/academic-calendar': {
		adminHref: null,
		status: 'missing',
		editingMode: 'none',
		note: 'Page-level admin editor is not finished yet.'
	},
	'/academia/examination': {
		adminHref: null,
		status: 'missing',
		editingMode: 'none',
		note: 'Page-level admin editor is not finished yet.'
	},
	'/academia/syllabus-ordinance': {
		adminHref: null,
		status: 'missing',
		editingMode: 'none',
		note: 'Page-level admin editor is not finished yet.'
	},
	'/academia/library': {
		adminHref: null,
		status: 'missing',
		editingMode: 'none',
		note: 'Page-level admin editor is not finished yet.'
	},
	'/academia/notices-circulars': {
		adminHref: null,
		status: 'missing',
		editingMode: 'none',
		note: 'Page-level admin editor is not finished yet.'
	},
	'/placements/overview': {
		adminHref: '/admin/placements/overview',
		status: 'complete',
		editingMode: 'live'
	},
	'/placements/training-placement': {
		adminHref: '/admin/placements/training-placement',
		status: 'complete',
		editingMode: 'live'
	},
	'/placements/recruiters': {
		adminHref: '/admin/placements/recruiters',
		status: 'complete',
		editingMode: 'live'
	},
	'/placements/statistics': {
		adminHref: '/admin/placements/statistics',
		status: 'complete',
		editingMode: 'live'
	},
	'/placements/internships': {
		adminHref: '/admin/placements/internships',
		status: 'complete',
		editingMode: 'live'
	},
	'/placements/alumni': {
		adminHref: null,
		status: 'missing',
		editingMode: 'none',
		note: 'No admin editor route exists yet.'
	},
	'/student-life': {
		adminHref: '/admin/student-life/overview',
		status: 'complete',
		editingMode: 'live'
	},
	'/student-life/campus-facilities': {
		adminHref: '/admin/student-life/facilities',
		status: 'complete',
		editingMode: 'live'
	},
	'/student-life/clubs-and-societies': {
		adminHref: '/admin/student-life/clubs',
		status: 'complete',
		editingMode: 'live'
	},
	'/student-life/events-and-festivals': {
		adminHref: '/admin/student-life/events',
		status: 'complete',
		editingMode: 'live'
	},
	'/student-life/student-grievance-cell': {
		adminHref: '/admin/student-life/grievance',
		status: 'complete',
		editingMode: 'live'
	},
	'/student-life/code-of-conduct': {
		adminHref: '/admin/student-life/conduct',
		status: 'complete',
		editingMode: 'live'
	},
	'/student-portal/login': {
		adminHref: null,
		status: 'missing',
		editingMode: 'none',
		note: 'Student portal admin editors are not implemented.'
	},
	'/student-portal/fee-payment': {
		adminHref: null,
		status: 'missing',
		editingMode: 'none',
		note: 'Student portal admin editors are not implemented.'
	},
	'/student-portal/attendance': {
		adminHref: null,
		status: 'missing',
		editingMode: 'none',
		note: 'Student portal admin editors are not implemented.'
	},
	'/student-portal/results': {
		adminHref: null,
		status: 'missing',
		editingMode: 'none',
		note: 'Student portal admin editors are not implemented.'
	}
};

const ADMIN_TO_PUBLIC_EXACT_MAP: Record<string, string> = {
	'/admin': '/',
	'/admin/home': '/',
	'/admin/about': '/about',
	'/admin/about/founder-tribute': '/about/founder-tribute',
	'/admin/about/chairman-message': '/about/chairman-message',
	'/admin/about/principal-message': '/about/principal-message',
	'/admin/vision-mission': '/vision-mission',
	'/admin/vision-mission/mission': '/vision-mission/mission',
	'/admin/vision-mission/quality-policy': '/vision-mission/quality-policy',
	'/admin/management': '/management',
	'/admin/management/leadership-team': '/management/leadership-team',
	'/admin/management/governance-structure': '/management/governance-structure',
	'/admin/management/policies-procedures': '/management/policies-procedures',
	'/admin/statutory-committees': '/statutory-committees',
	'/admin/statutory-committees/iqac': '/statutory-committees/iqac',
	'/admin/statutory-committees/anti-ragging':
		'/statutory-committees/anti-ragging',
	'/admin/statutory-committees/internal-complaints':
		'/statutory-committees/internal-complaints',
	'/admin/statutory-committees/student-welfare':
		'/statutory-committees/student-welfare',
	'/admin/statutory-committees/grievance-redressal':
		'/statutory-committees/grievance-redressal',
	'/admin/mandatory-disclosure': '/mandatory-disclosure',
	'/admin/gallery': '/gallery',
	'/admin/academia': '/academia',
	'/admin/placements/overview': '/placements/overview',
	'/admin/placements/training-placement': '/placements/training-placement',
	'/admin/placements/recruiters': '/placements/recruiters',
	'/admin/placements/statistics': '/placements/statistics',
	'/admin/placements/internships': '/placements/internships',
	'/admin/student-life': '/student-life',
	'/admin/student-life/overview': '/student-life',
	'/admin/student-life/facilities': '/student-life/campus-facilities',
	'/admin/student-life/clubs': '/student-life/clubs-and-societies',
	'/admin/student-life/events': '/student-life/events-and-festivals',
	'/admin/student-life/grievance': '/student-life/student-grievance-cell',
	'/admin/student-life/conduct': '/student-life/code-of-conduct',
	'/admin/logs': '/',
	'/admin/pages': '/',
	'/admin/login': '/'
};

export function resolvePublicPathFromAdminPath(pathname: string): string {
	const normalized =
		pathname.endsWith('/') && pathname !== '/'
			? pathname.slice(0, -1)
			: pathname;
	if (ADMIN_TO_PUBLIC_EXACT_MAP[normalized]) {
		return ADMIN_TO_PUBLIC_EXACT_MAP[normalized];
	}
	if (normalized.startsWith('/admin/')) {
		const stripped = normalized.replace(/^\/admin/, '');
		return stripped || '/';
	}
	return '/';
}
