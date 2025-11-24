'use client';

import { useState } from 'react';
import OverviewForm from './OverviewForm';
import StudentLifeOverview from '@/components/student-life/StudentLifeOverview';
import type { StudentLifeOverviewData } from '@/app/(Private Pages)/actions/student-life';

interface Props {
	initialData: StudentLifeOverviewData;
}

export default function OverviewEditor({ initialData }: Props) {
	const [data, setData] = useState<StudentLifeOverviewData>(initialData);

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
			<div className="space-y-6">
				<h2 className="text-lg font-semibold">Editor</h2>
				<OverviewForm
					initialData={initialData}
					onChange={setData}
				/>
			</div>
			<div className="space-y-6">
				<h2 className="text-lg font-semibold">Live Preview</h2>
				<div className="border rounded-xl overflow-hidden bg-gray-50 p-4 h-fit sticky top-4">
					<StudentLifeOverview data={data} />
				</div>
			</div>
		</div>
	);
}

