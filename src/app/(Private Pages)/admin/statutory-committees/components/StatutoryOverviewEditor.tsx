'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import StatutoryOverviewForm from './StatutoryOverviewForm';
import type { StatutoryOverviewData } from '@/app/(Private Pages)/actions/statutory-committees';
import {
	StatutoryOverviewHeroSection,
	StatutoryOverviewCommitteesSection
} from '@/components/statutory-committees/StatutoryOverviewView';

type Props = {
	initialData: StatutoryOverviewData;
	pageSlug: string;
};

export default function StatutoryOverviewEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<StatutoryOverviewData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='Overview Hero'
				formContent={
					<StatutoryOverviewForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['hero']}
					/>
				}>
				<StatutoryOverviewHeroSection data={previewData} />
			</Editable>

			<Editable
				label='Committees Grid'
				formContent={
					<StatutoryOverviewForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['committees']}
					/>
				}>
				<StatutoryOverviewCommitteesSection data={previewData} />
			</Editable>
		</div>
	);
}
