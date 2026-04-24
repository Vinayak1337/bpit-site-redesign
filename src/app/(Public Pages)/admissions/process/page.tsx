import {
	getAdmissionsHero,
	getAdmissionsProcessMeta,
	getAdmissionsProgramCatalog
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsPageShell from '@/app/(Public Pages)/admissions/components/AdmissionsPageShell';
import ProcessExplorer from '@/app/(Public Pages)/admissions/process/components/ProcessExplorer';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Admission Process',
	description: 'Step-by-step admission process at BPIT — eligibility, CET, JAC Delhi counselling, documents required and reporting.',
	alternates: { canonical: '/admissions/process' }
};


export default async function AdmissionsProcessPage() {
	const [pageHero, meta, programs] = await Promise.all([
		getAdmissionsHero(ADMISSIONS_SLUGS.process),
		getAdmissionsProcessMeta(),
		getAdmissionsProgramCatalog()
	]);

	return (
		<AdmissionsPageShell hero={pageHero}>
			<ProcessExplorer meta={meta} programs={programs} />
		</AdmissionsPageShell>
	);
}
