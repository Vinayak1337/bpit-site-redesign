'use client';

import { useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import PrincipalMessageSection from '@/components/about/PrincipalMessageSection';
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
		<Editable
			label="Principal's Message"
			formContent={
				<PrincipalMessageForm
					initialData={initial}
					pageSlug={pageSlug}
					onChange={setPreviewData}
				/>
			}>
			<PrincipalMessageSection data={previewData} />
		</Editable>
	);
}