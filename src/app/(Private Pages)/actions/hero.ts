'use server';
import 'server-only';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { createAuditLog } from '@/lib/audit';
import type { Prisma } from '@prisma/client';

const heroCtaSchema = z.object({
	label: z.string().optional(),
	href: z.string().optional(),
	isEnquiry: z.boolean().optional()
});

const heroSlideSchema = z.object({
	title: z.string(),
	subtitle: z.string(),
	description: z.string(),
	image: z.string(),
	icon: z.string().optional().default('BookOpen'),
	stats: z.string(),
	cta: heroCtaSchema.optional(),
	secondary_cta: heroCtaSchema.optional()
});

const heroComponentSchema = z.object({
	slides: z.array(heroSlideSchema)
});
const defaultHeroSlides: HeroSlide[] = [
	{
		title: 'Welcome to BPIT',
		subtitle: "Shaping Tomorrow's Innovators",
		description:
			'A Unit of Bhartiya Brahmin Charitable Trust (Regd.).\n(Approved by AICTE, Ministry of Education (MoE))\nAffiliated to Guru Gobind Singh Indraprastha University, Delhi',
		image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
		icon: 'Award',
		stats: 'NBA Accredited Institution',
		cta: { label: 'Apply Now', isEnquiry: true },
		secondary_cta: { label: 'Explore Programs', href: '/admissions' }
	},
	{
		title: 'Engineering Excellence',
		subtitle: 'NBA Accredited Programs',
		description:
			"Discover our world-class engineering programs in Computer Science, Information Technology, Electronics, and Electrical Engineering designed to shape tomorrow's innovators.",
		image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
		icon: 'BookOpen',
		stats: '1000+ Students',
		cta: { label: 'View Programs', href: '/departments' }
	},
	{
		title: 'Campus Life',
		subtitle: 'Beyond Academics',
		description:
			'Experience vibrant campus life with hostels, sports complexes, and dozens of clubs and societies that nurture holistic development.',
		image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80',
		icon: 'Users',
		stats: '50+ Clubs',
		cta: { label: 'Student Life', href: '/student-life' }
	},
	{
		title: 'Placement Success',
		subtitle: 'Industry Ready',
		description:
			'Join our alumni network working at top companies like Amazon, Microsoft, and Google with dedicated placement support.',
		image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80',
		icon: 'Trophy',
		stats: '100% Placement Assistance',
		cta: { label: 'View Placements', href: '/placements/overview' }
	},
	{
		title: 'Modern Infrastructure',
		subtitle: 'Learning Environment',
		description:
			'Study in smart classrooms, well-equipped labs, digital libraries, and modern campus facilities designed for excellence.',
		image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
		icon: 'Building',
		stats: 'State-of-the-art Facilities',
		cta: { label: 'About BPIT', href: '/about' }
	}
];


const legacyHeroSchema = z.object({
	mainTitle: z.string().optional(),
	subTitle: z.string().optional(),
	institutionName: z.string().optional(),
	unitInfo: z.string().optional(),
	approvalInfo: z.string().optional(),
	affiliationInfo: z.string().optional(),
	nbaAccredited: z.boolean().optional(),
	highlights: z.array(z.string()).optional(),
	buttons: z
		.array(
			z.object({
				text: z.string(),
				action: z.string().optional(),
				type: z.string().optional()
			})
		)
		.optional()
});

export type HeroSlide = z.infer<typeof heroSlideSchema>;

export async function getHeroSlides(pageSlug: string): Promise<HeroSlide[]> {
	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) return [];
	const comp = await prisma.component.findFirst({
		where: { pageId: page.id, key: 'HERO' }
	});
	if (!comp) return [];
	const parsed = heroComponentSchema.safeParse(comp.data);
	if (parsed.success) return parsed.data.slides;

	const legacy = legacyHeroSchema.safeParse(comp.data);
	if (legacy.success) {
		const slide: HeroSlide = {
			title: legacy.data.mainTitle ?? legacy.data.institutionName ?? '',
			subtitle: legacy.data.subTitle ?? '',
			description: [
				legacy.data.institutionName,
				legacy.data.unitInfo,
				legacy.data.approvalInfo,
				legacy.data.affiliationInfo,
				...(legacy.data.highlights ?? [])
			]
				.filter(Boolean)
				.join('\n'),
			image: '',
			icon: 'Award',
			stats: legacy.data.nbaAccredited ? 'NBA Accredited' : 'Featured',
			cta: undefined,
			secondary_cta: undefined
		};
		if (legacy.data.buttons && legacy.data.buttons.length > 0) {
			const [primary, secondary] = legacy.data.buttons;
			if (primary) {
				slide.cta = primary.action === 'openEnquiry'
					? { label: primary.text, isEnquiry: true }
					: { label: primary.text, href: primary.action ?? undefined };
			}
			if (secondary) {
				slide.secondary_cta = secondary.action === 'openEnquiry'
					? { label: secondary.text, isEnquiry: true }
					: { label: secondary.text, href: secondary.action ?? undefined };
			}
		}
		return [slide];
	}

	return defaultHeroSlides;
}

export async function updateHeroSlides(
	pageSlug: string,
	slides: HeroSlide[]
): Promise<{ ok: true } | { ok: false; error: string }> {
	const admin = await requireAdmin();
	const parsed = z.array(heroSlideSchema).safeParse(slides);
	if (!parsed.success) return { ok: false, error: 'invalid_payload' };

	const page = await prisma.page.findUnique({ where: { slug: pageSlug } });
	if (!page) return { ok: false, error: 'page_not_found' };
	const comp = await prisma.component.findFirst({
		where: { pageId: page.id, key: 'HERO' }
	});
	if (!comp) return { ok: false, error: 'component_not_found' };

	const previousData = comp.data;
	await prisma.component.update({
		where: { id: comp.id },
		data: { data: { slides: parsed.data } }
	});

	await createAuditLog({
		actorId: admin.id,
		action: 'UPDATE',
		resourceType: 'COMPONENT',
		summary: `Updated hero slides for page ${pageSlug}`,
		changes: [
			{
				resourceId: comp.id,
				resourceType: 'COMPONENT',
				field: 'data.slides',
				previousData:
					previousData === null
						? undefined
						: (previousData as unknown as Prisma.InputJsonValue),
				newData: { slides: parsed.data } as unknown as Prisma.InputJsonValue
			}
		]
	});

	return { ok: true };
}


