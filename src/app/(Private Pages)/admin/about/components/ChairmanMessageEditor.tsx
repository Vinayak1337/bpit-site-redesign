'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import {
	ChairmanMessageBodyBlock,
	ChairmanMessageHeaderBlock,
	ChairmanMessageSignatureBlock
} from '@/components/about/ChairmanMessageSection';
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
		<div className='space-y-6'>
			<Editable
				label="Chairman's Header"
				formContent={
					<ChairmanMessageForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['header']}
					/>
				}>
				<div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-200'>
					<ChairmanMessageHeaderBlock data={previewData} />
				</div>
			</Editable>

			<Editable
				label="Chairman's Message Content"
				formContent={
					<ChairmanMessageForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['content']}
					/>
				}>
				<div className='bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-200 space-y-6 sm:space-y-8'>
					<ChairmanMessageBodyBlock data={previewData} />
					<ChairmanMessageSignatureBlock />
				</div>
			</Editable>
		</div>
	);
}
