import type { ComponentProps } from 'react';
import Hero2 from '@/components/hero/hero2';
import PlacementCompanies from '@/components/placement/placement-companies';

import Testimonial from '@/components/carousel/testimonial';
import TopPlacedStudents from '@/components/placement/top-placed-students';
import NoticesEventsComparison from '@/components/home/notices-events-comparison';

import { homeHero2Data } from '@/data/home';
import {
	getHeroSlides,
	type HeroSlide
} from '@/app/(Private Pages)/actions/hero';
import { getNoticesSection } from '@/app/(Private Pages)/actions/notices';
import { getEventsSection } from '@/app/(Private Pages)/actions/events';
import {
	getPlacementCompanies,
	getTopPlacedStudents
} from '@/app/(Private Pages)/actions/placement';
import { getTestimonials } from '@/app/(Private Pages)/actions/testimonials';
import {
	toNoticesSectionComponentData,
	toEventsSectionComponentData,
	toTestimonialComponentData
} from '@/lib/carousel-adapters';

type HeroCarouselData = ComponentProps<typeof Hero2>['data'];
type HeroCarouselSlide = HeroCarouselData['slides'][number];

const normalizeCta = (cta?: HeroSlide['cta']): HeroCarouselSlide['cta'] => {
	if (!cta) return undefined;
	const label = cta.label?.trim();
	if (!label || label.length === 0) return undefined;
	const href = cta.href?.trim();
	if (cta.isEnquiry) {
		return { label, isEnquiry: true };
	}
	if (href && href.length > 0) {
		return { label, href };
	}
	return { label };
};

const mapHeroSlidesToHeroData = (slides: HeroSlide[]): HeroCarouselData => ({
	slides: slides.map(slide => ({
		title: slide.title,
		subtitle: slide.subtitle,
		description: slide.description,
		image: slide.image,
		icon: slide.icon ?? 'BookOpen',
		stats: slide.stats,
		cta: normalizeCta(slide.cta),
		secondary_cta: normalizeCta(slide.secondary_cta)
	}))
});

export default async function Home() {
	const pageSlug = 'main';
	const [
		heroSlides,
		noticesSection,
		eventsSection,
		placementCompanies,
		topPlacedStudents,
		testimonials
	] = await Promise.all([
		getHeroSlides(pageSlug),
		getNoticesSection(pageSlug),
		getEventsSection(pageSlug),
		getPlacementCompanies(pageSlug),
		getTopPlacedStudents(pageSlug),
		getTestimonials(pageSlug)
	]);

	const heroData: HeroCarouselData =
		heroSlides.length > 0 ? mapHeroSlidesToHeroData(heroSlides) : homeHero2Data;

	return (
		<>
			<Hero2 data={heroData} />

			<NoticesEventsComparison
				noticesData={toNoticesSectionComponentData(noticesSection)}
				eventsData={toEventsSectionComponentData(eventsSection)}
			/>

			<PlacementCompanies data={placementCompanies} />

			<TopPlacedStudents data={topPlacedStudents} />

			{testimonials.testimonials.length > 0 && (
				<Testimonial data={toTestimonialComponentData(testimonials)} />
			)}
		</>
	);
}
