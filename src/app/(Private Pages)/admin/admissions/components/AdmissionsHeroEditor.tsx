'use client';

import { useState } from 'react';
import AdmissionsHeroForm from './AdmissionsHeroForm';
import AdmissionsHero from '@/app/(Public Pages)/admissions/components/AdmissionsHero';
import type { AdmissionsHeroData } from '@/app/(Private Pages)/actions/admissions';

type Props = {
	initialData: AdmissionsHeroData;
	pageSlug: string;
};

export default function AdmissionsHeroEditor({ initialData, pageSlug }: Props) {
	const [data, setData] = useState<AdmissionsHeroData>(initialData);

	return (
		<div className='space-y-8'>
			<div className='space-y-4'>
				<h2 className='text-lg font-semibold'>Preview</h2>
				<div className='border rounded-xl overflow-hidden bg-gray-50'>
					<AdmissionsHero data={data} />
				</div>
			</div>

			<div className='space-y-4'>
				<h2 className='text-lg font-semibold'>Edit Content</h2>
				<AdmissionsHeroForm
					initialData={initialData}
					pageSlug={pageSlug}
					onChange={setData}
				/>
			</div>
		</div>
	);
}







