'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import DisclosureHeroSection from '@/components/mandatory-disclosure/DisclosureHeroSection';
import DisclosureHeroForm from './DisclosureHeroForm';
import { DisclosureData } from '@/lib/schemas/mandatory-disclosure';

type Props = {
	initialData: DisclosureData;
};

export default function DisclosureHeroEditor({ initialData }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<DisclosureData>(initial);

	const formContent = useMemo(
		() => (
			<DisclosureHeroForm initialData={initial} onChange={setPreviewData} />
		),
		[initial]
	);

	return (
		<Editable label='Mandatory Disclosure Hero' formContent={formContent}>
			<DisclosureHeroSection data={previewData} />
		</Editable>
	);
}
