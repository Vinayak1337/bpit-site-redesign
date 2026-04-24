'use client';

import { useState } from 'react';
import Editable from '@/components/ui/Editable';
import ExaminationHero from '@/app/(Public Pages)/academia/examination/components/ExaminationHero';
import ExaminationHeroForm from './ExaminationHeroForm';
import type { ExaminationHeroData } from '@/app/(Private Pages)/actions/academia-examination';

type Props = { initialData: ExaminationHeroData };

export default function ExaminationHeroEditor({ initialData }: Props) {
	const [data, setData] = useState<ExaminationHeroData>(initialData);

	return (
		<Editable
			label='Examination Hero'
			presentation='dialog'
			formContent={
				<ExaminationHeroForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50'>
				<ExaminationHero data={data} />
			</div>
		</Editable>
	);
}
