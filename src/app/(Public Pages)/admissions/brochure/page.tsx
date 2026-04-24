import {
	getAdmissionsHero,
	getAdmissionsBrochureConfig,
	getAdmissionsBrochureItems
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsPageShell from '@/app/(Public Pages)/admissions/components/AdmissionsPageShell';
import BrochureExplorer from '@/app/(Public Pages)/admissions/brochure/components/BrochureExplorer';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Brochure',
	description: 'Download the official BPIT admissions brochure with programme details, fees and campus information.',
	alternates: { canonical: '/admissions/brochure' }
};


export default async function BrochurePage() {
	const [pageHero, config, items] = await Promise.all([
		getAdmissionsHero(ADMISSIONS_SLUGS.brochure),
		getAdmissionsBrochureConfig(),
		getAdmissionsBrochureItems()
	]);

	return (
		<AdmissionsPageShell hero={pageHero}>
			<BrochureExplorer config={config} items={items} />
		</AdmissionsPageShell>
	);
}
