import {
	getAdmissionsHero,
	getAdmissionsBrochureConfig,
	getAdmissionsBrochureItems
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsPageShell from '@/app/(Public Pages)/admissions/components/AdmissionsPageShell';
import BrochureExplorer from '@/app/(Public Pages)/admissions/brochure/components/BrochureExplorer';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';

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
