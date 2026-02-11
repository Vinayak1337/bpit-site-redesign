'use client';
import { useCallback, useMemo, useState } from 'react';
import Editable from '@/components/ui/Editable';
import { AnnouncementsColumn } from '@/components/home/notices-events/announcements-column';
import { NoticesColumn } from '@/components/home/notices-events/notices-column';
import NoticesSectionForm from '@/app/(Private Pages)/admin/components/NoticesSectionForm';
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
	const [previewData, setPreviewData] = useState<NoticesSectionData>(normalized);
	const [formVersion, setFormVersion] = useState(0);

	const handleSectionSaved = useCallback((section: NoticesSectionData) => {
		const normalizedSection = normalizeSectionData(section);
		setPreviewData(prev =>
			sectionsEqual(prev, normalizedSection) ? prev : normalizedSection
		);
		setFormVersion(previous => previous + 1);
	}, []);

	const previewSection = useMemo(
		() => toNoticesSectionComponentData(previewData),
		[previewData]
	);

	return (
		<div className='space-y-5'>
			<Editable
				label='Notices'
				formContent={
					<NoticesSectionForm
						key={`notices-form-${formVersion}`}
						mode='notices'
						initialItems={previewData.notices}
						otherItems={previewData.announcements}
						pageSlug={pageSlug}
						onSaved={handleSectionSaved}
					/>
				}>
				<NoticesColumn items={previewSection.notices} />
			</Editable>

			<Editable
				label='Announcements'
				formContent={
					<NoticesSectionForm
						key={`announcements-form-${formVersion}`}
						mode='announcements'
						initialItems={previewData.announcements}
						otherItems={previewData.notices}
						pageSlug={pageSlug}
						onSaved={handleSectionSaved}
					/>
				}>
				<AnnouncementsColumn items={previewSection.announcements} />
			</Editable>
		</div>
	);
}
