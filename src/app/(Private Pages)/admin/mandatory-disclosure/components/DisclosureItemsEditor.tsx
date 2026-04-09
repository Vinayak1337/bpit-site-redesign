'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import DisclosureListSection from '@/components/mandatory-disclosure/DisclosureListSection';
import DisclosureItemsForm from './DisclosureItemsForm';
import { DisclosureData } from '@/lib/schemas/mandatory-disclosure';

type Props = {
	initialData: DisclosureData;
};

export default function DisclosureItemsEditor({ initialData }: Props) {
	const initial = useMemo(() => initialData, [initialData]);
	const [previewData, setPreviewData] = useState<DisclosureData>(initial);

	const formContent = useMemo(
		() => (
			<DisclosureItemsForm initialData={initial} onChange={setPreviewData} />
		),
		[initial]
	);

	return (
		<Editable label='Disclosure Documents' presentation='dialog' formContent={formContent}>
			<DisclosureListSection data={previewData} />
		</Editable>
	);
}
