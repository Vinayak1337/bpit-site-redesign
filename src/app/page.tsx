import Hero1 from '@/components/hero/hero1';
import Hero2 from '@/components/hero/hero2';
import PlacementCompanies from '@/components/placement/placement-companies';

import Testimonial from '@/components/carousel/testimonial';
import ModernEventsSection from '@/components/events/modern-events-section';
import ModernNoticesSection from '@/components/notices/modern-notices-section';

export default function Home() {
	return (
		<>
			<Hero1 />

			<Hero2 />

			<PlacementCompanies />

			<ModernEventsSection />

			<ModernNoticesSection />

			<Testimonial />
		</>
	);
}
