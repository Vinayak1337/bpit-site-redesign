import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import { getAcademiaHero } from '@/app/(Private Pages)/actions/academia';
import AcademiaHeroEditor from '@/app/(Private Pages)/admin/academia/components/AcademiaHeroEditor';

export default async function AdminAcademiaPage() {
	await requireAdmin();
	const heroData = await getAcademiaHero('academia');

	return (
		<div className='space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-gray-900 mb-2'>
					Academia Overview
				</h1>
				<p className='text-gray-600'>
					Manage the main hero banner for the Academia section.
				</p>
			</div>

			<AcademiaHeroEditor initialData={heroData} pageSlug='academia' />
		</div>
	);
}


