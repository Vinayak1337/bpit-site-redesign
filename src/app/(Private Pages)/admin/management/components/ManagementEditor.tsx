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

	const formContent = useMemo(
		() => (
			<ManagementForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setPreviewData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable
			label='Management Team'
			formContent={formContent}>
			<ManagementSection data={previewData} />
		</Editable>
	);
}