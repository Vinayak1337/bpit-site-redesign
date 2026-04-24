import {
	getAdmissionsHero,
	getAdmissionsFeePrograms,
	getAdmissionsFeesMeta
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsPageShell from '@/app/(Public Pages)/admissions/components/AdmissionsPageShell';
import FeesExplorer from '@/app/(Public Pages)/admissions/fees/components/FeesExplorer';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Fees',
	description: 'BTech and other programme fees at BPIT — tuition, development, hostel, and payment schedule per GGSIPU norms.',
	alternates: { canonical: '/admissions/fees' }
};


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
