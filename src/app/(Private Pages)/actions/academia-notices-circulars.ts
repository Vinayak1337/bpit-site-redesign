'use server';
import 'server-only';

import { z } from 'zod';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';

const PAGE_SLUG = 'academia-notices-circulars';
const HERO_KEY = 'HERO';
const NOTICES_KEY = 'NOTICES';
const HERO_TAG = `${PAGE_SLUG}-hero`;
const NOTICES_TAG = `${PAGE_SLUG}-notices`;

// ---------- Schemas ----------

const heroSchema = z.object({
	title: z.string().min(1),
	subtitle: z.string().min(1)
});
export type NoticesHeroData = z.infer<typeof heroSchema>;

const noticeItemSchema = z.object({
	id: z.union([z.string(), z.number()]),
	category: z.string().min(1),
	title: z.string().min(1),
	subtitle: z.string().default(''),
	date: z.string().min(1),
	time: z.string().optional().default(''),
	priority: z.enum(['high', 'medium', 'low']),
	tags: z.array(z.string()).default([]),
	description: z.string().default(''),
	pinned: z.boolean().default(false),
	urgent: z.boolean().default(false),
	image: z.string().nullable().default(null),
	link: z.string().default('')
});
export type NoticeItem = z.infer<typeof noticeItemSchema>;

const noticesSchema = z.object({
	items: z.array(noticeItemSchema).default([])
});
export type NoticesData = z.infer<typeof noticesSchema>;

// ---------- Defaults ----------

function defaultHero(): NoticesHeroData {
	return {
		title: 'Notices & Circulars',
		subtitle:
			'Stay informed with the latest announcements, circular updates, and important notices from BPIT administration, departments, and academic sections.'
	};
}

function defaultNotices(): NoticesData {
	return {
		items: [
			{
				id: 1,
				category: 'Academic',
				title: 'Mid-semester examination schedule released',
				subtitle: 'Check your exam dates and prepare accordingly',
				date: '2024-12-28',
				time: '10:00 AM',
				priority: 'high',
				tags: ['Exam', 'Schedule', 'Important'],
				description:
					'The mid-semester examination schedule has been released. Students are advised to check their individual exam timetables and prepare accordingly.',
				pinned: true,
				urgent: true,
				image: null,
				link: '/'
			},
			{
				id: 2,
				category: 'Financial Aid',
				title: 'Merit-cum-Means Scholarship applications open',
				subtitle: 'Apply now for financial assistance programs',
				date: '2024-12-25',
				time: '2:30 PM',
				priority: 'medium',
				tags: ['Scholarship', 'Financial Aid', 'Application'],
				description:
					'Applications are now open for Merit-cum-Means Scholarships for the academic year 2024-25. Eligible students can apply online.',
				pinned: true,
				urgent: false,
				image: null,
				link: '/'
			},
			{
				id: 3,
				category: 'Admission',
				title: 'Additional counseling round for vacant seats',
				subtitle: 'Last chance for admission in B.Tech programs',
				date: '2024-12-20',
				time: '11:15 AM',
				priority: 'high',
				tags: ['Admission', 'Counseling', 'B.Tech'],
				description:
					'Additional counseling round will be conducted for remaining vacant seats in various B.Tech programs.',
				pinned: false,
				urgent: true,
				image: null,
				link: '/'
			},
			{
				id: 4,
				category: 'Sports',
				title: 'Inter-college sports tournament registration',
				subtitle: 'Register for annual sports competition',
				date: '2024-12-18',
				time: '4:00 PM',
				priority: 'medium',
				tags: ['Sports', 'Tournament'],
				description:
					'Registration is now open for the annual inter-college sports tournament.',
				pinned: false,
				urgent: false,
				image: null,
				link: '/'
			},
			{
				id: 5,
				category: 'Library',
				title: 'New digital resources added to library',
				subtitle: 'Access latest journals and e-books',
				date: '2024-12-15',
				time: '9:30 AM',
				priority: 'low',
				tags: ['Library', 'Digital Resources'],
				description:
					'The library has added new digital resources including international journals, e-books, and research databases.',
				pinned: false,
				urgent: false,
				image: null,
				link: '/'
			},
			{
				id: 6,
				category: 'Innovation',
				title: 'Annual Innovation Contest 2024',
				subtitle: 'Showcase your innovative ideas and win prizes',
				date: '2024-12-05',
				time: '11:00 AM',
				priority: 'high',
				tags: ['Innovation', 'Contest'],
				description:
					'Participate in the annual innovation contest and present your groundbreaking ideas.',
				pinned: true,
				urgent: false,
				image: null,
				link: '/'
			}
		]
	};
}

