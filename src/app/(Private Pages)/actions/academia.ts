'use server';
import 'server-only';

import { z } from 'zod';
import { revalidatePath, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';

const heroSchema = z.object({
	title: z.string(),
	subtitle: z.string(),
	backgroundImage: z.string().nullable(),
	gradient: z.string().optional().default('from-blue-600 to-blue-700')
});

export type AcademiaHeroData = z.infer<typeof heroSchema>;

export async function getAcademiaHero(slug = 'academia'): Promise<AcademiaHeroData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug },
					include: { components: true }
				});

				if (!page) return getDefaultHeroData();

				const component = page.components.find(c => c.key === 'HERO');

				if (!component) return getDefaultHeroData();

				return component.data as unknown as AcademiaHeroData;
			} catch (error) {
				console.error('Error fetching academia hero:', error);
				return getDefaultHeroData();
			}
		},
		[`academia-hero-${slug}`],
		{ tags: [`academia-hero-${slug}`], revalidate: 3600 }
	)();
}

export async function updateAcademiaHero(slug: string, data: AcademiaHeroData) {
	await requireAdmin();

	try {
		const parsedData = heroSchema.parse(data);

		let page = await prisma.page.findUnique({ where: { slug } });

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug,
					title: 'Academia',
					kind: 'PAGE',
					status: 'PUBLISHED'
				}
			});
		}

		await prisma.component.upsert({
			where: {
				pageId_order: {
					pageId: page.id,
					order: 0
				}
			},
			update: {
				data: parsedData as any,
				key: 'HERO'
			},
			create: {
				pageId: page.id,
				data: parsedData as any,
				order: 0,
				key: 'HERO'
			}
		});

		revalidatePath('/academia');
		revalidatePath('/admin/academia');
		return { ok: true };
	} catch (error) {
		console.error('Error updating academia hero:', error);
		return { ok: false, error: 'Failed to update hero' };
	}
}

function getDefaultHeroData(): AcademiaHeroData {
	return {
		title: 'Academia',
		subtitle: 'Explore our academic resources, syllabi, notices, and calendar for comprehensive educational support',
		backgroundImage: null,
		gradient: 'from-blue-600 to-blue-700'
	};
}









