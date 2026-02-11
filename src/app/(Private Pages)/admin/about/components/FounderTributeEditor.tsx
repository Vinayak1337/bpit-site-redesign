'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import {
	FounderTributeContentBlock,
	FounderTributeHeaderBlock,
	FounderTributeValuesBlock
} from '@/components/about/FounderTributeSection';
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
		<div className='space-y-6'>
			<Editable
				label='Founder Tribute Header'
				formContent={
					<FounderTributeForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['hero']}
					/>
				}>
				<div className='bg-gradient-to-r from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-orange-200'>
					<FounderTributeHeaderBlock data={previewData} />
				</div>
			</Editable>

			<Editable
				label='Founder Tribute Content'
				formContent={
					<FounderTributeForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['content']}
					/>
				}>
				<div className='bg-gradient-to-r from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-orange-200'>
					<FounderTributeContentBlock data={previewData} />
				</div>
			</Editable>

			<Editable
				label='Founder Tribute Values'
				formContent={
					<FounderTributeForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setPreviewData}
						visibleSections={['values']}
					/>
				}>
				<div className='bg-gradient-to-r from-orange-50 to-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-orange-200'>
					<FounderTributeValuesBlock data={previewData} />
				</div>
			</Editable>
		</div>
	);
}
