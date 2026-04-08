import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getAdmissionsBrochurePageData,
	getAdmissionsHero
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';
import AdmissionsHeroBannerEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsHeroBannerEditor';
import AdmissionsBrochureEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsBrochureEditor';

const pageSlug = ADMISSIONS_SLUGS.brochure;

export default async function AdminAdmissionsBrochurePage() {
	await requireAdmin();

	const [pageHero, content] = await Promise.all([
		getAdmissionsHero(pageSlug),
		getAdmissionsBrochurePageData()
	]);

	return (
		<div className='space-y-8'>
			<div className='rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the brochure page live, including scrape settings and brochure links.
			</div>

			<AdmissionsHeroBannerEditor
				initialData={pageHero}
				pageSlug={pageSlug}
				label='Brochure Banner'
			/>

			<AdmissionsBrochureEditor initialData={content} />
		</div>
	);
}
