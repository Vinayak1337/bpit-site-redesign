'use server';
import 'server-only';

import { z } from 'zod';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';

const PAGE_SLUG = 'academia-syllabus-ordinance';
const HERO_KEY = 'HERO';
const PROGRAMS_KEY = 'PROGRAMS';
const HERO_TAG = `${PAGE_SLUG}-hero`;
const PROGRAMS_TAG = `${PAGE_SLUG}-programs`;

// ---------- Schemas ----------

const heroSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	subtitle: z.string().min(1, 'Subtitle is required')
});
export type SyllabusHeroData = z.infer<typeof heroSchema>;

const programItemSchema = z.object({
	id: z.union([z.string(), z.number()]),
	name: z.string().min(1),
	code: z.string().min(1),
	color: z.string().min(1).default('blue'),
	type: z.enum(['syllabus', 'ordinance']).default('syllabus'),
	courses: z.array(z.string()).default([]),
	syllabusCount: z.number().int().nonnegative().default(0),
	description: z.string().default(''),
	lastUpdated: z.string().default(''),
	size: z.string().default(''),
	department: z.string().default(''),
	course: z.string().default(''),
	image: z.string().nullable().default(null),
	documentUrl: z.string().default('')
});
export type SyllabusProgramItem = z.infer<typeof programItemSchema>;

const programsSchema = z.object({
	items: z.array(programItemSchema).default([])
});
export type SyllabusProgramsData = z.infer<typeof programsSchema>;

// ---------- Defaults ----------

function defaultHero(): SyllabusHeroData {
	return {
		title: 'Syllabus & Ordinance',
		subtitle:
			'Access comprehensive curriculum details, course syllabi, and academic ordinances for all undergraduate and postgraduate programs at BPIT.'
	};
}

function defaultPrograms(): SyllabusProgramsData {
	return {
		items: [
			{
				id: 1,
				name: 'Computer Science & Engineering',
				code: 'CSE',
				color: 'blue',
				type: 'syllabus',
				courses: ['B.Tech CSE', 'M.Tech CSE'],
				syllabusCount: 8,
				description: 'B.Tech CSE, M.Tech CSE - 8 Semester Syllabi',
				lastUpdated: '2024-01-15',
				size: 'Multiple Files',
				department: 'Computer Science & Engineering',
				course: '',
				image: null,
				documentUrl: ''
			},
			{
				id: 2,
				name: 'Electronics & Communication',
				code: 'ECE',
				color: 'green',
				type: 'syllabus',
				courses: ['B.Tech ECE', 'M.Tech ECE'],
				syllabusCount: 8,
				description: 'B.Tech ECE, M.Tech ECE - 8 Semester Syllabi',
				lastUpdated: '2024-01-15',
				size: 'Multiple Files',
				department: 'Electronics & Communication',
				course: '',
				image: null,
				documentUrl: ''
			},
			{
				id: 3,
				name: 'Mechanical Engineering',
				code: 'ME',
				color: 'purple',
				type: 'syllabus',
				courses: ['B.Tech ME', 'M.Tech Production'],
				syllabusCount: 8,
				description: 'B.Tech ME, M.Tech Production - 8 Semester Syllabi',
				lastUpdated: '2024-01-15',
				size: 'Multiple Files',
				department: 'Mechanical Engineering',
				course: '',
				image: null,
				documentUrl: ''
			},
			{
				id: 4,
				name: 'Electrical Engineering',
				code: 'EE',
				color: 'orange',
				type: 'syllabus',
				courses: ['B.Tech EE'],
				syllabusCount: 8,
				description: 'B.Tech EE - 8 Semester Syllabi',
				lastUpdated: '2024-01-15',
				size: 'Multiple Files',
				department: 'Electrical Engineering',
				course: '',
				image: null,
				documentUrl: ''
			},
			{
				id: 5,
				name: 'Information Technology',
				code: 'IT',
				color: 'indigo',
				type: 'syllabus',
				courses: ['B.Tech IT'],
				syllabusCount: 8,
				description: 'B.Tech IT - 8 Semester Syllabi',
				lastUpdated: '2024-01-15',
				size: 'Multiple Files',
				department: 'Information Technology',
				course: '',
				image: null,
				documentUrl: ''
			},
			{
				id: 6,
				name: 'General Ordinance for Undergraduate Programs',
				code: 'UG',
				color: 'blue',
				type: 'ordinance',
				courses: [],
				syllabusCount: 0,
				description:
					'Complete guidelines for B.Tech programs, examination rules, and academic regulations',
				lastUpdated: '2024-01-15',
				size: '2.5 MB',
				department: 'General',
				course: 'All Undergraduate',
				image: null,
				documentUrl: ''
			},
			{
				id: 7,
				name: 'General Ordinance for Postgraduate Programs',
				code: 'PG',
				color: 'blue',
				type: 'ordinance',
				courses: [],
				syllabusCount: 0,
				description:
					'Guidelines for M.Tech programs, thesis requirements, and academic policies',
				lastUpdated: '2024-01-15',
				size: '1.8 MB',
				department: 'General',
				course: 'All Postgraduate',
				image: null,
				documentUrl: ''
			},
			{
				id: 8,
				name: 'Credit Transfer & Migration Policy',
				code: 'CTM',
				color: 'blue',
				type: 'ordinance',
				courses: [],
				syllabusCount: 0,
				description:
					'Rules for credit transfer between institutions and migration procedures',
				lastUpdated: '2023-12-10',
				size: '850 KB',
				department: 'General',
				course: 'All Programs',
				image: null,
				documentUrl: ''
			}
		]
	};
}

