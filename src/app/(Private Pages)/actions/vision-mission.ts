'use server';
import 'server-only';

import { z } from 'zod';
import { revalidateTag, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';

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

import { IMPACT_STAT_COLORS } from './vision-mission-constants';
export type { ImpactStatColor } from './vision-mission-constants';

const impactStatSchema = z.object({
	number: z.string().min(1),
	label: z.string().min(1),
	color: z.enum(IMPACT_STAT_COLORS).default('text-green-600')
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

// Normalize functions
const normalizeVisionMission = (data: Partial<VisionMissionData>): VisionMissionData => {
	return {
		hero: {
			title: data.hero?.title || 'Our Vision',
			subtitle: data.hero?.subtitle || 'Inspiring Excellence, Shaping Tomorrow',
			icon: data.hero?.icon || 'Eye',
			gradient: data.hero?.gradient || 'from-blue-50 to-indigo-100',
			borderColor: data.hero?.borderColor || 'border-blue-200',
			iconBg: data.hero?.iconBg || 'bg-blue-600'
		},
		visionStatement: {
			title: data.visionStatement?.title || 'Vision Statement',
			icon: data.visionStatement?.icon || 'Compass',
			gradient: data.visionStatement?.gradient || 'from-blue-50 to-indigo-50',
			borderColor: data.visionStatement?.borderColor || 'border-blue-100',
			quote: data.visionStatement?.quote || 'To be a premier institute of technical education...'
		},
		pillars: data.pillars || [
			{
				icon: 'BookOpen',
				title: 'Academic Excellence',
				description: 'Delivering world-class technical education...',
				color: 'blue'
			}
		],
		aspirations: data.aspirations || [
			{
				icon: 'TrendingUp',
				title: '2030 Goals',
				description: 'Achieve top 50 ranking among engineering institutes in India',
				color: 'blue'
			}
		]
	};
};

// Normalize mission function
const normalizeMission = (data: Partial<MissionData>): MissionData => {
	return {
		hero: {
			title: data.hero?.title || 'Our Mission',
			subtitle: data.hero?.subtitle || 'Empowering Minds, Building Futures',
			icon: data.hero?.icon || 'Target',
			gradient: data.hero?.gradient || 'from-green-50 to-emerald-100',
			borderColor: data.hero?.borderColor || 'border-green-200',
			iconBg: data.hero?.iconBg || 'bg-green-600'
		},
		missionStatement: {
			title: data.missionStatement?.title || 'Mission Statement',
			icon: data.missionStatement?.icon || 'Heart',
			gradient: data.missionStatement?.gradient || 'from-green-50 to-emerald-50',
			borderColor: data.missionStatement?.borderColor || 'border-green-100',
			quote: data.missionStatement?.quote || 'To provide quality technical education...'
		},
		objectives: data.objectives || [
			{
				icon: 'BookOpen',
				title: 'Quality Education',
				description: 'Deliver comprehensive technical education...',
				color: 'blue'
			}
		],
		impact: data.impact || {
			title: 'Mission Impact',
			icon: 'Zap',
			gradient: 'from-green-500 to-teal-600',
			stats: [
				{
					number: '5000+',
					label: 'Alumni Making Impact',
					color: 'text-green-600'
				}
			]
		}
	};
};

const VISION_MISSION_CACHE_TAG = 'vision-mission-data';

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
				return normalizeVisionMission({});
			}

			const componentData = page.components[0].data as Partial<VisionMissionData>;
			return normalizeVisionMission(componentData);
		} catch {
			return normalizeVisionMission({});
		}
	},
	['vision-mission'],
	{ tags: [VISION_MISSION_CACHE_TAG] }
);

// Update vision mission data
export async function updateVisionMission(
	slug: string,
	data: VisionMissionData
): Promise<void> {
	const admin = await requireAdmin();
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

	const existingComponent = await prisma.component.findFirst({
		where: { pageId: page.id, key: 'VISION_MISSION' }
	});

	const previousData = existingComponent?.data ?? null;

	if (existingComponent) {
		await prisma.component.update({
			where: { id: existingComponent.id },
			data: { data: validatedData as unknown as Prisma.InputJsonValue }
		});
	} else {
		await prisma.component.create({
			data: {
				pageId: page.id,
				key: 'VISION_MISSION',
				order: 1,
				data: validatedData as unknown as Prisma.InputJsonValue
			}
		});
	}

	if (existingComponent) {
		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'COMPONENT',
			summary: `Updated Vision & Mission for page ${slug}`,
			changes: [{
				resourceId: existingComponent.id,
				resourceType: 'COMPONENT',
				field: 'data',
				previousData: previousData as unknown as Prisma.InputJsonValue ?? undefined,
				newData: validatedData as unknown as Prisma.InputJsonValue
			}]
		});
	}

	revalidateTag(VISION_MISSION_CACHE_TAG);
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
				return normalizeMission({});
			}

			const componentData = page.components[0].data as Partial<MissionData>;
			return normalizeMission(componentData);
		} catch {
			return normalizeMission({});
		}
	},
	['mission-data'],
	{ tags: ['mission-data'] }
);

