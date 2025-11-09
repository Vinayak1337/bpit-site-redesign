'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import MissionSection from '@/app/(Public Pages)/vision-mission/components/MissionSection';
import MissionForm from './MissionForm';
import type { MissionData } from '@/app/(Private Pages)/actions/vision-mission';

type Props = {
	initialData: MissionData;
	pageSlug: string;
};

export default function MissionEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<MissionData>(initial);

	return (
		<Editable
			label='Mission'
			formContent={
				<MissionForm
					initialData={initial}
					pageSlug={pageSlug}
					onChange={setPreviewData}
				/>
			}>
			<MissionSection data={previewData} />
		</Editable>
	);
}