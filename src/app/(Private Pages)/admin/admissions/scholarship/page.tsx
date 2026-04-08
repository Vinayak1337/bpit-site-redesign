import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getAdmissionsHero,
	getAdmissionsScholarshipPageData
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';
import AdmissionsHeroBannerEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsHeroBannerEditor';
import AdmissionsScholarshipEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsScholarshipEditor';

const pageSlug = ADMISSIONS_SLUGS.scholarship;

export default async function AdminAdmissionsScholarshipPage() {
	await requireAdmin();

	const [pageHero, content] = await Promise.all([
		getAdmissionsHero(pageSlug),
		getAdmissionsScholarshipPageData()
	]);

	return (
		<div className='space-y-8'>
			<div className='rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the scholarship page live, including portal cards and contact support details.
			</div>

			<AdmissionsHeroBannerEditor
				initialData={pageHero}
				pageSlug={pageSlug}
				label='Scholarship Banner'
			/>

			<AdmissionsScholarshipEditor initialData={content} />
		</div>
	);
}
