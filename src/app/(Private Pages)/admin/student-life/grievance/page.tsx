import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getGrievanceCell, getStudentLifeHero } from '@/app/(Private Pages)/actions/student-life';
import GrievanceEditor from '@/app/(Private Pages)/admin/student-life/components/GrievanceEditor';
import StudentLifeHeroEditor from '@/app/(Private Pages)/admin/student-life/components/StudentLifeHeroEditor';

export default async function AdminGrievancePage() {
	await requireAdmin();
	const grievanceData = await getGrievanceCell('student-life-student-grievance-cell');
    const heroData = await getStudentLifeHero('student-life-student-grievance-cell');

	return (
		<div className="space-y-12">
            <div className='space-y-8'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                        Hero Section
                    </h1>
                    <p className='text-gray-600'>
                        Edit the banner image and title for Grievance Cell.
                    </p>
                </div>
                <StudentLifeHeroEditor initialData={heroData} pageSlug='student-life-student-grievance-cell' />
            </div>

            <div className="border-t pt-12">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Grievance Cell Content</h1>
                    <p className="text-gray-600 mb-8">
                        Update contact information and process steps.
                    </p>
                </div>
                <GrievanceEditor initialData={grievanceData} />
            </div>
		</div>
	);
}

