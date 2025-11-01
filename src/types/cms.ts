import { z } from 'zod';

// Shared primitives

export type PageStatus = 'draft' | 'published';
export type PageKind = 'page' | 'global';

export type IconName =
	| 'Award'
	| 'BookOpen'
	| 'Users'
	| 'Trophy'
	| 'Lightbulb'
	| 'GraduationCap'
	| 'Target'
	| 'UserCheck'
	| 'Eye'
	| 'Shield'
	| 'Briefcase'
	| 'Mail'
	| 'Calendar'
	| 'Globe'
	| 'Heart'
	| 'Compass'
	| 'Rocket'
	| 'TrendingUp'
	| 'FileText'
	| 'AlertTriangle'
	| 'Lock'
	| 'Star'
	| 'Building'
	| 'Building2'
	| 'UserX'
	| 'Scale'
	| 'Music'
	| 'Phone'
	| 'Map';

export type ImageAsset = {
	url: string;
	alt: string;
	width?: number;
	height?: number;
	publicId?: string;
};

export type Link = {
	label: string;
	href: string;
	newTab?: boolean;
};

export type CTA =
	| ({ kind: 'link' } & Link)
	| { kind: 'action'; action: string; label: string };

export type SEO = {
	title?: string;
	description?: string;
	keywords?: string[];
	image?: ImageAsset;
};

// Blocks

export type HeroBlock = {
	type: 'hero';
	title: string;
	subtitle?: string;
	description?: string;
	badgeText?: string;
	gradient?: string;
	tags?: { text: string; icon?: IconName }[];
	ctas?: CTA[];
};

export type CarouselSlide = {
	title: string;
	subtitle?: string;
	description?: string;
	image?: string;
	icon?: IconName;
	stats?: string;
	cta?: CTA;
	secondaryCta?: CTA;
};

export type CarouselBlock = {
	type: 'carousel';
	slides: CarouselSlide[];
};

export type StatsBlock = {
	type: 'stats';
	title?: string;
	items: { value: string; label: string; icon?: IconName; color?: string }[];
};

export type FeaturesBlock = {
	type: 'features';
	title?: string;
	subtitle?: string;
	items: { title: string; description: string; icon?: IconName; color?: string }[];
};

export type ParagraphsBlock = {
	type: 'paragraphs';
	title?: string;
	paragraphs: string[];
};

export type CardsGridBlock = {
	type: 'cardsGrid';
	title?: string;
	cards: {
		title: string;
		bgColor?: string;
		textColor?: string;
		listColor?: string;
		items: string[];
	}[];
};

export type StepsBlock = {
	type: 'steps';
	title?: string;
	steps: { id?: string; title: string; description: string; icon?: IconName; iconColor?: string; iconTextColor?: string }[];
};

export type LogosGridBlock = {
	type: 'logosGrid';
	title?: string;
	subtitle?: string;
	logos: { name: string; logo: string }[];
};

export type TestimonialsBlock = {
	type: 'testimonials';
	title?: string;
	subtitle?: string;
	testimonials: {
		id?: number | string;
		name: string;
		batch?: string;
		company?: string;
		position?: string;
		image?: string;
		video?: string;
		testimonial: string;
		rating?: number;
		achievement?: string;
		tags?: string[];
	}[];
};

export type NoticesBlock = {
	type: 'notices';
	notices: {
		id: number | string;
		category: 'Academic' | 'Admission' | 'Financial Aid' | string;
		title: string;
		subtitle?: string;
		date: string;
		time?: string;
		image?: string;
		priority?: 'low' | 'medium' | 'high';
		tags?: string[];
		description?: string;
		pinned?: boolean;
		urgent?: boolean;
	}[];
	announcements?: NoticesBlock['notices'];
};

export type EventsBlock = {
	type: 'events';
	events: {
		id: number | string;
		title: string;
		subtitle?: string;
		description?: string;
		image?: string;
		date: string;
		time?: string;
		location?: string;
		category?: string;
		attendees?: number;
		featured?: boolean;
		status?: string;
		tags?: string[];
		organizer?: string;
		registrationOpen?: boolean;
		price?: string;
		highlights?: string[];
		rating?: number;
		totalRatings?: number;
	}[];
};

export type CTASectionBlock = {
	type: 'ctaSection';
	title: string;
	subtitle?: string;
	ctas: CTA[];
};

