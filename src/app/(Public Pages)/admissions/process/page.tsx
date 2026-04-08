import {
	getAdmissionsHero,
	getAdmissionsProcessMeta,
	getAdmissionsProgramCatalog
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsPageShell from '@/app/(Public Pages)/admissions/components/AdmissionsPageShell';
import ProcessExplorer from '@/app/(Public Pages)/admissions/process/components/ProcessExplorer';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';

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
