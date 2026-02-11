'use client';

import { useState } from 'react';
import GrievanceForm from './GrievanceForm';
import {
	StudentGrievanceHeader,
	StudentGrievanceProcess,
	StudentGrievanceContacts
} from '@/components/student-life/StudentGrievance';
import type { GrievanceCellData } from '@/app/(Private Pages)/actions/student-life';
import Editable from '@/components/ui/Editable';

interface Props {
	initialData: GrievanceCellData;
}

export default function GrievanceEditor({ initialData }: Props) {
	const [data, setData] = useState<GrievanceCellData>(initialData);

	return (
		<div className='space-y-8'>
			<Editable
				label='Grievance Header'
				formContent={
					<GrievanceForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['header']}
					/>
				}>
				<StudentGrievanceHeader data={data} />
			</Editable>

			<Editable
				label='Grievance Process'
				formContent={
					<GrievanceForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['process']}
					/>
				}>
				<StudentGrievanceProcess data={data} />
			</Editable>

			<Editable
				label='Grievance Contacts'
				formContent={
					<GrievanceForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['contacts']}
					/>
				}>
				<StudentGrievanceContacts data={data} />
			</Editable>
		</div>
	);
}
