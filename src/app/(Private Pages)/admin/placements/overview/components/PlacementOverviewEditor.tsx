'use client';

import React, { useState, useMemo } from 'react';
import PlacementOverviewForm from '@/app/(Private Pages)/admin/placements/overview/components/PlacementOverviewForm';
import PlacementOverviewSection from '@/app/(Private Pages)/admin/placements/overview/components/PlacementOverviewSection';
import Editable from '@/components/ui/Editable';
import type { PlacementOverviewData } from '@/app/(Private Pages)/actions/placement-overview';

interface PlacementOverviewEditorProps {
	initialData: PlacementOverviewData;
	pageSlug: string;
}

export default function PlacementOverviewEditor({ initialData, pageSlug }: PlacementOverviewEditorProps) {
	const initial = useMemo(() => initialData, [initialData]);
	const [currentData, setCurrentData] = useState<PlacementOverviewData>(initial);

	const formContent = useMemo(
		() => (
			<PlacementOverviewForm
				initialData={initial}
				pageSlug={pageSlug}
				onChange={setCurrentData}
			/>
		),
		[initial, pageSlug]
	);

	return (
		<Editable
			label="Placement Overview"
			formContent={formContent}
		>
			<PlacementOverviewSection data={currentData} />
		</Editable>
	);
}
