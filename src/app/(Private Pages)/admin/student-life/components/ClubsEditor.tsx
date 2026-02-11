'use client';

import { useState } from 'react';
import ClubsForm from './ClubsForm';
import {
	ClubsSocietiesHeader,
	ClubsSocietiesCategories
} from '@/components/student-life/ClubsSocieties';
import type { ClubsSocietiesData } from '@/app/(Private Pages)/actions/student-life';
import Editable from '@/components/ui/Editable';

interface Props {
	initialData: ClubsSocietiesData;
}

export default function ClubsEditor({ initialData }: Props) {
	const [data, setData] = useState<ClubsSocietiesData>(initialData);

	return (
		<div className='space-y-8'>
			<Editable
				label='Clubs Header'
				formContent={
					<ClubsForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['header']}
					/>
				}>
				<ClubsSocietiesHeader data={data} />
			</Editable>

			<Editable
				label='Clubs Categories'
				formContent={
					<ClubsForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['categories']}
					/>
				}>
				<ClubsSocietiesCategories data={data} />
			</Editable>
		</div>
	);
}
