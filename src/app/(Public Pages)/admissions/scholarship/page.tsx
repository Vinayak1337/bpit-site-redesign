import {
	getAdmissionsHero,
	getAdmissionsScholarshipCategories,
	getAdmissionsScholarshipIntro,
	getAdmissionsScholarshipNotes,
	getAdmissionsScholarshipSupport
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsPageShell from '@/app/(Public Pages)/admissions/components/AdmissionsPageShell';
import ScholarshipContent from '@/app/(Public Pages)/admissions/scholarship/components/ScholarshipContent';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';

export default async function ScholarshipPage() {
	const [pageHero, intro, categories, notes, support] = await Promise.all([
		getAdmissionsHero(ADMISSIONS_SLUGS.scholarship),
		getAdmissionsScholarshipIntro(),
		getAdmissionsScholarshipCategories(),
		getAdmissionsScholarshipNotes(),
		getAdmissionsScholarshipSupport()
	]);

	return (
		<AdmissionsPageShell hero={pageHero}>
			<ScholarshipContent
				intro={intro}
				categories={categories}
				notes={notes}
				support={support}
			/>
		</AdmissionsPageShell>
	);
}
