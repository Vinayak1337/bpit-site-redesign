'use server';

import { z } from 'zod';
import { revalidatePath, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';

// --- Schemas ---

const heroSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1), // Changed from subtitle to description to match data
	gradient: z.string().optional(),
	icon: z.string().optional(),
	borderColor: z.string().optional(),
	iconBg: z.string().optional()
});

const committeeSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	icon: z.string().min(1),
	iconColor: z.string().min(1),
	href: z.string().min(1),
	key: z.string().min(1)
});

const memberSchema = z.object({
	name: z.string().min(1),
	designation: z.string().min(1),
	department: z.string().min(1),
	qualification: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().optional()
});

const simpleCardSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	icon: z.string().min(1),
	iconColor: z.string().min(1)
});

// IQAC Schemas
const iqacAboutSchema = z.object({
	title: z.string().min(1),
	content: z.array(z.string().min(1)),
	vision: z.string().min(1),
	mission: z.string().min(1)
});

const aqarReportSchema = z.object({
	year: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	buttonText: z.string().min(1),
	buttonColor: z.string().min(1)
});

const iqacSchema = z.object({
	hero: heroSchema,
	about: iqacAboutSchema,
	objectives: z.array(simpleCardSchema),
	functions: z.array(z.string().min(1)),
	committeeMembers: z.array(memberSchema),
	initiatives: z.array(simpleCardSchema),
	aqar: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		reports: z.array(aqarReportSchema)
	})
});

// Anti-Ragging Schemas
const antiRaggingSchema = z.object({
	hero: heroSchema,
	definition: z.object({
		title: z.string().min(1),
		content: z.string().min(1),
		includes: z.array(z.string().min(1))
	}),
	committeeMembers: z.array(memberSchema),
	preventiveMeasures: z.array(simpleCardSchema),
	punishments: z.array(z.string().min(1)),
	emergencyContacts: z.array(
		z.object({
			title: z.string().min(1),
			contact: z.string().min(1),
			description: z.string().min(1),
			icon: z.string().min(1),
			iconColor: z.string().min(1),
			bgColor: z.string().min(1)
		})
	)
});

// Internal Complaints Schemas
const stepSchema = z.object({
	step: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	icon: z.string().min(1),
	iconColor: z.string().min(1)
});

const internalComplaintsSchema = z.object({
	hero: heroSchema,
	definition: z.object({
		title: z.string().min(1),
		content: z.string().min(1),
		includes: z.array(z.string().min(1))
	}),
	committeeMembers: z.array(memberSchema),
	procedures: z.array(stepSchema),
	supportServices: z.array(simpleCardSchema),
	rightsAndResponsibilities: z.object({
		rights: z.array(z.string().min(1)),
		responsibilities: z.array(z.string().min(1))
	}),
	contactInfo: z.array(
		z.object({
			title: z.string().min(1),
			contact: z.string().min(1),
			description: z.string().min(1),
			icon: z.string().min(1),
			iconColor: z.string().min(1),
			bgColor: z.string().min(1)
		})
	)
});

// Overview Schema
const overviewSchema = z.object({
	hero: z.object({
		title: z.string().min(1),
		description: z.string().min(1)
	}),
	committees: z.array(committeeSchema)
});

export type StatutoryOverviewData = z.infer<typeof overviewSchema>;
export type IqacData = z.infer<typeof iqacSchema>;
export type AntiRaggingData = z.infer<typeof antiRaggingSchema>;
export type InternalComplaintsData = z.infer<typeof internalComplaintsSchema>;

// --- Actions ---

export async function getStatutoryOverview(slug = 'statutory-committees'): Promise<StatutoryOverviewData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug },
					include: { components: true }
				});

				if (!page) {
					throw new Error('STATUTORY_OVERVIEW not seeded — run `npm run seed statutory`');
				}

				const component = page.components.find(
					c => c.key === 'STATUTORY_OVERVIEW_DATA'
				);

				if (!component) {
					throw new Error('STATUTORY_OVERVIEW component missing — run `npm run seed statutory`');
				}

				return component.data as unknown as StatutoryOverviewData;
			} catch (error) {
				console.error('Error fetching statutory overview data:', error);
				throw error;
			}
		},
		[`statutory-overview-${slug}`],
		{ tags: [`statutory-overview-${slug}`], revalidate: 3600 }
	)();
}

