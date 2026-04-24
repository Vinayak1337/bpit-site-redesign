'use server';
import 'server-only';

import { z } from 'zod';
import { revalidateTag, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';

const ACCREDITATION_CACHE_TAG = 'accreditation-data';
const ACCREDITATION_KEY = 'ACCREDITATION_DATA';

// --- Schemas ---

const heroBadgeSchema = z.object({
	label: z.string().min(1)
});

const accreditationHeroSchema = z.object({
	title: z.string().min(1),
	subtitle: z.string().min(1),
	badges: z.array(heroBadgeSchema)
});

const accreditationIntroSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1)
});

const accreditationCardSchema = z.object({
	name: z.string().min(1),
	fullName: z.string().min(1),
	colorScheme: z.string().min(1),
	icon: z.string().min(1),
	badgeTitle: z.string().min(1),
	badgeDescription: z.string().min(1),
	accreditedYear: z.string().min(1),
	validUntil: z.string().min(1)
});

const benefitSchema = z.object({
	icon: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	colorScheme: z.string().min(1)
});

const complianceGroupSchema = z.object({
	title: z.string().min(1),
	icon: z.string().min(1),
	items: z.array(z.string().min(1))
});

const complianceSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	groups: z.array(complianceGroupSchema)
});

const futureGoalSchema = z.object({
	label: z.string().min(1),
	colorScheme: z.string().min(1)
});

const futureSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	goals: z.array(futureGoalSchema)
});

const accreditationDataSchema = z.object({
	hero: accreditationHeroSchema,
	intro: accreditationIntroSchema,
	cards: z.array(accreditationCardSchema).min(1),
	benefits: z.array(benefitSchema).min(1),
	compliance: complianceSchema,
	future: futureSchema
});

export type AccreditationCard = z.infer<typeof accreditationCardSchema>;
export type AccreditationBenefit = z.infer<typeof benefitSchema>;
export type AccreditationComplianceGroup = z.infer<typeof complianceGroupSchema>;
export type AccreditationData = z.infer<typeof accreditationDataSchema>;

// --- Default data ---

function getDefaultAccreditationData(): AccreditationData {
	return {
		hero: {
			title: 'Accreditation',
			subtitle: 'Recognized Excellence in Technical Education and Quality Standards',
			badges: [
				{ label: 'NAAC Accredited' },
				{ label: 'NBA Approved' },
				{ label: 'ISO Certified' }
			]
		},
		intro: {
			title: 'Quality Recognition',
			description:
				'BPIT has achieved multiple prestigious accreditations that validate our commitment to excellence in technical education, infrastructure, and academic standards.'
		},
		cards: [
			{
				name: 'NAAC',
				fullName: 'National Assessment and Accreditation Council',
				colorScheme: 'blue',
				icon: 'Award',
				badgeTitle: 'Grade: A',
				badgeDescription:
					'Recognized for academic excellence, infrastructure, and student support services.',
				accreditedYear: '2022',
				validUntil: '2027'
			},
			{
				name: 'NBA',
				fullName: 'National Board of Accreditation',
				colorScheme: 'purple',
				icon: 'Trophy',
				badgeTitle: 'Programs Accredited',
				badgeDescription:
					'Computer Science, IT, ECE, and Electrical Engineering programs approved.',
				accreditedYear: '2021',
				validUntil: '2024'
			},
			{
				name: 'ISO',
				fullName: 'International Organization for Standardization',
				colorScheme: 'green',
				icon: 'Globe',
				badgeTitle: 'ISO 9001:2015',
				badgeDescription:
					'Quality Management System certification for educational services.',
				accreditedYear: '2020',
				validUntil: '2025'
			}
		],
		benefits: [
			{
				icon: 'TrendingUp',
				title: 'Quality Assurance',
				description: 'Ensures high standards in education delivery and infrastructure.',
				colorScheme: 'blue'
			},
			{
				icon: 'Users',
				title: 'Student Benefits',
				description: 'Enhanced employability and recognition in higher education.',
				colorScheme: 'green'
			},
			{
				icon: 'Globe',
				title: 'Global Recognition',
				description: 'International acceptance and credibility of our programs.',
				colorScheme: 'purple'
			},
			{
				icon: 'BookOpen',
				title: 'Continuous Improvement',
				description: 'Regular assessment and enhancement of academic processes.',
				colorScheme: 'orange'
			}
		],
		compliance: {
			title: 'Compliance & Standards',
			description:
				'Our accreditations ensure that we maintain the highest standards in all aspects of education delivery, from curriculum design to infrastructure development.',
			groups: [
				{
					title: 'Academic Standards',
					icon: 'FileText',
					items: [
						'Curriculum aligned with industry requirements',
						'Regular faculty development programs',
						'Continuous assessment and improvement',
						'Student feedback integration'
					]
				},
				{
					title: 'Infrastructure Standards',
					icon: 'Shield',
					items: [
						'Modern laboratories and equipment',
						'Digital library and online resources',
						'Safety and security protocols',
						'Accessibility and inclusive design'
					]
				}
			]
		},
		future: {
			title: 'Future Accreditation Goals',
			description:
				'We are committed to continuous improvement and are working towards additional accreditations and certifications to further enhance our educational standards.',
			goals: [
				{ label: 'ABET Accreditation', colorScheme: 'blue' },
				{ label: 'QS University Rating', colorScheme: 'green' },
				{ label: 'NIRF Ranking', colorScheme: 'purple' }
			]
		}
	};
}

