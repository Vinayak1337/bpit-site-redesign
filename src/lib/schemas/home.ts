import { z } from 'zod';

export const heroSlideSchema = z.object({
	_title: z.string().optional(), // internal label (not rendered)
	title: z.string().min(1),
	subtitle: z.string().optional().default(''),
	description: z.string().optional().default(''),
	image: z.string().url(),
	icon: z.string().optional().default(''),
	stats: z.string().optional().default(''),
	cta: z
		.object({
			label: z.string().min(1),
			href: z.string().url().optional(),
			isEnquiry: z.boolean().optional()
		})
		.optional(),
	secondary_cta: z
		.object({
			label: z.string().min(1),
			href: z.string().url().optional(),
			isEnquiry: z.boolean().optional()
		})
		.optional()
});

export const heroCarouselSchema = z.object({
	slides: z.array(heroSlideSchema).min(1)
});

export type HeroSlide = z.infer<typeof heroSlideSchema>;
export type HeroCarousel = z.infer<typeof heroCarouselSchema>;




