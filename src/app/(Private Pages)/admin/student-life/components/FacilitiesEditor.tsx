'use client';

import { useState } from 'react';
import FacilitiesForm from './FacilitiesForm';
import {
	CampusFacilitiesHeader,
	CampusFacilitiesSections
} from '@/components/student-life/CampusFacilities';
import type { CampusFacilitiesData } from '@/app/(Private Pages)/actions/student-life';
import Editable from '@/components/ui/Editable';

interface Props {
	initialData: CampusFacilitiesData;
}

export default function FacilitiesEditor({ initialData }: Props) {
	const [data, setData] = useState<CampusFacilitiesData>(initialData);

	return (
		<div className='space-y-8'>
			<Editable
				label='Facilities Header'
				formContent={
					<FacilitiesForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['header']}
					/>
				}>
				<CampusFacilitiesHeader data={data} />
			</Editable>

			<Editable
				label='Facilities Sections'
				formContent={
					<FacilitiesForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['sections']}
					/>
				}>
				<CampusFacilitiesSections data={data} />
			</Editable>
		</div>
	);
}
