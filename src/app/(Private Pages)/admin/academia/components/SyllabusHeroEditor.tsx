'use client';

import { useState } from 'react';
import Editable from '@/components/ui/Editable';
import SyllabusHero from '@/app/(Public Pages)/academia/syllabus-ordinance/components/SyllabusHero';
import SyllabusHeroForm from './SyllabusHeroForm';
import type { SyllabusHeroData } from '@/app/(Private Pages)/actions/academia-syllabus-ordinance';

export default function SyllabusHeroEditor({
	initialData
}: {
	initialData: SyllabusHeroData;
}) {
	const [data, setData] = useState<SyllabusHeroData>(initialData);
	return (
		<Editable
			label='Syllabus Hero'
			presentation='dialog'
			formContent={
				<SyllabusHeroForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50'>
				<SyllabusHero data={data} />
			</div>
		</Editable>
	);
}
