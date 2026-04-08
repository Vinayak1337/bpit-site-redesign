'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import type {
	AdmissionsBrochureConfig,
	AdmissionsBrochureItem
} from '@/app/(Private Pages)/actions/admissions';
import AdmissionsBrochureForm from '@/app/(Private Pages)/admin/admissions/components/AdmissionsBrochureForm';
import BrochureExplorer from '@/app/(Public Pages)/admissions/brochure/components/BrochureExplorer';

type BrochurePageData = {
	config: AdmissionsBrochureConfig;
	items: AdmissionsBrochureItem[];
};

type Props = {
	initialData: BrochurePageData;
};

export default function AdmissionsBrochureEditor({ initialData }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<BrochurePageData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='Brochure Config'
				formContent={
					<AdmissionsBrochureForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['config']}
					/>
				}>
				<BrochureExplorer
					config={previewData.config}
					items={[]}
				/>
			</Editable>

			<Editable
				label='Brochure Items'
				formContent={
					<AdmissionsBrochureForm
						initialData={initial}
						onChange={setPreviewData}
						visibleSections={['items']}
					/>
				}>
				<BrochureExplorer items={previewData.items} />
			</Editable>
		</div>
	);
}
