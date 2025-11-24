'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import ChairmanMessageSection from '@/components/about/ChairmanMessageSection';
import ChairmanMessageForm from '@/app/(Private Pages)/admin/about/components/ChairmanMessageForm';
import type { ChairmanMessageData } from '@/app/(Private Pages)/actions/about';

type Props = {
	initialData: ChairmanMessageData;
	pageSlug: string;
};

export default function ChairmanMessageEditor({
	initialData,
	pageSlug
}: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] =
		useState<ChairmanMessageData>(initial);

	return (
		<Editable
			label="Chairman's Message"
			formContent={
				<ChairmanMessageForm
					initialData={initial}
					pageSlug={pageSlug}
					onChange={setPreviewData}
				/>
			}>
						<ChairmanMessageSection data={previewData} />
		</Editable>
	);
}