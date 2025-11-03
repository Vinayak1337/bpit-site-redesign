'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import AboutOverviewSection from '@/components/about/AboutOverviewSection';
import AboutOverviewForm from '@/app/(Private Pages)/admin/about/components/AboutOverviewForm';
import type { AboutOverviewData } from '@/app/(Private Pages)/actions/about';

type Props = {
	initialData: AboutOverviewData;
	pageSlug: string;
};

export default function AboutOverviewEditor({
	initialData,
	pageSlug
}: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] =
		useState<AboutOverviewData>(initial);

	return (
		<Editable
			label='About Overview'
			formContent={
				<AboutOverviewForm
					initialData={initial}
					pageSlug={pageSlug}
					onChange={setPreviewData}
				/>
			}>
			<AboutOverviewSection data={previewData} />
		</Editable>
	);
}
