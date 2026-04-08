import { z } from 'zod';

export const disclosureItemSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1, 'Title is required'),
	url: z.string().min(1, 'URL is required'),
	category: z.string().optional()
});

export const disclosureHeroSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required')
});

export const disclosureDataSchema = z.object({
	hero: disclosureHeroSchema,
	items: z.array(disclosureItemSchema)
});

export type DisclosureItem = z.infer<typeof disclosureItemSchema>;
export type DisclosureHero = z.infer<typeof disclosureHeroSchema>;
export type DisclosureData = z.infer<typeof disclosureDataSchema>;
