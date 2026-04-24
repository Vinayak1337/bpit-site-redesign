import { getEventsFestivals } from '@/app/(Private Pages)/actions/student-life';
import EventsFestivals from '@/components/student-life/EventsFestivals';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Events & Festivals',
	description: 'Annual events and festivals at BPIT — technical fests, cultural celebrations, workshops and more.',
	alternates: { canonical: '/student-life/events-and-festivals' }
};



export default async function EventsAndFestivalsPage() {
	const data = await getEventsFestivals('student-life-events-and-festivals');
	return <EventsFestivals data={data} />;
}
