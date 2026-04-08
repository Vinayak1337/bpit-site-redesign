import { z } from 'zod';

export const galleryItemSchema = z.object({
	id: z.string().min(1),
	src: z.string().min(1),
	mediaType: z.enum(['image', 'video']).optional().default('image'),
	thumbnail: z.string().optional(),
	category: z.string().min(1),
	title: z.string().min(1),
	date: z.string().optional(),
	description: z.string().optional(),
	size: z.enum(['small', 'medium', 'large', 'tall', 'wide']).optional()
});

export const galleryDataSchema = z.object({
	categories: z.array(z.string().min(1)),
	items: z.array(galleryItemSchema)
});

export type GalleryItem = z.infer<typeof galleryItemSchema>;
export type GalleryData = z.infer<typeof galleryDataSchema>;
export type GalleryMediaType = z.infer<typeof galleryItemSchema>['mediaType'];