export async function updateStatutoryOverview(data: StatutoryOverviewData, slug = 'statutory-committees') {
	try {
		let page = await prisma.page.findUnique({ where: { slug } });
		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'Statutory Committees', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: data as any, key: 'STATUTORY_OVERVIEW_DATA' },
			create: { pageId: page.id, data: data as any, order: 1, key: 'STATUTORY_OVERVIEW_DATA' }
		});

		revalidatePath('/statutory-committees');
		revalidatePath('/admin/statutory-committees');
	} catch (error) {
		console.error('Error updating statutory overview data:', error);
		throw error;
	}
}

export async function getIqac(slug = 'statutory-committees-iqac'): Promise<IqacData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug },
					include: { components: true }
				});

				if (!page) {
					throw new Error('IQAC not seeded — run `npm run seed statutory`');
				}

				const component = page.components.find(c => c.key === 'IQAC_DATA');

				if (!component) {
					throw new Error('IQAC component missing — run `npm run seed statutory`');
				}

				return component.data as unknown as IqacData;
			} catch (error) {
				console.error('Error fetching IQAC data:', error);
				throw error;
			}
		},
		[`iqac-${slug}`],
		{ tags: [`iqac-${slug}`], revalidate: 3600 }
	)();
}

export async function updateIqac(data: IqacData, slug = 'statutory-committees-iqac') {
	try {
		let page = await prisma.page.findUnique({ where: { slug } });
		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'IQAC', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: data as any, key: 'IQAC_DATA' },
			create: { pageId: page.id, data: data as any, order: 1, key: 'IQAC_DATA' }
		});

		revalidatePath('/statutory-committees/iqac');
		revalidatePath('/admin/statutory-committees/iqac');
	} catch (error) {
		console.error('Error updating IQAC data:', error);
		throw error;
	}
}

export async function getAntiRagging(slug = 'statutory-committees-anti-ragging'): Promise<AntiRaggingData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug },
					include: { components: true }
				});

				if (!page) {
					throw new Error('ANTI_RAGGING not seeded — run `npm run seed statutory`');
				}

				const component = page.components.find(c => c.key === 'ANTI_RAGGING_DATA');

				if (!component) {
					throw new Error('ANTI_RAGGING component missing — run `npm run seed statutory`');
				}

				return component.data as unknown as AntiRaggingData;
			} catch (error) {
				console.error('Error fetching anti-ragging data:', error);
				throw error;
			}
		},
		[`anti-ragging-${slug}`],
		{ tags: [`anti-ragging-${slug}`], revalidate: 3600 }
	)();
}

export async function updateAntiRagging(data: AntiRaggingData, slug = 'statutory-committees-anti-ragging') {
	try {
		let page = await prisma.page.findUnique({ where: { slug } });
		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'Anti-Ragging', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: data as any, key: 'ANTI_RAGGING_DATA' },
			create: { pageId: page.id, data: data as any, order: 1, key: 'ANTI_RAGGING_DATA' }
		});

		revalidatePath('/statutory-committees/anti-ragging');
		revalidatePath('/admin/statutory-committees/anti-ragging');
	} catch (error) {
		console.error('Error updating anti-ragging data:', error);
		throw error;
	}
}

export async function getInternalComplaints(slug = 'statutory-committees-internal-complaints'): Promise<InternalComplaintsData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug },
					include: { components: true }
				});

				if (!page) {
					throw new Error('INTERNAL_COMPLAINTS not seeded — run `npm run seed statutory`');
				}

				const component = page.components.find(
					c => c.key === 'INTERNAL_COMPLAINTS_DATA'
				);

				if (!component) {
					throw new Error('INTERNAL_COMPLAINTS component missing — run `npm run seed statutory`');
				}

				return component.data as unknown as InternalComplaintsData;
			} catch (error) {
				console.error('Error fetching internal complaints data:', error);
				throw error;
			}
		},
		[`internal-complaints-${slug}`],
		{ tags: [`internal-complaints-${slug}`], revalidate: 3600 }
	)();
}

export async function updateInternalComplaints(data: InternalComplaintsData, slug = 'statutory-committees-internal-complaints') {
	try {
		let page = await prisma.page.findUnique({ where: { slug } });
		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'Internal Complaints', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: data as any, key: 'INTERNAL_COMPLAINTS_DATA' },
			create: { pageId: page.id, data: data as any, order: 1, key: 'INTERNAL_COMPLAINTS_DATA' }
		});

		revalidatePath('/statutory-committees/internal-complaints');
		revalidatePath('/admin/statutory-committees/internal-complaints');
	} catch (error) {
		console.error('Error updating internal complaints data:', error);
		throw error;
	}
}

// --- Default Data Functions (Copied from src/data/statutory-committees.ts) ---





