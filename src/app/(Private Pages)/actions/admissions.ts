'use server';

import { z } from 'zod';
import { revalidatePath, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';

const heroSchema = z.object({
	title: z.string(),
	subtitle: z.string(),
	backgroundImage: z.string().nullable(),
	gradient: z.string().optional().default('from-blue-600 to-blue-800')
});

export type AdmissionsHeroData = z.infer<typeof heroSchema>;

export async function getAdmissionsHero(slug = 'admissions'): Promise<AdmissionsHeroData> {
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

				return component.data as unknown as AdmissionsHeroData;
			} catch (error) {
				console.error('Error fetching admissions hero:', error);
				return getDefaultHeroData();
			}
		},
		[`admissions-hero-${slug}`],
		{ tags: [`admissions-hero-${slug}`], revalidate: 3600 }
	)();
}

export async function updateAdmissionsHero(slug: string, data: AdmissionsHeroData) {
	await requireAdmin();

	try {
		const parsedData = heroSchema.parse(data);

		let page = await prisma.page.findUnique({ where: { slug } });

		if (!page) {
			page = await prisma.page.create({
				data: {
					slug,
					title: 'Admissions',
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

		revalidatePath('/admissions');
		revalidatePath('/admin/admissions');
		return { ok: true };
	} catch (error) {
		console.error('Error updating admissions hero:', error);
		return { ok: false, error: 'Failed to update hero' };
	}
}

function getDefaultHeroData(): AdmissionsHeroData {
	return {
		title: 'Admissions',
		subtitle: 'Join us to embark on a journey of excellence and innovation.',
		backgroundImage: null,
		gradient: 'from-blue-600 to-blue-800'
	};
}