export type SidebarNavBlock = {
	type: 'sidebarNav';
	navItems: { id: string; title: string; icon?: IconName; href: string }[];
	theme?: {
		primary?: string;
		activeGradient?: string;
		activeBorder?: string;
		activeText?: string;
		activeIcon?: string;
		activeChevron?: string;
	};
};

export type RichTextBlock = {
	type: 'richText';
	content: string; // markdown or HTML
};

export type MediaBlock = {
	type: 'media';
	image?: ImageAsset;
	videoUrl?: string;
	caption?: string;
};

export type ComponentBlock =
	| HeroBlock
	| CarouselBlock
	| StatsBlock
	| FeaturesBlock
	| ParagraphsBlock
	| CardsGridBlock
	| StepsBlock
	| LogosGridBlock
	| TestimonialsBlock
	| NoticesBlock
	| EventsBlock
	| CTASectionBlock
	| SidebarNavBlock
	| RichTextBlock
	| MediaBlock;

export type PageDTO = {
	_id?: string;
	slug: string;
	title: string;
	kind: PageKind;
	status: PageStatus;
	seo?: SEO;
	sections: ComponentBlock[];
	createdAt?: string;
	updatedAt?: string;
};

// Zod validators (runtime safety)

export const iconNameZ = z.enum([
	'Award',
	'BookOpen',
	'Users',
	'Trophy',
	'Lightbulb',
	'GraduationCap',
	'Target',
	'UserCheck',
	'Eye',
	'Shield',
	'Briefcase',
	'Mail',
	'Calendar',
	'Globe',
	'Heart',
	'Compass',
	'Rocket',
	'TrendingUp',
	'FileText',
	'AlertTriangle',
	'Lock',
	'Star',
	'Building',
	'Building2',
	'UserX',
	'Scale',
	'Music',
	'Phone',
	'Map'
]);

export const imageAssetZ = z.object({
	url: z.string().min(1),
	alt: z.string().min(1),
	width: z.number().int().positive().optional(),
	height: z.number().int().positive().optional(),
	publicId: z.string().optional()
});

export const linkZ = z.object({
	label: z.string().min(1),
	href: z.string().min(1),
	newTab: z.boolean().optional()
});

export const ctaZ = z.discriminatedUnion('kind', [
	linkZ.extend({ kind: z.literal('link') }),
	z.object({ kind: z.literal('action'), action: z.string().min(1), label: z.string().min(1) })
]);

export const seoZ = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	keywords: z.array(z.string()).optional(),
	image: imageAssetZ.optional()
});

export const heroBlockZ = z.object({
	type: z.literal('hero'),
	title: z.string().min(1),
	subtitle: z.string().optional(),
	description: z.string().optional(),
	badgeText: z.string().optional(),
	gradient: z.string().optional(),
	tags: z.array(z.object({ text: z.string(), icon: iconNameZ.optional() })).optional(),
	ctas: z.array(ctaZ).optional()
});

export const carouselSlideZ = z.object({
	title: z.string(),
	subtitle: z.string().optional(),
	description: z.string().optional(),
	image: z.string().optional(),
	icon: iconNameZ.optional(),
	stats: z.string().optional(),
	cta: ctaZ.optional(),
	secondaryCta: ctaZ.optional()
});

export const carouselBlockZ = z.object({
	type: z.literal('carousel'),
	slides: z.array(carouselSlideZ).min(1)
});

export const statsBlockZ = z.object({
	type: z.literal('stats'),
	title: z.string().optional(),
	items: z.array(z.object({ value: z.string(), label: z.string(), icon: iconNameZ.optional(), color: z.string().optional() })).min(1)
});

export const featuresBlockZ = z.object({
	type: z.literal('features'),
	title: z.string().optional(),
	subtitle: z.string().optional(),
	items: z.array(z.object({ title: z.string(), description: z.string(), icon: iconNameZ.optional(), color: z.string().optional() })).min(1)
});

export const paragraphsBlockZ = z.object({
	type: z.literal('paragraphs'),
	title: z.string().optional(),
	paragraphs: z.array(z.string()).min(1)
});

export const cardsGridBlockZ = z.object({
	type: z.literal('cardsGrid'),
	title: z.string().optional(),
	cards: z.array(
		z.object({
			title: z.string(),
			bgColor: z.string().optional(),
			textColor: z.string().optional(),
			listColor: z.string().optional(),
			items: z.array(z.string()).min(1)
		})
	).min(1)
});

