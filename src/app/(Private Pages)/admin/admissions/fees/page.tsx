import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getAdmissionsFeesPageData,
	getAdmissionsHero
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';
import AdmissionsHeroBannerEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsHeroBannerEditor';
import AdmissionsFeesEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsFeesEditor';

const pageSlug = ADMISSIONS_SLUGS.fees;

export default async function AdminAdmissionsFeesPage() {
	await requireAdmin();

	const [pageHero, content] = await Promise.all([
		getAdmissionsHero(pageSlug),
		getAdmissionsFeesPageData()
	]);

	return (
		<div className='space-y-8'>
			<div className='rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the fee structure page live, including all program cards and nested annual breakdowns.
			</div>

			<AdmissionsHeroBannerEditor
				initialData={pageHero}
				pageSlug={pageSlug}
				label='Fees Banner'
			/>

			<AdmissionsFeesEditor initialData={content} />
		</div>
	);
}
