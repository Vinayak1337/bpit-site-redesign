'use server';
import 'server-only';

import { z } from 'zod';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';

const PAGE_SLUG = 'academia-library';

const KEYS = {
	HERO: { key: 'HERO', order: 0, tag: `${PAGE_SLUG}-hero` },
	STATS: { key: 'STATS', order: 1, tag: `${PAGE_SLUG}-stats` },
	MISSION: { key: 'MISSION', order: 2, tag: `${PAGE_SLUG}-mission` },
	FEATURES: { key: 'FEATURES', order: 3, tag: `${PAGE_SLUG}-features` },
	INFO: { key: 'INFO', order: 4, tag: `${PAGE_SLUG}-info` }
} as const;

// ---------- Explicit types ----------

export type LibraryHeroData = {
	eyebrow: string;
	title: string;
	titleAccent: string;
	subtitle: string;
	backgroundImage: string | null;
};

export type LibraryStatItem = {
	icon: string;
	value: string;
	label: string;
	accent: string;
};
export type LibraryStatsData = { items: LibraryStatItem[] };

export type LibraryMissionData = {
	eyebrow: string;
	heading: string;
	body: string;
};

export type LibraryFeatureItem = {
	icon: string;
	title: string;
	description: string;
};
export type LibraryFeaturesData = { items: LibraryFeatureItem[] };

export type LibraryQuickLink = { label: string; href: string };
export type LibraryInfoData = {
	heading: string;
	description: string;
	locationTitle: string;
	locationLine1: string;
	locationLine2: string;
	quickLinksHeading: string;
	quickLinks: LibraryQuickLink[];
};

// ---------- Schemas (no defaults — we handle defaults via fallback() helpers) ----------

const heroSchema: z.ZodType<LibraryHeroData> = z.object({
	eyebrow: z.string(),
	title: z.string().min(1),
	titleAccent: z.string(),
	subtitle: z.string().min(1),
	backgroundImage: z.string().nullable()
});

const statItemSchema: z.ZodType<LibraryStatItem> = z.object({
	icon: z.string(),
	value: z.string().min(1),
	label: z.string().min(1),
	accent: z.string()
});
const statsSchema: z.ZodType<LibraryStatsData> = z.object({
	items: z.array(statItemSchema)
});

const missionSchema: z.ZodType<LibraryMissionData> = z.object({
	eyebrow: z.string(),
	heading: z.string().min(1),
	body: z.string().min(1)
});

const featureItemSchema: z.ZodType<LibraryFeatureItem> = z.object({
	icon: z.string(),
	title: z.string().min(1),
	description: z.string().min(1)
});
const featuresSchema: z.ZodType<LibraryFeaturesData> = z.object({
	items: z.array(featureItemSchema)
});

const quickLinkSchema: z.ZodType<LibraryQuickLink> = z.object({
	label: z.string().min(1),
	href: z.string()
});
const infoSchema: z.ZodType<LibraryInfoData> = z.object({
	heading: z.string(),
	description: z.string(),
	locationTitle: z.string(),
	locationLine1: z.string(),
	locationLine2: z.string(),
	quickLinksHeading: z.string(),
	quickLinks: z.array(quickLinkSchema)
});

// ---------- Defaults ----------

function defaultHero(): LibraryHeroData {
	return {
		eyebrow: 'Academic Heart of BPIT',
		title: 'BPIT',
		titleAccent: 'Library',
		subtitle:
			'Discover a world of knowledge at the BPIT Library. Our comprehensive collection and modern facilities support your academic journey and research endeavors.',
		backgroundImage: null
	};
}
function defaultStats(): LibraryStatsData {
	return {
		items: [
			{ icon: 'BookOpen', value: '50,000+', label: 'Books & Journals', accent: 'bg-blue-50 text-blue-700' },
			{ icon: 'Database', value: '10,000+', label: 'Digital Resources', accent: 'bg-emerald-50 text-emerald-700' },
			{ icon: 'Users', value: '500+', label: 'Daily Visitors', accent: 'bg-violet-50 text-violet-700' },
			{ icon: 'Globe', value: '24/7', label: 'Online Access', accent: 'bg-amber-50 text-amber-700' }
		]
	};
}
function defaultMission(): LibraryMissionData {
	return {
		eyebrow: 'Our Mission',
		heading: 'Empowering learning through access',
		body: 'The BPIT Library serves as the academic heart of our institution, providing comprehensive information resources and services to support teaching, learning, and research. We are committed to fostering an environment that encourages intellectual growth and lifelong learning.'
	};
}
function defaultFeatures(): LibraryFeaturesData {
	return {
		items: [
			{ icon: 'Database', title: 'Digital Library', description: 'Access thousands of e-books, research papers, and academic journals online.' },
			{ icon: 'BookOpen', title: 'Study Spaces', description: 'Quiet and comfortable reading areas with modern facilities.' },
			{ icon: 'Clock', title: 'Extended Hours', description: 'Library services available with extended hours during exam periods.' },
			{ icon: 'Users', title: 'Research Support', description: 'Expert assistance for research projects and academic work.' }
		]
	};
}
function defaultInfo(): LibraryInfoData {
	return {
		heading: 'Library Information',
		description: 'Everything you need to plan your visit or remote access.',
		locationTitle: 'Location',
		locationLine1: 'Ground Floor, Academic Block',
		locationLine2: 'Bhagwan Parshuram Institute of Technology',
		quickLinksHeading: 'Quick Links',
		quickLinks: [
			{ label: 'Library Timings', href: '/academia/library/timings' },
			{ label: 'Digital Resources', href: '/academia/library/e-resources' },
			{ label: 'Book Collection', href: '/academia/library/collection' },
			{ label: 'Contact', href: '/academia/library/contact' }
		]
	};
}

