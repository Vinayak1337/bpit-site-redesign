'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import ManagementSection from '@/app/(Public Pages)/management/components/ManagementSection';
import ManagementForm from './ManagementForm';
import type { ManagementData } from '@/app/(Private Pages)/actions/management';

type Props = {
	initialData: ManagementData;
	pageSlug: string;
};

export default function ManagementEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<ManagementData>(initial);

	return (
		<Editable
			label='Management Team'
			formContent={
				<ManagementForm
					initialData={initial}
					pageSlug={pageSlug}
					onChange={setPreviewData}
				/>
			}>
			<ManagementSection data={previewData} />
		</Editable>
	);
}