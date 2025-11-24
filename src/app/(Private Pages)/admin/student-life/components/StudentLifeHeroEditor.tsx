'use client';

import { useState } from 'react';
import StudentLifeHeroForm from './StudentLifeHeroForm';
import StudentLifeHero from '@/app/(Public Pages)/student-life/components/StudentLifeHero';
import type { StudentLifeHeroData } from '@/app/(Private Pages)/actions/student-life';

type Props = {
	initialData: StudentLifeHeroData;
	pageSlug: string;
};

export default function StudentLifeHeroEditor({ initialData, pageSlug }: Props) {
	const [data, setData] = useState<StudentLifeHeroData>(initialData);

	return (
		<div className='space-y-8'>
			<div className='space-y-4'>
				<h2 className='text-lg font-semibold'>Preview</h2>
				<div className='border rounded-xl overflow-hidden bg-gray-50'>
					<StudentLifeHero data={data} />
				</div>
			</div>

			<div className='space-y-4'>
				<h2 className='text-lg font-semibold'>Edit Content</h2>
				<StudentLifeHeroForm
					initialData={initialData}
					pageSlug={pageSlug}
					onChange={setData}
				/>
			</div>
		</div>
	);
}


