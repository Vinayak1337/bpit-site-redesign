'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import InternalComplaintsForm from './InternalComplaintsForm';
import InternalComplaintsView from '@/components/statutory-committees/InternalComplaintsView';
import type { InternalComplaintsData } from '@/app/(Private Pages)/actions/statutory-committees';

type Props = {
	initialData: InternalComplaintsData;
	pageSlug: string;
};

export default function InternalComplaintsEditor({ initialData, pageSlug }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<InternalComplaintsData>(initial);

	const formContent = useMemo(
		() => (
			<InternalComplaintsForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setPreviewData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable
			label='Internal Complaints Page Content'
			formContent={formContent}>
			<div className='border rounded-lg overflow-hidden bg-white'>
				<div className='bg-gray-50 px-4 py-2 border-b text-xs font-medium text-gray-500 uppercase tracking-wider'>
					Live Preview
				</div>
				<InternalComplaintsView data={previewData} />
			</div>
		</Editable>
	);
}