// ---------- Generic helpers ----------

type SectionDef = { key: string; order: number; tag: string };

async function readSection<T>(
	def: SectionDef,
	schema: z.ZodType<T>,
	fallback: () => T
): Promise<T> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug: PAGE_SLUG },
					include: { components: true }
				});
				if (!page) return fallback();
				const c = page.components.find(x => x.key === def.key);
				if (!c) return fallback();
				const parsed = schema.safeParse(c.data);
				return parsed.success ? parsed.data : fallback();
			} catch (e) {
				console.error(`readSection ${def.key} failed`, e);
				return fallback();
			}
		},
		[def.tag],
		{ tags: [def.tag], revalidate: 3600 }
	)();
}

async function ensurePage() {
	return prisma.page.upsert({
		where: { slug: PAGE_SLUG },
		update: {},
		create: {
			slug: PAGE_SLUG,
			title: 'Library',
			kind: 'PAGE',
			status: 'PUBLISHED'
		}
	});
}

async function writeSection<T>(
	def: SectionDef,
	schema: z.ZodType<T>,
	data: T,
	summary: string
) {
	const admin = await requireAdmin();
	const parsed = schema.safeParse(data);
	if (!parsed.success) return { ok: false as const, error: 'invalid_payload' };
	try {
		const page = await ensurePage();
		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: def.key }
		});
		const previousData = existing?.data ?? null;
		const component = await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: def.order } },
			update: {
				data: parsed.data as unknown as Prisma.InputJsonValue,
				key: def.key
			},
			create: {
				pageId: page.id,
				order: def.order,
				key: def.key,
				data: parsed.data as unknown as Prisma.InputJsonValue
			}
		});
		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'COMPONENT',
			summary,
			changes: [
				{
					resourceId: component.id,
					resourceType: 'COMPONENT',
					field: 'data',
					previousData:
						previousData === null
							? undefined
							: (previousData as Prisma.InputJsonValue),
					newData: parsed.data as unknown as Prisma.InputJsonValue
				}
			]
		});
		revalidateTag(def.tag);
		revalidatePath('/academia/library');
		revalidatePath('/admin/academia/library');
		return { ok: true as const };
	} catch (e) {
		console.error(`writeSection ${def.key} failed`, e);
		return { ok: false as const, error: 'save_failed' };
	}
}

// ---------- Public getters / updaters ----------

export async function getLibraryHero() {
	return readSection(KEYS.HERO, heroSchema, defaultHero);
}
export async function getLibraryStats() {
	return readSection(KEYS.STATS, statsSchema, defaultStats);
}
export async function getLibraryMission() {
	return readSection(KEYS.MISSION, missionSchema, defaultMission);
}
export async function getLibraryFeatures() {
	return readSection(KEYS.FEATURES, featuresSchema, defaultFeatures);
}
export async function getLibraryInfo() {
	return readSection(KEYS.INFO, infoSchema, defaultInfo);
}

export async function updateLibraryHero(data: LibraryHeroData) {
	return writeSection(KEYS.HERO, heroSchema, data, 'Updated Library hero');
}
export async function updateLibraryStats(data: LibraryStatsData) {
	return writeSection(KEYS.STATS, statsSchema, data, 'Updated Library stats');
}
export async function updateLibraryMission(data: LibraryMissionData) {
	return writeSection(KEYS.MISSION, missionSchema, data, 'Updated Library mission');
}
export async function updateLibraryFeatures(data: LibraryFeaturesData) {
	return writeSection(
		KEYS.FEATURES,
		featuresSchema,
		data,
		'Updated Library features'
	);
}
export async function updateLibraryInfo(data: LibraryInfoData) {
	return writeSection(KEYS.INFO, infoSchema, data, 'Updated Library info');
}
