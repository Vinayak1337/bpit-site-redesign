'use server';

import { revalidatePath, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import {
	disclosureDataSchema,
	DisclosureData
} from '@/lib/schemas/mandatory-disclosure';

// --- Actions ---

export async function getMandatoryDisclosure(
	slug = 'mandatory-disclosure'
): Promise<DisclosureData> {
	return unstable_cache(
		async () => {
			const page = await prisma.page.findUnique({
				where: { slug },
				include: { components: true }
			});

			if (!page) {
				throw new Error('MANDATORY_DISCLOSURE not seeded — run `npm run seed mandatory-disclosure`');
			}

			const component = page.components.find(
				c => c.key === 'MANDATORY_DISCLOSURE_DATA'
			);

			if (!component) {
				throw new Error('MANDATORY_DISCLOSURE component missing — run `npm run seed mandatory-disclosure`');
			}

			return disclosureDataSchema.parse(component.data);
		},
		[`mandatory-disclosure-${slug}`],
		{ tags: [`mandatory-disclosure-${slug}`], revalidate: 3600 }
	)();
}

export async function updateMandatoryDisclosure(
	data: DisclosureData,
	slug = 'mandatory-disclosure'
) {
	try {
		// Validate data
		const validatedData = disclosureDataSchema.parse(data);

		let page = await prisma.page.findUnique({ where: { slug } });
		if (!page) {
			page = await prisma.page.create({
				data: {
					slug,
					title: 'Mandatory Disclosure',
					kind: 'PAGE',
					status: 'PUBLISHED'
				}
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: validatedData as any, key: 'MANDATORY_DISCLOSURE_DATA' },
			create: {
				pageId: page.id,
				data: validatedData as any,
				order: 1,
				key: 'MANDATORY_DISCLOSURE_DATA'
			}
		});

		revalidatePath('/mandatory-disclosure');
		revalidatePath('/admin/mandatory-disclosure');
	} catch (error) {
		console.error('Error updating mandatory disclosure data:', error);
		throw error;
	}
}


