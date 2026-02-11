'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import {
	LeadershipTeamHeroBlock,
	LeadershipTeamLeadersBlock
} from '@/app/(Public Pages)/management/leadership-team/components/LeadershipTeamSection';
import LeadershipTeamForm from './LeadershipTeamForm';
import type { LeadershipTeamData } from '@/app/(Private Pages)/actions/management';

interface LeadershipTeamEditorProps {
	initialData: LeadershipTeamData;
	pageSlug: string;
}

export default function LeadershipTeamEditor({ initialData, pageSlug }: LeadershipTeamEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<LeadershipTeamData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='Leadership Team Hero'
				formContent={
					<LeadershipTeamForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['hero']}
					/>
				}>
				<LeadershipTeamHeroBlock data={previewData} />
			</Editable>

			<Editable
				label='Leadership Profiles'
				formContent={
					<LeadershipTeamForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['leaders']}
					/>
				}>
				<LeadershipTeamLeadersBlock data={previewData} />
			</Editable>
		</div>
	);
}
