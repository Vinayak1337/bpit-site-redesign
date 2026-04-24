'use server';
import 'server-only';

import { z } from 'zod';
import { revalidateTag, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';

const TERMS_CACHE_TAG = 'terms-of-service-data';
const TERMS_KEY = 'TERMS_OF_SERVICE_DATA';

// --- Schemas ---

const termsSectionSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	points: z.array(z.string())
});

const termsOfServiceSchema = z.object({
	lastUpdated: z.string().min(1),
	intro: z.string().min(1),
	sections: z.array(termsSectionSchema).min(1)
});

export type TermsSection = z.infer<typeof termsSectionSchema>;
export type TermsOfServiceData = z.infer<typeof termsOfServiceSchema>;

// --- Default data ---

function getDefaultTermsOfServiceData(): TermsOfServiceData {
	return {
		lastUpdated: 'November 2025',
		intro:
			"These terms outline the policies and responsibilities that govern the use of BPIT's digital platforms, portals, and published content.",
		sections: [
			{
				title: 'Acceptance of Terms',
				description:
					'By accessing the BPIT website, portals, or digital services you agree to comply with these terms of service and all applicable policies referenced here.',
				points: [
					'These terms apply to students, faculty, alumni, applicants, and external visitors.',
					'If you do not agree with any part of these terms, please discontinue use of BPIT online services.'
				]
			},
			{
				title: 'Use of Website Content',
				description:
					'All academic resources, media, logos, and written content are protected intellectual property of BPIT or its partners.',
				points: [
					'Content may be used for personal, non-commercial academic purposes only.',
					'Any reproduction, republication, or distribution requires written permission from BPIT.',
					'Unauthorised modification of content or materials is strictly prohibited.'
				]
			},
			{
				title: 'User Responsibilities',
				description:
					'You are responsible for maintaining the confidentiality of your portal credentials and ensuring proper usage of online resources.',
				points: [
					'Provide accurate and current information when completing forms or registrations.',
					'Do not engage in activities that disrupt or compromise the security of BPIT systems.',
					'Report suspected misuse or security issues to the BPIT IT Team immediately.'
				]
			},
			{
				title: 'Third-Party Services',
				description:
					'BPIT may reference third-party platforms for placements, payments, or academic resources. Each service maintains its own policies.',
				points: [
					'BPIT is not responsible for the content or practices of external websites.',
					'Use third-party services at your discretion and review their respective terms.',
					'Any concerns with third-party services should be directed to the respective provider.'
				]
			},
			{
				title: 'Changes to These Terms',
				description:
					'BPIT may update these terms to reflect regulatory changes or improvements to our services. Continued use after updates signifies acceptance.',
				points: [
					'We recommend revisiting this page periodically.',
					'Major updates will be communicated through official BPIT channels when necessary.'
				]
			},
			{
				title: 'Contact Information',
				description:
					'For queries about these terms or requests for permissions, contact legal@bpitindia.ac.in or write to: Bhagwan Parshuram Institute of Technology, Rohini Sector-17, New Delhi - 110089.',
				points: []
			}
		]
	};
}

// --- Getter (cached) ---

export const getTermsOfServiceData = unstable_cache(
	async (slug: string): Promise<TermsOfServiceData> => {
		try {
			const page = await prisma.page.findUnique({
				where: { slug },
				include: {
					components: {
						where: { key: TERMS_KEY },
						orderBy: { order: 'asc' },
						take: 1
					}
				}
			});

			if (!page?.components?.[0]?.data) {
				return getDefaultTermsOfServiceData();
			}

			const parsed = termsOfServiceSchema.safeParse(page.components[0].data);
			if (!parsed.success) return getDefaultTermsOfServiceData();
			return parsed.data;
		} catch {
			return getDefaultTermsOfServiceData();
		}
	},
	['terms-of-service-data'],
	{ tags: [TERMS_CACHE_TAG] }
);

// --- Updater ---

export async function updateTermsOfServiceData(
	slug: string,
	data: TermsOfServiceData
): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		const admin = await requireAdmin();
		const validated = termsOfServiceSchema.parse(data);

		const page = await prisma.page.upsert({
			where: { slug },
			update: {},
			create: { slug, title: 'Terms of Service', kind: 'PAGE', status: 'PUBLISHED' }
		});

		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: TERMS_KEY }
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
					key: TERMS_KEY,
					order: 0,
					data: validated as unknown as Prisma.InputJsonValue
				}
			});
		}

		await createAuditLog({
			actorId: admin.id,
			action: existing ? 'UPDATE' : 'CREATE',
			resourceType: 'COMPONENT',
			summary: `Updated terms of service for page ${slug}`,
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

		revalidateTag(TERMS_CACHE_TAG);
		return { ok: true };
	} catch {
		return { ok: false, error: 'Failed to update terms of service data' };
	}
}
