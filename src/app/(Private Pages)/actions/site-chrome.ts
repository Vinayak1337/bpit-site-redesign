'use server';
import 'server-only';

import { z } from 'zod';
import { PageKind, PageStatus, Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { defaultSiteChromeConfig } from '@/data/site-chrome';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';

const SITE_CHROME_SLUG = 'site-chrome';
const SITE_CHROME_COMPONENT_KEY = 'site-chrome-config';

const stringOrUndefined = z
	.string()
	.optional()
	.transform(value => {
		const trimmed = value?.trim() ?? '';
		return trimmed.length > 0 ? trimmed : undefined;
	});

const linkItemSchema = z.object({
	id: z.string().min(1),
	label: z.string().min(1).max(80),
	href: z.string().min(1).max(300),
	description: stringOrUndefined,
	icon: stringOrUndefined,
	enabled: z.boolean(),
	order: z.coerce.number().int().min(0).max(10000)
});

const navSectionSchema = z.object({
	id: z.string().min(1),
	label: z.string().min(1).max(80),
	icon: stringOrUndefined,
	enabled: z.boolean(),
	order: z.coerce.number().int().min(0).max(10000),
	items: z.array(linkItemSchema).max(40)
});

const logoSchema = z.object({
	src: z.string().min(1).max(500),
	alt: z.string().min(1).max(120)
});

const footerStatSchema = z.object({
	id: z.string().min(1),
	number: z.string().min(1).max(40),
	label: z.string().min(1).max(80),
	icon: stringOrUndefined,
	enabled: z.boolean(),
	order: z.coerce.number().int().min(0).max(10000)
});

const footerSocialSchema = z.object({
	id: z.string().min(1),
	label: z.string().min(1).max(80),
	href: z.string().min(1).max(300),
	icon: stringOrUndefined,
	gradientClass: stringOrUndefined,
	ariaLabel: stringOrUndefined,
	enabled: z.boolean(),
	order: z.coerce.number().int().min(0).max(10000)
});

const siteChromeConfigSchema = z.object({
	logo: logoSchema,
	navSections: z.array(navSectionSchema).max(16),
	footer: z.object({
		quickLinks: z.array(linkItemSchema).max(40),
		socialLinks: z.array(footerSocialSchema).max(20),
		stats: z.array(footerStatSchema).max(12),
		bottomText: z.object({
			copyright: z.string().min(1).max(180),
			accreditation: z.string().max(180)
		})
	})
});

const sortByOrder = <T extends { order: number }>(items: T[]): T[] =>
	[...items].sort((a, b) => a.order - b.order);

const normalizeId = (id: string, fallback: string): string => {
	const normalized = id
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return normalized || fallback;
};

const isSitemapLink = (item: { label: string; href: string }): boolean => {
	const label = item.label.trim().toLowerCase();
	const href = item.href.trim().toLowerCase();
	return label === 'sitemap' || href.includes('sitemap.xml');
};

const normalizeLink = (
	item: z.infer<typeof linkItemSchema>,
	index: number
): SiteChromeLinkItem => ({
	id: normalizeId(item.id, `link-${index + 1}`),
	label: item.label.trim(),
	href: item.href.trim(),
	description: item.description,
	icon: item.icon,
	enabled: item.enabled,
	order: item.order
});

const normalizeConfig = (
	config: z.infer<typeof siteChromeConfigSchema>
): SiteChromeConfig => ({
	logo: {
		src: config.logo.src.trim() || defaultSiteChromeConfig.logo.src,
		alt: config.logo.alt.trim() || defaultSiteChromeConfig.logo.alt
	},
	navSections: sortByOrder(
		config.navSections.map((section, sectionIndex) => ({
			id: normalizeId(section.id, `section-${sectionIndex + 1}`),
			label: section.label.trim(),
			icon: section.icon,
			enabled: section.enabled,
			order: section.order,
			items: sortByOrder(
				section.items
					.map((item, itemIndex) => normalizeLink(item, itemIndex))
					.filter(item => item.label.length > 0 && item.href.length > 0)
					.filter(item => !isSitemapLink(item))
			)
		}))
	).filter(section => section.label.length > 0),
	footer: {
		quickLinks: sortByOrder(
			config.footer.quickLinks
				.map((item, itemIndex) => normalizeLink(item, itemIndex))
				.filter(item => item.label.length > 0 && item.href.length > 0)
				.filter(item => !isSitemapLink(item))
		),
		socialLinks: sortByOrder(
			config.footer.socialLinks
				.map((item, index) => ({
					id: normalizeId(item.id, `social-${index + 1}`),
					label: item.label.trim(),
					href: item.href.trim(),
					icon: item.icon,
					gradientClass: item.gradientClass,
					ariaLabel: item.ariaLabel,
					enabled: item.enabled,
					order: item.order
				}))
				.filter(item => item.label.length > 0 && item.href.length > 0)
		),
		stats: sortByOrder(
			config.footer.stats
				.map((item, index) => ({
					id: normalizeId(item.id, `stat-${index + 1}`),
					number: item.number.trim(),
					label: item.label.trim(),
					icon: item.icon,
					enabled: item.enabled,
					order: item.order
				}))
				.filter(item => item.number.length > 0 && item.label.length > 0)
		),
		bottomText: {
			copyright: config.footer.bottomText.copyright.trim(),
			accreditation: config.footer.bottomText.accreditation.trim()
		}
	}
});

const mergeWithDefaults = (input: unknown): SiteChromeConfig => {
	const parsed = siteChromeConfigSchema.safeParse(input);
	if (!parsed.success) return defaultSiteChromeConfig;
	return normalizeConfig(parsed.data);
};

export async function getSiteChromeConfig(): Promise<SiteChromeConfig> {
	const component = await prisma.component.findFirst({
		where: {
			key: SITE_CHROME_COMPONENT_KEY,
			page: { slug: SITE_CHROME_SLUG }
		},
		select: { data: true }
	});

	if (!component?.data) return defaultSiteChromeConfig;
	return mergeWithDefaults(component.data);
}

const persistSiteChromeConfig = async (sanitized: SiteChromeConfig) => {
	await prisma.$transaction(async tx => {
		const page = await tx.page.upsert({
			where: { slug: SITE_CHROME_SLUG },
			create: {
				slug: SITE_CHROME_SLUG,
				title: 'Site Header and Footer',
				kind: PageKind.GLOBAL,
				status: PageStatus.PUBLISHED
			},
			update: {
				title: 'Site Header and Footer',
				kind: PageKind.GLOBAL,
				status: PageStatus.PUBLISHED
			},
			select: { id: true }
		});

		await tx.component.upsert({
			where: {
				pageId_order: {
					pageId: page.id,
					order: 0
				}
			},
			create: {
				pageId: page.id,
				order: 0,
				key: SITE_CHROME_COMPONENT_KEY,
				data: sanitized as unknown as Prisma.InputJsonValue
			},
			update: {
				key: SITE_CHROME_COMPONENT_KEY,
				data: sanitized as unknown as Prisma.InputJsonValue
			}
		});
	});
};

const recordSiteChromeAudit = async ({
	actorId,
	previous,
	sanitized,
	summary
}: {
	actorId: string;
	previous: SiteChromeConfig;
	sanitized: SiteChromeConfig;
	summary: string;
}) => {
	await createAuditLog({
		actorId,
		action: 'UPDATE',
		resourceType: 'COMPONENT',
		summary,
		changes: [
			{
				resourceId: SITE_CHROME_SLUG,
				resourceType: 'COMPONENT',
				field: 'siteChrome',
				previousData: previous as unknown as Prisma.InputJsonValue,
				newData: sanitized as unknown as Prisma.InputJsonValue
			}
		]
	});
};

export async function updateSiteChromeConfig(
	config: SiteChromeConfig
): Promise<{ ok: true; data: SiteChromeConfig } | { ok: false; error: string }> {
	const admin = await requireAdmin();
	const parsed = siteChromeConfigSchema.safeParse(config);
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	const sanitized = normalizeConfig(parsed.data);
	const previous = await getSiteChromeConfig();

	await persistSiteChromeConfig(sanitized);
	await recordSiteChromeAudit({
		actorId: admin.id,
		previous,
		sanitized,
		summary: 'Updated site header and footer configuration'
	});

	return { ok: true, data: sanitized };
}

export async function updateSiteChromeHeaderConfig(config: {
	logo: SiteChromeLogoConfig;
	navSections: SiteChromeNavSection[];
}): Promise<{ ok: true; data: SiteChromeConfig } | { ok: false; error: string }> {
	const admin = await requireAdmin();
	const previous = await getSiteChromeConfig();
	const parsed = siteChromeConfigSchema.safeParse({
		...previous,
		logo: config.logo,
		navSections: config.navSections
	});
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	const sanitized = normalizeConfig(parsed.data);
	await persistSiteChromeConfig(sanitized);
	await recordSiteChromeAudit({
		actorId: admin.id,
		previous,
		sanitized,
		summary: 'Updated site header and navbar configuration'
	});

	return { ok: true, data: sanitized };
}

export async function updateSiteChromeFooterConfig(
	footer: SiteChromeFooterConfig
): Promise<{ ok: true; data: SiteChromeConfig } | { ok: false; error: string }> {
	const admin = await requireAdmin();
	const previous = await getSiteChromeConfig();
	const parsed = siteChromeConfigSchema.safeParse({
		...previous,
		footer
	});
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	const sanitized = normalizeConfig(parsed.data);
	await persistSiteChromeConfig(sanitized);
	await recordSiteChromeAudit({
		actorId: admin.id,
		previous,
		sanitized,
		summary: 'Updated site footer configuration'
	});

	return { ok: true, data: sanitized };
}
