import Hero1 from '@/components/hero/hero1';
import Hero2 from '@/components/hero/hero2';
import PlacementCompanies from '@/components/placement/placement-companies';

import Testimonial from '@/components/carousel/testimonial';
import UltraModernEventsSection from '@/components/events/events-section';
import ModernNoticesSection from '@/components/notices/modern-notices-section';
import TopPlacedStudents from '@/components/placement/top-placed-students';

export default function Home() {
	return (
		<>
			<Hero1 />

			<Hero2 />

			<ModernNoticesSection />

			<UltraModernEventsSection />

			<PlacementCompanies />

			<TopPlacedStudents />

			<Testimonial />
		</>
	);
}
