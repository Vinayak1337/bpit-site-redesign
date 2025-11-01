'use server';
import 'server-only';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import { Prisma } from '@prisma/client';

const EMPTY_TESTIMONIALS: TestimonialsData = {
	title: '',
	subtitle: '',
	testimonials: []
};

const testimonialItemSchema = z.object({
	id: z.union([z.number(), z.string()]).optional(),
	name: z.string().min(1),
	batch: z.string().default(''),
	company: z.string().default(''),
	position: z.string().default(''),
	image: z.string().default(''),
	video: z.string().default(''),
	testimonial: z.string().min(1),
	rating: z.number().int().min(1).max(5).default(5),
	achievement: z.string().default(''),
	tags: z.array(z.string()).default([])
});

const testimonialsSchema = z.object({
	title: z.string().default(''),
	subtitle: z.string().default(''),
	testimonials: z.array(testimonialItemSchema).default([])
});

type TestimonialsInput = z.infer<typeof testimonialsSchema>;

const sanitizeTestimonial = (
	item: TestimonialsInput['testimonials'][number],
	index: number
): TestimonialItem | null => {
	const idValue = Number(item.id ?? index + 1);
	const id = Number.isFinite(idValue) ? idValue : index + 1;
	const name = item.name?.trim() ?? '';
	const testimonial = item.testimonial?.trim() ?? '';
	if (name.length === 0 || testimonial.length === 0) {
		return null;
	}
	const batch = item.batch?.trim() ?? '';
	const company = item.company?.trim() ?? '';
	const position = item.position?.trim() ?? '';
	const image = item.image?.trim() ?? '';
	const video = item.video?.trim() ?? '';
	const achievement = item.achievement?.trim() ?? '';
	const ratingValue = Number(item.rating ?? 5);
	const rating = Number.isFinite(ratingValue)
		? Math.min(5, Math.max(1, Math.round(ratingValue)))
		: 5;
	const tags = (item.tags ?? [])
		.map(tag => tag?.trim())
		.filter((tag): tag is string => Boolean(tag && tag.length > 0));
	return {
		id,
		name,
		batch,
		company,
		position,
		image,
		video,
		testimonial,
		rating,
		achievement,
		tags
	};
};

const sanitizeTestimonials = (
	data: TestimonialsInput | TestimonialsData
): TestimonialsData => {
	const title = data.title?.trim() ?? '';
	const subtitle = data.subtitle?.trim() ?? '';
	const testimonials = (data.testimonials ?? [])
		.map((testimonial, index) => sanitizeTestimonial(testimonial, index))
		.filter((item): item is TestimonialItem => item !== null);
	return { title, subtitle, testimonials };
};

const normalizeTestimonials = (
	input?: TestimonialsInput | null
): TestimonialsData =>
	sanitizeTestimonials({
		title: input?.title ?? '',
		subtitle: input?.subtitle ?? '',
		testimonials: input?.testimonials ?? []
	});

const testimonialsComponentKey = 'TESTIMONIALS';

const getNextOrder = async (pageId: string): Promise<number> => {
	const components = await prisma.component.findMany({
		where: { pageId },
		select: { order: true }
	});
	if (components.length === 0) {
		return 0;
	}
	return (
		components.reduce(
			(max, component) => (component.order > max ? component.order : max),
			components[0].order
		) + 1
	);
};

const getOrCreateComponent = async (
	pageId: string,
	key: string,
	fallbackData: object
) => {
	let component = await prisma.component.findFirst({
		where: { pageId, key }
	});
	if (!component) {
		let attempt = 0;
		while (!component && attempt < 3) {
			const order = await getNextOrder(pageId);
			try {
				component = await prisma.component.create({
					data: { pageId, key, order, data: fallbackData }
				});
			} catch (error) {
				if (
					error instanceof Prisma.PrismaClientKnownRequestError &&
					error.code === 'P2002'
				) {
					attempt += 1;
					continue;
				}
				throw error;
			}
		}
		if (!component) {
			component = await prisma.component.findFirst({
				where: { pageId, key }
			});
		}
	}
	if (!component) {
		throw new Error(
			`Unable to initialize component with key ${key} for page ${pageId}`
		);
	}
	return component;
};

export async function getTestimonials(
	pageSlug: string
): Promise<TestimonialsData> {
	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) {
		return sanitizeTestimonials(EMPTY_TESTIMONIALS);
	}

	const defaultData = sanitizeTestimonials(EMPTY_TESTIMONIALS);
	const component = await getOrCreateComponent(
		page.id,
		testimonialsComponentKey,
		defaultData
	);

	const parsed = testimonialsSchema.safeParse(component.data);
	if (!parsed.success) {
		return defaultData;
	}

	return normalizeTestimonials(parsed.data);
}

export async function updateTestimonials(
	pageSlug: string,
	data: TestimonialsData
): Promise<{ ok: true } | { ok: false; error: string }> {
	const admin = await requireAdmin();
	const sanitized = sanitizeTestimonials(data);
	const parsed = testimonialsSchema.safeParse(sanitized);
	if (!parsed.success) {
		return { ok: false, error: 'invalid_payload' };
	}

	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) {
		return { ok: false, error: 'page_not_found' };
	}

	const component = await getOrCreateComponent(
		page.id,
		testimonialsComponentKey,
		parsed.data
	);

	const previousData = component.data;
	const payload = parsed.data;

	await prisma.component.update({
		where: { id: component.id },
		data: { data: payload }
	});

	await createAuditLog({
		actorId: admin.id,
		action: 'UPDATE',
		resourceType: 'COMPONENT',
		summary: `Updated testimonials for page ${pageSlug}`,
		changes: [
			{
				resourceId: component.id,
				resourceType: 'COMPONENT',
				field: 'data',
				previousData:
					previousData === null
						? undefined
						: (previousData as unknown as Prisma.InputJsonValue),
				newData: payload as unknown as Prisma.InputJsonValue
			}
		]
	});

	return { ok: true };
}


