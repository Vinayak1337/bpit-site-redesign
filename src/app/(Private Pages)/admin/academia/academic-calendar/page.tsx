import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getCalendarHero,
	getCalendarEvents
} from '@/app/(Private Pages)/actions/academia-academic-calendar';
import CalendarHeroEditor from '@/app/(Private Pages)/admin/academia/components/CalendarHeroEditor';
import CalendarEventsEditor from '@/app/(Private Pages)/admin/academia/components/CalendarEventsEditor';

export default async function AdminAcademicCalendarPage() {
	await requireAdmin();

	const [hero, events] = await Promise.all([
		getCalendarHero(),
		getCalendarEvents()
	]);

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>
					Academic Calendar
				</h1>
				<p className='text-gray-600'>
					Click any section to edit it. Changes save to the database and
					revalidate the public page.
				</p>
			</div>

			<CalendarHeroEditor initialData={hero} />
			<CalendarEventsEditor initialData={events} />
		</div>
	);
}
