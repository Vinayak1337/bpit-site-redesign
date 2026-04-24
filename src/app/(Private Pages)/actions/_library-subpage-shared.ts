// Private helper module — NOT 'use server'.
// Provides generic section read/write helpers and archetype schemas shared by
// all /academia/library/<slug> sub-pages.
import 'server-only';

import { z } from 'zod';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';

// ===================== Types =====================

export type SubHeroData = {
	eyebrow: string;
	title: string;
	subtitle: string;
	backgroundImage: string | null;
	gradient: string; // e.g. 'from-blue-50 to-indigo-100'
};

export type SimpleContentSection = {
	icon: string;
	title: string;
	description: string;
	note: string;
};

export type SimpleContentData = {
	eyebrow: string;
	heading: string;
	intro: string;
	sections: SimpleContentSection[];
	body: string;
};

export type StaffItem = {
	name: string;
	role: string;
	email: string;
	phone: string;
	avatar: string | null;
	qualification: string;
	specialization: string;
};
export type StaffListData = { items: StaffItem[] };

export type AdvisoryItem = {
	name: string;
	designation: string;
	role: string;
	avatar: string | null;
	email: string;
	phone: string;
};
export type AdvisoryListData = { items: AdvisoryItem[] };

export type DownloadItem = {
	title: string;
	description: string;
	fileUrl: string;
	date: string;
	fileSize: string;
	fileType: string;
	category: string;
};
export type DownloadsListData = { items: DownloadItem[] };

export type UsefulLinkItem = {
	title: string;
	url: string;
	description: string;
	category: string;
};
export type UsefulLinksListData = { items: UsefulLinkItem[] };

export type ContactData = {
	phone: string;
	email: string;
	address: string;
	hours: string;
	mapEmbed: string;
};

// ===================== Schemas =====================

export const subHeroSchema: z.ZodType<SubHeroData> = z.object({
	eyebrow: z.string(),
	title: z.string().min(1),
	subtitle: z.string(),
	backgroundImage: z.string().nullable(),
	gradient: z.string()
});

const simpleSectionSchema: z.ZodType<SimpleContentSection> = z.object({
	icon: z.string(),
	title: z.string(),
	description: z.string(),
	note: z.string()
});

export const simpleContentSchema: z.ZodType<SimpleContentData> = z.object({
	eyebrow: z.string(),
	heading: z.string(),
	intro: z.string(),
	sections: z.array(simpleSectionSchema),
	body: z.string()
});

const staffItemSchema: z.ZodType<StaffItem> = z.object({
	name: z.string(),
	role: z.string(),
	email: z.string(),
	phone: z.string(),
	avatar: z.string().nullable(),
	qualification: z.string(),
	specialization: z.string()
});
export const staffListSchema: z.ZodType<StaffListData> = z.object({
	items: z.array(staffItemSchema)
});

const advisoryItemSchema: z.ZodType<AdvisoryItem> = z.object({
	name: z.string(),
	designation: z.string(),
	role: z.string(),
	avatar: z.string().nullable(),
	email: z.string(),
	phone: z.string()
});
export const advisoryListSchema: z.ZodType<AdvisoryListData> = z.object({
	items: z.array(advisoryItemSchema)
});

const downloadItemSchema: z.ZodType<DownloadItem> = z.object({
	title: z.string(),
	description: z.string(),
	fileUrl: z.string(),
	date: z.string(),
	fileSize: z.string(),
	fileType: z.string(),
	category: z.string()
});
export const downloadsListSchema: z.ZodType<DownloadsListData> = z.object({
	items: z.array(downloadItemSchema)
});

const usefulLinkItemSchema: z.ZodType<UsefulLinkItem> = z.object({
	title: z.string(),
	url: z.string(),
	description: z.string(),
	category: z.string()
});
export const usefulLinksListSchema: z.ZodType<UsefulLinksListData> = z.object({
	items: z.array(usefulLinkItemSchema)
});

export const contactSchema: z.ZodType<ContactData> = z.object({
	phone: z.string(),
	email: z.string(),
	address: z.string(),
	hours: z.string(),
	mapEmbed: z.string()
});

// ===================== Default generators =====================

export function defaultSubHero(overrides: Partial<SubHeroData> = {}): SubHeroData {
	return {
		eyebrow: '',
		title: '',
		subtitle: '',
		backgroundImage: null,
		gradient: 'from-blue-50 to-indigo-100',
		...overrides
	};
}

export function defaultSimpleContent(
	overrides: Partial<SimpleContentData> = {}
): SimpleContentData {
	return {
		eyebrow: '',
		heading: '',
		intro: '',
		sections: [],
		body: '',
		...overrides
	};
}

// ===================== Generic read/write =====================

type SectionDef = { key: string; order: number; tag: string };

export function sectionDefs(slug: string) {
	return {
		HERO: { key: 'HERO', order: 0, tag: `${slug}-hero` },
		CONTENT: { key: 'CONTENT', order: 1, tag: `${slug}-content` },
		LIST: { key: 'LIST', order: 2, tag: `${slug}-list` },
		CONTACT: { key: 'CONTACT', order: 3, tag: `${slug}-contact` }
	} as const;
}

export async function ensurePage(pageSlug: string, title: string) {
	return prisma.page.upsert({
		where: { slug: pageSlug },
		update: {},
		create: {
			slug: pageSlug,
			title,
			kind: 'PAGE',
			status: 'PUBLISHED'
		}
	});
}

export function makeReadSection(pageSlug: string) {
	return async function readSection<T>(
		def: SectionDef,
		schema: z.ZodType<T>,
		fallback: () => T
	): Promise<T> {
		return unstable_cache(
			async () => {
				try {
					const page = await prisma.page.findUnique({
						where: { slug: pageSlug },
						include: { components: true }
					});
					if (!page) return fallback();
					const c = page.components.find(x => x.key === def.key);
					if (!c) return fallback();
					const parsed = schema.safeParse(c.data);
					return parsed.success ? parsed.data : fallback();
				} catch (e) {
					console.error(`readSection ${pageSlug}/${def.key} failed`, e);
					return fallback();
				}
			},
			[def.tag],
			{ tags: [def.tag], revalidate: 3600 }
		)();
	};
}

export function makeWriteSection(pageSlug: string, title: string, publicSubPath: string) {
	return async function writeSection<T>(
		def: SectionDef,
		schema: z.ZodType<T>,
		data: T,
		summary: string
	) {
		const admin = await requireAdmin();
		const parsed = schema.safeParse(data);
		if (!parsed.success) return { ok: false as const, error: 'invalid_payload' };
		try {
			const page = await ensurePage(pageSlug, title);
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
			revalidatePath(`/academia/library/${publicSubPath}`);
			revalidatePath(`/admin/academia/library/${publicSubPath}`);
			return { ok: true as const };
		} catch (e) {
			console.error(`writeSection ${pageSlug}/${def.key} failed`, e);
			return { ok: false as const, error: 'save_failed' };
		}
	};
}