export const stepsBlockZ = z.object({
	type: z.literal('steps'),
	title: z.string().optional(),
	steps: z.array(z.object({ id: z.string().optional(), title: z.string(), description: z.string(), icon: iconNameZ.optional(), iconColor: z.string().optional(), iconTextColor: z.string().optional() })).min(1)
});

export const logosGridBlockZ = z.object({
	type: z.literal('logosGrid'),
	title: z.string().optional(),
	subtitle: z.string().optional(),
	logos: z.array(z.object({ name: z.string(), logo: z.string() })).min(1)
});

export const testimonialsBlockZ = z.object({
	type: z.literal('testimonials'),
	title: z.string().optional(),
	subtitle: z.string().optional(),
	testimonials: z.array(
		z.object({
			id: z.union([z.number(), z.string()]).optional(),
			name: z.string(),
			batch: z.string().optional(),
			company: z.string().optional(),
			position: z.string().optional(),
			image: z.string().optional(),
			video: z.string().optional(),
			testimonial: z.string(),
			rating: z.number().optional(),
			achievement: z.string().optional(),
			tags: z.array(z.string()).optional()
		})
	).min(1)
});

export const noticesItemZ = z.object({
	id: z.union([z.number(), z.string()]),
	category: z.string(),
	title: z.string(),
	subtitle: z.string().optional(),
	date: z.string(),
	time: z.string().optional(),
	image: z.string().optional(),
	priority: z.enum(['low', 'medium', 'high']).optional(),
	tags: z.array(z.string()).optional(),
	description: z.string().optional(),
	pinned: z.boolean().optional(),
	urgent: z.boolean().optional()
});

export const noticesBlockZ = z.object({
	type: z.literal('notices'),
	notices: z.array(noticesItemZ).min(1),
	announcements: z.array(noticesItemZ).optional()
});

export const eventsItemZ = z.object({
	id: z.union([z.number(), z.string()]),
	title: z.string(),
	subtitle: z.string().optional(),
	description: z.string().optional(),
	image: z.string().optional(),
	date: z.string(),
	time: z.string().optional(),
	location: z.string().optional(),
	category: z.string().optional(),
	attendees: z.number().optional(),
	featured: z.boolean().optional(),
	status: z.string().optional(),
	tags: z.array(z.string()).optional(),
	organizer: z.string().optional(),
	registrationOpen: z.boolean().optional(),
	price: z.string().optional(),
	highlights: z.array(z.string()).optional(),
	rating: z.number().optional(),
	totalRatings: z.number().optional()
});

export const eventsBlockZ = z.object({
	type: z.literal('events'),
	events: z.array(eventsItemZ).min(1)
});

export const ctaSectionBlockZ = z.object({
	type: z.literal('ctaSection'),
	title: z.string(),
	subtitle: z.string().optional(),
	ctas: z.array(ctaZ).min(1)
});

export const sidebarNavBlockZ = z.object({
	type: z.literal('sidebarNav'),
	navItems: z.array(z.object({ id: z.string(), title: z.string(), icon: iconNameZ.optional(), href: z.string() })).min(1),
	theme: z
		.object({
			primary: z.string().optional(),
			activeGradient: z.string().optional(),
			activeBorder: z.string().optional(),
			activeText: z.string().optional(),
			activeIcon: z.string().optional(),
			activeChevron: z.string().optional()
		})
		.optional()
});

export const richTextBlockZ = z.object({
	type: z.literal('richText'),
	content: z.string().min(1)
});

export const mediaBlockZ = z.object({
	type: z.literal('media'),
	image: imageAssetZ.optional(),
	videoUrl: z.string().optional(),
	caption: z.string().optional()
});

export const componentBlockZ = z.discriminatedUnion('type', [
	heroBlockZ,
	carouselBlockZ,
	statsBlockZ,
	featuresBlockZ,
	paragraphsBlockZ,
	cardsGridBlockZ,
	stepsBlockZ,
	logosGridBlockZ,
	testimonialsBlockZ,
	noticesBlockZ,
	eventsBlockZ,
	ctaSectionBlockZ,
	sidebarNavBlockZ,
	richTextBlockZ,
	mediaBlockZ
]);

export const pageZ = z.object({
	slug: z.string().min(1),
	title: z.string().min(1),
	kind: z.enum(['page', 'global']),
	status: z.enum(['draft', 'published']),
	seo: seoZ.optional(),
	sections: z.array(componentBlockZ)
});

export type ComponentBlockZod = z.infer<typeof componentBlockZ>;
export type PageZod = z.infer<typeof pageZ>;


