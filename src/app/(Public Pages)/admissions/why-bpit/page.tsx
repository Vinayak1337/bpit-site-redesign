import Accreditations from '../components/Accreditations';
import WhyBPITHighlights from '../components/WhyBPITHighlights';
import FinalCTA from '../components/FinalCTA';
import WhyHero from './components/WhyHero';
import StatsStrip from './components/StatsStrip';
import PlacementCompanies from '@/components/placement/placement-companies';
import Testimonial from '@/components/carousel/testimonial';
import {
	whyBpitHeroData,
	whyBpitStats,
	whyBpitFinalCta
} from '@/data/why-bpit';
import { getPlacementCompanies } from '@/app/(Private Pages)/actions/placement';
import { getTestimonials } from '@/app/(Private Pages)/actions/testimonials';
import { toTestimonialComponentData } from '@/lib/carousel-adapters';

const pageSlug = 'main';

const WhyBPITPage = async () => {
	const [placementData, testimonials] = await Promise.all([
		getPlacementCompanies(pageSlug),
		getTestimonials(pageSlug)
	]);

	return (
		<div className='min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50'>
			{/* Frosted Blue Hero aligned to homepage language */}
			<WhyHero data={whyBpitHeroData} />

			{/* Compact stats over subtle blue background */}
			<div className='relative'>
				<div className='absolute inset-0 pointer-events-none'>
					<div className='absolute -top-10 -left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl' />
					<div className='absolute -bottom-10 -right-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl' />
				</div>
				<StatsStrip stats={whyBpitStats} />
			</div>

			{/* Why Highlights with glass cards */}
			<section className='relative'>
				<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]' />
				<WhyBPITHighlights />
			</section>

			{/* Recruiters Marquee in white canvas */}
			<PlacementCompanies data={placementData} />

			{/* Accreditations with consistent frosted accents */}
			<section className='relative py-2'>
				<div className='absolute inset-0 -z-10 bg-gradient-to-b from-white via-blue-50/40 to-white' />
				<Accreditations />
			</section>

			{/* Testimonials to mirror home tone */}
			{testimonials.testimonials.length > 0 && (
				<Testimonial data={toTestimonialComponentData(testimonials)} />
			)}

			{/* CTA with blue gradient and glass buttons */}
			<FinalCTA data={whyBpitFinalCta} />
		</div>
	);
};

export default WhyBPITPage;
