import Hero1 from '@/components/hero/hero1';
import Hero2 from '@/components/hero/hero2';
import PlacementCompanies from '@/components/placement/placement-companies';

import Testimonial from '@/components/carousel/testimonial';
import EventsSection from '@/components/carousel/events-section';
import NoticesSection from '@/components/carousel/notices-section';
import TopPlacedStudents from '@/components/placement/top-placed-students';

import {
	homeHeroData,
	homeHero2Data,
	homeNoticesData,
	homeEventsData,
	homePlacementData,
	homeTopPlacedStudentsData,
	homeTestimonialsData
} from '@/data/home';

export default function Home() {
	return (
		<>
			<Hero1 data={homeHeroData} />

			<Hero2 data={homeHero2Data} />

			<NoticesSection data={homeNoticesData} />

			<EventsSection data={homeEventsData} />

			<PlacementCompanies data={homePlacementData} />

			<TopPlacedStudents data={homeTopPlacedStudentsData} />

			<Testimonial data={homeTestimonialsData} />
		</>
	);
}
