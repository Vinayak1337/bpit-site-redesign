import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import BPITFooter from '@/components/footer/BPITFooter';
import NoticesSection from '@/components/carousel/notices-section';
import EventsSection from '@/components/carousel/events-section';
import PlacementCompanies from '@/components/placement/placement-companies';
import TopPlacedStudents from '@/components/placement/top-placed-students';
import Testimonial from '@/components/carousel/testimonial';
import Editable from '@/components/ui/Editable';

import { footerBottomLeftContent } from '@/data/header';
import { getContacts } from '@/app/(Public Pages)/actions/contacts';
import HeaderAnnouncementsEditor from '@/app/(Private Pages)/admin/home/components/HeaderAnnouncementsEditor';
import HeroSlidesEditor from '@/app/(Private Pages)/admin/components/HeroSlidesEditor';
import { getHeaderAnnouncements } from '@/app/(Private Pages)/actions/announcements';
import { getHeroSlides } from '@/app/(Private Pages)/actions/hero';

import {
	homeNoticesData,
	homeEventsData,
	homePlacementData,
	homeTopPlacedStudentsData,
	homeTestimonialsData
} from '@/data/home';

export default async function AdminHomePage() {
	await requireAdmin();
	const pageSlug = 'main';
	const [contacts, initialAnnouncementItems, heroSlides] = await Promise.all([
		getContacts(),
		getHeaderAnnouncements(pageSlug),
		getHeroSlides(pageSlug)
	]);

	const announcementsData: HeaderAnnouncementsData = {
		labels: { desktop: 'Important Announcements:', mobile: 'News:' },
		items: initialAnnouncementItems
	};

	return (
		<div className='space-y-0'>
			<div className='bg-blue-50 border-b border-blue-200 text-blue-900 p-3 text-center text-sm'>
				Select any section to start editing
			</div>
			<HeaderAnnouncementsEditor
				initialItems={initialAnnouncementItems}
				announcementsData={announcementsData}
				contacts={contacts}
				pageSlug={pageSlug}
			/>
			<main>
				<HeroSlidesEditor initialSlides={heroSlides} pageSlug={pageSlug} />
				<Editable
					label='Notices'
					formContent={
						<div className='text-sm text-slate-700'>
							Manage notices from Academia → Notices & Circulars section editor.
						</div>
					}>
					<NoticesSection data={homeNoticesData} />
				</Editable>
				<Editable
					label='Events'
					formContent={
						<div className='text-sm text-slate-700'>
							Manage events data in placements/events data source.
						</div>
					}>
					<EventsSection data={homeEventsData} />
				</Editable>
				<Editable
					label='Placement Companies'
					formContent={
						<div className='text-sm text-slate-700'>
							Upload/update company logos and stats here.
						</div>
					}>
					<PlacementCompanies data={homePlacementData} />
				</Editable>
				<Editable
					label='Top Placed Students'
					formContent={
						<div className='text-sm text-slate-700'>
							Edit student entries, company and package.
						</div>
					}>
					<TopPlacedStudents data={homeTopPlacedStudentsData} />
				</Editable>
				<Editable
					label='Testimonials'
					formContent={
						<div className='text-sm text-slate-700'>
							Edit testimonials content and media.
						</div>
					}>
					<Testimonial data={homeTestimonialsData} />
				</Editable>
			</main>
			<Editable
				label='Footer'
				formContent={
					<div className='text-sm text-slate-700'>
						Edit contact info, social links and bottom content.
					</div>
				}>
				<BPITFooter
					contacts={contacts}
					bottomLeftContent={footerBottomLeftContent}
				/>
			</Editable>
		</div>
	);
}
