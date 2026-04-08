'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import AboutLegacySection from '@/components/about/AboutLegacySection';
import AboutLegacyForm from '@/app/(Private Pages)/admin/about/components/AboutLegacyForm';
import type { AboutLegacyData } from '@/app/(Private Pages)/actions/about';

type Props = {
	initialData: AboutLegacyData;
	pageSlug: string;
};

export default function AboutLegacyEditor({
	initialData,
	pageSlug
}: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] =
		useState<AboutLegacyData>(initial);

	const formContent = useMemo(
		() => (
			<AboutLegacyForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setPreviewData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable
			label='About Legacy'
			formContent={formContent}>
			<AboutLegacySection data={previewData} />
		</Editable>
	);
}
