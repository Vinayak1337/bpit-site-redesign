import { prisma } from '@/lib/prisma';
import { heroCarouselSchema, type HeroCarousel } from '@/lib/schemas/home';

export async function getHeroCarousel(): Promise<HeroCarousel | null> {
	const homepage = await prisma.homepage.findUnique({ where: { id: 'homepage' } });
	if (!homepage) return null;
	return heroCarouselSchema.parse(homepage.hero as unknown);
}

export async function upsertHeroCarousel(payload: unknown): Promise<void> {
	const parsed = heroCarouselSchema.parse(payload);
	await prisma.homepage.upsert({
		where: { id: 'homepage' },
		update: { hero: parsed },
		create: { id: 'homepage', hero: parsed }
	});
}


