import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getClubsSocieties, getStudentLifeHero } from '@/app/(Private Pages)/actions/student-life';
import ClubsEditor from '@/app/(Private Pages)/admin/student-life/components/ClubsEditor';
import StudentLifeHeroEditor from '@/app/(Private Pages)/admin/student-life/components/StudentLifeHeroEditor';

export default async function AdminClubsPage() {
	await requireAdmin();
	const clubsData = await getClubsSocieties('student-life-clubs-and-societies');
    const heroData = await getStudentLifeHero('student-life-clubs-and-societies');

	return (
		<div className="space-y-12">
            <div className='space-y-8'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                        Hero Section
                    </h1>
                    <p className='text-gray-600'>
                        Edit the banner image and title for Clubs & Societies.
                    </p>
                </div>
                <StudentLifeHeroEditor initialData={heroData} pageSlug='student-life-clubs-and-societies' />
            </div>

            <div className="border-t pt-12">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Clubs Content</h1>
                    <p className="text-gray-600 mb-8">
                        Manage club categories, individual clubs, and their activities.
                    </p>
                </div>
                <ClubsEditor initialData={clubsData} />
            </div>
		</div>
	);
}

