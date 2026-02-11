'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import {
	ManagementHeroBlock,
	ManagementLeadersBlock,
	ManagementVisionBlock
} from '@/app/(Public Pages)/management/components/ManagementSection';
import ManagementForm from './ManagementForm';
import type { ManagementData } from '@/app/(Private Pages)/actions/management';

type Props = {
	initialData: ManagementData;
	pageSlug: string;
};

export default function ManagementEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<ManagementData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='Management Hero'
				formContent={
					<ManagementForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['hero']}
					/>
				}>
				<ManagementHeroBlock data={previewData} />
			</Editable>

			<Editable
				label='Management Leaders'
				formContent={
					<ManagementForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['leaders']}
					/>
				}>
				<ManagementLeadersBlock data={previewData} />
			</Editable>

			<Editable
				label='Leadership Vision'
				formContent={
					<ManagementForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['vision']}
					/>
				}>
				<ManagementVisionBlock data={previewData} />
			</Editable>
		</div>
	);
}
