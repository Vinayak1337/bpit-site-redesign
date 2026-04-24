'use server';
import 'server-only';

import { z } from 'zod';
import { revalidateTag, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';

const PRIVACY_POLICY_CACHE_TAG = 'privacy-policy-data';
const PRIVACY_POLICY_KEY = 'PRIVACY_POLICY_DATA';

// --- Schemas ---

const privacySectionSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	points: z.array(z.string())
});

const privacyPolicySchema = z.object({
	lastUpdated: z.string().min(1),
	intro: z.string().min(1),
	sections: z.array(privacySectionSchema).min(1)
});

export type PrivacySection = z.infer<typeof privacySectionSchema>;
export type PrivacyPolicyData = z.infer<typeof privacyPolicySchema>;

// --- Default data ---

function getDefaultPrivacyPolicyData(): PrivacyPolicyData {
	return {
		lastUpdated: 'November 2025',
		intro:
			'BPIT is committed to safeguarding the personal information of our students, parents, faculty, alumni, and partners. The following sections explain how we collect, use, and protect the data shared with us.',
		sections: [
			{
				title: 'Information We Collect',
				description:
					'We only gather information that helps us respond to enquiries, deliver academic updates, and improve the BPIT digital experience.',
				points: [
					'Contact information submitted through enquiry, admission, or newsletter forms.',
					'Usage data such as pages visited, device information, and browser type collected through analytics tools.',
					'Any additional details you voluntarily provide when communicating with BPIT.'
				]
			},
			{
				title: 'How We Use Your Information',
				description:
					'Collected data allows us to provide timely academic communication and maintain secure campus services.',
				points: [
					'Respond to admission, placement, or academic queries.',
					'Deliver newsletters and institutional announcements when you opt in.',
					'Maintain accurate records for statutory and accreditation reporting.',
					'Improve website performance and user experience.'
				]
			},
			{
				title: 'Data Sharing and Retention',
				description:
					'We respect your privacy and only share your information in strictly limited situations.',
				points: [
					'Access is restricted to authorised BPIT departments and trusted service partners that meet our security standards.',
					'We never sell personal information to third parties.',
					'Information is retained only for as long as necessary to provide services or comply with regulations.'
				]
			},
			{
				title: 'Your Rights',
				description:
					'You are in control of your information and can contact us at any time to exercise the following rights:',
				points: [
					'Request a copy of the personal information we hold about you.',
					'Ask for corrections or updates to inaccurate or incomplete data.',
					'Withdraw consent for marketing communications or newsletter subscriptions.',
					'Request deletion of your data, subject to legal or contractual obligations.'
				]
			},
			{
				title: 'Contact Us',
				description:
					'If you have questions about this privacy policy or how your information is handled, write to us at privacy@bpitindia.ac.in or by post at Bhagwan Parshuram Institute of Technology, Rohini Sector-17, New Delhi - 110089.',
				points: []
			}
		]
	};
}

// --- Getter (cached) ---

export const getPrivacyPolicyData = unstable_cache(
	async (slug: string): Promise<PrivacyPolicyData> => {
		try {
			const page = await prisma.page.findUnique({
				where: { slug },
				include: {
					components: {
						where: { key: PRIVACY_POLICY_KEY },
						orderBy: { order: 'asc' },
						take: 1
					}
				}
			});

			if (!page?.components?.[0]?.data) {
				return getDefaultPrivacyPolicyData();
			}

			const parsed = privacyPolicySchema.safeParse(page.components[0].data);
			if (!parsed.success) return getDefaultPrivacyPolicyData();
			return parsed.data;
		} catch {
			return getDefaultPrivacyPolicyData();
		}
	},
	['privacy-policy-data'],
	{ tags: [PRIVACY_POLICY_CACHE_TAG] }
);

// --- Updater ---

export async function updatePrivacyPolicyData(
	slug: string,
	data: PrivacyPolicyData
): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		const admin = await requireAdmin();
		const validated = privacyPolicySchema.parse(data);

		const page = await prisma.page.upsert({
			where: { slug },
			update: {},
			create: { slug, title: 'Privacy Policy', kind: 'PAGE', status: 'PUBLISHED' }
		});

		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: PRIVACY_POLICY_KEY }
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
					key: PRIVACY_POLICY_KEY,
					order: 0,
					data: validated as unknown as Prisma.InputJsonValue
				}
			});
		}

		await createAuditLog({
			actorId: admin.id,
			action: existing ? 'UPDATE' : 'CREATE',
			resourceType: 'COMPONENT',
			summary: `Updated privacy policy for page ${slug}`,
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

		revalidateTag(PRIVACY_POLICY_CACHE_TAG);
		return { ok: true };
	} catch {
		return { ok: false, error: 'Failed to update privacy policy data' };
	}
}
