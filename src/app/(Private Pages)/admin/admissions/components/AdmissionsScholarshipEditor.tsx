'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import type {
	AdmissionsScholarshipCategory,
	AdmissionsScholarshipIntro,
	AdmissionsScholarshipNotesSection,
	AdmissionsScholarshipSupport
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsScholarshipForm from '@/app/(Private Pages)/admin/admissions/components/AdmissionsScholarshipForm';
import ScholarshipContent from '@/app/(Public Pages)/admissions/scholarship/components/ScholarshipContent';

type ScholarshipPageData = {
	intro: AdmissionsScholarshipIntro;
	categories: AdmissionsScholarshipCategory[];
	notes: AdmissionsScholarshipNotesSection;
	support: AdmissionsScholarshipSupport;
};

type Props = {
	initialData: ScholarshipPageData;
};

export default function AdmissionsScholarshipEditor({ initialData }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<ScholarshipPageData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='Scholarship Intro'
				formContent={
					<AdmissionsScholarshipForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['intro']}
					/>
				}>
				<ScholarshipContent intro={previewData.intro} />
			</Editable>

			<Editable
				label='Scholarship Categories'
				formContent={
					<AdmissionsScholarshipForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['categories']}
					/>
				}>
				<ScholarshipContent categories={previewData.categories} />
			</Editable>

			<Editable
				label='Scholarship Notes'
				formContent={
					<AdmissionsScholarshipForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['notes']}
					/>
				}>
				<ScholarshipContent notes={previewData.notes} />
			</Editable>

			<Editable
				label='Scholarship Support'
				formContent={
					<AdmissionsScholarshipForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['support']}
					/>
				}>
				<ScholarshipContent support={previewData.support} />
			</Editable>
		</div>
	);
}
