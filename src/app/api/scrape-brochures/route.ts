import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import prisma from '@/lib/prisma';

type BrochureLinks = {
	undergraduate?: string;
	postgraduate?: string;
	ugText?: string;
	pgText?: string;
};

type BrochureConfig = {
	heroBadge: string;
	heroTitle: string;
	heroSubtitle: string;
	autoDetectEnabled: boolean;
};

type BrochureItem = {
	id: string;
	title: string;
	description: string;
	icon: string;
	url: string;
	lastUpdated?: string;
};

const ADMISSIONS_BROCHURE_SLUG = 'admissions-brochure';
const BROCHURE_CONFIG_KEY = 'BROCHURE_CONFIG';
const BROCHURE_ITEMS_KEY = 'BROCHURE_ITEMS';

const DEFAULT_CONFIG: BrochureConfig = {
	heroBadge: 'Admissions Brochure',
	heroTitle: 'Brochure',
	heroSubtitle: 'Official brochure links with direct download and view support.',
	autoDetectEnabled: true
};

const DEFAULT_ITEMS: BrochureItem[] = [
	{
		id: 'undergraduate',
		title: 'Undergraduate Admissions Brochure',
		description: 'Complete information about undergraduate programs and admissions.',
		icon: 'GraduationCap',
		url: 'http://www.ipu.ac.in/Pubinfo2025/adm25brug310125.pdf',
		lastUpdated: ''
	},
	{
		id: 'postgraduate',
		title: 'Postgraduate Admissions Brochure',
		description: 'Complete information about postgraduate programs and admissions.',
		icon: 'FileText',
		url: 'http://www.ipu.ac.in/Pubinfo2025/adm25brPG310125.pdf',
		lastUpdated: ''
	}
];

const normalizeIpuUrl = (href: string): string => {
	if (href.startsWith('http://') || href.startsWith('https://')) {
		return href;
	}
	return `http://www.ipu.ac.in/${href.replace(/^\/+/, '')}`;
};

const toNonEmptyString = (value: unknown, fallback = ''): string => {
	if (typeof value !== 'string') return fallback;
	const normalized = value.trim();
	return normalized.length > 0 ? normalized : fallback;
};

const parseConfig = (value: unknown): BrochureConfig => {
	if (!value || typeof value !== 'object') return DEFAULT_CONFIG;
	const source = value as Record<string, unknown>;
	return {
		heroBadge: toNonEmptyString(source.heroBadge, DEFAULT_CONFIG.heroBadge),
		heroTitle: toNonEmptyString(source.heroTitle, DEFAULT_CONFIG.heroTitle),
		heroSubtitle: toNonEmptyString(source.heroSubtitle, DEFAULT_CONFIG.heroSubtitle),
		autoDetectEnabled:
			typeof source.autoDetectEnabled === 'boolean'
				? source.autoDetectEnabled
				: DEFAULT_CONFIG.autoDetectEnabled
	};
};

const parseItems = (value: unknown): BrochureItem[] => {
	if (!Array.isArray(value)) return DEFAULT_ITEMS;
	const items = value
		.map((item, index) => {
			if (!item || typeof item !== 'object') return null;
			const source = item as Record<string, unknown>;
			const id = toNonEmptyString(source.id, `brochure-${index + 1}`);
			const title = toNonEmptyString(source.title);
			const description = toNonEmptyString(source.description);
			const icon = toNonEmptyString(source.icon, 'FileText');
			const url = toNonEmptyString(source.url);
			const lastUpdated = toNonEmptyString(source.lastUpdated, '');
			if (!title || !description || !url) return null;
			return { id, title, description, icon, url, lastUpdated };
		})
		.filter(item => item !== null) as BrochureItem[];
	return items.length > 0 ? items : DEFAULT_ITEMS;
};

const getBrochureDataFromDb = async (): Promise<{
	config: BrochureConfig;
	items: BrochureItem[];
}> => {
	const page = await prisma.page.findUnique({
		where: { slug: ADMISSIONS_BROCHURE_SLUG },
		include: { components: true }
	});

	if (!page) {
		return { config: DEFAULT_CONFIG, items: DEFAULT_ITEMS };
	}

	const configComponent = page.components.find(
		component => component.key === BROCHURE_CONFIG_KEY
	);
	const itemsComponent = page.components.find(
		component => component.key === BROCHURE_ITEMS_KEY
	);

	return {
		config: parseConfig(configComponent?.data),
		items: parseItems(itemsComponent?.data)
	};
};

const scrapeBrochureLinks = async (): Promise<BrochureLinks | null> => {
	const urls = [
		'https://www.ipu.ac.in/admission2025main2.php',
		'http://www.ipu.ac.in/admission2025main2.php'
	];

	let html: string | null = null;
	for (const url of urls) {
		try {
			const response = await fetch(url, {
				cache: 'no-store',
				headers: {
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
				}
			});
			if (!response.ok) continue;
			html = await response.text();
			if (html.length > 0) break;
		} catch {
			continue;
		}
	}

	if (!html) return null;

	const $ = cheerio.load(html);
	const links: BrochureLinks = {};

	$('a[href*=".pdf"]').each((_, element) => {
		const href = ($(element).attr('href') ?? '').trim();
		if (!href) return;

		const text = $(element).text().toLowerCase().trim();
		const normalizedHref = normalizeIpuUrl(href);

		const looksLikeUg =
			text.includes('undergraduate') ||
			text.includes('ug') ||
			text.includes('bachelor') ||
			text.includes('b.tech') ||
			href.includes('brug');

		const looksLikePg =
			text.includes('postgraduate') ||
			text.includes('pg') ||
			text.includes('master') ||
			text.includes('mba') ||
			href.includes('brPG');

		if (looksLikeUg && !links.undergraduate) {
			links.undergraduate = normalizedHref;
			links.ugText = $(element).text().trim();
		}

		if (looksLikePg && !links.postgraduate) {
			links.postgraduate = normalizedHref;
			links.pgText = $(element).text().trim();
		}
	});

	if (!links.undergraduate && !links.postgraduate) {
		return null;
	}

	return links;
};

export async function GET() {
	try {
		const { config, items } = await getBrochureDataFromDb();

		if (!config.autoDetectEnabled) {
			return NextResponse.json({
				success: false,
				autoDetectEnabled: false,
				source: 'db' as const,
				items,
				message: 'Auto-detect is disabled. Using brochure links from CMS.'
			});
		}

		const scraped = await scrapeBrochureLinks();
		if (!scraped) {
			return NextResponse.json({
				success: false,
				autoDetectEnabled: true,
				source: 'db' as const,
				items,
				message: 'Could not detect live brochure links. Using CMS links.'
			});
		}

		return NextResponse.json({
			success: true,
			autoDetectEnabled: true,
			source: 'scrape' as const,
			brochures: scraped,
			items,
			message: 'Live brochure links loaded from IPU website.'
		});
	} catch (error) {
		return NextResponse.json(
			{
				success: false,
				autoDetectEnabled: false,
				source: 'db' as const,
				items: DEFAULT_ITEMS,
				message: 'Failed to resolve brochure links.',
				error: error instanceof Error ? error.message : 'unknown_error'
			},
			{ status: 500 }
		);
	}
}
