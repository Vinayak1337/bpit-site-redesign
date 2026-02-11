'use client';

import { useState } from 'react';
import AdmissionsHeroForm from './AdmissionsHeroForm';
import AdmissionsHero from '@/app/(Public Pages)/admissions/components/AdmissionsHero';
import type { AdmissionsHeroData } from '@/app/(Private Pages)/actions/admissions';
import Editable from '@/components/ui/Editable';

type Props = {
	initialData: AdmissionsHeroData;
	pageSlug: string;
};

export default function AdmissionsHeroEditor({ initialData, pageSlug }: Props) {
	const [data, setData] = useState<AdmissionsHeroData>(initialData);
	const formContent = (
		<AdmissionsHeroForm
			initialData={initialData}
			pageSlug={pageSlug}
			onChange={setData}
		/>
	);

	return (
		<Editable label='Admissions Hero' formContent={formContent}>
			<div className='border rounded-xl overflow-hidden bg-gray-50'>
				<AdmissionsHero data={data} />
			</div>
		</Editable>
	);
}








