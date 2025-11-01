'use server';
import 'server-only';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';

const eventSchema = z.object({
	id: z.union([z.string(), z.number()]).optional(),
	title: z.string().min(1),
	subtitle: z.string().default(''),
	description: z.string().default(''),
	image: z.string().min(1),
	date: z.string().min(1),
	time: z.string().default(''),
	location: z.string().default(''),
	category: z.string().default('General'),
	attendees: z.number().int().nonnegative().default(0),
	featured: z.boolean().default(false),
	status: z.string().default('upcoming'),
	tags: z.array(z.string()).default([]),
	organizer: z.string().default(''),
	registrationOpen: z.boolean().default(true),
	price: z.string().default(''),
	highlights: z.array(z.string()).default([]),
	rating: z.number().nonnegative().default(0),
	totalRatings: z.number().int().nonnegative().default(0)
});

const eventsSectionSchema = z.object({
	events: z.array(eventSchema).default([])
});

type EventItemInput = z.infer<typeof eventSchema>;
type EventsSectionInput = z.infer<typeof eventsSectionSchema>;

const defaultEventsSection: EventsSectionInput = {
	events: [
		{
			id: 1,
			title: 'BPIT TechFest 2024',
			subtitle: 'Innovation Summit & Tech Showcase',
			description:
				'Join us for the most spectacular tech festival featuring AI/ML workshops, robotics competitions, startup showcases, and industry expert keynotes.',
			image: '/events/img1.png',
			date: '2024-03-15',
			time: '9:00 AM - 8:00 PM',
			location: 'BPIT Main Auditorium',
			category: 'Technology',
			attendees: 1200,
			featured: true,
			status: 'upcoming',
			tags: ['AI/ML', 'Robotics', 'Startups', 'Innovation'],
			organizer: 'Technical Society BPIT',
			registrationOpen: true,
			price: 'Free',
			highlights: ['Industry Leaders', '48+ Hours', '₹50K+ Prizes'],
			rating: 4.9,
			totalRatings: 847
		}
	]
};

const toEvent = (event: EventItemInput): EventItem => ({
	id: typeof event.id === 'number' ? event.id : Number(event.id ?? 0) || 0,
	title: event.title,
	subtitle: event.subtitle ?? '',
	description: event.description ?? '',
	image: event.image,
	date: event.date,
	time: event.time ?? '',
	location: event.location ?? '',
	category: event.category ?? 'General',
	attendees: event.attendees ?? 0,
	featured: event.featured ?? false,
	status: event.status ?? 'upcoming',
	tags: event.tags ?? [],
	organizer: event.organizer ?? '',
	registrationOpen: event.registrationOpen ?? true,
	price: event.price ?? '',
	highlights: event.highlights ?? [],
	rating: event.rating ?? 0,
	totalRatings: event.totalRatings ?? 0
});

const fromEvent = (event: EventItem): EventItemInput => ({
	id: event.id,
	title: event.title,
	subtitle: event.subtitle,
	description: event.description,
	image: event.image,
	date: event.date,
	time: event.time,
	location: event.location,
	category: event.category,
	attendees: Number.isFinite(event.attendees) ? event.attendees : 0,
	featured: event.featured,
	status: event.status,
	tags: event.tags,
	organizer: event.organizer,
	registrationOpen: event.registrationOpen,
	price: event.price,
	highlights: event.highlights,
	rating: Number.isFinite(event.rating) ? event.rating : 0,
	totalRatings: Number.isFinite(event.totalRatings) ? event.totalRatings : 0
});

const normalizeEvents = (section: EventsSectionInput): EventsSectionData => ({
	events: section.events.map(toEvent)
});

export async function getEventsSection(
	pageSlug: string
): Promise<EventsSectionData> {
	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) {
		return normalizeEvents(defaultEventsSection);
	}

	const component = await prisma.component.findFirst({
		where: { pageId: page.id, key: 'EVENTS_SECTION' }
	});
	if (!component) {
		return normalizeEvents(defaultEventsSection);
	}

	const parsed = eventsSectionSchema.safeParse(component.data);
	if (!parsed.success) {
		return normalizeEvents(defaultEventsSection);
	}

	return normalizeEvents(parsed.data);
}

export async function updateEventsSection(
	pageSlug: string,
	section: EventsSectionData
): Promise<{ ok: true } | { ok: false; error: string }> {
	const admin = await requireAdmin();

	const eventsForStore = section.events.map(fromEvent);
	const parsed = eventsSectionSchema.safeParse({ events: eventsForStore });
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) {
		return { ok: false, error: 'page_not_found' };
	}

	const component = await prisma.component.findFirst({
		where: { pageId: page.id, key: 'EVENTS_SECTION' }
	});
	if (!component) {
		return { ok: false, error: 'component_not_found' };
	}

	const previousData = component.data;

	await prisma.component.update({
		where: { id: component.id },
		data: { data: parsed.data }
	});

	await createAuditLog({
		actorId: admin.id,
		action: 'UPDATE',
		resourceType: 'COMPONENT',
		summary: `Updated events section for page ${pageSlug}`,
		changes: [
			{
				resourceId: component.id,
				resourceType: 'COMPONENT',
				field: 'data',
				previousData:
					previousData === null
						? undefined
						: (previousData as unknown as Prisma.InputJsonValue),
				newData: parsed.data as unknown as Prisma.InputJsonValue
			}
		]
	});

	return { ok: true };
}


