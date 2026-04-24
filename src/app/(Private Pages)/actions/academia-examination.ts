'use server';
import 'server-only';

import { z } from 'zod';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';

const PAGE_SLUG = 'academia-examination';
const HERO_KEY = 'HERO';
const CONTENT_KEY = 'MAIN_CONTENT';
const HERO_TAG = `${PAGE_SLUG}-hero`;
const CONTENT_TAG = `${PAGE_SLUG}-content`;

// ---------- Schemas ----------

const heroSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	subtitle: z.string().min(1, 'Subtitle is required'),
	backgroundImage: z.string().nullable(),
	gradient: z
		.string()
		.optional()
		.default('from-blue-600 to-blue-700')
});

export type ExaminationHeroData = z.infer<typeof heroSchema>;

const contentSectionSchema = z.object({
	icon: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	note: z.string().optional().default('')
});

const contentSchema = z.object({
	eyebrow: z.string().min(1),
	heading: z.string().min(1),
	intro: z.string().min(1),
	sections: z.array(contentSectionSchema).default([]),
	body: z.string().optional().default('')
});

export type ExaminationContentData = z.infer<typeof contentSchema>;

// ---------- Defaults (used when DB is empty or page not seeded) ----------

function defaultHero(): ExaminationHeroData {
	return {
		title: 'Examination',
		subtitle:
			'Schedules, resources and guidelines for all examinations at BPIT.',
		backgroundImage: null,
		gradient: 'from-blue-600 to-blue-700'
	};
}

function defaultContent(): ExaminationContentData {
	return {
		eyebrow: 'Examination Cell',
		heading: 'Examination information and resources',
		intro:
			'Find exam schedules, result notifications, previous year papers, and evaluation guidelines in one place.',
		sections: [
			{
				icon: 'CalendarClock',
				title: 'Exam Schedules',
				description:
					'Mid-semester and end-semester date sheets for all programs.',
				note: 'Updated ahead of each academic cycle.'
			},
			{
				icon: 'ClipboardList',
				title: 'Results & Re-evaluation',
				description:
					'Latest results, gazette of results and re-evaluation process.',
				note: 'Notifications published via Notices & Circulars.'
			},
			{
				icon: 'FileCheck',
				title: 'Rules & Guidelines',
				description:
					'Examination rules, malpractice policies and sample papers.',
				note: ''
			}
		],
		body: ''
	};
}

// ---------- Readers ----------

export async function getExaminationHero(): Promise<ExaminationHeroData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug: PAGE_SLUG },
					include: { components: true }
				});
				if (!page) return defaultHero();
				const component = page.components.find(c => c.key === HERO_KEY);
				if (!component) return defaultHero();
				const parsed = heroSchema.safeParse(component.data);
				return parsed.success ? parsed.data : defaultHero();
			} catch (error) {
				console.error('getExaminationHero failed', error);
				return defaultHero();
			}
		},
		[HERO_TAG],
		{ tags: [HERO_TAG], revalidate: 3600 }
	)();
}

export async function getExaminationContent(): Promise<ExaminationContentData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug: PAGE_SLUG },
					include: { components: true }
				});
				if (!page) return defaultContent();
				const component = page.components.find(c => c.key === CONTENT_KEY);
				if (!component) return defaultContent();
				const parsed = contentSchema.safeParse(component.data);
				return parsed.success ? parsed.data : defaultContent();
			} catch (error) {
				console.error('getExaminationContent failed', error);
				return defaultContent();
			}
		},
		[CONTENT_TAG],
		{ tags: [CONTENT_TAG], revalidate: 3600 }
	)();
}

// ---------- Writers ----------

async function ensurePage() {
	return prisma.page.upsert({
		where: { slug: PAGE_SLUG },
		update: {},
		create: {
			slug: PAGE_SLUG,
			title: 'Examination',
			kind: 'PAGE',
			status: 'PUBLISHED'
		}
	});
}

export async function updateExaminationHero(data: ExaminationHeroData) {
	const admin = await requireAdmin();

	const parsed = heroSchema.safeParse(data);
	if (!parsed.success) {
		return { ok: false as const, error: 'invalid_payload' };
	}

	try {
		const page = await ensurePage();
		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: HERO_KEY }
		});
		const previousData = existing?.data ?? null;

		const component = await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: page.id,
					order: 0
				}
			},
			update: {
				data: parsed.data as unknown as Prisma.InputJsonValue,
				key: HERO_KEY
			},
			create: {
				pageId: page.id,
				data: parsed.data as unknown as Prisma.InputJsonValue,
				order: 0,
				key: HERO_KEY
			}
		});

		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'COMPONENT',
			summary: `Updated Examination hero`,
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

		revalidateTag(HERO_TAG);
		revalidatePath('/academia/examination');
		revalidatePath('/admin/academia/examination');
		return { ok: true as const };
	} catch (error) {
		console.error('updateExaminationHero failed', error);
		return { ok: false as const, error: 'save_failed' };
	}
}

export async function updateExaminationContent(data: ExaminationContentData) {
	const admin = await requireAdmin();

	const parsed = contentSchema.safeParse(data);
	if (!parsed.success) {
		return { ok: false as const, error: 'invalid_payload' };
	}

	try {
		const page = await ensurePage();
		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: CONTENT_KEY }
		});
		const previousData = existing?.data ?? null;

		const component = await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: page.id,
					order: 1
				}
			},
			update: {
				data: parsed.data as unknown as Prisma.InputJsonValue,
				key: CONTENT_KEY
			},
			create: {
				pageId: page.id,
				data: parsed.data as unknown as Prisma.InputJsonValue,
				order: 1,
				key: CONTENT_KEY
			}
		});

		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'COMPONENT',
			summary: `Updated Examination content`,
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

		revalidateTag(CONTENT_TAG);
		revalidatePath('/academia/examination');
		revalidatePath('/admin/academia/examination');
		return { ok: true as const };
	} catch (error) {
		console.error('updateExaminationContent failed', error);
		return { ok: false as const, error: 'save_failed' };
	}
}
