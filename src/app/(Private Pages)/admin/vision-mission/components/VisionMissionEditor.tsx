'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import VisionMissionSection from '@/app/(Public Pages)/vision-mission/components/VisionMissionSection';
import VisionMissionForm from './VisionMissionForm';
import type { VisionMissionData } from '@/app/(Private Pages)/actions/vision-mission';

type Props = {
	initialData: VisionMissionData;
	pageSlug: string;
};

export default function VisionMissionEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<VisionMissionData>(initial);

	const formContent = useMemo(
		() => (
			<VisionMissionForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setPreviewData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable
			label='Vision & Mission'
			formContent={formContent}>
			<VisionMissionSection data={previewData} />
		</Editable>
	);
}
