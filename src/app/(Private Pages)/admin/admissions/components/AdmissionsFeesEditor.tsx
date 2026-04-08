'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import type {
	AdmissionsFeeProgram,
	AdmissionsFeesMeta
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsFeesForm from '@/app/(Private Pages)/admin/admissions/components/AdmissionsFeesForm';
import FeesExplorer from '@/app/(Public Pages)/admissions/fees/components/FeesExplorer';

type FeesPageData = {
	meta: AdmissionsFeesMeta;
	programs: AdmissionsFeeProgram[];
};

type Props = {
	initialData: FeesPageData;
};

export default function AdmissionsFeesEditor({ initialData }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<FeesPageData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='Fees Meta'
				formContent={
					<AdmissionsFeesForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['meta']}
					/>
				}>
				<FeesExplorer
					meta={previewData.meta}
					programs={initial.programs}
				/>
			</Editable>

			<Editable
				label='Fees Programs'
				formContent={
					<AdmissionsFeesForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['programs']}
					/>
				}>
				<FeesExplorer
					meta={previewData.meta}
					programs={previewData.programs}
				/>
			</Editable>
		</div>
	);
}
