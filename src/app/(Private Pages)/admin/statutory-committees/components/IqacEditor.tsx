'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import IqacForm from './IqacForm';
import IqacView from '@/components/statutory-committees/IqacView';
import type { IqacData } from '@/app/(Private Pages)/actions/statutory-committees';

type Props = {
	initialData: IqacData;
	pageSlug: string;
};

export default function IqacEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<IqacData>(initial);

	const formContent = useMemo(
		() => (
			<IqacForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setPreviewData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable label='IQAC Page Content' formContent={formContent}>
			<div className='border rounded-lg overflow-hidden bg-white'>
				<div className='bg-gray-50 px-4 py-2 border-b text-xs font-medium text-gray-500 uppercase tracking-wider'>
					Live Preview
				</div>
				<IqacView data={previewData} />
			</div>
		</Editable>
	);
}
