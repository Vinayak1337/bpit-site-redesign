'use client';

import { useCallback, useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import TopPlacedStudents from '@/components/placement/top-placed-students';
import TopPlacedStudentsForm from '@/app/(Private Pages)/admin/components/TopPlacedStudentsForm';

type TopPlacedStudentsEditorProps = {
	initialData: TopPlacedStudentsData;
	pageSlug: string;
};

const normalizeData = (
	data: TopPlacedStudentsData
): TopPlacedStudentsData => ({
	title: data.title ?? '',
	subtitle: data.subtitle ?? '',
	students: data.students ?? [],
	statistics: data.statistics ?? []
});

const toFormValues = (
	data: TopPlacedStudentsData
) => ({
	title: data.title,
	subtitle: data.subtitle,
	students: (data.students ?? []).map(student => ({
		id: student.id ? String(student.id) : crypto.randomUUID(),
		name: student.name,
		company: student.company,
		package: student.package,
		branch: student.branch,
		year: student.year,
		image: student.image,
		companyLogo: student.companyLogo
	})),
	statistics: (data.statistics ?? []).map(stat => ({
		id: crypto.randomUUID(),
		value: stat.value,
		label: stat.label
	}))
});

const dataEqual = (a: TopPlacedStudentsData, b: TopPlacedStudentsData): boolean =>
	JSON.stringify(a) === JSON.stringify(b);

export default function TopPlacedStudentsEditor({
	initialData,
	pageSlug
}: TopPlacedStudentsEditorProps) {
	const normalized = useMemo(() => normalizeData(initialData), [initialData]);
	const initialFormValues = useMemo(() => toFormValues(normalized), [normalized]);
	const [previewData, setPreviewData] = useState<TopPlacedStudentsData>(normalized);

	const handlePreviewChange = useCallback((data: TopPlacedStudentsData) => {
		const normalizedData = normalizeData(data);
		setPreviewData(prev => (dataEqual(prev, normalizedData) ? prev : normalizedData));
	}, []);

	return (
		<Editable
			label='Top Placed Students'
			formContent={
				<TopPlacedStudentsForm
					initialValues={initialFormValues}
					pageSlug={pageSlug}
					onChange={handlePreviewChange}
				/>
			}>
			<TopPlacedStudents data={previewData} />
		</Editable>
	);
}

