'use client';

import { useCallback, useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import PlacementCompanies from '@/components/placement/placement-companies';
import PlacementCompaniesForm from '@/app/(Private Pages)/admin/components/PlacementCompaniesForm';

type PlacementCompaniesEditorProps = {
	initialData: PlacementCompaniesData;
	pageSlug: string;
};

const normalizeData = (
	data: PlacementCompaniesData
): PlacementCompaniesData => ({
	title: data.title ?? '',
	subtitle: data.subtitle ?? '',
	companies: data.companies ?? [],
	statistics: data.statistics ?? []
});

const toFormValues = (
	data: PlacementCompaniesData
) => ({
	title: data.title,
	subtitle: data.subtitle,
	companies: (data.companies ?? []).map(company => ({
		id: crypto.randomUUID(),
		name: company.name,
		logo: company.logo
	})),
	statistics: (data.statistics ?? []).map(stat => ({
		id: crypto.randomUUID(),
		value: stat.value,
		label: stat.label
	}))
});

const dataEqual = (a: PlacementCompaniesData, b: PlacementCompaniesData): boolean =>
	JSON.stringify(a) === JSON.stringify(b);

export default function PlacementCompaniesEditor({
	initialData,
	pageSlug
}: PlacementCompaniesEditorProps) {
	const normalized = useMemo(() => normalizeData(initialData), [initialData]);
	const initialFormValues = useMemo(() => toFormValues(normalized), [normalized]);
	const [previewData, setPreviewData] = useState<PlacementCompaniesData>(normalized);

	const handlePreviewChange = useCallback((data: PlacementCompaniesData) => {
		const normalizedData = normalizeData(data);
		setPreviewData(prev => (dataEqual(prev, normalizedData) ? prev : normalizedData));
	}, []);

	return (
		<Editable
			label='Placement Companies'
			formContent={
				<PlacementCompaniesForm
					initialValues={initialFormValues}
					pageSlug={pageSlug}
					onChange={handlePreviewChange}
				/>
			}>
			<PlacementCompanies data={previewData} />
		</Editable>
	);
}

