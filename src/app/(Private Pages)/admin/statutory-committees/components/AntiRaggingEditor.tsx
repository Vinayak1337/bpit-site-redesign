'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import AntiRaggingForm from './AntiRaggingForm';
import AntiRaggingView from '@/components/statutory-committees/AntiRaggingView';
import type { AntiRaggingData } from '@/app/(Private Pages)/actions/statutory-committees';

type Props = {
	initialData: AntiRaggingData;
	pageSlug: string;
};

export default function AntiRaggingEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<AntiRaggingData>(initial);

	const formContent = useMemo(
		() => (
			<AntiRaggingForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setPreviewData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable
			label='Anti-Ragging Page Content'
			formContent={formContent}>
			<div className='border rounded-lg overflow-hidden bg-white'>
				<div className='bg-gray-50 px-4 py-2 border-b text-xs font-medium text-gray-500 uppercase tracking-wider'>
					Live Preview
				</div>
				<AntiRaggingView data={previewData} />
			</div>
		</Editable>
	);
}
