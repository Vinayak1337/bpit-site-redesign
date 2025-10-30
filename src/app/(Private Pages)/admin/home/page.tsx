import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import Header from '@/components/header/header';
import BPITFooter from '@/components/footer/BPITFooter';

import Hero2 from '@/components/hero/hero2';
import NoticesSection from '@/components/carousel/notices-section';
import EventsSection from '@/components/carousel/events-section';
import PlacementCompanies from '@/components/placement/placement-companies';
import TopPlacedStudents from '@/components/placement/top-placed-students';
import Testimonial from '@/components/carousel/testimonial';
import Editable from '@/components/ui/Editable';

import {
	headerContactData,
	headerAnnouncementsData,
	footerContactInfoData,
	footerBottomLeftContent
} from '@/data/header';

import {
	homeHero2Data,
	homeNoticesData,
	homeEventsData,
	homePlacementData,
	homeTopPlacedStudentsData,
	homeTestimonialsData
} from '@/data/home';

export default async function AdminHomePage() {
	await requireAdmin();
	return (
		<div className='space-y-0'>
			<div className='bg-blue-50 border-b border-blue-200 text-blue-900 p-3 text-center text-sm'>
				Select any section to start editing
			</div>
			<Editable
				label='Header'
				formContent={
					<form className='space-y-3'>
						<div>
							<label className='block text-sm font-medium text-slate-800'>
								Announcements label
							</label>
							<input
								className='mt-1 w-full border rounded-md px-3 py-2'
								placeholder='Important Announcements'
							/>
						</div>
						<button
							type='button'
							className='px-4 py-2 rounded-md bg-blue-600 text-white text-sm'>
							Save
						</button>
					</form>
				}>
				<Header
					contactData={headerContactData}
					announcementsData={headerAnnouncementsData}
				/>
			</Editable>
			<main>
				<Editable
					label='Hero'
					formContent={
						<form className='space-y-3'>
							<div>
								<label className='block text-sm font-medium text-slate-800'>
									Title
								</label>
								<input
									className='mt-1 w-full border rounded-md px-3 py-2'
									placeholder='Welcome to BPIT'
								/>
							</div>
							<button
								type='button'
								className='px-4 py-2 rounded-md bg-blue-600 text-white text-sm'>
								Save
							</button>
						</form>
					}>
					<Hero2 data={homeHero2Data} />
				</Editable>
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
					contactInfoData={footerContactInfoData}
					bottomLeftContent={footerBottomLeftContent}
				/>
			</Editable>
		</div>
	);
}
