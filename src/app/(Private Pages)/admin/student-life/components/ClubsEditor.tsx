'use client';

import { useState } from 'react';
import ClubsForm from './ClubsForm';
import ClubsSocieties from '@/components/student-life/ClubsSocieties';
import type { ClubsSocietiesData } from '@/app/(Private Pages)/actions/student-life';

interface Props {
	initialData: ClubsSocietiesData;
}

export default function ClubsEditor({ initialData }: Props) {
	const [data, setData] = useState<ClubsSocietiesData>(initialData);

	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
			<div className="space-y-6">
				<h2 className="text-lg font-semibold">Editor</h2>
				<ClubsForm
					initialData={initialData}
					onChange={setData}
				/>
			</div>
			<div className="space-y-6">
				<h2 className="text-lg font-semibold">Live Preview</h2>
				<div className="border rounded-xl overflow-hidden bg-gray-50 p-4 h-fit sticky top-4 max-h-screen overflow-y-auto">
					<ClubsSocieties data={data} />
				</div>
			</div>
		</div>
	);
}

