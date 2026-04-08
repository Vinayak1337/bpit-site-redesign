'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import type {
	AdmissionsFaqContact,
	AdmissionsFaqIntro,
	AdmissionsFaqItem
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsFaqForm from '@/app/(Private Pages)/admin/admissions/components/AdmissionsFaqForm';
import FaqExplorer from '@/app/(Public Pages)/admissions/faqs/components/FaqExplorer';

type FaqPageData = {
	intro: AdmissionsFaqIntro;
	items: AdmissionsFaqItem[];
	contact: AdmissionsFaqContact;
};

type Props = {
	initialData: FaqPageData;
};

export default function AdmissionsFaqEditor({ initialData }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<FaqPageData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='FAQ Intro'
				formContent={
					<AdmissionsFaqForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['intro']}
					/>
				}>
				<FaqExplorer intro={previewData.intro} />
			</Editable>

			<Editable
				label='FAQ Items'
				formContent={
					<AdmissionsFaqForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['items']}
					/>
				}>
				<FaqExplorer items={previewData.items} />
			</Editable>

			<Editable
				label='FAQ Contact'
				formContent={
					<AdmissionsFaqForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['contact']}
					/>
				}>
				<FaqExplorer contact={previewData.contact} />
			</Editable>
		</div>
	);
}
