'use server';
import 'server-only';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';
import { revalidateTag, unstable_cache } from 'next/cache';

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
	ctaLabel: z.string().min(1).default('Register Now'),
	ctaLink: z
		.string()
		.min(1)
		.default('/')
		.refine(
			value =>
				value.startsWith('/') ||
				value.startsWith('https://') ||
				value.startsWith('http://'),
			'CTA link must start with "/" or "http(s)://"'
		)
});

const eventsSectionSchema = z.object({
	events: z.array(eventSchema).default([])
});

const EVENTS_CACHE_TAG = 'events-section';

type EventItemInput = z.infer<typeof eventSchema>;
type EventsSectionInput = z.infer<typeof eventsSectionSchema>;

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
	ctaLabel: event.ctaLabel ?? 'Register Now',
	ctaLink: event.ctaLink ?? '/'
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
	ctaLabel: event.ctaLabel,
	ctaLink: event.ctaLink
});

const normalizeEvents = (
	section: EventsSectionInput | null | undefined
): EventsSectionData => ({
	events: section?.events.map(toEvent) ?? []
});

async function getEventsSectionUncached(
	pageSlug: string
): Promise<EventsSectionData> {
	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) {
		return normalizeEvents({ events: [] });
	}

	const component = await prisma.component.findFirst({
		where: { pageId: page.id, key: 'EVENTS_SECTION' }
	});
	if (!component) {
		return normalizeEvents({ events: [] });
	}

	const parsed = eventsSectionSchema.safeParse(component.data);
	if (!parsed.success) {
		return normalizeEvents({ events: [] });
	}

	return normalizeEvents(parsed.data);
}

export const getEventsSection = unstable_cache(
	getEventsSectionUncached,
	['getEventsSection'],
	{ tags: [EVENTS_CACHE_TAG] }
);

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

	revalidateTag(EVENTS_CACHE_TAG);

	return { ok: true };
}


