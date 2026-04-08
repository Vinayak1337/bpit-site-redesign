'use client';

import React, { useState, useMemo } from 'react';
import GovernanceStructureForm from '@/app/(Private Pages)/admin/management/components/GovernanceStructureForm';
import {
	GovernanceStructureHeroBlock,
	GovernanceStructureSectionsBlock
} from '@/app/(Public Pages)/management/components/GovernanceStructureSection';
import Editable from '@/components/ui/Editable';
import type { GovernanceStructureData } from '@/app/(Private Pages)/actions/management';

interface GovernanceStructureEditorProps {
	initialData: GovernanceStructureData;
	pageSlug: string;
}

export default function GovernanceStructureEditor({ initialData, pageSlug }: GovernanceStructureEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<GovernanceStructureData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='Governance Hero'
				formContent={
					<GovernanceStructureForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setCurrentData}
						visibleSections={['hero']}
					/>
				}>
				<GovernanceStructureHeroBlock data={currentData} />
			</Editable>

			<Editable
				label='Governance Sections'
				formContent={
					<GovernanceStructureForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setCurrentData}
						visibleSections={['sections']}
					/>
				}>
				<GovernanceStructureSectionsBlock data={currentData} />
			</Editable>
		</div>
	);
}
