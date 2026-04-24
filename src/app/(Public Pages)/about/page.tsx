import AboutOverviewSection from '@/components/about/AboutOverviewSection';
import AboutLegacySection from '@/components/about/AboutLegacySection';
import { getAboutLegacy, getAboutOverview } from '@/app/(Private Pages)/actions/about';
import { ABOUT_PAGE_SLUG } from '@/lib/page-slugs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About BPIT',
	description: 'Learn about Bhagwan Parshuram Institute of Technology — our history, vision, academic ethos, and commitment to engineering excellence in Delhi.',
	alternates: { canonical: '/about' }
};



export default async function AboutPage() {
	const [overview, legacy] = await Promise.all([
		getAboutOverview(ABOUT_PAGE_SLUG),
		getAboutLegacy(ABOUT_PAGE_SLUG)
	]);

	return (
		<div className='space-y-6 sm:space-y-8'>
			<AboutOverviewSection data={overview} />
			<AboutLegacySection data={legacy} />
		</div>
	);
}
