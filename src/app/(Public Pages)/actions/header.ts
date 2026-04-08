import 'server-only';
import { z } from 'zod';
import prisma from '@/lib/prisma';

export async function getHeaderData(slug: string = 'main'): Promise<{
	announcementsData: HeaderAnnouncementsData;
}> {
	const page = await prisma.page.findUnique({ where: { slug } });
	let items: HeaderAnnouncementItem[] = [];
	if (page) {
		const comp = await prisma.component.findFirst({
			where: { pageId: page.id, key: 'HEADER_ANNOUNCEMENTS' }
		});
		if (comp) {
			const schema = z.object({
				items: z.array(
					z.object({
						title: z.string(),
						href: z.string()
					})
				)
			});
			const parsed = schema.safeParse(comp.data);
			if (parsed.success) {
				items = parsed.data.items;
			}
		}
	}

	const announcementsData: HeaderAnnouncementsData = {
		labels: { desktop: 'Important Announcements:', mobile: 'News:' },
		items
	};
	return { announcementsData };
}
