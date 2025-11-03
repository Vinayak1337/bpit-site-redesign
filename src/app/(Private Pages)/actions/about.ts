'use server';
import 'server-only';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';
import { revalidateTag, unstable_cache } from 'next/cache';
import {
	aboutHeroData as aboutHeroDefaults,
	aboutOverviewData as aboutOverviewDefaults,
	aboutLegacyData as aboutLegacyDefaults
} from '@/data/about';

const aboutHeroSchema = z.object({
	title: z.string().min(1),
	subtitle: z.string().min(1),
	gradient: z.string().min(1),
	backgroundImage: z.string().url().optional().or(z.literal('')).or(z.null())
});

const STAT_COLOR_VALUES = ['green', 'purple', 'blue'] as const;
const iconStringSchema = z.string().min(1);

const aboutStatSchema = z.object({
	icon: iconStringSchema,
	value: z.string().min(1),
	label: z.string().min(1),
	color: z.enum(STAT_COLOR_VALUES).default('blue')
});

const aboutOverviewHeaderSchema = z.object({
	title: z.string().min(1),
	subtitle: z.string().min(1),
	established: z.string().min(1),
	location: z.string().min(1),
	accreditation: z.string().min(1),
	affiliation: z.string().min(1),
	image: z
		.string()
		.url()
		.or(z.literal(''))
		.nullable()
		.optional()
});

const aboutOverviewSchema = z.object({
	header: aboutOverviewHeaderSchema,
	stats: z.array(aboutStatSchema).default([])
});

const aboutLegacySchema = z.object({
	title: z.string().min(1),
	paragraphs: z.array(z.string().min(1)).default([]),
	features: z
		.array(
			z.object({
				icon: iconStringSchema,
				title: z.string().min(1),
				description: z.string().min(1),
				color: z.enum(STAT_COLOR_VALUES).default('blue')
			})
		)
		.default([])
});

export type AboutHeroData = z.infer<typeof aboutHeroSchema>;
export type AboutOverviewData = z.infer<typeof aboutOverviewSchema>;
export type AboutLegacyData = z.infer<typeof aboutLegacySchema>;

const HERO_GRADIENT = aboutHeroDefaults.gradient ?? 'from-blue-600 to-blue-700';
const DEFAULT_STAT_ICON = 'GraduationCap';

const ABOUT_HERO_CACHE_TAG = 'about-hero';
const ABOUT_OVERVIEW_CACHE_TAG = 'about-overview';
const ABOUT_LEGACY_CACHE_TAG = 'about-legacy';

function normalizeHero(
	input: AboutHeroData | null | undefined
): AboutHeroData {
	const base: AboutHeroData = {
		title: aboutHeroDefaults.title,
		subtitle: aboutHeroDefaults.subtitle,
		gradient: HERO_GRADIENT,
		backgroundImage: aboutHeroDefaults.backgroundImage ?? null
	};
	if (!input) {
		return base;
	}

	const parsed = aboutHeroSchema.safeParse(input);
	if (!parsed.success) {
		return base;
	}

	const backgroundImage =
		parsed.data.backgroundImage === ''
			? null
			: parsed.data.backgroundImage ?? null;

	return {
		...base,
		...parsed.data,
		gradient: HERO_GRADIENT,
		backgroundImage
	};
}

function normalizeOverview(
	input: AboutOverviewData | null | undefined
): AboutOverviewData {
	const sanitizeHeader = (
		header: z.infer<typeof aboutOverviewHeaderSchema>
	) => ({
		title: header.title.trim(),
		subtitle: header.subtitle.trim(),
		established: header.established.trim(),
		location: header.location.trim(),
		accreditation: header.accreditation.trim(),
		affiliation: header.affiliation.trim(),
		image:
			typeof header.image === 'string' && header.image.trim().length > 0
				? header.image.trim()
				: null
	});

	const sanitizeStat = (
		stat: z.infer<typeof aboutStatSchema>
	): AboutOverviewData['stats'][number] => {
		const icon = stat.icon?.trim().length
			? stat.icon.trim()
			: DEFAULT_STAT_ICON;
		const color = STAT_COLOR_VALUES.includes(
			stat.color as (typeof STAT_COLOR_VALUES)[number]
		)
			? stat.color
			: 'blue';
		return {
			icon,
			value: stat.value.trim(),
			label: stat.label.trim(),
			color
		};
	};

	const fallback = {
		header: sanitizeHeader(aboutOverviewDefaults.header),
		stats: (aboutOverviewDefaults.stats ?? []).map(sanitizeStat)
	};

	const parsed = aboutOverviewSchema.safeParse(input);
	if (!parsed.success) {
		return fallback;
	}

	return {
		header: sanitizeHeader(parsed.data.header),
		stats: parsed.data.stats.map(sanitizeStat)
	};
}

