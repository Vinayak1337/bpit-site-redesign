'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import {
	PrincipalMessageCardsBlock,
	PrincipalMessageContentBlock,
	PrincipalMessageHeaderBlock
} from '@/components/about/PrincipalMessageSection';
import PrincipalMessageForm from '@/app/(Private Pages)/admin/about/components/PrincipalMessageForm';
import type { PrincipalMessageData } from '@/app/(Private Pages)/actions/about';

type Props = {
	initialData: PrincipalMessageData;
	pageSlug: string;
};

export default function PrincipalMessageEditor({
	initialData,
	pageSlug
}: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] =
		useState<PrincipalMessageData>(initial);

	return (
		<div className='space-y-6'>
			<Editable
				label='Principal Header'
				formContent={
					<PrincipalMessageForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['hero']}
					/>
				}>
				<div className='bg-gradient-to-r from-green-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-green-200'>
					<PrincipalMessageHeaderBlock data={previewData} />
				</div>
			</Editable>

			<Editable
				label='Principal Message Content'
				formContent={
					<PrincipalMessageForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['content']}
					/>
				}>
				<div className='bg-gradient-to-r from-green-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-green-200'>
					<PrincipalMessageContentBlock data={previewData} />
				</div>
			</Editable>

			<Editable
				label='Principal Cards'
				formContent={
					<PrincipalMessageForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['cards']}
					/>
				}>
				<div className='bg-gradient-to-r from-green-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-green-200'>
					<PrincipalMessageCardsBlock data={previewData} />
				</div>
			</Editable>
		</div>
	);
}
