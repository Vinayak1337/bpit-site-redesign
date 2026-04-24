'use client';

import { useState } from 'react';
import StudentLifeHeroForm from './StudentLifeHeroForm';
import StudentLifeHero from '@/app/(Public Pages)/student-life/components/StudentLifeHero';
import type { StudentLifeHeroData } from '@/app/(Private Pages)/actions/student-life';
import Editable from '@/components/ui/Editable';

type Props = {
	initialData: StudentLifeHeroData;
	pageSlug: string;
};

export default function StudentLifeHeroEditor({ initialData, pageSlug }: Props) {
	const [data, setData] = useState<StudentLifeHeroData>(initialData);
	const formContent = (
		<StudentLifeHeroForm
			initialData={initialData}
			pageSlug={pageSlug}
			onChange={setData}
		/>
	);

	return (
		<Editable label='Student Life Hero' presentation='dialog' formContent={formContent}>
			<div className='border rounded-xl overflow-hidden bg-gray-50'>
				<StudentLifeHero data={data} />
			</div>
		</Editable>
	);
}








