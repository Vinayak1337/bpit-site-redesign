'use server';
import 'server-only';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';

const categoryValues = [
	'Academic',
	'Financial Aid',
	'Admission',
	'Innovation',
	'Sports',
	'Library',
	'General'
] as const;

const priorityValues = ['low', 'medium', 'high'] as const;

const noticeItemSchema = z.object({
	id: z.union([z.string(), z.number()]).optional(),
	category: z.enum(categoryValues).default('General'),
	title: z.string().min(1),
	subtitle: z.string().default(''),
	date: z.string().min(1),
	time: z.string().default(''),
	image: z.string().min(1),
	priority: z.enum(priorityValues).default('medium'),
	tags: z.array(z.string()).default([]),
	description: z.string().default(''),
	pinned: z.boolean().default(false),
	urgent: z.boolean().default(false)
});

const noticesSectionSchema = z.object({
	notices: z.array(noticeItemSchema).default([]),
	announcements: z.array(noticeItemSchema).default([])
});

type NoticeItemInput = z.infer<typeof noticeItemSchema>;
type NoticesSectionInput = z.infer<typeof noticesSectionSchema>;

const defaultNoticesSection: NoticesSectionInput = {
	notices: [
		{
			id: 1,
			category: 'Academic',
			title: 'Mid-semester examination schedule released',
			subtitle: 'Check your exam dates and prepare accordingly',
			date: '2024-12-28',
			time: '10:00 AM',
			image: '/events/img1.png',
			priority: 'high',
			tags: ['Exam', 'Schedule', 'Important'],
			description:
				'The mid-semester examination schedule has been released. Students are advised to check their individual exam timetables and prepare accordingly.',
			pinned: true,
			urgent: true
		}
	],
	announcements: [
		{
			id: 1,
			category: 'Innovation',
			title: 'Institute Innovation Council (IIC) Meeting',
			subtitle: 'Monthly innovation council update',
			date: '2024-12-24',
			time: '1:30 PM',
			image: '/events/img1.png',
			priority: 'high',
			tags: ['Innovation', 'Council', 'Meeting'],
			description:
				'Monthly meeting of the Institute Innovation Council to discuss ongoing projects and future initiatives.',
			pinned: true,
			urgent: false
		}
	]
};

const toNotice = (item: NoticeItemInput): Notice => ({
	id: typeof item.id === 'number' ? item.id : Number(item.id ?? 0) || 0,
	category: item.category,
	title: item.title,
	subtitle: item.subtitle ?? '',
	date: item.date,
	time: item.time ?? '',
	image: item.image,
	priority: item.priority,
	tags: item.tags ?? [],
	description: item.description ?? '',
	pinned: item.pinned ?? false,
	urgent: item.urgent ?? false
});

const fromNotice = (notice: Notice): NoticeItemInput => ({
	id: notice.id,
	category: categoryValues.includes(
		notice.category as (typeof categoryValues)[number]
	)
		? (notice.category as (typeof categoryValues)[number])
		: 'General',
	title: notice.title,
	subtitle: notice.subtitle,
	date: notice.date,
	time: notice.time,
	image: notice.image,
	priority: priorityValues.includes(
		notice.priority as (typeof priorityValues)[number]
	)
		? (notice.priority as (typeof priorityValues)[number])
		: 'medium',
	tags: notice.tags,
	description: notice.description,
	pinned: notice.pinned,
	urgent: notice.urgent
});

const normalizeSection = (
	section: NoticesSectionInput
): NoticesSectionData => ({
	notices: section.notices.map(toNotice),
	announcements: section.announcements.map(toNotice)
});

export async function getNoticesSection(
	pageSlug: string
): Promise<NoticesSectionData> {
	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) {
		return normalizeSection(defaultNoticesSection);
	}

	const component = await prisma.component.findFirst({
		where: { pageId: page.id, key: 'NOTICES_SECTION' }
	});
	if (!component) {
		return normalizeSection(defaultNoticesSection);
	}

	const parsed = noticesSectionSchema.safeParse(component.data);
	if (!parsed.success) {
		return normalizeSection(defaultNoticesSection);
	}

	return normalizeSection(parsed.data);
}

export async function updateNoticesSection(
	pageSlug: string,
	section: NoticesSectionData
): Promise<{ ok: true } | { ok: false; error: string }> {
	const admin = await requireAdmin();

	const noticesForStore = section.notices.map(fromNotice);
	const announcementsForStore = section.announcements.map(fromNotice);

	const parsed = noticesSectionSchema.safeParse({
		notices: noticesForStore,
		announcements: announcementsForStore
	});
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) {
		return { ok: false, error: 'page_not_found' };
	}

	const component = await prisma.component.findFirst({
		where: { pageId: page.id, key: 'NOTICES_SECTION' }
	});
	if (!component) {
		return { ok: false, error: 'component_not_found' };
	}

	const previousData = component.data;

	await prisma.component.update({
		where: { id: component.id },
		data: { data: parsed.data }
	});

	await createAuditLog({
		actorId: admin.id,
		action: 'UPDATE',
		resourceType: 'COMPONENT',
		summary: `Updated notices section for page ${pageSlug}`,
		changes: [
			{
				resourceId: component.id,
				resourceType: 'COMPONENT',
				field: 'data',
				previousData:
					previousData === null
						? undefined
						: (previousData as unknown as Prisma.InputJsonValue),
				newData: parsed.data as unknown as Prisma.InputJsonValue
			}
		]
	});

	return { ok: true };
}