function normalizeLegacy(
	input: AboutLegacyData | null | undefined
): AboutLegacyData {
	const parsed = aboutLegacySchema.safeParse(input);
	if (parsed.success) {
		return parsed.data;
	}

	return {
		title: aboutLegacyDefaults.title,
		paragraphs: aboutLegacyDefaults.paragraphs,
		features: aboutLegacyDefaults.features
	};
}

async function getPageId(pageSlug: string): Promise<string | null> {
	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	return page?.id ?? null;
}

async function fetchComponentData<T>(
	pageSlug: string,
	key: string
): Promise<T | null> {
	const pageId = await getPageId(pageSlug);
	if (!pageId) return null;
	const component = await prisma.component.findFirst({
		where: { pageId, key }
	});
	if (!component) return null;
	return component.data as T;
}

async function getAboutHeroUncached(pageSlug: string): Promise<AboutHeroData> {
	const data = await fetchComponentData<AboutHeroData>(
		pageSlug,
		'ABOUT_HERO'
	);
	return normalizeHero(data);
}

async function getAboutOverviewUncached(
	pageSlug: string
): Promise<AboutOverviewData> {
	const data = await fetchComponentData<AboutOverviewData>(
		pageSlug,
		'ABOUT_OVERVIEW'
	);
	return normalizeOverview(data);
}

async function getAboutLegacyUncached(
	pageSlug: string
): Promise<AboutLegacyData> {
	const data = await fetchComponentData<AboutLegacyData>(
		pageSlug,
		'ABOUT_LEGACY'
	);
	return normalizeLegacy(data);
}

export const getAboutHero = unstable_cache(
	getAboutHeroUncached,
	['getAboutHero'],
	{ tags: [ABOUT_HERO_CACHE_TAG] }
);

export const getAboutOverview = unstable_cache(
	getAboutOverviewUncached,
	['getAboutOverview'],
	{ tags: [ABOUT_OVERVIEW_CACHE_TAG] }
);

export const getAboutLegacy = unstable_cache(
	getAboutLegacyUncached,
	['getAboutLegacy'],
	{ tags: [ABOUT_LEGACY_CACHE_TAG] }
);

async function updateComponentData<T>(
	pageSlug: string,
	key: string,
	data: T,
	cacheTag: string,
	summary: string
): Promise<{ ok: true } | { ok: false; error: string }> {
	const admin = await requireAdmin();

	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) {
		return { ok: false, error: 'page_not_found' };
	}

	const component = await prisma.component.findFirst({
		where: { pageId: page.id, key }
	});
	if (!component) {
		return { ok: false, error: 'component_not_found' };
	}

	const previousData = component.data;

	await prisma.component.update({
		where: { id: component.id },
		data: { data }
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
						: (previousData as unknown as Prisma.InputJsonValue),
				newData: data as unknown as Prisma.InputJsonValue
			}
		]
	});

	revalidateTag(cacheTag);

	return { ok: true };
}

export async function updateAboutHero(
	pageSlug: string,
	data: AboutHeroData
): Promise<{ ok: true } | { ok: false; error: string }> {
	const parsed = aboutHeroSchema.safeParse(data);
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	const sanitized: AboutHeroData = {
		title: parsed.data.title.trim(),
		subtitle: parsed.data.subtitle.trim(),
		gradient: HERO_GRADIENT,
		backgroundImage:
			parsed.data.backgroundImage && parsed.data.backgroundImage.length > 0
				? parsed.data.backgroundImage
				: null
	};

	return updateComponentData(
		pageSlug,
		'ABOUT_HERO',
		sanitized,
		ABOUT_HERO_CACHE_TAG,
		`Updated About hero for page ${pageSlug}`
	);
}

export async function updateAboutOverview(
	pageSlug: string,
	data: AboutOverviewData
): Promise<{ ok: true } | { ok: false; error: string }> {
	const parsed = aboutOverviewSchema.safeParse(data);
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	const normalized = normalizeOverview(parsed.data);

	return updateComponentData(
		pageSlug,
		'ABOUT_OVERVIEW',
		normalized,
		ABOUT_OVERVIEW_CACHE_TAG,
		`Updated About overview for page ${pageSlug}`
	);
}

export async function updateAboutLegacy(
	pageSlug: string,
	data: AboutLegacyData
): Promise<{ ok: true } | { ok: false; error: string }> {
	const parsed = aboutLegacySchema.safeParse(data);
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	return updateComponentData(
		pageSlug,
		'ABOUT_LEGACY',
		parsed.data,
		ABOUT_LEGACY_CACHE_TAG,
		`Updated About legacy for page ${pageSlug}`
	);
}
