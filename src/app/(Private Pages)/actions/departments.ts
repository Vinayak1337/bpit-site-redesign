'use server';
import 'server-only';

import { z } from 'zod';
import { revalidateTag, unstable_cache } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';

const DEPARTMENTS_CACHE_TAG = 'departments-data';
const DEPARTMENTS_KEY = 'DEPARTMENTS_DATA';

// --- Schemas ---

const departmentSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	fullName: z.string().min(1),
	description: z.string().min(1),
	iconName: z.string().min(1),
	color: z.string().min(1),
	bgColor: z.string().min(1),
	available: z.boolean(),
	students: z.number().int().nonnegative(),
	faculty: z.number().int().nonnegative(),
	labs: z.number().int().nonnegative(),
	specializations: z.array(z.string().min(1)).optional()
});

const departmentsPageSchema = z.object({
	departments: z.array(departmentSchema).min(1)
});

export type Department = z.infer<typeof departmentSchema>;
export type DepartmentsPageData = z.infer<typeof departmentsPageSchema>;

// --- Default data ---

function getDefaultDepartmentsData(): DepartmentsPageData {
	return {
		departments: [
			{
				id: 'cse',
				name: 'CSE',
				fullName: 'Computer Science & Engineering',
				description:
					'Cutting-edge computer science education with focus on software development, algorithms, AI, and emerging technologies.',
				iconName: 'Code',
				color: 'text-blue-600',
				bgColor: 'bg-blue-50',
				available: true,
				students: 480,
				faculty: 35,
				labs: 12,
				specializations: [
					'Artificial Intelligence',
					'Machine Learning',
					'Software Engineering',
					'Cybersecurity'
				]
			},
			{
				id: 'it',
				name: 'IT',
				fullName: 'Information Technology',
				description:
					'Comprehensive IT education focusing on system administration, network management, and enterprise solutions.',
				iconName: 'Cpu',
				color: 'text-green-600',
				bgColor: 'bg-green-50',
				available: false,
				students: 360,
				faculty: 28,
				labs: 10,
				specializations: [
					'Network Administration',
					'Database Management',
					'Cloud Computing',
					'IT Security'
				]
			},
			{
				id: 'ece',
				name: 'ECE',
				fullName: 'Electronics & Communication Engineering',
				description:
					'Advanced electronics and communication systems with emphasis on digital signal processing and telecommunications.',
				iconName: 'Radio',
				color: 'text-purple-600',
				bgColor: 'bg-purple-50',
				available: false,
				students: 240,
				faculty: 22,
				labs: 8,
				specializations: [
					'VLSI Design',
					'Embedded Systems',
					'Communication Systems',
					'Signal Processing'
				]
			},
			{
				id: 'eee',
				name: 'EEE',
				fullName: 'Electrical & Electronics Engineering',
				description:
					'Comprehensive electrical engineering program covering power systems, control systems, and renewable energy.',
				iconName: 'Zap',
				color: 'text-yellow-600',
				bgColor: 'bg-yellow-50',
				available: false,
				students: 180,
				faculty: 18,
				labs: 6,
				specializations: [
					'Power Systems',
					'Control Systems',
					'Renewable Energy',
					'Electric Vehicles'
				]
			},
			{
				id: 'mba',
				name: 'MBA',
				fullName: 'Master of Business Administration',
				description:
					'Comprehensive business administration program with focus on leadership, strategy, and entrepreneurship.',
				iconName: 'Briefcase',
				color: 'text-red-600',
				bgColor: 'bg-red-50',
				available: false,
				students: 120,
				faculty: 15,
				labs: 4,
				specializations: ['Finance', 'Marketing', 'Human Resources', 'Operations']
			}
		]
	};
}

// --- Getter (cached) ---

export const getDepartmentsData = unstable_cache(
	async (slug: string): Promise<DepartmentsPageData> => {
		try {
			const page = await prisma.page.findUnique({
				where: { slug },
				include: {
					components: {
						where: { key: DEPARTMENTS_KEY },
						orderBy: { order: 'asc' },
						take: 1
					}
				}
			});

			if (!page?.components?.[0]?.data) {
				return getDefaultDepartmentsData();
			}

			const parsed = departmentsPageSchema.safeParse(page.components[0].data);
			if (!parsed.success) return getDefaultDepartmentsData();
			return parsed.data;
		} catch {
			return getDefaultDepartmentsData();
		}
	},
	['departments-data'],
	{ tags: [DEPARTMENTS_CACHE_TAG] }
);

// --- Updater ---

export async function updateDepartmentsData(
	slug: string,
	data: DepartmentsPageData
): Promise<{ ok: true } | { ok: false; error: string }> {
	try {
		const admin = await requireAdmin();
		const validated = departmentsPageSchema.parse(data);

		const page = await prisma.page.upsert({
			where: { slug },
			update: {},
			create: { slug, title: 'Departments', kind: 'PAGE', status: 'PUBLISHED' }
		});

		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: DEPARTMENTS_KEY }
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
					key: DEPARTMENTS_KEY,
					order: 0,
					data: validated as unknown as Prisma.InputJsonValue
				}
			});
		}

		await createAuditLog({
			actorId: admin.id,
			action: existing ? 'UPDATE' : 'CREATE',
			resourceType: 'COMPONENT',
			summary: `Updated departments data for page ${slug}`,
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

		revalidateTag(DEPARTMENTS_CACHE_TAG);
		return { ok: true };
	} catch {
		return { ok: false, error: 'Failed to update departments data' };
	}
}
