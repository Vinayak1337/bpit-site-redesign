'use client';

import React, { useState, useMemo } from 'react';
import GovernanceStructureForm from '@/app/(Private Pages)/admin/management/components/GovernanceStructureForm';
import GovernanceStructureSection from '../../../../(Public Pages)/management/components/GovernanceStructureSection';
import Editable from '@/components/ui/Editable';
import type { GovernanceStructureData } from '@/app/(Private Pages)/actions/management';

interface GovernanceStructureEditorProps {
	initialData: GovernanceStructureData;
	pageSlug: string;
}

export default function GovernanceStructureEditor({ initialData, pageSlug }: GovernanceStructureEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<GovernanceStructureData>(initial);

	const formContent = useMemo(
		() => (
			<GovernanceStructureForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable
			label="Governance Structure"
			formContent={formContent}
		>
			<GovernanceStructureSection data={currentData} />
		</Editable>
	);
}