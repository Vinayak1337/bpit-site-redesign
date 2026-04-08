'use client';

import { useState } from 'react';
import AcademiaHeroForm from './AcademiaHeroForm';
import AcademiaHero from '@/app/(Public Pages)/academia/components/AcademiaHero';
import type { AcademiaHeroData } from '@/app/(Private Pages)/actions/academia';
import Editable from '@/components/ui/Editable';

type Props = {
	initialData: AcademiaHeroData;
	pageSlug: string;
};

export default function AcademiaHeroEditor({ initialData, pageSlug }: Props) {
	const [data, setData] = useState<AcademiaHeroData>(initialData);
	const formContent = (
		<AcademiaHeroForm
			initialData={initialData}
			pageSlug={pageSlug}
			onChange={setData}
		/>
	);

	return (
		<Editable label='Academia Hero' formContent={formContent}>
			<div className='border rounded-xl overflow-hidden bg-gray-50'>
				<AcademiaHero data={data} />
			</div>
		</Editable>
	);
}








