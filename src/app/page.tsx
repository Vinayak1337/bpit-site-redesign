import Header from '@/components/header/header';
import Hero1 from '@/components/hero/hero1';
import Hero2 from '@/components/hero/hero2';
import PlacementCompanies from '@/components/placement/placement-companies';
import EnquiryPopup from '@/components/pop-up/enquiry-popup';
import Footer from '@/components/footer/AdvancedFooterSolidBlue';
import CollegeCarousel from '@/components/carousel';
import TestimonialCarousel from '@/components/testimonial';
import EventsSection from '@/components/events/events-section';
import NoticesAnnouncementsScrollingSection from '@/components/notices/notices-announcements-scrolling';

export default function Home() {
	return (
		<div className='min-h-screen'>
			<Header />

			<Hero1 />

			<Hero2 />

			{/* Placement Companies */}
			<PlacementCompanies />

			<EventsSection />

			<NoticesAnnouncementsScrollingSection />

			{/* Existing Components */}
			<div className='bg-slate-50 py-16'>
				<div className='container mx-auto px-4'>
					<div className='m-5'>
						<CollegeCarousel />
					</div>
					<div className='h-1/4 mt-16'>
						<TestimonialCarousel />
					</div>
				</div>
			</div>

			{/* Footer */}
			<Footer />

			{/* Enquiry Popup */}
			<EnquiryPopup />
		</div>
	);
}
