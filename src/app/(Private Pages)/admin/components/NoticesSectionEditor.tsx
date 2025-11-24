'use client';
import { useCallback, useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import NoticesSection from '@/components/carousel/notices-section';
import NoticesSectionForm, {
	toFormValuesFromSection
} from '@/app/(Private Pages)/admin/components/NoticesSectionForm';
import { toNoticesSectionComponentData } from '@/lib/carousel-adapters';

type NoticesSectionEditorProps = {
	initialData: NoticesSectionData;
	pageSlug: string;
};

const normalizeSectionData = (
	data: NoticesSectionData
): NoticesSectionData => ({
	notices: data.notices ?? [],
	announcements: data.announcements ?? []
});

const sectionsEqual = (
	a: NoticesSectionData,
	b: NoticesSectionData
): boolean => {
	return JSON.stringify(a) === JSON.stringify(b);
};

export default function NoticesSectionEditor({
	initialData,
	pageSlug
}: NoticesSectionEditorProps) {
	const normalized = useMemo(
		() => normalizeSectionData(initialData),
		[initialData]
	);
	const initialFormValues = useMemo(
		() => toFormValuesFromSection(normalized),
		[normalized]
	);
	const [previewData, setPreviewData] =
		useState<NoticesSectionData>(normalized);

	const handlePreviewChange = useCallback((section: NoticesSectionData) => {
		const normalizedSection = normalizeSectionData(section);
		setPreviewData(prev =>
			sectionsEqual(prev, normalizedSection) ? prev : normalizedSection
		);
	}, []);

	return (
		<Editable
			label='Notices & Announcements'
			formContent={
				<NoticesSectionForm
					initialValues={initialFormValues}
					pageSlug={pageSlug}
					onChange={handlePreviewChange}
				/>
			}>
			<NoticesSection data={toNoticesSectionComponentData(previewData)} />
		</Editable>
	);
}
