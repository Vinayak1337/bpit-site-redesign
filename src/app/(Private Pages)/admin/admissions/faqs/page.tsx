import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getAdmissionsFaqPageData,
	getAdmissionsHero
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';
import AdmissionsHeroBannerEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsHeroBannerEditor';
import AdmissionsFaqEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsFaqEditor';

const pageSlug = ADMISSIONS_SLUGS.faqs;

export default async function AdminAdmissionsFaqPage() {
	await requireAdmin();

	const [pageHero, content] = await Promise.all([
		getAdmissionsHero(pageSlug),
		getAdmissionsFaqPageData()
	]);

	return (
		<div className='space-y-8'>
			<div className='rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the admissions FAQ page live, including category answers and support contact information.
			</div>

			<AdmissionsHeroBannerEditor
				initialData={pageHero}
				pageSlug={pageSlug}
				label='FAQ Banner'
			/>

			<AdmissionsFaqEditor initialData={content} />
		</div>
	);
}
