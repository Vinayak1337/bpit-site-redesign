import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getStudentLifeOverview, getStudentLifeHero } from '@/app/(Private Pages)/actions/student-life';
import OverviewEditor from '@/app/(Private Pages)/admin/student-life/components/OverviewEditor';
import StudentLifeHeroEditor from '@/app/(Private Pages)/admin/student-life/components/StudentLifeHeroEditor';

export default async function AdminStudentLifeOverviewPage() {
	await requireAdmin();
	const overviewData = await getStudentLifeOverview('student-life');
    const heroData = await getStudentLifeHero('student-life');

	return (
		<div className="space-y-12">
            <div className='space-y-8'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                        Hero Section
                    </h1>
                    <p className='text-gray-600'>
                        Edit the banner image and title.
                    </p>
                </div>
                <StudentLifeHeroEditor initialData={heroData} pageSlug='student-life' />
            </div>

            <div className="border-t pt-12">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Overview Content</h1>
                    <p className="text-gray-600 mb-8">
                        Edit the main description and highlight cards.
                    </p>
                </div>
                <OverviewEditor initialData={overviewData} />
            </div>
		</div>
	);
}

