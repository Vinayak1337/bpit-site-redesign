'use server';
import 'server-only';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { galleryDataSchema, GalleryData } from '@/lib/schemas/gallery';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';

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
	const fallback = getDefaultGalleryData();
	if (!data || typeof data !== 'object') {
		return fallback;
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

	if (parsed.success) {
		return parsed.data;
	}

	return fallback;
}

// --- Actions ---

export async function getGallery(slug = 'gallery-page'): Promise<GalleryData> {
	try {
		const page = await prisma.page.findUnique({
			where: { slug },
			include: { components: true }
		});

		if (!page) return getDefaultGalleryData();

		const component = page.components.find(c => c.key === 'GALLERY_DATA');
		if (!component) return getDefaultGalleryData();

		return normalizeGalleryData(component.data);
	} catch (error) {
		console.error('Error fetching gallery data:', error);
		return getDefaultGalleryData();
	}
}

export async function updateGallery(data: GalleryData, slug = 'gallery-page') {
	try {
		await requireAdmin();
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

// --- Default Data ---

function getDefaultGalleryData(): GalleryData {
	return {
		categories: [
			'All',
			'Malhaar',
			'Diwali Vibe',
			'Campus Life',
			'Infrastructure',
			'Drishti',
			'Video Highlights'
		],
		items: [
			{
				id: 'malhaar-1',
				src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop',
				mediaType: 'image',
				category: 'Malhaar',
				title: 'Malhaar Main Stage',
				date: '24 Nov 2022',
				description: 'Electrifying performances at the main stage of BPIT Annual Malhaar.',
				size: 'large'
			},
			{
				id: 'malhaar-2',
				src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
				mediaType: 'image',
				category: 'Malhaar',
				title: 'Crowd Energy',
				date: '25 Nov 2022',
				description: 'Students cheering for their favorite bands.',
				size: 'medium'
			},
			{
				id: 'malhaar-3',
				src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
				mediaType: 'image',
				category: 'Malhaar',
				title: 'DJ Night',
				date: '25 Nov 2022',
				description: 'Ending the fest on a high note with DJ beats.',
				size: 'tall'
			},
			{
				id: 'vibe-1',
				src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
				mediaType: 'image',
				category: 'Diwali Vibe',
				title: 'Dandiya Night',
				date: '18 Oct 2022',
				description: 'Traditional beats and colorful attires at VIBE.',
				size: 'wide'
			},
			{
				id: 'vibe-2',
				src: 'https://images.unsplash.com/photo-1506422748879-887454f9cdff?q=80&w=1000&auto=format&fit=crop',
				mediaType: 'image',
				category: 'Diwali Vibe',
				title: 'Festival of Lights',
				date: '18 Oct 2022',
				description: 'Campus lit up for the Diwali celebration.',
				size: 'small'
			},
			{
				id: 'campus-1',
				src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
				mediaType: 'image',
				category: 'Campus Life',
				title: 'Student Interactions',
				description: 'Collaborative learning in the campus gardens.',
				size: 'medium'
			},
			{
				id: 'infra-1',
				src: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop',
				mediaType: 'image',
				category: 'Infrastructure',
				title: 'Academic Block',
				description: 'Modern architecture fostering an environment of learning.',
				size: 'tall'
			},
			{
				id: 'infra-2',
				src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
				mediaType: 'image',
				category: 'Infrastructure',
				title: 'Computer Labs',
				description: 'High-tech labs for practical exposure.',
				size: 'medium'
			},
			{
				id: 'drishti-1',
				src: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				mediaType: 'image',
				category: 'Drishti',
				title: 'Technical Projects',
				description: 'Students showcasing innovative projects at Drishti.',
				size: 'wide'
			},
			{
				id: 'drishti-2',
				src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
				mediaType: 'image',
				category: 'Drishti',
				title: 'Hackathons',
				description: 'Coding marathons and problem-solving sessions.',
				size: 'small'
			},
			{
				id: 'video-1',
				src: 'https://res.cloudinary.com/demo/video/upload/dog.mp4',
				mediaType: 'video',
				thumbnail: 'https://res.cloudinary.com/demo/image/upload/dog.jpg',
				category: 'Video Highlights',
				title: 'Campus Event Highlights',
				date: '2025',
				description: 'Short video reel from cultural and technical activities.',
				size: 'wide'
			}
		]
	};
}
