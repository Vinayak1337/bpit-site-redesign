'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import {
	MissionHeroBlock,
	MissionImpactBlock,
	MissionObjectivesBlock,
	MissionStatementBlock
} from '@/app/(Public Pages)/vision-mission/components/MissionSection';
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
		<div className='space-y-6'>
			<Editable
				label='Mission Hero'
				formContent={
					<MissionForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['hero']}
					/>
				}>
				<MissionHeroBlock data={previewData} />
			</Editable>

			<Editable
				label='Mission Statement'
				formContent={
					<MissionForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['missionStatement']}
					/>
				}>
				<MissionStatementBlock data={previewData} />
			</Editable>

			<Editable
				label='Mission Objectives'
				formContent={
					<MissionForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['objectives']}
					/>
				}>
				<MissionObjectivesBlock data={previewData} />
			</Editable>

			<Editable
				label='Mission Impact'
				formContent={
					<MissionForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['impact']}
					/>
				}>
				<MissionImpactBlock data={previewData} />
			</Editable>
		</div>
	);
}
