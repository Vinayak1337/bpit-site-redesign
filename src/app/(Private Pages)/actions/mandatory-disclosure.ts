'use server';

import { z } from 'zod';
import { revalidatePath, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

// --- Schemas ---

export const disclosureItemSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1, 'Title is required'),
	url: z.string().min(1, 'URL is required'),
	category: z.string().optional()
});

export const disclosureDataSchema = z.object({
	items: z.array(disclosureItemSchema)
});

export type DisclosureItem = z.infer<typeof disclosureItemSchema>;
export type DisclosureData = z.infer<typeof disclosureDataSchema>;

// --- Actions ---

export async function getMandatoryDisclosure(
	slug = 'mandatory-disclosure'
): Promise<DisclosureData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug },
					include: { components: true }
				});

				if (!page) return getDefaultDisclosureData();

				const component = page.components.find(
					c => c.key === 'MANDATORY_DISCLOSURE_DATA'
				);

				if (!component) return getDefaultDisclosureData();

				return component.data as unknown as DisclosureData;
			} catch (error) {
				console.error('Error fetching mandatory disclosure data:', error);
				return getDefaultDisclosureData();
			}
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

// --- Default Data ---

function getDefaultDisclosureData(): DisclosureData {
	return {
		items: [
			{
				id: '1',
				title: 'Mandatory Disclosure',
				url: '#',
				category: 'General'
			},
			{
				id: '2',
				title: 'AICTE Approval Letter 2023-24',
				url: '#',
				category: 'Approvals'
			},
			{
				id: '3',
				title: 'Fee Structure',
				url: '#',
				category: 'Admissions'
			}
		]
	};
}

