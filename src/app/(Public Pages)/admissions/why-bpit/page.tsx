import Accreditations from '../components/Accreditations';
import WhyBPITHighlights from '../components/WhyBPITHighlights';
import FinalCTA from '../components/FinalCTA';
import WhyHero from './components/WhyHero';
import StatsStrip from './components/StatsStrip';
import PlacementCompanies from '@/components/placement/placement-companies';
import WhyBpitTestimonials from './components/WhyBpitTestimonials';
import { getPlacementCompanies } from '@/app/(Private Pages)/actions/placement';
import { getTestimonials } from '@/app/(Private Pages)/actions/testimonials';
import {
	getAdmissionsHero,
	getAdmissionsWhyBpitPageData
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';
import AdmissionsPageShell from '@/app/(Public Pages)/admissions/components/AdmissionsPageShell';

const pageSlug = ADMISSIONS_SLUGS.whyBpit;

const WhyBPITPage = async () => {
	const [pageHero, content, placementData, testimonials] = await Promise.all([
		getAdmissionsHero(pageSlug),
		getAdmissionsWhyBpitPageData(),
		getPlacementCompanies(pageSlug),
		getTestimonials(pageSlug)
	]);

	return (
		<AdmissionsPageShell hero={pageHero}>
			<div className='space-y-6 md:space-y-8'>
				<WhyHero data={content.hero} />
				<StatsStrip data={content.stats} />
				<WhyBPITHighlights data={content.highlights} />

				<section className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'>
					<PlacementCompanies data={placementData} />
				</section>

				<Accreditations data={content.accreditations} />

				{testimonials.testimonials.length > 0 ? (
					<WhyBpitTestimonials data={testimonials} />
				) : null}

				<FinalCTA data={content.finalCta} />
			</div>
		</AdmissionsPageShell>
	);
};

export default WhyBPITPage;
