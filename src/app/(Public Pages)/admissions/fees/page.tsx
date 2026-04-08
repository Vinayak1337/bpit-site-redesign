import {
	getAdmissionsHero,
	getAdmissionsFeePrograms,
	getAdmissionsFeesMeta
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsPageShell from '@/app/(Public Pages)/admissions/components/AdmissionsPageShell';
import FeesExplorer from '@/app/(Public Pages)/admissions/fees/components/FeesExplorer';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';

export default async function FeesPage() {
	const [pageHero, meta, programs] = await Promise.all([
		getAdmissionsHero(ADMISSIONS_SLUGS.fees),
		getAdmissionsFeesMeta(),
		getAdmissionsFeePrograms()
	]);

	return (
		<AdmissionsPageShell hero={pageHero}>
			<FeesExplorer meta={meta} programs={programs} />
		</AdmissionsPageShell>
	);
}
