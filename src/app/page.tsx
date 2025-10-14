import Hero2 from '@/components/hero/hero2';
import PlacementCompanies from '@/components/placement/placement-companies';

import Testimonial from '@/components/carousel/testimonial';
import EventsSection from '@/components/carousel/events-section';
import NoticesSection from '@/components/carousel/notices-section';
import TopPlacedStudents from '@/components/placement/top-placed-students';

import {
	homeHero2Data,
	homeNoticesData,
	homeEventsData,
	homePlacementData,
	homeTopPlacedStudentsData,
	homeTestimonialsData
} from '@/data/home';
import { getHeroCarousel } from '@/lib/homepage';
import type { HeroCarousel } from '@/lib/schemas/home';

function normalizeHeroCarousel(input: any): HeroCarousel {
	const slides = (input?.slides ?? []).map((s: any) => ({
		title: String(s?.title ?? ''),
		subtitle: String(s?.subtitle ?? ''),
		description: typeof s?.description === 'string' ? s.description : '',
		image: String(s?.image ?? ''),
		icon: typeof s?.icon === 'string' ? s.icon : '',
		stats: String(s?.stats ?? ''),
		cta: s?.cta
			? {
				label: String(s.cta.label ?? ''),
				href: s.cta.href ? String(s.cta.href) : undefined,
				isEnquiry: Boolean(s.cta.isEnquiry)
			}
			: undefined,
		secondary_cta: s?.secondary_cta
			? {
				label: String(s.secondary_cta.label ?? ''),
				href: s.secondary_cta.href ? String(s.secondary_cta.href) : undefined,
				isEnquiry: Boolean(s.secondary_cta.isEnquiry)
			}
			: undefined
	}));
	return { slides } as HeroCarousel;
}

export default async function Home()
{
	const hasDb = !!process.env.DATABASE_URL;
	const dbHero = hasDb ? await getHeroCarousel() : null;
	const heroData: HeroCarousel = dbHero ?? normalizeHeroCarousel(homeHero2Data);
	return (
		<>
			<Hero2 data={heroData} />

			<NoticesSection data={homeNoticesData} />

			<EventsSection data={homeEventsData} />

			<PlacementCompanies data={homePlacementData} />

			<TopPlacedStudents data={homeTopPlacedStudentsData} />

			<Testimonial data={homeTestimonialsData} />
		</>
	);
}
