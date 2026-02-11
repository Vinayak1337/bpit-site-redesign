import Accreditations from '../components/Accreditations';
import WhyBPITHighlights from '../components/WhyBPITHighlights';
import FinalCTA from '../components/FinalCTA';
import WhyHero from './components/WhyHero';
import StatsStrip from './components/StatsStrip';
import PlacementCompanies from '@/components/placement/placement-companies';
import WhyBpitTestimonials from './components/WhyBpitTestimonials';
import {
	whyBpitHeroData,
	whyBpitStats,
	whyBpitFinalCta
} from '@/data/why-bpit';
import { getPlacementCompanies } from '@/app/(Private Pages)/actions/placement';
import { getTestimonials } from '@/app/(Private Pages)/actions/testimonials';

const pageSlug = 'main';

const WhyBPITPage = async () => {
	const [placementData, testimonials] = await Promise.all([
		getPlacementCompanies(pageSlug),
		getTestimonials(pageSlug)
	]);

	return (
		<div className='space-y-6 md:space-y-8'>
			<WhyHero data={whyBpitHeroData} />
			<StatsStrip stats={whyBpitStats} />
			<WhyBPITHighlights />

			<section className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm'>
				<PlacementCompanies data={placementData} />
			</section>

			<Accreditations />

			{testimonials.testimonials.length > 0 ? (
				<WhyBpitTestimonials data={testimonials} />
			) : null}

			<FinalCTA data={whyBpitFinalCta} />
		</div>
	);
};

export default WhyBPITPage;
