import { notFound } from 'next/navigation';
import {
	getAdmissionsHero,
	getAdmissionsProcessMeta,
	getAdmissionsProgramById
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsPageShell from '@/app/(Public Pages)/admissions/components/AdmissionsPageShell';
import { ADMISSIONS_SLUGS } from '@/lib/admissions-cms';
import ProgramDetailView from '@/app/(Public Pages)/admissions/process/components/ProgramDetailView';

interface ProgramDetailsPageProps {
	params: Promise<{ programId: string }>;
}

export default async function ProgramDetailsPage({ params }: ProgramDetailsPageProps) {
	const { programId } = await params;
	const [pageHero, program, processMeta] = await Promise.all([
		getAdmissionsHero(ADMISSIONS_SLUGS.process),
		getAdmissionsProgramById(programId),
		getAdmissionsProcessMeta()
	]);

	if (!program) {
		notFound();
	}

	return (
		<AdmissionsPageShell hero={pageHero}>
			<ProgramDetailView
				program={program}
				meta={processMeta}
			/>
		</AdmissionsPageShell>
	);
}
