'use server';
import 'server-only';

import { z } from 'zod';
import { revalidateTag, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';

const ACADEMIA_OVERVIEW_CACHE_TAG = 'academia-overview-data';
const ACADEMIA_OVERVIEW_KEY = 'OVERVIEW';

// --- Schemas ---

const academiaStatSchema = z.object({
	icon: z.string().min(1),
	value: z.string().min(1),
	label: z.string().min(1),
	color: z.string().min(1)
});

const academiaQuickAccessSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	icon: z.string().min(1),
	href: z.string().min(1),
	color: z.string().min(1)
});

const academiaImportantInfoSchema = z.object({
	title: z.string().min(1),
	points: z.array(z.string().min(1)).min(1)
});

const academiaOverviewSchema = z.object({
	heading: z.string().min(1),
	subheading: z.string().min(1),
	stats: z.array(academiaStatSchema).min(1),
	missionTitle: z.string().min(1),
	missionText: z.string().min(1),
	quickAccess: z.array(academiaQuickAccessSchema).min(1),
	departments: z.array(z.string().min(1)).min(1),
	importantInfo: academiaImportantInfoSchema
});

export type AcademiaStat = z.infer<typeof academiaStatSchema>;
export type AcademiaQuickAccess = z.infer<typeof academiaQuickAccessSchema>;
export type AcademiaImportantInfo = z.infer<typeof academiaImportantInfoSchema>;
export type AcademiaOverviewData = z.infer<typeof academiaOverviewSchema>;

// --- Default data ---

function getDefaultAcademiaOverview(): AcademiaOverviewData {
	return {
		heading: 'Academic Excellence at BPIT',
		subheading:
			'Discover our comprehensive academic resources, programs, and support systems designed to foster innovation and excellence in engineering education.',
		stats: [
			{ icon: 'BookOpen', value: '8', label: 'Academic Departments', color: 'bg-blue-100 text-blue-600' },
			{ icon: 'Users', value: '2000+', label: 'Students Enrolled', color: 'bg-green-100 text-green-600' },
			{ icon: 'Award', value: '100+', label: 'Faculty Members', color: 'bg-purple-100 text-purple-600' },
			{ icon: 'FileText', value: '12', label: 'B.Tech Programs', color: 'bg-orange-100 text-orange-600' }
		],
		missionTitle: 'Our Academic Mission',
		missionText:
			'BPIT is committed to providing quality technical education that prepares students for successful careers in engineering and technology. Our academic programs are designed to combine theoretical knowledge with practical application, ensuring graduates are industry-ready and capable of contributing to technological advancement.',
		quickAccess: [
			{
				title: 'Notices & Circulars',
				description: 'Stay updated with the latest academic notices and circulars',
				icon: 'Bell',
				href: '/academia/notices-circulars',
				color: 'bg-red-50 border-red-200 hover:bg-red-100'
			},
			{
				title: 'Syllabus & Ordinance',
				description: 'Access detailed syllabi and academic ordinances',
				icon: 'BookOpen',
				href: '/academia/syllabus-ordinance',
				color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
			},
			{
				title: 'Academic Calendar',
				description: 'View important academic dates and schedules',
				icon: 'Calendar',
				href: '/academia/academic-calendar',
				color: 'bg-green-50 border-green-200 hover:bg-green-100'
			}
		],
		departments: [
			'Computer Science & Engineering',
			'Electronics & Communication',
			'Mechanical Engineering',
			'Civil Engineering',
			'Electrical Engineering',
			'Information Technology',
			'Applied Mathematics',
			'Physics & Chemistry'
		],
		importantInfo: {
			title: 'Important Academic Information',
			points: [
				'All academic notices and updates are published in the Notices & Circulars section',
				'Semester syllabi and examination schedules are available in Syllabus & Ordinance',
				'Academic calendar contains all important dates for the academic year',
				'Students are advised to regularly check these sections for updates'
			]
		}
	};
}

// --- Getter (cached) ---

export const getAcademiaOverview = unstable_cache(
	async (slug: string): Promise<AcademiaOverviewData> => {
		try {
			const page = await prisma.page.findUnique({
				where: { slug },
				include: {
					components: {
						where: { key: ACADEMIA_OVERVIEW_KEY },
						orderBy: { order: 'asc' },
						take: 1
					}
				}
			});

			if (!page?.components?.[0]?.data) {
				return getDefaultAcademiaOverview();
			}

			const parsed = academiaOverviewSchema.safeParse(page.components[0].data);
			if (!parsed.success) return getDefaultAcademiaOverview();
			return parsed.data;
		} catch {
			return getDefaultAcademiaOverview();
		}
	},
	['academia-overview'],
	{ tags: [ACADEMIA_OVERVIEW_CACHE_TAG] }
);

// --- Updater ---

export async function updateAcademiaOverview(
	slug: string,
	data: AcademiaOverviewData
): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		const admin = await requireAdmin();
		const validated = academiaOverviewSchema.parse(data);

		const page = await prisma.page.upsert({
			where: { slug },
			update: {},
			create: { slug, title: 'Academia', kind: 'PAGE', status: 'PUBLISHED' }
		});

		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: ACADEMIA_OVERVIEW_KEY }
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
					key: ACADEMIA_OVERVIEW_KEY,
					order: 1,
					data: validated as unknown as Prisma.InputJsonValue
				}
			});
		}

		await createAuditLog({
			actorId: admin.id,
			action: existing ? 'UPDATE' : 'CREATE',
			resourceType: 'COMPONENT',
			summary: `Updated academia overview for page ${slug}`,
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

		revalidateTag(ACADEMIA_OVERVIEW_CACHE_TAG);
		return { ok: true };
	} catch {
		return { ok: false, error: 'Failed to update academia overview' };
	}
}
