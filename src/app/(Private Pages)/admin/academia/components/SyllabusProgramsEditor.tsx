'use client';

import { useState } from 'react';
import Editable from '@/components/ui/Editable';
import SyllabusPrograms from '@/app/(Public Pages)/academia/syllabus-ordinance/components/SyllabusPrograms';
import SyllabusProgramsForm from './SyllabusProgramsForm';
import type { SyllabusProgramsData } from '@/app/(Private Pages)/actions/academia-syllabus-ordinance';

export default function SyllabusProgramsEditor({
	initialData
}: {
	initialData: SyllabusProgramsData;
}) {
	const [data, setData] = useState<SyllabusProgramsData>(initialData);
	return (
		<Editable
			label='Programs & Ordinances'
			presentation='dialog'
			formContent={
				<SyllabusProgramsForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50'>
				<SyllabusPrograms programs={data.items} />
			</div>
		</Editable>
	);
}
