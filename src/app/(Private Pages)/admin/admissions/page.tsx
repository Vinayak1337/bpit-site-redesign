import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getAdmissionsHero,
	getAdmissionsOverviewPageData,
	getAdmissionsProgramCatalog
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';
import AdmissionsHeroBannerEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsHeroBannerEditor';
import AdmissionsOverviewEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsOverviewEditor';

export default async function AdminAdmissionsOverviewPage() {
	await requireAdmin();

	const [pageHero, overview, programs] = await Promise.all([
		getAdmissionsHero(ADMISSIONS_SLUGS.overview),
		getAdmissionsOverviewPageData(),
		getAdmissionsProgramCatalog()
	]);

	return (
		<div className='space-y-8'>
			<div className='rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the admissions overview page live. Each section opens its own form drawer and updates the public page after save.
			</div>

			<AdmissionsHeroBannerEditor
				initialData={pageHero}
				pageSlug={ADMISSIONS_SLUGS.overview}
				label='Admissions Overview Banner'
			/>

			<AdmissionsOverviewEditor
				initialData={overview}
				programCount={programs.length}
			/>
		</div>
	);
}
