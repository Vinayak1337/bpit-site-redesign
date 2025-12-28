'use client';

import { useState } from 'react';
import FacilitiesForm from './FacilitiesForm';
import CampusFacilities from '@/components/student-life/CampusFacilities';
import type { CampusFacilitiesData } from '@/app/(Private Pages)/actions/student-life';

interface Props {
	initialData: CampusFacilitiesData;
}

export default function FacilitiesEditor({ initialData }: Props) {
	const [data, setData] = useState<CampusFacilitiesData>(initialData);

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
			<div className="space-y-6">
				<h2 className="text-lg font-semibold">Editor</h2>
				<FacilitiesForm
					initialData={initialData}
					onChange={setData}
				/>
			</div>
			<div className="space-y-6">
				<h2 className="text-lg font-semibold">Live Preview</h2>
				<div className="border rounded-xl overflow-hidden bg-gray-50 p-4 h-fit sticky top-4 max-h-screen overflow-y-auto">
					<CampusFacilities data={data} />
				</div>
			</div>
		</div>
	);
}

