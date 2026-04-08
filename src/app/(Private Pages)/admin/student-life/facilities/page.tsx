import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getCampusFacilities, getStudentLifeHero } from '@/app/(Private Pages)/actions/student-life';
import FacilitiesEditor from '@/app/(Private Pages)/admin/student-life/components/FacilitiesEditor';
import StudentLifeHeroEditor from '@/app/(Private Pages)/admin/student-life/components/StudentLifeHeroEditor';

export default async function AdminCampusFacilitiesPage() {
	await requireAdmin();
	const facilitiesData = await getCampusFacilities('student-life-campus-facilities');
    const heroData = await getStudentLifeHero('student-life-campus-facilities');

	return (
		<div className="space-y-12">
            <div className='space-y-8'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                        Hero Section
                    </h1>
                    <p className='text-gray-600'>
                        Edit the banner image and title for Campus Facilities.
                    </p>
                </div>
                <StudentLifeHeroEditor initialData={heroData} pageSlug='student-life-campus-facilities' />
            </div>

            <div className="border-t pt-12">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Facilities Content</h1>
                    <p className="text-gray-600 mb-8">
                        Manage sections, facility items, and their details.
                    </p>
                </div>
                <FacilitiesEditor initialData={facilitiesData} />
            </div>
		</div>
	);
}