// --- Getter (cached) ---

export const getAccreditationData = unstable_cache(
	async (slug: string): Promise<AccreditationData> => {
		try {
			const page = await prisma.page.findUnique({
				where: { slug },
				include: {
					components: {
						where: { key: ACCREDITATION_KEY },
						orderBy: { order: 'asc' },
						take: 1
					}
				}
			});

			if (!page?.components?.[0]?.data) {
				return getDefaultAccreditationData();
			}

			const parsed = accreditationDataSchema.safeParse(page.components[0].data);
			if (!parsed.success) return getDefaultAccreditationData();
			return parsed.data;
		} catch {
			return getDefaultAccreditationData();
		}
	},
	['accreditation-data'],
	{ tags: [ACCREDITATION_CACHE_TAG] }
);

// --- Updater ---

export async function updateAccreditationData(
	slug: string,
	data: AccreditationData
): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		const admin = await requireAdmin();
		const validated = accreditationDataSchema.parse(data);

		const page = await prisma.page.upsert({
			where: { slug },
			update: {},
			create: { slug, title: 'Accreditation', kind: 'PAGE', status: 'PUBLISHED' }
		});

		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: ACCREDITATION_KEY }
		});

		const previousData = existing?.data ?? null;

		if (existing) {
			await prisma.component.update({
				where: { id: existing.id },
				data: { data: validated as unknown as Prisma.InputJsonValue }
			});
		} else {
			await prisma.component.create({
				data: {
					pageId: page.id,
					key: ACCREDITATION_KEY,
					order: 0,
					data: validated as unknown as Prisma.InputJsonValue
				}
			});
		}

		await createAuditLog({
			actorId: admin.id,
			action: existing ? 'UPDATE' : 'CREATE',
			resourceType: 'COMPONENT',
			summary: `Updated accreditation data for page ${slug}`,
			changes: [
				{
					resourceId: existing?.id ?? page.id,
					resourceType: 'COMPONENT',
					field: 'data',
					previousData: previousData as Prisma.InputJsonValue ?? undefined,
					newData: validated as unknown as Prisma.InputJsonValue
				}
			]
		});

		revalidateTag(ACCREDITATION_CACHE_TAG);
		return { ok: true };
	} catch {
		return { ok: false, error: 'Failed to update accreditation data' };
	}
}
