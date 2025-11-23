'use client';

import { useState } from 'react';
import GrievanceForm from './GrievanceForm';
import StudentGrievance from '@/components/student-life/StudentGrievance';
import type { GrievanceCellData } from '@/app/(Private Pages)/actions/student-life';

interface Props {
	initialData: GrievanceCellData;
}

export default function GrievanceEditor({ initialData }: Props) {
	const [data, setData] = useState<GrievanceCellData>(initialData);

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
			<div className="space-y-6">
				<h2 className="text-lg font-semibold">Editor</h2>
				<GrievanceForm
					initialData={initialData}
					onChange={setData}
				/>
			</div>
			<div className="space-y-6">
				<h2 className="text-lg font-semibold">Live Preview</h2>
				<div className="border rounded-xl overflow-hidden bg-gray-50 p-4 h-fit sticky top-4 max-h-screen overflow-y-auto">
					<StudentGrievance data={data} />
				</div>
			</div>
		</div>
	);
}

