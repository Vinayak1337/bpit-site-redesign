'use server';
import 'server-only';

import { z } from 'zod';
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';

const PAGE_SLUG = 'academia-academic-calendar';
const HERO_KEY = 'HERO';
const EVENTS_KEY = 'EVENTS';
const HERO_TAG = `${PAGE_SLUG}-hero`;
const EVENTS_TAG = `${PAGE_SLUG}-events`;

// ---------- Schemas ----------

const heroSchema = z.object({
	title: z.string().min(1),
	subtitle: z.string().min(1)
});
export type CalendarHeroData = z.infer<typeof heroSchema>;

const eventTypeSchema = z.enum([
	'exam',
	'holiday',
	'academic',
	'orientation',
	'fest'
]);

const prioritySchema = z.enum(['high', 'medium', 'low']);

const eventItemSchema = z.object({
	id: z.union([z.string(), z.number()]),
	title: z.string().min(1),
	description: z.string().default(''),
	date: z.string().min(1),
	endDate: z.string().optional().default(''),
	time: z.string().optional().default(''),
	location: z.string().optional().default(''),
	type: eventTypeSchema,
	semester: z.string().optional().default(''),
	department: z.string().optional().default(''),
	priority: prioritySchema
});
export type CalendarEventItem = z.infer<typeof eventItemSchema>;

const eventsSchema = z.object({
	items: z.array(eventItemSchema).default([])
});
export type CalendarEventsData = z.infer<typeof eventsSchema>;

// ---------- Defaults ----------

function defaultHero(): CalendarHeroData {
	return {
		title: 'Academic Calendar 2025-26',
		subtitle:
			'Complete academic year calendar with examinations, holidays, festivals, and important events'
	};
}

