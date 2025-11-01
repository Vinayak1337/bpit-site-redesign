'use server';
import 'server-only';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';

const headerAnnouncementItemSchema = z.object({
	title: z.string().min(1),
	href: z.string().min(1)
});

const headerAnnouncementsSchema = z.object({
	items: z.array(headerAnnouncementItemSchema).min(0)
});

type HeaderAnnouncementItem = z.infer<typeof headerAnnouncementItemSchema>;

export async function getHeaderAnnouncements(
	pageSlug: string
): Promise<HeaderAnnouncementItem[]> {
	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) return [];
	const comp = await prisma.component.findFirst({
		where: { pageId: page.id, key: 'HEADER_ANNOUNCEMENTS' }
	});
	if (!comp) return [];
	const parsed = headerAnnouncementsSchema.safeParse(comp.data);
	if (!parsed.success) return [];
	return parsed.data.items;
}

export async function updateHeaderAnnouncements(
	pageSlug: string,
	items: HeaderAnnouncementItem[]
): Promise<{ ok: true } | { ok: false; error: string }> {
	const admin = await requireAdmin();
	const parsed = z.array(headerAnnouncementItemSchema).safeParse(items);
	if (!parsed.success) return { ok: false, error: 'invalid_payload' };

	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) return { ok: false, error: 'page_not_found' };
	const comp = await prisma.component.findFirst({
		where: { pageId: page.id, key: 'HEADER_ANNOUNCEMENTS' }
	});
	if (!comp) return { ok: false, error: 'component_not_found' };

	const previousData = comp.data;
	await prisma.component.update({
		where: { id: comp.id },
		data: { data: { items: parsed.data } }
	});

	await createAuditLog({
		actorId: admin.id,
		action: 'UPDATE',
		resourceType: 'COMPONENT',
		summary: `Updated header announcements for page ${pageSlug}`,
		changes: [
			{
				resourceId: comp.id,
				resourceType: 'COMPONENT',
				field: 'data.items',
				previousData:
					previousData === null
						? undefined
						: (previousData as unknown as Prisma.InputJsonValue),
				newData: { items: parsed.data } as unknown as Prisma.InputJsonValue
			}
		]
	});

	return { ok: true };
}
