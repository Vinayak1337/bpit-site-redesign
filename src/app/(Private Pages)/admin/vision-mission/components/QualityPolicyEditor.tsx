'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import QualityPolicySection from '@/app/(Public Pages)/vision-mission/components/QualityPolicySection';
import QualityPolicyForm from './QualityPolicyForm';
import type { QualityPolicyData } from '@/app/(Private Pages)/actions/vision-mission';

type Props = {
	initialData: QualityPolicyData;
	pageSlug: string;
};

export default function QualityPolicyEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<QualityPolicyData>(initial);

	return (
		<Editable
			label='Quality Policy'
			formContent={
				<QualityPolicyForm
					initialData={initial}
					pageSlug={pageSlug}
					onChange={setPreviewData}
				/>
			}>
			<QualityPolicySection data={previewData} />
		</Editable>
	);
}