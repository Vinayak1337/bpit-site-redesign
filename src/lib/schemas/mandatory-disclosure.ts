import { z } from 'zod';

export const disclosureItemSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1, 'Title is required'),
	url: z.string().min(1, 'URL is required'),
	category: z.string().optional()
});

export const disclosureDataSchema = z.object({
	items: z.array(disclosureItemSchema)
});

export type DisclosureItem = z.infer<typeof disclosureItemSchema>;
export type DisclosureData = z.infer<typeof disclosureDataSchema>;


