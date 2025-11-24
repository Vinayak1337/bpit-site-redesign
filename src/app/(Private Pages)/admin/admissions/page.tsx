import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getAdmissionsHero } from '@/app/(Private Pages)/actions/admissions';
import AdmissionsHeroEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsHeroEditor';

export default async function AdminAdmissionsPage() {
	await requireAdmin();
	const heroData = await getAdmissionsHero('admissions');

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>
					Admissions Overview
				</h1>
				<p className='text-gray-600'>
					Manage the main hero banner for the Admissions section.
				</p>
			</div>

			<AdmissionsHeroEditor initialData={heroData} pageSlug='admissions' />
		</div>
	);
}


