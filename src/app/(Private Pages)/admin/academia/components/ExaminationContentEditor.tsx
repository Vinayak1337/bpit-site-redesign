'use client';

import { useState } from 'react';
import Editable from '@/components/ui/Editable';
import ExaminationContent from '@/app/(Public Pages)/academia/examination/components/ExaminationContent';
import ExaminationContentForm from './ExaminationContentForm';
import type { ExaminationContentData } from '@/app/(Private Pages)/actions/academia-examination';

type Props = { initialData: ExaminationContentData };

export default function ExaminationContentEditor({ initialData }: Props) {
	const [data, setData] = useState<ExaminationContentData>(initialData);

	return (
		<Editable
			label='Examination Main Content'
			presentation='dialog'
			formContent={
				<ExaminationContentForm initialData={initialData} onChange={setData} />
			}>
			<div className='border rounded-xl overflow-hidden bg-gray-50'>
				<ExaminationContent data={data} />
			</div>
		</Editable>
	);
}