// ---------- Readers ----------

export async function getSyllabusHero(): Promise<SyllabusHeroData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug: PAGE_SLUG },
					include: { components: true }
				});
				if (!page) return defaultHero();
				const c = page.components.find(x => x.key === HERO_KEY);
				if (!c) return defaultHero();
				const parsed = heroSchema.safeParse(c.data);
				return parsed.success ? parsed.data : defaultHero();
			} catch (e) {
				console.error('getSyllabusHero failed', e);
				return defaultHero();
			}
		},
		[HERO_TAG],
		{ tags: [HERO_TAG], revalidate: 3600 }
	)();
}

export async function getSyllabusPrograms(): Promise<SyllabusProgramsData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug: PAGE_SLUG },
					include: { components: true }
				});
				if (!page) return defaultPrograms();
				const c = page.components.find(x => x.key === PROGRAMS_KEY);
				if (!c) return defaultPrograms();
				const parsed = programsSchema.safeParse(c.data);
				return parsed.success ? parsed.data : defaultPrograms();
			} catch (e) {
				console.error('getSyllabusPrograms failed', e);
				return defaultPrograms();
			}
		},
		[PROGRAMS_TAG],
		{ tags: [PROGRAMS_TAG], revalidate: 3600 }
	)();
}

// ---------- Writers ----------

export async function ensurePage() {
	return prisma.page.upsert({
		where: { slug: PAGE_SLUG },
		update: {},
		create: {
			slug: PAGE_SLUG,
			title: 'Syllabus & Ordinance',
			kind: 'PAGE',
			status: 'PUBLISHED'
		}
	});
}

export async function updateSyllabusHero(data: SyllabusHeroData) {
	const admin = await requireAdmin();
	const parsed = heroSchema.safeParse(data);
	if (!parsed.success) return { ok: false as const, error: 'invalid_payload' };
	try {
		const page = await ensurePage();
		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: HERO_KEY }
		});
		const previousData = existing?.data ?? null;
		const component = await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 0 } },
			update: {
				data: parsed.data as unknown as Prisma.InputJsonValue,
				key: HERO_KEY
			},
			create: {
				pageId: page.id,
				data: parsed.data as unknown as Prisma.InputJsonValue,
				order: 0,
				key: HERO_KEY
			}
		});
		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'COMPONENT',
			summary: 'Updated Syllabus & Ordinance hero',
			changes: [
				{
					resourceId: component.id,
					resourceType: 'COMPONENT',
					field: 'data',
					previousData:
						previousData === null
							? undefined
							: (previousData as Prisma.InputJsonValue),
					newData: parsed.data as unknown as Prisma.InputJsonValue
				}
			]
		});
		revalidateTag(HERO_TAG);
		revalidatePath('/academia/syllabus-ordinance');
		revalidatePath('/admin/academia/syllabus-ordinance');
		return { ok: true as const };
	} catch (e) {
		console.error('updateSyllabusHero failed', e);
		return { ok: false as const, error: 'save_failed' };
	}
}

export async function updateSyllabusPrograms(data: SyllabusProgramsData) {
	const admin = await requireAdmin();
	const parsed = programsSchema.safeParse(data);
	if (!parsed.success) return { ok: false as const, error: 'invalid_payload' };
	try {
		const page = await ensurePage();
		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: PROGRAMS_KEY }
		});
		const previousData = existing?.data ?? null;
		const component = await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: {
				data: parsed.data as unknown as Prisma.InputJsonValue,
				key: PROGRAMS_KEY
			},
			create: {
				pageId: page.id,
				data: parsed.data as unknown as Prisma.InputJsonValue,
				order: 1,
				key: PROGRAMS_KEY
			}
		});
		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'COMPONENT',
			summary: 'Updated Syllabus & Ordinance programs',
			changes: [
				{
					resourceId: component.id,
					resourceType: 'COMPONENT',
					field: 'data',
					previousData:
						previousData === null
							? undefined
							: (previousData as Prisma.InputJsonValue),
					newData: parsed.data as unknown as Prisma.InputJsonValue
				}
			]
		});
		revalidateTag(PROGRAMS_TAG);
		revalidatePath('/academia/syllabus-ordinance');
		revalidatePath('/admin/academia/syllabus-ordinance');
		return { ok: true as const };
	} catch (e) {
		console.error('updateSyllabusPrograms failed', e);
		return { ok: false as const, error: 'save_failed' };
	}
}
