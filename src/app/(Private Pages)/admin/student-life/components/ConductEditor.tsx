'use client';

import { useState } from 'react';
import ConductForm from './ConductForm';
import CodeOfConduct from '@/components/student-life/CodeOfConduct';
import type { CodeOfConductData } from '@/app/(Private Pages)/actions/student-life';

interface Props {
	initialData: CodeOfConductData;
}

export default function ConductEditor({ initialData }: Props) {
	const [data, setData] = useState<CodeOfConductData>(initialData);

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
			<div className="space-y-6">
				<h2 className="text-lg font-semibold">Editor</h2>
				<ConductForm
					initialData={initialData}
					onChange={setData}
				/>
			</div>
			<div className="space-y-6">
				<h2 className="text-lg font-semibold">Live Preview</h2>
				<div className="border rounded-xl overflow-hidden bg-gray-50 p-4 h-fit sticky top-4 max-h-screen overflow-y-auto">
					<CodeOfConduct data={data} />
				</div>
			</div>
		</div>
	);
}

