import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getCodeOfConduct, getStudentLifeHero } from '@/app/(Private Pages)/actions/student-life';
import ConductEditor from '@/app/(Private Pages)/admin/student-life/components/ConductEditor';
import StudentLifeHeroEditor from '@/app/(Private Pages)/admin/student-life/components/StudentLifeHeroEditor';

export default async function AdminConductPage() {
	await requireAdmin();
	const conductData = await getCodeOfConduct('student-life-code-of-conduct');
    const heroData = await getStudentLifeHero('student-life-code-of-conduct');

	return (
		<div className="space-y-12">
            <div className='space-y-8'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                        Hero Section
                    </h1>
                    <p className='text-gray-600'>
                        Edit the banner image and title for Code of Conduct.
                    </p>
                </div>
                <StudentLifeHeroEditor initialData={heroData} pageSlug='student-life-code-of-conduct' />
            </div>

            <div className="border-t pt-12">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Code of Conduct Content</h1>
                    <p className="text-gray-600 mb-8">
                        Manage rules, regulations, and policies.
                    </p>
                </div>
                <ConductEditor initialData={conductData} />
            </div>
		</div>
	);
}

