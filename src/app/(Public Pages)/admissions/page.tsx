import {
	getAdmissionsHero,
	getAdmissionsOverviewPageData,
	getAdmissionsProgramCatalog
} from '@/app/(Private Pages)/actions/admissions';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';
import AdmissionsPageShell from '@/app/(Public Pages)/admissions/components/AdmissionsPageShell';
import {
	AdmissionsOverviewDepartmentsSection,
	AdmissionsOverviewIntroSection,
	AdmissionsOverviewLinksSection,
	AdmissionsOverviewNotesSection,
	AdmissionsOverviewStatsSection
} from '@/app/(Public Pages)/admissions/components/AdmissionsOverviewSections';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admissions',
	description: 'Admissions at BPIT — BTech programmes, eligibility, process, fees, scholarships and brochures for the upcoming intake.',
	alternates: { canonical: '/admissions' }
};


export default async function AdmissionsOverviewPage() {
	const [pageHero, overview, programs] = await Promise.all([
		getAdmissionsHero(ADMISSIONS_SLUGS.overview),
		getAdmissionsOverviewPageData(),
		getAdmissionsProgramCatalog()
	]);
	const programCount = programs.length;

	return (
		<AdmissionsPageShell hero={pageHero}>
			<div className='space-y-8'>
				<AdmissionsOverviewIntroSection
					data={overview.hero}
					programCount={programCount}
				/>
				<AdmissionsOverviewStatsSection data={overview.stats} />
				<AdmissionsOverviewLinksSection data={overview.links} />
				<AdmissionsOverviewDepartmentsSection data={overview.departments} />
				<AdmissionsOverviewNotesSection data={overview.notes} />
			</div>
		</AdmissionsPageShell>
	);
}
