'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import FounderTributeSection from '@/components/about/FounderTributeSection';
import FounderTributeForm from '@/app/(Private Pages)/admin/about/components/FounderTributeForm';
import type { FounderTributeData } from '@/app/(Private Pages)/actions/about';

type Props = {
	initialData: FounderTributeData;
	pageSlug: string;
};

export default function FounderTributeEditor({
	initialData,
	pageSlug
}: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] =
		useState<FounderTributeData>(initial);

	return (
		<Editable
			label='Founder Tribute'
			formContent={
				<FounderTributeForm
					initialData={initial}
					pageSlug={pageSlug}
					onChange={setPreviewData}
				/>
			}>
			<FounderTributeSection data={previewData} />
		</Editable>
	);
}