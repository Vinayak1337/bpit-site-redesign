import type { Metadata } from 'next';
import CalendarHero from './components/CalendarHero';
import CalendarEvents from './components/CalendarEvents';
import {
	getCalendarHero,
	getCalendarEvents
} from '@/app/(Private Pages)/actions/academia-academic-calendar';

export const revalidate = 3600;

export const metadata: Metadata = {
	title: 'Academic Calendar',
	description:
		'BPIT academic calendar — semester schedules, examination dates, holidays, and key academic events for the current session.',
	alternates: { canonical: '/academia/academic-calendar' }
};

export default async function AcademicCalendarPage() {
	const [hero, events] = await Promise.all([
		getCalendarHero(),
		getCalendarEvents()
	]);
	return (
		<>
			<CalendarHero data={hero} />
			<CalendarEvents events={events.items} />
		</>
	);
}
