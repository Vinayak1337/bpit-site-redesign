import type { ReactNode } from 'react';
import AdmissionsContentWrapper from '@/app/(Public Pages)/admissions/components/AdmissionsContentWrapper';
import AdmissionsHero from '@/app/(Public Pages)/admissions/components/AdmissionsHero';
import type { AdmissionsHeroData } from '@/app/(Private Pages)/actions/admissions';

type AdmissionsPageShellProps = {
	hero?: AdmissionsHeroData | null;
	children: ReactNode;
};

export default function AdmissionsPageShell({
	hero,
	children
}: AdmissionsPageShellProps) {
	return (
		<main className='min-h-screen bg-gray-50'>
			<AdmissionsHero data={hero} />
			<div className='container mx-auto px-4 py-12'>
				<div className='flex flex-col gap-8 lg:flex-row'>
					<AdmissionsContentWrapper>{children}</AdmissionsContentWrapper>
				</div>
			</div>
		</main>
	);
}
