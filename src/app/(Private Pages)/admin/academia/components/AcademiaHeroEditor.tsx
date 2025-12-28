'use client';

import { useState } from 'react';
import AcademiaHeroForm from './AcademiaHeroForm';
import AcademiaHero from '@/app/(Public Pages)/academia/components/AcademiaHero';
import type { AcademiaHeroData } from '@/app/(Private Pages)/actions/academia';

type Props = {
	initialData: AcademiaHeroData;
	pageSlug: string;
};

export default function AcademiaHeroEditor({ initialData, pageSlug }: Props) {
	const [data, setData] = useState<AcademiaHeroData>(initialData);

	return (
		<div className='space-y-8'>
			<div className='space-y-4'>
				<h2 className='text-lg font-semibold'>Preview</h2>
				<div className='border rounded-xl overflow-hidden bg-gray-50'>
					<AcademiaHero data={data} />
				</div>
			</div>

			<div className='space-y-4'>
				<h2 className='text-lg font-semibold'>Edit Content</h2>
				<AcademiaHeroForm
					initialData={initialData}
					pageSlug={pageSlug}
					onChange={setData}
				/>
			</div>
		</div>
	);
}







