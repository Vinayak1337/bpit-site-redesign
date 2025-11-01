import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import BPITFooter from '@/components/footer/BPITFooter';
import TestimonialsEditor from '@/app/(Private Pages)/admin/components/TestimonialsEditor';
import Editable from '@/components/ui/Editable';

import { footerBottomLeftContent } from '@/data/header';
import { getContacts } from '@/app/(Public Pages)/actions/contacts';
import HeaderAnnouncementsEditor from '@/app/(Private Pages)/admin/home/components/HeaderAnnouncementsEditor';
import HeroSlidesEditor from '@/app/(Private Pages)/admin/components/HeroSlidesEditor';
import NoticesSectionEditor from '@/app/(Private Pages)/admin/components/NoticesSectionEditor';
import EventsSectionEditor from '@/app/(Private Pages)/admin/components/EventsSectionEditor';
import PlacementCompaniesEditor from '@/app/(Private Pages)/admin/components/PlacementCompaniesEditor';
import TopPlacedStudentsEditor from '@/app/(Private Pages)/admin/components/TopPlacedStudentsEditor';
import { getHeaderAnnouncements } from '@/app/(Private Pages)/actions/announcements';
import { getHeroSlides } from '@/app/(Private Pages)/actions/hero';
import { getNoticesSection } from '@/app/(Private Pages)/actions/notices';
import { getEventsSection } from '@/app/(Private Pages)/actions/events';
import {
	getPlacementCompanies,
	getTopPlacedStudents
} from '@/app/(Private Pages)/actions/placement';
import { getTestimonials } from '@/app/(Private Pages)/actions/testimonials';

export default async function AdminHomePage() {
	await requireAdmin();
	const pageSlug = 'main';
	const [
		contacts,
		initialAnnouncementItems,
		heroSlides,
		noticesSection,
		eventsSection,
		placementCompanies,
		topPlacedStudents,
		testimonials
	] = await Promise.all([
		getContacts(),
		getHeaderAnnouncements(pageSlug),
		getHeroSlides(pageSlug),
		getNoticesSection(pageSlug),
		getEventsSection(pageSlug),
		getPlacementCompanies(pageSlug),
		getTopPlacedStudents(pageSlug),
		getTestimonials(pageSlug)
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
				<NoticesSectionEditor
					initialData={noticesSection}
					pageSlug={pageSlug}
				/>
				<EventsSectionEditor initialData={eventsSection} pageSlug={pageSlug} />
				<PlacementCompaniesEditor
					initialData={placementCompanies}
					pageSlug={pageSlug}
				/>
				<TopPlacedStudentsEditor
					initialData={topPlacedStudents}
					pageSlug={pageSlug}
				/>
				<TestimonialsEditor initialData={testimonials} pageSlug={pageSlug} />
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