// Update mission data
export async function updateMission(
	slug: string,
	data: MissionData
): Promise<void> {
	const admin = await requireAdmin();
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

	const existingComponent = await prisma.component.findFirst({
		where: { pageId: page.id, key: 'MISSION' }
	});

	const previousData = existingComponent?.data ?? null;

	if (existingComponent) {
		await prisma.component.update({
			where: { id: existingComponent.id },
			data: { data: validatedData as unknown as Prisma.InputJsonValue }
		});
	} else {
		await prisma.component.create({
			data: {
				pageId: page.id,
				key: 'MISSION',
				order: 1,
				data: validatedData as unknown as Prisma.InputJsonValue
			}
		});
	}

	if (existingComponent) {
		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'COMPONENT',
			summary: `Updated Mission for page ${slug}`,
			changes: [{
				resourceId: existingComponent.id,
				resourceType: 'COMPONENT',
				field: 'data',
				previousData: previousData as unknown as Prisma.InputJsonValue ?? undefined,
				newData: validatedData as unknown as Prisma.InputJsonValue
			}]
		});
	}

	revalidateTag('mission-data');
}

// Normalize Quality Policy function
const normalizeQualityPolicy = (data: Partial<QualityPolicyData>): QualityPolicyData => {
	return {
		hero: {
			title: data.hero?.title || 'Quality Policy',
			subtitle: data.hero?.subtitle || 'Commitment to Excellence in All Endeavors',
			icon: data.hero?.icon || 'Award',
			gradient: data.hero?.gradient || 'from-purple-50 to-indigo-100',
			borderColor: data.hero?.borderColor || 'border-purple-200',
			iconBg: data.hero?.iconBg || 'bg-purple-600'
		},
		policyStatement: {
			title: data.policyStatement?.title || 'Quality Policy Statement',
			icon: data.policyStatement?.icon || 'Shield',
			gradient: data.policyStatement?.gradient || 'from-purple-50 to-indigo-50',
			borderColor: data.policyStatement?.borderColor || 'border-purple-100',
			quote: data.policyStatement?.quote || 'We are committed to excellence in education.'
		},
		commitments: data.commitments?.length ? data.commitments : [
			{
				icon: 'BookOpen',
				title: 'Academic Excellence',
				description: ['Maintain updated curriculum aligned with industry needs'],
				iconColor: 'text-blue-600',
				bgColor: 'bg-blue-100'
			}
		],
		framework: {
			title: data.framework?.title || 'Quality Management Framework',
			icon: data.framework?.icon || 'Shield',
			gradient: data.framework?.gradient || 'from-purple-500 to-pink-600',
			steps: data.framework?.steps?.length ? data.framework.steps : [
				{
					icon: 'Target',
					title: 'Plan',
					description: 'Establish quality objectives and processes',
					iconColor: 'text-blue-600',
					bgColor: 'bg-blue-50'
				}
			]
		},
		assuranceBodies: {
			title: data.assuranceBodies?.title || 'Quality Assurance Bodies',
			items: data.assuranceBodies?.items?.length ? data.assuranceBodies.items : [
				{
					icon: 'Award',
					title: 'IQAC',
					description: 'Internal Quality Assurance Cell for continuous monitoring',
					iconBg: 'bg-blue-600',
					gradient: 'from-blue-50 to-blue-100'
				}
			]
		}
	};
};

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
				return normalizeQualityPolicy({});
			}

			const componentData = page.components[0].data as Partial<QualityPolicyData>;
			return normalizeQualityPolicy(componentData);
		} catch {
			return normalizeQualityPolicy({});
		}
	},
	['quality-policy-data'],
	{ tags: ['quality-policy-data'] }
);

// Update quality policy data
export async function updateQualityPolicy(
	slug: string,
	data: QualityPolicyData
): Promise<void> {
	const admin = await requireAdmin();
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

	const existingComponent = await prisma.component.findFirst({
		where: { pageId: page.id, key: 'QUALITY_POLICY' }
	});

	const previousData = existingComponent?.data ?? null;

	if (existingComponent) {
		await prisma.component.update({
			where: { id: existingComponent.id },
			data: { data: validatedData as unknown as Prisma.InputJsonValue }
		});
	} else {
		await prisma.component.create({
			data: {
				pageId: page.id,
				key: 'QUALITY_POLICY',
				order: 1,
				data: validatedData as unknown as Prisma.InputJsonValue
			}
		});
	}

	if (existingComponent) {
		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'COMPONENT',
			summary: `Updated Quality Policy for page ${slug}`,
			changes: [{
				resourceId: existingComponent.id,
				resourceType: 'COMPONENT',
				field: 'data',
				previousData: previousData as unknown as Prisma.InputJsonValue ?? undefined,
				newData: validatedData as unknown as Prisma.InputJsonValue
			}]
		});
	}

	revalidateTag('quality-policy-data');
}