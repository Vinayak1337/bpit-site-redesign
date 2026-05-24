'use server';

import { z } from 'zod';
import { revalidatePath, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';

// Vision Mission schemas
const heroSchema = z.object({
	title: z.string().min(1),
	subtitle: z.string().min(1),
	icon: z.string().min(1),
	gradient: z.string().min(1),
	borderColor: z.string().min(1),
	iconBg: z.string().min(1)
});

const visionStatementSchema = z.object({
	title: z.string().min(1),
	icon: z.string().min(1),
	gradient: z.string().min(1),
	borderColor: z.string().min(1),
	quote: z.string().min(1)
});

const pillarSchema = z.object({
	icon: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	color: z.enum(['blue', 'green', 'purple', 'orange', 'red', 'indigo'])
});

const aspirationSchema = z.object({
	icon: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	color: z.enum(['blue', 'green', 'purple', 'orange', 'red', 'indigo'])
});

// Mission schemas
const missionStatementSchema = z.object({
	title: z.string().min(1),
	icon: z.string().min(1),
	gradient: z.string().min(1),
	borderColor: z.string().min(1),
	quote: z.string().min(1)
});

const objectiveSchema = z.object({
	icon: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	color: z.enum(['blue', 'green', 'purple', 'orange', 'red', 'indigo'])
});

const impactStatSchema = z.object({
	number: z.string().min(1),
	label: z.string().min(1),
	color: z.string().min(1)
});

const impactSchema = z.object({
	title: z.string().min(1),
	icon: z.string().min(1),
	gradient: z.string().min(1),
	stats: z.array(impactStatSchema).min(1)
});

const visionMissionSchema = z.object({
	hero: heroSchema,
	visionStatement: visionStatementSchema,
	pillars: z.array(pillarSchema).min(1),
	aspirations: z.array(aspirationSchema).min(1)
});

const missionSchema = z.object({
	hero: heroSchema,
	missionStatement: missionStatementSchema,
	objectives: z.array(objectiveSchema).min(1),
	impact: impactSchema
});

// Quality Policy schemas
const policyStatementSchema = z.object({
	title: z.string().min(1),
	icon: z.string().min(1),
	gradient: z.string().min(1),
	borderColor: z.string().min(1),
	quote: z.string().min(1)
});

const commitmentSchema = z.object({
	icon: z.string().min(1),
	title: z.string().min(1),
	description: z.array(z.string().min(1)).min(1),
	iconColor: z.string().min(1),
	bgColor: z.string().min(1)
});

const frameworkStepSchema = z.object({
	icon: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	iconColor: z.string().min(1),
	bgColor: z.string().min(1)
});

const frameworkSchema = z.object({
	title: z.string().min(1),
	icon: z.string().min(1),
	gradient: z.string().min(1),
	steps: z.array(frameworkStepSchema).min(1)
});

const assuranceBodySchema = z.object({
	icon: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	iconBg: z.string().min(1),
	gradient: z.string().min(1)
});

const assuranceBodiesSchema = z.object({
	title: z.string().min(1),
	items: z.array(assuranceBodySchema).min(1)
});

const qualityPolicySchema = z.object({
	hero: heroSchema,
	policyStatement: policyStatementSchema,
	commitments: z.array(commitmentSchema).min(1),
	framework: frameworkSchema,
	assuranceBodies: assuranceBodiesSchema
});

export type VisionMissionData = z.infer<typeof visionMissionSchema>;
export type MissionData = z.infer<typeof missionSchema>;
export type QualityPolicyData = z.infer<typeof qualityPolicySchema>;
export type HeroData = z.infer<typeof heroSchema>;
export type VisionStatementData = z.infer<typeof visionStatementSchema>;
export type MissionStatementData = z.infer<typeof missionStatementSchema>;
export type PolicyStatementData = z.infer<typeof policyStatementSchema>;
export type PillarData = z.infer<typeof pillarSchema>;
export type AspirationData = z.infer<typeof aspirationSchema>;
export type ObjectiveData = z.infer<typeof objectiveSchema>;
export type CommitmentData = z.infer<typeof commitmentSchema>;
export type FrameworkStepData = z.infer<typeof frameworkStepSchema>;
export type FrameworkData = z.infer<typeof frameworkSchema>;
export type AssuranceBodyData = z.infer<typeof assuranceBodySchema>;
export type AssuranceBodiesData = z.infer<typeof assuranceBodiesSchema>;
export type ImpactData = z.infer<typeof impactSchema>;
export type ImpactStatData = z.infer<typeof impactStatSchema>;

// Get vision mission data
export const getVisionMission = unstable_cache(
	async (slug: string): Promise<VisionMissionData> => {
		try {
			const page = await prisma.page.findUnique({
				where: { slug },
				include: {
					components: {
						where: { key: 'VISION_MISSION' },
						orderBy: { order: 'asc' }
					}
				}
			});

			if (!page?.components?.[0]?.data) {
				throw new Error('VISION_MISSION not seeded — run `npm run seed vision`');
			}

			return page.components[0].data as unknown as VisionMissionData;
		} catch (error) {
			console.error('Error fetching vision mission:', error);
			throw error;
		}
	},
	['vision-mission'],
	{ revalidate: 3600 }
);

// Update vision mission data
export async function updateVisionMission(
	slug: string,
	data: VisionMissionData
): Promise<void> {
	try {
		const validatedData = visionMissionSchema.parse(data);

		const page = await prisma.page.upsert({
			where: { slug },
			update: {},
			create: {
				slug,
				title: 'Vision & Mission',
				kind: 'PAGE',
				status: 'PUBLISHED'
			}
		});

		// Find existing component or create new one
		const existingComponent = await prisma.component.findFirst({
			where: {
				pageId: page.id,
				key: 'VISION_MISSION'
			}
		});

		if (existingComponent) {
			await prisma.component.update({
				where: { id: existingComponent.id },
				data: { data: validatedData }
			});
		} else {
			await prisma.component.create({
				data: {
					pageId: page.id,
					key: 'VISION_MISSION',
					order: 1,
					data: validatedData
				}
			});
		}

		revalidatePath(`/${slug}`);
		revalidatePath('/admin/vision-mission');
	} catch (error) {
		console.error('Error updating vision mission:', error);
		throw new Error('Failed to update vision mission');
	}
}

// Get mission data
export const getMission = unstable_cache(
	async (slug: string): Promise<MissionData> => {
		try {
			const page = await prisma.page.findUnique({
				where: { slug },
				include: {
					components: {
						where: { key: 'MISSION' },
						orderBy: { order: 'asc' }
					}
				}
			});

			if (!page?.components?.[0]?.data) {
				throw new Error('MISSION not seeded — run `npm run seed vision`');
			}

			return page.components[0].data as unknown as MissionData;
		} catch (error) {
			console.error('Error fetching mission:', error);
			throw error;
		}
	},
	['mission-data'],
	{ revalidate: 60 } // Shorter revalidation for testing
);

// Update mission data
export async function updateMission(
	slug: string,
	data: MissionData
): Promise<void> {
	try {
		const validatedData = missionSchema.parse(data);

		const page = await prisma.page.upsert({
			where: { slug },
			update: {},
			create: {
				slug,
				title: 'Mission',
				kind: 'PAGE',
				status: 'PUBLISHED'
			}
		});

		// Find existing component or create new one
		const existingComponent = await prisma.component.findFirst({
			where: {
				pageId: page.id,
				key: 'MISSION'
			}
		});

		if (existingComponent) {
			await prisma.component.update({
				where: { id: existingComponent.id },
				data: { data: validatedData }
			});
		} else {
			await prisma.component.create({
				data: {
					pageId: page.id,
					key: 'MISSION',
					order: 1,
					data: validatedData
				}
			});
		}

		revalidatePath(`/${slug}`);
		revalidatePath('/admin/vision-mission');
	} catch (error) {
		console.error('Error updating mission:', error);
		throw new Error('Failed to update mission');
	}
}

// Get quality policy data
export const getQualityPolicy = unstable_cache(
	async (slug: string): Promise<QualityPolicyData> => {
		try {
			const page = await prisma.page.findUnique({
				where: { slug },
				include: {
					components: {
						where: { key: 'QUALITY_POLICY' },
						orderBy: { order: 'asc' }
					}
				}
			});

			if (!page?.components?.[0]?.data) {
				throw new Error('QUALITY_POLICY not seeded — run `npm run seed vision`');
			}

			return page.components[0].data as unknown as QualityPolicyData;
		} catch (error) {
			console.error('Error fetching quality policy:', error);
			throw error;
		}
	},
	['quality-policy-data'],
	{ revalidate: 60 }
);

// Update quality policy data
export async function updateQualityPolicy(
	slug: string,
	data: QualityPolicyData
): Promise<void> {
	try {
		const validatedData = qualityPolicySchema.parse(data);

		const page = await prisma.page.upsert({
			where: { slug },
			update: {},
			create: {
				slug,
				title: 'Quality Policy',
				kind: 'PAGE',
				status: 'PUBLISHED'
			}
		});

		// Find existing component or create new one
		const existingComponent = await prisma.component.findFirst({
			where: {
				pageId: page.id,
				key: 'QUALITY_POLICY'
			}
		});

		if (existingComponent) {
			await prisma.component.update({
				where: { id: existingComponent.id },
				data: { data: validatedData }
			});
		} else {
			await prisma.component.create({
				data: {
					pageId: page.id,
					key: 'QUALITY_POLICY',
					order: 1,
					data: validatedData
				}
			});
		}

		revalidatePath(`/${slug}`);
		revalidatePath('/admin/vision-mission');
	} catch (error) {
		console.error('Error updating quality policy:', error);
		throw new Error('Failed to update quality policy');
	}
}
