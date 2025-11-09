'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import LeadershipTeamSection from '@/app/(Public Pages)/management/leadership-team/components/LeadershipTeamSection';
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
		<Editable
			label='Leadership Team'
			formContent={
				<LeadershipTeamForm
					initialData={initial}
					pageSlug={pageSlug}
					onChange={setPreviewData}
				/>
			}>
			<LeadershipTeamSection data={previewData} />
		</Editable>
	);
}