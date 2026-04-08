import { requireAdmin } from '@/app/(Private Pages)/actions/admin-auth';
import {
	getAdmissionsHero,
	getAdmissionsWhyBpitPageData
} from '@/app/(Private Pages)/actions/admissions';
import { getPlacementCompanies } from '@/app/(Private Pages)/actions/placement';
import { getTestimonials } from '@/app/(Private Pages)/actions/testimonials';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';
import AdmissionsHeroBannerEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsHeroBannerEditor';
import AdmissionsWhyBpitEditor from '@/app/(Private Pages)/admin/admissions/components/AdmissionsWhyBpitEditor';
import PlacementCompaniesEditor from '@/app/(Private Pages)/admin/components/PlacementCompaniesEditor';
import TestimonialsEditor from '@/app/(Private Pages)/admin/components/TestimonialsEditor';

const pageSlug = ADMISSIONS_SLUGS.whyBpit;

export default async function AdminAdmissionsWhyBpitPage() {
	await requireAdmin();

	const [pageHero, content, placementData, testimonials] = await Promise.all([
		getAdmissionsHero(pageSlug),
		getAdmissionsWhyBpitPageData(),
		getPlacementCompanies(pageSlug),
		getTestimonials(pageSlug)
	]);

	return (
		<div className='space-y-8'>
			<div className='rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 shadow-sm'>
				Edit the Why BPIT admissions page live, including its shared placement and testimonial sections for this admissions slug.
			</div>

			<AdmissionsHeroBannerEditor
				initialData={pageHero}
				pageSlug={pageSlug}
				label='Why BPIT Banner'
			/>

			<AdmissionsWhyBpitEditor initialData={content} />

			<PlacementCompaniesEditor
				initialData={placementData}
				pageSlug={pageSlug}
			/>

			<TestimonialsEditor
				initialData={testimonials}
				pageSlug={pageSlug}
			/>
		</div>
	);
}
