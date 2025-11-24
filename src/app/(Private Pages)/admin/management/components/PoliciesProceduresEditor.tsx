'use client';

import React, { useState, useMemo } from 'react';
import PoliciesProceduresForm from '@/app/(Private Pages)/admin/management/components/PoliciesProceduresForm';
import PoliciesProceduresSection from '../../../../(Public Pages)/management/components/PoliciesProceduresSection';
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
		<Editable
			label="Policies & Procedures"
			formContent={
				<PoliciesProceduresForm
					initialData={initial}
					pageSlug={pageSlug}
					onChange={setCurrentData}
				/>
			}
		>
			<PoliciesProceduresSection data={currentData} />
		</Editable>
	);
}