function defaultEvents(): CalendarEventsData {
	return {
		items: [
			{
				id: 1,
				title: 'Winter Break',
				description: 'Winter vacation for all students and faculty',
				date: '2025-01-01',
				endDate: '2025-01-07',
				time: '',
				location: '',
				type: 'holiday',
				semester: '',
				department: '',
				priority: 'low'
			},
			{
				id: 2,
				title: 'Classes Resume',
				description: 'Regular classes resume after winter break',
				date: '2025-01-08',
				endDate: '',
				time: '9:00 AM',
				location: 'All Departments',
				type: 'academic',
				semester: 'All Semesters',
				department: '',
				priority: 'high'
			},
			{
				id: 3,
				title: 'Mid-Semester Exams',
				description:
					'Mid-semester examinations for all undergraduate programs',
				date: '2025-01-15',
				endDate: '2025-01-25',
				time: '9:00 AM',
				location: 'Examination Halls',
				type: 'exam',
				semester: 'All Semesters',
				department: '',
				priority: 'high'
			},
			{
				id: 4,
				title: 'Spring Semester Registration',
				description: 'Course registration for Spring semester 2025',
				date: '2025-01-20',
				endDate: '2025-01-22',
				time: '9:00 AM - 5:00 PM',
				location: 'Academic Office',
				type: 'academic',
				semester: 'All Semesters',
				department: '',
				priority: 'high'
			},
			{
				id: 5,
				title: 'Republic Day',
				description: 'National holiday - Republic Day celebration',
				date: '2025-01-26',
				endDate: '',
				time: '',
				location: '',
				type: 'holiday',
				semester: '',
				department: '',
				priority: 'medium'
			},
			{
				id: 6,
				title: 'Industry Lecture Series',
				description: 'Guest lectures by industry experts and professionals',
				date: '2025-02-05',
				endDate: '2025-02-07',
				time: '2:00 PM - 4:00 PM',
				location: 'Main Auditorium',
				type: 'academic',
				semester: '',
				department: '',
				priority: 'medium'
			},
			{
				id: 7,
				title: 'TECHNOVANZA 2025',
				description:
					'Annual technical festival with competitions, workshops, and tech talks',
				date: '2025-02-10',
				endDate: '2025-02-12',
				time: '10:00 AM - 6:00 PM',
				location: 'Campus Wide',
				type: 'fest',
				semester: '',
				department: '',
				priority: 'medium'
			},
			{
				id: 8,
				title: "Fresher's Welcome Program",
				description: 'Welcome program for newly admitted students',
				date: '2025-02-15',
				endDate: '2025-02-16',
				time: '10:00 AM - 4:00 PM',
				location: 'Main Auditorium',
				type: 'orientation',
				semester: '1st Semester',
				department: '',
				priority: 'high'
			},
			{
				id: 9,
				title: 'Project Presentation Week',
				description: 'Final year project presentations and evaluations',
				date: '2025-02-20',
				endDate: '2025-02-24',
				time: '9:00 AM - 5:00 PM',
				location: 'Various Labs',
				type: 'academic',
				semester: 'Final Year',
				department: '',
				priority: 'high'
			},
			{
				id: 10,
				title: 'Annual Sports Day',
				description:
					'Inter-department sports competitions and cultural activities',
				date: '2025-02-28',
				endDate: '',
				time: '8:00 AM - 6:00 PM',
				location: 'Sports Complex',
				type: 'fest',
				semester: '',
				department: '',
				priority: 'medium'
			},
			{
				id: 11,
				title: 'Holi Festival',
				description: 'Festival of colors - campus celebration',
				date: '2025-03-14',
				endDate: '',
				time: '',
				location: '',
				type: 'holiday',
				semester: '',
				department: '',
				priority: 'low'
			},
			{
				id: 12,
				title: 'End-Semester Examinations',
				description: 'Final examinations for Spring semester 2025',
				date: '2025-03-15',
				endDate: '2025-03-30',
				time: '9:00 AM - 12:00 PM',
				location: 'Examination Halls',
				type: 'exam',
				semester: 'All Semesters',
				department: '',
				priority: 'high'
			},
			{
				id: 13,
				title: 'Spring Break',
				description: 'Spring vacation after semester examinations',
				date: '2025-04-01',
				endDate: '2025-04-15',
				time: '',
				location: '',
				type: 'holiday',
				semester: '',
				department: '',
				priority: 'low'
			},
			{
				id: 14,
				title: 'Summer Semester Registration',
				description: 'Registration for summer courses and supplementary exams',
				date: '2025-04-16',
				endDate: '2025-04-18',
				time: '9:00 AM - 4:00 PM',
				location: 'Academic Office',
				type: 'academic',
				semester: '',
				department: '',
				priority: 'medium'
			},
			{
				id: 15,
				title: 'Summer Semester Classes Begin',
				description: 'Commencement of summer semester courses',
				date: '2025-04-20',
				endDate: '',
				time: '9:00 AM',
				location: 'All Departments',
				type: 'academic',
				semester: 'Summer Semester',
				department: '',
				priority: 'high'
			},
			{
				id: 16,
				title: 'Labour Day',
				description: "International Workers' Day - Holiday",
				date: '2025-05-01',
				endDate: '',
				time: '',
				location: '',
				type: 'holiday',
				semester: '',
				department: '',
				priority: 'low'
			},
			{
				id: 17,
				title: 'Mid-Summer Assessments',
				description: 'Mid-term assessments for summer semester',
				date: '2025-05-15',
				endDate: '2025-05-20',
				time: '9:00 AM',
				location: 'Examination Halls',
				type: 'exam',
				semester: 'Summer Semester',
				department: '',
				priority: 'high'
			},
			{
				id: 18,
				title: 'Industry Internship Program',
				description: 'Summer internship program with industry partners',
				date: '2025-05-25',
				endDate: '2025-07-25',
				time: '',
				location: '',
				type: 'academic',
				semester: 'Pre-final Year',
				department: '',
				priority: 'medium'
			},
			{
				id: 19,
				title: 'Summer Semester End Exams',
				description: 'Final examinations for summer semester',
				date: '2025-06-10',
				endDate: '2025-06-20',
				time: '9:00 AM',
				location: 'Examination Halls',
				type: 'exam',
				semester: 'Summer Semester',
				department: '',
				priority: 'high'
			},
			{
				id: 20,
				title: 'Summer Break',
				description: 'Summer vacation for students and faculty',
				date: '2025-06-21',
				endDate: '2025-07-15',
				time: '',
				location: '',
				type: 'holiday',
				semester: '',
				department: '',
				priority: 'low'
			},
			{
				id: 21,
				title: 'Faculty Development Program',
				description: 'Professional development workshops for faculty',
				date: '2025-07-01',
				endDate: '2025-07-10',
				time: '9:00 AM - 4:00 PM',
				location: 'Conference Hall',
				type: 'academic',
				semester: '',
				department: '',
				priority: 'medium'
			},
			{
				id: 22,
				title: 'New Academic Year 2025-26',
				description: 'Commencement of new academic year 2025-26',
				date: '2025-07-16',
				endDate: '',
				time: '9:00 AM',
				location: 'Main Auditorium',
				type: 'academic',
				semester: 'All Semesters',
				department: '',
				priority: 'high'
			},
			{
				id: 23,
				title: 'Freshman Orientation Week',
				description: 'Orientation program for newly admitted students',
				date: '2025-07-20',
				endDate: '2025-07-26',
				time: '9:00 AM - 5:00 PM',
				location: 'Various Venues',
				type: 'orientation',
				semester: '1st Semester',
				department: '',
				priority: 'high'
			},
			{
				id: 24,
				title: 'Independence Day',
				description: 'National holiday - Independence Day celebration',
				date: '2025-08-15',
				endDate: '',
				time: '8:00 AM',
				location: 'Main Campus',
				type: 'holiday',
				semester: '',
				department: '',
				priority: 'medium'
			},
			{
				id: 25,
				title: 'Mid-Semester Tests',
				description: 'Mid-semester examinations for Fall semester',
				date: '2025-09-15',
				endDate: '2025-09-25',
				time: '9:00 AM',
				location: 'Examination Halls',
				type: 'exam',
				semester: 'All Semesters',
				department: '',
				priority: 'high'
			},
			{
				id: 26,
				title: 'Ganesh Chaturthi',
				description: 'Festival celebration on campus',
				date: '2025-08-29',
				endDate: '',
				time: '',
				location: '',
				type: 'holiday',
				semester: '',
				department: '',
				priority: 'low'
			},
			{
				id: 27,
				title: 'Gandhi Jayanti',
				description: "Mahatma Gandhi's birth anniversary",
				date: '2025-10-02',
				endDate: '',
				time: '',
				location: '',
				type: 'holiday',
				semester: '',
				department: '',
				priority: 'medium'
			},
			{
				id: 28,
				title: 'Diwali Celebration',
				description: 'Festival of lights celebration',
				date: '2025-10-20',
				endDate: '2025-10-24',
				time: '',
				location: '',
				type: 'holiday',
				semester: '',
				department: '',
				priority: 'low'
			},
			{
				id: 29,
				title: 'Fall Semester End Exams',
				description: 'Final examinations for Fall semester 2025',
				date: '2025-11-20',
				endDate: '2025-12-15',
				time: '9:00 AM',
				location: 'Examination Halls',
				type: 'exam',
				semester: 'All Semesters',
				department: '',
				priority: 'high'
			},
			{
				id: 30,
				title: 'Annual Cultural Fest',
				description: 'Inter-college cultural festival and competitions',
				date: '2025-11-05',
				endDate: '2025-11-07',
				time: '10:00 AM - 8:00 PM',
				location: 'Campus Wide',
				type: 'fest',
				semester: '',
				department: '',
				priority: 'medium'
			},
			{
				id: 31,
				title: 'Christmas Holiday',
				description: 'Christmas and New Year break',
				date: '2025-12-24',
				endDate: '2025-12-31',
				time: '',
				location: '',
				type: 'holiday',
				semester: '',
				department: '',
				priority: 'low'
			},
			{
				id: 32,
				title: 'Convocation Ceremony',
				description: 'Annual graduation ceremony for outgoing students',
				date: '2025-12-20',
				endDate: '',
				time: '10:00 AM',
				location: 'Main Auditorium',
				type: 'academic',
				semester: 'Final Year',
				department: '',
				priority: 'high'
			}
		]
	};
}

