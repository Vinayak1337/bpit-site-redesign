'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import AdmissionsHero from '@/app/(Public Pages)/admissions/components/AdmissionsHero';
import type { AdmissionsHeroData } from '@/app/(Private Pages)/actions/admissions';
import AdmissionsHeroBannerForm from '@/app/(Private Pages)/admin/admissions/components/AdmissionsHeroBannerForm';

type Props = {
	initialData: AdmissionsHeroData;
	pageSlug: Parameters<typeof AdmissionsHeroBannerForm>[0]['pageSlug'];
	label: string;
};

export default function AdmissionsHeroBannerEditor({
	initialData,
	pageSlug,
	label
}: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<AdmissionsHeroData>(initial);

	return (
		<Editable
			label={label}
			formContent={
				<AdmissionsHeroBannerForm
					initialData={initial}
					pageSlug={pageSlug}
					onChange={setPreviewData}
				/>
			}>
			<AdmissionsHero data={previewData} />
		</Editable>
	);
}
