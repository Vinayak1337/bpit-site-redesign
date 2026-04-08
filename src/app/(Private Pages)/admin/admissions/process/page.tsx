import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getAdmissionsHero,
	getAdmissionsProcessPageData
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';
import AdmissionsHeroBannerEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsHeroBannerEditor';
import AdmissionsProcessEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsProcessEditor';

const pageSlug = ADMISSIONS_SLUGS.process;

export default async function AdminAdmissionsProcessPage() {
	await requireAdmin();

	const [pageHero, content] = await Promise.all([
		getAdmissionsHero(pageSlug),
		getAdmissionsProcessPageData()
	]);

	return (
		<div className='space-y-8'>
			<div className='rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the admissions process page live, including the formal category and subcategory taxonomy, detail copy, and every program record.
			</div>

			<AdmissionsHeroBannerEditor
				initialData={pageHero}
				pageSlug={pageSlug}
				label='Process Banner'
			/>

			<AdmissionsProcessEditor initialData={content} />
		</div>
	);
}
