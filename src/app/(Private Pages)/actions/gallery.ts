'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { galleryDataSchema, GalleryData } from '@/lib/schemas/gallery';

const VIDEO_URL_PATTERN = /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i;
const VALID_SIZES = new Set(['small', 'medium', 'large', 'tall', 'wide']);

const inferMediaType = (src: string): 'image' | 'video' => {
	return VIDEO_URL_PATTERN.test(src) ? 'video' : 'image';
};

const sanitizeText = (value: unknown): string | undefined => {
	if (typeof value !== 'string') return undefined;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : undefined;
};

function normalizeGalleryData(data: unknown): GalleryData {
	if (!data || typeof data !== 'object') {
		throw new Error('GALLERY data missing or invalid — run `npm run seed gallery`');
	}

	const rawData = data as { categories?: unknown; items?: unknown };
	const rawItems = Array.isArray(rawData.items) ? rawData.items : [];

	const normalizedItems: GalleryData['items'] = rawItems
		.map((item, index): GalleryData['items'][number] | null => {
			if (!item || typeof item !== 'object') return null;
			const rawItem = item as Record<string, unknown>;

			const src = sanitizeText(rawItem.src);
			const title = sanitizeText(rawItem.title);
			const category = sanitizeText(rawItem.category);
			if (!src || !title || !category) return null;

			const explicitMediaType =
				rawItem.mediaType === 'image' || rawItem.mediaType === 'video'
					? rawItem.mediaType
					: undefined;

			const size = sanitizeText(rawItem.size);
			const normalizedSize =
				size && VALID_SIZES.has(size)
					? (size as GalleryData['items'][number]['size'])
					: undefined;

			return {
				id: sanitizeText(rawItem.id) ?? `gallery-item-${index + 1}`,
				src,
				mediaType: explicitMediaType ?? inferMediaType(src),
				thumbnail: sanitizeText(rawItem.thumbnail),
				category,
				title,
				date: sanitizeText(rawItem.date),
				description: sanitizeText(rawItem.description),
				size: normalizedSize
			};
		})
		.filter((item): item is GalleryData['items'][number] => item !== null);

	const providedCategories = Array.isArray(rawData.categories)
		? rawData.categories
				.map(value => sanitizeText(value))
				.filter((value): value is string => Boolean(value))
		: [];

	const categoriesFromItems = Array.from(
		new Set(normalizedItems.map(item => item.category))
	);
	const mergedCategories = Array.from(
		new Set([
			'All',
			...providedCategories.filter(category => category !== 'All'),
			...categoriesFromItems.filter(category => category !== 'All')
		])
	);

	const parsed = galleryDataSchema.safeParse({
		categories: mergedCategories,
		items: normalizedItems
	});

	if (!parsed.success) {
		throw new Error('GALLERY data invalid after normalization — check seeded shape');
	}
	return parsed.data;
}

// --- Actions ---

export async function getGallery(slug = 'gallery-page'): Promise<GalleryData> {
	const page = await prisma.page.findUnique({
		where: { slug },
		include: { components: true }
	});

	if (!page) {
		throw new Error('GALLERY not seeded — run `npm run seed gallery`');
	}

	const component = page.components.find(c => c.key === 'GALLERY_DATA');
	if (!component) {
		throw new Error('GALLERY component missing — run `npm run seed gallery`');
	}

	return normalizeGalleryData(component.data);
}

export async function updateGallery(data: GalleryData, slug = 'gallery-page') {
	try {
		const validatedData = normalizeGalleryData(data);

		let page = await prisma.page.findUnique({ where: { slug } });
		if (!page) {
			page = await prisma.page.create({
				data: { slug, title: 'Gallery', kind: 'PAGE', status: 'PUBLISHED' }
			});
		}

		await prisma.component.upsert({
			where: { pageId_order: { pageId: page.id, order: 1 } },
			update: { data: validatedData as any, key: 'GALLERY_DATA' },
			create: { pageId: page.id, data: validatedData as any, order: 1, key: 'GALLERY_DATA' }
		});

		revalidatePath('/gallery');
		revalidatePath('/admin/gallery');
	} catch (error) {
		console.error('Error updating gallery data:', error);
		throw error;
	}
}

