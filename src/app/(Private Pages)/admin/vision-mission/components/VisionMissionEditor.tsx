'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import {
	VisionAspirationsBlock,
	VisionHeroBlock,
	VisionPillarsBlock,
	VisionStatementBlock
} from '@/app/(Public Pages)/vision-mission/components/VisionMissionSection';
import VisionMissionForm from './VisionMissionForm';
import type { VisionMissionData } from '@/app/(Private Pages)/actions/vision-mission';

type Props = {
	initialData: VisionMissionData;
	pageSlug: string;
};

export default function VisionMissionEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<VisionMissionData>(initial);

	return (
		<div className='space-y-6'>
			<Editable
				label='Vision Hero'
				formContent={
					<VisionMissionForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['hero']}
					/>
				}>
				<VisionHeroBlock data={previewData} />
			</Editable>

			<Editable
				label='Vision Statement'
				formContent={
					<VisionMissionForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['visionStatement']}
					/>
				}>
				<VisionStatementBlock data={previewData} />
			</Editable>

			<Editable
				label='Vision Pillars'
				formContent={
					<VisionMissionForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['pillars']}
					/>
				}>
				<VisionPillarsBlock data={previewData} />
			</Editable>

			<Editable
				label='Future Aspirations'
				formContent={
					<VisionMissionForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['aspirations']}
					/>
				}>
				<VisionAspirationsBlock data={previewData} />
			</Editable>
		</div>
	);
}
