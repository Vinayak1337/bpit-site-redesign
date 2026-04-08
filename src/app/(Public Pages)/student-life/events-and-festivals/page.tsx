import { getEventsFestivals } from '@/app/(Private Pages)/actions/student-life';
import EventsFestivals from '@/components/student-life/EventsFestivals';

export default async function EventsAndFestivalsPage() {
	const data = await getEventsFestivals('student-life-events-and-festivals');
	return <EventsFestivals data={data} />;
}