// ---------- Readers ----------

export async function getCalendarHero(): Promise<CalendarHeroData> {
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
				console.error('getCalendarHero failed', e);
				return defaultHero();
			}
		},
		[HERO_TAG],
		{ tags: [HERO_TAG], revalidate: 3600 }
	)();
}

export async function getCalendarEvents(): Promise<CalendarEventsData> {
	return unstable_cache(
		async () => {
			try {
				const page = await prisma.page.findUnique({
					where: { slug: PAGE_SLUG },
					include: { components: true }
				});
				if (!page) return defaultEvents();
				const c = page.components.find(x => x.key === EVENTS_KEY);
				if (!c) return defaultEvents();
				const parsed = eventsSchema.safeParse(c.data);
				return parsed.success ? parsed.data : defaultEvents();
			} catch (e) {
				console.error('getCalendarEvents failed', e);
				return defaultEvents();
			}
		},
		[EVENTS_TAG],
		{ tags: [EVENTS_TAG], revalidate: 3600 }
	)();
}

// ---------- Writers ----------

async function ensurePage() {
	return prisma.page.upsert({
		where: { slug: PAGE_SLUG },
		update: {},
		create: {
			slug: PAGE_SLUG,
			title: 'Academic Calendar',
			kind: 'PAGE',
			status: 'PUBLISHED'
		}
	});
}

export async function updateCalendarHero(data: CalendarHeroData) {
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
			summary: 'Updated Academic Calendar hero',
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
		revalidatePath('/academia/academic-calendar');
		revalidatePath('/admin/academia/academic-calendar');
		return { ok: true as const };
	} catch (e) {
		console.error('updateCalendarHero failed', e);
		return { ok: false as const, error: 'save_failed' };
	}
}

export async function updateCalendarEvents(data: CalendarEventsData) {
	const admin = await requireAdmin();
	const parsed = eventsSchema.safeParse(data);
	if (!parsed.success) return { ok: false as const, error: 'invalid_payload' };
	try {
		const page = await ensurePage();
		const existing = await prisma.component.findFirst({
			where: { pageId: page.id, key: EVENTS_KEY }
		});
		const previousData = existing?.data ?? null;
		const component = await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: {
				data: parsed.data as unknown as Prisma.InputJsonValue,
				key: EVENTS_KEY
			},
			create: {
				pageId: page.id,
				data: parsed.data as unknown as Prisma.InputJsonValue,
				order: 1,
				key: EVENTS_KEY
			}
		});
		await createAuditLog({
			actorId: admin.id,
			action: 'UPDATE',
			resourceType: 'COMPONENT',
			summary: 'Updated Academic Calendar events',
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
		revalidateTag(EVENTS_TAG);
		revalidatePath('/academia/academic-calendar');
		revalidatePath('/admin/academia/academic-calendar');
		return { ok: true as const };
	} catch (e) {
		console.error('updateCalendarEvents failed', e);
		return { ok: false as const, error: 'save_failed' };
	}
}