// ---------- Readers ----------

export async function getNoticesHero(): Promise<NoticesHeroData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug: PAGE_SLUG },
					include: { components: true }
				});
				if (!page) return defaultHero();
				const c = page.components.find(x => x.key === HERO_KEY);
				if (!c) return defaultHero();
				const parsed = heroSchema.safeParse(c.data);
				return parsed.success ? parsed.data : defaultHero();
			} catch (e) {
				console.error('getNoticesHero failed', e);
				return defaultHero();
			}
		},
		[HERO_TAG],
		{ tags: [HERO_TAG], revalidate: 3600 }
	)();
}

export async function getNoticesList(): Promise<NoticesData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug: PAGE_SLUG },
					include: { components: true }
				});
				if (!page) return defaultNotices();
				const c = page.components.find(x => x.key === NOTICES_KEY);
				if (!c) return defaultNotices();
				const parsed = noticesSchema.safeParse(c.data);
				return parsed.success ? parsed.data : defaultNotices();
			} catch (e) {
				console.error('getNoticesList failed', e);
				return defaultNotices();
			}
		},
		[NOTICES_TAG],
		{ tags: [NOTICES_TAG], revalidate: 3600 }
	)();
}

// ---------- Writers ----------

async function ensurePage() {
	return prisma.page.upsert({
		where: { slug: PAGE_SLUG },
		update: {},
		create: {
			slug: PAGE_SLUG,
			title: 'Notices & Circulars',
			kind: 'PAGE',
			status: 'PUBLISHED'
		}
	});
}

export async function updateNoticesHero(data: NoticesHeroData) {
	const admin = await requireAdmin();
	const parsed = heroSchema.safeParse(data);
	if (!parsed.success) return { ok: false as const, error: 'invalid_payload' };
	try {
		const page = await ensurePage();
		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: HERO_KEY }
		});
		const previousData = existing?.data ?? null;
		const component = await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 0 } },
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
			summary: 'Updated Notices hero',
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
		revalidatePath('/academia/notices-circulars');
		revalidatePath('/admin/academia/notices-circulars');
		return { ok: true as const };
	} catch (e) {
		console.error('updateNoticesHero failed', e);
		return { ok: false as const, error: 'save_failed' };
	}
}

export async function updateNoticesList(data: NoticesData) {
	const admin = await requireAdmin();
	const parsed = noticesSchema.safeParse(data);
	if (!parsed.success) return { ok: false as const, error: 'invalid_payload' };
	try {
		const page = await ensurePage();
		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: NOTICES_KEY }
		});
		const previousData = existing?.data ?? null;
		const component = await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: {
				data: parsed.data as unknown as Prisma.InputJsonValue,
				key: NOTICES_KEY
			},
			create: {
				pageId: page.id,
				data: parsed.data as unknown as Prisma.InputJsonValue,
				order: 1,
				key: NOTICES_KEY
			}
		});
		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'COMPONENT',
			summary: 'Updated Notices list',
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
		revalidateTag(NOTICES_TAG);
		revalidatePath('/academia/notices-circulars');
		revalidatePath('/admin/academia/notices-circulars');
		return { ok: true as const };
	} catch (e) {
		console.error('updateNoticesList failed', e);
		return { ok: false as const, error: 'save_failed' };
	}
}
