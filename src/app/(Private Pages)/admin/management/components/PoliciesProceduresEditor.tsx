'use client';

import React, { useState, useMemo } from 'react';
import PoliciesProceduresForm from '@/app/(Private Pages)/admin/management/components/PoliciesProceduresForm';
import {
	PoliciesProceduresHeroBlock,
	PoliciesProceduresCategoriesBlock,
	PoliciesProceduresFrameworkBlock
} from '@/app/(Public Pages)/management/components/PoliciesProceduresSection';
import Editable from '@/components/ui/Editable';
import type { PoliciesProceduresData } from '@/app/(Private Pages)/actions/management';

interface PoliciesProceduresEditorProps {
	initialData: PoliciesProceduresData;
	pageSlug: string;
}

export default function PoliciesProceduresEditor({ initialData, pageSlug }: PoliciesProceduresEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PoliciesProceduresData>(initial);

	return (
		<div className='space-y-8'>
			<Editable
				label='Policies Hero'
				formContent={
					<PoliciesProceduresForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setCurrentData}
						visibleSections={['hero']}
					/>
				}>
				<PoliciesProceduresHeroBlock data={currentData} />
			</Editable>

			<Editable
				label='Policy Categories'
				formContent={
					<PoliciesProceduresForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setCurrentData}
						visibleSections={['categories']}
					/>
				}>
				<PoliciesProceduresCategoriesBlock data={currentData} />
			</Editable>

			<Editable
				label='Implementation Framework'
				formContent={
					<PoliciesProceduresForm
						initialData={initial}
						pageSlug={pageSlug}
						onChange={setCurrentData}
						visibleSections={['framework']}
					/>
				}>
				<PoliciesProceduresFrameworkBlock data={currentData} />
			</Editable>
		</div>
	);
}
