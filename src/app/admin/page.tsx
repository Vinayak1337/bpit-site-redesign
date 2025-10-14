import { getHeroCarousel } from '@/lib/homepage';
import { Editable } from '@/components/admin/Editable';
import { HeroCarouselForm } from '@/components/admin/HeroCarouselForm';
import { updateHeroCarousel } from '@/app/actions/home';
import Hero2 from '@/components/hero/hero2';
import type { HeroCarousel } from '@/lib/schemas/home';
import { homeHero2Data } from '@/data/home';

export const dynamic = 'force-dynamic';

function normalizeHeroCarousel(input: any): HeroCarousel {
	const slides = (input?.slides ?? []).map((s: any) => ({
		title: String(s?.title ?? ''),
		subtitle: String(s?.subtitle ?? ''),
		description: typeof s?.description === 'string' ? s.description : '',
		image: String(s?.image ?? ''),
		icon: typeof s?.icon === 'string' ? s.icon : '',
		stats: String(s?.stats ?? ''),
		cta: s?.cta
			? { label: String(s.cta.label ?? ''), href: s.cta.href ? String(s.cta.href) : undefined, isEnquiry: Boolean(s.cta.isEnquiry) }
			: undefined,
		secondary_cta: s?.secondary_cta
			? { label: String(s.secondary_cta.label ?? ''), href: s.secondary_cta.href ? String(s.secondary_cta.href) : undefined, isEnquiry: Boolean(s.secondary_cta.isEnquiry) }
			: undefined
	}));
	return { slides } as HeroCarousel;
}

export default async function AdminHomePage() {
	const hasDb = !!process.env.DATABASE_URL;
	const dbHero = hasDb ? await getHeroCarousel() : null;
	const heroData: HeroCarousel = dbHero ?? normalizeHeroCarousel(homeHero2Data);
	return (
		<div className='space-y-8'>
			<div>
				<h2 className='text-xl font-semibold mb-2'>Homepage → Hero Carousel</h2>
				<p className='text-sm text-gray-600 mb-3'>Click to edit. Edits are saved to DB and push a live re-render.</p>
				<Editable<HeroCarousel> label="Hero Carousel" value={heroData} Form={HeroCarouselForm} onSubmit={updateHeroCarousel}>
					<Hero2 data={heroData} />
				</Editable>
			</div>
		</div>
	);
}


