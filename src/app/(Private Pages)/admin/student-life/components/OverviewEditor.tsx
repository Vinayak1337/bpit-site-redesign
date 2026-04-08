'use client';

import { useState } from 'react';
import OverviewForm from './OverviewForm';
import {
	StudentLifeOverviewHeader,
	StudentLifeOverviewHighlights
} from '@/components/student-life/StudentLifeOverview';
import type { StudentLifeOverviewData } from '@/app/(Private Pages)/actions/student-life';
import Editable from '@/components/ui/Editable';

interface Props {
	initialData: StudentLifeOverviewData;
}

export default function OverviewEditor({ initialData }: Props) {
	const [data, setData] = useState<StudentLifeOverviewData>(initialData);

	return (
		<div className='space-y-8'>
			<Editable
				label='Overview Header'
				formContent={
					<OverviewForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['header']}
					/>
				}>
				<StudentLifeOverviewHeader data={data} />
			</Editable>

			<Editable
				label='Overview Highlights'
				formContent={
					<OverviewForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['highlights']}
					/>
				}>
				<StudentLifeOverviewHighlights data={data} />
			</Editable>
		</div>
	);
}
