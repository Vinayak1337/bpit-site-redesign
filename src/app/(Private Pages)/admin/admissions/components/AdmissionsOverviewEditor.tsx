'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import type { AdmissionsOverviewPageData } from '@/app/(Private Pages)/actions/admissions';
import AdmissionsOverviewForm from '@/app/(Private Pages)/admin/admissions/components/AdmissionsOverviewForm';
import {
	AdmissionsOverviewDepartmentsSection,
	AdmissionsOverviewIntroSection,
	AdmissionsOverviewLinksSection,
	AdmissionsOverviewNotesSection,
	AdmissionsOverviewStatsSection
} from '@/app/(Public Pages)/admissions/components/AdmissionsOverviewSections';

type Props = {
	initialData: AdmissionsOverviewPageData;
	programCount: number;
};

export default function AdmissionsOverviewEditor({ initialData, programCount }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<AdmissionsOverviewPageData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='Overview Intro'
				formContent={
					<AdmissionsOverviewForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['intro']}
					/>
				}>
				<AdmissionsOverviewIntroSection
					data={previewData.hero}
					programCount={programCount}
				/>
			</Editable>

			<Editable
				label='Overview Stats'
				formContent={
					<AdmissionsOverviewForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['stats']}
					/>
				}>
				<AdmissionsOverviewStatsSection data={previewData.stats} />
			</Editable>

			<Editable
				label='Overview Links'
				formContent={
					<AdmissionsOverviewForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['links']}
					/>
				}>
				<AdmissionsOverviewLinksSection data={previewData.links} />
			</Editable>

			<Editable
				label='Overview Departments'
				formContent={
					<AdmissionsOverviewForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['departments']}
					/>
				}>
				<AdmissionsOverviewDepartmentsSection data={previewData.departments} />
			</Editable>

			<Editable
				label='Overview Notes'
				formContent={
					<AdmissionsOverviewForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['notes']}
					/>
				}>
				<AdmissionsOverviewNotesSection data={previewData.notes} />
			</Editable>
		</div>
	);
}
