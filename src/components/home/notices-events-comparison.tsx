'use client';

import { AnnouncementsColumn } from '@/components/home/notices-events/announcements-column';
import { RotatingEventsStack } from '@/components/home/notices-events/events-stack';
import { NoticesColumn } from '@/components/home/notices-events/notices-column';
import {
	dedupeByIdAndTitle,
	sortByDateAsc,
	sortByDateDesc
} from '@/components/home/notices-events/shared';
import type { NoticesEventsComparisonProps } from '@/components/home/notices-events/types';

export default function NoticesEventsComparison({
	noticesData,
	eventsData
}: NoticesEventsComparisonProps) {
	const notices = sortByDateDesc(dedupeByIdAndTitle(noticesData.notices));
	const announcements = sortByDateDesc(dedupeByIdAndTitle(noticesData.announcements));
	const events = sortByDateAsc(dedupeByIdAndTitle(eventsData.events));

	return (
		<section className='relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 py-16 md:py-20'>
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute -left-20 top-20 h-64 w-64 rounded-full bg-blue-200/25 blur-3xl' />
				<div className='absolute right-0 top-10 h-72 w-72 rounded-full bg-cyan-200/25 blur-3xl' />
			</div>

			<div className='relative container mx-auto px-4'>
				<div className='mx-auto w-full max-w-[96rem]'>
					<div className='grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6'>
						<div className='space-y-5 md:col-span-6 xl:col-span-7'>
							<NoticesColumn items={notices} />
							<AnnouncementsColumn items={announcements} />
						</div>

						<div className='md:col-span-6 xl:col-span-5'>
							<RotatingEventsStack events={events} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
