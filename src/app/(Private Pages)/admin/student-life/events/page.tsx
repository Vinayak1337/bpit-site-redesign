import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getEventsFestivals, getStudentLifeHero } from '@/app/(Private Pages)/actions/student-life';
import EventsEditor from '@/app/(Private Pages)/admin/student-life/components/EventsEditor';
import StudentLifeHeroEditor from '@/app/(Private Pages)/admin/student-life/components/StudentLifeHeroEditor';

export default async function AdminEventsPage() {
	await requireAdmin();
	const eventsData = await getEventsFestivals('student-life-events-and-festivals');
    const heroData = await getStudentLifeHero('student-life-events-and-festivals');

	return (
		<div className="space-y-12">
            <div className='space-y-8'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                        Hero Section
                    </h1>
                    <p className='text-gray-600'>
                        Edit the banner image and title for Events & Festivals.
                    </p>
                </div>
                <StudentLifeHeroEditor initialData={heroData} pageSlug='student-life-events-and-festivals' />
            </div>

            <div className="border-t pt-12">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Events Content</h1>
                    <p className="text-gray-600 mb-8">
                        Manage annual events, fests, and their highlights.
                    </p>
                </div>
                <EventsEditor initialData={eventsData} />
            </div>
		</div>
	);
}

