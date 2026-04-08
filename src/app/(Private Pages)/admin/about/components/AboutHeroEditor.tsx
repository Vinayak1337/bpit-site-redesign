'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import AboutHero from '@/app/(Public Pages)/about/components/AboutHero';
import AboutHeroForm from '@/app/(Private Pages)/admin/about/components/AboutHeroForm';
import type { AboutHeroData } from '@/app/(Private Pages)/actions/about';

type Props = {
	initialData: AboutHeroData;
	pageSlug: string;
};

export default function AboutHeroEditor({ initialData, pageSlug }: Props) {
	const initialHero = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<AboutHeroData>(initialHero);

	return (
		<Editable
			label='About Hero'
			formContent={
				<AboutHeroForm
					initialData={initialHero}
					pageSlug={pageSlug}
					onChange={setPreviewData}
				/>
			}>
			<AboutHero data={previewData} />
		</Editable>
	);
}
