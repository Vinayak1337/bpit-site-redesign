'use client';

import { useState } from 'react';
import ConductForm from './ConductForm';
import {
	CodeOfConductHeader,
	CodeOfConductRules,
	CodeOfConductNote
} from '@/components/student-life/CodeOfConduct';
import type { CodeOfConductData } from '@/app/(Private Pages)/actions/student-life';
import Editable from '@/components/ui/Editable';

interface Props {
	initialData: CodeOfConductData;
}

export default function ConductEditor({ initialData }: Props) {
	const [data, setData] = useState<CodeOfConductData>(initialData);

	return (
		<div className='space-y-8'>
			<Editable
				label='Conduct Header'
				formContent={
					<ConductForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['header']}
					/>
				}>
				<CodeOfConductHeader data={data} />
			</Editable>

			<Editable
				label='Conduct Rules'
				formContent={
					<ConductForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['rules']}
					/>
				}>
				<CodeOfConductRules data={data} />
			</Editable>

			<Editable
				label='Conduct Note'
				formContent={
					<ConductForm
						initialData={initialData}
						onChange={setData}
						visibleSections={['note']}
					/>
				}>
				<CodeOfConductNote />
			</Editable>
		</div>
	);
}
